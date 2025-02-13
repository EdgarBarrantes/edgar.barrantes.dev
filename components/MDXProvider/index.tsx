import { MDXProvider as BaseMDXProvider } from '@mdx-js/react'
import { components } from '../MDX'
import { ReactNode } from 'react'

interface MDXProviderProps {
  children: ReactNode
}

export function MDXProvider({ children }: MDXProviderProps) {
  return (
    <BaseMDXProvider components={components}>
      {children}
    </BaseMDXProvider>
  )
} 