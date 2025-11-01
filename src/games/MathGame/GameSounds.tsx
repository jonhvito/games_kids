import React from "react";
import SoundEffect from "../../components/SoundEffect";
import { SOUNDS } from "../../utils/soundUtils";

interface GameSoundsProps {
  playCorrect: boolean;
  playIncorrect: boolean;
  playClick: boolean;
  playComplete: boolean;
  onCorrectEnd: () => void;
  onIncorrectEnd: () => void;
  onClickEnd: () => void;
  onCompleteEnd: () => void;
}

const GameSounds: React.FC<GameSoundsProps> = ({
  playCorrect,
  playIncorrect,
  playClick,
  playComplete,
  onCorrectEnd,
  onIncorrectEnd,
  onClickEnd,
  onCompleteEnd,
}) => {
  return (
    <>
      <SoundEffect
        src={SOUNDS.CORRECT}
        play={playCorrect}
        onEnd={onCorrectEnd}
      />
      <SoundEffect
        src={SOUNDS.WRONG}
        play={playIncorrect}
        onEnd={onIncorrectEnd}
      />
      <SoundEffect
        src={SOUNDS.CLICK}
        play={playClick}
        onEnd={onClickEnd}
      />
      <SoundEffect
        src={SOUNDS.GAME_COMPLETE}
        play={playComplete}
        onEnd={onCompleteEnd}
      />
    </>
  );
};

export default GameSounds;
