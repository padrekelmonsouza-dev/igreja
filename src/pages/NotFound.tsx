import { Link } from "react-router-dom";

export function NotFound() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-24 text-center">
      <p className="kicker">Página não encontrada</p>
      <h1 className="mt-3 font-serif text-4xl">Este caminho ainda não existe no portal.</h1>
      <p className="mt-4 text-lg text-muted">Volte à página inicial ou use a pesquisa para encontrar o conteúdo desejado.</p>
      <div className="mt-8 flex justify-center gap-3">
        <Link className="btn btn-burgundy" to="/">
          Página inicial
        </Link>
        <Link className="btn border border-burgundy/30" to="/pesquisa">
          Pesquisar
        </Link>
      </div>
    </section>
  );
}
