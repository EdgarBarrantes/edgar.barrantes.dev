import Link from 'next/link'
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
      'Built developer tooling for the Starknet and Aztec ecosystems, including the Starknet Remix plugin, which lets developers compile, deploy and interact with Cairo contracts from the browser IDE (React/TypeScript).',
      'Worked with the cryptography team on implementations of zero-knowledge proof systems in Cairo and Noir, and delivered proofs of concept and feasibility research across several distributed teams.',
      'Built ETL workflows over blockchain data and contributed Rust to infrastructure and CI/CD pipelines.',
      'Ran the servers for several of these projects.',
      'Maintained the company Discourse server and took part in onboarding and offboarding.',
    ],
  },
  {
    title: 'Software Developer (freelance)',
    company: 'Self-employed',
    period: 'Oct 2017 to Present',
    location: 'Remote',
    description: [
      'Built REST and GraphQL APIs with Node.js/Nest and PostgreSQL, and React/Next.js frontends, for client projects.',
      'Won the Fair Data Society hackathon (Gitcoin) with a Wikipedia-to-Swarm uploader.',
      'Managed Linux servers and networking for client infrastructure; ran Solidity workshops and software fundamentals training.',
    ],
  },
  {
    title: 'Software Developer',
    company: 'WalletConnect',
    period: 'May 2021 to Oct 2021',
    location: 'Remote',
    description: [
      'Built the API key infrastructure and service registry for WalletConnect Cloud at its start, using PostgreSQL and Next.js.',
      'Wrote Supabase and React data-fetching libraries on top of SWR.',
      'Wrote examples and documentation for the WalletConnect 2.0 launch.',
    ],
  },
  {
    title: 'Software Developer',
    company: 'First Factory',
    period: 'Nov 2019 to Apr 2021',
    location: 'Remote',
    description: [
      'Shipped features for financial sector applications with Nest.js backends, React frontends and PostgreSQL, all in TypeScript.',
      'Deployed auto-scaling and serverless workloads on AWS.',
      'Built internal tooling for employee data management and reporting; mentored junior developers and interviewed candidates.',
    ],
  },
  {
    title: 'Web Developer',
    company: 'Accenture',
    period: 'Jan 2019 to Nov 2019',
    location: 'Costa Rica',
    description: [
      'Led development of an internal knowledge-sharing platform from inception to delivery (React, Node, headless Drupal), owning technical decisions and coordinating the developer team.',
    ],
  },
  {
    title: 'Web Developer',
    company: 'Estudio Manatí',
    period: 'Aug 2015 to Sep 2017',
    location: 'Costa Rica',
    description: [
      'Full-stack development with JavaScript, AngularJS, PHP and Drupal for client projects, in agile teams.',
    ],
  },
]

const openSource = [
  {
    name: 'homelab',
    href: 'https://github.com/EdgarBarrantes/homelab',
    description:
      'Guided installer and CLI that provision a Linux server with a dozen self-hosted services as Docker Compose stacks, private by default (Tailscale, one wildcard TLS certificate, no open ports), with nightly backups and a rebuild-from-backup path tested end to end in a VM.',
  },
  {
    name: 'open-webui-kiwix',
    href: 'https://github.com/EdgarBarrantes/open-webui-kiwix',
    description: 'Open WebUI tool that lets a local AI search and cite an offline Kiwix library.',
  },
  {
    name: 'Home Assistant integrations',
    href: 'https://github.com/EdgarBarrantes',
    description:
      'Two early integrations for infrared control, written for my own setup: ha-flipper-infrared (a USB Flipper Zero as an infrared emitter) and ha-gree-ifeel (a Gree air conditioner regulating to any room thermometer).',
  },
]

const skills = [
  ['Languages', 'TypeScript, JavaScript, Python, Rust, Solidity, Cairo, PHP'],
  ['Backend', 'Node.js, Nest.js, REST and GraphQL APIs, PostgreSQL, TypeORM, Supabase'],
  ['Frontend', 'React, Next.js'],
  ['Infrastructure', 'AWS, Docker, Linux, CI/CD pipelines, Git'],
  ['Automation', 'Bash, Home Assistant'],
  ['Zero-knowledge', 'Cairo, Noir, Starknet, Aztec'],
  ['Spoken languages', 'English and Spanish (fluent), French (learning), Bulgarian (basic)'],
]

const education = [
  ['Computer Science', 'Universidad de Costa Rica'],
  ['Physics (foundational coursework)', 'Universidad de Costa Rica'],
]

