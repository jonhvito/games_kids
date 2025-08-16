import React, { useState, useEffect, useRef } from "react";
import QRCodeGenerator from "../../components/QRCodeGenerator";
import SoundEffect from "../../components/SoundEffect";
import { SOUNDS } from "../../utils/soundUtils";
import FindObjectsInstructions from "./FindObjectsInstructions";
import { FoodObject, foodObjects } from "./findObjectsUtils";
import GameCompleteModal from "../../components/FindObjectsGame/GameComplete";
import GameScene from "../../components/FindObjectsGame/GameScene";
import Header from "../../components/FindObjectsGame/Header";
import ObjectList from "../../components/FindObjectsGame/ObjectList";
import Confetti from "react-confetti";
import { AnimatePresence, motion } from "framer-motion";

interface FindObjectsGameProps {
  soundEnabled: boolean;
}

const backgroundImages = [
  "https://images.pexels.com/photos/461382/pexels-photo-461382.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/5514819/pexels-photo-5514819.jpeg",
  "https://images.pexels.com/photos/1105166/pexels-photo-1105166.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  "https://images.pexels.com/photos/1092730/pexels-photo-1092730.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
];

const HIGH_SCORE_KEY = "findObjectsHighScore";

const FindObjectsGame: React.FC<FindObjectsGameProps> = ({ soundEnabled }) => {
  const [objects, setObjects] = useState<FoodObject[]>(foodObjects);
  const [foundObjects, setFoundObjects] = useState<string[]>([]);
  const foundObjectsRef = useRef<string[]>([]);
  useEffect(() => {
    foundObjectsRef.current = foundObjects;
  }, [foundObjects]);

  const [showInstructions, setShowInstructions] = useState<boolean>(true);
  const [playCorrectSound, setPlayCorrectSound] = useState<boolean>(false);
  const [playCompleteSound, setPlayCompleteSound] = useState<boolean>(false);
  const [playClickSound, setPlayClickSound] = useState<boolean>(false);
  const [gameComplete, setGameComplete] = useState<boolean>(false);
  const [backgroundUrl, setBackgroundUrl] = useState(backgroundImages[0]);
  const [showConfetti, setShowConfetti] = useState(false);
  const [currentImageAspectRatio, setCurrentImageAspectRatio] = useState<number | undefined>(
    1260 / 750
  );

  const [hintCount, setHintCount] = useState(0);
  const [hintedId, setHintedId] = useState<string | null>(null);
  const [highScore, setHighScore] = useState<number>(() => {
    return Number(localStorage.getItem(HIGH_SCORE_KEY) || 0);
  });

  const hintTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const gameContainerRef = useRef<HTMLDivElement>(null);

  // Controle de rodada para evitar bug da dica após reset
  const [roundId, setRoundId] = useState(0);
  const roundIdRef = useRef(roundId);
  useEffect(() => {
    roundIdRef.current = roundId;
  }, [roundId]);

  const [windowSize, setWindowSize] = useState({
    width: typeof window !== "undefined" ? window.innerWidth : 0,
    height: typeof window !== "undefined" ? window.innerHeight : 0,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (backgroundUrl) {
      const img = new Image();
      img.onload = () => {
        if (img.naturalWidth > 0 && img.naturalHeight > 0) {
          setCurrentImageAspectRatio(img.naturalWidth / img.naturalHeight);
        }
      };
      img.onerror = () => {
        setCurrentImageAspectRatio(16 / 9);
      };
      img.src = backgroundUrl;
    }
  }, [backgroundUrl]);

  const startGame = () => {
    setShowInstructions(false);
    resetGame();
  };

  const resetGame = () => {
    // LIMPA A DICA E QUALQUER TIMEOUT PENDENTE
    if (hintTimeout.current) {
      clearTimeout(hintTimeout.current);
      hintTimeout.current = null;
    }
    setHintedId(null);
    setHintCount(0);

    setFoundObjects([]);
    setGameComplete(false);
    setShowConfetti(false);
    setRoundId((prev) => prev + 1);

    const offsetAmount = 17;
    const objectRadiusPercentEstimate = 4;
    const minClampPosition = objectRadiusPercentEstimate;
    const maxClampPosition = 100 - objectRadiusPercentEstimate;

    const shuffledObjects = [...foodObjects].map((obj) => {
      let newLeft = obj.left + (Math.random() * (offsetAmount * 2) - offsetAmount);
      let newTop = obj.top + (Math.random() * (offsetAmount * 2) - offsetAmount);
      newLeft = Math.max(minClampPosition, Math.min(maxClampPosition, newLeft));
      newTop = Math.max(minClampPosition, Math.min(maxClampPosition, newTop));
      return { ...obj, left: newLeft, top: newTop };
    });
    setObjects(shuffledObjects);

    const randomIndex = Math.floor(Math.random() * backgroundImages.length);
    setBackgroundUrl(backgroundImages[randomIndex]);
  };

  const handleObjectClick = (id: string) => {
    if (foundObjects.includes(id) || gameComplete) return;

    setPlayClickSound(false); setTimeout(() => setPlayClickSound(true), 0);
    setPlayCorrectSound(false); setTimeout(() => setPlayCorrectSound(true), 0);

    setFoundObjects((prev) => [...prev, id]);

    // Se o objeto encontrado era o objeto da dica, limpa a dica imediatamente.
    if (id === hintedId) {
      if (hintTimeout.current) {
        clearTimeout(hintTimeout.current);
        hintTimeout.current = null;
      }
      setHintedId(null);
    }
  };

  useEffect(() => {
    if (foundObjects.length === objects.length && foundObjects.length > 0 && !gameComplete) {
      setGameComplete(true);
      setPlayCompleteSound(false); setTimeout(() => setPlayCompleteSound(true), 0);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 5000);
      if (foundObjects.length > highScore) {
        setHighScore(foundObjects.length);
        localStorage.setItem(HIGH_SCORE_KEY, String(foundObjects.length));
      }
      if (hintTimeout.current) {
        clearTimeout(hintTimeout.current);
        hintTimeout.current = null;
      }
      setHintedId(null);
    }
  }, [foundObjects, objects, gameComplete, highScore]);

  const handleHint = () => {
    if (hintCount >= 3 || gameComplete || hintedId) return;
    const notFound = objects.filter((obj) => !foundObjects.includes(obj.id));
    if (notFound.length === 0) return;
    const randomHintedObject = notFound[Math.floor(Math.random() * notFound.length)];

    // Limpa timeout anterior se existir
    if (hintTimeout.current) {
      clearTimeout(hintTimeout.current);
      hintTimeout.current = null;
    }

    setHintedId(randomHintedObject.id);
    setHintCount((prev) => prev + 1);
  };

  // Sempre que hintedId mudar, inicia um timeout para limpar a dica
  useEffect(() => {
    if (!hintedId) return;

    const thisRound = roundId;

    hintTimeout.current = setTimeout(() => {
      if (
        roundIdRef.current === thisRound &&
        !foundObjectsRef.current.includes(hintedId)
      ) {
        setHintedId(null);
        hintTimeout.current = null;
      }
    }, 2500);

    return () => {
      if (hintTimeout.current) {
        clearTimeout(hintTimeout.current);
        hintTimeout.current = null;
      }
    };
  }, [hintedId, roundId]);

  // Cleanup global
  useEffect(() => {
    return () => {
      if (hintTimeout.current) {
        clearTimeout(hintTimeout.current);
        hintTimeout.current = null;
      }
      setHintedId(null);
    };
  }, []);

  if (showInstructions) {
    return <FindObjectsInstructions onStart={startGame} />;
  }

  return (
    <div ref={gameContainerRef} className="max-w-5xl mx-auto relative px-2 sm:px-4 py-4 flex flex-col gap-4">
      {/* Sons */}
      {soundEnabled && (
        <>
          <SoundEffect src={SOUNDS.CLICK} play={playClickSound} onEnd={() => setPlayClickSound(false)} />
          <SoundEffect src={SOUNDS.CORRECT} play={playCorrectSound} onEnd={() => setPlayCorrectSound(false)} />
          <SoundEffect src={SOUNDS.GAME_COMPLETE} play={playCompleteSound} onEnd={() => setPlayCompleteSound(false)} />
        </>
      )}
      {/* Confetti */}
      <AnimatePresence>
        {showConfetti && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }} className="fixed inset-0 pointer-events-none z-[100]">
            <Confetti width={windowSize.width} height={windowSize.height} numberOfPieces={250} recycle={false} gravity={0.12}/>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header */}
      <Header
        found={foundObjects.length}
        total={objects.length}
        hintCount={hintCount}
        gameComplete={gameComplete}
        onHint={handleHint}
        onReset={resetGame}
        hintedId={hintedId}
      />

      {/* Recorde */}
      {highScore > 0 && (
        <div className="text-center -mt-2 mb-2">
          <span className="inline-block bg-yellow-100 dark:bg-yellow-700 text-yellow-800 dark:text-yellow-200 font-semibold rounded-full px-4 py-1.5 text-sm sm:text-base shadow-sm transition-colors duration-300">
            🏆 Recorde: {highScore} objetos
          </span>
        </div>
      )}

      {/* Lista de Objetos */}
      <ObjectList
        objects={objects}
        foundObjects={foundObjects}
        hintedId={hintedId}
        roundId={roundId}
      />

      {/* Modal de Jogo Completo */}
      <AnimatePresence>
        {gameComplete && (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.3, ease: "easeOut" }} className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 dark:bg-black/70 p-4">
            <GameCompleteModal total={objects.length} onReset={() => { setGameComplete(false); resetGame(); }} />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Cena do Jogo */}
      <div
        className="w-full rounded-lg overflow-hidden shadow-xl
                   border-2 border-gray-200 dark:border-slate-700
                   bg-sky-100 dark:bg-slate-900
                   transition-colors duration-300"
        style={currentImageAspectRatio ? { aspectRatio: `${currentImageAspectRatio}` } : { aspectRatio: "16/9" }}
      >
        <GameScene
          key={roundId}
          backgroundUrl={backgroundUrl}
          objects={objects}
          foundObjects={foundObjects}
          hintedId={hintedId}
          onObjectClick={handleObjectClick}
          roundId={roundId}
        />
      </div>

      {/* QR Code */}
      <div className="mt-8 pt-6 border-t border-gray-200 dark:border-slate-700 transition-colors duration-300">
        <h3 className="text-center text-lg font-semibold text-slate-700 dark:text-slate-300 mb-3 transition-colors duration-300">
          Continue a diversão no celular!
        </h3>
        <QRCodeGenerator gameUrl="/games/find-objects" gameName="Encontrar Objetos" />
      </div>
    </div>
  );
};

export default FindObjectsGame;
