import { ReactNode, useTransition } from "react"
import { Content } from "../../utils/interfaces"
import { LoadingState } from '../LoadingState'
import { Container } from '../ui/Container'
import { Text } from '../ui/base'
import { ArticleCard } from '../ArticleCard'
import { Button } from '../ui/Button'

interface ContentDisplayProps {
  title: string
  description: ReactNode
  content: Content[]
  isLoading?: boolean
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
}

export function ContentDisplay({
  title,
  description,
  content,
  isLoading,
  currentPage,
  totalPages,
  onPageChange
}: ContentDisplayProps) {
  const [isPending, startTransition] = useTransition()

  if (isLoading) {
    return <LoadingState type="article" />
  }

  return (
    <Container>
      <div className="space-y-8">
        <div className="max-w-2xl">
          <Text variant="h1" className="mb-4">
            {title}
          </Text>
          <Text variant="subtle" className="text-lg">
            {description}
          </Text>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          {content.map(({ data: article, slug, type }) => (
            <ArticleCard
              key={`${type}/${slug}`}
              title={article.title}
              description={article.description}
              date={article.date}
              tags={article.tag}
              href={`/${type}/${slug}`}
              type={type as 'thoughts' | 'til'}
            />
          ))}
        </div>

        {totalPages > 1 && (
          <div className="flex justify-center gap-2">
            <Button
              variant="outline"
              onClick={() => {
                startTransition(() => onPageChange(currentPage - 1))
              }}
              disabled={currentPage === 1 || isPending}
            >
              Previous
            </Button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <Button
                key={page}
                variant={page === currentPage ? 'default' : 'outline'}
                onClick={() => {
                  startTransition(() => onPageChange(page))
                }}
                disabled={isPending}
              >
                {page}
              </Button>
            ))}
            <Button
              variant="outline"
              onClick={() => {
                startTransition(() => onPageChange(currentPage + 1))
              }}
              disabled={currentPage === totalPages || isPending}
            >
              Next
            </Button>
          </div>
        )}
      </div>
    </Container>
  )
}
