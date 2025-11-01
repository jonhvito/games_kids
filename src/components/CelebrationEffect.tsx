import React from "react";
import Confetti from "react-confetti";

interface CelebrationEffectProps {
  type?: 'confetti' | 'stars';
}

const CelebrationEffect: React.FC<CelebrationEffectProps> = ({ type = 'confetti' }) => {
  if (type === 'confetti') {
    return (
      <div className="fixed inset-0 pointer-events-none z-50">
        <Confetti
          width={window.innerWidth}
          height={window.innerHeight}
          numberOfPieces={300}
          recycle={false}
          gravity={0.15}
          initialVelocityY={15}
          tweenDuration={5000}
        />
      </div>
    );
  }

  return (
    <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center">
      <div className="text-8xl animate-bounce">⭐</div>
    </div>
  );
};

export default CelebrationEffect;
