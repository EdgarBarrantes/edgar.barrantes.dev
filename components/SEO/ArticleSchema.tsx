interface ArticleSchemaProps {
  title: string
  description: string
  date?: string
  url: string
  image?: string
  imageWidth?: number
  imageHeight?: number
  wordCount?: number
}

export function ArticleSchema({
  title,
  description,
  date,
  url,
  image = '/og-image.jpg',
  imageWidth = 1200,
  imageHeight = 630,
  wordCount
}: ArticleSchemaProps) {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    ...(date && {
      datePublished: date,
      dateModified: date,
    }),
    url,
    image: {
      '@type': 'ImageObject',
      url: `https://edgar.barrantes.dev${image}`,
      width: imageWidth,
      height: imageHeight,
    },
    author: {
      '@type': 'Person',
      name: 'Edgar Barrantes Brais',
      alternateName: 'Edgar Barrantes',
      url: 'https://edgar.barrantes.dev'
    },
    publisher: {
      '@type': 'Person',
      name: 'Edgar Barrantes Brais',
      url: 'https://edgar.barrantes.dev'
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': url
    },
    ...(wordCount && { wordCount })
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
} 