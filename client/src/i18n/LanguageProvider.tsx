import { useEffect, useMemo, useState, type ReactNode } from 'react';
import { initialLang, LanguageContext } from './context';
import { dictionaries, type Lang } from './translations';

export default function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(initialLang);

  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);

  const value = useMemo(
    () => ({
      lang,
      t: dictionaries[lang],
      setLang: (next: Lang) => {
        localStorage.setItem('lang', next);
        setLangState(next);
      },
    }),
    [lang],
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}
