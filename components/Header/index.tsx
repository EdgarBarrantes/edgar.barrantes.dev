import { useEffect, useState } from 'react'
import { Container } from '../ui/Container'
import { Button } from '../ui/Button'
import { MenuIcon, XIcon } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Image from 'next/image'
import { twMerge } from 'tailwind-merge'
import { ThemeToggle } from '../ThemeToggle'

const navigation = [
  { name: 'Projects', href: '/projects' },
  { name: 'Resume', href: '/resume' },
  { name: 'Thoughts', href: '/thoughts' },
  { name: 'TIL', href: '/til' },
]

export function Header() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    if (!isOpen) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setIsOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [isOpen])

  const linkClass = (href: string, base: string) =>
    twMerge(
      base,
      'font-medium transition-colors hover:text-primary',
      router.pathname.startsWith(href) ? 'text-foreground' : 'text-muted-foreground'
    )

  return (
    <>
      <header
        className={twMerge(
          'print:hidden fixed top-0 left-0 right-0 z-50 transition-all duration-150',
          scrolled && 'bg-background/80 backdrop-blur-lg shadow-sm'
        )}
      >
        <Container size="md" className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center" aria-label="Edgar Barrantes Brais, home">
            <Image
              src="/logo.png"
              alt=""
              width={40}
              height={40}
              className="h-10 w-10 object-contain dark:invert"
              priority
            />
          </Link>

          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link key={item.href} href={item.href} className={linkClass(item.href, 'text-sm')}>
                {item.name}
              </Link>
            ))}
            <ThemeToggle />
          </nav>

          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(true)} aria-label="Open menu">
              <MenuIcon className="h-6 w-6" />
            </Button>
          </div>
        </Container>
      </header>

      {isOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div className="fixed inset-0 bg-black/20 backdrop-blur-sm" aria-hidden="true" onClick={() => setIsOpen(false)} />
          <div className="fixed inset-y-0 right-0 w-full max-w-sm bg-background p-6 shadow-lg">
            <div className="flex items-center justify-between">
              <span className="text-lg font-semibold">Menu</span>
              <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} aria-label="Close menu">
                <XIcon className="h-6 w-6" />
              </Button>
            </div>
            <nav className="mt-8 flex flex-col space-y-6">
              {navigation.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={linkClass(item.href, 'text-lg')}
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
