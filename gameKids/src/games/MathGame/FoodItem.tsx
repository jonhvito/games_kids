import React from 'react';
import { Apple, Banana, CircleOff } from 'lucide-react';
import type { FoodType } from './mathGameUtils';

interface FoodItemProps {
  type: FoodType;
  value: number;
}

const FoodItem: React.FC<FoodItemProps> = ({ type, value }) => {
  // Renderiza o ícone apropriado de alimento
  const renderFoodIcon = () => {
    switch (type) {
      case 'apple':
        return <Apple size={28} className="text-red-500 drop-shadow" />;
      case 'banana':
        return <Banana size={28} className="text-yellow-500 drop-shadow" />;
      case 'orange':
        return <span className="text-3xl drop-shadow">🍊</span>;
      case 'strawberry':
        return <span className="text-3xl drop-shadow">🍓</span>;
      case 'carrot':
        return <span className="text-3xl drop-shadow">🥕</span>;
      case 'grape':
        return <span className="text-3xl drop-shadow">🍇</span>;
      default:
        return <CircleOff size={28} className="text-gray-400" />;
    }
  };

  // Renderiza a quantidade correta de alimentos
  return (
    <div className="flex items-center justify-center bg-white rounded-2xl p-3 shadow-card border-2 border-accent">
      <div className="flex flex-wrap justify-center gap-1">
        {Array(value).fill(0).map((_, index) => (
          <div key={index} className="food-item">
            {renderFoodIcon()}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FoodItem;