import { Meta } from '../../components/SEO/Meta'
import { Layout } from '../../components/Layout'
import { Info } from '../../components/Info'
import { ArticleSchema } from '../../components/SEO/ArticleSchema'
import { BreadcrumbSchema } from '../../components/SEO/BreadcrumbSchema'
import { getAllThoughts, getThought, getThoughtHtml } from '../../utils/data'

interface ThoughtData {
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

interface ThoughtProps {
  thought: ThoughtData & {
    slug: string
  }
  content: string
}

export default function Thought({ thought, content }: ThoughtProps) {
  return (
    <>
      <Meta 
        title={thought.title}
        description={thought.description}
        type="article"
        date={thought.date}
      />
      <ArticleSchema
        title={thought.title}
        description={thought.description}
        date={thought.date}
        url={`https://edgar.barrantes.dev/thoughts/${thought.slug}`}
      />
      <BreadcrumbSchema
        items={[
          { name: 'Home', url: 'https://edgar.barrantes.dev' },
          { name: 'Thoughts', url: 'https://edgar.barrantes.dev/thoughts' },
          { name: thought.title, url: `https://edgar.barrantes.dev/thoughts/${thought.slug}` }
        ]}
      />
      <Layout>
        <article className="prose dark:prose-invert lg:prose-lg mx-auto">
          {thought.readingTime && (
            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-8 not-prose">
              <time dateTime={thought.date}>
                {new Date(thought.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </time>
              <span>•</span>
              <span>{thought.readingTime.text}</span>
              <span>•</span>
              <span>{thought.readingTime.words.toLocaleString()} words</span>
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
  const thoughts = await getAllThoughts()
  return {
    paths: thoughts.map((thought) => ({
      params: { slug: thought.slug }
    })),
    fallback: false
  }
}

export async function getStaticProps({ params: { slug } }: { params: { slug: string } }) {
  const thought = getThought(slug)
  return {
    props: {
      thought: {
        ...thought.data,
        slug
      },
      content: await getThoughtHtml(thought.content)
    }
  }
}
