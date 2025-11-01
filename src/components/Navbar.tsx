import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ChevronLeft, Sun, Moon, Sparkles, Palette } from 'lucide-react';
import Breadcrumb from './Breadcrumb';
import { getCurrentGameFromPath } from '../utils/themeUtils';

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
  const currentTheme = getCurrentGameFromPath(location.pathname);
  const [showThemeNotification, setShowThemeNotification] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Mapeamento de temas para cores visuais
  const themeColors = {
    default: 'bg-blue-500',
    math: 'bg-emerald-500',
    'find-objects': 'bg-amber-500',
    'word-search': 'bg-violet-500',
  };

  // Detectar scroll para efeito glassmorphism
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Notificação visual ao trocar tema
  const handleThemeToggle = () => {
    onToggleDarkMode();
    setShowThemeNotification(true);
    setTimeout(() => setShowThemeNotification(false), 2000);
  };

  return (
    <div className="relative">
      {/* Notificação de mudança de tema */}
      {showThemeNotification && (
        <div className={`fixed top-4 right-4 z-50 px-4 py-2 rounded-lg shadow-lg
                        transition-all duration-500 transform 
                        ${darkMode ? 'bg-slate-800 text-white' : 'bg-white text-slate-800'}
                        animate-bounce border-l-4 ${darkMode ? 'border-yellow-400' : 'border-indigo-500'}`}>
          <div className="flex items-center gap-2">
            <Sparkles size={16} className={darkMode ? 'text-yellow-400' : 'text-indigo-500'} />
            <span className="text-sm font-medium">
              {darkMode ? 'Modo escuro ativado!' : 'Modo claro ativado!'}
            </span>
          </div>
        </div>
      )}

      <header className={`
        sticky top-0 z-40 transition-all duration-500 ease-out
        ${isScrolled 
          ? `backdrop-blur-md bg-white/80 dark:bg-slate-800/80 shadow-xl border-b 
             ${darkMode ? 'border-slate-700/50' : 'border-white/20'}` 
          : `bg-white dark:bg-slate-800 shadow-lg border-b-2 
             ${darkMode ? 'border-slate-700' : 'border-accent'}`
        }
        rounded-b-2xl mb-8
      `}>
        <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 py-3 flex flex-col sm:flex-row items-center justify-between gap-y-3 sm:gap-y-0">
          
          {/* Seção Esquerda: Navegação e Logo */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            {!isHomePage && (
              <Link
                to="/"
                className={`
                  relative p-2 rounded-full overflow-hidden group
                  ${darkMode ? 'text-slate-300 hover:bg-slate-700' : 'text-primary hover:bg-gray-100'}
                  transition-all duration-300 transform hover:scale-110 hover:rotate-12
                  before:absolute before:inset-0 before:bg-gradient-to-r 
                  before:from-transparent before:via-white/20 before:to-transparent
                  before:translate-x-[-100%] hover:before:translate-x-[100%]
                  before:transition-transform before:duration-500
                `}
                aria-label="Voltar para a página inicial"
              >
                <ChevronLeft size={26} strokeWidth={2.5} className="relative z-10" />
              </Link>
            )}
            
            <Link to="/" className="flex items-center space-x-2 sm:space-x-3 group">
              <span className="mascot-kids transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12">
                {/* Seu SVG aqui */}
              </span>
              <div className="flex flex-col">
                <span 
                  className={`text-2xl sm:text-3xl font-extrabold font-baloo drop-shadow-sm 
                             transition-all duration-300 group-hover:text-transparent 
                             group-hover:bg-gradient-to-r group-hover:from-blue-500 
                             group-hover:via-purple-500 group-hover:to-pink-500 
                             group-hover:bg-clip-text ${darkMode ? 'text-white' : 'text-primary'}`}
                >
                  EduKids
                </span>
                <span 
                  className={`hidden md:inline text-sm font-comic font-semibold drop-shadow-sm 
                             transition-all duration-300 ${darkMode ? 'text-slate-300' : 'text-secondary'}
                             group-hover:text-slate-500 dark:group-hover:text-slate-400`}
                >
                  Jogos Educativos
                </span>
              </div>
            </Link>
            
            {/* Indicador do tema ativo - separado do link para não interferir */}
            {currentTheme !== 'default' && (
              <div className="flex items-center gap-1 ml-2 px-2 py-1 rounded-full bg-white/10 backdrop-blur-sm border border-white/20">
                <div className={`w-2 h-2 rounded-full ${themeColors[currentTheme]} animate-pulse`}></div>
                <Palette size={12} className="text-slate-400" />
                <span className="hidden sm:inline text-xs text-slate-500 dark:text-slate-400 font-medium">
                  {currentTheme === 'math' ? 'Matemática' : 
                   currentTheme === 'find-objects' ? 'Objetos' : 
                   currentTheme === 'word-search' ? 'Palavras' : 'Padrão'}
                </span>
              </div>
            )}
          </div>

          {/* Seção Direita: Ações do Usuário */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              className={`
                relative overflow-hidden group flex items-center gap-2 px-3 py-1.5 rounded-full 
                font-semibold text-sm sm:text-base 
                shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105
                ${darkMode ? 'bg-slate-700/80 hover:bg-slate-600/80 text-slate-100 backdrop-blur-sm' 
                           : 'bg-white/80 hover:bg-gray-50/80 text-primary backdrop-blur-sm border border-gray-200/50'}
                before:absolute before:inset-0 before:bg-gradient-to-r 
                before:from-transparent before:via-white/10 before:to-transparent
                before:translate-x-[-100%] group-hover:before:translate-x-[100%]
                before:transition-transform before:duration-700
              `}
              onClick={onPersonalize}
              aria-label="Personalizar aparência"
            >
              <span className="text-xl sm:text-2xl leading-none transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12 relative z-10">
                {avatar}
              </span>
              <span className="hidden sm:inline relative z-10">Personalizar</span>
            </button>

            <button
              className={`
                relative overflow-hidden group p-2 sm:p-2.5 rounded-full 
                shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-110 hover:rotate-12
                ${darkMode ? 'bg-slate-700/80 hover:bg-slate-600/80 text-yellow-400 backdrop-blur-sm' 
                           : 'bg-white/80 hover:bg-gray-50/80 text-indigo-600 backdrop-blur-sm border border-gray-200/50'}
                before:absolute before:inset-0 before:bg-gradient-to-r 
                before:from-transparent before:via-white/10 before:to-transparent
                before:translate-x-[-100%] group-hover:before:translate-x-[100%]
                before:transition-transform before:duration-700
              `}
              onClick={handleThemeToggle}
              aria-label={darkMode ? "Ativar modo claro" : "Ativar modo escuro"}
            >
              <div className="relative z-10 transition-transform duration-300 group-hover:rotate-180">
                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
              </div>
            </button>
          </div>
        </div>
        
        {/* Breadcrumb */}
        {!isHomePage && (
          <div className={`border-t transition-all duration-300 ${
            darkMode ? 'border-slate-700/50 bg-slate-800/50' : 'border-gray-200/50 bg-white/50'
          } backdrop-blur-sm`}>
            <div className="w-full max-w-6xl mx-auto">
              <Breadcrumb />
            </div>
          </div>
        )}
      </header>
    </div>
  );
};

export default Navbar;
