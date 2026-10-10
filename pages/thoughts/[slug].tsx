import { Article } from '../../components/Article'
import { getAllContent, getArticle, getHtml } from '../../utils/data'
import type { ArticleData } from '../../utils/interfaces'

interface Props {
  slug: string
  data: ArticleData
  html: string
}

export default function Page(props: Props) {
  return <Article type="thoughts" {...props} />
}

export async function getStaticPaths() {
  return {
    paths: getAllContent('thoughts').map(({ slug }) => ({ params: { slug } })),
    fallback: false,
  }
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
  const { data, content } = getArticle('thoughts', params.slug)
  return { props: { slug: params.slug, data, html: await getHtml(content) } }
}
