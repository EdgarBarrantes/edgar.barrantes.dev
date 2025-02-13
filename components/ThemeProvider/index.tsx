import { ThemeProvider as NextThemesProvider } from 'next-themes'
import type { ComponentProps } from 'react'

// This script runs immediately before React hydration
const themeScript = `
  let isDark;
  const stored = localStorage.getItem('theme');
  
  if (stored === 'dark') {
    isDark = true;
  } else if (stored === 'light') {
    isDark = false;
  } else {
    isDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  }
  
  if (isDark) {
    document.documentElement.classList.add('dark');
  }
  
  // Avoid white flash
  document.documentElement.style.colorScheme = isDark ? 'dark' : 'light';

  // Create a temporary background element
  const tempBackground = document.createElement('div');
  tempBackground.setAttribute('id', 'theme-temp-background');
  tempBackground.style.position = 'fixed';
  tempBackground.style.inset = '0';
  tempBackground.style.backgroundColor = isDark ? 'rgb(9, 9, 11)' : 'white';
  tempBackground.style.transition = 'opacity 0.3s ease-in-out';
  tempBackground.style.zIndex = '-10';
  document.body.appendChild(tempBackground);

  // Remove the temporary background once the actual background is ready
  const observer = new MutationObserver((mutations, obs) => {
    const hasBackground = document.querySelector('canvas') || 
                         document.querySelector('.fixed[aria-hidden="true"]');
    
    if (hasBackground) {
      obs.disconnect();
      tempBackground.style.opacity = '0';
      setTimeout(() => tempBackground.remove(), 300);
    }
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });

  // Ensure cleanup after 2s even if no background is found
  setTimeout(() => {
    observer.disconnect();
    if (tempBackground && tempBackground.parentElement) {
      tempBackground.style.opacity = '0';
      setTimeout(() => tempBackground.remove(), 300);
    }
  }, 2000);
`

type ThemeProviderProps = ComponentProps<typeof NextThemesProvider>

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: themeScript
        }}
      />
      <NextThemesProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
        {...props}
      >
        {children}
      </NextThemesProvider>
    </>
  )
} 