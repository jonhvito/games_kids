import React from "react";
import SoundEffect from "../SoundEffect";
import { SOUNDS } from "../../utils/soundUtils";

interface GameSoundsProps {
  soundEnabled: boolean;
  playClick: boolean;
  playCorrect: boolean;
  playIncorrect: boolean;
  playComplete: boolean;
  onClickEnd: () => void;
  onCorrectEnd: () => void;
  onIncorrectEnd: () => void;
  onCompleteEnd: () => void;
}

const GameSounds: React.FC<GameSoundsProps> = ({
  soundEnabled,
  playClick,
  playCorrect,
  playIncorrect,
  playComplete,
  onClickEnd,
  onCorrectEnd,
  onIncorrectEnd,
  onCompleteEnd,
}) => {
  if (!soundEnabled) return null;

  return (
    <>
      <SoundEffect
        src={SOUNDS.CLICK}
        play={playClick}
        onEnd={onClickEnd}
        volume={0.5}
      />
      <SoundEffect
        src={SOUNDS.CORRECT}
        play={playCorrect}
        onEnd={onCorrectEnd}
        volume={0.7}
      />
      <SoundEffect
        src={SOUNDS.INCORRECT}
        play={playIncorrect}
        onEnd={onIncorrectEnd}
        volume={0.7}
      />
      <SoundEffect
        src={SOUNDS.GAME_COMPLETE}
        play={playComplete}
        onEnd={onCompleteEnd}
        volume={0.8}
      />
    </>
  );
};

export default GameSounds;