import dynamic from 'next/dynamic'
import { Meta } from '../../components/SEO/Meta'
import { Layout } from '../../components/Layout'
import { ContentDisplay } from '../../components/ContentDisplay'
import { getAllContent } from '../../utils/data'
import type { Content } from '../../utils/interfaces'

const Newsletter = dynamic(() => import('../../components/Newsletter').then((m) => m.Newsletter), {
  ssr: false,
})

interface ThoughtsProps {
  thoughts: Content[]
}

export default function Thoughts({ thoughts }: ThoughtsProps) {
  return (
    <>
      <Meta
        title="Thoughts"
        description="Notes on books, podcasts and talks by Edgar Barrantes Brais."
      />
      <Layout>
        <div className="space-y-12">
          <ContentDisplay
            title="Thoughts"
            description="Notes on books, podcasts and talks. Longer pieces go out through the newsletter below."
            content={thoughts}
          />
          <Newsletter />
        </div>
      </Layout>
    </>
  )
}

export async function getStaticProps() {
  return { props: { thoughts: getAllContent('thoughts') } }
}
