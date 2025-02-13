import { Text } from '../ui/base'
import { Container } from '../ui/Container'

interface SocialLink {
  name: string
  url: string
  icon?: React.ReactNode
}

const socialLinks: SocialLink[] = [
  {
    name: 'GitHub',
    url: 'https://github.com/edgarbarrantes',
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/edgar-barrantes',
  },
  {
    name: 'Twitter',
    url: 'https://twitter.com/edgarbarrantes',
  }
]

export function Social() {
  return (
    <Container size="sm">
      <div className="space-y-4">
        <Text variant="h2">Connect with me</Text>
        <div className="flex gap-4">
          {socialLinks.map((link) => (
            <a
              key={link.name}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              {link.icon ? (
                link.icon
              ) : (
                <Text variant="subtle">{link.name}</Text>
              )}
            </a>
          ))}
        </div>
      </div>
    </Container>
  )
} 