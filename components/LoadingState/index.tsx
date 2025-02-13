import { Card, CardContent, CardHeader } from '../ui/Card'

interface LoadingStateProps {
  type?: 'article' | 'project' | 'default'
  count?: number
}

export function LoadingState({ type = 'default', count = 3 }: LoadingStateProps) {
  if (type === 'article' || type === 'project') {
    return (
      <div className="grid gap-6 sm:grid-cols-2">
        {Array.from({ length: count }).map((_, i) => (
          <Card key={i} className="overflow-hidden animate-pulse">
            <CardHeader>
              <div className="space-y-3">
                {type === 'article' && (
                  <div className="w-24 h-4 bg-muted rounded" />
                )}
                <div className="w-3/4 h-6 bg-muted rounded" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="w-full h-4 bg-muted rounded" />
                <div className="w-2/3 h-4 bg-muted rounded" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-4 animate-pulse">
      <div className="h-8 w-3/4 bg-muted rounded" />
      <div className="space-y-2">
        <div className="h-4 w-full bg-muted rounded" />
        <div className="h-4 w-5/6 bg-muted rounded" />
        <div className="h-4 w-4/6 bg-muted rounded" />
      </div>
    </div>
  )
} 