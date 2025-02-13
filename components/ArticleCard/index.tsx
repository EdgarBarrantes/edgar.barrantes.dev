import Link from 'next/link'
import { Card, CardContent, CardFooter, CardHeader } from '../ui/Card'
import { Text } from '../ui/base'
import { CalendarIcon, TagIcon } from 'lucide-react'
import { twMerge } from 'tailwind-merge'

interface ArticleCardProps {
  title: string
  description: string
  date?: string
  tags?: string[]
  href: string
  type: 'thoughts' | 'til'
}

export function ArticleCard({ title, description, date, tags, href, type }: ArticleCardProps) {
  return (
    <Link href={href} className="group block">
      <Card 
        hover 
        gradient 
        className="h-full transition-all duration-300"
      >
        <CardHeader>
          <div className="space-y-1">
            {date && (
              <div className="flex items-center text-sm text-muted-foreground">
                <CalendarIcon className="mr-1 h-4 w-4" />
                <time dateTime={date}>{date}</time>
              </div>
            )}
            <Text variant="h3" className="group-hover:text-primary transition-colors">
              {title}
            </Text>
          </div>
        </CardHeader>
        <CardContent>
          <Text variant="subtle" className="line-clamp-3">
            {description}
          </Text>
        </CardContent>
        {tags && tags.length > 0 && (
          <CardFooter>
            <div className="flex items-center gap-2 flex-wrap">
              <TagIcon className="h-4 w-4 text-muted-foreground" />
              {tags.map(tag => (
                <Link
                  key={tag}
                  href={`/tags/${tag}`}
                  className={twMerge(
                    'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
                    'bg-primary/10 text-primary hover:bg-primary/20',
                    'transition-colors duration-200'
                  )}
                  onClick={(e) => e.stopPropagation()}
                >
                  {tag}
                </Link>
              ))}
            </div>
          </CardFooter>
        )}
      </Card>
    </Link>
  )
} 