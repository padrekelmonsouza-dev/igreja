import { useEffect, useState } from "react";
import { ECCLESIA_FALLBACK, fetchEcclesiaNews, type EcclesiaArticle } from "../lib/ecclesiaNews";

export function EcclesiaNews() {
  const [articles, setArticles] = useState<EcclesiaArticle[]>(ECCLESIA_FALLBACK);

  useEffect(() => {
    let cancelled = false;
    fetchEcclesiaNews().then((items) => {
      if (!cancelled && items.length) setArticles(items);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section className="bg-ivory px-4 py-10 sm:py-12">
      <div className="mx-auto grid w-full max-w-[1280px] items-stretch gap-6 lg:grid-cols-[350px_minmax(0,1fr)] lg:gap-8">
        <div className="overflow-hidden rounded-[1.75rem] bg-burgundy shadow-card">
          <img
            src="/media/ecclesia-christo.png"
            alt="Ícone de Cristo"
            width={350}
            height={632}
            className="h-56 w-full object-cover object-[center_12%] sm:h-72 lg:h-full"
          />
        </div>

        <div className="min-w-0">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
            <h2 className="font-serif text-3xl leading-tight text-ink sm:text-[2rem]">Ecclesia News</h2>
            <a
              href="https://news.ecclesia.org.br/"
              target="_blank"
              rel="noreferrer"
              className="text-sm font-semibold text-burgundy hover:underline"
            >
              Ver todas
            </a>
          </div>

          <ul className="grid grid-cols-2 gap-6 lg:gap-8">
            {articles.map((article) => (
              <li key={article.href}>
                <article className="flex h-full flex-col">
                  <div className="aspect-[7/3] overflow-hidden rounded-2xl bg-parchment">
                    <img
                      src={article.image}
                      alt=""
                      width={412}
                      height={175}
                      loading="lazy"
                      className="h-full w-full object-cover"
                      onError={(event) => {
                        event.currentTarget.src = "/media/ecclesia-christo.png";
                      }}
                    />
                  </div>
                  <h3 className="mt-4 font-serif text-lg leading-snug text-ink sm:text-xl">{article.title}</h3>
                  <p className="mt-2 line-clamp-2 flex-1 text-sm leading-6 text-stone">{article.text}</p>
                  <a
                    href={article.href}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-3 inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-[0.14em] text-burgundy hover:underline"
                  >
                    Ler completo
                    <span aria-hidden="true">→</span>
                  </a>
                </article>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
