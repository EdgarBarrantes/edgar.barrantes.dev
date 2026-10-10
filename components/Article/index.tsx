import Link from 'next/link'
import { Meta } from '../SEO/Meta'
import { ArticleSchema } from '../SEO/ArticleSchema'
import { BreadcrumbSchema } from '../SEO/BreadcrumbSchema'
import { Layout } from '../Layout'
import { formatDate } from '../ArticleCard'
import type { ArticleData, ContentType } from '../../utils/interfaces'

const SITE = 'https://edgar.barrantes.dev'
const sectionName: Record<ContentType, string> = { thoughts: 'Thoughts', til: 'TIL' }

interface ArticleProps {
  type: ContentType
  slug: string
  data: ArticleData
  html: string
}

export function Article({ type, slug, data, html }: ArticleProps) {
  const url = `${SITE}/${type}/${slug}`
  return (
    <>
      <Meta title={data.title} description={data.description} type="article" date={data.date} />
      <ArticleSchema title={data.title} description={data.description} date={data.date} url={url} />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: SITE },
          { name: sectionName[type], url: `${SITE}/${type}` },
          { name: data.title, url },
        ]}
      />
      <Layout>
        <article className="prose dark:prose-invert lg:prose-lg mx-auto">
          <div className="not-prose mb-8 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
            <Link href={`/${type}`} className="hover:text-foreground">
              {sectionName[type]}
            </Link>
            <span aria-hidden="true">·</span>
            <time dateTime={data.date}>{formatDate(data.date)}</time>
            {data.readingTime && (
              <>
                <span aria-hidden="true">·</span>
                <span>{data.readingTime.text}</span>
              </>
            )}
          </div>
          <div dangerouslySetInnerHTML={{ __html: html }} />
          {data.tag.length > 0 && (
            <div className="not-prose mt-12 flex flex-wrap gap-2">
              {data.tag.map((tag) => (
                <Link
                  key={tag}
                  href={`/tags/${tag}`}
                  className="rounded-full bg-muted px-2.5 py-0.5 text-xs text-muted-foreground hover:text-foreground"
                >
                  {tag}
                </Link>
              ))}
            </div>
          )}
        </article>
      </Layout>
    </>
  )
}
