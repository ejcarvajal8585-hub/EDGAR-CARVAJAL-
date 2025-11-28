
import React, { useState, useCallback } from 'react';
import { Operation, Language } from './types';
import { generatePythonCode } from './services/geminiService';
import { translations } from './constants';
import CodeBlock from './components/CodeBlock';
import OperationSelector from './components/OperationSelector';
import NumberInput from './components/NumberInput';
import LanguageToggle from './components/LanguageToggle';
import Header from './components/Header';

const App: React.FC = () => {
  const [num1, setNum1] = useState<string>('5');
  const [num2, setNum2] = useState<string>('10');
  const [operation, setOperation] = useState<Operation>(Operation.SUM);
  const [language, setLanguage] = useState<Language>(Language.ES);
  
  const [result, setResult] = useState<number | null>(null);
  const [pythonCode, setPythonCode] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');

  const currentTranslations = translations[language];

  const handleGenerate = useCallback(async () => {
    setError('');
    setResult(null);
    setPythonCode('');
    setIsLoading(true);

    const n1 = parseInt(num1, 10);
    const n2 = parseInt(num2, 10);

    if (isNaN(n1) || isNaN(n2) || n1 < 0 || n2 < 0) {
      setError(currentTranslations.errorPositive);
      setIsLoading(false);
      return;
    }

    // Perform local calculation immediately
    let calculatedResult: number;
    if (operation === Operation.SUM) {
      calculatedResult = n1 + n2;
    } else {
      calculatedResult = n1 * n2;
    }
    setResult(calculatedResult);

    try {
      const code = await generatePythonCode(n1, n2, operation, language);
      setPythonCode(code);
    } catch (e) {
      console.error(e);
      setError(currentTranslations.errorApi);
    } finally {
      setIsLoading(false);
    }
  }, [num1, num2, operation, language, currentTranslations]);

  return (
    <div className="min-h-screen bg-slate-900 flex flex-col items-center p-4 sm:p-6 lg:p-8 font-sans">
      <div className="w-full max-w-4xl mx-auto">
        <div className="flex justify-end mb-4">
          <LanguageToggle language={language} setLanguage={setLanguage} />
        </div>
        
        <Header title={currentTranslations.title} subtitle={currentTranslations.subtitle} />

        <main className="mt-8 bg-slate-800/50 p-6 rounded-2xl shadow-2xl backdrop-blur-sm border border-slate-700">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <NumberInput
              id="num1"
              label={currentTranslations.number1}
              value={num1}
              onChange={(e) => setNum1(e.target.value)}
            />
            <NumberInput
              id="num2"
              label={currentTranslations.number2}
              value={num2}
              onChange={(e) => setNum2(e.target.value)}
            />
          </div>

          <OperationSelector
            operation={operation}
            setOperation={setOperation}
            translations={currentTranslations}
          />

          <div className="mt-8">
            <button
              onClick={handleGenerate}
              disabled={isLoading}
              className="w-full bg-sky-500 hover:bg-sky-600 disabled:bg-slate-600 disabled:cursor-not-allowed text-white font-bold py-3 px-4 rounded-lg text-lg transition-all duration-300 ease-in-out flex items-center justify-center shadow-lg hover:shadow-sky-500/50"
            >
              {isLoading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {currentTranslations.generating}
                </>
              ) : (
                currentTranslations.generateButton
              )}
            </button>
          </div>

          {error && (
            <div className="mt-6 p-4 bg-red-900/50 border border-red-500 text-red-300 rounded-lg text-center">
              {error}
            </div>
          )}

          {(result !== null || pythonCode) && !isLoading && (
            <div className="mt-8 space-y-6 animate-fade-in">
              {result !== null && (
                <div>
                  <h3 className="text-xl font-semibold text-sky-300 mb-2">{currentTranslations.resultTitle}</h3>
                  <div className="bg-slate-900 p-4 rounded-lg text-2xl font-mono text-center text-green-400 border border-slate-700">
                    {result}
                  </div>
                </div>
              )}
              {pythonCode && <CodeBlock code={pythonCode} title={currentTranslations.codeTitle} />}
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default App;
