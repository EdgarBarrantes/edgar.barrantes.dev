import { Card, CardContent, CardFooter, CardHeader } from '../ui/Card'
import { Text } from '../ui/base'
import { ExternalLinkIcon } from 'lucide-react'

interface ProjectCardProps {
  title: string
  description: string
  href: string
  tags?: string[]
}

export function ProjectCard({ title, description, href, tags }: ProjectCardProps) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" className="group block h-full">
      <Card hover className="flex h-full flex-col">
        <CardHeader>
          <div className="flex items-start justify-between gap-4">
            <Text variant="h3" className="text-xl group-hover:text-primary transition-colors">
              {title}
            </Text>
            <ExternalLinkIcon className="h-4 w-4 mt-1 flex-shrink-0 text-muted-foreground group-hover:text-primary transition-colors" aria-hidden="true" />
          </div>
        </CardHeader>
        <CardContent className="flex-1">
          <Text variant="subtle">{description}</Text>
        </CardContent>
        {tags && tags.length > 0 && (
          <CardFooter>
            <div className="flex flex-wrap gap-2">
              {tags.map((tag) => (
                <span key={tag} className="rounded-full bg-muted px-2.5 py-0.5 text-xs text-muted-foreground">
                  {tag}
                </span>
              ))}
            </div>
          </CardFooter>
        )}
      </Card>
    </a>
  )
}
