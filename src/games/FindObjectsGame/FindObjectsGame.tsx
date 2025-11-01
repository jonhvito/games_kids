import React, { useState } from 'react';
import { ArrowLeft, Target, Search, Star } from 'lucide-react';
import GameComplete from '../../components/GameComplete';

interface ObjectToFind {
  id: string;
  name: string;
  found: boolean;
  x: number;
  y: number;
}

const FindObjectsGame: React.FC = () => {
  const [isCompleted, setIsCompleted] = useState(false);
  const [foundObjects, setFoundObjects] = useState<string[]>([]);
  const [score, setScore] = useState(0);
  const [soundEnabled, setSoundEnabled] = useState(true);
  
  const objectsToFind: ObjectToFind[] = [
    { id: 'butterfly', name: 'Borboleta', found: false, x: 15, y: 20 },
    { id: 'bird', name: 'Pássaro', found: false, x: 60, y: 15 },
    { id: 'flower', name: 'Flor', found: false, x: 30, y: 60 },
    { id: 'ball', name: 'Bola', found: false, x: 75, y: 70 },
    { id: 'tree', name: 'Árvore', found: false, x: 45, y: 40 }
  ];

  const handleObjectClick = (objectId: string, event: React.MouseEvent) => {
    event.stopPropagation();
    
    if (foundObjects.includes(objectId)) return;

    setFoundObjects(prev => [...prev, objectId]);
    setScore(prev => prev + 20);

    // Efeito sonoro de acerto
    if (soundEnabled) {
      const correctSound = new Audio('/sounds/correct.mp3');
      correctSound.play().catch(() => {});
    }

    // Verificar se o jogo foi completado
    if (foundObjects.length + 1 === objectsToFind.length) {
      setTimeout(() => {
        setIsCompleted(true);
        
        // Som de conclusão
        if (soundEnabled) {
          const completeSound = new Audio('/sounds/complete.mp3');
          completeSound.play().catch(() => {});
        }
      }, 500);
    }
  };

  const handleRestart = () => {
    setFoundObjects([]);
    setScore(0);
    setIsCompleted(false);
  };

  const handleExit = () => {
    window.location.hash = '/';
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-400 via-blue-500 to-purple-600">
      {/* Header */}
      <div className="bg-white/20 backdrop-blur-sm p-4 flex justify-between items-center">
        <button
          onClick={handleExit}
          className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition-colors"
        >
          <ArrowLeft size={20} />
          Sair
        </button>
        
        <div className="flex items-center gap-4 text-white">
          <div className="flex items-center gap-2">
            <Target size={20} />
            <span>Encontrados: {foundObjects.length}/{objectsToFind.length}</span>
          </div>
          <div className="flex items-center gap-2">
            <Star size={20} />
            <span>Pontos: {score}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6 p-6 max-w-7xl mx-auto">
        <div className="lg:w-3/4">
          {/* Game Scene */}
          <div className="relative bg-green-300 rounded-xl overflow-hidden shadow-2xl h-96 lg:h-[500px]">
            <img 
              src="/image.jpg" 
              alt="Cenário do jogo"
              className="w-full h-full object-cover"
            />
            
            {/* Objetos clicáveis */}
            {objectsToFind.map((obj) => (
              <button
                key={obj.id}
                onClick={(e) => handleObjectClick(obj.id, e)}
                className={`absolute w-8 h-8 rounded-full border-2 transition-all duration-300 ${
                  foundObjects.includes(obj.id)
                    ? 'bg-green-500 border-green-600 shadow-lg'
                    : 'bg-red-500/70 border-red-600 hover:bg-red-500 hover:scale-110'
                }`}
                style={{
                  left: `${obj.x}%`,
                  top: `${obj.y}%`,
                  transform: 'translate(-50%, -50%)'
                }}
                disabled={foundObjects.includes(obj.id)}
              >
                {foundObjects.includes(obj.id) && (
                  <Target size={16} className="text-white mx-auto" />
                )}
              </button>
            ))}
          </div>
        </div>
        
        <div className="lg:w-1/4">
          {/* Object List */}
          <div className="bg-white/20 backdrop-blur-sm rounded-xl p-4">
            <h3 className="text-white text-xl font-bold mb-4 flex items-center gap-2">
              <Search size={24} />
              Procure por:
            </h3>
            <div className="space-y-2">
              {objectsToFind.map((obj) => (
                <div
                  key={obj.id}
                  className={`p-3 rounded-lg transition-all duration-300 ${
                    foundObjects.includes(obj.id)
                      ? 'bg-green-500/80 text-white line-through'
                      : 'bg-white/30 text-white'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{obj.name}</span>
                    {foundObjects.includes(obj.id) && (
                      <Target size={20} className="text-white" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {isCompleted && (
        <GameComplete
          gameType="find-objects"
          foundItems={foundObjects.length}
          totalItems={objectsToFind.length}
          onReset={handleRestart}
        />
      )}
    </div>
  );
};

export default FindObjectsGame;
