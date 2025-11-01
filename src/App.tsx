import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Volume2, VolumeX, Award, X, Music } from 'lucide-react';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import SoundEffect from './components/SoundEffect';
import MusicConsentModal from './components/MusicConsentModal';
import AvatarSelector from './components/AvatarSelector';
import BackgroundColorSelector from './components/BackgroundColorSelector';
import ThemeIntensitySelector from './components/ThemeIntensitySelector';
import Leaderboard from './components/Leaderboard';
import ThemeProvider from './components/ThemeProvider';

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
  const [musicEnabled, setMusicEnabled] = useState<boolean>(false);
  const [showMusicModal, setShowMusicModal] = useState<boolean>(true);
  const [showPersonalize, setShowPersonalize] = useState(false);
  const [avatar, setAvatar] = useState<string>(() => localStorage.getItem('selectedAvatar') || '🦁');
  const [bgColor, setBgColor] = useState<string>(() => localStorage.getItem('selectedBgColor') || '#e3f2fd');
  const [themeIntensity, setThemeIntensity] = useState<string>(() => localStorage.getItem('currentThemeIntensity') || 'Normal');
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    const stored = localStorage.getItem('darkMode');
    return stored ? stored === 'true' : false;
  });

  const toggleSound = () => setSoundEnabled((prev) => !prev);
  const toggleMusic = () => setMusicEnabled((prev) => !prev);
  const handleAcceptMusic = () => {
    setSoundEnabled(true);
    setMusicEnabled(true);
    setShowMusicModal(false);
  };
  const toggleDarkMode = () => {
    setDarkMode((prev) => {
      const newDarkMode = !prev;
      localStorage.setItem('darkMode', String(newDarkMode));
      return newDarkMode;
    });
  };

  // Efeito para aplicar as variações de dark mode e cor personalizada no body
  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;

    if (darkMode) {
      root.classList.add('dark');
      body.style.background = '#22223b';
    } else {
      root.classList.remove('dark');
      body.style.background = bgColor;
    }
  }, [darkMode, bgColor]);

  const handleAvatarSelect = (a: string) => {
    setAvatar(a);
    localStorage.setItem('selectedAvatar', a);
  };
  const handleBgColorSelect = (c: string) => {
    setBgColor(c);
    localStorage.setItem('selectedBgColor', c);
  };
  const handleThemeIntensityChange = (gradient: string, intensity: string) => {
    document.documentElement.style.setProperty('--game-bg-gradient', gradient);
    setThemeIntensity(intensity);
    localStorage.setItem('currentThemeIntensity', intensity);
  };

  useEffect(() => {
    const removeMascot = () => {
      const mascot = document.getElementById('mascot-loader');
      if (mascot) {
        mascot.remove();
      }
    };
    removeMascot();
  }, []);

  const [showLeaderboard, setShowLeaderboard] = useState(false);

  return (
    <Router>
      <ThemeProvider darkMode={darkMode}>
        <div 
          className={`min-h-screen flex flex-col transition-all duration-700 ease-out ${
            darkMode ? 'bg-gray-900 text-gray-100' : 'text-gray-800'
          } bg-gradient-to-br`}
          style={!darkMode ? { backgroundColor: bgColor } : {}}
        >
          {showMusicModal && (
            <MusicConsentModal
              onAccept={handleAcceptMusic}
            />
          )}

          <SoundEffect 
            src={SOUNDS.BACKGROUND}
            play={musicEnabled && !showMusicModal}
            loop={true}
            volume={0.1}
          />

          <Navbar
            avatar={avatar}
            onPersonalize={() => setShowPersonalize(!showPersonalize)}
            darkMode={darkMode}
            onToggleDarkMode={toggleDarkMode}
          />

          <main className="flex-1">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/games" element={<GameLayout />}>
                <Route path="math" element={<MathGame soundEnabled={soundEnabled} />} />
                <Route path="find-objects" element={<FindObjectsGame soundEnabled={soundEnabled} />} />
                <Route path="word-search" element={<WordSearchGame soundEnabled={soundEnabled} />} />
              </Route>
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </main>

          <Footer />

          {showPersonalize && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className={`${
                darkMode ? 'bg-slate-800 text-white' : 'bg-white text-gray-800'
              } p-6 rounded-lg shadow-lg max-w-md w-full mx-4 transition-colors duration-300`}>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-bold">Personalizar</h2>
                  <button
                    onClick={() => setShowPersonalize(false)}
                    className={`p-2 rounded-full ${
                      darkMode ? 'hover:bg-slate-700' : 'hover:bg-gray-100'
                    }`}
                  >
                    <X size={20} />
                  </button>
                </div>
                
                <div className="space-y-6">
                  <AvatarSelector onSelect={handleAvatarSelect} />
                  <BackgroundColorSelector onSelect={handleBgColorSelect} />
                  <ThemeIntensitySelector 
                    onIntensityChange={handleThemeIntensityChange}
                    currentIntensity={themeIntensity}
                  />
                </div>
              </div>
            </div>
          )}

          {showLeaderboard && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
              <div className={`${
                darkMode ? 'bg-slate-800 text-white' : 'bg-white text-gray-800'
              } rounded-lg shadow-lg max-w-md w-full mx-4 transition-colors duration-300`}>
                <div className="flex justify-between items-center p-6 pb-4">
                  <h2 className="text-xl font-bold flex items-center gap-2">
                    <Award className="text-yellow-500" size={24} />
                    Ranking
                  </h2>
                  <button
                    onClick={() => setShowLeaderboard(false)}
                    className={`p-2 rounded-full ${
                      darkMode ? 'hover:bg-slate-700' : 'hover:bg-gray-100'
                    }`}
                  >
                    <X size={20} />
                  </button>
                </div>
                <div className="px-6 pb-6">
                  <Leaderboard />
                </div>
              </div>
            </div>
          )}

          <div className="fixed bottom-4 right-4 flex flex-col gap-2 z-40">
            <button
              onClick={() => setShowLeaderboard(!showLeaderboard)}
              className={`p-3 rounded-full shadow-lg ${
                darkMode ? 'bg-slate-700 hover:bg-slate-600 text-yellow-400' : 'bg-white hover:bg-gray-50 text-yellow-600'
              } transition-colors duration-200`}
              aria-label="Ver ranking"
            >
              <Award size={24} />
            </button>

            <button
              onClick={toggleSound}
              className={`p-3 rounded-full shadow-lg ${
                darkMode ? 'bg-slate-700 hover:bg-slate-600' : 'bg-white hover:bg-gray-50'
              } transition-colors duration-200`}
              aria-label={soundEnabled ? 'Desativar som' : 'Ativar som'}
            >
              {soundEnabled ? (
                <Volume2 size={24} className="text-green-500" />
              ) : (
                <VolumeX size={24} className="text-red-500" />
              )}
            </button>

            <button
              onClick={toggleMusic}
              className={`p-3 rounded-full shadow-lg ${
                darkMode ? 'bg-slate-700 hover:bg-slate-600' : 'bg-white hover:bg-gray-50'
              } transition-colors duration-200`}
              aria-label={musicEnabled ? 'Desativar música' : 'Ativar música'}
            >
              <Music 
                size={24} 
                className={musicEnabled ? 'text-blue-500' : 'text-gray-400'} 
              />
            </button>
          </div>
        </div>
      </ThemeProvider>
    </Router>
  );
}

export default App;