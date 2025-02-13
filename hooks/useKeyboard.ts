import { useEffect, useCallback } from 'react'

interface KeyboardOptions {
  key: string
  callback: () => void
  ctrl?: boolean
  alt?: boolean
  shift?: boolean
}

export function useKeyboard({ key, callback, ctrl, alt, shift }: KeyboardOptions) {
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      const matchesKey = event.key.toLowerCase() === key.toLowerCase()
      const matchesCtrl = ctrl ? event.ctrlKey : true
      const matchesAlt = alt ? event.altKey : true
      const matchesShift = shift ? event.shiftKey : true

      if (matchesKey && matchesCtrl && matchesAlt && matchesShift) {
        event.preventDefault()
        callback()
      }
    },
    [key, callback, ctrl, alt, shift]
  )

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])
} 