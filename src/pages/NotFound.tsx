import { Link } from "react-router-dom";

export function NotFound() {
  return (
    <section className="mx-auto max-w-3xl px-4 py-24 text-center">
      <p className="kicker">404</p>
      <h1 className="mt-3 font-serif text-4xl sm:text-5xl">Página não encontrada</h1>
      <p className="mt-4 text-lg text-stone">
        Este caminho não existe no portal. Volte ao início ou escolha um dos destinos abaixo.
      </p>
      <div className="mt-8 grid gap-3 sm:grid-cols-2">
        <Link className="btn btn-burgundy" to="/">
          Voltar ao início
        </Link>
        <Link className="btn btn-outline-dark" to="/igreja">
          Conhecer a Igreja
        </Link>
        <Link className="btn btn-outline-dark" to="/comunidades">
          Encontrar uma comunidade
        </Link>
        <Link className="btn btn-outline-dark" to="/noticias">
          Ver notícias
        </Link>
      </div>
    </section>
  );
}
