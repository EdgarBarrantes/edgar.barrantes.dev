import { Card, CardContent, CardHeader } from '../ui/Card'
import { Text } from '../ui/base'
import { ExternalLinkIcon } from 'lucide-react'

interface ProjectCardProps {
  title: string
  description: string
  href: string
}

export function ProjectCard({ title, description, href }: ProjectCardProps) {
  return (
    <a 
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group block"
    >
      <Card 
        hover 
        gradient 
        className="h-full transition-all duration-300"
      >
        <CardHeader>
          <div className="flex items-center justify-between gap-4">
            <Text variant="h3" className="group-hover:text-primary transition-colors">
              {title}
            </Text>
            <ExternalLinkIcon 
              className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" 
            />
          </div>
        </CardHeader>
        <CardContent>
          <Text variant="subtle" className="line-clamp-3">
            {description}
          </Text>
        </CardContent>
      </Card>
    </a>
  )
} 