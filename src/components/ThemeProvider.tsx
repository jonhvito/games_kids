import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getCurrentGameFromPath, applyGameTheme } from '../utils/themeUtils';

interface ThemeProviderProps {
  children: React.ReactNode;
  darkMode: boolean;
}

const ThemeProvider: React.FC<ThemeProviderProps> = ({ children, darkMode }) => {
  const location = useLocation();

  useEffect(() => {
    const currentGame = getCurrentGameFromPath(location.pathname);
    applyGameTheme(currentGame, darkMode);
  }, [location.pathname, darkMode]);

  return <>{children}</>;
};

export default ThemeProvider;
