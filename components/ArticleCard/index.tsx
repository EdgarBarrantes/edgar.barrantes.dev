import Link from 'next/link'
import { Card, CardContent, CardFooter, CardHeader } from '../ui/Card'
import { Text } from '../ui/base'

interface ArticleCardProps {
  title: string
  description: string
  date?: string
  tags?: string[]
  href: string
}

export const formatDate = (date: string) =>
  new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })

export function ArticleCard({ title, description, date, tags, href }: ArticleCardProps) {
  return (
    <Card hover className="relative flex h-full flex-col">
      <CardHeader>
        {date && (
          <time dateTime={date} className="text-sm text-muted-foreground">
            {formatDate(date)}
          </time>
        )}
        <Text variant="h3" className="text-xl">
          <Link href={href} className="after:absolute after:inset-0 hover:text-primary transition-colors">
            {title}
          </Link>
        </Text>
      </CardHeader>
      <CardContent className="flex-1">
        <Text variant="subtle" className="line-clamp-3">
          {description}
        </Text>
      </CardContent>
      {tags && tags.length > 0 && (
        <CardFooter>
          <div className="relative z-10 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <Link
                key={tag}
                href={`/tags/${tag}`}
                className="rounded-full bg-muted px-2.5 py-0.5 text-xs text-muted-foreground hover:text-foreground"
              >
                {tag}
              </Link>
            ))}
          </div>
        </CardFooter>
      )}
    </Card>
  )
}
