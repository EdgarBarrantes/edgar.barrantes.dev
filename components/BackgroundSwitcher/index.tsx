import { Button } from '../ui/Button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../ui/dropdown-menu'
import { Grid, Hexagon, Sparkles, CircleDot, Orbit, Flower, XCircle, Waves, Infinity, Boxes } from 'lucide-react'
import { useTheme } from 'next-themes'
import { useState, useEffect } from 'react'

export type BackgroundType = 'none' | 'hexagons' | 'grid' | 'sparkles' | 'vortex' | 'neural' | 'kaleidoscope' | 'subtle' | 'psychedelic' | 'wormhole' | 'calming' | 'hangman'

// Define which effects work well on mobile
const mobileCompatibleEffects: BackgroundType[] = ['none', 'subtle', 'psychedelic', 'kaleidoscope', 'wormhole', 'calming']

// Define base backgrounds
const baseBackgrounds: BackgroundType[] = ['none', 'subtle', 'calming', 'hexagons', 'grid', 'sparkles', 'vortex', 'neural', 'kaleidoscope', 'psychedelic', 'wormhole']

const backgroundIcons = {
  none: XCircle,
  hexagons: Hexagon,
  grid: Grid,
  sparkles: Sparkles,
  vortex: CircleDot,
  neural: Orbit,
  kaleidoscope: Flower,
  subtle: Waves,
  psychedelic: Infinity,
  wormhole: Boxes,
  calming: Waves,
  hangman: CircleDot
} as const

const backgroundLabels = {
  none: 'No Effect',
  hexagons: 'Hexagons',
  grid: 'Grid',
  sparkles: 'Sparkles',
  vortex: 'Vortex',
  neural: 'Neural',
  kaleidoscope: 'Kaleidoscope',
  subtle: 'Subtle',
  psychedelic: 'Psychedelic',
  wormhole: 'Wormhole',
  calming: 'Calming',
  hangman: 'Hangman Game'
} as const

interface BackgroundSwitcherProps {
  value: BackgroundType
  onChange: (type: BackgroundType) => void
  showHangman?: boolean
}

export function BackgroundSwitcher({ value, onChange, showHangman = false }: BackgroundSwitcherProps) {
  const [open, setOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const { theme } = useTheme()
  const isDark = theme === 'dark'

  useEffect(() => {
    // Check if we're on mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Combine base backgrounds with hangman if enabled
  const backgrounds: BackgroundType[] = showHangman ? [...baseBackgrounds, 'hangman'] : baseBackgrounds

  const current = backgrounds.find(bg => bg === value)
  if (!current) return null

  const Icon = backgroundIcons[current]

  // Filter backgrounds based on device
  const availableBackgrounds = backgrounds.filter(bg => 
    !isMobile || mobileCompatibleEffects.includes(bg)
  )

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className={isDark ? 'hover:text-primary' : undefined}
        >
          <Icon className="h-5 w-5" />
          <span className="sr-only">Change background effect</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {availableBackgrounds.map(bg => {
          const BgIcon = backgroundIcons[bg]
          return (
            <DropdownMenuItem
              key={bg}
              onClick={() => {
                onChange(bg)
                setOpen(false)
              }}
            >
              <BgIcon className="mr-2 h-4 w-4" />
              <span>{backgroundLabels[bg]}</span>
              {isMobile && !mobileCompatibleEffects.includes(bg) && (
                <span className="ml-2 text-xs text-muted-foreground">(Desktop only)</span>
              )}
            </DropdownMenuItem>
          )
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  )
} 