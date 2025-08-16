import React from 'react';
import { calculateProgress } from './findObjectsUtils'; // Supondo que esta função já é robusta

interface ProgressBarProps {
  found: number;
  total: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ found, total }) => {
  const progress = calculateProgress(found, total);

  return (
    <div className="w-full px-1 sm:px-0"> {/* Adicionado um leve padding horizontal para telas muito pequenas */}
      <div className="flex justify-between items-center mb-1.5"> {/* Aumentado um pouco o margin-bottom */}
        <span 
          className="text-sm font-semibold text-green-700 dark:text-green-300 
                     font-baloo transition-colors duration-300"
        >
          Encontrados: {found} de {total}
        </span>
        <span 
          className="text-sm font-semibold text-green-600 dark:text-green-200 
                     font-baloo transition-colors duration-300"
        >
          {progress}%
        </span>
      </div>
      <div 
        className="w-full bg-green-100 dark:bg-green-800 rounded-full h-4 
                   shadow-inner transition-colors duration-300"
        role="progressbar" // Acessibilidade
        aria-valuenow={progress}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label={`Progresso: ${progress}%`}
      >
        <div 
          className="bg-gradient-to-r from-green-400 via-green-500 to-green-600 
                     dark:from-green-500 dark:via-green-600 dark:to-green-700
                     h-4 rounded-full 
                     transition-all duration-500 ease-out shadow-md
                     flex items-center justify-end" // Para o brilho opcional
          style={{ width: `${progress}%` }}
        >
          {/* Opcional: um pequeno brilho na ponta da barra para um visual mais polido */}
          {progress > 5 && progress < 100 && ( // Mostrar brilho apenas se a barra não estiver vazia ou cheia
            <div className="w-2 h-2 rounded-full bg-green-200 dark:bg-green-300 opacity-75 mr-1"></div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;