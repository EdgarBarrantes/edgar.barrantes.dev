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
      className={`relative transition-colors p-0 flex flex-col justify-center items-center w-screen min-h-screen bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-50 font-main`}
    >
      {shouldNavigationBeToggable && (
        <div className="w-full">
          <div className="absolute top-0 sm:top-4 -right-0 sm:right-8 z-30">
            <div className="flex">
              <NavigationToggle
                isNavigationOpen={isNavigationOpen}
                setIsNavigationOpen={setIsNavigationOpen}
              />
            </div>
          </div>
          <div className="absolute top-0 sm:top-4 left-0 sm:left-8 z-30">
            <div className="flex">
              <NavigationHome />
            </div>
          </div>
        </div>
      )}

      <div
        className={`absolute right-0 left-0 top-0 flex flex-col justify-center items-center 
        min-h-screen pt-20 ${
          isNavigationOpen ? "opacity-100 z-20" : "opacity-0 z-10"
        }`}
      >
        <div className={`sm:px-2`}>
          <Navigation />
        </div>
      </div>
      <div
        className={`flex flex-col justify-center items-center min-h-screen max-w-4xl py-32 sm:py-48 ${
          !isNavigationOpen ? "opacity-100 z-20" : "opacity-0 z-10"
        }`}
      >
        <div className={`mx-4`}>{children}</div>
      </div>
    </main>
  );
};

export default Layout;
