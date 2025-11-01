import React from "react";

interface ProgressBarProps {
  found: number;
  total: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ found, total }) => {
  const percentage = total > 0 ? (found / total) * 100 : 0;

  return (
    <div className="w-full bg-gray-200 rounded-full h-3 mb-4">
      <div
        className="bg-gradient-to-r from-amber-400 to-amber-600 h-3 rounded-full transition-all duration-500 ease-out flex items-center justify-end"
        style={{ width: `${percentage}%` }}
      >
        {percentage > 5 && percentage < 100 && (
          <div className="w-2 h-2 rounded-full bg-amber-200 dark:bg-amber-300 opacity-75 mr-1" />
        )}
      </div>
    </div>
  );
};

interface HeaderProps {
  found: number;
  total: number;
  hintCount: number;
  gameComplete: boolean;
  onHint: () => void;
  onReset: () => void;
  hintedId: string | null;
}

const Header: React.FC<HeaderProps> = ({
  found,
  total,
  hintCount,
  gameComplete,
  onHint,
  onReset,
  hintedId,
}) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center w-full gap-4 p-3 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-xl shadow-md mb-4 sticky top-2 z-30 transition-colors duration-300">
      <div className="flex-grow w-full md:w-auto">
        <ProgressBar found={found} total={total} />
      </div>
      
      <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
        <button
          onClick={onHint}
          disabled={hintCount >= 3 || gameComplete || !!hintedId}
          className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 flex items-center gap-1
            ${hintCount >= 3 || gameComplete || !!hintedId
              ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
              : 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200 active:scale-95'
            }
          `}
        >
          💡 {hintCount}/3
        </button>
        
        <button
          onClick={onReset}
          className="px-3 py-2 rounded-lg text-sm font-medium bg-blue-100 text-blue-700 hover:bg-blue-200 transition-all duration-200 active:scale-95"
        >
          🔄 Reiniciar
        </button>
      </div>
    </div>
  );
};

export default Header;
