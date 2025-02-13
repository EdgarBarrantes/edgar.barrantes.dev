import Head from 'next/head'
import { useRouter } from 'next/router'

interface MetaProps {
  title?: string
  description?: string
  image?: string
  type?: 'website' | 'article'
  date?: string
}

export function Meta({
  title = 'Edgar Barrantes',
  description = 'Software engineer passionate about decentralised systems and thoughtful debates.',
  image = '/og-image.jpg',
  type = 'website',
  date,
}: MetaProps) {
  const router = useRouter()
  const url = `https://edgar.barrantes.dev${router.asPath}`
  const fullTitle = title === 'Edgar Barrantes' ? title : `${title} | Edgar Barrantes`

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />

      {/* Open Graph */}
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`https://edgar.barrantes.dev${image}`} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@edgarbarrantes" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`https://edgar.barrantes.dev${image}`} />

      {date && <meta property="article:published_time" content={date} />}

      <link rel="canonical" href={url} />
    </Head>
  )
} 