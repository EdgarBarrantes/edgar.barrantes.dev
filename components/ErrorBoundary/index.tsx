import React, { Component, ErrorInfo, ReactNode } from 'react';
import { Text } from '../ui/base';
import { Card, CardContent } from '../ui/Card';
import { Button } from '../ui/Button';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

/**
 * Error Boundary component to catch React errors and display fallback UI
 * Prevents entire app from crashing when a component errors
 */
export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log error to console for debugging
    console.error('ErrorBoundary caught an error:', error, errorInfo);

    this.setState({
      error,
      errorInfo
    });

    // You can also log to an error reporting service here
    // e.g., Sentry, LogRocket, etc.
  }

  handleReset = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
  };

  render() {
    if (this.state.hasError) {
      // Custom fallback UI if provided
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default fallback UI
      return (
        <div className="min-h-screen flex items-center justify-center p-4">
          <Card className="max-w-2xl w-full">
            <CardContent className="p-8">
              <div className="space-y-6">
                <div className="space-y-2">
                  <Text variant="h2" className="text-destructive">
                    Something went wrong
                  </Text>
                  <Text variant="subtle">
                    We encountered an unexpected error. This has been logged and we&apos;ll look into it.
                  </Text>
                </div>

                {process.env.NODE_ENV === 'development' && this.state.error && (
                  <div className="space-y-2">
                    <Text variant="h3" className="text-sm">
                      Error Details (Development Only):
                    </Text>
                    <pre className="p-4 bg-muted rounded-md overflow-x-auto text-xs">
                      <code>{this.state.error.toString()}</code>
                    </pre>
                    {this.state.errorInfo && (
                      <pre className="p-4 bg-muted rounded-md overflow-x-auto text-xs max-h-64">
                        <code>{this.state.errorInfo.componentStack}</code>
                      </pre>
                    )}
                  </div>
                )}

                <div className="flex gap-4">
                  <Button onClick={this.handleReset} variant="default">
                    Try Again
                  </Button>
                  <Button
                    onClick={() => window.location.href = '/'}
                    variant="outline"
                  >
                    Go Home
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      );
    }

    return this.props.children;
  }
}

/**
 * Higher-order component to wrap any component with error boundary
 */
export function withErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  fallback?: ReactNode
) {
  return function WithErrorBoundaryWrapper(props: P) {
    return (
      <ErrorBoundary fallback={fallback}>
        <Component {...props} />
      </ErrorBoundary>
    );
  };
}
