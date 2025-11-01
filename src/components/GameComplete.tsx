import React, { useEffect, useState } from "react";
import Confetti from "react-confetti";
import { motion, AnimatePresence } from "framer-motion";
import { Star } from "lucide-react";
import Mascot from "./Mascot";

interface GameCompleteProps {
  onReset: () => void;
  gameType: 'math' | 'find-objects' | 'word-search';
  score?: number;
  total?: number;
  foundItems?: number;
  totalItems?: number;
}

const getStars = (gameType: string, score?: number, found?: number, total?: number) => {
  switch (gameType) {
    case 'math': {
      if (!score) return 1;
      if (score >= 90) return 3;
      if (score >= 60) return 2;
      if (score >= 30) return 1;
      return 0;
    }
    
    case 'find-objects': {
      const items = total || 0;
      if (items >= 15) return 3;
      if (items >= 10) return 2;
      if (items >= 5) return 1;
      return 1;
    }
    
    case 'word-search': {
      if (!found || !total) return 3;
      const percent = (found / total) * 100;
      if (percent >= 100) return 3;
      if (percent >= 70) return 2;
      if (percent >= 40) return 1;
      return 0;
    }
    
    default:
      return 1;
  }
};

const getGameTitle = (gameType: string) => {
  switch (gameType) {
    case 'math': return 'Jogo de Matemática';
    case 'find-objects': return 'Encontre os Objetos';
    case 'word-search': return 'Caça-Palavras';
    default: return 'Jogo';
  }
};

const getGameColor = (gameType: string) => {
  switch (gameType) {
    case 'math': return 'from-emerald-100 to-emerald-200';
    case 'find-objects': return 'from-amber-100 to-amber-200';
    case 'word-search': return 'from-violet-100 to-violet-200';
    default: return 'from-blue-100 to-blue-200';
  }
};

const getTextColor = (gameType: string) => {
  switch (gameType) {
    case 'math': return 'text-emerald-800';
    case 'find-objects': return 'text-amber-800';
    case 'word-search': return 'text-violet-800';
    default: return 'text-blue-800';
  }
};

const GameComplete: React.FC<GameCompleteProps> = ({ 
  onReset, 
  gameType, 
  score, 
  total, 
  foundItems, 
  totalItems 
}) => {
  const stars = getStars(gameType, score, foundItems, totalItems);
  const [windowSize, setWindowSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    if (typeof window !== "undefined") {
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  const gameTitle = getGameTitle(gameType);
  const gameColor = getGameColor(gameType);
  const textColor = getTextColor(gameType);

  if (gameType === 'word-search' || gameType === 'find-objects') {
    return (
      <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-10">
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          numberOfPieces={350}
          recycle={false}
          gravity={0.18}
          initialVelocityY={18}
          wind={0.01}
          tweenDuration={8000}
        />
        
        <AnimatePresence>
          <motion.div
            initial={{ scale: 0.85, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.85, opacity: 0 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className={`bg-gradient-to-br ${gameColor} p-8 rounded-3xl shadow-2xl max-w-md mx-4 text-center relative overflow-hidden border-2 border-white/30`}
          >
            <div className="flex justify-center mb-6">
              <Mascot size={100} bounce />
            </div>

            <h2 className={`text-4xl font-bold ${textColor} mb-4 drop-shadow-lg`}>
              🎉 Parabéns! 🎉
            </h2>

            <p className={`text-lg ${textColor} opacity-90 mb-6`}>
              Você completou o {gameTitle}!
            </p>

            {/* Sistema de Estrelas */}
            <div className="flex justify-center gap-2 mb-6">
              {[1, 2, 3].map((star) => (
                <motion.div
                  key={star}
                  initial={{ scale: 0, rotate: -180 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ delay: star * 0.2, duration: 0.5 }}
                >
                  <Star
                    size={32}
                    className={
                      star <= stars
                        ? "fill-yellow-400 text-yellow-400 drop-shadow-lg"
                        : "fill-gray-300 text-gray-300"
                    }
                  />
                </motion.div>
              ))}
            </div>

            {/* Informações específicas do jogo */}
            {gameType === 'find-objects' && total && (
              <p className={`text-sm ${textColor} opacity-75 mb-6`}>
                {total} objetos encontrados!
              </p>
            )}

            {gameType === 'word-search' && foundItems && totalItems && (
              <p className={`text-sm ${textColor} opacity-75 mb-6`}>
                {foundItems}/{totalItems} palavras encontradas!
              </p>
            )}

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={onReset}
              className={`w-full py-3 px-6 ${textColor} font-bold text-lg rounded-xl border-2 border-current hover:bg-white/20 transition-all duration-200 shadow-lg`}
            >
              🔄 Jogar Novamente
            </motion.button>
          </motion.div>
        </AnimatePresence>
      </div>
    );
  }

  // Layout para o jogo de matemática
  return (
    <div className={`text-center py-10 px-8 bg-gradient-to-br ${gameColor} rounded-2xl shadow-2xl relative overflow-hidden animate-fade-in`}>
      <Confetti
        width={400}
        height={300}
        numberOfPieces={200}
        recycle={false}
        gravity={0.15}
      />
      
      <div className="flex justify-center mb-4">
        <Mascot size={80} bounce />
      </div>
      
      <h2 className={`text-3xl font-extrabold ${textColor} mb-2 drop-shadow-lg`}>
        Parabéns!
      </h2>
      
      <p className={`text-lg ${textColor} opacity-90 mb-4`}>
        Você completou o {gameTitle}!
      </p>

      {score !== undefined && (
        <p className={`text-2xl font-bold ${textColor} mb-4`}>
          Pontuação: {score}
        </p>
      )}

      {/* Sistema de Estrelas */}
      <div className="flex justify-center gap-1 mb-6">
        {[1, 2, 3].map((star) => (
          <Star
            key={star}
            size={24}
            className={
              star <= stars
                ? "fill-yellow-400 text-yellow-400"
                : "fill-gray-300 text-gray-300"
            }
          />
        ))}
      </div>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={onReset}
        className={`w-full py-3 px-6 ${textColor} font-bold text-lg rounded-xl border-2 border-current hover:bg-white/20 transition-all duration-200`}
      >
        🔄 Jogar Novamente
      </motion.button>
    </div>
  );
};

export default GameComplete;
