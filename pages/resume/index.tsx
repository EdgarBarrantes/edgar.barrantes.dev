import { GithubIcon, LinkedinIcon, PrinterIcon } from 'lucide-react'
import { Meta } from '../../components/SEO/Meta'
import { Layout } from '../../components/Layout'
import { Card } from '../../components/ui/Card'
import { Button } from '../../components/ui/Button'
import { Text } from '../../components/ui/base'

const experiences = [
  {
    title: 'Software Engineer',
    company: 'Nethermind',
    period: 'Jul 2022 – May 2026',
    description: [
      'Wrote Cairo and Noir day to day across Starknet, Aztec and other zero-knowledge stacks.',
      'Designed and deployed the infrastructure behind several of these projects, and operated them in production.',
      'Built and maintained the Starknet Remix plugin: write, compile, deploy and interact with Cairo contracts from the browser.',
      'Backend services and CI pipelines in Rust and TypeScript.',
      'Worked with other teams on Solidity contracts and shared engineering practices.',
    ],
  },
  {
    title: 'Software Developer, freelance',
    company: 'Self-employed',
    period: 'Sep 2017 – Present',
    description: [
      'Won the Fair Data Society Gitcoin hackathon with a Wikipedia to Swarm uploader.',
      'REST and GraphQL APIs with Node.js and Nest.js.',
      'Full-stack products with PostgreSQL, React and Next.js in TypeScript.',
      'Ran Solidity workshops and software fundamentals training.',
    ],
  },
  {
    title: 'Software Developer',
    company: 'WalletConnect',
    period: 'May 2021 – Oct 2021',
    description: [
      'Built the service for API key creation and delivery with PostgreSQL and Next.js.',
      'Developed the registry that stores and exposes service data.',
      'Contributed WalletConnect 2.0 examples and documentation.',
      'Wrote Supabase and React libraries on top of SWR.',
    ],
  },
  {
    title: 'Software Developer',
    company: 'First Factory',
    period: 'Nov 2019 – Apr 2021',
    description: [
      'Led financial sector projects for customer account management.',
      'Data visualization with Nest.js and React.',
      'Mentored junior developers and ran technical interviews.',
      'Internal tooling for employee data.',
    ],
  },
  {
    title: 'Software Developer',
    company: 'Accenture',
    period: 'Jan 2019 – Nov 2019',
    description: [
      'Led development of an internal social network from inception.',
      'Managed the developer team and technical decisions.',
      'TypeScript on both ends (React and Node) plus Drupal.',
    ],
  },
  {
    title: 'Software Developer',
    company: 'Estudio Manatí',
    period: 'Aug 2015 – Sep 2017',
    description: [
      'Full-stack work in JavaScript, TypeScript, React and PHP.',
      'Drupal, MySQL and Docker in agile teams, remote and on site.',
    ],
  },
]

const skills = {
  'Zero-knowledge and blockchain': ['Cairo', 'Noir', 'Starknet', 'Aztec', 'Ethereum', 'Smart contracts'],
  Languages: ['TypeScript', 'Rust', 'Solidity', 'JavaScript', 'PHP'],
  Infrastructure: ['AWS', 'Docker', 'CI/CD', 'PostgreSQL', 'MySQL', 'Git', 'Supabase'],
  Web: ['React', 'Next.js', 'Node.js', 'Nest.js', 'GraphQL', 'TypeORM'],
}

const education = [
  { degree: 'Computer Science', institution: 'Universidad de Costa Rica', period: '2015' },
  { degree: 'Physics', institution: 'Universidad de Costa Rica', period: '2012 – 2015' },
]

export default function Resume() {
  return (
    <>
      <Meta
        title="Resume"
        description="Resume of Edgar Barrantes Brais, software engineer: zero-knowledge in Cairo and Noir across Starknet and Aztec at Nethermind, and full-stack TypeScript at WalletConnect, Accenture and First Factory."
      />
      <Layout>
        <div className="space-y-10">
          <div className="space-y-4">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <Text variant="h1">Edgar Barrantes Brais</Text>
                <Text variant="subtle" className="text-base">Software Engineer · Costa Rica</Text>
              </div>
              <div className="print:hidden flex flex-wrap gap-3">
                <Button variant="outline" size="sm" asChild>
                  <a href="https://github.com/edgarbarrantes" target="_blank" rel="noopener noreferrer">
                    <GithubIcon className="w-4 h-4 mr-2" aria-hidden="true" />
                    GitHub
                  </a>
                </Button>
                <Button variant="outline" size="sm" asChild>
                  <a href="https://www.linkedin.com/in/edgar-barrantes/" target="_blank" rel="noopener noreferrer">
                    <LinkedinIcon className="w-4 h-4 mr-2" aria-hidden="true" />
                    LinkedIn
                  </a>
                </Button>
                <Button variant="outline" size="sm" onClick={() => window.print()}>
                  <PrinterIcon className="w-4 h-4 mr-2" aria-hidden="true" />
                  Save as PDF
                </Button>
              </div>
            </div>
            <Text variant="subtle" className="text-lg max-w-2xl">
              Software engineer with over ten years of experience, the last
              four in zero-knowledge at Nethermind. I work in Cairo and Noir,
              the languages that sit on top of the Starknet and Aztec proving
              systems, and I design, deploy and operate the infrastructure
              around them. Full-stack in TypeScript and Rust.
            </Text>
            <p className="hidden print:block text-sm">
              edgar@barrantes.dev · github.com/edgarbarrantes · linkedin.com/in/edgar-barrantes · edgar.barrantes.dev
            </p>
          </div>

          <section className="space-y-4">
            <Text variant="h2">Experience</Text>
            <div className="grid gap-4">
              {experiences.map((exp) => (
                <Card key={`${exp.company}-${exp.period}`} className="card p-6">
                  <div className="space-y-3">
                    <div className="flex flex-wrap justify-between gap-x-4 gap-y-1">
                      <div>
                        <Text variant="h3" className="text-xl">{exp.title}</Text>
                        <Text variant="subtle" className="text-base">{exp.company}</Text>
                      </div>
                      <Text variant="subtle" className="text-sm">{exp.period}</Text>
                    </div>
                    <ul className="list-disc pl-5 space-y-1 text-sm text-muted-foreground">
                      {exp.description.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </Card>
              ))}
            </div>
          </section>

          <section className="space-y-4">
            <Text variant="h2">Skills</Text>
            <Card className="card p-6">
              <div className="grid md:grid-cols-2 gap-6">
                {Object.entries(skills).map(([category, items]) => (
                  <div key={category} className="space-y-2">
                    <Text variant="h3" className="text-base">{category}</Text>
                    <div className="flex flex-wrap gap-2">
                      {items.map((skill) => (
                        <span key={skill} className="rounded-full bg-muted px-2.5 py-0.5 text-sm">
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </section>

          <section className="space-y-4">
            <Text variant="h2">Education</Text>
            <Card className="card p-6">
              <div className="space-y-4">
                {education.map((edu) => (
                  <div key={edu.degree} className="flex flex-wrap justify-between gap-x-4 gap-y-1">
                    <div>
                      <Text variant="h3" className="text-xl">{edu.degree}</Text>
                      <Text variant="subtle" className="text-base">{edu.institution}</Text>
                    </div>
                    <Text variant="subtle" className="text-sm">{edu.period}</Text>
                  </div>
                ))}
              </div>
            </Card>
          </section>
        </div>
      </Layout>
    </>
  )
}
