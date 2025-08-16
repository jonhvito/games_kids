import React from 'react';
import { BookOpen } from 'lucide-react';

interface WordSearchInstructionsProps {
  onStart: () => void;
}

const WordSearchInstructions: React.FC<WordSearchInstructionsProps> = ({ onStart }) => {
  return (
    <div className="max-w-3xl mx-auto py-4">
      <div className="text-center mb-6">
        <BookOpen size={48} className="mx-auto text-purple-600 mb-2 drop-shadow" />
        <h2 className="title-kids">Caça-Palavras Temático</h2>
        <p className="text-lg text-gray-700 font-comic mb-2">
          Encontre palavras relacionadas a alimentos escondidas no grid!
        </p>
      </div>
      
      <div className="bg-purple-50 p-6 rounded-3xl mb-6 shadow-card border-2 border-purple-200">
        <h3 className="text-xl font-bold text-purple-700 mb-3 font-baloo">Como Jogar:</h3>
        <ul className="space-y-2 text-gray-700 font-comic">
          <li className="flex items-start">
            <span className="bg-purple-200 text-purple-800 font-bold rounded-full w-7 h-7 flex items-center justify-center mr-3 mt-0.5 shadow">
              1
            </span>
            <p>Procure as palavras listadas no lado direito da tela.</p>
          </li>
          <li className="flex items-start">
            <span className="bg-purple-200 text-purple-800 font-bold rounded-full w-7 h-7 flex items-center justify-center mr-3 mt-0.5 shadow">
              2
            </span>
            <p>Clique e arraste para selecionar as letras em sequência.</p>
          </li>
          <li className="flex items-start">
            <span className="bg-purple-200 text-purple-800 font-bold rounded-full w-7 h-7 flex items-center justify-center mr-3 mt-0.5 shadow">
              3
            </span>
            <p>As palavras podem estar na horizontal, vertical ou diagonal.</p>
          </li>
          <li className="flex items-start">
            <span className="bg-purple-200 text-purple-800 font-bold rounded-full w-7 h-7 flex items-center justify-center mr-3 mt-0.5 shadow">
              4
            </span>
            <p>Encontre todas as palavras para completar o jogo!</p>
          </li>
        </ul>
      </div>
      
      <div className="text-center">
        <button
          onClick={onStart}
          className="btn-kids bg-purple-600 hover:bg-purple-700 text-white font-baloo text-lg px-8 py-4 rounded-full shadow-xl transition-transform duration-200 hover:scale-105"
        >
          Começar a Jogar
        </button>
      </div>
    </div>
  );
};

export default WordSearchInstructions;