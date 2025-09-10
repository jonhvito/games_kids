import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// Sugestão: Adicionar ícone para o botão de Ranking para consistência
import { Volume2, VolumeX, Award, X } from 'lucide-react';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SoundEffect from './components/SoundEffect';
import MusicConsentModal from './components/MusicConsentModal';
import AvatarSelector from './components/AvatarSelector';
import BackgroundColorSelector from './components/BackgroundColorSelector';
import Leaderboard from './components/Leaderboard';

// Pages
import HomePage from './pages/HomePage';
import GameLayout from './layouts/GameLayout';

// Games
import MathGame from './games/MathGame/MathGame';
import FindObjectsGame from './games/FindObjectsGame/FindObjectsGame';
import WordSearchGame from './games/WordSearchGame/WordSearchGame';

// Utils
import { SOUNDS } from './utils/soundUtils';

function App() {
  const [soundEnabled, setSoundEnabled] = useState<boolean>(false);
  const [showMusicModal, setShowMusicModal] = useState<boolean>(true);
  const [showPersonalize, setShowPersonalize] = useState(false);
  const [avatar, setAvatar] = useState<string>(() => localStorage.getItem('selectedAvatar') || '🦁');
  const [bgColor, setBgColor] = useState<string>(() => localStorage.getItem('selectedBgColor') || '#e3f2fd');
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const stored = localStorage.getItem('darkMode');
    return stored ? stored === 'true' : false;
  });

  const toggleSound = () => setSoundEnabled((prev) => !prev);
  const handleAcceptMusic = () => {
    setSoundEnabled(true);
    setShowMusicModal(false);
  };
  const toggleDarkMode = () => {
    setDarkMode((prev) => {
      const newDarkMode = !prev;
      localStorage.setItem('darkMode', String(newDarkMode));
      return newDarkMode;
    });
  };

  // Efeito para aplicar dark mode e cor de fundo no body
  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;
    if (darkMode) {
      root.classList.add('dark');
      body.style.background = '#22223b'; // Cor de fundo do body no dark mode
    } else {
      root.classList.remove('dark');
      body.style.background = bgColor; // Cor de fundo do body no light mode
    }
  }, [darkMode, bgColor]);

  const handleAvatarSelect = (a: string) => {
    setAvatar(a);
    localStorage.setItem('selectedAvatar', a); // Persistir avatar
  };
  const handleBgColorSelect = (c: string) => {
    setBgColor(c);
    localStorage.setItem('selectedBgColor', c); // Persistir cor de fundo
  };

  // Efeito para remover mascote de preload (executa apenas uma vez na montagem)
  useEffect(() => {
    const mascot = document.getElementById('mascot-loader');
    if (mascot) mascot.style.display = 'none';
    document.body.classList.remove('preload-gradient');
  }, []); // Array de dependências vazio garante execução única

  return (
    <Router>
      {/* Sugestão: Aplicar a cor de fundo diretamente no div principal do app também,
        para consistência e para que transições de cor funcionem nele.
        A cor do `body` já é tratada no `useEffect` acima.
      */}
      <div 
        className={`min-h-screen flex flex-col transition-colors duration-300 ${darkMode ? 'bg-gray-900 text-gray-100' : 'text-gray-800'}`}
        style={!darkMode ? { backgroundColor: bgColor } : {}}
      >
        {showMusicModal && (
          <MusicConsentModal
            onAccept={handleAcceptMusic}
          />
        )}

        <SoundEffect 
          src={SOUNDS.BACKGROUND}
          play={soundEnabled && !showMusicModal}
          loop={true}
          volume={0.1}
        />

        <Navbar
          avatar={avatar}
          onPersonalize={() => setShowPersonalize((v) => !v)}
          darkMode={darkMode}
          onToggleDarkMode={toggleDarkMode}
        />

        {/* Modal de Personalização com animação sutil */}
        {showPersonalize && (
          <div 
            className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 transition-opacity duration-300 ease-out"
            // Adicionar `data-state` para controlar animação de entrada/saída se usar bibliotecas como Radix ou Headless UI
            // ou implementar com classes condicionais para animações de entrada/saída.
            // Exemplo simples com delay para permitir renderização antes da transição:
            // initial={{ opacity: 0, scale: 0.95 }}
            // animate={{ opacity: 1, scale: 1 }}
            // exit={{ opacity: 0, scale: 0.95 }}
            // Para uma solução puramente Tailwind, você pode usar `useEffect` para adicionar/remover classes de animação.
          >
            <div
              className={`
                bg-white dark:bg-gray-800 p-6 sm:p-8 rounded-2xl shadow-xl border-2 border-accent
                w-11/12 max-w-sm sm:max-w-md relative
                flex flex-col gap-5
                overflow-y-auto
                max-h-[85vh]
                transition-all duration-300 ease-out
                ${showPersonalize ? 'opacity-100 scale-100' : 'opacity-0 scale-95'} // Animação simples de entrada
              `}
              style={{ boxSizing: "border-box" }}
              // onClick={(e) => e.stopPropagation()} // Para evitar fechar ao clicar dentro do modal, se o overlay fechar ao clicar
            >
              <button
                className="absolute top-3 right-3 text-gray-500 hover:text-primary-dark dark:text-gray-400 dark:hover:text-white transition-colors p-1 rounded-full"
                onClick={() => setShowPersonalize(false)}
                aria-label="Fechar personalização"
              >
                <X size={24} /> {/* Ícone para fechar */}
              </button>
              <h2 className="text-xl sm:text-2xl font-semibold text-center text-primary dark:text-accent-light mb-2">Personalizar</h2>
              <AvatarSelector onSelect={handleAvatarSelect} currentAvatar={avatar} />
              {/* Sugestão: Usar uma linha divisória estilizada ou apenas mais espaço */}
              <hr className="border-gray-200 dark:border-gray-700 my-3 sm:my-4" />
              <BackgroundColorSelector onSelect={handleBgColorSelect} currentBgColor={bgColor} />
            </div>
          </div>
        )}
        
        <main className="flex-grow w-full max-w-full overflow-x-hidden pt-24 sm:pt-28 px-4">
          <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-3 items-end">
            {/* Botão de Som com melhor feedback visual no hover */}
            <button
              onClick={toggleSound}
              className="p-3 bg-white dark:bg-gray-700 dark:text-gray-200 rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-200 ease-out"
              aria-label={soundEnabled ? "Desativar som" : "Ativar som"}
            >
              {soundEnabled ? <Volume2 size={24} /> : <VolumeX size={24} />}
            </button>
            
            {/* Botão de Ranking com ícone e scroll aprimorado */}
            <button
              onClick={() => {
                const leaderboardElement = document.getElementById('leaderboard');
                leaderboardElement?.scrollIntoView({ behavior: 'smooth', block: 'center' });
              }}
              // Sugestão: Usar cor de acento ou primária para o botão de ranking
              className="p-3 bg-accent hover:bg-accent-dark text-white rounded-full shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-200 ease-out"
              aria-label="Ver ranking local"
            >
              <Award size={24} />
            </button>
          </div>

          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/games" element={<GameLayout />}>
              <Route path="math" element={<MathGame soundEnabled={soundEnabled} />} />
              <Route path="find-objects" element={<FindObjectsGame soundEnabled={soundEnabled} />} />
              <Route path="word-search" element={<WordSearchGame soundEnabled={soundEnabled} />} />
              <Route path="" element={<Navigate to="/" replace />} />
            </Route>
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>

          <div id="leaderboard" className="max-w-2xl mx-auto my-16 py-8"> {/* Aumentar margem e padding se necessário */}
            <Leaderboard />
          </div>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;