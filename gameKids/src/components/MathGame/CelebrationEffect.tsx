import React from "react";
import Confetti from "react-confetti";

interface CelebrationEffectProps {
  type?: "confetti" | "stars";
  className?: string;
}

const DURATION = 3500; // duração em ms

const CelebrationEffect: React.FC<CelebrationEffectProps> = ({
  type = "confetti",
  className = "",
}) => {
  const [recycle, setRecycle] = React.useState(true);

  React.useEffect(() => {
    if (type === "confetti") {
      setRecycle(true);
      const timeout = setTimeout(() => setRecycle(false), DURATION);
      return () => clearTimeout(timeout);
    }
  }, [type]);

  if (type === "stars") {
    return (
      <div className={`pointer-events-none fixed inset-0 flex items-center justify-center z-50 animate-fade-in ${className}`}>
        <svg width="220" height="140">
          <g>
            <polygon points="10,40 20,15 30,40 5,25 35,25" fill="#facc15">
              <animate attributeName="opacity" values="1;0.3;1" dur="1.2s" repeatCount="indefinite" />
            </polygon>
            <polygon points="60,30 65,10 70,30 55,20 75,20" fill="#38bdf8">
              <animate attributeName="opacity" values="1;0.3;1" dur="1.1s" repeatCount="indefinite" />
            </polygon>
            <polygon points="120,50 125,30 130,50 115,40 135,40" fill="#f472b6">
              <animate attributeName="opacity" values="1;0.3;1" dur="1.3s" repeatCount="indefinite" />
            </polygon>
            <polygon points="180,40 185,20 190,40 175,30 195,30" fill="#a78bfa">
              <animate attributeName="opacity" values="1;0.3;1" dur="1.25s" repeatCount="indefinite" />
            </polygon>
            <polygon points="90,100 95,80 100,100 85,90 105,90" fill="#34d399">
              <animate attributeName="opacity" values="1;0.3;1" dur="1.05s" repeatCount="indefinite" />
            </polygon>
          </g>
        </svg>
      </div>
    );
  }

  // Confetti animado e mais duradouro
  return (
    <div className={`pointer-events-none fixed inset-0 z-50 animate-fade-in ${className}`}>
      <Confetti
        width={window.innerWidth}
        height={window.innerHeight}
        numberOfPieces={350}
        recycle={recycle}
        gravity={0.18}
        initialVelocityY={18}
        wind={0.01}
        tweenDuration={8000}
        run={true}
      />
    </div>
  );
};

export default CelebrationEffect;