import { Container } from '../ui/Container'

const links = [
  { href: 'mailto:edgar@barrantes.dev', label: 'Email' },
  { href: 'https://github.com/edgarbarrantes', label: 'GitHub' },
  { href: 'https://www.linkedin.com/in/edgar-barrantes/', label: 'LinkedIn' },
  { href: 'https://twitter.com/edgarbarrantes', label: 'Twitter' },
  { href: '/rss.xml', label: 'RSS' },
]

export function Footer() {
  return (
    <footer className="print:hidden border-t mt-16">
      <Container className="flex flex-col sm:flex-row items-center justify-between gap-4 py-8 text-sm text-muted-foreground">
        <span>Edgar Barrantes Brais</span>
        <nav className="flex flex-wrap items-center gap-x-5 gap-y-2">
          {links.map(({ href, label }) => (
            <a
              key={href}
              href={href}
              className="hover:text-foreground"
              target={href.startsWith('http') ? '_blank' : undefined}
              rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
            >
              {label}
            </a>
          ))}
        </nav>
      </Container>
    </footer>
  )
}
