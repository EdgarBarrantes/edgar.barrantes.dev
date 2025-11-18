import { Meta } from '../../components/SEO/Meta'
import { Layout } from '../../components/Layout'
import { Info } from '../../components/Info'
import { ArticleSchema } from '../../components/SEO/ArticleSchema'
import { BreadcrumbSchema } from '../../components/SEO/BreadcrumbSchema'
import { getAllTILs, getTIL, getTILHtml } from '../../utils/data'

interface TilData {
  title: string
  description: string
  date: string
  tag?: string[]
  readingTime?: {
    minutes: number
    words: number
    text: string
  }
}

interface TilProps {
  til: TilData & {
    slug: string
  }
  content: string
}

export default function Til({ til, content }: TilProps) {
  return (
    <>
      <Meta 
        title={til.title}
        description={til.description || `Quick technical note on ${til.title}`}
        type="article"
        date={til.date}
      />
      <ArticleSchema
        title={til.title}
        description={til.description || `Quick technical note on ${til.title}`}
        date={til.date}
        url={`https://edgar.barrantes.dev/til/${til.slug}`}
      />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://edgar.barrantes.dev' },
          { name: 'TIL', url: 'https://edgar.barrantes.dev/til' },
          { name: til.title, url: `https://edgar.barrantes.dev/til/${til.slug}` }
        ]}
      />
      <Layout>
        <article className="prose dark:prose-invert lg:prose-lg mx-auto">
          {til.readingTime && (
            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-8 not-prose">
              <time dateTime={til.date}>
                {new Date(til.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </time>
              <span>•</span>
              <span>{til.readingTime.text}</span>
              <span>•</span>
              <span>{til.readingTime.words.toLocaleString()} words</span>
            </div>
          )}
          <div dangerouslySetInnerHTML={{ __html: content }} />
          <hr className="my-8" />
          <Info />
        </article>
      </Layout>
    </>
  )
}

export async function getStaticPaths() {
  const tils = getAllTILs()
  return {
    paths: tils.map((til) => ({
      params: { slug: til.slug }
    })),
    fallback: false
  }
}

export async function getStaticProps({ params: { slug } }: { params: { slug: string } }) {
  const til = getTIL(slug)
  return {
    props: {
      til: {
        ...til.data,
        slug
      },
      content: await getTILHtml(til.content)
    }
  }
}
