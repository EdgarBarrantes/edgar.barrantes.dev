import { useRouter } from "next/router";
import Link from "next/link";
import { useRef } from "react";
import { useNavigation } from "./NavigationContext";
import ModeToggle from "../ColorModeToggle";
import Social from "../Social";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const Navigation = () => {
  const { close } = useNavigation();
  const router = useRouter();
  const navigationRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  // Handle mounting state to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  const navItems = [
    { href: "/", text: "Home" },
    { href: "/resume", text: "Resume" },
    { href: "/thoughts", text: "Thoughts" },
    { href: "/til", text: "TIL" },
    { href: "/projects", text: "Projects" },
  ];

  if (!mounted) {
    return null;
  }

  return (
    <nav className="fixed inset-0 flex items-center justify-center p-4 z-50">
      <div 
        ref={navigationRef}
        className="relative max-w-2xl w-full mx-auto bg-white/90 dark:bg-slate-800/90 backdrop-blur-lg rounded-2xl p-8 shadow-xl"
      >
        {/* Navigation links */}
        <div className="grid grid-cols-2 gap-4 mb-12">
          {navItems.map(({ href, text }) => (
            <Link
              key={href}
              href={href}
              className={`p-6 text-xl font-medium text-center rounded-xl transition-all
                ${router.pathname === href 
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/25' 
                  : 'text-slate-800 dark:text-white hover:bg-slate-100 dark:hover:bg-white/10'
                }
                hover:scale-105 hover:shadow-lg`}
              onClick={close}
            >
              {text}
            </Link>
          ))}
        </div>

        {/* Social links */}
        <div className="mb-8">
          <Social />
        </div>

        {/* Theme toggle */}
        <div className="flex justify-end px-4">
          <ModeToggle />
        </div>
      </div>
    </nav>
  );
};

export default Navigation; 