// On screen the short label; on paper the address itself, since nothing is clickable there.
const contacts = [
  { href: 'mailto:edgar@barrantes.dev', text: 'edgar@barrantes.dev', printed: 'edgar@barrantes.dev' },
  { href: 'https://github.com/edgarbarrantes', text: 'GitHub', printed: 'github.com/EdgarBarrantes' },
  { href: 'https://www.linkedin.com/in/edgar-barrantes/', text: 'LinkedIn', printed: 'linkedin.com/in/edgar-barrantes' },
]

// Facts in two columns: a label on the left, the value on the right. Prints as it reads.
function Facts({ rows }: { rows: string[][] }) {
  return (
    <dl className="grid gap-x-8 gap-y-3 print:gap-y-1 sm:grid-cols-[13rem_1fr] print:grid-cols-[10.5rem_1fr]">
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
        <div className="space-y-16 print:space-y-5">
          <header className="space-y-6 print:space-y-3">
            <div className="space-y-2 print:space-y-1">
              <Text variant="h1" className="text-[2.75rem] leading-none">Edgar Barrantes Brais</Text>
              <p className="font-serif text-xl">Senior Full-Stack Engineer: TypeScript, Node.js, React</p>
              <p className="text-sm text-muted-foreground">
                Open to remote roles in Europe.
              </p>
            </div>
            <p className="copy max-w-prose text-foreground/85">
              Software engineer with about ten years of experience. Full-stack in TypeScript
              (Node.js/Nest, React/Next.js, PostgreSQL), with four years in zero-knowledge at
              Nethermind working in Cairo and Noir on Starknet and Aztec. Builds developer
              tooling, API infrastructure and integrations.
            </p>
            <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
              {contacts.map(({ href, text, printed }) => (
                <li key={href}>
                  <a
                    href={href}
                    className="link"
                    target={href.startsWith('mailto') ? undefined : '_blank'}
                    rel={href.startsWith('mailto') ? undefined : 'noopener noreferrer'}
                  >
                    <span className="print:hidden">{text}</span>
                    <span className="hidden print:inline">{printed}</span>
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

          <section className="space-y-8 print:space-y-3">
            <Text variant="h2" className="text-2xl">Experience</Text>
            <ul className="space-y-10 print:space-y-4">
              {experiences.map((exp) => (
                <li
                  key={`${exp.company}-${exp.period}`}
                  className="grid gap-x-8 gap-y-2 print:gap-y-1 sm:grid-cols-[13rem_1fr] print:grid-cols-[10.5rem_1fr]"
                >
                  <div className="text-sm text-muted-foreground sm:pt-1">
                    <p className="tabular-nums">{exp.period}</p>
                    <p>{exp.location}</p>
                  </div>
                  <div className="space-y-3 print:space-y-1">
                    <h3 className="text-xl font-semibold tracking-tight">
                      {exp.title}
                      <span className="font-normal text-muted-foreground">, {exp.company}</span>
                    </h3>
                    <ul className="copy max-w-prose list-disc space-y-1 print:space-y-0.5 pl-5 text-foreground/85 marker:text-muted-foreground">
                      {exp.description.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          <section className="space-y-8 print:space-y-3">
            <Text variant="h2" className="text-2xl">Open source</Text>
            <ul className="space-y-6 print:space-y-2">
              {openSource.map((p) => (
                <li
                  key={p.name}
                  className="grid gap-x-8 gap-y-1 sm:grid-cols-[13rem_1fr] print:grid-cols-[10.5rem_1fr]"
                >
                  <h3 className="text-sm font-semibold sm:pt-0.5">
                    <a href={p.href} target="_blank" rel="noopener noreferrer" className="link decoration-transparent hover:decoration-moss">
                      {p.name}
                    </a>
                  </h3>
                  <p className="copy max-w-prose text-foreground/85">{p.description}</p>
                </li>
              ))}
            </ul>
            <p className="text-sm text-muted-foreground">
              <span className="print:hidden">
                More on the <Link href="/projects" className="link">projects page</Link>.
              </span>
              <span className="hidden print:inline">More at edgar.barrantes.dev/projects</span>
            </p>
          </section>

          <section className="space-y-6 print:space-y-3">
            <Text variant="h2" className="text-2xl">Skills</Text>
            <Facts rows={skills} />
          </section>

          <section className="space-y-6 print:space-y-3">
            <Text variant="h2" className="text-2xl">Education</Text>
            <Facts rows={education} />
          </section>
        </div>
      </Layout>
    </>
  )
}
