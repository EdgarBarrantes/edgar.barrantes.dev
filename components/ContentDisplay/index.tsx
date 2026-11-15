import { ReactNode } from "react"
import { Content } from "../../utils/interfaces"
import { Text } from '../ui/base'
import { ArticleItem } from '../ArticleItem'

interface ContentDisplayProps {
  title: string
  description?: ReactNode
  content: Content[]
}

export function ContentDisplay({ title, description, content }: ContentDisplayProps) {
  return (
    <div className="space-y-12">
      <div className="max-w-prose space-y-3">
        <Text variant="h1">{title}</Text>
        {description && <p className="copy text-muted-foreground">{description}</p>}
      </div>

      {content.length === 0 ? (
        <p className="copy text-muted-foreground">Nothing here yet.</p>
      ) : (
        <ul className="space-y-10">
          {content.map(({ data, slug, type }) => (
            <ArticleItem
              key={`${type}/${slug}`}
              title={data.title}
              description={data.description}
              date={data.date}
              tags={data.tag}
              href={`/${type}/${slug}`}
            />
          ))}
        </ul>
      )}
    </div>
  )
}
