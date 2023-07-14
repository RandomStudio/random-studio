/* eslint-disable react/require-optimization */
import React, { ReactElement } from 'react';

type ErrorBoundaryProps = {
  children: ReactElement[];
};

type ErrorBoundaryState = {
  hasError: boolean;
};

class ErrorBoundary extends React.Component<
  ErrorBoundaryProps,
  ErrorBoundaryState
> {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    console.error(error);

    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.error({
      error,
      errorInfo,
    });
  }

  render() {
    const { children } = this.props;
    const { hasError } = this.state;

    if (hasError) {
      return <h1>{'Something went wrong.'}</h1>;
    }

    return children;
  }
}

export default ErrorBoundary;
