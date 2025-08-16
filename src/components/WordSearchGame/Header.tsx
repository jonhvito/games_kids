import React from "react";
import { RefreshCw, Lightbulb } from "lucide-react";
import { motion } from "framer-motion";

interface HeaderProps {
  hintCount: number;
  maxHints: number;
  gameComplete: boolean;
  hintAnimating: boolean;
  onHint: () => void;
  onReset: () => void;
}

const Header: React.FC<HeaderProps> = ({
  hintCount,
  maxHints,
  gameComplete,
  hintAnimating,
  onHint,
  onReset,
}) => {
  return (
    <div className="flex justify-between items-center mb-4">
      <h3 className="text-xl font-bold text-gray-800">Encontre as palavras</h3>
      <div className="flex gap-2">
        {/* Botão de Dica */}
        <motion.button
          whileTap={{ scale: 0.85 }}
          onClick={onHint}
          disabled={hintCount >= maxHints || gameComplete}
          className={`p-2 rounded-full bg-yellow-100 text-yellow-600 hover:bg-yellow-200 transition active:scale-90 duration-150 flex items-center border-2 border-yellow-300 shadow-sm
            ${hintCount >= maxHints || gameComplete ? 'opacity-50 cursor-not-allowed' : ''}
            ${hintAnimating ? 'animate-bounce' : ''}
          `}
          aria-label="Dica"
        >
          <Lightbulb size={20} />
          <span className="ml-1 text-xs font-bold">{maxHints - hintCount}</span>
        </motion.button>

        {/* Botão de Reset */}
        <motion.button
          whileTap={{ scale: 0.85 }}
          onClick={onReset}
          className="p-2 rounded-full bg-purple-100 text-purple-600 hover:bg-purple-200 transition active:scale-90 duration-150 border-2 border-purple-200"
          aria-label="Recomeçar jogo"
        >
          <RefreshCw size={20} />
        </motion.button>
      </div>
    </div>
  );
};

export default Header;