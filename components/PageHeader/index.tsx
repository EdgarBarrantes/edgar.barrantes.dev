import { ReactNode } from 'react'
import { Text } from '../ui/base'

interface PageHeaderProps {
  title: string
  description?: ReactNode
}

export function PageHeader({ title, description }: PageHeaderProps) {
  return (
    <div className="max-w-2xl space-y-2">
      <Text variant="h1">{title}</Text>
      {description && (
        <Text variant="subtle" className="text-lg">
          {description}
        </Text>
      )}
    </div>
  )
} 