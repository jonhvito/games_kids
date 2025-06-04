import React, { useEffect, useRef } from 'react';

interface SoundEffectProps {
  src: string;
  play: boolean;
  volume?: number;
  loop?: boolean;
  onEnd?: () => void;
}

const SoundEffect: React.FC<SoundEffectProps> = ({ 
  src, 
  play, 
  volume = 0.5, 
  loop = false,
  onEnd
}) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio(src);
      audioRef.current.volume = volume;
      audioRef.current.loop = loop;
      
      // Add error handler for failed loads
      audioRef.current.onerror = () => {
        console.warn(`Sound file not found: ${src}. Using silent fallback.`);
      };
      
      if (onEnd) {
        audioRef.current.addEventListener('ended', onEnd);
      }
    }

    return () => {
      if (audioRef.current && onEnd) {
        audioRef.current.removeEventListener('ended', onEnd);
      }
      audioRef.current?.pause();
      audioRef.current = null;
    };
  }, [src, volume, loop, onEnd]);

  useEffect(() => {
    if (audioRef.current) {
      if (play) {
        // For background music, don't reset to beginning
        if (!loop) {
          audioRef.current.currentTime = 0;
        }
        audioRef.current.play().catch(error => {
          console.warn('Error playing sound, continuing without audio:', error);
        });
      } else {
        audioRef.current.pause();
      }
    }
  }, [play, loop]);

  return null; // This component doesn't render anything visible
};

export default SoundEffect;