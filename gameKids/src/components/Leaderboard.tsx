import React, { useEffect, useState } from "react";

type LeaderboardEntry = {
  game: string;
  score: number;
};

const GAMES = [
  { key: "mathGameHighScore", name: "Jogo de Matemática" },
  { key: "findObjectsHighScore", name: "Ache os Objetos" },
  { key: "wordSearchHighScore", name: "Caça-Palavras" }
];

const Leaderboard: React.FC = () => {
  const [scores, setScores] = useState<LeaderboardEntry[]>([]);

  useEffect(() => {
    const loadedScores = GAMES.map(game => {
      const score = Number(localStorage.getItem(game.key) || 0);
      return { game: game.name, score };
    });
    setScores(loadedScores);
  }, []);

  return (
    <div>
      <h3>Ranking Local</h3>
      <div style={{ overflowX: "auto" }}>
        <table style={{ width: "100%", borderCollapse: "collapse", marginTop: 8, minWidth: 320 }}>
          <thead>
            <tr>
              <th style={{ textAlign: "left", borderBottom: "1px solid #ccc" }}>Jogo</th>
              <th style={{ textAlign: "right", borderBottom: "1px solid #ccc" }}>Melhor Pontuação</th>
            </tr>
          </thead>
          <tbody>
            {scores.map((entry) => (
              <tr key={entry.game}>
                <td style={{ padding: "4px 0" }}>{entry.game}</td>
                <td style={{ textAlign: "right", padding: "4px 0" }}>{entry.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Leaderboard;