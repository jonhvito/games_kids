import React from "react";
import { RefreshCw } from "lucide-react";

interface HeaderProps {
  score: number;
  questionsAnswered: number;
  onReset: () => void;
}

const Header: React.FC<HeaderProps> = ({ score, questionsAnswered, onReset }) => {
  return (
    <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-3">
      <div>
        <p className="text-lg font-extrabold text-gray-700 tracking-wide font-baloo drop-shadow">
          Pontuação: <span className="text-blue-600">{score}</span>
        </p>
        <p className="text-sm text-gray-500 font-comic">
          Questão {questionsAnswered < 10 ? questionsAnswered + 1 : 10} de 10
        </p>
      </div>
      <button
        onClick={onReset}
        className="p-2 rounded-full bg-gradient-to-br from-blue-200 to-blue-400 text-blue-700 hover:from-blue-300 hover:to-blue-500 shadow-lg hover:shadow-xl transition-all duration-300 active:scale-90"
        aria-label="Recomeçar jogo"
      >
        <RefreshCw size={22} />
      </button>
    </div>
  );
};

export default Header;