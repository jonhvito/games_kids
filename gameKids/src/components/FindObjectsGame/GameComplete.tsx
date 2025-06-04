import React, { useEffect, useState } from "react";
import Confetti from "react-confetti";
import { motion, AnimatePresence } from "framer-motion";
import { Star } from "lucide-react"; // Usando Lucide para estrelas para consistência

interface GameCompleteModalProps {
  total: number; // Total de objetos que deveriam ser encontrados no jogo atual
  onReset: () => void;
}

// Lógica para estrelas:
// Assume-se que 'total' aqui se refere ao número de itens configurados para o jogo.
// Se o jogador completou (encontrou 'total' itens), as estrelas podem ser baseadas
// no "tamanho" ou "dificuldade" desse conjunto de itens.
const getStars = (itemsInGame: number) => {
  if (itemsInGame >= 15) return 3; // Ex: Para jogos com 15+ itens
  if (itemsInGame >= 10) return 2; // Ex: Para jogos com 10-14 itens
  if (itemsInGame >= 5) return 1;  // Ex: Para jogos com 5-9 itens
  return 1; // Garante pelo menos 1 estrela por completar
};

const GameCompleteModal: React.FC<GameCompleteModalProps> = ({
  total,
  onReset,
}) => {
  const stars = getStars(total);
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
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.85, y: 20 },
    visible: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.3, ease: "easeOut" } },
    exit: { opacity: 0, scale: 0.85, y: 20, transition: { duration: 0.2, ease: "easeIn" } },
  };

  return (
    // Overlay do modal
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 dark:bg-black/70"
      aria-labelledby="game-complete-title"
      role="dialog"
      aria-modal="true"
    >
      {/* Confetti por cima de tudo, mas atrás do conteúdo do modal se o z-index do modal for maior */}
      <AnimatePresence>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 pointer-events-none z-[51]" // z-index maior que o overlay
        >
          <Confetti 
            width={windowSize.width} 
            height={windowSize.height} 
            numberOfPieces={200} 
            recycle={false} 
            gravity={0.1}
          />
        </motion.div>
      </AnimatePresence>

      {/* Conteúdo do Modal Animado */}
      <motion.div
        variants={modalVariants}
        initial="hidden"
        animate="visible"
        exit="exit"
        className="bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-2xl shadow-xl text-center 
                   max-w-sm w-full relative z-[52]  border-4 border-accent dark:border-yellow-500
                   transition-colors duration-300"
      >
        {/* Mascote SVG - Cores escolhidas para funcionar bem em ambos os temas */}
        <div className="flex justify-center mb-3 sm:mb-4">
          <svg width="70" height="70" viewBox="0 0 80 80" fill="none" aria-hidden="true">
            <circle cx="40" cy="40" r="38" fill="#FFD600" /> {/* Amarelo (accent) */}
            <circle cx="40" cy="40" r="34" className="fill-current text-white dark:text-slate-700 transition-colors duration-300" />
            <circle cx="40" cy="40" r="30" fill="#FFD600" />
            {/* Olhos */}
            <ellipse cx="30" cy="38" rx="6" ry="9" className="fill-current text-white dark:text-slate-200 transition-colors duration-300"/>
            <ellipse cx="50" cy="38" rx="6" ry="9" className="fill-current text-white dark:text-slate-200 transition-colors duration-300"/>
            <ellipse cx="30" cy="39" rx="2.5" ry="4" className="fill-current text-blue-500 dark:text-blue-400 transition-colors duration-300"/>
            <ellipse cx="50" cy="39" rx="2.5" ry="4" className="fill-current text-blue-500 dark:text-blue-400 transition-colors duration-300"/>
            {/* Sorriso */}
            <path d="M28 52 Q40 62 52 52 Q40 56 28 52Z" className="fill-current text-green-500 dark:text-green-400 transition-colors duration-300"/>
          </svg>
        </div>

        <h2 id="game-complete-title" className="text-3xl sm:text-4xl font-extrabold text-green-600 dark:text-green-400 mb-2 font-baloo transition-colors duration-300">
          Parabéns!
        </h2>
        <p className="text-md sm:text-lg text-slate-700 dark:text-slate-300 mb-4 font-comic transition-colors duration-300">
          Você encontrou todos os <span className="font-bold text-primary dark:text-orange-400">{total}</span> alimentos escondidos!
        </p>
        
        {/* Sistema de Estrelas com Lucide Icons */}
        <div className="flex justify-center gap-1.5 sm:gap-2 mb-4">
          {[...Array(3)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 + i * 0.1, type: "spring", stiffness: 300, damping: 15 }}
            >
              <Star
                size={36}
                className={i < stars ? "text-yellow-400 dark:text-yellow-400" : "text-gray-300 dark:text-slate-600"}
                fill={i < stars ? "currentColor" : "none"}
                strokeWidth={1.5}
              />
            </motion.div>
          ))}
        </div>
        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-400 mb-6 font-comic transition-colors duration-300">
          Você ganhou <span className="font-bold text-yellow-500 dark:text-yellow-400">{stars}</span> {stars === 1 ? "estrela" : "estrelas"}!
        </p>

        <button
          onClick={onReset}
          className="btn-kids bg-green-500 hover:bg-green-600 dark:bg-green-600 dark:hover:bg-green-500
                     text-white font-baloo text-lg
                     w-full sm:w-auto px-8 py-3.5 rounded-full shadow-lg
                     transition-all duration-300 ease-in-out hover:scale-105 focus:outline-none focus:ring-4 focus:ring-green-300 dark:focus:ring-green-700"
        >
          Jogar Novamente
        </button>
      </motion.div>
    </div>
  );
};

export default GameCompleteModal;