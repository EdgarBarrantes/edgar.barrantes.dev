import { ExternalLinkIcon } from 'lucide-react'

interface ProjectItemProps {
  title: string
  description: string
  href: string
  tags?: string[]
}

// One project in a list: the title as the link, then what it is.
export function ProjectItem({ title, description, href, tags }: ProjectItemProps) {
  return (
  <li className="space-y-1.5">
      <h3 className="text-xl font-semibold tracking-tight">
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="link inline-flex items-baseline gap-1.5 decoration-transparent hover:decoration-moss"
        >
          {title}
          <ExternalLinkIcon
            className="h-3.5 w-3.5 flex-shrink-0 self-center text-muted-foreground"
            aria-hidden="true"
          />
        </a>
      </h3>
      <p className="copy max-w-prose text-foreground/80">{description}</p>
      {tags && tags.length > 0 && (
        <p className="text-sm text-muted-foreground">{tags.join(', ')}</p>
        )}
    </li>
  )
}
