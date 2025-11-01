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


  return (
    <div
      className={`
        card-kids flex flex-col overflow-hidden rounded-xl shadow-lg hover:shadow-2xl 
        transition-all duration-500 ease-out transform hover:-translate-y-2 hover:rotate-1
        border-t-4 ${cardClasses} 
        min-h-[23rem] sm:min-h-[25rem] md:min-h-[24rem] w-full group
        relative bg-gradient-to-br from-white via-white to-slate-50
        dark:from-slate-800 dark:via-slate-800 dark:to-slate-900
        hover:shadow-xl hover:shadow-${themeColor}-500/20 dark:hover:shadow-${themeColor}-400/30
      `}
      // A classe 'group' é adicionada para permitir hover em elementos filhos: group-hover:
    >
      <div className="relative h-44 sm:h-48 overflow-hidden rounded-t-lg">
        <img
          src={imageUrl}
          alt={`Imagem do jogo ${title}`} // Melhorar alt text para acessibilidade
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110"
        />
        {/* Overlay gradiente sutil no hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
        <div 
          className={`absolute top-3 right-3 p-2 sm:p-2.5 rounded-full shadow-lg transition-all duration-500 
                      transform group-hover:scale-110 group-hover:rotate-12 ${iconContainerClasses}
                      backdrop-blur-sm border border-white/20`}
        >
          {/* Clonamos o ícone para aplicar a cor e tamanho padronizados */}
          {React.cloneElement(icon, { className: `w-6 h-6 sm:w-7 sm:h-7 ${icon.props.className || ''}`, strokeWidth: 2.5 })}
        </div>
      </div>

      <div className="p-4 sm:p-5 flex flex-col flex-1">
        <h3 
          className={`text-xl sm:text-2xl font-baloo font-bold mb-2 drop-shadow-sm 
                      min-h-[3em] /* Garante espaço para 2 linhas de título */
                      ${titleColorClasses} transition-all duration-500
                      group-hover:scale-105 group-hover:text-${themeColor}-600 
                      dark:group-hover:text-${themeColor}-200`}
        >
          {title}
        </h3>
        <p 
          className="text-slate-600 dark:text-slate-400 font-comic mb-4 flex-1 text-sm sm:text-base leading-relaxed 
                     transition-all duration-500 group-hover:text-slate-700 dark:group-hover:text-slate-300"
        >
          {description}
        </p>
        <div className="mt-auto pt-2"> {/* Garante que o botão fique no final */}
          <Link
            to={path}
            className={`
              btn-kids w-full flex items-center justify-center gap-2 
              font-semibold rounded-lg shadow-lg hover:shadow-xl
              px-5 py-3 text-base sm:text-lg
              transition-all duration-500 ease-out transform hover:scale-105 hover:-translate-y-0.5
              group-hover:shadow-${themeColor}-500/30 dark:group-hover:shadow-${themeColor}-400/40
              ${buttonClasses}
              relative overflow-hidden
              before:absolute before:inset-0 before:bg-gradient-to-r 
              before:from-white/0 before:via-white/20 before:to-white/0
              before:translate-x-[-100%] hover:before:translate-x-[100%]
              before:transition-transform before:duration-700
            `}
            aria-label={`Jogar ${title}`}
          >
            Jogar Agora
            <ArrowRight size={22} className="ml-1 transition-transform duration-500 group-hover:translate-x-1" strokeWidth={2.5}/>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default GameCard;