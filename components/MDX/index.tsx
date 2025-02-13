import { Text } from '../ui/base'
import { Card } from '../ui/Card'

interface MDXProps extends React.HTMLAttributes<HTMLElement> {
  className?: string
}

export const components = {
  h1: ({ className, ...props }: MDXProps) => (
    <Text variant="h1" className={`mt-8 mb-4 ${className || ''}`} {...props} />
  ),
  h2: ({ className, ...props }: MDXProps) => (
    <Text variant="h2" className={`mt-8 mb-4 ${className || ''}`} {...props} />
  ),
  h3: ({ className, ...props }: MDXProps) => (
    <Text variant="h3" className={`mt-6 mb-4 ${className || ''}`} {...props} />
  ),
  p: ({ className, ...props }: MDXProps) => (
    <Text className={`mb-4 leading-relaxed ${className || ''}`} {...props} />
  ),
  a: ({ href, className, ...props }: MDXProps & { href?: string }) => (
    <a
      className={`text-primary hover:underline ${className || ''}`}
      target={href?.startsWith('http') ? '_blank' : undefined}
      rel={href?.startsWith('http') ? 'noopener noreferrer' : undefined}
      href={href}
      {...props}
    />
  ),
  blockquote: ({ className, ...props }: MDXProps) => (
    <blockquote 
      className={`pl-4 border-l-4 border-primary/20 italic my-4 ${className || ''}`} 
      {...props} 
    />
  ),
  code: ({ className, ...props }: MDXProps) => (
    <code 
      className={`px-1.5 py-0.5 rounded-md bg-muted font-mono text-sm ${className || ''}`} 
      {...props} 
    />
  ),
  pre: ({ className, ...props }: MDXProps) => (
    <Card className={`my-6 overflow-x-auto ${className || ''}`}>
      <pre className="p-4 text-sm" {...props} />
    </Card>
  )
}

interface MDXContentProps {
  html: string
}

export function MDXContent({ html }: MDXContentProps) {
  return <div dangerouslySetInnerHTML={{ __html: html }} />
} 