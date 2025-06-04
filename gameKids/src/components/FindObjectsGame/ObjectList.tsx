import React from "react";
import { motion } from "framer-motion"; // Para animações
import { CheckCircle2 } from "lucide-react"; // Ícone para itens encontrados
import { FoodObject } from "../../games/FindObjectsGame/findObjectsUtils";

interface ObjectListProps {
  objects: FoodObject[];
  foundObjects: string[];
  hintedId: string | null;
  roundId: number; 
}

const ObjectList: React.FC<ObjectListProps> = ({
  objects,
  foundObjects,
  hintedId,
  roundId,
}) => {
  return (
    <div 
      className="flex flex-nowrap sm:flex-wrap justify-start sm:justify-center 
                 gap-2 mb-4 py-2 px-1 
                 overflow-x-auto no-scrollbar sm:overflow-visible"
      // A classe 'no-scrollbar' (definida no seu index.css) esconde a barra de rolagem no mobile
    >
      {objects.map((obj, index) => {
        const isFound = foundObjects.includes(obj.id);
        // Garante que só mostra a dica se hintedId !== null e for igual ao id e não foi encontrado
        const isHinted = hintedId !== null && hintedId === obj.id && !isFound;

        // Define as classes de estilo baseadas no estado do objeto
        let itemClasses = `
          bg-gray-100 dark:bg-slate-700 
          text-gray-700 dark:text-slate-300 
          hover:bg-gray-200 dark:hover:bg-slate-600
        `;
        if (isFound) {
          itemClasses = `
            bg-green-100 dark:bg-green-800/60 
            text-green-700 dark:text-green-300 
            line-through scale-95 opacity-70 cursor-default
          `;
        } else if (isHinted) {
          itemClasses = `
            bg-yellow-100 dark:bg-yellow-500/40 
            text-yellow-800 dark:text-yellow-200 
            ring-2 ring-yellow-400 dark:ring-yellow-500 
            scale-105 shadow-lg
          `;
        }

        return (
          <motion.div
            key={`${roundId}-${obj.id}`} 
            layout 
            initial={{ opacity: 0, y: 10, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ 
              duration: 0.3, 
              delay: index * 0.03, // Efeito cascata sutil na entrada
              ease: "easeOut" 
            }}
            className={`
              px-3.5 py-1.5 rounded-full 
              text-xs sm:text-sm font-comic font-semibold 
              transition-all duration-200 shadow-sm 
              flex items-center justify-center gap-1.5 
              min-w-[4rem] sm:min-w-[4.5rem] text-center whitespace-nowrap
              ${itemClasses}
            `}
          >
            {isFound && <CheckCircle2 size={14} className="flex-shrink-0 opacity-80" />}
            <span className={isFound ? "opacity-80" : ""}>{obj.name}</span>
          </motion.div>
        );
      })}
    </div>
  );
};

export default ObjectList;