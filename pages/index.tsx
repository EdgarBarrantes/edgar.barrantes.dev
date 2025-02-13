import { Meta } from '../components/SEO/Meta'
import { Info } from '../components/Info'
import { Layout } from '../components/Layout'

export default function Home() {
  return (
    <>
      <Meta />
      <Layout>
        <div className="flex flex-col items-center justify-center min-h-[80vh]">
          <Info />
        </div>
      </Layout>
    </>
  )
}
