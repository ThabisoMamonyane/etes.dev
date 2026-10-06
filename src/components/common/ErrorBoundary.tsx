import React, { ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  public static getDerivedStateFromError(error: Error): Partial<State> {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('ETES Application Error Boundary caught:', error, errorInfo);
    this.setState({ errorInfo });
  }

  private handleReset = (): void => {
    try {
      localStorage.removeItem('etes_theme');
    } catch (e) {
      // Ignore storage errors
    }
    window.location.reload();
  };

  public render(): ReactNode {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-[#070B13] text-stone-200 flex items-center justify-center p-6 font-sans">
          <div className="max-w-xl w-full bg-[#0E1726] border border-[#C5A059]/40 rounded-xl p-8 shadow-2xl space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-[#C5A059]/20 border border-[#C5A059] flex items-center justify-center text-[#DFB76C] font-bold">
                ETES
              </div>
              <div>
                <h1 className="text-lg font-bold text-white tracking-wide">
                  Application Recovery Shield
                </h1>
                <p className="text-xs text-stone-400">
                  Institutional Operating Environment • Diagnostic Monitor
                </p>
              </div>
            </div>

            <div className="p-4 rounded-lg bg-black/40 border border-stone-800 text-xs font-mono text-amber-300 overflow-auto max-h-40">
              {this.state.error?.message || 'An unexpected rendering condition occurred.'}
            </div>

            <p className="text-xs text-stone-400 leading-relaxed">
              The application safeguarded its session state. You can reset local preferences to restore default operational headquarters.
            </p>

            <div className="flex items-center gap-3">
              <button
                onClick={this.handleReset}
                className="px-4 py-2 bg-[#C5A059] hover:bg-[#b08e4d] text-stone-950 text-xs font-semibold rounded-lg transition-colors cursor-pointer"
              >
                Restore Default View
              </button>
              <button
                onClick={() => window.location.reload()}
                className="px-4 py-2 bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs font-medium rounded-lg transition-colors cursor-pointer"
              >
                Retry Operational Session
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
