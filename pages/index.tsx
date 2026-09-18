import Link from 'next/link'
import { Meta } from '../components/SEO/Meta'
import { Layout } from '../components/Layout'
import { Info } from '../components/Info'
import { ProjectCard } from '../components/ProjectCard'
import { ArticleCard } from '../components/ArticleCard'
import { Text } from '../components/ui/base'
import { getRecentContent } from '../utils/data'
import type { Content, Project } from '../utils/interfaces'
import projects from '../content/projects.json'

interface HomeProps {
  recent: Content[]
}

export default function Home({ recent }: HomeProps) {
  const featured = (projects as Project[]).filter((p) => p.featured)

  return (
    <>
      <Meta />
      <Layout>
        <div className="space-y-16">
          <Info />

          <section className="space-y-6">
            <div className="flex items-baseline justify-between">
              <Text variant="h2" className="text-2xl">Selected projects</Text>
              <Link href="/projects" className="text-sm text-muted-foreground hover:text-foreground">
                All projects
              </Link>
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              {featured.map((project) => (
                <ProjectCard key={project.href} {...project} />
              ))}
            </div>
          </section>

          <section className="space-y-6">
            <div className="flex items-baseline justify-between">
              <Text variant="h2" className="text-2xl">Recent notes</Text>
              <Link href="/til" className="text-sm text-muted-foreground hover:text-foreground">
                All notes
              </Link>
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              {recent.map(({ data, slug, type }) => (
                <ArticleCard
                  key={`${type}/${slug}`}
                  title={data.title}
                  description={data.description}
                  date={data.date}
                  tags={data.tag}
                  href={`/${type}/${slug}`}
                />
              ))}
            </div>
          </section>
        </div>
      </Layout>
    </>
  )
}

export async function getStaticProps() {
  return { props: { recent: getRecentContent(4) } }
}
