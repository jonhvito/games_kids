// Types of food items
export type FoodType = 'apple' | 'banana' | 'orange' | 'strawberry' | 'carrot' | 'grape'; 

// Food operand structure
export interface FoodOperand {
  type: FoodType;
  value: number;
}

// Question structure
export interface QuestionType {
  operand1: FoodOperand;
  operand2: FoodOperand;
  operator: '+' | '-';
  result: number;
}

// Random number generator within a range
const getRandomInt = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Get a random food type
const getRandomFoodType = (): FoodType => {
  const foodTypes: FoodType[] = ['apple', 'banana', 'orange', 'strawberry', 'carrot' , 'grape'];
  return foodTypes[Math.floor(Math.random() * foodTypes.length)];
};

// Generate a question with food items
export const generateQuestion = () => {
  // Para crianças: mantenha números pequenos e fáceis (1-5)
  const operand1Value = getRandomInt(1, 5);
  const operand2Value = getRandomInt(1, 5);
  const operatorIndex = getRandomInt(0, 1);
  const operator: ('+' | '-') = operatorIndex === 0 ? '+' : '-';
  
  // Garante que a subtração não resulte em número negativo
  let firstOperand = operand1Value;
  let secondOperand = operand2Value;
  
  if (operator === '-' && secondOperand > firstOperand) {
    // Troca para evitar resultado negativo
    [firstOperand, secondOperand] = [secondOperand, firstOperand];
  }
  
  const result = operator === '+' 
    ? firstOperand + secondOperand 
    : firstOperand - secondOperand;
  
  const question: QuestionType = {
    operand1: {
      type: getRandomFoodType(),
      value: firstOperand
    },
    operand2: {
      type: getRandomFoodType(),
      value: secondOperand
    },
    operator,
    result
  };
  
  // Gera opções de resposta (incluindo a correta)
  const options: number[] = [result];
  
  // Adiciona duas opções incorretas
  while (options.length < 3) {
    // Gera opções dentro de um intervalo adequado para crianças
    const incorrectOption = getRandomInt(
      Math.max(1, result - 3), // Limite inferior
      result + 3 // Limite superior
    );
    
    // Garante que não haja duplicatas e nem valores negativos
    if (!options.includes(incorrectOption) && incorrectOption >= 0) {
      options.push(incorrectOption);
    }
  }
  
  // Embaralha as opções
  options.sort(() => Math.random() - 0.5);
  
  return { question, options };
};

// Verifica se a resposta está correta
export const checkAnswer = (question: QuestionType | null, answer: number): boolean => {
  if (!question) return false;
  return question.result === answer;
};