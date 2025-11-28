
import { Language } from './types';

type Translation = {
  title: string;
  subtitle: string;
  number1: string;
  number2: string;
  operation: string;
  sum: string;
  multiply: string;
  generateButton: string;
  generating: string;
  resultTitle: string;
  codeTitle: string;
  errorPositive: string;
  errorApi: string;
  copy: string;
  copied: string;
};

export const translations: Record<Language, Translation> = {
  [Language.EN]: {
    title: 'Python Code Generator',
    subtitle: 'Enter two positive integers, choose an operation, and get the result and the Python code.',
    number1: 'First Number',
    number2: 'Second Number',
    operation: 'Operation',
    sum: 'Sum',
    multiply: 'Multiply',
    generateButton: 'Generate Code',
    generating: 'Generating...',
    resultTitle: 'Calculation Result',
    codeTitle: 'Generated Python Code',
    errorPositive: 'Please enter two valid positive integers.',
    errorApi: 'Failed to generate code. Please check your API key and try again.',
    copy: 'Copy code',
    copied: 'Copied!',
  },
  [Language.ES]: {
    title: 'Generador de Código Python',
    subtitle: 'Introduce dos enteros positivos, elige una operación y obtén el resultado y el código en Python.',
    number1: 'Primer Número',
    number2: 'Segundo Número',
    operation: 'Operación',
    sum: 'Suma',
    multiply: 'Multiplicación',
    generateButton: 'Generar Código',
    generating: 'Generando...',
    resultTitle: 'Resultado del Cálculo',
    codeTitle: 'Código Python Generado',
    errorPositive: 'Por favor, introduce dos enteros positivos válidos.',
    errorApi: 'Error al generar el código. Revisa tu clave de API e inténtalo de nuevo.',
    copy: 'Copiar código',
    copied: '¡Copiado!',
  },
};
