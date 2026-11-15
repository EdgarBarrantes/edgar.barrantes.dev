import Link from 'next/link'
import { Meta } from '../components/SEO/Meta'
import { Layout } from '../components/Layout'
import { Info } from '../components/Info'
import { ProjectItem } from '../components/ProjectItem'
import { ArticleItem } from '../components/ArticleItem'
import { Text } from '../components/ui/base'
import { getRecentContent } from '../utils/data'
import type { Content, Project } from '../utils/interfaces'
import projects from '../content/projects.json'

interface HomeProps {
  recent: Content[]
}

function SectionHeading({ title, href, linkText }: { title: string; href: string; linkText: string }) {
  return (
    <div className="flex items-baseline justify-between border-b pb-3">
      <Text variant="h2" className="text-2xl">{title}</Text>
      <Link href={href} className="link text-sm text-muted-foreground hover:text-foreground">
        {linkText}
      </Link>
    </div>
  )
}

export default function Home({ recent }: HomeProps) {
  const featured = (projects as Project[]).filter((p) => p.featured)

  return (
    <>
      <Meta />
      <Layout>
        <div className="space-y-20">
          <Info />

          <section className="space-y-10">
            <SectionHeading title="Selected projects" href="/projects" linkText="All projects" />
            <ul className="space-y-10">
              {featured.map((project) => (
                <ProjectItem key={project.href} {...project} />
              ))}
            </ul>
          </section>

          <section className="space-y-10">
            <SectionHeading title="Recent notes" href="/til" linkText="All notes" />
            <ul className="space-y-10">
              {recent.map(({ data, slug, type }) => (
                <ArticleItem
                  key={`${type}/${slug}`}
                  title={data.title}
                  description={data.description}
                  tags={data.tag}
                  href={`/${type}/${slug}`}
                />
              ))}
            </ul>
          </section>
        </div>
      </Layout>
    </>
  )
}

export async function getStaticProps() {
  return { props: { recent: getRecentContent(4) } }
}
