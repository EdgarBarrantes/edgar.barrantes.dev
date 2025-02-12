interface ArticleSchemaProps {
  title: string
  description: string
  date: string
  url: string
}

const ArticleSchema = ({ title, description, date, url }: ArticleSchemaProps) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": title,
    "description": description,
    "author": {
      "@type": "Person",
      "name": "Edgar Barrantes"
    },
    "datePublished": date,
    "url": url
  }

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}

export default ArticleSchema 