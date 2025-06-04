import React from 'react';
import { Heart } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  // Defina aqui as cores escuras correspondentes da sua paleta se desejar nomes personalizados,
  // ou use diretamente as classes do Tailwind como abaixo.
  // Ex: const accentDark = 'dark:border-yellow-700';

  return (
    <footer 
      className={`
        bg-white dark:bg-slate-800 
        shadow-inner py-6 sm:py-8 
        rounded-t-2xl sm:rounded-t-3xl 
        border-t-4 border-accent dark:border-yellow-600 /* Ajuste dark:border-yellow-600 se accent for amarelo */
        mt-10 sm:mt-12 transition-colors duration-300 ease-in-out
      `}
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4 md:gap-6">
          {/* Seção de Copyright */}
          <p 
            className={`
              text-secondary dark:text-slate-300
              text-sm sm:text-base font-comic 
              text-center md:text-left
              transition-colors duration-300 ease-in-out
            `}
          >
            © {currentYear} <span className="font-baloo text-primary dark:text-orange-400 font-bold">EduKids</span>
            {/* Texto completo para telas maiores, mais curto para mobile */}
            <span className="hidden sm:inline"> - Plataforma de Jogos Educativos</span>
            <span className="sm:hidden"> - Jogos Educativos</span>
          </p>

          {/* Seção "Feito com amor" */}
          <div 
            className="flex items-center gap-1.5 flex-wrap justify-center"
          >
            <span 
              className={`
                text-secondary dark:text-slate-300
                text-sm sm:text-base font-comic
                transition-colors duration-300 ease-in-out
              `}
            >
              Feito com
            </span>
            <Heart 
              size={18} // Tamanho do ícone ajustado para melhor alinhamento
              className={`
                text-pink-500 dark:text-pink-400 /* Usando tons diretos do Tailwind para pink */
                transition-colors duration-300 ease-in-out
              `} 
              fill="currentColor" // Preenche o coração com a cor do texto definida acima
            />
            <span 
              className={`
                text-secondary dark:text-slate-300
                text-sm sm:text-base font-comic
                transition-colors duration-300 ease-in-out
              `}
            >
              para crianças aprenderem brincando!
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;