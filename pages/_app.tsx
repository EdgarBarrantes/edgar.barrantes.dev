import "../styles/globals.css";
import "../styles/highlight.css";
import type { AppProps } from "next/app";
import { Schibsted_Grotesk, Source_Serif_4 } from "next/font/google";
import { ThemeProvider } from "../components/ThemeProvider";
import { ErrorBoundary } from "../components/ErrorBoundary";

// Grotesk for names, headings and small data; serif for anything read at length.
const grotesk = Schibsted_Grotesk({ subsets: ["latin"], display: "swap" });
const serif = Source_Serif_4({ subsets: ["latin"], style: ["normal", "italic"], display: "swap" });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <style jsx global>{`
        :root {
          --font-sans: ${grotesk.style.fontFamily};
          --font-serif: ${serif.style.fontFamily};
        }
      `}</style>
      <ErrorBoundary>
        <Component {...pageProps} />
      </ErrorBoundary>
    </ThemeProvider>
  );
}
