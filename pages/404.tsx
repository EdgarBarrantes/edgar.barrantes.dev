import Link from 'next/link'
import { Meta } from '../components/SEO/Meta'
import { Layout } from '../components/Layout'
import { Text } from '../components/ui/base'
import { Button } from '../components/ui/Button'

export default function Custom404() {
  return (
    <>
      <Meta title="Page not found" description="That page does not exist." noIndex />
      <Layout>
        <div className="flex flex-col items-center justify-center min-h-[50vh] gap-6 text-center">
          <Text variant="h1">Page not found</Text>
          <Text variant="subtle" className="text-lg">
            That link does not go anywhere.
          </Text>
          <Button variant="outline" asChild>
            <Link href="/">Back to the home page</Link>
          </Button>
        </div>
      </Layout>
    </>
  )
}
