import { Meta } from '../../components/SEO/Meta'
import { Layout } from '../../components/Layout'
import { ProjectCard } from '../../components/ProjectCard'
import projects from '../../content/projects.json'

export default function Projects() {
  return (
    <>
      <Meta
        title="Open Source Projects & Contributions"
        description="Exploring the intersection of web3, decentralized systems, and modern web development through practical, open-source solutions."
      />
      <Layout>
        <div className="space-y-8">
          <div className="max-w-3xl">
            <h1 className="text-4xl font-bold pb-4">Featured Projects</h1>
            <p className="text-xl text-muted-foreground leading-relaxed pb-8">
              A curated collection of open-source projects I&apos;ve worked on,
              focused on decentralized systems, web3 infrastructure, and 
              developer tools.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {projects.map((project) => (
              <ProjectCard
                key={project.title}
                title={project.title}
                description={project.description}
                href={project.href}
              />
            ))}
          </div>
        </div>
      </Layout>
    </>
  )
}
