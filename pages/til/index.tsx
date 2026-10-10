import { Meta } from '../../components/SEO/Meta'
import { Layout } from '../../components/Layout'
import { ContentDisplay } from '../../components/ContentDisplay'
import { getAllContent } from '../../utils/data'
import type { Content } from '../../utils/interfaces'

interface TILProps {
  tils: Content[]
}

export default function TIL({ tils }: TILProps) {
  return (
    <>
      <Meta
        title="Today I Learned"
        description="Short technical notes by Edgar Barrantes Brais: commands, fixes and things worth remembering."
      />
      <Layout>
        <ContentDisplay
          title="Today I Learned"
          description="Short notes on things I had to figure out, kept here so I do not have to figure them out twice."
          content={tils}
        />
      </Layout>
    </>
  )
}

export async function getStaticProps() {
  return { props: { tils: getAllContent('til') } }
}
