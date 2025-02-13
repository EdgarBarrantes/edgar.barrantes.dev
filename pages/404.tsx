import { Meta } from '../components/SEO/Meta'
import { Layout } from '../components/Layout'
import { Text } from '../components/ui/base'
import { Button } from '../components/ui/Button'
import Link from 'next/link'
import { HomeIcon, BookIcon, LightbulbIcon, CodeIcon } from 'lucide-react'

const navigationLinks = [
  {
    href: '/',
    Icon: HomeIcon,
    text: 'Home',
    description: 'Return to the homepage'
  },
  {
    href: '/thoughts',
    Icon: BookIcon,
    text: 'Thoughts',
    description: 'Read my articles and insights'
  },
  {
    href: '/til',
    Icon: LightbulbIcon,
    text: 'TIL',
    description: 'Explore daily tech learnings'
  },
  {
    href: '/projects',
    Icon: CodeIcon,
    text: 'Projects',
    description: 'View my open source work'
  }
]

export default function Custom404() {
  return (
    <>
      <Meta
        title="404 - Page Not Found"
        description="The page you&apos;re looking for doesn&apos;t exist. But don&apos;t worry, you can find lots of other great content on my site."
      />
      <Layout>
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] text-center px-4">
          <div className="space-y-6 max-w-2xl">
            <Text variant="h1">404 - Page Not Found</Text>
            <Text variant="subtle" className="text-lg">
              Oops! The page you&apos;re looking for seems to have wandered off into the digital void.
              But don&apos;t worry, there&apos;s plenty more to explore!
            </Text>

            <div className="grid gap-4 sm:grid-cols-2 mt-8">
              {navigationLinks.map(({ href, Icon, text, description }) => (
                <Link key={href} href={href} className="group">
                  <Button
                    variant="outline"
                    className="w-full h-auto p-4 space-y-2"
                  >
                    <div className="flex flex-col gap-2 items-center">
                      <div className="flex items-center gap-2">
                        <Icon className="w-5 h-5 transition-transform group-hover:scale-110" />
                        <span className="font-medium">{text}</span>
                      </div>
                      <Text variant="subtle" className="text-sm">
                        {description}
                      </Text>
                    </div>
                  </Button>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </Layout>
    </>
  )
} 