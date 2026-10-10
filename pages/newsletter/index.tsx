import { Meta } from '../../components/SEO/Meta'
import { Layout } from '../../components/Layout'
import { Newsletter } from '../../components/Newsletter'
import { Text } from '../../components/ui/base'

export default function NewsletterPage() {
  return (
    <>
      <Meta title="Newsletter" description="Occasional emails from Edgar Barrantes Brais on software and decentralized systems." />
      <Layout>
        <div className="space-y-8">
          <div className="max-w-2xl space-y-3">
            <Text variant="h1">Newsletter</Text>
            <Text variant="subtle" className="text-lg">
              Occasional emails on software, decentralized systems and whatever I am reading.
            </Text>
          </div>
          <Newsletter />
        </div>
      </Layout>
    </>
  )
}
