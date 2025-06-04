// Estrutura do objeto de alimento
export interface FoodObject {
  id: string;
  name: string;
  left: number;  // Posição a partir da esquerda (porcentagem) - VOCÊ PRECISA AJUSTAR
  top: number;   // Posição a partir do topo (porcentagem) - VOCÊ PRECISA AJUSTAR
}


export const foodObjects: FoodObject[] = [
  { id: 'apple', name: 'Maçã', left: 25, top: 45 },     // Exemplo de valor ajustado
  { id: 'banana', name: 'Banana', left: 70, top: 60 },    // Exemplo de valor ajustado
  { id: 'orange', name: 'Laranja', left: 40, top: 70 },   // Exemplo de valor ajustado
  { id: 'strawberry', name: 'Morango', left: 30, top: 55 }, // Exemplo de valor ajustado
  { id: 'carrot', name: 'Cenoura', left: 75, top: 40 },   // Exemplo de valor ajustado
  { id: 'broccoli', name: 'Brócolis', left: 60, top: 30 }, // Exemplo de valor ajustado
  { id: 'tomato', name: 'Tomate', left: 45, top: 40 },    // Exemplo de valor ajustado
  { id: 'corn', name: 'Milho', left: 50, top: 58 },     // Exemplo de valor ajustado
  { id: 'cucumber', name: 'Pepino', left: 28, top: 75 },  // Exemplo de valor ajustado
  { id: 'pear', name: 'Pera', left: 65, top: 78 },     // Exemplo de valor ajustado
  { id: 'grape', name: 'Uva', left: 35, top: 65 },     // Exemplo de valor ajustado
  { id: 'pineapple', name: 'Abacaxi', left: 55, top: 70 }, // Exemplo de valor ajustado
  { id: 'watermelon', name: 'Melancia', left: 70, top: 35 },// Exemplo de valor ajustado
  { id: 'kiwi', name: 'Kiwi', left: 48, top: 52 },      // Exemplo de valor ajustado
  { id: 'peach', name: 'Pêssego', left: 33, top: 48 },   // Exemplo de valor ajustado
  { id: 'blueberry', name: 'Mirtilo', left: 68, top: 68 },// Exemplo de valor ajustado
  { id: 'plum', name: 'Ameixa', left: 80, top: 45 },      // Exemplo de valor ajustado (e readicionado)
  { id: 'cherry', name: 'Cereja', left: 52, top: 30 },    // Exemplo de valor ajustado
];

/**
 * Calcula a porcentagem de progresso.
 * @param found - Número de itens encontrados.
 * @param total - Número total de itens.
 * @returns A porcentagem de progresso (0-100). Retorna 0 se o total for 0.
 */
export const calculateProgress = (found: number, total: number): number => {
  if (total === 0) {
    return 0;
  }
  if (found < 0 || total < 0) {
    return 0; 
  }
  const validFound = Math.min(found, total); 
  return Math.round((validFound / total) * 100);
};