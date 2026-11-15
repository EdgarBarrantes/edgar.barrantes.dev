import Link from 'next/link'

interface ArticleItemProps {
  title: string
  description: string
  date?: string
  tags?: string[]
  href: string
}

export const formatDate = (date: string) =>
  new Date(date).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })

// One note in a list: the date in a gutter on the left, the title as the link.
export function ArticleItem({ title, description, date, tags, href }: ArticleItemProps) {
  return (
    <li className="grid gap-x-8 gap-y-1 sm:grid-cols-[7rem_1fr]">
      {date && (
        <time dateTime={date} className="text-sm text-muted-foreground sm:pt-1">
          {formatDate(date)}
        </time>
      )}
      <div className="space-y-1.5">
        <h3 className="text-xl font-semibold tracking-tight">
          <Link href={href} className="link decoration-transparent hover:decoration-moss">
            {title}
          </Link>
        </h3>
        <p className="copy max-w-prose text-foreground/80">{description}</p>
        {tags && tags.length > 0 && (
          <p className="text-sm text-muted-foreground">
            {tags.map((tag, i) => (
              <span key={tag}>
                {i > 0 && ', '}
                <Link href={`/tags/${tag}`} className="hover:text-foreground">
                  {tag}
                </Link>
              </span>
            ))}
          </p>
        )}
      </div>
    </li>
  )
}
