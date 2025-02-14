import "../styles/globals.css";
import "/public/styles/github-dark.min.css";
import { AppProps } from "next/app";
import { ThemeProvider } from '../components/ThemeProvider';
import { Providers } from '../components/Providers';
import dynamic from 'next/dynamic';
import { ErrorBoundary } from '../components/ErrorBoundary';
import { MDXProvider } from '../components/MDXProvider';
import { BackgroundProvider } from '../contexts/BackgroundContext';
import { Meta } from '../components/SEO/Meta';

// Dynamically import AnimatePresence to reduce initial bundle size
const AnimatePresence = dynamic(
  () => import('framer-motion').then((mod) => mod.AnimatePresence),
  { ssr: false }
);

export default function App({ Component, pageProps, router }: AppProps) {
  return (
    <ThemeProvider>
      <BackgroundProvider>
        <Providers>
          <MDXProvider>
            <ErrorBoundary>
              <Meta />
              <AnimatePresence mode="wait" initial={false}>
                <Component {...pageProps} key={router.pathname} />
              </AnimatePresence>
            </ErrorBoundary>
          </MDXProvider>
        </Providers>
      </BackgroundProvider>
    </ThemeProvider>
  );
}
