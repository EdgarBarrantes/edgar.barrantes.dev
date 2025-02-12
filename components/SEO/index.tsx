import Head from 'next/head'
import { useRouter } from 'next/router'

interface SEOProps {
  title?: string
  description?: string
  image?: string
  article?: boolean
  canonical?: string
}

const SEO = ({ 
  title = "Edgar Barrantes", 
  description = "Software engineer passionate about decentralised systems with extensive experience in full stack development and web 3.",
  image = "/og-image.jpg",
  article = false,
  canonical
}: SEOProps) => {
  const router = useRouter()
  const url = `https://edgar.barrantes.dev${router.asPath}`
  const fullTitle = title === "Edgar Barrantes" ? title : `${title} - Edgar Barrantes`

  return (
    <Head>
      {/* Primary Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="title" content={fullTitle} />
      <meta name="description" content={description} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={article ? "article" : "website"} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`https://edgar.barrantes.dev${image}`} />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={fullTitle} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={`https://edgar.barrantes.dev${image}`} />

      <link 
        rel="canonical" 
        href={canonical || url} 
      />

      <meta name="theme-color" content="#312e81" />
    </Head>
  )
}

export default SEO 