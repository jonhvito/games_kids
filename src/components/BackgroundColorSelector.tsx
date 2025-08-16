import React, { useState, useEffect } from "react";

const COLORS = [
  { name: "Azul Claro", value: "#e3f2fd" },
  { name: "Verde Claro", value: "#e8f5e9" },
  { name: "Amarelo Claro", value: "#fffde7" },
  { name: "Rosa Claro", value: "#fce4ec" },
  { name: "Lilás Claro", value: "#ede7f6" },
  { name: "Branco", value: "#ffffff" },
  { name: "Cinza Claro", value: "#f5f5f5" },
  { name: "Ciano Claro", value: "#e0f7fa" },
  { name: "Laranja Claro", value: "#fff3e0" },
  { name: "Pêssego Claro", value: "#ffebee" },
  { name: "Bege Claro", value: "#fff8e1" },
  { name: "Lavanda Claro", value: "#f3e5f5" },
  { name: "Menta Claro", value: "#e0f2f1" },
  { name: "Azul Bebê", value: "#bbdefb" },
  { name: "Verde Menta", value: "#b2dfdb" },
  { name: "Amarelo Pastel", value: "#fff9c4" }
];

type BackgroundColorSelectorProps = {
  onSelect?: (color: string) => void;
};

const BG_COLOR_KEY = "selectedBgColor";

const BackgroundColorSelector: React.FC<BackgroundColorSelectorProps> = ({ onSelect }) => {
  const [selected, setSelected] = useState<string>(() => {
    return localStorage.getItem(BG_COLOR_KEY) || COLORS[0].value;
  });

  useEffect(() => {
    document.body.style.background = selected;
    localStorage.setItem(BG_COLOR_KEY, selected);
    if (onSelect) onSelect(selected);
    return () => {
      document.body.style.background = "";
    };
  }, [selected, onSelect]);

  return (
    <div style={{ width: "100%" }}>
      <h3 style={{
        fontSize: "1.1rem",
        marginBottom: 12,
        textAlign: "center",
        fontWeight: 600
      }}>
        Escolha a cor de fundo:
      </h3>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(40px, 1fr))",
          gap: 16,
          justifyItems: "center",
          marginBottom: 8,
          width: "100%"
        }}
      >
        {COLORS.map((color) => (
          <button
            key={color.value}
            aria-label={`Selecionar cor ${color.name}`}
            onClick={() => setSelected(color.value)}
            style={{
              width: 40,
              height: 40,
              borderRadius: "50%",
              border: selected === color.value ? "3px solid #007bff" : "1px solid #ccc",
              background: color.value,
              cursor: "pointer",
              transition: "border 0.2s",
              outline: "none",
              boxShadow: selected === color.value ? "0 0 0 2px #90caf9" : "none"
            }}
            title={color.name}
          />
        ))}
      </div>
      <div style={{
        marginTop: 12,
        textAlign: "center",
        fontSize: "1rem"
      }}>
        <strong>Cor escolhida: </strong>
        <span style={{
          display: "inline-block",
          width: 32,
          height: 32,
          borderRadius: "50%",
          background: selected,
          border: "1px solid #ccc",
          verticalAlign: "middle",
          marginLeft: 8
        }} />
      </div>
    </div>
  );
};

export default BackgroundColorSelector; 