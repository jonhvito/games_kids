import React, { useState, useEffect } from "react";

const AVATARS = [
  "🦁", "🐼", "🐸", "🐵", "🐱", "🐶", "🦊", "🐰", "🐻", "🐨"
];

type AvatarSelectorProps = {
  onSelect?: (avatar: string) => void;
};

const AVATAR_KEY = "selectedAvatar";

const AvatarSelector: React.FC<AvatarSelectorProps> = ({ onSelect }) => {
  const [selected, setSelected] = useState<string>(() => {
    return localStorage.getItem(AVATAR_KEY) || AVATARS[0];
  });

  useEffect(() => {
    localStorage.setItem(AVATAR_KEY, selected);
    if (onSelect) onSelect(selected);
  }, [selected, onSelect]);

  return (
    <div style={{ width: "100%" }}>
      <h3 style={{
        fontSize: "1.1rem",
        marginBottom: 12,
        textAlign: "center",
        fontWeight: 600
      }}>
        Escolha seu avatar:
      </h3>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(48px, 1fr))",
          gap: 12,
          justifyItems: "center",
          marginBottom: 8,
          width: "100%"
        }}
      >
        {AVATARS.map((avatar) => (
          <button
            key={avatar}
            aria-label={`Selecionar avatar ${avatar}`}
            onClick={() => setSelected(avatar)}
            style={{
              fontSize: 32,
              padding: 8,
              borderRadius: "50%",
              border: selected === avatar ? "3px solid #007bff" : "1px solid #ccc",
              background: selected === avatar ? "#e3f2fd" : "#fff",
              cursor: "pointer",
              transition: "border 0.2s, background 0.2s",
              outline: "none",
              width: 48,
              height: 48,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: selected === avatar ? "0 0 0 2px #90caf9" : "none"
            }}
          >
            {avatar}
          </button>
        ))}
      </div>
      <div style={{
        marginTop: 12,
        textAlign: "center",
        fontSize: "1rem"
      }}>
        <strong>Avatar escolhido: </strong>
        <span style={{ fontSize: 32 }}>{selected}</span>
      </div>
    </div>
  );
};

export default AvatarSelector;