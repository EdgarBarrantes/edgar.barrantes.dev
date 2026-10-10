import dynamic from 'next/dynamic'
import { useState } from 'react'
import { XIcon } from 'lucide-react'
import { Meta } from '../components/SEO/Meta'
import { Layout } from '../components/Layout'
import { Text } from '../components/ui/base'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { BackgroundSwitcher, type BackgroundType } from '../components/BackgroundSwitcher'

const AnimatedBackground = dynamic(
  () => import('../components/AnimatedBackground').then((m) => m.AnimatedBackground),
  { ssr: false }
)

export default function Playground() {
  const [type, setType] = useState<BackgroundType>('kaleidoscope')
  const [showInfo, setShowInfo] = useState(true)

  return (
    <>
      <Meta title="Playground" description="Canvas background effects and a hangman game." noIndex />
      <Layout fullWidth>
        <AnimatedBackground type={type} />
        <div className="min-h-[calc(100vh-4rem)]" />
        <div className="fixed top-20 right-4 z-40 flex items-start gap-2">
          {showInfo && (
            <Card className="w-72 bg-background/80 backdrop-blur">
              <div className="relative p-4 pr-10 space-y-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-1 right-1 h-8 w-8"
                  onClick={() => setShowInfo(false)}
                  aria-label="Close"
                >
                  <XIcon className="h-4 w-4" />
                </Button>
                <Text variant="h3" className="text-lg">Playground</Text>
                <Text variant="subtle">
                  Canvas experiments. Pick an effect with the button on the right. The hangman game takes keyboard input.
                </Text>
              </div>
            </Card>
          )}
          <div className="rounded-md bg-background/80 backdrop-blur">
            <BackgroundSwitcher value={type} onChange={setType} showHangman />
          </div>
        </div>
      </Layout>
    </>
  )
}
