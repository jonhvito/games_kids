import React, { useState, useEffect } from "react";
import QRCodeGenerator from "../../components/QRCodeGenerator";
import WordSearchInstructions from "./WordSearchInstructions";
import { generateWordSearch, Word } from "./wordSearchUtils";
import WordSearchGrid from "./WordSearchGrid";
import WordList from "./WordList";
import Header from "../../components/WordSearchGame/Header";
import CompleteModal from "../../components/WordSearchGame/GameComplete";
import Confetti from "react-confetti";
import GameSounds from "../../components/WordSearchGame/GameSounds";

interface WordSearchGameProps {
  soundEnabled: boolean;
}

const MAX_HINTS = 3;
const HIGH_SCORE_KEY = "wordSearchHighScore";

const WordSearchGame: React.FC<WordSearchGameProps> = ({ soundEnabled }) => {
  const [grid, setGrid] = useState<string[][]>([]);
  const [words, setWords] = useState<Word[]>([]);
  const [foundWords, setFoundWords] = useState<string[]>([]);
  const [selectedCells, setSelectedCells] = useState<number[][]>([]);
  const [isSelecting, setIsSelecting] = useState<boolean>(false);
  const [startCell, setStartCell] = useState<number[]>([]);
  const [showInstructions, setShowInstructions] = useState<boolean>(true);
  const [playCorrectSound, setPlayCorrectSound] = useState<boolean>(false);
  const [playCompleteSound, setPlayCompleteSound] = useState<boolean>(false);
  const [playClickSound, setPlayClickSound] = useState<boolean>(false);
  const [gameComplete, setGameComplete] = useState<boolean>(false);

  const [hintCount, setHintCount] = useState<number>(0);
  const [hintedCell, setHintedCell] = useState<number[] | null>(null);
  const [hintAnimating, setHintAnimating] = useState<boolean>(false);

  const [lastFoundWord, setLastFoundWord] = useState<string | null>(null);

  // Confetti state
  const [showConfetti, setShowConfetti] = useState(false);

  // Ranking local
  const [highScore, setHighScore] = useState<number>(() => {
    return Number(localStorage.getItem(HIGH_SCORE_KEY) || 0);
  });

  const generateNewGame = () => {
    const { grid: newGrid, words: placedWords } = generateWordSearch();
    setGrid(newGrid);
    setWords(placedWords);
    setFoundWords([]);
    setSelectedCells([]);
    setGameComplete(false);
    setHintCount(0);
    setHintedCell(null);
    setLastFoundWord(null);
    setShowConfetti(false);
  };

  useEffect(() => {
    if (!showInstructions) {
      generateNewGame();
    }
  }, [showInstructions]);

  useEffect(() => {
    if (words.length > 0 && foundWords.length === words.length) {
      setGameComplete(true);
      setPlayCompleteSound(false);
      setTimeout(() => setPlayCompleteSound(true), 0);
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 5000);

      // Salva o high score no localStorage
      if (foundWords.length > highScore) {
        setHighScore(foundWords.length);
        localStorage.setItem(HIGH_SCORE_KEY, String(foundWords.length));
      }
    }
  }, [foundWords, words, highScore]);

  const startGame = () => {
    setShowInstructions(false);
  };

  const resetGame = () => {
    setPlayClickSound(false);
    setTimeout(() => setPlayClickSound(true), 0);
    generateNewGame();
  };

  const checkSelection = () => {
    if (selectedCells.length < 3) {
      setSelectedCells([]);
      return;
    }
    let selectedWord = "";
    selectedCells.forEach(([row, col]) => {
      selectedWord += grid[row][col];
    });

    const matchedWord = words.find(
      (word) =>
        (word.text === selectedWord ||
          word.text === selectedWord.split("").reverse().join("")) &&
        !foundWords.includes(word.text)
    );

    if (matchedWord) {
      setFoundWords([...foundWords, matchedWord.text]);
      setPlayCorrectSound(false);
      setTimeout(() => setPlayCorrectSound(true), 0);
      setLastFoundWord(matchedWord.text);
      setTimeout(() => setLastFoundWord(null), 1200);
    }
    setSelectedCells([]);
  };

  const handleCellMouseDown = (row: number, col: number) => {
    setPlayClickSound(false);
    setTimeout(() => setPlayClickSound(true), 0);
    setIsSelecting(true);
    setStartCell([row, col]);
    setSelectedCells([[row, col]]);
  };

  const handleCellMouseEnter = (row: number, col: number) => {
    if (!isSelecting) return;
    const [startRow, startCol] = startCell;
    const rowDiff = row - startRow;
    const colDiff = col - startCol;
    if (
      (rowDiff === 0 && colDiff === 0) ||
      (rowDiff !== 0 &&
        colDiff !== 0 &&
        Math.abs(rowDiff) !== Math.abs(colDiff))
    ) {
      return;
    }
    const newSelectedCells: number[][] = [[startRow, startCol]];
    const rowStep = rowDiff === 0 ? 0 : rowDiff > 0 ? 1 : -1;
    const colStep = colDiff === 0 ? 0 : colDiff > 0 ? 1 : -1;
    const steps = Math.max(Math.abs(rowDiff), Math.abs(colDiff));
    for (let i = 1; i <= steps; i++) {
      newSelectedCells.push([
        startRow + i * rowStep,
        startCol + i * colStep,
      ]);
    }
    setSelectedCells(newSelectedCells);
  };

  const handleCellMouseUp = () => {
    if (isSelecting) {
      setIsSelecting(false);
      checkSelection();
    }
  };

  const handleHint = () => {
    if (hintCount >= MAX_HINTS || gameComplete) return;
    const notFound = words.find((w) => !foundWords.includes(w.text));
    if (!notFound) return;
    setHintedCell([notFound.row, notFound.col]);
    setHintCount(hintCount + 1);
    setHintAnimating(true);
    setTimeout(() => {
      setHintedCell(null);
      setHintAnimating(false);
    }, 2000);
  };

  // Personalização: aplica cor de fundo escolhida
  useEffect(() => {
    const bgColor = localStorage.getItem("selectedBgColor");
    if (bgColor) {
      document.body.style.background = bgColor;
    }
    return () => {
      document.body.style.background = "";
    };
  }, []);

  if (showInstructions) {
    return <WordSearchInstructions onStart={startGame} />;
  }

  return (
    <div className="max-w-4xl mx-auto relative px-2 sm:px-4 py-4">
      {/* Sons */}
      <GameSounds
        soundEnabled={soundEnabled}
        playClick={playClickSound}
        playCorrect={playCorrectSound}
        playComplete={playCompleteSound}
        onClickEnd={() => setPlayClickSound(false)}
        onCorrectEnd={() => setPlayCorrectSound(false)}
        onCompleteEnd={() => setPlayCompleteSound(false)}
      />

      {/* Confetti */}
      {showConfetti && (
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          numberOfPieces={350}
          recycle={false}
          gravity={0.18}
          initialVelocityY={18}
          wind={0.01}
          tweenDuration={8000}
          run={true}
        />
      )}

      {/* Header */}
      <Header
        hintCount={hintCount}
        maxHints={MAX_HINTS}
        gameComplete={gameComplete}
        hintAnimating={hintAnimating}
        onHint={handleHint}
        onReset={resetGame}
      />

      {/* Exibe o recorde/local leaderboard */}
      <div className="text-center mb-4">
        <span className="inline-block bg-yellow-100 text-yellow-800 font-bold rounded-full px-4 py-1 text-base shadow">
          🏆 Seu recorde: {highScore} palavras encontradas
        </span>
      </div>

      {/* Layout responsivo */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <WordSearchGrid
            grid={grid}
            selectedCells={selectedCells}
            onCellMouseDown={handleCellMouseDown}
            onCellMouseEnter={handleCellMouseEnter}
            onCellMouseUp={handleCellMouseUp}
            hintedCell={hintedCell}
          />
        </div>
        <div>
          <WordList
            words={words}
            foundWords={foundWords}
            lastFoundWord={lastFoundWord}
          />
        </div>
      </div>

      {/* Complete Modal */}
      {gameComplete && (
        <CompleteModal
          onReset={resetGame}
          foundWords={foundWords.length}
          totalWords={words.length}
        />
      )}

      {/* QR Code */}
      <div className="mt-8">
        <QRCodeGenerator
          gameUrl="/games/word-search"
          gameName="Caça-Palavras"
        />
      </div>

      {/* Estilo extra para responsividade do grid */}
      <style>
        {`
        @media (max-width: 640px) {
          .grid-cols-1 > .md\\:col-span-2 {
            grid-column: span 1 / span 1 !important;
          }
        }
        `}
      </style>
    </div>
  );
};

export default WordSearchGame;