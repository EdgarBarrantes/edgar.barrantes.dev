import Head from 'next/head'
import { useRouter } from 'next/router'

const SITE = 'https://edgar.barrantes.dev'
const NAME = 'Edgar Barrantes Brais'
const DEFAULT_DESCRIPTION =
  'Senior Full-Stack Engineer (TypeScript, Node.js, React). Developer tooling and AI workflows. ZK background.'
const HEADLINE_TITLE = 'Senior Full-Stack Engineer'

interface MetaProps {
  title?: string
  description?: string
  image?: string
  type?: 'website' | 'article'
  date?: string
  noIndex?: boolean
}

export function Meta({
  title,
  description = DEFAULT_DESCRIPTION,
  image = '/og-image.jpg',
  type = 'website',
  date,
  noIndex = false,
}: MetaProps) {
  const router = useRouter()
  const path = router.asPath.split(/[?#]/)[0]
  const url = `${SITE}${path === '/' ? '' : path}`
  const fullTitle = title ? `${title} | ${NAME}` : `${NAME} | ${HEADLINE_TITLE}`
  const imageUrl = `${SITE}${image}`

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="author" content={NAME} />
      {noIndex && <meta name="robots" content="noindex" />}

      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={NAME} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={imageUrl} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:locale" content="en_US" />
      {date && <meta property="article:published_time" content={date} />}

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@edgarbarrantes" />
      <meta name="twitter:creator" content="@edgarbarrantes" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={imageUrl} />

      <link rel="canonical" href={url} />

      {path === '/' && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: NAME,
              alternateName: 'Edgar Barrantes',
              url: SITE,
              image: imageUrl,
              jobTitle: HEADLINE_TITLE,
              description: DEFAULT_DESCRIPTION,
              sameAs: [
                'https://github.com/edgarbarrantes',
                'https://www.linkedin.com/in/edgar-barrantes/',
                'https://twitter.com/edgarbarrantes',
              ],
              alumniOf: {
                '@type': 'CollegeOrUniversity',
                name: 'Universidad de Costa Rica',
              },
              knowsAbout: ['TypeScript', 'Node.js', 'React', 'Next.js', 'PostgreSQL', 'Developer tooling', 'Zero-knowledge proofs', 'Cairo', 'Noir', 'Starknet', 'Aztec'],
            }),
          }}
        />
      )}
    </Head>
  )
}
