
import React from 'react';
import { Language } from '../types';

interface LanguageToggleProps {
  language: Language;
  setLanguage: (lang: Language) => void;
}

const LanguageToggle: React.FC<LanguageToggleProps> = ({ language, setLanguage }) => {
  const toggleLanguage = () => {
    const newLang = language === Language.EN ? Language.ES : Language.EN;
    setLanguage(newLang);
    document.documentElement.lang = newLang;
  };

  return (
    <button
      onClick={toggleLanguage}
      className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-slate-300 bg-slate-800 border border-slate-700 rounded-lg hover:bg-slate-700 transition-colors"
    >
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 21l5.25-11.25L21 21m-9-3h7.5M3 5.621a48.474 48.474 0 016-.371m0 0c1.12 0 2.233.038 3.334.114M9 5.25V3m3.334 2.364C13.18 7.09 13.5 7.5 13.5 8c0 .5-.32.91-.666 1.136m-1.114 0c-1.118 0-2.275-.08-3.334-.228m-1.296 1.296A12.06 12.06 0 012.25 9m1.88-1.545C2.96 6.345 2.25 5.25 2.25 4.5c0-.936.936-1.5 2.003-1.5 1.067 0 2.003.564 2.003 1.5Z" />
      </svg>
      <span>{language === Language.EN ? 'Español' : 'English'}</span>
    </button>
  );
};

export default LanguageToggle;
