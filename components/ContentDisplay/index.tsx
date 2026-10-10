import { ReactNode } from "react"
import { Content } from "../../utils/interfaces"
import { Text } from '../ui/base'
import { ArticleCard } from '../ArticleCard'

interface ContentDisplayProps {
  title: string
  description?: ReactNode
  content: Content[]
}

export function ContentDisplay({ title, description, content }: ContentDisplayProps) {
  return (
    <div className="space-y-8">
      <div className="max-w-2xl space-y-3">
        <Text variant="h1">{title}</Text>
        {description && (
          <Text variant="subtle" className="text-lg">
            {description}
          </Text>
        )}
      </div>

      {content.length === 0 ? (
        <Text variant="subtle">Nothing here yet.</Text>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2">
          {content.map(({ data, slug, type }) => (
            <ArticleCard
              key={`${type}/${slug}`}
              title={data.title}
              description={data.description}
              date={data.date}
              tags={data.tag}
              href={`/${type}/${slug}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
