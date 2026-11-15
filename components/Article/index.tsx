import Link from 'next/link'
import { Meta } from '../SEO/Meta'
import { ArticleSchema } from '../SEO/ArticleSchema'
import { BreadcrumbSchema } from '../SEO/BreadcrumbSchema'
import { Layout } from '../Layout'
import { formatDate } from '../ArticleItem'
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
        <article className="prose dark:prose-invert mx-auto">
          <div className="not-prose mb-8 flex flex-wrap items-baseline gap-x-5 gap-y-1 text-sm text-muted-foreground">
            <Link href={`/${type}`} className="link decoration-transparent hover:text-foreground">
              {sectionName[type]}
            </Link>
            <time dateTime={data.date}>{formatDate(data.date)}</time>
            {data.readingTime && <span>{data.readingTime.text}</span>}
          </div>
          <div dangerouslySetInnerHTML={{ __html: html }} />
          {data.tag.length > 0 && (
            <p className="not-prose mt-12 text-sm text-muted-foreground">
              {data.tag.map((tag, i) => (
                <span key={tag}>
                  {i > 0 && ', '}
                  <Link href={`/tags/${tag}`} className="hover:text-foreground">
                    {tag}
                  </Link>
                </span>
              ))}
            </p>
          )}
        </article>
      </Layout>
    </>
  )
}
