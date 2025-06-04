import React from 'react';
import type { Word } from './wordSearchUtils';
import { CheckCircle } from 'lucide-react';

interface WordListProps {
  words: Word[];
  foundWords: string[];
  lastFoundWord: string | null;
}

const WordList: React.FC<WordListProps> = ({ words, foundWords, lastFoundWord }) => {
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm overflow-x-auto sm:overflow-visible">
      <h4 className="text-lg font-bold text-gray-800 mb-3">
        Palavras a encontrar
      </h4>
      <ul className="space-y-2 min-w-[180px]">
        {words.map((word, index) => (
          <li 
            key={index}
            className={`flex items-center p-2 rounded-md transition-all duration-300
              text-base sm:text-lg
              ${
                foundWords.includes(word.text) 
                  ? lastFoundWord === word.text 
                    ? 'bg-green-100 text-green-800 shadow-md scale-105 ring-2 ring-green-400'
                    : 'bg-green-50 text-green-700'
                  : lastFoundWord === word.text
                    ? 'bg-yellow-100 text-yellow-800 ring-2 ring-yellow-400 scale-105'
                    : 'text-gray-700'
              }`}
            style={{
              minWidth: '120px',
              whiteSpace: 'nowrap'
            }}
          >
            {foundWords.includes(word.text) ? (
              <CheckCircle size={18} className="text-green-600 mr-2" />
            ) : (
              <div className="w-4 h-4 rounded-full border-2 border-gray-300 mr-2"></div>
            )}
            <span className={`font-medium ${foundWords.includes(word.text) ? 'line-through' : ''}`}>
              {word.text}
            </span>
          </li>
        ))}
      </ul>
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex justify-between text-sm font-medium">
          <span className="text-gray-600">Encontradas:</span>
          <span className="text-purple-600">{foundWords.length}/{words.length}</span>
        </div>
        <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-purple-600 h-2 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${(foundWords.length / words.length) * 100}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default WordList;