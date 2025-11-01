import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, ChevronRight, Calculator, Search, BookOpen } from 'lucide-react';

const Breadcrumb: React.FC = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  // Mapeamento de rotas para nomes e ícones
  const routeMap: Record<string, { name: string; icon: React.ReactNode }> = {
    'games': { name: 'Jogos', icon: null },
    'math': { name: 'Contas Divertidas', icon: <Calculator size={16} /> },
    'find-objects': { name: 'Ache os Tesouros', icon: <Search size={16} /> },
    'word-search': { name: 'Caça-Palavras', icon: <BookOpen size={16} /> },
  };

  if (pathnames.length === 0) return null; // Não exibir na página inicial

  return (
    <nav className="flex items-center space-x-2 px-4 sm:px-6 py-3 text-sm font-medium">
      <Link 
        to="/" 
        className="flex items-center space-x-1 text-slate-500 hover:text-primary dark:text-slate-400 dark:hover:text-sky-400 
                   transition-all duration-300 hover:scale-110 group"
      >
        <Home size={16} className="group-hover:rotate-12 transition-transform duration-300" />
        <span className="hidden sm:inline">Início</span>
      </Link>

      {pathnames.map((name, index) => {
        const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
        const isLast = index === pathnames.length - 1;
        const routeInfo = routeMap[name];

        return (
          <React.Fragment key={name}>
            <ChevronRight size={14} className="text-slate-400 dark:text-slate-500" />
            {isLast ? (
              <span className="flex items-center space-x-1 text-primary dark:text-sky-400 font-semibold">
                {routeInfo?.icon}
                <span>{routeInfo?.name || name}</span>
              </span>
            ) : (
              <Link
                to={routeTo}
                className="flex items-center space-x-1 text-slate-500 hover:text-primary dark:text-slate-400 dark:hover:text-sky-400 
                           transition-all duration-300 hover:scale-105"
              >
                {routeInfo?.icon}
                <span>{routeInfo?.name || name}</span>
              </Link>
            )}
          </React.Fragment>
        );
      })}
    </nav>
  );
};

export default Breadcrumb;
