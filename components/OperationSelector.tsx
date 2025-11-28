
import React from 'react';
import { Operation } from '../types';

interface OperationSelectorProps {
  operation: Operation;
  setOperation: (op: Operation) => void;
  translations: {
    operation: string;
    sum: string;
    multiply: string;
  };
}

const OperationSelector: React.FC<OperationSelectorProps> = ({ operation, setOperation, translations }) => {
  const options = [
    { id: Operation.SUM, label: translations.sum },
    { id: Operation.MULTIPLY, label: translations.multiply },
  ];

  return (
    <div className="mt-6">
      <label className="block text-sm font-medium text-slate-300 mb-2">{translations.operation}</label>
      <div className="flex bg-slate-700/50 rounded-lg p-1 space-x-1">
        {options.map((option) => (
          <button
            key={option.id}
            onClick={() => setOperation(option.id)}
            className={`w-full py-2.5 text-sm font-semibold rounded-md transition-colors duration-300
              ${operation === option.id ? 'bg-sky-500 text-white shadow' : 'text-slate-300 hover:bg-slate-600/50'}`}
          >
            {option.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default OperationSelector;
