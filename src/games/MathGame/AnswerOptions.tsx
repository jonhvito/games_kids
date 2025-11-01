import React from "react";
import { motion } from "framer-motion";

interface AnswerOptionsProps {
  options: number[];
  onAnswer: (answer: number) => void;
  disabled: boolean;
  selectedAnswer?: number | null;
  correctAnswer?: number;
}

const AnswerOptions: React.FC<AnswerOptionsProps> = ({
  options,
  onAnswer,
  disabled,
  selectedAnswer,
  correctAnswer,
}) => {
  const getButtonStyle = (option: number) => {
    if (selectedAnswer === null || selectedAnswer === undefined) {
      return disabled 
        ? 'bg-gray-200 text-gray-500 cursor-not-allowed' 
        : 'bg-white hover:bg-blue-50 text-blue-800 border-blue-300 hover:border-blue-500 shadow-lg hover:shadow-xl';
    }

    if (option === correctAnswer) {
      return 'bg-green-500 text-white border-green-600 shadow-lg animate-pulse';
    } else if (option === selectedAnswer && option !== correctAnswer) {
      return 'bg-red-500 text-white border-red-600 shadow-lg animate-pulse';
    } else {
      return 'bg-gray-200 text-gray-500 cursor-not-allowed';
    }
  };

  return (
    <div className="grid grid-cols-2 gap-4 mt-6">
      {options.map((option, index) => (
        <motion.button
          key={index}
          whileHover={{ scale: disabled ? 1 : 1.05 }}
          whileTap={{ scale: disabled ? 1 : 0.95 }}
          onClick={() => onAnswer(option)}
          disabled={disabled}
          className={`
            p-4 text-xl font-bold rounded-xl border-2 transition-all duration-200
            ${getButtonStyle(option)}
          `}
        >
          {option}
        </motion.button>
      ))}
    </div>
  );
};

export default AnswerOptions;
