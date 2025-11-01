import React, { useEffect, useState } from 'react';
import GameCard from '../components/GameCard';
import { Calculator, Search, BookOpen } from 'lucide-react';
import Mascot from '../components/Mascot';

const HomePage: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [cardsVisible, setCardsVisible] = useState([false, false, false]);

  useEffect(() => {
    // Animação de entrada da página
    setIsLoaded(true);
    
    // Animação escalonada dos cards
    const timeouts = [
      setTimeout(() => setCardsVisible(prev => [true, prev[1], prev[2]]), 300),
      setTimeout(() => setCardsVisible(prev => [prev[0], true, prev[2]]), 500),
      setTimeout(() => setCardsVisible(prev => [prev[0], prev[1], true]), 700),
    ];

    return () => timeouts.forEach(timeout => clearTimeout(timeout));
  }, []);

  const games = [
    {
      id: 'math-game',
      title: 'Contas Divertidas',
      description: 'Aprenda matemática de forma leve com alimentos no lugar de números.',
      imageUrl: 'https://images.pexels.com/photos/7111523/pexels-photo-7111523.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&dpr=1',
      path: '/games/math',
      themeColor: 'blue',
      icon: <Calculator size={24} />
    },
    {
      id: 'find-objects-game',
      title: 'Ache os Tesouros!',
      description: 'Encontre alimentos escondidos em cenários vibrantes e cheios de cor.',
      imageUrl: './image.jpg',
      path: '/games/find-objects',
      themeColor: 'green',
      icon: <Search size={24} />
    },
    {
      id: 'word-search-game',
      title: 'Caça-Palavras Nutritivo',
      description: 'Descubra palavras de alimentos em um desafio divertido de caça-palavras.',
      imageUrl: 'https://thewordsearch.com/v4/img/word-search-puzzle.png',
      path: '/games/word-search',
      themeColor: 'purple',
      icon: <BookOpen size={24} />
    }
  ];

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 relative overflow-hidden">
      {/* Partículas de fundo flutuantes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-4 h-4 bg-yellow-300/30 rounded-full animate-bounce" style={{animationDelay: '0s', animationDuration: '3s'}}></div>
        <div className="absolute top-32 right-20 w-6 h-6 bg-pink-300/30 rounded-full animate-bounce" style={{animationDelay: '1s', animationDuration: '4s'}}></div>
        <div className="absolute top-40 left-1/4 w-3 h-3 bg-blue-300/30 rounded-full animate-bounce" style={{animationDelay: '2s', animationDuration: '5s'}}></div>
        <div className="absolute bottom-40 right-10 w-5 h-5 bg-green-300/30 rounded-full animate-bounce" style={{animationDelay: '0.5s', animationDuration: '3.5s'}}></div>
        <div className="absolute bottom-20 left-20 w-4 h-4 bg-purple-300/30 rounded-full animate-bounce" style={{animationDelay: '1.5s', animationDuration: '4.5s'}}></div>
      </div>

      {/* Seção de Boas-vindas / Herói */}
      <section 
        className={`text-center mb-12 sm:mb-16 p-6 sm:p-10 
                   bg-gradient-to-br from-sky-50 via-blue-50 to-indigo-50
                   dark:from-slate-800 dark:via-slate-700 dark:to-slate-800
                   rounded-2xl shadow-lg transition-all duration-1000 transform
                   ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}
                   relative overflow-hidden`}
      >
        {/* Gradiente animado de fundo */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent 
                        transform -skew-x-12 animate-pulse opacity-50"></div>
        
        <div className="relative z-10">
          <Mascot 
            size={80}
            bounce
            className={`mx-auto mb-5 sm:mb-6 transition-all duration-1000 transform
                       ${isLoaded ? 'scale-100 rotate-0' : 'scale-75 -rotate-12'}`}
          />
          <h1 
            className={`text-4xl sm:text-5xl font-extrabold font-baloo mb-4
                       text-primary dark:text-sky-400 transition-all duration-1000 transform
                       ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}
                       bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 
                       bg-clip-text text-transparent animate-pulse`}
          >
            Bem-vindo ao EduKids!
          </h1>
          <p 
            className={`text-lg sm:text-xl leading-relaxed max-w-xl md:max-w-2xl mx-auto 
                       font-comic text-slate-600 dark:text-slate-300 transition-all duration-1000 transform
                       ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`}
            style={{transitionDelay: '200ms'}}
          >
            Aprenda brincando com nossos jogos educativos, super divertidos e coloridos!
          </p>
        </div>
      </section>
      
      {/* Seção de Seleção de Jogos */}
      <section>
        <h2 
          className={`text-3xl sm:text-4xl font-bold mb-8 sm:mb-10 text-center 
                     font-baloo text-slate-700 dark:text-slate-100 transition-all duration-1000 transform
                     ${isLoaded ? 'translate-y-0 opacity-100' : 'translate-y-8 opacity-0'}`}
          style={{transitionDelay: '400ms'}}
        >
          Escolha seu desafio!
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {games.map((game, index) => (
            <div
              key={game.id}
              className={`transition-all duration-700 transform ${
                cardsVisible[index] 
                  ? 'translate-y-0 opacity-100 scale-100' 
                  : 'translate-y-12 opacity-0 scale-95'
              }`}
            >
              <GameCard
                title={game.title}
                description={game.description}
                imageUrl={game.imageUrl}
                path={game.path}
                themeColor={game.themeColor}
                icon={game.icon}
              />
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;