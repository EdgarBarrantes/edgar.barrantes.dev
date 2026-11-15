import { Meta } from '../../components/SEO/Meta'
import { Layout } from '../../components/Layout'
import { Text } from '../../components/ui/base'

const experiences = [
  {
    title: 'Software Engineer',
    company: 'Nethermind',
    period: 'Jul 2022 to May 2026',
    location: 'Remote',
    description: [
      'Wrote Cairo and Noir day to day across Starknet, Aztec and other zero-knowledge stacks.',
      'Ran the servers for several of these projects.',
      'Built and maintained the Starknet Remix plugin: write, compile, deploy and interact with Cairo contracts from the browser.',
      'Backend services and CI pipelines in Rust and TypeScript.',
      'Worked with other teams on Solidity contracts and shared engineering practices.',
      'Maintained the company Discourse server and took part in onboarding and offboarding.',
    ],
  },
  {
    title: 'Software Developer (freelance)',
    company: 'Self-employed',
    period: 'Oct 2017 to Present',
    location: 'Remote',
    description: [
      'Won the Fair Data Society Gitcoin hackathon with a Wikipedia to Swarm uploader.',
      'REST and GraphQL APIs with Node.js and Nest.js.',
      'Full-stack products with PostgreSQL, React and Next.js in TypeScript.',
      'Ran Solidity workshops and software fundamentals training.',
      'Managed Linux servers and networking for client infrastructure.',
    ],
  },
  {
    title: 'Software Developer',
    company: 'WalletConnect',
    period: 'May 2021 to Oct 2021',
    location: 'Remote',
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
    period: 'Nov 2019 to Apr 2021',
    location: 'Remote',
    description: [
      'Led financial sector projects for customer account management.',
      'Data visualization with Nest.js and React.',
      'Mentored junior developers and ran technical interviews.',
      'Internal tooling for employee data.',
      'Deployed auto-scaling and serverless workloads on AWS.',
    ],
  },
  {
    title: 'Web Developer',
    company: 'Accenture',
    period: 'Jan 2019 to Nov 2019',
    location: 'Costa Rica',
    description: [
      'Led development of an internal social network from inception.',
      'Managed the developer team and technical decisions.',
      'TypeScript on both ends (React and Node) plus Drupal.',
    ],
  },
  {
    title: 'Web Developer',
    company: 'Estudio Manatí',
    period: 'Aug 2015 to Sep 2017',
    location: 'Costa Rica',
    description: [
      'Full-stack work in JavaScript, TypeScript, React and PHP.',
      'Drupal, MySQL and Docker in agile teams, remote and on site.',
    ],
  },
]

const skills = [
  ['Languages', 'TypeScript, Rust, Python, Solidity, JavaScript, PHP'],
  ['Web', 'React, Next.js, Node.js, Nest.js, GraphQL, TypeORM'],
  ['Infrastructure', 'AWS, Docker, CI/CD, PostgreSQL, MySQL, Git, Supabase, Home Assistant'],
  ['Zero-knowledge and blockchain', 'Cairo, Noir, Starknet, Aztec, Ethereum, Smart contracts'],
]

const education = [
  ['Computer Science', 'Universidad de Costa Rica'],
  ['Physics (foundational coursework)', 'Universidad de Costa Rica'],
]

const spokenLanguages = 'English and Spanish (fluent), French (learning), Bulgarian (basic).'

const contacts = [
  { href: 'mailto:edgar@barrantes.dev', text: 'edgar@barrantes.dev' },
  { href: 'https://github.com/edgarbarrantes', text: 'GitHub' },
  { href: 'https://www.linkedin.com/in/edgar-barrantes/', text: 'LinkedIn' },
]

// Facts in two columns: a label on the left, the value on the right. Prints as it reads.
function Facts({ rows }: { rows: string[][] }) {
  return (
    <dl className="grid gap-x-8 gap-y-3 sm:grid-cols-[13rem_1fr]">
      {rows.map(([label, value]) => (
        <div key={label} className="contents">
          <dt className="text-sm text-muted-foreground sm:pt-0.5">{label}</dt>
          <dd className="copy">{value}</dd>
        </div>
      ))}
    </dl>
  )
}

export default function Resume() {
  return (
    <>
      <Meta
        title="Resume"
        description="Resume of Edgar Barrantes Brais, senior full-stack engineer: TypeScript across the stack, developer tooling and integrations, and four years in zero-knowledge (Cairo and Noir on Starknet and Aztec) at Nethermind."
      />
      <Layout>
        <div className="space-y-16">
          <header className="space-y-6">
            <div className="space-y-2">
              <Text variant="h1" className="text-[2.75rem] leading-none">Edgar Barrantes Brais</Text>
              <p className="font-serif text-xl">Senior Full-Stack Engineer</p>
              <p className="text-sm text-muted-foreground">
                Bulgaria. Remote, European time zone. Open to remote roles in Europe.
              </p>
            </div>
            <p className="copy max-w-prose text-foreground/85">
              Software engineer with about ten years of experience. Full-stack in TypeScript
              (Node.js/Nest, React/Next.js, PostgreSQL), with four years in zero-knowledge at
              Nethermind working in Cairo and Noir on Starknet and Aztec. Builds developer
              tooling, API infrastructure and integrations. Based in Bulgaria.
            </p>
            <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
              {contacts.map(({ href, text }) => (
                <li key={href}>
                  <a
                    href={href}
                    className="link"
                    target={href.startsWith('mailto') ? undefined : '_blank'}
                    rel={href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                  >
                    {text}
                  </a>
                </li>
              ))}
              <li className="print:hidden">
                <button type="button" onClick={() => window.print()} className="link">
                  Save as PDF
                </button>
              </li>
              <li className="hidden print:block">edgar.barrantes.dev</li>
            </ul>
          </header>

          <section className="space-y-8">
            <Text variant="h2" className="text-2xl">Experience</Text>
            <ul className="space-y-10">
              {experiences.map((exp) => (
                <li key={`${exp.company}-${exp.period}`} className="grid gap-x-8 gap-y-2 sm:grid-cols-[13rem_1fr]">
                  <div className="text-sm text-muted-foreground sm:pt-1">
                    <p className="tabular-nums">{exp.period}</p>
                    <p>{exp.location}</p>
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-xl font-semibold tracking-tight">
                      {exp.title}
                      <span className="font-normal text-muted-foreground">, {exp.company}</span>
                    </h3>
                    <ul className="copy max-w-prose list-disc space-y-1 pl-5 text-foreground/85 marker:text-muted-foreground">
                      {exp.description.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <section className="space-y-6">
            <Text variant="h2" className="text-2xl">Skills</Text>
            <Facts rows={skills} />
          </section>

          <section className="space-y-6">
            <Text variant="h2" className="text-2xl">Education</Text>
            <Facts rows={education} />
          </section>

          <section className="space-y-6">
            <Text variant="h2" className="text-2xl">Spoken languages</Text>
            <p className="copy">{spokenLanguages}</p>
          </section>
        </div>
      </Layout>
    </>
  )
}
