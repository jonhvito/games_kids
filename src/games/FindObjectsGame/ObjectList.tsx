import React from "react";
import { FoodObject } from "./findObjectsUtils";

interface ObjectListProps {
  objects: FoodObject[];
  foundObjects: string[];
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

const ObjectList: React.FC<ObjectListProps> = ({ objects, foundObjects }) => {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 shadow-lg">
      <h4 className="text-lg font-semibold text-gray-800 mb-3">
        Encontre os objetos:
      </h4>
      
      <div className="space-y-2">
        {objects.map((obj) => (
          <div
            key={obj.id}
            className={`flex items-center gap-3 p-2 rounded-lg transition-all duration-300
              ${foundObjects.includes(obj.id)
                ? 'bg-green-100 text-green-800 scale-95 opacity-75'
                : 'bg-gray-50 text-gray-700 hover:bg-gray-100'
              }
            `}
          >
            <span className="text-2xl">{foodEmojis[obj.id] || '🍎'}</span>
            <span className="font-medium">{obj.name}</span>
            {foundObjects.includes(obj.id) && (
              <span className="ml-auto text-green-600 font-bold">✓</span>
            )}
          </div>
        ))}
      </div>
      
      <div className="mt-4 p-3 bg-purple-100 rounded-lg border border-purple-200">
        <div className="flex justify-between text-sm font-medium">
          <span className="text-gray-600">Encontradas:</span>
          <span className="text-purple-600">
            {foundObjects.length}/{objects.length}
          </span>
        </div>
        <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-purple-600 h-2 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${(foundObjects.length / objects.length) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
};

export default ObjectList;
