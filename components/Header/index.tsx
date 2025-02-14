import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { Container } from '../ui/Container'
import { Button } from '../ui/Button'
import { Text } from '../ui/base'
import { MenuIcon, XIcon } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { twMerge } from 'tailwind-merge'
import { useKeyboard } from '../../hooks/useKeyboard'
import { ThemeToggle } from '../ThemeToggle'
import { BackgroundSwitcher } from '../BackgroundSwitcher'
import { useBackground } from '../../contexts/BackgroundContext'
import Image from 'next/image'
import { Search } from '../Search'

const navigation = [
  { name: 'Thoughts', href: '/thoughts' },
  { name: 'TIL', href: '/til' },
  { name: 'Projects', href: '/projects' },
  { name: 'Resume', href: '/resume' },
  { name: 'Play', href: '/playground' },
]

const links = [
  { href: '/thoughts', label: 'Thoughts' },
  { href: '/til', label: 'TIL' },
  { href: '/projects', label: 'Projects' },
  { href: '/resume', label: 'Resume' },
]

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [mounted, setMounted] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { backgroundType, setBackgroundType } = useBackground()
  const { resolvedTheme, theme } = useTheme()
  const router = useRouter()
  const isPlayground = router.pathname === '/playground'

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Handle mounting
  useEffect(() => {
    setMounted(true)
  }, [])

  // Add keyboard shortcuts
  useKeyboard({
    key: 'k',
    ctrl: true,
    callback: () => setIsOpen(true)
  })

  useKeyboard({
    key: 'Escape',
    callback: () => setIsOpen(false)
  })

  // Initial loading state
  if (!mounted) {
    return (
      <header className="fixed top-0 left-0 right-0 z-50 h-16">
        <Container className="flex h-16 items-center justify-between">
          <div className="flex">
            <div className="relative w-10 h-10">
              <Image
                src="/logo.png"
                alt="Edgar Barrantes"
                fill
                sizes="40px"
                className="object-contain opacity-0"
                priority
              />
            </div>
          </div>
          <div className="w-40" />
        </Container>
      </header>
    )
  }

  return (
    <>
      <header
        className={twMerge(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-150',
          scrolled && 'bg-background/80 backdrop-blur-lg shadow-sm'
        )}
      >
        <Container className="flex h-16 items-center justify-between">
          <div className="flex">
            <Link
              href="/"
              className="flex items-center transition-colors hover:text-primary"
            >
              <div 
                className={twMerge(
                  "relative w-10 h-10",
                  "transition-[filter] duration-150",
                  mounted && resolvedTheme === 'dark' && "invert"
                )}
              >
                <Image
                  src="/logo.png"
                  alt="A logo of a beautifully detailed tree with the initials E B inside of it"
                  fill
                  sizes="40px"
                  className={twMerge(
                    "object-contain",
                    "transition-opacity duration-150",
                    mounted ? "opacity-100" : "opacity-0"
                  )}
                  priority
                />
              </div>
              <span className="sr-only">Edgar Barrantes</span>
            </Link>
          </div>

          {/* Desktop navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={twMerge(
                  'text-sm font-medium transition-colors hover:text-primary',
                  router.pathname.startsWith(item.href)
                    ? 'text-foreground'
                    : 'text-muted-foreground'
                )}
              >
                {item.name}
              </Link>
            ))}
            <div className="flex items-center gap-2">
              <BackgroundSwitcher 
                value={backgroundType} 
                onChange={setBackgroundType} 
                showHangman={router.pathname === '/playground'}
              />
              <ThemeToggle />
            </div>
          </nav>

          {/* Mobile menu button */}
          <div className="flex items-center gap-2 md:hidden">
            <BackgroundSwitcher 
              value={backgroundType} 
              onChange={setBackgroundType} 
              showHangman={router.pathname === '/playground'}
            />
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(true)}
              aria-label="Open menu"
            >
              <MenuIcon className="h-6 w-6" />
            </Button>
          </div>
        </Container>
      </header>

      {/* Mobile navigation */}
      {isOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="fixed inset-0 bg-black/20 backdrop-blur-sm" aria-hidden="true" />
          <div className="fixed inset-y-0 right-0 w-full max-w-sm bg-background p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <Text variant="h3" className="font-display">
                Menu
              </Text>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(false)}
                aria-label="Close menu"
              >
                <XIcon className="h-6 w-6" />
              </Button>
            </div>
            <nav className="mt-8 flex flex-col space-y-6">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={twMerge(
                    'text-lg font-medium transition-colors hover:text-primary',
                    router.pathname.startsWith(item.href)
                      ? 'text-foreground'
                      : 'text-muted-foreground'
                  )}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </>
  )
}

// Icons
function SunIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <circle cx="12" cy="12" r="5" />
      <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
    </svg>
  )
}

function MoonIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" fill="none" {...props}>
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M17.715 15.15A6.5 6.5 0 0 1 9 6.035C6.106 6.922 4 9.645 4 12.867c0 3.94 3.153 7.136 7.042 7.136 3.101 0 5.734-2.032 6.673-4.853Z"
        className="fill-transparent"
      />
      <path
        d="m17.715 15.15.95.316a1 1 0 0 0-1.445-1.185l.495.869ZM9 6.035l.846.534a1 1 0 0 0-1.14-1.49L9 6.035Zm8.221 8.246a5.47 5.47 0 0 1-2.72.718v2a7.47 7.47 0 0 0 3.71-.98l-.99-1.738Zm-2.72.718A5.5 5.5 0 0 1 9 9.5H7a7.5 7.5 0 0 0 7.5 7.5v-2ZM9 9.5c0-1.079.31-2.082.845-2.93L8.153 5.5A7.47 7.47 0 0 0 7 9.5h2Zm-4 3.368C5 10.089 6.815 7.75 9.292 6.69L8.706 5.38C5.397 6.744 3 9.942 3 12.868h2Zm6.042 6.136C7.718 19.003 5 16.268 5 12.867H3c0 4.48 3.588 8.136 8.042 8.136v-2Zm5.725-4.17c-.81 2.433-3.074 4.17-5.725 4.17v2c3.552 0 6.553-2.327 7.622-5.537l-1.897-.632Z"
        className="fill-slate-400 dark:fill-slate-500"
      />
    </svg>
  )
} 