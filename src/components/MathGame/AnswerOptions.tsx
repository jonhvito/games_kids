import React from "react";
import { QuestionType } from "../../games/MathGame/mathGameUtils";

interface AnswerOptionsProps {
  options: number[];
  selectedAnswer: number | null;
  isCorrect: boolean | null;
  question: QuestionType;
  onSelect: (answer: number) => void;
}

const AnswerOptions: React.FC<AnswerOptionsProps> = ({
  options,
  selectedAnswer,
  isCorrect,
  question,
  onSelect,
}) => {
  return (
    <div
      className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 w-full"
      key={question?.result + "-" + question.operand1.value + "-" + question.operand2.value}
    >
      {options.map((option, index) => {
        let animationClass = "";
        if (selectedAnswer !== null && selectedAnswer === option) {
          animationClass = isCorrect ? "animate-bounce" : "animate-shake";
        }

        const isSelected = selectedAnswer === option;
        const isCorrectOption = option === question.result;

        const baseClass = `
          p-4 sm:p-5 rounded-xl text-base sm:text-2xl font-extrabold font-baloo
          transition-all duration-300
          shadow-lg hover:shadow-2xl
          active:scale-90
          sm:min-h-12 sm:min-w-12
          flex items-center justify-center
          ${animationClass}
        `;

        const stateClass = selectedAnswer === null
          ? "bg-gradient-to-br from-white to-blue-100 text-gray-800"
          : isSelected
            ? isCorrect
              ? "bg-gradient-to-br from-green-400 to-green-600 text-white"
              : "bg-gradient-to-br from-red-400 to-red-600 text-white"
            : isCorrectOption
              ? "bg-gradient-to-br from-green-400 to-green-600 text-white"
              : "bg-white text-gray-800 opacity-60";

        const ringClass = isSelected ? "ring-4 ring-yellow-300" : "";

        const boxShadow = isSelected
          ? isCorrect
            ? "0 0 0 8px #34d39955"
            : "0 0 0 8px #f8717155"
          : undefined;

        return (
          <button
            key={`${index}-${selectedAnswer}-${isCorrect}`}
            onClick={() => onSelect(option)}
            disabled={selectedAnswer !== null}
            className={`${baseClass} ${stateClass} ${ringClass} touch-manipulation`}
            style={{
              boxShadow,
              transition: "box-shadow 0.3s",
            }}
            aria-label={`Opção de resposta: ${option}`}
          >
            {option}
            {isSelected && (
              <span
                className={`ml-2 text-2xl transition-opacity duration-300 ${
                  isCorrect ? "opacity-100" : "opacity-80"
                }`}
                aria-label={isCorrect ? "Correto" : "Incorreto"}
              >
                {isCorrect ? "✅" : "❌"}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};

export default AnswerOptions;