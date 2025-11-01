import React from "react";
import FoodItem from "./FoodItem";
import { QuestionType } from "./mathGameUtils";

interface QuestionDisplayProps {
  question: QuestionType;
}

const QuestionDisplay: React.FC<QuestionDisplayProps> = ({ question }) => {
  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl mb-6">
      <div className="text-center mb-6">
        <h3 className="text-lg font-semibold text-gray-700 mb-4">
          Resolva a operação:
        </h3>
        
        <div className="flex items-center justify-center gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <FoodItem type={question.operand1.type} value={question.operand1.value} />
            <span className="text-3xl font-bold text-gray-800">
              {question.operator}
            </span>
            <FoodItem type={question.operand2.type} value={question.operand2.value} />
            <span className="text-3xl font-bold text-gray-800">=</span>
            <span className="text-4xl font-bold text-emerald-600">?</span>
          </div>
        </div>
        
        <div className="text-center mt-4">
          <p className="text-xl font-semibold text-gray-700">
            {question.operand1.value} {question.operator} {question.operand2.value} = ?
          </p>
        </div>
      </div>
    </div>
  );
};

export default QuestionDisplay;
