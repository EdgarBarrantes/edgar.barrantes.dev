import Head from "next/head";
import { useRouter } from "next/router";
import { ReactNode, useState } from "react";

import BackButton from "../BackButton";
import Navigation from "../Nav/Navigation";
import NavigationToggle from "../Nav/NavigationToggle";

interface LayoutProps {
  children: ReactNode;
  shouldNavigationBeToggable?: boolean;
}

const Layout = ({
  shouldNavigationBeToggable = true,
  children,
}: LayoutProps) => {
  const [isNavigationOpen, setIsNavigationOpen] = useState(false);
  const router = useRouter();
  return (
    <main
      className={`relative transition-colors p-0 flex flex-col justify-center items-center w-screen min-h-screen overflow-x-hidden bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-50 font-main`}
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
        </div>
      )}

      <div
        className={`absolute right-0 left-0 top-0 flex flex-col justify-center items-center 
        min-h-screen pt-20 sm:pt-0 ${
          isNavigationOpen ? "opacity-100 z-20" : "opacity-0 z-10"
        }`}
      >
        <div className={`sm:px-2`}>
          <Navigation toggleNavigation={setIsNavigationOpen} />
        </div>
      </div>
      <div
        className={`flex flex-col justify-center items-center min-h-screen max-w-4xl py-32 sm:py-48 ${
          !isNavigationOpen ? "opacity-100 z-20" : "opacity-0 z-10"
        }`}
      >
        {router.pathname !== "/" && (
          <div className="w-full">
            <div className="absolute top-4 sm:top-8 right-16 sm:right-28 z-30">
              <div className="flex">
                <BackButton router={router} />
              </div>
            </div>
          </div>
        )}
        <div className={`mx-4`}>{children}</div>
      </div>
    </main>
  );
};

export default Layout;
