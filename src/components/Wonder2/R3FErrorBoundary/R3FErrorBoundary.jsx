/**
 * Generic error boundary. Calls its `set` prop on error.
 */

import { Component } from 'react';

// eslint-disable-next-line react/require-optimization
class ErrorBoundary extends Component {
  state = { error: false };

  static getDerivedStateFromError = () => ({ error: true });

  componentDidCatch(error) {
    console.log(error);
  }

  render() {
    return this.state.error ? null : this.props.children;
  }
}

export default ErrorBoundary;
