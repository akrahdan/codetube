import React from 'react';

// import { logger } from '~/libs/logging/logger';

export type ErrorBoundaryProps = {
  fallback?: React.ReactNode;
};

type ErrorBoundaryState = {
  hasError?: true;
};

export class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, extraInfo?: React.ErrorInfo) {
    console.error(error, extraInfo?.componentStack);
  }

  render() {
    return this.state?.hasError
      ? this.props.fallback || null
      : this.props.children;
  }
}

export function withErrorBoundary<Props>(
  WrappedComponent: React.ComponentType<Props>,
  fallback?: React.ReactNode
) {
  const WithBoundaryComponent: React.FC<Props> = (props) => (
    <ErrorBoundary fallback={fallback}>
      <WrappedComponent {...props} />
    </ErrorBoundary>
  );

  return WithBoundaryComponent;
}
