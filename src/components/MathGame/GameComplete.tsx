import React from "react";
import CelebrationEffect from "./CelebrationEffect";
import Mascot from "../Mascot";

interface GameCompleteProps {
  score: number;
  onReset: () => void;
}

const getStars = (score: number) => {
  // 3 estrelas: 90-100 pontos, 2 estrelas: 60-89, 1 estrela: 30-59, 0: menos
  if (score >= 90) return 3;
  if (score >= 60) return 2;
  if (score >= 30) return 1;
  return 0;
};

const GameComplete: React.FC<GameCompleteProps> = ({ score, onReset }) => {
  const stars = getStars(score);

  return (
    <div className="text-center py-10 px-8 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl shadow-2xl relative overflow-hidden animate-fade-in">
      {/* Efeito de confete animado */}
      <CelebrationEffect type="confetti" />
      <div className="flex justify-center mb-4">
        <Mascot size={80} bounce />
      </div>
      <h2 className="text-3xl font-extrabold text-blue-800 mb-2 drop-shadow-lg">
        Parabéns!
      </h2>
      <p className="text-xl text-blue-600 mb-4 font-semibold">
        Você completou o jogo com {score} pontos!
      </p>
      {/* Sistema de estrelas */}
      <div className="flex justify-center gap-2 mb-4">
        {[1, 2, 3].map((n) => (
          <span
            key={n}
            aria-label={n <= stars ? "Estrela conquistada" : "Estrela não conquistada"}
            style={{ fontSize: 36, color: n <= stars ? "#FFD600" : "#E0E0E0" }}
            role="img"
          >
            ★
          </span>
        ))}
      </div>
      <p className="text-base text-gray-700 mb-6 font-comic">
        Você ganhou <span className="font-bold text-yellow-500">{stars}</span> {stars === 1 ? "estrela" : "estrelas"}!
      </p>
      <button
        onClick={onReset}
        className="px-8 py-4 bg-gradient-to-br from-blue-500 to-blue-700 text-white rounded-xl font-bold shadow-lg hover:from-blue-600 hover:to-blue-800 hover:shadow-2xl transition-all duration-500 active:scale-95"
      >
        Jogar Novamente
      </button>
    </div>
  );
};

export default GameComplete;