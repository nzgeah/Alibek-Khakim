import type { Lang } from '../i18n/translations';
import type { Project } from '../lib/api';
import stored from './projects.json';

// The portfolio's projects live in projects.json next to this file, and their
// images in client/public/projects. The admin page (/admin) edits both by
// committing to the repository; the site is rebuilt from them on every push.
// The file can also be edited by hand.

/** The texts of a project in one language. */
export interface ProjectText {
  title: string;
  status: string;
  shortDescription: string;
  fullDescription: string;
}

/** A project as it is saved in projects.json. */
export interface StoredProject {
  id: string;
  technologies: string[];
  images: string[];
  /** Uploaded files (/projects/…) or YouTube / Vimeo links. */
  videos?: string[];
  githubLink?: string;
  liveDemoLink?: string;
  myRole?: string;
  isFeatured?: boolean;
  /** English is required; other languages fall back to it when missing. */
  text: { en: ProjectText } & Partial<Record<Lang, ProjectText>>;
}

export const storedProjects = stored as StoredProject[];

/** The texts in one language; any field left empty falls back to English. */
export const textFor = (project: StoredProject, lang: Lang): ProjectText => {
  const en = project.text.en;
  const text = project.text[lang];
  if (!text) return en;
  return {
    title: text.title.trim() || en.title,
    status: text.status.trim() || en.status,
    shortDescription: text.shortDescription.trim() || en.shortDescription,
    fullDescription: text.fullDescription.trim() || en.fullDescription,
  };
};

export const toProject = ({ text, ...rest }: StoredProject, lang: Lang = 'en'): Project => ({
  ...rest,
  ...textFor({ text, ...rest }, lang),
});

export const staticProjects: Project[] = storedProjects.map((project) => toProject(project));
