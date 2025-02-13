import { createContext, useContext, ReactNode } from 'react';
import { useTheme } from 'next-themes';
import { tokens } from '@/styles/design-tokens';

interface ThemeContextType {
  theme: typeof tokens;
  isDark: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: tokens,
  isDark: false,
  toggleTheme: () => null,
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const { theme: colorMode, setTheme } = useTheme();
  const isDark = colorMode === 'dark';

  const toggleTheme = () => setTheme(isDark ? 'light' : 'dark');

  const value = {
    theme: tokens,
    isDark,
    toggleTheme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useAppTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useAppTheme must be used within ThemeProvider');
  }
  return context;
}; 