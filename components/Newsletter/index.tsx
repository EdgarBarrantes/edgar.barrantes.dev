import { Container } from '../ui/Container'

export function Newsletter() {
  return (
    <Container size="sm">
      <iframe 
        src="https://embeds.beehiiv.com/c0079f72-4935-48f5-9353-607a56544707" 
        data-test-id="beehiiv-embed" 
        width="100%" 
        height="320" 
        frameBorder="0" 
        scrolling="no" 
        style={{
          borderRadius: '4px',
          border: '2px solid var(--border)',
          margin: '0',
          backgroundColor: 'transparent'
        }}
      />
    </Container>
  )
}
