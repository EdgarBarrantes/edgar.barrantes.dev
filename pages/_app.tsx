import "../styles/globals.css";
import { AppProps } from "next/app";
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { ThemeProvider } from '../components/ThemeProvider';
import { StrictMode } from 'react'
import { NavigationProvider } from '../components/Navigation/NavigationContext';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <StrictMode>
      <NextThemesProvider attribute="class">
        <ThemeProvider>
          <NavigationProvider>
            <Component {...pageProps} />
          </NavigationProvider>
        </ThemeProvider>
      </NextThemesProvider>
    </StrictMode>
  );
}

export default MyApp;
