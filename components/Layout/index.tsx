import { ReactNode } from "react";
import { Header } from "../Header";
import { Footer } from "../Footer";
import { Container } from "../ui/Container";

interface LayoutProps {
  children: ReactNode;
  fullWidth?: boolean;
}

export function Layout({ children, fullWidth = false }: LayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1 pt-16">
        {fullWidth ? (
          children
        ) : (
          <Container size="md" className="py-8 md:py-12">
            {children}
          </Container>
        )}
      </main>
      <Footer />
    </div>
  );
}
