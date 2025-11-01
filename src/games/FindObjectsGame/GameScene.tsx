import React from "react";
import { FoodObject } from "./findObjectsUtils";

interface GameSceneProps {
  objects: FoodObject[];
  foundObjects: string[];
  hintedId: string | null;
  roundId: number;
  onObjectClick: (id: string, event: React.MouseEvent) => void;
  backgroundUrl: string;
}

const foodEmojis: { [key: string]: string } = {
  apple: '🍎',
  banana: '🍌',
  orange: '🍊',
  strawberry: '🍓',
  carrot: '🥕',
  broccoli: '🥦',
  tomato: '🍅',
  corn: '🌽',
  cucumber: '🥒',
  pear: '🍐',
  grape: '🍇',
  pineapple: '🍍',
  watermelon: '🍉',
  kiwi: '🥝',
  peach: '🍑',
  blueberry: '🫐',
  plum: '🪻',
  cherry: '🍒',
};

const GameScene: React.FC<GameSceneProps> = ({
  objects,
  foundObjects,
  hintedId,
  onObjectClick,
  backgroundUrl,
}) => {
  return (
    <div 
      className="relative w-full h-full bg-cover bg-center bg-no-repeat rounded-xl overflow-hidden"
      style={{ 
        backgroundImage: `url(${backgroundUrl})`,
        minHeight: '400px'
      }}
    >
      {/* Overlay para melhor contraste */}
      <div className="absolute inset-0 bg-black bg-opacity-10 rounded-xl"></div>
      
      {/* Objetos posicionados absolutamente */}
      {objects.map((obj) => (
        <button
          key={obj.id}
          onClick={(e) => onObjectClick(obj.id, e)}
          disabled={foundObjects.includes(obj.id)}
          className={`
            absolute transform -translate-x-1/2 -translate-y-1/2 
            w-12 h-12 rounded-full border-3 transition-all duration-300 z-10
            flex items-center justify-center text-2xl
            ${foundObjects.includes(obj.id)
              ? 'bg-green-500 border-green-600 scale-110 cursor-default opacity-90'
              : 'bg-white/90 border-yellow-400 hover:border-yellow-600 hover:scale-125 cursor-pointer hover:shadow-lg active:scale-105'
            }
            ${hintedId === obj.id 
              ? 'animate-pulse ring-4 ring-blue-400 ring-opacity-75 border-blue-500 scale-125' 
              : ''
            }
          `}
          style={{
            left: `${obj.left}%`,
            top: `${obj.top}%`,
          }}
          aria-label={`Encontrar ${obj.name}`}
        >
          {foundObjects.includes(obj.id) ? (
            <span className="text-white font-bold">✓</span>
          ) : (
            <span>{foodEmojis[obj.id] || '🍎'}</span>
          )}
        </button>
      ))}
    </div>
  );
};

export default GameScene;
