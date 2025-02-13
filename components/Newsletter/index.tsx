import { useState } from 'react'
import { Button } from '../ui/Button'
import { Text } from '../ui/base'
import { Container } from '../ui/Container'

export function Newsletter() {
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus('loading')

    try {
      const response = await fetch('/api/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      })

      if (!response.ok) throw new Error('Subscription failed')
      
      setStatus('success')
      setEmail('')
    } catch (error) {
      setStatus('error')
    }
  }

  return (
    <Container size="sm">
      <div className="space-y-4">
        <Text variant="h1">Newsletter</Text>
        <Text variant="subtle" className="text-lg">
          Subscribe to get updates on software development, decentralized systems, and more.
        </Text>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="w-full px-4 py-2 border rounded-md bg-background"
            required
          />
          <Button 
            type="submit" 
            disabled={status === 'loading'}
            loading={status === 'loading'}
          >
            Subscribe
          </Button>

          {status === 'success' && (
            <Text variant="subtle" className="text-green-500">
              Thanks for subscribing!
            </Text>
          )}
          {status === 'error' && (
            <Text variant="subtle" className="text-destructive">
              Something went wrong. Please try again.
            </Text>
          )}
        </form>
      </div>
    </Container>
  )
}
