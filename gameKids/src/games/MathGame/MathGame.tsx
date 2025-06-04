import React, { useState, useEffect } from "react";
import QRCodeGenerator from "../../components/QRCodeGenerator";
import { generateQuestion, checkAnswer, QuestionType } from "./mathGameUtils";
import MathGameInstructions from "./MathGameInstructions";
import CelebrationEffect from "../../components/MathGame/CelebrationEffect";
import AnswerOptions from "../../components/MathGame/AnswerOptions";
import GameComplete from "../../components/MathGame/GameComplete";
import GameSounds from "../../components/MathGame/GameSounds";
import Header from "../../components/MathGame/Header";
import QuestionDisplay from "../../components/MathGame/QuestionDisplay";

interface MathGameProps {
  soundEnabled: boolean;
}

const HIGH_SCORE_KEY = "mathGameHighScore";

const MathGame: React.FC<MathGameProps> = ({ soundEnabled }) => {
  const [question, setQuestion] = useState<QuestionType | null>(null);
  const [options, setOptions] = useState<number[]>([]);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [score, setScore] = useState<number>(0);
  const [questionsAnswered, setQuestionsAnswered] = useState<number>(0);
  const [showInstructions, setShowInstructions] = useState<boolean>(true);
  const [playCorrectSound, setPlayCorrectSound] = useState<boolean>(false);
  const [playIncorrectSound, setPlayIncorrectSound] = useState<boolean>(false);
  const [playCompleteSound, setPlayCompleteSound] = useState<boolean>(false);
  const [playClickSound, setPlayClickSound] = useState<boolean>(false);
  const [showCelebration, setShowCelebration] = useState<boolean>(false);
  const [highScore, setHighScore] = useState<number>(() => {
    return Number(localStorage.getItem(HIGH_SCORE_KEY) || 0);
  });

  const generateNewQuestion = () => {
    const { question: newQuestion, options: newOptions } = generateQuestion();
    setQuestion(newQuestion);
    setOptions(newOptions);
    setSelectedAnswer(null);
    setIsCorrect(null);
  };

  useEffect(() => {
    setSelectedAnswer(null);
    setIsCorrect(null);
  }, [question]);

  useEffect(() => {
    if (!showInstructions) {
      generateNewQuestion();
    }
  }, [showInstructions]);

  const handleAnswerSelect = (answer: number) => {
    if (selectedAnswer !== null) return;

    setPlayClickSound(false);
    setTimeout(() => setPlayClickSound(true), 0);

    setSelectedAnswer(answer);
    const correct = checkAnswer(question, answer);
    setIsCorrect(correct);

    setTimeout(() => {
      if (correct) {
        setScore((prev) => prev + 10);
        setPlayCorrectSound(false);
        setTimeout(() => setPlayCorrectSound(true), 0);
      } else {
        setPlayIncorrectSound(false);
        setTimeout(() => setPlayIncorrectSound(true), 0);
      }
      setQuestionsAnswered((prev) => prev + 1);

      setTimeout(() => {
        generateNewQuestion();
      }, 1200);
    }, 200);
  };

  useEffect(() => {
    if (questionsAnswered === 10) {
      setPlayCompleteSound(true);
      setShowCelebration(true);
      setTimeout(() => setShowCelebration(false), 1800);

      // Salva o high score no localStorage
      if (score > highScore) {
        setHighScore(score);
        localStorage.setItem(HIGH_SCORE_KEY, String(score));
      }
    }
  }, [questionsAnswered]);

  const resetGame = () => {
    setPlayClickSound(false);
    setTimeout(() => setPlayClickSound(true), 0);
    setScore(0);
    setQuestionsAnswered(0);
    generateNewQuestion();
    setShowCelebration(false);
  };

  const startGame = () => {
    setShowInstructions(false);
  };

  if (showInstructions) {
    return <MathGameInstructions onStart={startGame} />;
  }

  return (
    <div className="max-w-3xl mx-auto relative font-baloo px-2 sm:px-4 py-4">
      {/* Sons */}
      <GameSounds
        soundEnabled={soundEnabled}
        playClick={playClickSound}
        playCorrect={playCorrectSound}
        playIncorrect={playIncorrectSound}
        playComplete={playCompleteSound}
        onClickEnd={() => setPlayClickSound(false)}
        onCorrectEnd={() => setPlayCorrectSound(false)}
        onIncorrectEnd={() => setPlayIncorrectSound(false)}
        onCompleteEnd={() => setPlayCompleteSound(false)}
      />

      {/* Celebration */}
      {showCelebration && <CelebrationEffect type="confetti" />}

      {/* Header */}
      <Header
        score={score}
        questionsAnswered={questionsAnswered}
        onReset={resetGame}
      />

      {/* Exibe o recorde/local leaderboard */}
      <div className="text-center mb-4">
        <span className="inline-block bg-yellow-100 text-yellow-800 font-bold rounded-full px-4 py-1 text-base shadow">
          🏆 Seu recorde: {highScore} pontos
        </span>
      </div>

      {/* Game Complete */}
      {questionsAnswered === 10 ? (
        <GameComplete score={score} onReset={resetGame} />
      ) : (
        question && (
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 sm:p-8 rounded-2xl shadow-xl mb-8 animate-slide-in min-h-[18rem] flex flex-col gap-4 sm:gap-8">
            <QuestionDisplay question={question} />

            <AnswerOptions
              options={options}
              selectedAnswer={selectedAnswer}
              isCorrect={isCorrect}
              question={question}
              onSelect={handleAnswerSelect}
            />
          </div>
        )
      )}

      {/* QR Code */}
      <div className="mt-8">
        <QRCodeGenerator gameUrl="/games/math" gameName="Jogo de Contas" />
      </div>

      {/* Estilo para animações e responsividade extra */}
      <style>
        {`
        @import url('https://fonts.googleapis.com/css2?family=Baloo+2:wght@700&display=swap');
        .font-baloo { font-family: 'Baloo 2', cursive; }

        @keyframes shake {
          10%, 90% { transform: translateX(-2px); }
          20%, 80% { transform: translateX(4px); }
          30%, 50%, 70% { transform: translateX(-8px); }
          40%, 60% { transform: translateX(8px); }
        }
        .animate-shake {
          animation: shake 0.4s;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-fade-in {
          animation: fadeIn 0.8s;
        }

        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0);}
          50% { transform: translateY(-18px);}
        }
        .animate-bounce-slow {
          animation: bounce-slow 1.2s infinite;
        }

        @keyframes wiggle {
          0%, 100% { transform: rotate(-8deg);}
          50% { transform: rotate(8deg);}
        }
        .animate-wiggle {
          animation: wiggle 0.7s;
        }

        @keyframes slideIn {
          from { opacity: 0; transform: translateY(40px);}
          to { opacity: 1; transform: translateY(0);}
        }
        .animate-slide-in {
          animation: slideIn 0.7s;
        }

        /* Responsividade extra para áreas de jogo */
        @media (max-width: 640px) {
          .min-h-[18rem] { min-height: 14rem !important; }
        }
        `}
      </style>
    </div>
  );
};

export default MathGame;