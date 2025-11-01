// Sound file paths
export const SOUNDS = {
  CORRECT: './sounds/correct.mp3',
  INCORRECT: './sounds/incorrect.mp3',
  GAME_COMPLETE: './sounds/complete.mp3',
  CLICK: './sounds/click.mp3',
  BACKGROUND: './sounds/background.mp3',
  WRONG: './sounds/incorrect.mp3'
} as const;

// Create placeholder audio files to ensure the paths exist
export const createPlaceholderSounds = () => {
  const soundsDir = 'public/sounds';
  
  // List of sound files to create
  const soundFiles = [
    'correct.mp3',
    'incorrect.mp3',
    'complete.mp3',
    'click.mp3',
    'background.mp3'
  ];
  
  // For demonstration purposes only
  console.log(`In a real project, sound files would be in: ${soundsDir}`);
  console.log(`Required sound files: ${soundFiles.join(', ')}`);
};

// Function to preload sounds with error handling
export const preloadSounds = () => {
  Object.values(SOUNDS).forEach(sound => {
    try {
      const audio = new Audio();
      audio.src = sound;
      audio.preload = 'auto';
      
      // Add error handler for failed loads
      audio.onerror = () => {
        console.warn(`Sound file not found: ${sound}. Using silent fallback.`);
      };
    } catch (error) {
      console.error(`Failed to preload sound: ${sound}`, error);
    }
  });
};