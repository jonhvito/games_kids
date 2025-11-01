import React from 'react';
import { useLocation } from 'react-router-dom';
import { Palette } from 'lucide-react';
import { getCurrentGameFromPath } from '../utils/themeUtils';

interface ThemeIntensitySelectorProps {
  onIntensityChange: (gradient: string, intensity: string) => void;
  currentIntensity: string;
}

const ThemeIntensitySelector: React.FC<ThemeIntensitySelectorProps> = ({
  onIntensityChange,
  currentIntensity
}) => {
  const location = useLocation();
  const currentTheme = getCurrentGameFromPath(location.pathname);

  // Variações de intensidade para cada tema
  const themeVariants = {
    math: [
      { name: 'Suave', intensity: 'light', gradient: 'linear-gradient(135deg, #f0fdf4 0%, #ecfdf5 50%, #d1fae5 100%)' },
      { name: 'Normal', intensity: 'normal', gradient: 'linear-gradient(135deg, #ecfdf5 0%, #f0fdfa 50%, #e6fffa 100%)' },
      { name: 'Vibrante', intensity: 'vibrant', gradient: 'linear-gradient(135deg, #a7f3d0 0%, #6ee7b7 50%, #34d399 100%)' },
    ],
    'find-objects': [
      { name: 'Suave', intensity: 'light', gradient: 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 50%, #fde68a 100%)' },
      { name: 'Normal', intensity: 'normal', gradient: 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 50%, #fefce8 100%)' },
      { name: 'Vibrante', intensity: 'vibrant', gradient: 'linear-gradient(135deg, #fcd34d 0%, #f59e0b 50%, #d97706 100%)' },
    ],
    'word-search': [
      { name: 'Suave', intensity: 'light', gradient: 'linear-gradient(135deg, #f5f3ff 0%, #faf5ff 50%, #e9d5ff 100%)' },
      { name: 'Normal', intensity: 'normal', gradient: 'linear-gradient(135deg, #f5f3ff 0%, #faf5ff 50%, #fdf2f8 100%)' },
      { name: 'Vibrante', intensity: 'vibrant', gradient: 'linear-gradient(135deg, #a78bfa 0%, #8b5cf6 50%, #7c3aed 100%)' },
    ],
  };

  if (currentTheme === 'default') {
    return null; // Não mostrar na página inicial
  }

  const variants = themeVariants[currentTheme as keyof typeof themeVariants];
  if (!variants) return null;

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Palette size={18} className={`${
          currentTheme === 'math' ? 'text-emerald-500' :
          currentTheme === 'find-objects' ? 'text-amber-500' :
          'text-violet-500'
        }`} />
        <h3 className="font-semibold text-lg">Intensidade do Tema</h3>
      </div>
      
      <p className="text-sm text-slate-600 dark:text-slate-400 mb-4">
        Personalize a intensidade visual do tema {
          currentTheme === 'math' ? 'Matemática' : 
          currentTheme === 'find-objects' ? 'Objetos' : 
          'Palavras'
        }:
      </p>
      
      <div className="grid grid-cols-3 gap-3">
        {variants.map((variant) => (
          <button
            key={variant.intensity}
            onClick={() => onIntensityChange(variant.gradient, variant.name)}
            className={`flex flex-col items-center gap-2 p-3 rounded-lg border-2 transition-all duration-200 ${
              currentIntensity === variant.name
                ? 'border-primary bg-primary/10'
                : 'border-gray-200 dark:border-slate-600 hover:border-primary/50'
            }`}
          >
            <div 
              className="w-8 h-8 rounded-full border-2 border-white shadow-sm"
              style={{ background: variant.gradient }}
            ></div>
            <span className="text-sm font-medium">{variant.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default ThemeIntensitySelector;
