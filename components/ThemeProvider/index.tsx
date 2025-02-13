import { createContext, useContext, useEffect, useState } from 'react';
import { useTheme } from 'next-themes';

type Theme = 'light' | 'dark' | 'system';

interface ThemeContextValue {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  resolvedTheme: string;
  mounted: boolean;
}

const ThemeContext = createContext<ThemeContextValue>({
  theme: 'system',
  setTheme: () => null,
  resolvedTheme: 'light',
  mounted: false
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme, resolvedTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <ThemeContext.Provider 
      value={{ 
        theme: theme as Theme, 
        setTheme, 
        resolvedTheme: resolvedTheme || 'light',
        mounted 
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export const useAppTheme = () => useContext(ThemeContext); 