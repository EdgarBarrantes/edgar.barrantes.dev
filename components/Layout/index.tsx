import { ReactNode, useState } from "react";

import Navigation from "../Nav/Navigation";
import NavigationToggle from "../Nav/NavigationToggle";
import NavigationHome from "../Nav/NavigationHome";

interface LayoutProps {
  children: ReactNode;
  shouldNavigationBeToggable?: boolean;
}

const Layout = ({
  shouldNavigationBeToggable = true,
  children,
}: LayoutProps) => {
  const [isNavigationOpen, setIsNavigationOpen] = useState(false);

  return (
    <main
      className={`transition-colors p-0 flex flex-col justify-center items-center min-h-screen min-w-screen bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-50 font-main`}
    >
      {shouldNavigationBeToggable && (
        <div className="w-full">
          <div className="absolute top-4 right-8 z-20">
            <div className="flex">
              <NavigationToggle
                isNavigationOpen={isNavigationOpen}
                setIsNavigationOpen={setIsNavigationOpen}
              />
            </div>
          </div>
          <div className="absolute top-4 left-8 z-20">
            <div className="flex">
              <NavigationHome />
            </div>
          </div>
        </div>
      )}

      <div className="absolute top-0 flex flex-col justify-center items-center min-h-screen pt-24 sm:pt-0">
        <div
          className={`sm:px-2 transition-opacity duration-300 ${
            isNavigationOpen ? "opacity-100 z-20" : "opacity-0 z-0"
          }`}
        >
          <Navigation />
        </div>
      </div>
      <div className={`flex flex-col justify-center items-center min-h-screen`}>
        <div
          className={`transition-opacity duration-300 ${
            !isNavigationOpen ? "opacity-100 z-20" : "opacity-0 z-0"
          }`}
        >
          {children}
        </div>
      </div>
    </main>
  );
};

export default Layout;
