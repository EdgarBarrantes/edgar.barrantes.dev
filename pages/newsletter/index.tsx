import { Meta } from '../../components/SEO/Meta'
import { Layout } from '../../components/Layout'
import { Newsletter } from '../../components/Newsletter'
import { Text } from '../../components/ui/base'

export default function NewsletterPage() {
  return (
    <>
      <Meta title="Newsletter" description="Occasional emails from Edgar Barrantes Brais on software and decentralized systems." />
      <Layout>
        <div className="space-y-12">
          <div className="max-w-prose space-y-3">
            <Text variant="h1">Newsletter</Text>
            <p className="copy text-muted-foreground">
              Occasional emails on software, decentralized systems and whatever I am reading.
            </p>
          </div>
          <Newsletter />
        </div>
      </Layout>
    </>
  )
}
