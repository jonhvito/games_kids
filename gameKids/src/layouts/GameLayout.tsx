import React from 'react';
import { Outlet, useLocation, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const GameLayout: React.FC = () => {
  const location = useLocation();

  // Extrai o nome do jogo pelo path
  const getGameTitle = () => {
    const path = location.pathname;
    if (path.includes('math')) return 'Jogo de Contas com Ilustrações';
    if (path.includes('find-objects')) return 'Jogo de Encontrar Objetos';
    if (path.includes('word-search')) return 'Caça-Palavras Temático';
    return 'Jogo';
  };

  // Personalização: aplica cor de fundo escolhida
  React.useEffect(() => {
    const bgColor = localStorage.getItem("selectedBgColor");
    const darkMode = localStorage.getItem("darkMode") === "true";
    if (!darkMode && bgColor) {
      document.body.style.background = bgColor;
    }
    return () => {
      document.body.style.background = "";
    };
  }, [location.pathname]);

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <Link 
          to="/" 
          className="inline-flex items-center btn-kids bg-secondary hover:bg-primary text-white font-bold transition-colors duration-200"
        >
          <ArrowLeft size={20} className="mr-1" />
          Voltar para todos os jogos
        </Link>
        <h1 className="title-kids mt-4">{getGameTitle()}</h1>
      </div>
      
      <div className="bg-white rounded-3xl shadow-card p-4 md:p-8 border-4 border-accent">
        <Outlet />
      </div>
    </div>
  );
};

export default GameLayout;