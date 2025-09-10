import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

interface GameCardProps {
  title: string;
  description: string;
  imageUrl: string;
  path: string;
  themeColor: string; // Ex: "blue", "green", "purple"
  icon: React.ReactElement; // Espera um elemento React para o ícone (sem cor aplicada diretamente)
}

const GameCard: React.FC<GameCardProps> = ({
  title,
  description,
  imageUrl,
  path,
  themeColor, // Usaremos para gerar classes de cor dinamicamente
  icon
}) => {
  const cardClasses = `
    bg-white dark:bg-slate-800 
    border-${themeColor}-500 dark:border-${themeColor}-400
  `;
  const iconContainerClasses = `
    bg-${themeColor}-100 dark:bg-${themeColor}-800 
    text-${themeColor}-600 dark:text-${themeColor}-300
  `;
  const titleColorClasses = `
    text-${themeColor}-700 dark:text-${themeColor}-300
  `;
  const buttonClasses = `
    bg-${themeColor}-500 hover:bg-${themeColor}-600 
    dark:bg-${themeColor}-600 dark:hover:bg-${themeColor}-500 
    text-white
  `;
  const iconColorInCard = `text-${themeColor}-600 dark:text-${themeColor}-300`;


  return (
    <div
      className={`
        card-kids flex flex-col overflow-hidden rounded-xl shadow-lg hover:shadow-2xl 
        transition-all duration-300 ease-in-out transform hover:-translate-y-1
        border-t-4 ${cardClasses} 
        min-h-[23rem] sm:min-h-[25rem] md:min-h-[24rem] w-full group
      `}
      // A classe 'group' é adicionada para permitir hover em elementos filhos: group-hover:
    >
      <div className="relative h-44 sm:h-48 overflow-hidden">
        <img
          src={imageUrl}
          alt={`Imagem do jogo ${title}`} // Melhorar alt text para acessibilidade
          className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
        />
        <div 
          className={`absolute top-3 right-3 p-2 sm:p-2.5 rounded-full shadow-md transition-colors duration-300 ${iconContainerClasses}`}
        >
          {/* Clonamos o ícone para aplicar a cor e tamanho padronizados */}
          {React.cloneElement(icon, { className: `w-6 h-6 sm:w-7 sm:h-7 ${icon.props.className || ''}`, strokeWidth: 2.5 })}
        </div>
      </div>

      <div className="p-4 sm:p-5 flex flex-col flex-1">
        <h3 
          className={`text-xl sm:text-2xl font-baloo font-bold mb-2 drop-shadow-sm 
                      min-h-[3em] /* Garante espaço para 2 linhas de título */
                      ${titleColorClasses} transition-colors duration-300`}
        >
          {title}
        </h3>
        <p 
          className="text-slate-600 dark:text-slate-400 font-comic mb-4 flex-1 text-sm sm:text-base leading-relaxed  transition-colors duration-300"
        >
          {description}
        </p>
        <div className="mt-auto pt-2"> {/* Garante que o botão fique no final */}
          <Link
            to={path}
            className={`
              btn-kids w-full flex items-center justify-center gap-2 
              font-semibold rounded-lg shadow hover:shadow-md
              px-5 py-3 text-base sm:text-lg
              transition-all duration-300 ease-in-out transform hover:scale-105
              ${buttonClasses}
            `}
            aria-label={`Jogar ${title}`}
          >
            Jogar Agora
            <ArrowRight size={22} className="ml-1" strokeWidth={2.5}/>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default GameCard;