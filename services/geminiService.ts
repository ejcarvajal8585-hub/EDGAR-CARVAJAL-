
import { GoogleGenAI } from "@google/genai";
import { Operation, Language } from '../types';

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY as string });

const getPrompt = (num1: number, num2: number, operation: Operation, language: Language): string => {
  if (language === Language.ES) {
    const op_text = operation === Operation.SUM ? 'sumar' : 'multiplicar';
    const op_symbol = operation === Operation.SUM ? '+' : '*';
    return `
      Crea un programa simple en Python que haga lo siguiente:
      1. Define dos variables, 'num1' con el valor ${num1} y 'num2' con el valor ${num2}.
      2. Calcula el resultado de ${op_text} 'num1' y 'num2'.
      3. Almacena el resultado en una variable llamada 'resultado'.
      4. Imprime el resultado en un formato claro, por ejemplo: "La ${operation === Operation.SUM ? 'suma' : 'multiplicación'} de ${num1} y ${num2} es: [resultado]".
      
      El código debe ser completo, ejecutable y seguir las buenas prácticas de Python. No incluyas explicaciones adicionales, solo el código.
      `;
  } else {
    const op_text = operation === Operation.SUM ? 'add' : 'multiply';
    const op_symbol = operation === Operation.SUM ? '+' : '*';
    return `
      Create a simple Python program that does the following:
      1. Define two variables, 'num1' with the value ${num1} and 'num2' with the value ${num2}.
      2. Calculate the result of ${op_text}ing 'num1' and 'num2'.
      3. Store the result in a variable named 'result'.
      4. Print the result in a clear format, for example: "The ${operation} of ${num1} and ${num2} is: [result]".
      
      The code should be complete, executable, and follow Python best practices. Do not include any extra explanations, only the code.
      `;
  }
};


export const generatePythonCode = async (
  num1: number,
  num2: number,
  operation: Operation,
  language: Language
): Promise<string> => {
  const prompt = getPrompt(num1, num2, operation, language);
  
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    
    let code = response.text || '';
    
    // Clean up the response to ensure it's just Python code
    code = code.replace(/^```python\n/, '').replace(/\n```$/, '').trim();

    return code;
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("Failed to generate Python code.");
  }
};
