import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useNavigation } from "../Navigation/NavigationContext";
import Navigation from "../Navigation";
import NavigationToggle from "../Navigation/NavigationToggle";

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const { isOpen, close } = useNavigation();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="relative min-h-screen">
      {/* Main content */}
      <main className="relative min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 dark:from-slate-900 dark:to-indigo-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Page content */}
          <div className="pt-16 pb-20">
            {children}
          </div>
        </div>
      </main>

      {/* Navigation overlay and menu */}
      {mounted && isOpen && (
        <>
          <div 
            className="fixed inset-0 bg-slate-900/90 backdrop-blur-sm z-40"
            onClick={close}
            aria-hidden="true"
          />
          <Navigation />
        </>
      )}

      {/* Navigation toggle - moved outside the main content to always be on top */}
      <div className="fixed top-4 right-4 z-[60]">
        {mounted && <NavigationToggle />}
      </div>
    </div>
  );
};

export default Layout;
