import React from "react";

interface HeaderProps {
  score: number;
  questionsAnswered: number;
  totalQuestions: number;
  highScore: number;
}

const Header: React.FC<HeaderProps> = ({
  score,
  questionsAnswered,
  totalQuestions,
  highScore,
}) => {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 mb-6 shadow-lg">
      <div className="flex justify-between items-center mb-2">
        <div className="text-center">
          <p className="text-sm text-gray-600">Pontos</p>
          <p className="text-2xl font-bold text-emerald-600">{score}</p>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-600">Progresso</p>
          <p className="text-lg font-semibold text-blue-600">
            {questionsAnswered}/{totalQuestions}
          </p>
        </div>
        <div className="text-center">
          <p className="text-sm text-gray-600">Recorde</p>
          <p className="text-lg font-bold text-yellow-600">🏆 {highScore}</p>
        </div>
      </div>
      
      {/* Barra de progresso */}
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-gradient-to-r from-emerald-400 to-emerald-600 h-2 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${(questionsAnswered / totalQuestions) * 100}%` }}
        />
      </div>
    </div>
  );
};

export default Header;
