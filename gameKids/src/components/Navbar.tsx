import React from 'react';
import { Link, useLocation } from 'react-router-dom';
// Sugestão: Renomear Home para HomeIcon se houver conflito, mas como o ícone Home foi removido, não é mais necessário.
import { ChevronLeft, Sun, Moon } from 'lucide-react';

type NavbarProps = {
  avatar: string;
  onPersonalize: () => void;
  darkMode: boolean;
  onToggleDarkMode: () => void;
};

const Navbar: React.FC<NavbarProps> = ({
  avatar,
  onPersonalize,
  darkMode,
  onToggleDarkMode,
}) => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <header className={`
      bg-white shadow-lg rounded-b-2xl border-b-2
      ${darkMode ? 'dark:bg-slate-800 dark:border-slate-700' : 'border-accent'} 
      mb-8 transition-colors duration-300
    `}>
      <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-3 flex flex-col sm:flex-row items-center justify-between gap-y-3 sm:gap-y-0">
        
        {/* Seção Esquerda: Navegação e Logo */}
        <div className="flex items-center space-x-3 sm:space-x-4">
          {!isHomePage && (
            <Link
              to="/"
              className={`
                p-2 rounded-full 
                ${darkMode ? 'text-slate-300 hover:bg-slate-700' : 'text-primary hover:bg-gray-100'}
                transition-colors duration-200
              `}
              aria-label="Voltar para a página inicial"
            >
              <ChevronLeft size={26} strokeWidth={2.5} />
            </Link>
          )}
          <Link to="/" className="flex items-center space-x-2 sm:space-x-3">
            {/* Considere usar uma tag <img> para o mascote SVG para melhor semântica e controle */}
            {/* <img src="/path-to-your-mascot.svg" alt="Mascote EduKids" className="h-10 w-10 sm:h-12 sm:w-12"/> */}
            <span className="mascot-kids">
              {/* Seu SVG aqui. Exemplo: <svg ... className="h-10 w-10 sm:h-12 sm:w-12 text-primary dark:text-accent-light" /> */}
            </span>
            <span 
              className={`text-2xl sm:text-3xl font-extrabold font-baloo drop-shadow-sm ${darkMode ? 'text-white' : 'text-primary'}`}
            >
              EduKids
            </span>
            <span 
              className={`hidden md:inline text-base font-comic font-semibold drop-shadow-sm ${darkMode ? 'text-slate-300' : 'text-secondary'}`}
            >
              Jogos Educativos
            </span>
          </Link>
        </div>

        {/* Seção Direita: Ações do Usuário */}
        <div className="flex items-center gap-2 sm:gap-3">
          <button
            className={`
              flex items-center gap-2 px-3 py-1.5 rounded-full 
              font-semibold text-sm sm:text-base 
              shadow-sm hover:shadow-md transition-all duration-200 transform hover:scale-105
              ${darkMode ? 'bg-slate-700 hover:bg-slate-600 text-slate-100' : 'bg-gray-100 hover:bg-gray-200 text-primary'}
            `}
            onClick={onPersonalize}
            aria-label="Personalizar aparência"
          >
            <span className="text-xl sm:text-2xl leading-none">{avatar}</span>
            <span className="hidden sm:inline">Personalizar</span>
          </button>

          <button
            className={`
              p-2 sm:p-2.5 rounded-full 
              shadow-sm hover:shadow-md transition-all duration-200 transform hover:scale-105
              ${darkMode ? 'bg-slate-700 hover:bg-slate-600 text-yellow-400' : 'bg-gray-100 hover:bg-gray-200 text-indigo-600'}
            `}
            onClick={onToggleDarkMode}
            aria-label={darkMode ? "Ativar modo claro" : "Ativar modo escuro"}
          >
            {darkMode ? <Sun size={20} /> : <Moon size={20} />}
          </button>
        </div>
      </div>
    </header>
  );
};

export default Navbar;