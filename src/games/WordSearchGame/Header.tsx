import React from "react";

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
        <button
          onClick={onHint}
          disabled={hintCount >= maxHints || gameComplete}
          className={`p-2 rounded-full bg-yellow-100 text-yellow-600 hover:bg-yellow-200 transition active:scale-90 duration-150 flex items-center border-2 border-yellow-300 shadow-sm
            ${hintCount >= maxHints || gameComplete ? 'opacity-50 cursor-not-allowed' : 'hover:shadow-md'}
            ${hintAnimating ? 'animate-pulse' : ''}
          `}
        >
          💡 {hintCount}/{maxHints}
        </button>
        
        <button
          onClick={onReset}
          className="p-2 rounded-full bg-blue-100 text-blue-600 hover:bg-blue-200 transition active:scale-90 duration-150 border-2 border-blue-300 shadow-sm hover:shadow-md"
        >
          🔄
        </button>
      </div>
    </div>
  );
};

export default Header;
