import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { PageHero } from "../components/Article";
import { CategoryPills, OfficialNotice } from "../components/ShareBar";
import {
  EVENT_ITEMS,
  FORMATION_CATEGORIES,
  FORMATION_LINKS,
  LIBRARY_CATEGORIES,
  LIBRARY_ITEMS,
  NEWS_CATEGORIES,
  NEWS_ITEMS,
  VIDEO_CATEGORIES,
  VIDEO_ITEMS,
  type CatalogItem,
} from "../data/collections";
import { getArticle } from "../data/content";

function CatalogLayout({
  kicker,
  title,
  intro,
  path,
  categories,
  items,
  empty,
}: {
  kicker: string;
  title: string;
  intro: string;
  path: string;
  categories: { slug: string; label: string }[];
  items: CatalogItem[];
  empty: string;
}) {
  const [active, setActive] = useState("todos");
  const filtered = useMemo(
    () => (active === "todos" ? items : items.filter((item) => item.category === active)),
    [active, items],
  );

  return (
    <>
      <PageHero kicker={kicker} title={title} intro={intro} crumbs={[{ href: path, label: title }]} />
      <section className="mx-auto max-w-6xl px-4 py-12">
        <CategoryPills items={categories} active={active} onSelect={setActive} />
        {filtered.length === 0 ? (
          <div className="mt-8">
            <OfficialNotice>{empty}</OfficialNotice>
          </div>
        ) : (
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {filtered.map((item) => (
              <article key={item.slug} className="rounded-3xl border border-burgundy/10 bg-white p-6">
                {item.image ? (
                  <img src={item.image} alt="" className="mb-4 h-40 w-full rounded-2xl object-cover" loading="lazy" />
                ) : null}
                <p className="text-sm uppercase tracking-[0.16em] text-burgundy">{item.category}</p>
                <h2 className="mt-2 font-serif text-2xl">{item.title}</h2>
                <p className="mt-2 text-stone">{item.summary}</p>
                {item.date ? <p className="mt-2 text-sm">{item.date}</p> : null}
                {item.author ? <p className="text-sm">{item.author}</p> : null}
                {item.youtubeId ? (
                  <div className="mt-4 aspect-video overflow-hidden rounded-2xl">
                    <iframe
                      title={item.title}
                      src={`https://www.youtube-nocookie.com/embed/${item.youtubeId}`}
                      className="h-full w-full"
                      loading="lazy"
                      allowFullScreen
                    />
                  </div>
                ) : (
                  <Link className="mt-4 inline-block text-burgundy underline underline-offset-4" to={item.href}>
                    Abrir
                  </Link>
                )}
              </article>
            ))}
          </div>
        )}
      </section>
    </>
  );
}

export function Formacao() {
  const [active, setActive] = useState("todos");
  const article = getArticle("/formacao");
  const items = active === "todos" ? FORMATION_LINKS : FORMATION_LINKS.filter((item) => item.category === active);
  const emptyCategory = active !== "todos" && items.length === 0;

  return (
    <>
      <PageHero
        kicker="Formação"
        title="Área de formação"
        intro={article?.intro || "Caminhos de estudo para conhecer a fé e a tradição ortodoxas."}
        crumbs={[{ href: "/formacao", label: "Formação" }]}
      />
      <section className="mx-auto max-w-6xl px-4 py-12">
        <CategoryPills items={FORMATION_CATEGORIES} active={active} onSelect={setActive} />
        {emptyCategory ? (
          <div className="mt-8">
            <OfficialNotice>
              Ainda não há artigos publicados nesta categoria. A estrutura está pronta para receber conteúdo oficial.
            </OfficialNotice>
          </div>
        ) : (
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => (
              <Link key={item.href} to={item.href} className="rounded-3xl border border-burgundy/10 bg-white p-6 hover:shadow-card">
                {item.image ? (
                  <img src={item.image} alt="" className="mb-4 h-36 w-full rounded-2xl object-cover" loading="lazy" />
                ) : null}
                <p className="text-sm uppercase tracking-[0.16em] text-burgundy">
                  {FORMATION_CATEGORIES.find((category) => category.slug === item.category)?.label}
                </p>
                <h2 className="mt-2 font-serif text-2xl">{item.title}</h2>
                <p className="mt-2 text-stone">{item.summary}</p>
              </Link>
            ))}
          </div>
        )}
      </section>
    </>
  );
}

export function Noticias() {
  return (
    <CatalogLayout
      kicker="Vida da Igreja"
      title="Notícias"
      intro="Atualizações da Igreja, reflexões, homilias e conteúdo editorial. A distinção entre informação oficial e texto editorial será sempre observada."
      path="/noticias"
      categories={NEWS_CATEGORIES}
      items={NEWS_ITEMS}
      empty="Ainda não há notícias oficiais publicadas. Quando a Secretaria da Igreja disponibilizar comunicados, eles aparecerão nesta página, com data, autor (quando houver) e categoria."
    />
  );
}

export function Biblioteca() {
  return (
    <CatalogLayout
      kicker="Livros e documentos"
      title="Biblioteca digital"
      intro="Estrutura preparada para PDFs e materiais autorizados. Nenhum arquivo protegido por direitos autorais será publicado sem autorização."
      path="/biblioteca"
      categories={LIBRARY_CATEGORIES}
      items={LIBRARY_ITEMS}
      empty="A biblioteca aguarda materiais autorizados. Enquanto isso, use a enciclopédia, o glossário e as páginas de formação."
    />
  );
}

export function Videos() {
  return (
    <CatalogLayout
      kicker="Ouvir e ver"
      title="Central de vídeos"
      intro="Integração com YouTube preparada para liturgia, homilias, catequese, história, entrevistas, música bizantina e eventos."
      path="/videos"
      categories={VIDEO_CATEGORIES}
      items={VIDEO_ITEMS}
      empty="Nenhum vídeo oficial foi publicado ainda. Os perfis do clero indicarão homilias e catequeses conforme forem disponibilizadas."
    />
  );
}

export function Eventos() {
  return (
    <CatalogLayout
      kicker="Agenda"
      title="Eventos"
      intro="Festas, visitas pastorais e encontros da Igreja. Datas, horários e locais só serão publicados com informação oficial."
      path="/eventos"
      categories={[{ slug: "eventos", label: "Eventos" }]}
      items={EVENT_ITEMS}
      empty="Não há eventos oficiais publicados no momento. Consulte as comunidades para horários da Divina Liturgia."
    />
  );
}
