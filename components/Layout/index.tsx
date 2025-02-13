import { ReactNode } from "react";
import { Header } from "../Header";
import { Container } from "../ui/Container";
import { PageTransition } from "../PageTransition";
import { ErrorBoundary } from "../ErrorBoundary";
import { AnimatedBackground } from '../AnimatedBackground'
import { useBackground } from '../../contexts/BackgroundContext'

interface LayoutProps {
  children: ReactNode;
  fullWidth?: boolean;
}

export function Layout({ children, fullWidth = false }: LayoutProps) {
  const { backgroundType } = useBackground()

  return (
    <>
      <AnimatedBackground type={backgroundType} />
      <div className={`min-h-screen ${fullWidth ? '' : 'max-w-4xl mx-auto px-4'}`}>
        <Header />
        <main className="pt-16">
          <ErrorBoundary>
            <PageTransition>
              {fullWidth ? (
                children
              ) : (
                <Container className="py-8 md:py-12">{children}</Container>
              )}
            </PageTransition>
          </ErrorBoundary>
        </main>
      </div>
    </>
  );
}
