import React from "react";
import "./WordSearchGrid.css"; 

interface WordSearchGridProps {
  grid: string[][];
  selectedCells: number[][];
  onCellMouseDown: (row: number, col: number) => void;
  onCellMouseEnter: (row: number, col: number) => void;
  onCellMouseUp: () => void;
  hintedCell: number[] | null;
}

const WordSearchGrid: React.FC<WordSearchGridProps> = ({
  grid,
  selectedCells,
  onCellMouseDown,
  onCellMouseEnter,
  onCellMouseUp,
  hintedCell,
}) => {
  const isCellSelected = (row: number, col: number): boolean =>
    selectedCells.some(([r, c]) => r === row && c === col);

  const isHinted = (row: number, col: number): boolean =>
    hintedCell?.[0] === row && hintedCell?.[1] === col;

  const [hoveredCell, setHoveredCell] = React.useState<[number, number] | null>(
    null
  );

  // Touch move para seleção em dispositivos móveis
  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    const touch = e.touches[0];
    const element = document.elementFromPoint(touch.clientX, touch.clientY);

    const match = element?.className.match(/cell-(\d+)-(\d+)/);
    if (match) {
      const row = parseInt(match[1]);
      const col = parseInt(match[2]);
      onCellMouseEnter(row, col);
    }
  };

  const columns = grid[0]?.length || 0;

  return (
    <div
      className="bg-purple-50 p-2 sm:p-4 rounded-xl overflow-hidden"
      onMouseLeave={onCellMouseUp}
    >
      <div
        className="grid gap-1 select-none touch-none"
        style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}
        onTouchMove={handleTouchMove}
      >
        {grid.map((row, rowIndex) =>
          row.map((letter, colIndex) => {
            const selected = isCellSelected(rowIndex, colIndex);
            const hinted = isHinted(rowIndex, colIndex);
            const hovered =
              hoveredCell &&
              hoveredCell[0] === rowIndex &&
              hoveredCell[1] === colIndex;

            // Responsividade: fonte e padding adaptativos, área de toque confortável
            let cellClass = `
              cell-${rowIndex}-${colIndex} 
              aspect-square flex items-center justify-center 
              p-2 sm:p-3 rounded-md text-base sm:text-xl font-bold 
              cursor-pointer select-none transition-all duration-200
              min-w-10 min-h-10 sm:min-w-12 sm:min-h-12
            `;

            if (selected) {
              cellClass += " wordsearch-selected";
            } else if (hinted) {
              cellClass += " border-2 border-yellow-400 bg-yellow-100 text-yellow-800 animate-bounce z-10";
            } else if (hovered) {
              cellClass += " border-2 border-purple-300 bg-ws-hover z-0";
            } else {
              cellClass += " bg-white text-gray-800 hover:bg-ws-hover z-0";
            }

            return (
              <div
                key={`${rowIndex}-${colIndex}`}
                className={cellClass}
                onMouseDown={() => onCellMouseDown(rowIndex, colIndex)}
                onMouseEnter={() => {
                  setHoveredCell([rowIndex, colIndex]);
                  onCellMouseEnter(rowIndex, colIndex);
                }}
                onMouseLeave={() => setHoveredCell(null)}
                onMouseUp={onCellMouseUp}
                onTouchStart={() => onCellMouseDown(rowIndex, colIndex)}
                onTouchEnd={onCellMouseUp}
                tabIndex={0}
                aria-label={`Letra ${letter}`}
                role="button"
              >
                {letter}
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default WordSearchGrid;