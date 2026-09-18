import { Meta } from '../../components/SEO/Meta'
import { Layout } from '../../components/Layout'
import { ContentDisplay } from '../../components/ContentDisplay'
import { getAllTags, getTaggedContent } from '../../utils/data'
import type { Content } from '../../utils/interfaces'

interface TagProps {
  tag: string
  content: Content[]
}

export default function Tag({ tag, content }: TagProps) {
  return (
    <>
      <Meta title={`Tagged ${tag}`} description={`Notes tagged ${tag}.`} />
      <Layout>
        <ContentDisplay title={`Tagged “${tag}”`} content={content} />
      </Layout>
    </>
  )
}

export async function getStaticPaths() {
  return {
    paths: getAllTags().map((tag) => ({ params: { slug: tag } })),
    fallback: false,
  }
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
  return { props: { tag: params.slug, content: getTaggedContent(params.slug) } }
}
