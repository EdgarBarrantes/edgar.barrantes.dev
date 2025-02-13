import { Meta } from '../components/SEO/Meta'
import { Layout } from '../components/Layout'
import { Info } from '../components/Info'
import Link from 'next/link'
import { Card } from '../components/ui/Card'
import { Text } from '../components/ui/base'

export default function Home() {
  return (
    <>
      <Meta
        title="Edgar Barrantes - Software Engineer & Blockchain Developer"
        description="Edgar Barrantes is a software engineer specializing in decentralized systems and blockchain technology. Currently building at Nethermind, with expertise in TypeScript, Next.js, and Web3 development. Passionate about creating innovative solutions and sharing knowledge through technical writing."
        keywords={[
          "Edgar Barrantes",
          "Edgar Barrantes Brais",
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
          "Artificial Intelligence",
          "Costa Rica",
          "Software Development",
          "Web Development",
        ]}
      />
      <Layout>
        <div className="space-y-12">
          <div className="flex items-center justify-center rounded">
            <Info />
          </div>

          <div className="max-w-4xl mx-auto space-y-8">
            <section>
              <Text variant="h2" className="mb-4">
                Latest Content
              </Text>
              <div className="grid gap-4 md:grid-cols-2">
                <Link href="/til" className="group">
                  <Card className="p-6 transition-all duration-200 group-hover:shadow-md bg-white/70 dark:bg-black/70">
                    <Text variant="h3" className="mb-2">
                      Today I Learned
                    </Text>
                    <Text variant="subtle">
                      Discover bite-sized tech learnings and daily insights from
                      my software engineering journey.
                    </Text>
                  </Card>
                </Link>
                <Link href="/thoughts" className="group">
                  <Card className="p-6 transition-all duration-200 group-hover:shadow-md bg-white/70 dark:bg-black/70">
                    <Text variant="h3" className="mb-2">
                      Thoughts
                    </Text>
                    <Text variant="subtle">
                      In-depth articles about software development, blockchain,
                      and tech insights.
                    </Text>
                  </Card>
                </Link>
              </div>
            </section>

            <section>
              <Text variant="h2" className="mb-4">
                Featured Projects
              </Text>
              <Link href="/projects" className="block group">
                <Card className="p-6 transition-all duration-200 group-hover:shadow-md bg-white/70 dark:bg-black/70">
                  <Text variant="h3" className="mb-2">
                    Open Source Work
                  </Text>
                  <Text variant="subtle">
                    Explore my contributions to decentralized systems, web3
                    infrastructure, and developer tools.
                  </Text>
                </Card>
              </Link>
            </section>
          </div>
        </div>
      </Layout>
    </>
  );
}
