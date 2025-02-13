import "../styles/globals.css";
import { AppProps } from "next/app";
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import { ThemeProvider } from '../components/ThemeProvider';
import { Providers } from '../components/Providers';
import { AnimatePresence } from 'framer-motion';
import { ErrorBoundary } from '../components/ErrorBoundary';
import { MDXProvider } from '../components/MDXProvider';

export default function App({ Component, pageProps, router }: AppProps) {
  return (
    <NextThemesProvider 
      attribute="class" 
      defaultTheme="system"
      enableSystem
    >
      <ThemeProvider>
        <Providers>
          <MDXProvider>
            <ErrorBoundary>
              <AnimatePresence mode="wait" initial={false}>
                <Component {...pageProps} key={router.pathname} />
              </AnimatePresence>
            </ErrorBoundary>
          </MDXProvider>
        </Providers>
      </ThemeProvider>
    </NextThemesProvider>
  );
}
