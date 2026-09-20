import { FormEvent, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { PageHero } from "../components/Article";
import { OfficialNotice } from "../components/ShareBar";
import { COMMUNITIES, mapsEmbedUrl, mapsSearchUrl } from "../data/communities";
import { trackEvent } from "../lib/analytics";

export function Comunidades() {
  const [query, setQuery] = useState("");
  const results = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return COMMUNITIES;
    return COMMUNITIES.filter((item) =>
      `${item.state} ${item.city} ${item.name} ${item.clergy || ""}`.toLowerCase().includes(term),
    );
  }, [query]);

  const mapped = COMMUNITIES.find((item) => item.mapsQuery);

  function onSubmit(event: FormEvent) {
    event.preventDefault();
  }

  return (
    <>
      <PageHero
        kicker="Comunidades"
        title="Encontre uma Igreja"
        intro="Comunidades da Igreja Ortodoxa Grega G.O.C. no Brasil com os dados oficiais já publicados. Novos endereços serão acrescentados somente quando confirmados."
        crumbs={[{ href: "/comunidades", label: "Comunidades" }]}
      />
      <section className="site-section mx-auto max-w-7xl px-4">
        <form onSubmit={onSubmit} className="mb-8">
          <label className="mb-2 block text-sm font-bold uppercase tracking-[0.16em] text-burgundy" htmlFor="parish-search">
            Buscar comunidade
          </label>
          <input
            id="parish-search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Estado, cidade, comunidade ou sacerdote"
            className="h-14 w-full rounded-2xl border border-burgundy/15 bg-white px-5 outline-none ring-burgundy/20 focus:ring-2"
          />
        </form>

        <div className="grid gap-8 lg:grid-cols-[1.1fr_.9fr]">
          <div className="space-y-4">
            {results.length === 0 ? (
              <p className="text-stone">Nenhuma comunidade encontrada para esta busca.</p>
            ) : (
              results.map((community) => (
                <article key={community.slug} className="rounded-3xl border border-burgundy/10 bg-white p-6">
                  <p className="text-sm font-bold uppercase tracking-[0.16em] text-burgundy">
                    {community.city} · {community.state}
                  </p>
                  <h2 className="mt-2 font-serif text-2xl">{community.name}</h2>
                  <p className="mt-2 text-stone">{community.summary}</p>
                  {community.address ? <p className="mt-3">{community.address}</p> : null}
                  {community.scheduleNote ? <p className="mt-2">{community.scheduleNote}</p> : null}
                  {community.clergy ? <p className="mt-2">{community.clergy}</p> : null}
                  {community.pendingOfficial ? (
                    <div className="mt-4">
                      <OfficialNotice>
                        Ainda não publicados: {community.pendingOfficial.join(", ")}.
                      </OfficialNotice>
                    </div>
                  ) : null}
                  <div className="mt-5 flex flex-wrap gap-3">
                    <Link className="btn btn-burgundy min-h-11 px-5" to={community.href}>
                      Ver comunidade
                    </Link>
                    {community.mapsQuery ? (
                      <a
                        className="btn btn-outline-dark min-h-11 px-5"
                        href={mapsSearchUrl(community.mapsQuery)}
                        target="_blank"
                        rel="noreferrer"
                        onClick={() => trackEvent("click_maps", { community: community.slug })}
                      >
                        Como chegar
                      </a>
                    ) : null}
                  </div>
                </article>
              ))
            )}
          </div>
          <div className="hidden min-h-[420px] overflow-hidden rounded-3xl border border-burgundy/10 lg:block">
            {mapped?.mapsQuery ? (
              <iframe
                title={`Mapa de ${mapped.name}`}
                src={mapsEmbedUrl(mapped.mapsQuery)}
                className="h-full min-h-[420px] w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            ) : (
              <div className="grid h-full place-items-center bg-ivory p-6 text-stone">
                O mapa é exibido apenas para comunidades com endereço oficial.
              </div>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
