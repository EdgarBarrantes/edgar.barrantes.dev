import { Meta } from '../../components/SEO/Meta'
import { Layout } from '../../components/Layout'
import { ProjectItem } from '../../components/ProjectItem'
import { Text } from '../../components/ui/base'
import type { Project } from '../../utils/interfaces'
import projects from '../../content/projects.json'

export default function Projects() {
  return (
    <>
      <Meta
        title="Projects"
        description="Open source work by Edgar Barrantes Brais: self-hosting and Home Assistant tools, Starknet and Cairo developer tooling, and small utilities."
      />
      <Layout>
        <div className="space-y-12">
          <div className="max-w-prose space-y-3">
            <Text variant="h1">Projects</Text>
            <p className="copy text-muted-foreground">
              Open source work and side projects, newest first. Most of it is on GitHub.
            </p>
          </div>
          <ul className="space-y-10">
            {(projects as Project[]).map((project) => (
              <ProjectItem key={project.href} {...project} />
            ))}
          </ul>
        </div>
      </Layout>
    </>
  )
}
