import "../styles/globals.css";
import "/public/styles/github-dark.min.css";
import { AppProps } from "next/app";
import dynamic from 'next/dynamic';
import { ThemeProvider } from '../components/ThemeProvider';
import { Providers } from '../components/Providers';
import { ErrorBoundary } from '../components/ErrorBoundary';

// Dynamically import components that might not be needed immediately
const MDXProvider = dynamic(() => import('../components/MDXProvider').then(mod => mod.MDXProvider), { ssr: true });
const BackgroundProvider = dynamic(() => import('../contexts/BackgroundContext').then(mod => mod.BackgroundProvider), { ssr: true });
const Meta = dynamic(() => import('../components/SEO/Meta').then(mod => mod.Meta), { ssr: true });
const AnimatePresence = dynamic(() => import('framer-motion').then(mod => mod.AnimatePresence), { ssr: false });

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
