import { Component, ReactNode } from 'react'
import { Card, CardContent, CardFooter, CardHeader } from '../ui/Card'
import { Text } from '../ui/base'
import { Button } from '../ui/Button'
import { AlertTriangleIcon, RefreshCwIcon } from 'lucide-react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: undefined })
  }

  private handleReload = () => {
    window.location.reload()
  }

  public render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <Card className="mx-auto max-w-lg">
          <CardHeader>
            <div className="flex items-center gap-3">
              <AlertTriangleIcon className="h-6 w-6 text-destructive" />
              <Text variant="h2">Something went wrong</Text>
            </div>
          </CardHeader>
          <CardContent className="space-y-2">
            <Text>
              An unexpected error occurred. Our team has been notified.
            </Text>
            {this.state.error && (
              <Text variant="subtle" className="font-mono text-sm">
                {this.state.error.message}
              </Text>
            )}
          </CardContent>
          <CardFooter className="flex gap-3">
            <Button onClick={this.handleReset}>
              Try again
            </Button>
            <Button variant="outline" onClick={this.handleReload}>
              <RefreshCwIcon className="mr-2 h-4 w-4" />
              Reload page
            </Button>
          </CardFooter>
        </Card>
      )
    }

    return this.props.children
  }
} 