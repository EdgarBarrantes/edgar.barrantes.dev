import { Meta } from '../components/SEO/Meta'
import { Layout } from '../components/Layout'
import { Text } from '../components/ui/base'
import { useBackground } from '../contexts/BackgroundContext'
import { useEffect, useState } from 'react'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { XIcon } from 'lucide-react'
import { useRouter } from 'next/router'

export default function Playground() {
  const { backgroundType, setBackgroundType } = useBackground()
  const [showInfo, setShowInfo] = useState(true)
  const router = useRouter()

  // Reset background when leaving page if it was hangman
  useEffect(() => {
    // Set background type to hangman on initial page load
    setBackgroundType('kaleidoscope')

    return () => {
      // Always set background type to subtle on page unmount
      setBackgroundType('subtle')
    }
  }, [setBackgroundType]) // Empty dependency array ensures this runs only on mount and unmount

  return (
    <>
      <Meta
        title="Effects Playground"
        description="Experiment with different visual effects and animations."
      />
      <Layout fullWidth>
        <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center p-4">
          {showInfo && (
            <Card className="fixed top-16 right-4 left-4 md:left-auto md:w-96 z-50 bg-background/80 backdrop-blur">
              <div className="p-4 relative">
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute top-2 right-2"
                  onClick={() => setShowInfo(false)}
                >
                  <XIcon className="h-4 w-4" />
                </Button>
                <div className="space-y-4 pr-8">
                  <Text variant="h3">Welcome to the Playground!</Text>
                  <Text variant="subtle">
                    This is your space to experiment with different background effects.
                    Use the switcher in the top-right corner to change effects. Try the Hangman with your keyboard :)
                  </Text>
                </div>
              </div>
            </Card>
          )}
        </div>
      </Layout>
    </>
  )
} 