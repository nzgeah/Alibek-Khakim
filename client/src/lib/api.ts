import { staticProjects } from '../data/projects';

export interface Project {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  technologies: string[];
  images: string[];
  status: string;
  githubLink?: string | null;
  liveDemoLink?: string | null;
  myRole?: string | null;
  isFeatured?: boolean;
}

// Set VITE_API_URL to point at the server. In development it defaults to the
// local server; a production build without it runs on the bundled projects.
export const API_URL: string =
  import.meta.env.VITE_API_URL ?? (import.meta.env.DEV ? 'http://localhost:5000' : '');

export const apiUrl = (path: string) => `${API_URL}${path}`;

/** Uploaded images are served by the API; bundled and absolute ones are used as-is. */
export const imageUrl = (src: string) =>
  src.startsWith('/uploads/') ? apiUrl(src) : src;

async function fetchJson<T>(path: string): Promise<T> {
  const res = await fetch(apiUrl(path), { signal: AbortSignal.timeout(4000) });
  if (!res.ok) throw new Error(`Request failed: ${res.status}`);
  return res.json() as Promise<T>;
}

/** Projects from the API, or the bundled list when it is offline or empty. */
export async function getProjects(): Promise<Project[]> {
  if (!API_URL) return staticProjects;
  try {
    const projects = await fetchJson<Project[]>('/api/projects');
    return projects.length ? projects : staticProjects;
  } catch {
    return staticProjects;
  }
}

export async function getProject(id: string): Promise<Project | null> {
  const bundled = staticProjects.find((p) => p.id === id);
  if (bundled || !API_URL) return bundled ?? null;
  try {
    return await fetchJson<Project>(`/api/projects/${id}`);
  } catch {
    return null;
  }
}
