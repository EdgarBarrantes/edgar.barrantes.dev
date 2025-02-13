import { Meta } from '../../components/SEO/Meta'
import { Layout } from '../../components/Layout'
import { Info } from '../../components/Info'
import { ArticleSchema } from '../../components/SEO/ArticleSchema'
import { getAllThoughts, getThought, getThoughtHtml } from '../../utils/data'

interface ThoughtData {
  title: string
  description: string
  date: string
  tag?: string[]
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
      <Layout>
        <article className="prose dark:prose-invert lg:prose-lg mx-auto">
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
