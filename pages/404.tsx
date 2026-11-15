import Link from 'next/link'
import { Meta } from '../components/SEO/Meta'
import { Layout } from '../components/Layout'
import { Text } from '../components/ui/base'

export default function Custom404() {
  return (
    <>
      <Meta title="Page not found" description="That page does not exist." noIndex />
      <Layout>
        <div className="flex min-h-[50vh] flex-col items-start justify-center gap-4">
          <Text variant="h1">Page not found</Text>
          <p className="copy text-muted-foreground">That link does not go anywhere.</p>
          <Link href="/" className="link text-sm">
            Back to the home page
          </Link>
        </div>
      </Layout>
    </>
  )
}
