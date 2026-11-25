import { createContext, useContext } from 'react';
import { storedProjects, textFor } from '../data/projects';
import type { Project } from '../lib/api';
import { dictionaries, LANGUAGES, type Dictionary, type Lang } from './translations';

export interface LanguageValue {
  lang: Lang;
  setLang: (lang: Lang) => void;
  t: Dictionary;
}

export const LanguageContext = createContext<LanguageValue>({
  lang: 'en',
  setLang: () => {},
  t: dictionaries.en,
});

export const useLanguage = () => useContext(LanguageContext);

const isLang = (value: string | null): value is Lang =>
  LANGUAGES.some((l) => l.code === value);

/** Saved choice first, then the browser language, then English. */
export function initialLang(): Lang {
  const saved = localStorage.getItem('lang');
  if (isLang(saved)) return saved;
  const browser = navigator.language.slice(0, 2).toLowerCase();
  return isLang(browser) ? browser : 'en';
}

/**
 * Projects from projects.json carry their text in every language; projects
 * that come from the API are shown as stored.
 */
export function localizeProject(project: Project, lang: Lang): Project {
  const stored = storedProjects.find((p) => p.id === project.id);
  return stored ? { ...project, ...textFor(stored, lang) } : project;
}
