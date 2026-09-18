import { Meta } from '../../components/SEO/Meta'
import { Layout } from '../../components/Layout'
import { ProjectCard } from '../../components/ProjectCard'
import { Text } from '../../components/ui/base'
import type { Project } from '../../utils/interfaces'
import projects from '../../content/projects.json'

export default function Projects() {
  return (
    <>
      <Meta
        title="Projects"
        description="Open source work by Edgar Barrantes Brais: Starknet developer tooling, decentralized storage, and small utilities."
      />
      <Layout>
        <div className="space-y-8">
          <div className="max-w-2xl space-y-3">
            <Text variant="h1">Projects</Text>
            <Text variant="subtle" className="text-lg">
              Open source work and side projects. Most of it is on GitHub.
            </Text>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {(projects as Project[]).map((project) => (
              <ProjectCard key={project.href} {...project} />
            ))}
          </div>
        </div>
      </Layout>
    </>
  )
}
