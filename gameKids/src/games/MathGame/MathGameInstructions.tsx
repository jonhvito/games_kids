import React from 'react';
import { Calculator } from 'lucide-react';

interface MathGameInstructionsProps {
  onStart: () => void;
}

const MathGameInstructions: React.FC<MathGameInstructionsProps> = ({ onStart }) => {
  return (
    <div className="max-w-3xl mx-auto py-4">
      <div className="text-center mb-6">
        <Calculator size={48} className="mx-auto text-blue-600 mb-2 drop-shadow" />
        <h2 className="title-kids">Jogo de Contas com Ilustrações</h2>
        <p className="text-lg text-gray-700 font-comic mb-2">
          Aprenda matemática de forma divertida com alimentos!
        </p>
      </div>
      
      <div className="bg-blue-50 p-6 rounded-3xl mb-6 shadow-card border-2 border-blue-200">
        <h3 className="text-xl font-bold text-blue-700 mb-3 font-baloo">Como Jogar:</h3>
        <ul className="space-y-2 text-gray-700 font-comic">
          <li className="flex items-start">
            <span className="bg-blue-200 text-blue-800 font-bold rounded-full w-7 h-7 flex items-center justify-center mr-3 mt-0.5 shadow">
              1
            </span>
            <p>Você verá alimentos no lugar de números em contas de adição e subtração.</p>
          </li>
          <li className="flex items-start">
            <span className="bg-blue-200 text-blue-800 font-bold rounded-full w-7 h-7 flex items-center justify-center mr-3 mt-0.5 shadow">
              2
            </span>
            <p>Escolha a resposta correta entre as três opções disponíveis.</p>
          </li>
          <li className="flex items-start">
            <span className="bg-blue-200 text-blue-800 font-bold rounded-full w-7 h-7 flex items-center justify-center mr-3 mt-0.5 shadow">
              3
            </span>
            <p>Ganhe 10 pontos por cada resposta correta!</p>
          </li>
          <li className="flex items-start">
            <span className="bg-blue-200 text-blue-800 font-bold rounded-full w-7 h-7 flex items-center justify-center mr-3 mt-0.5 shadow">
              4
            </span>
            <p>Complete 10 perguntas para finalizar o jogo.</p>
          </li>
        </ul>
      </div>
      
      <div className="text-center">
        <button
          onClick={onStart}
          className="btn-kids bg-blue-600 hover:bg-blue-700 text-white font-baloo text-lg px-8 py-4 rounded-full shadow-xl transition-transform duration-200 hover:scale-105"
        >
          Começar a Jogar
        </button>
      </div>
    </div>
  );
};

export default MathGameInstructions;