
import React, { useState } from 'react';
import { translations } from '../constants';
import { Language } from '../types';

interface CodeBlockProps {
  code: string;
  title: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ code, title }) => {
  const [copied, setCopied] = useState(false);

  // A simple way to get language, assuming it's available or default to EN
  // In a real app this might come from a context.
  const lang: Language = document.documentElement.lang === 'es' ? Language.ES : Language.EN;
  const t = translations[lang];

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div>
      <h3 className="text-xl font-semibold text-sky-300 mb-2">{title}</h3>
      <div className="bg-slate-900 rounded-lg overflow-hidden border border-slate-700">
        <div className="flex justify-end p-2 bg-slate-800">
          <button
            onClick={handleCopy}
            className="flex items-center px-3 py-1 text-sm bg-slate-700 hover:bg-slate-600 rounded-md transition-colors"
          >
            {copied ? (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                {t.copied}
              </>
            ) : (
              <>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
                {t.copy}
              </>
            )}
          </button>
        </div>
        <pre className="p-4 text-sm whitespace-pre-wrap font-mono text-cyan-300">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
};

export default CodeBlock;
