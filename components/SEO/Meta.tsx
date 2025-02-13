import Head from 'next/head'
import { useRouter } from 'next/router'

interface MetaProps {
  title?: string
  description?: string
  image?: string
  type?: 'website' | 'article'
  date?: string
  keywords?: string[]
  author?: string
}

export function Meta({
  title = "Edgar Barrantes",
  description = "Software engineer passionate about decentralised systems and thoughtful debates",
  image = "/og-image.jpg",
  type = "website",
  date,
  keywords = [
    "Edgar Barrantes",
    "Software Engineer",
    "Web3 Developer",
    "Blockchain",
    "TypeScript",
    "Next.js",
    "React",
    "Decentralized Systems",
    "Full Stack Developer",
    "Smart Contracts",
    "Ethereum",
    "StarkNet",
    "Cairo",
    "AI",
    "LLMs",
    "LLM",
    "Generative AI",
    "Artificial Intelligence",
    "Blockchain Development",
    "Smart Contract Development",
    "Software Development",
    "Costa Rica",
  ],
  author = "Edgar Barrantes",
}: MetaProps) {
  const router = useRouter();
  const url = `https://edgar.barrantes.dev${router.asPath}`;
  const fullTitle =
    title === "Edgar Barrantes" ? title : `${title} | Edgar Barrantes`;

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords.join(", ")} />
      <meta name="author" content={author} />

      {/* Robots */}
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />

      {/* Open Graph */}
      <meta property="og:url" content={url} />
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="Edgar Barrantes" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta
        property="og:image"
        content={`https://edgar.barrantes.dev${image}`}
      />
      <meta property="og:image:alt" content={description} />
      <meta property="og:locale" content="en_US" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@edgarbarrantes" />
      <meta name="twitter:creator" content="@edgarbarrantes" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta
        name="twitter:image"
        content={`https://edgar.barrantes.dev${image}`}
      />
      <meta name="twitter:image:alt" content={description} />

      {date && <meta property="article:published_time" content={date} />}
      {date && <meta property="og:updated_time" content={date} />}

      <link rel="canonical" href={url} />

      {/* Person Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            name: "Edgar Barrantes",
            url: "https://edgar.barrantes.dev",
            sameAs: [
              "https://twitter.com/edgarbarrantes",
              "https://github.com/edgarbarrantes",
              "https://linkedin.com/in/edgarbarrantes",
            ],
            jobTitle: "Software Engineer",
            worksFor: {
              "@type": "Organization",
              name: "Nethermind",
            },
            description:
              "Software engineer passionate about decentralised systems and thoughtful debates",
            image: "https://edgar.barrantes.dev/og-image.jpg",
            alumniOf: {
              "@type": "Organization",
              name: "WalletConnect",
            },
          }),
        }}
      />

      {/* Website Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: "Edgar Barrantes",
            url: "https://edgar.barrantes.dev",
            description: description,
            author: {
              "@type": "Person",
              name: "Edgar Barrantes",
            },
            publisher: {
              "@type": "Person",
              name: "Edgar Barrantes",
            },
          }),
        }}
      />
    </Head>
  );
} 