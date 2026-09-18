import { FormEvent } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { PageHero } from "../components/Article";
import { searchSite } from "../data/search";

export function Pesquisa() {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const q = params.get("q") || "";
  const results = q ? searchSite(q) : [];

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const value = String(new FormData(event.currentTarget).get("q") || "").trim();
    navigate(value ? `/pesquisa?q=${encodeURIComponent(value)}` : "/pesquisa");
  }

  return (
    <>
      <PageHero
        kicker="Pesquisa"
        title="Buscar no portal"
        intro="Encontre páginas de fé, liturgia, clero, comunidades e formação."
        crumbs={[{ href: "/pesquisa", label: "Pesquisa" }]}
      />
      <section className="mx-auto max-w-3xl px-4 py-12">
        <form onSubmit={onSubmit} className="search-form">
          <input
            name="q"
            type="search"
            defaultValue={q}
            placeholder="Ex.: O que é a Divina Liturgia?"
            className="search-field flex-1 border border-burgundy/18 outline-none"
          />
          <button className="btn btn-burgundy px-10" type="submit">
            Pesquisar
          </button>
        </form>
        <div className="mt-8 space-y-3">
          {!q ? (
            <div>
              <p className="text-muted">Digite um termo para começar, ou escolha uma busca frequente:</p>
              <div className="mt-4 flex flex-wrap gap-2">
                {[
                  "Igreja Ortodoxa",
                  "Católica e Ortodoxa",
                  "Divina Liturgia",
                  "ícones",
                  "jejum",
                  "primeira visita",
                  "paróquias",
                ].map((term) => (
                  <Link
                    key={term}
                    to={`/pesquisa?q=${encodeURIComponent(term)}`}
                    className="rounded-full border border-burgundy/15 bg-white px-4 py-2 text-sm hover:border-burgundy/40"
                  >
                    {term}
                  </Link>
                ))}
              </div>
            </div>
          ) : results.length === 0 ? (
            <p className="text-muted">Nenhum resultado para “{q}”.</p>
          ) : (
            results.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="block rounded-2xl border border-burgundy/12 bg-white px-5 py-4 hover:shadow-card"
              >
                <h2 className="text-xl">{item.title}</h2>
                <p className="mt-1 text-sm text-burgundy">{item.href}</p>
              </Link>
            ))
          )}
        </div>
      </section>
    </>
  );
}
