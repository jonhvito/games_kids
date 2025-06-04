// Word structure
export interface Word {
  text: string;
  row: number;
  col: number;
  direction: Direction;
}

export type Direction = 'horizontal' | 'vertical' | 'diagonal-down' | 'diagonal-up';

export const DEFAULT_GRID_SIZE = 8;

export const foodWords = [
  'BANANA', 'MAÇÃ', 'UVA', 'PERA', 'LIMÃO', 'ABACATE', 'MELANCIA', 'KIWI', 'ABACAXI', 'MANGA',
  'PIZZA', 'BOLO', 'SOPA', 'PEIXE', 'ALFACE', 'MORANGO', 'CENOURA', 'MELÃO', 'PÃO', 'BISCOITO',
  'TOMATE', 'MILHO', 'COCO', 'PIMENTA', 'BATATA', 'FRANGO', 'CARNE', 'ARROZ', 'FEIJÃO', 'LEITE',
  'OVO', 'QUEIJO', 'IOGURTE', 'SORVETE', 'CHOCOLATE', 'CAFÉ', 'SUCO', 'ÁGUA', 'MANTEIGA', 'AZEITE'
];

// Gera o caça-palavras
export const generateWordSearch = (gridSize: number = DEFAULT_GRID_SIZE) => {
  const grid: string[][] = Array(gridSize).fill(null).map(() =>
    Array(gridSize).fill('')
  );

  const shuffledWords = [...foodWords].sort(() => Math.random() - 0.5);
  const selectedWords = shuffledWords.slice(0, 5 + Math.floor(Math.random() * 3));

  const placedWords: Word[] = [];

  selectedWords.forEach(word => {
    const result = placeWord(grid, word);
    if (result) placedWords.push(result);
  });

  fillEmptyCells(grid);

  return { grid, words: placedWords, gridSize: grid.length };
};

// Tenta posicionar a palavra no grid em todas as direções possíveis
const placeWord = (grid: string[][], word: string): Word | null => {
  const directions: Direction[] = ['horizontal', 'vertical', 'diagonal-down', 'diagonal-up'];
  const shuffledDirections = [...directions].sort(() => Math.random() - 0.5);

  for (const direction of shuffledDirections) {
    for (let attempt = 0; attempt < 10; attempt++) {
      const result = tryPlaceWord(grid, word, direction);
      if (result) return result;
    }
  }

  return null;
};

// Tenta posicionar a palavra em uma direção específica
const tryPlaceWord = (grid: string[][], word: string, direction: Direction): Word | null => {
  const rows = grid.length;
  const cols = grid[0].length;

  let maxRow, maxCol;

  switch (direction) {
    case 'horizontal':
      maxRow = rows - 1;
      maxCol = cols - word.length;
      break;
    case 'vertical':
      maxRow = rows - word.length;
      maxCol = cols - 1;
      break;
    case 'diagonal-down':
      maxRow = rows - word.length;
      maxCol = cols - word.length;
      break;
    case 'diagonal-up':
      maxRow = word.length - 1;
      maxCol = cols - word.length;
      break;
    default:
      maxRow = maxCol = 0;
  }

  if (maxRow < 0 || maxCol < 0) return null;

  const row = Math.floor(Math.random() * (maxRow + 1));
  const col = Math.floor(Math.random() * (maxCol + 1));

  let fits = true;

  for (let i = 0; i < word.length; i++) {
    let r, c;

    switch (direction) {
      case 'horizontal':
        r = row;
        c = col + i;
        break;
      case 'vertical':
        r = row + i;
        c = col;
        break;
      case 'diagonal-down':
        r = row + i;
        c = col + i;
        break;
      case 'diagonal-up':
        r = row + (word.length - 1 - i);
        c = col + i;
        break;
      default:
        r = c = 0;
    }

    if (r < 0 || r >= rows || c < 0 || c >= cols) {
      fits = false;
      break;
    }

    if (grid[r][c] !== '' && grid[r][c] !== word[i]) {
      fits = false;
      break;
    }
  }

  if (fits) {
    for (let i = 0; i < word.length; i++) {
      let r, c;
      switch (direction) {
        case 'horizontal':
          r = row;
          c = col + i;
          break;
        case 'vertical':
          r = row + i;
          c = col;
          break;
        case 'diagonal-down':
          r = row + i;
          c = col + i;
          break;
        case 'diagonal-up':
          r = row + (word.length - 1 - i);
          c = col + i;
          break;
        default:
          r = c = 0;
      }
      grid[r][c] = word[i];
    }

    return {
      text: word,
      row,
      col,
      direction,
    };
  }

  return null;
};

// Preenche as células vazias do grid com letras aleatórias
const fillEmptyCells = (grid: string[][]) => {
  const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZÁÃÂÉÊÍÓÕÔÚÇ';

  for (let r = 0; r < grid.length; r++) {
    for (let c = 0; c < grid[0].length; c++) {
      if (grid[r][c] === '') {
        const randomIndex = Math.floor(Math.random() * letters.length);
        grid[r][c] = letters[randomIndex];
      }
    }
  }
};