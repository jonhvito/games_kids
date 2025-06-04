import React from 'react';
import { Search } from 'lucide-react'; // Importando apenas Search, pois Zap não é utilizado
import Mascot from '../../components/Mascot'; // Supondo que você queira adicionar o mascote

interface FindObjectsInstructionsProps {
  onStart: () => void;
}

const FindObjectsInstructions: React.FC<FindObjectsInstructionsProps> = ({ onStart }) => {
  const instructions = [
    "Observe a lista de alimentos que você precisa encontrar.",
    "Procure cuidadosamente na imagem e clique nos locais onde você acha que os alimentos estão escondidos.",
    "Cada vez que você encontrar um alimento, ele será marcado na sua lista.",
    "Tente encontrar todos os alimentos para completar o jogo!" 
    // Removido "10" para ser genérico, já que o número pode variar
  ];

  return (
    <div className="max-w-2xl mx-auto px-4 py-8 sm:py-12 text-center">
      {/* Cabeçalho com Mascote e Título */}
      <div className="mb-8 sm:mb-10">
        <Mascot size={80} bounce className="mx-auto mb-4" />
        <Search size={40} className="mx-auto text-green-500 dark:text-green-400 mb-3 transition-colors duration-300" strokeWidth={2.5} />
        <h1 className="title-kids text-primary dark:text-orange-400 mb-2">Encontre os Objetos!</h1>
        <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-300 font-comic transition-colors duration-300">
          Encontre todos os alimentos escondidos na imagem para vencer!
        </p>
      </div>
      
      {/* Caixa de Instruções */}
      <div 
        className="bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-2xl shadow-lg 
                   border-2 border-green-300 dark:border-green-600 
                   mb-8 sm:mb-10 text-left transition-all duration-300"
      >
        <h3 className="text-xl sm:text-2xl font-bold text-green-600 dark:text-green-300 mb-4 sm:mb-5 font-baloo text-center sm:text-left">
          Como Jogar:
        </h3>
        <ul className="space-y-3 sm:space-y-4">
          {instructions.map((text, index) => (
            <li key={index} className="flex items-start gap-3">
              <span 
                className="bg-green-100 dark:bg-green-700 text-green-700 dark:text-green-200 
                           font-bold rounded-full w-7 h-7 sm:w-8 sm:h-8 
                           flex items-center justify-center flex-shrink-0 
                           mt-0.5 shadow-sm transition-colors duration-300"
              >
                {index + 1}
              </span>
              <p className="text-slate-700 dark:text-slate-300 font-comic text-base sm:text-lg transition-colors duration-300">
                {text}
              </p>
            </li>
          ))}
        </ul>
      </div>
      
      {/* Botão de Iniciar */}
      <div className="text-center">
        <button
          onClick={onStart}
          className="btn-kids bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-500 
                     text-white font-baloo text-lg 
                     px-10 py-4 rounded-full shadow-xl 
                     transition-all duration-300 ease-in-out hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-300 dark:focus:ring-green-700"
        >
          Começar a Jogar!
        </button>
      </div>
    </div>
  );
};

export default FindObjectsInstructions;