import { FormEvent, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { PageHero } from "../components/Article";
import { PARISHES } from "../data/clergy";

export function Paroquias() {
  const [query, setQuery] = useState("");

  const results = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return PARISHES;
    return PARISHES.filter((parish) =>
      `${parish.estado} ${parish.cidade} ${parish.comunidade} ${parish.sacerdote}`.toLowerCase().includes(term),
    );
  }, [query]);

  function onSubmit(event: FormEvent) {
    event.preventDefault();
  }

  return (
    <>
      <PageHero
        kicker="Igreja"
        title="Paróquias"
        intro="Encontre uma paróquia ortodoxa por estado, cidade ou sacerdote."
        crumbs={[
          { href: "/igreja", label: "Igreja" },
          { href: "/paroquias", label: "Paróquias" },
        ]}
      />
      <section className="mx-auto max-w-6xl px-4 py-12">
        <form onSubmit={onSubmit} className="mb-8">
          <label className="mb-2 block text-sm font-bold uppercase tracking-[0.16em] text-burgundy" htmlFor="parish-search">
            Lista de comunidades
          </label>
          <input
            id="parish-search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Estado, cidade, comunidade ou sacerdote"
            className="h-14 w-full rounded-2xl border border-[rgba(90,13,24,.18)] bg-white px-5 outline-none ring-burgundy/20 focus:ring-2"
          />
        </form>

        <div className="overflow-hidden rounded-3xl border border-[rgba(90,13,24,.12)] bg-white">
          <div className="hidden grid-cols-4 bg-parchment px-5 py-3 text-sm font-bold uppercase tracking-wide text-burgundy md:grid">
            <span>Estado</span>
            <span>Cidade</span>
            <span>Comunidade</span>
            <span>Sacerdote</span>
          </div>
          {results.length === 0 ? (
            <p className="px-5 py-8 text-muted">Nenhuma comunidade encontrada para esta busca.</p>
          ) : (
            results.map((parish) => (
              <Link
                key={parish.comunidade}
                to={parish.href}
                className="grid gap-1 border-t border-[rgba(90,13,24,.08)] px-5 py-4 hover:bg-parchment/50 md:grid-cols-4"
              >
                <span>{parish.estado}</span>
                <span>{parish.cidade}</span>
                <span>{parish.comunidade}</span>
                <span>{parish.sacerdote}</span>
              </Link>
            ))
          )}
        </div>

        <div className="mt-10 grid gap-5 md:grid-cols-3">
          {results.map((parish) => (
            <article key={`${parish.comunidade}-card`} className="rounded-3xl border border-[rgba(90,13,24,.12)] bg-white p-6">
              <p className="text-sm font-bold text-burgundy">
                {parish.cidade} · {parish.estado}
              </p>
              <h2 className="mt-2 text-2xl">{parish.comunidade}</h2>
              <p className="mt-3 text-muted">{parish.endereco}</p>
              <p className="mt-2">{parish.sacerdote}</p>
              <p className="mt-1 text-sm">{parish.contato}</p>
            </article>
          ))}
        </div>

        <div className="mt-10 rounded-3xl bg-parchment p-8">
          <h2 className="text-2xl">Mapa de comunidades</h2>
          <p className="mt-3 max-w-3xl text-muted">
            Os endereços oficiais completos, horários da Divina Liturgia, fotos e mapa interativo serão ampliados
            conforme cada comunidade confirmar seus dados. O Mosteiro de São Basílio já publica endereço e telefone
            oficiais.
          </p>
        </div>
      </section>
    </>
  );
}
