import React from "react";
import Confetti from "react-confetti";
import { motion, AnimatePresence } from "framer-motion";
import Mascot from "../Mascot";

interface CompleteModalProps {
  onReset: () => void;
}

const getStars = (found: number, total: number) => {
  // 3 estrelas: 100%, 2 estrelas: >=70%, 1 estrela: >=40%, 0: menos
  const percent = (found / total) * 100;
  if (percent >= 100) return 3;
  if (percent >= 70) return 2;
  if (percent >= 40) return 1;
  return 0;
};

const CompleteModal: React.FC<CompleteModalProps & { foundWords?: number; totalWords?: number }> = ({
  onReset,
  foundWords = 0,
  totalWords = 0,
}) => {
  const stars = totalWords > 0 ? getStars(foundWords, totalWords) : 3;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-10">
      <AnimatePresence>
        <motion.div
          initial={{ scale: 0.85, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.85, opacity: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="relative z-10 bg-white p-8 rounded-3xl shadow-card text-center max-w-md border-4 border-purple-300 animate-fade-in"
        >
          {/* Confetti animado */}
          <Confetti
            width={window.innerWidth}
            height={window.innerHeight}
            numberOfPieces={180}
            recycle={false}
            gravity={0.18}
            initialVelocityY={18}
            wind={0.01}
            tweenDuration={8000}
            run={true}
            className="pointer-events-none"
          />
          {/* Mascote animado */}
          <div className="flex justify-center mb-2">
            <Mascot size={60} bounce />
          </div>
          <h2 className="text-3xl font-extrabold text-purple-600 mb-2 font-baloo drop-shadow">Parabéns!</h2>
          <p className="text-lg text-gray-700 mb-4 font-comic">
            Você encontrou todas as palavras!
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
            className="btn-kids bg-purple-600 hover:bg-purple-700 text-white font-baloo text-lg px-8 py-4 rounded-full shadow-xl transition-transform duration-200 hover:scale-105"
          >
            Jogar Novamente
          </button>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default CompleteModal;