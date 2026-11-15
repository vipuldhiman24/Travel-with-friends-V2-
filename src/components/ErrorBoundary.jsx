import React from 'react';

export default class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  handleHome = () => {
    window.location.href = '/';
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center p-6 text-center">
          <div className="size-16 rounded-full bg-orange-100 dark:bg-orange-950/40 text-primary flex items-center justify-center mb-4">
            <span className="material-symbols-outlined text-3xl">sentiment_dissatisfied</span>
          </div>
          <h2 className="text-2xl font-black text-text-main dark:text-text-main-dark mb-2">
            Something went wrong loading this page
          </h2>
          <p className="text-sm text-text-muted dark:text-text-muted-dark max-w-md mb-6">
            We encountered an unexpected error while preparing this travel section. Please reload or return to the homepage.
          </p>
          <div className="flex items-center gap-3">
            <button
              onClick={this.handleReload}
              className="px-5 py-2.5 rounded-xl bg-primary text-white font-bold text-sm shadow hover:bg-orange-600 transition-colors"
            >
              Reload Page
            </button>
            <button
              onClick={this.handleHome}
              className="px-5 py-2.5 rounded-xl bg-gray-200 dark:bg-gray-800 text-text-main dark:text-white font-bold text-sm hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
            >
              Go to Home
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
