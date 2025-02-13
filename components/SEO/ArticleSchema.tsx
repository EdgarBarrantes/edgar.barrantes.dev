interface ArticleSchemaProps {
  title: string
  description: string
  date?: string
  url: string
}

export function ArticleSchema({ title, description, date, url }: ArticleSchemaProps) {
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
    author: {
      '@type': 'Person',
      name: 'Edgar Barrantes',
      url: 'https://edgar.barrantes.dev'
    }
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
} 