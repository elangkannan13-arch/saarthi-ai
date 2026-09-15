import React from 'react';
import { useDemoState, type LanguageType } from '../context/DemoStateContext';
import { Globe } from 'lucide-react';

export const LanguageSelector: React.FC = () => {
  const { language, setLanguage } = useDemoState();

  const languages: { code: LanguageType; name: string; nativeName: string }[] = [
    { code: 'en', name: 'English', nativeName: 'English' },
    { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்' },
    { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी' },
  ];

  return (
    <div className="flex items-center space-x-2 bg-slate-100 dark:bg-slate-900 p-1.5 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-inner">
      <div className="pl-2 pr-1 text-slate-400">
        <Globe className="w-4 h-4" />
      </div>
      {languages.map((lang) => (
        <button
          key={lang.code}
          onClick={() => setLanguage(lang.code)}
          className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
            language === lang.code
              ? 'bg-teal-600 text-white shadow-md shadow-teal-600/20 scale-[1.03]'
              : 'text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white'
          }`}
        >
          {lang.nativeName}
        </button>
      ))}
    </div>
  );
};
