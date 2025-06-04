import React from "react";
import FoodItem from "../../games/MathGame/FoodItem";
import { QuestionType } from "../../games/MathGame/mathGameUtils";

interface QuestionDisplayProps {
  question: QuestionType;
}

const QuestionDisplay: React.FC<QuestionDisplayProps> = ({ question }) => {
  return (
    <div className="flex flex-col items-center">
      <p className="text-2xl font-extrabold text-gray-800 mb-4 tracking-wide font-baloo">
        Quanto é:
      </p>
      <div className="flex items-center justify-center flex-wrap gap-2 mb-8">
        <span className="inline-block animate-wiggle">
          <FoodItem type={question.operand1.type} value={question.operand1.value} />
        </span>
        <span className="text-3xl font-extrabold text-gray-800 mx-2 select-none font-baloo">
          {question.operator === "+" ? "+" : "−"}
        </span>
        <span className="inline-block animate-wiggle">
          <FoodItem type={question.operand2.type} value={question.operand2.value} />
        </span>
        <span className="text-3xl font-extrabold text-gray-800 mx-2 select-none font-baloo">
          =
        </span>
        <span className="text-3xl font-extrabold text-blue-600 select-none font-baloo">
          ?
        </span>
      </div>
    </div>
  );
};

export default QuestionDisplay;