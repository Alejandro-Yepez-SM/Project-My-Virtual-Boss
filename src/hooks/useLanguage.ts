import { useState, useEffect, createContext, useContext } from "react";
import { Language, useTranslation, getLanguageDirection } from "@/core/i18n";
import { useReactiveVar } from "@apollo/client";
import { userData } from "@/store/user";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string, fallback?: string) => string;
  direction: "ltr" | "rtl";
}

export const LanguageContext = createContext<LanguageContextType | null>(null);

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    // Fallback for when context is not available
    const { t } = useTranslation("en");
    return {
      language: "en" as Language,
      setLanguage: () => {},
      t,
      direction: "ltr" as const,
    };
  }
  return context;
}

export function useLanguageProvider() {
  const userInfo = useReactiveVar(userData);

  const [language, setLanguageState] = useState<Language>(() => {
    // Initialize with saved language or default to English
    const savedLanguage = localStorage.getItem(
      "preferred-language"
    ) as Language;
    return savedLanguage || "en";
  });

  // Update language when user data loads
  useEffect(() => {
    const userLanguage = (userInfo as any)?.language as Language;
    if (userLanguage && userLanguage !== language) {
      setLanguageState(userLanguage);
    }
  }, [userInfo]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
    localStorage.setItem("preferred-language", lang);

    // Update document language and direction
    document.documentElement.lang = lang;
    document.documentElement.dir = getLanguageDirection(lang);
  };

  const { t } = useTranslation(language);
  const direction = getLanguageDirection(language);

  return {
    language,
    setLanguage,
    t,
    direction,
  };
}
