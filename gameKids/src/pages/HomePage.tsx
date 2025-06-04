import React from 'react';
import GameCard from '../components/GameCard';
import { Calculator, Search, BookOpen } from 'lucide-react';
import Mascot from '../components/Mascot';

const HomePage: React.FC = () => {
  const games = [
    {
      id: 'math-game',
      title: 'Contas Divertidas',
      description: 'Aprenda matemática de forma leve com alimentos no lugar de números.',
      imageUrl: 'https://images.pexels.com/photos/7111523/pexels-photo-7111523.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&dpr=1',
      path: '/games/math',
      // Voltando ao formato que GameCard.tsx espera para a prop 'color'
      color: 'border-blue-500', 
      // Ícone já com sua classe de cor, como GameCard.tsx parece esperar ao recebê-lo
      icon: <Calculator size={24} className="text-blue-500" /> 
    },
    {
      id: 'find-objects-game',
      title: 'Ache os Tesouros!',
      description: 'Encontre alimentos escondidos em cenários vibrantes e cheios de cor.',
      imageUrl: '../public/image.jpg', // Verifique se este caminho/imagem existe
      path: '/games/find-objects',
      color: 'border-green-500',
      icon: <Search size={24} className="text-green-500" />
    },
    {
      id: 'word-search-game',
      title: 'Caça-Palavras Nutritivo',
      description: 'Descubra palavras de alimentos em um desafio divertido de caça-palavras.',
      imageUrl: 'https://thewordsearch.com/v4/img/word-search-puzzle.png', // Considere hospedar localmente
      path: '/games/word-search',
      color: 'border-purple-500',
      icon: <BookOpen size={24} className="text-purple-500" />
    }
  ];

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      {/* Seção de Boas-vindas / Herói */}
      <section 
        className="text-center mb-12 sm:mb-16 p-6 sm:p-10 
                   bg-sky-50 dark:bg-slate-800 
                   rounded-2xl shadow-lg transition-colors duration-300"
      >
        <Mascot 
          size={80}
          bounce
          className="mx-auto mb-5 sm:mb-6" 
        />
        <h1 
          className="text-4xl sm:text-5xl font-extrabold font-baloo mb-4
                     text-primary dark:text-sky-400 transition-colors duration-300"
        >
          Bem-vindo ao EduKids!
        </h1>
        <p 
          className="text-lg sm:text-xl leading-relaxed max-w-xl md:max-w-2xl mx-auto 
                     font-comic text-slate-600 dark:text-slate-300 transition-colors duration-300"
        >
          Aprenda brincando com nossos jogos educativos, super divertidos e coloridos!
        </p>
      </section>
      
      {/* Seção de Seleção de Jogos */}
      <section>
        <h2 
          className="text-3xl sm:text-4xl font-bold mb-8 sm:mb-10 text-center 
                     font-baloo text-slate-700 dark:text-slate-100 transition-colors duration-300"
        >
          Escolha seu desafio!
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {games.map((game) => (
            <GameCard
              key={game.id}
              title={game.title}
              description={game.description}
              imageUrl={game.imageUrl}
              path={game.path}
              // Passando a prop 'color' como GameCard.tsx espera
              color={game.color} 
              // Passando a prop 'icon' como GameCard.tsx espera (o ícone já estilizado)
              icon={game.icon}   
            />
          ))}
        </div>
      </section>
    </div>
  );
};

export default HomePage;