// Theme system com cores dinâmicas para cada jogo
export const gameThemes = {
  default: {
    primary: '#3B82F6', // blue-500
    secondary: '#8B5CF6', // violet-500
    accent: '#F59E0B', // amber-500
    lightGradient: 'linear-gradient(135deg, #dbeafe 0%, #e0e7ff 50%, #faf5ff 100%)', // blue-50 to violet-50
    darkGradient: 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)', // slate-800 to slate-900
  },
  math: {
    primary: '#10B981', // emerald-500
    secondary: '#059669', // emerald-600
    accent: '#34D399', // emerald-400
    lightGradient: 'linear-gradient(135deg, #ecfdf5 0%, #f0fdfa 50%, #e6fffa 100%)', // emerald-50 to cyan-50
    darkGradient: 'linear-gradient(135deg, #064e3b 0%, #1e293b 100%)', // emerald-900 to slate-900
  },
  'find-objects': {
    primary: '#F59E0B', // amber-500
    secondary: '#D97706', // amber-600
    accent: '#FCD34D', // amber-300
    lightGradient: 'linear-gradient(135deg, #fffbeb 0%, #fef3c7 50%, #fefce8 100%)', // amber-50 to yellow-50
    darkGradient: 'linear-gradient(135deg, #78350f 0%, #1e293b 100%)', // amber-900 to slate-900
  },
  'word-search': {
    primary: '#8B5CF6', // violet-500
    secondary: '#7C3AED', // violet-600
    accent: '#A78BFA', // violet-400
    lightGradient: 'linear-gradient(135deg, #f5f3ff 0%, #faf5ff 50%, #fdf2f8 100%)', // violet-50 to pink-50
    darkGradient: 'linear-gradient(135deg, #581c87 0%, #1e293b 100%)', // violet-900 to slate-900
  },
};

export type GameTheme = keyof typeof gameThemes;

export const getCurrentGameFromPath = (pathname: string): GameTheme => {
  if (pathname.includes('/math')) return 'math';
  if (pathname.includes('/find-objects')) return 'find-objects';
  if (pathname.includes('/word-search')) return 'word-search';
  return 'default';
};

export const applyGameTheme = (theme: GameTheme, darkMode: boolean) => {
  const colors = gameThemes[theme];
  const body = document.body;
  
  // Aplicar gradiente de fundo
  body.style.background = darkMode ? colors.darkGradient : colors.lightGradient;
  body.style.transition = 'background 1s ease-in-out';
  
  // Aplicar CSS custom properties para uso futuro
  const root = document.documentElement;
  root.style.setProperty('--theme-primary', colors.primary);
  root.style.setProperty('--theme-secondary', colors.secondary);
  root.style.setProperty('--theme-accent', colors.accent);
};
