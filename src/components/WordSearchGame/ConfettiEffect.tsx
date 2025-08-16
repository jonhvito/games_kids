import React from "react";
import Confetti from "react-confetti";
import { motion, AnimatePresence } from "framer-motion";

interface ConfettiEffectProps {
  show: boolean;
  durationMs?: number;
  pieces?: number;
}

const ConfettiEffect: React.FC<ConfettiEffectProps> = ({
  show,
  durationMs = 6000,
  pieces = 400,
}) => {
  const [recycle, setRecycle] = React.useState(true);

  React.useEffect(() => {
    if (show) {
      setRecycle(true);
      const timeout = setTimeout(() => setRecycle(false), durationMs);
      return () => clearTimeout(timeout);
    }
  }, [show, durationMs]);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 pointer-events-none z-50"
        >
          <Confetti
            width={window.innerWidth}
            height={window.innerHeight}
            numberOfPieces={pieces}
            recycle={recycle}
            gravity={0.16}
            initialVelocityY={18}
            wind={0.01}
            tweenDuration={10000}
            run={true}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ConfettiEffect;