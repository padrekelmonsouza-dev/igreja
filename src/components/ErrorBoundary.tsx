import { Component, type ErrorInfo, type ReactNode } from "react";

type Props = { children: ReactNode };
type State = { failed: boolean };

export class ErrorBoundary extends Component<Props, State> {
  state: State = { failed: false };

  static getDerivedStateFromError() {
    return { failed: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    console.error(error, info.componentStack);
  }

  render() {
    if (!this.state.failed) return this.props.children;
    return (
      <main className="mx-auto max-w-xl px-4 py-16 text-center">
        <p className="kicker">Portal</p>
        <h1 className="mt-3 font-serif text-3xl">Recarregue a página</h1>
        <p className="mt-3 text-stone">O conteúdo não carregou neste aparelho. Tente de novo em alguns segundos.</p>
        <a className="btn btn-burgundy mt-8" href="/">
          Abrir a página inicial
        </a>
      </main>
    );
  }
}
