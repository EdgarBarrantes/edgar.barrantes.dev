import { Suspense } from 'react'
import { Meta } from '../../components/SEO/Meta'
import { Layout } from '../../components/Layout'
import { ContentDisplay } from "../../components/ContentDisplay"
import { LoadingState } from "../../components/LoadingState"
import { getAllTags, getTaggedContent } from "../../utils/data"
import { Content } from "../../utils/interfaces"

interface TagProps {
  tag: string
  content: Content[]
}

export default function Tag({ tag, content }: TagProps) {
  return (
    <>
      <Meta 
        title={`${tag} - Tagged Content`}
        description={`Content tagged with ${tag}`}
      />
      <Layout>
        <Suspense fallback={<LoadingState />}>
          <ContentDisplay
            title={`Tagged with "${tag}"`}
            description="All content with this tag"
            content={content}
            currentPage={1}
            totalPages={1}
            onPageChange={() => {}}
          />
        </Suspense>
      </Layout>
    </>
  )
}

export async function getStaticPaths() {
  const tags = getAllTags()
  return {
    paths: tags.map((tag) => ({
      params: { slug: tag }
    })),
    fallback: false
  }
}

export async function getStaticProps({ params: { slug } }: { params: { slug: string } }) {
  const content = getTaggedContent(slug)
  return {
    props: {
      tag: slug,
      content
    }
  }
}
