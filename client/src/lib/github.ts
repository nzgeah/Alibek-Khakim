// The admin page has no server of its own. It saves projects by committing
// to this site's GitHub repository, using an access token that the owner
// pastes in; GitHub then rebuilds and republishes the site.
//
// That is also what keeps visitors read-only: without a token that GitHub
// accepts for writing to this repository, nothing can be published.
import type { StoredProject } from '../data/projects';
import { site } from '../config/site';

const API = 'https://api.github.com';
const TOKEN_KEY = 'github_token';
const PROJECTS_FILE = 'client/src/data/projects.json';
/** Folder in the repository that is served as /projects/ on the site. */
const IMAGES_DIR = 'client/public/projects';

/** Where to commit: the repository's current name and its main branch. */
export interface Repo {
  fullName: string;
  branch: string;
}

/** An image picked in the form that still has to be uploaded. */
export interface NewImage {
  /** Address it will have on the site, e.g. /projects/my-game-1.png */
  path: string;
  file: File;
}

export class GitHubError extends Error {
  status: number;
  constructor(status: number, message: string) {
    super(message);
    this.status = status;
  }
}

// The token is kept for this browser tab only and is gone when it closes.
export const getToken = () => sessionStorage.getItem(TOKEN_KEY);
export const setToken = (token: string) => sessionStorage.setItem(TOKEN_KEY, token);
export const clearToken = () => sessionStorage.removeItem(TOKEN_KEY);

/**
 * "owner/name" of the repository this site is published from. On GitHub Pages
 * it is read from the address (owner.github.io/name/), so it keeps working if
 * the repository is renamed; elsewhere it comes from src/config/site.ts.
 */
function repositoryName(): string {
  const owner = window.location.hostname.match(/^([^.]+)\.github\.io$/)?.[1];
  const name = import.meta.env.BASE_URL.split('/').filter(Boolean)[0];
  return owner && name ? `${owner}/${name}` : site.repository;
}

async function request<T>(token: string, path: string, init: RequestInit = {}): Promise<T> {
  const res = await fetch(API + path, {
    ...init,
    headers: {
      Accept: 'application/vnd.github+json',
      Authorization: `Bearer ${token}`,
      'X-GitHub-Api-Version': '2022-11-28',
      ...init.headers,
    },
  });
  if (!res.ok) {
    const body = (await res.json().catch(() => null)) as { message?: string } | null;
    throw new GitHubError(res.status, body?.message ?? `GitHub answered ${res.status}`);
  }
  return res.json() as Promise<T>;
}

const post = <T>(token: string, path: string, body: unknown, method = 'POST') =>
  request<T>(token, path, { method, body: JSON.stringify(body) });

/** Checks that the token may write to the repository, and finds its branch. */
export async function connect(token: string): Promise<Repo> {
  const repo = await request<{
    full_name: string;
    default_branch: string;
    permissions?: { push?: boolean };
  }>(token, `/repos/${repositoryName()}`);
  if (!repo.permissions?.push) {
    throw new GitHubError(403, 'This token cannot write to the repository.');
  }
  return { fullName: repo.full_name, branch: repo.default_branch };
}

/**
 * The project list as it is in the repository right now. This can be newer
 * than what the site shows, because publishing takes about a minute.
 */
export async function loadProjects(token: string, repo: Repo): Promise<StoredProject[]> {
  const res = await fetch(
    `${API}/repos/${repo.fullName}/contents/${PROJECTS_FILE}?ref=${repo.branch}`,
    {
      headers: { Accept: 'application/vnd.github.raw+json', Authorization: `Bearer ${token}` },
      cache: 'no-store',
    },
  );
  if (!res.ok) throw new GitHubError(res.status, `Could not read the project list (${res.status}).`);
  return (await res.json()) as StoredProject[];
}

/** File contents as base64, which is how GitHub takes binary files. */
function toBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(String(reader.result).split(',')[1] ?? '');
    reader.onerror = () => reject(reader.error ?? new Error('Could not read the file.'));
    reader.readAsDataURL(file);
  });
}

/** "/projects/x.png" on the site is "client/public/projects/x.png" in the repository. */
const repoPath = (sitePath: string) => IMAGES_DIR + sitePath.slice('/projects'.length);

/**
 * Saves the project list, uploads new images and deletes removed ones, all in
 * a single commit, so the site is rebuilt once and never from a half-saved
 * state.
 */
export async function publish(
  token: string,
  repo: Repo,
  projects: StoredProject[],
  newImages: NewImage[],
  removedImages: string[],
  message: string,
): Promise<void> {
  const base = `/repos/${repo.fullName}/git`;
  const ref = await request<{ object: { sha: string } }>(token, `${base}/ref/heads/${repo.branch}`);
  const parent = ref.object.sha;
  const commit = await request<{ tree: { sha: string } }>(token, `${base}/commits/${parent}`);

  const tree: { path: string; mode: '100644'; type: 'blob'; sha?: string | null; content?: string }[] = [
    {
      path: PROJECTS_FILE,
      mode: '100644',
      type: 'blob',
      content: JSON.stringify(projects, null, 2) + '\n',
    },
  ];
  for (const image of newImages) {
    const blob = await post<{ sha: string }>(token, `${base}/blobs`, {
      content: await toBase64(image.file),
      encoding: 'base64',
    });
    tree.push({ path: repoPath(image.path), mode: '100644', type: 'blob', sha: blob.sha });
  }
  // Only files in the images folder are ever deleted, and only ones that no
  // project uses any more.
  const stillUsed = new Set(projects.flatMap((p) => p.images));
  for (const path of new Set(removedImages)) {
    if (path.startsWith('/projects/') && !stillUsed.has(path)) {
      tree.push({ path: repoPath(path), mode: '100644', type: 'blob', sha: null });
    }
  }

  const newTree = await post<{ sha: string }>(token, `${base}/trees`, {
    base_tree: commit.tree.sha,
    tree,
  });
  const newCommit = await post<{ sha: string }>(token, `${base}/commits`, {
    message,
    tree: newTree.sha,
    parents: [parent],
  });
  await post(token, `${base}/refs/heads/${repo.branch}`, { sha: newCommit.sha }, 'PATCH');
}
