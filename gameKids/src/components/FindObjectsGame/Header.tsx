import React from "react";
import { RefreshCw, Lightbulb } from "lucide-react";
import ProgressBar from "../../games/FindObjectsGame/ProgressBar";

interface HeaderProps {
  found: number;
  total: number;
  hintCount: number;
  gameComplete: boolean;
  onHint: () => void;
  onReset: () => void;
  hintedId: string | null; // Adicione esta linha!
}

const Header: React.FC<HeaderProps> = ({
  found,
  total,
  hintCount,
  gameComplete,
  onHint,
  onReset,
  hintedId, // Receba aqui!
}) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center w-full gap-4 p-3 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-xl shadow-md mb-4 sticky top-2 z-30 transition-colors duration-300">
      {/* ProgressBar à esquerda ou em cima */}
      <div className="flex-grow w-full md:w-auto">
        <ProgressBar found={found} total={total} />
      </div>

      {/* Botões de Ação à direita ou embaixo */}
      <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
        <button
          onClick={onHint}
          disabled={hintCount >= 3 || gameComplete || !!hintedId}
          className="flex items-center gap-1.5 px-3 sm:px-4 py-2 rounded-full font-semibold 
                     text-sm sm:text-base
                     bg-yellow-100 dark:bg-yellow-500/30 
                     text-yellow-700 dark:text-yellow-300 
                     hover:bg-yellow-200 dark:hover:bg-yellow-500/40 
                     disabled:opacity-50 disabled:cursor-not-allowed
                     shadow-sm hover:shadow-md transition-all duration-200 active:scale-95"
          aria-label="Pedir uma dica"
        >
          <Lightbulb size={18} className="sm:mr-0.5" />
          Dica
          <span 
            className="ml-1.5 bg-yellow-200 dark:bg-yellow-600 text-yellow-800 dark:text-yellow-100 
                       text-xs font-bold px-1.5 py-0.5 rounded-full transition-colors duration-300"
          >
            {3 - hintCount}
          </span>
        </button>

        <button
          onClick={onReset}
          className="flex items-center justify-center p-2.5 sm:p-3 rounded-full 
                     bg-emerald-100 dark:bg-emerald-500/30 
                     text-emerald-600 dark:text-emerald-300 
                     hover:bg-emerald-200 dark:hover:bg-emerald-500/40 
                     disabled:opacity-60 disabled:cursor-not-allowed
                     shadow-sm hover:shadow-md transition-all duration-200 active:scale-95"
          aria-label="Recomeçar jogo"
          disabled={gameComplete}
        >
          <RefreshCw size={20} />
        </button>
      </div>
    </div>
  );
};

export default Header;