import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { FoodObject } from "../../games/FindObjectsGame/findObjectsUtils";

interface GameSceneProps {
  backgroundUrl: string;
  objects: FoodObject[];
  foundObjects: string[];
  hintedId: string | null;
  onObjectClick: (id: string, event: React.MouseEvent) => void;
  roundId: number;
}

// Emojis dos alimentos por id
const foodEmojis: Record<string, string> = {
  apple: "🍎", banana: "🍌", orange: "🍊", strawberry: "🍓",
  carrot: "🥕", broccoli: "🥦", tomato: "🍅", corn: "🌽",
  cucumber: "🥒", pear: "🍐", grape: "🍇", pineapple: "🍍",
  watermelon: "🍉", kiwi: "🥝", peach: "🍑", blueberry: "🫐",
  plum: "🍑", cherry: "🍒",
};

const GameScene: React.FC<GameSceneProps> = ({
  backgroundUrl,
  objects,
  foundObjects,
  hintedId,
  onObjectClick,
  roundId,
}) => {
  
  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Imagem de Fundo */}
      <div
        className="absolute inset-0 bg-cover bg-center transition-all duration-500 ease-in-out"
        style={{ backgroundImage: `url('${backgroundUrl}')` }}
        aria-hidden="true"
      />

      {/* Objetos clicáveis */}
      {objects.map((obj) => {
        const isFound = foundObjects.includes(obj.id);
        // Só mostra o anel de dica se hintedId !== null, for igual ao id e não foi encontrado
        const isHinted = hintedId !== null && hintedId === obj.id && !isFound;

        return (
          <motion.button
          key={`${roundId}-${obj.id}`}
            onClick={(e) => !isFound && onObjectClick(obj.id, e)}
            className={`
              absolute flex items-center justify-center 
              rounded-full cursor-pointer
              focus:outline-none focus-visible:ring-4 focus-visible:ring-offset-2 
              focus-visible:ring-blue-500 dark:focus-visible:ring-offset-slate-900 
              dark:focus-visible:ring-sky-400
              transition-opacity duration-150 ease-in-out
              ${isFound ? "cursor-default" : "hover:scale-110 active:scale-95"}
            `}
            style={{
              left: `${obj.left}%`,
              top: `${obj.top}%`,
              transform: "translate(-50%, -50%)",
              width: "var(--object-size, 1.75rem)",
              height: "var(--object-size, 1.75rem)",
            }}
            aria-label={isFound ? `${obj.name} (encontrado)` : `Encontrar ${obj.name}`}
            disabled={isFound}
            initial={false}
            animate={
              isFound
                ? { scale: [1, 1.25, 1], opacity: 0.65 }
                : isHinted
                ? { scale: 1.1 }
                : { scale: 1, opacity: 1 }
            }
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            {/* Emoji */}
            <span
              className={`
                text-2xl sm:text-3xl select-none transition-transform duration-200
                ${isHinted ? "animate-pulse" : ""}
                ${isFound ? "" : "drop-shadow-[0_1.5px_2.5px_rgba(0,0,0,0.3)] dark:drop-shadow-[0_1.5px_2.5px_rgba(0,0,0,0.5)]"}
              `}
            >
              {foodEmojis[obj.id] || "❓"}
            </span>

            {/* Feedback visual de item encontrado */}
            <AnimatePresence>
              {isFound && (
                <motion.div
                  className="absolute inset-0 flex items-center justify-center pointer-events-none"
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.5 }}
                  transition={{ duration: 0.2 }}
                >
                  <CheckCircle2
                    size={32}
                    className="text-green-500 dark:text-green-400 opacity-90"
                    strokeWidth={2.5}
                  />
                </motion.div>
              )}
            </AnimatePresence>

            {/* Anel de dica (só se hintedId for igual ao objeto) */}
            <AnimatePresence>
              {isHinted && (
                <motion.div
                  key={`${roundId}-${obj.id}-hint`}
                  className="absolute inset-[-5px] rounded-full border-4 border-yellow-400 dark:border-yellow-500 pointer-events-none shadow-lg"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: [0, 1, 0.8, 1], scale: 1.05 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{
                    duration: 0.8,
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatType: "mirror",
                  }}
                />
              )}
            </AnimatePresence>
          </motion.button>
        );
      })}
    </div>
  );
};

export default GameScene;