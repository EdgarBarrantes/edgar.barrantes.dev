import { createContext, useContext, useState, ReactNode } from 'react'
import type { BackgroundType } from '../components/BackgroundSwitcher'

interface BackgroundContextType {
  backgroundType: BackgroundType
  setBackgroundType: (type: BackgroundType) => void
}

const BackgroundContext = createContext<BackgroundContextType | undefined>(undefined)

export function BackgroundProvider({ children }: { children: ReactNode }) {
  const [backgroundType, setBackgroundType] = useState<BackgroundType>('subtle')

  return (
    <BackgroundContext.Provider value={{ backgroundType, setBackgroundType }}>
      {children}
    </BackgroundContext.Provider>
  )
}

export function useBackground() {
  const context = useContext(BackgroundContext)
  if (context === undefined) {
    throw new Error('useBackground must be used within a BackgroundProvider')
  }
  return context
} 