import { Suspense } from 'react'
import { Layout } from "../../components/Layout"
import { Newsletter } from "../../components/Newsletter"
import { LoadingState } from "../../components/LoadingState"
import { Meta } from "../../components/SEO/Meta"

export default function NewsletterPage() {
  return (
    <>
      <Meta 
        title="Newsletter"
        description="Subscribe to my newsletter for updates on software development, decentralized systems, and more."
      />
      <Layout>
        <Suspense fallback={<LoadingState />}>
          <Newsletter />
        </Suspense>
      </Layout>
    </>
  )
}
