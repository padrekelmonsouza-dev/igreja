import { useEffect, useId, useRef, useState } from "react";
import { fetchVaticanArticleBody, fetchVaticanNews, VATICAN_FALLBACK, type VaticanArticle } from "../lib/vaticanNews";

const PAGE_SIZE = 4;
const ROTATE_MS = 12000;
const REFRESH_MS = 3 * 60 * 1000;
const LEFT_IMAGE = "/media/vatican-theotokos.jpg";

function shuffle<T>(items: T[]) {
  const next = [...items];
  for (let index = next.length - 1; index > 0; index -= 1) {
    const swap = Math.floor(Math.random() * (index + 1));
    [next[index], next[swap]] = [next[swap], next[index]];
  }
  return next;
}

function NewsImage({ src, className }: { src: string; className?: string }) {
  return (
    <img
      src={src}
      alt=""
      loading="lazy"
      className={className}
      onError={(event) => {
        event.currentTarget.src = LEFT_IMAGE;
      }}
    />
  );
}

function VaticanNewsModal({ article, onClose }: { article: VaticanArticle; onClose: () => void }) {
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);
  const [body, setBody] = useState<string[]>(article.text ? [article.text] : []);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    setLoading(true);
    fetchVaticanArticleBody(article.href, article.text).then((paragraphs) => {
      const usable = paragraphs.filter((item) => !item.includes("Ative o JavaScript"));
      if (cancelled) return;
      if (usable.length) setBody(usable);
      setLoading(false);
    });
    return () => {
      cancelled = true;
    };
  }, [article.href, article.text]);

  useEffect(() => {
    const timer = window.setTimeout(() => closeRef.current?.focus(), 40);
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    const previous = document.body.style.overflowY;
    document.body.style.overflowY = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(timer);
      document.body.style.overflowY = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[80] flex items-end justify-center p-0 sm:items-center sm:p-6">
      <button type="button" className="absolute inset-0 bg-ink/55" aria-label="Fechar notícia" onClick={onClose} />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative z-10 flex max-h-[92vh] w-full max-w-2xl flex-col overflow-hidden rounded-t-3xl bg-white shadow-card sm:rounded-3xl"
      >
        <div className="relative h-40 shrink-0 overflow-hidden sm:h-48">
          <NewsImage src={article.image} className="absolute inset-0 h-full w-full object-cover object-center" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_20%,rgba(78,12,20,.92))]" />
        </div>
        <div className="flex items-start justify-between gap-4 border-b border-burgundy/10 px-5 py-4">
          <div className="min-w-0">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-burgundy">Vatican News</p>
            <h2 id={titleId} className="mt-1 font-serif text-2xl leading-tight text-ink sm:text-3xl">
              {article.title}
            </h2>
          </div>
          <button
            ref={closeRef}
            type="button"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-burgundy/20 text-burgundy"
            aria-label="Fechar"
            onClick={onClose}
          >
            ×
          </button>
        </div>
        <div className="overflow-y-auto px-5 py-5">
          {loading && body.length <= 1 ? (
            <p className="mb-4 text-sm text-ink/60">A carregar o texto completo da matéria…</p>
          ) : null}
          {body.map((paragraph, index) => (
            <p key={`${index}-${paragraph.slice(0, 32)}`} className="mt-3 text-base leading-7 text-ink first:mt-0">
              {paragraph}
            </p>
          ))}
          <a
            className="btn btn-burgundy mt-8 w-full text-white no-underline sm:w-auto"
            href={article.href}
            target="_blank"
            rel="noreferrer"
          >
            Ir ao site da notícia
          </a>
        </div>
      </div>
    </div>
  );
}

function NewsCard({ article, fit, onOpen }: { article: VaticanArticle; fit?: boolean; onOpen: () => void }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="group flex h-full min-h-0 w-full flex-col overflow-hidden rounded-3xl border border-burgundy/20 bg-white text-left shadow-card transition hover:-translate-y-0.5 hover:border-gold/50 hover:shadow-[0_22px_40px_-24px_rgba(110,18,28,.55)]"
    >
      <div className={fit ? "min-h-0 flex-1 overflow-hidden bg-parchment" : "aspect-[16/9] overflow-hidden bg-parchment"}>
        <NewsImage src={article.image} className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.02]" />
      </div>
      <div className={fit ? "flex shrink-0 flex-col px-3 pb-3 pt-3" : "flex flex-col px-4 pb-4 pt-4 sm:px-5 sm:pb-5"}>
        <h3 className="overflow-hidden text-ellipsis whitespace-nowrap text-[1.15rem] font-semibold leading-none text-ink [hyphens:none] [overflow-wrap:normal] group-hover:text-burgundy sm:text-[1.25rem]">
          {article.title}
        </h3>
        <span className="mt-2 inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-[0.16em] text-burgundy">
          Ler completo
          <span aria-hidden="true">→</span>
        </span>
      </div>
    </button>
  );
}

function NewsArrows({ onPrev, onNext }: { onPrev: () => void; onNext: () => void }) {
  return (
    <div className="flex items-center gap-2">
      <button
        type="button"
        className="flex h-10 w-10 items-center justify-center rounded-full border border-burgundy/15 bg-white text-xl leading-none text-burgundy shadow-[0_8px_16px_-10px_rgba(110,18,28,.55)]"
        aria-label="Notícias anteriores"
        onClick={onPrev}
      >
        ‹
      </button>
      <button
        type="button"
        className="flex h-10 w-10 items-center justify-center rounded-full border border-burgundy/15 bg-white text-xl leading-none text-burgundy shadow-[0_8px_16px_-10px_rgba(110,18,28,.55)]"
        aria-label="Próximas notícias"
        onClick={onNext}
      >
        ›
      </button>
    </div>
  );
}

export function VaticanNews() {
  const [articles, setArticles] = useState<VaticanArticle[]>(() => shuffle(VATICAN_FALLBACK));
  const [page, setPage] = useState(0);
  const [pause, setPause] = useState(0);
  const [open, setOpen] = useState<VaticanArticle | null>(null);
  const articlesRef = useRef(articles);
  articlesRef.current = articles;

  useEffect(() => {
    let cancelled = false;

    async function load() {
      const items = await fetchVaticanNews();
      if (cancelled || !items.length) return;
      setArticles(shuffle(items));
      setPage(0);
    }

    load();
    const refresh = window.setInterval(load, REFRESH_MS);
    return () => {
      cancelled = true;
      window.clearInterval(refresh);
    };
  }, []);

  const pages = Math.max(1, Math.ceil(articles.length / PAGE_SIZE));
  const visible = articles.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE);

  function go(step: number) {
    const total = Math.max(1, Math.ceil(articlesRef.current.length / PAGE_SIZE));
    setPage((current) => (current + step + total) % total);
    setPause((current) => current + 1);
  }

  useEffect(() => {
    if (pages < 2 || open) return;
    const timer = window.setInterval(() => {
      setPage((current) => (current + 1) % pages);
    }, ROTATE_MS);
    return () => window.clearInterval(timer);
  }, [pages, pause, open]);

  return (
    <section className="site-section bg-ivory px-4">
      <div className="mx-auto w-full max-w-[1280px]">
        <div className="lg:hidden">
          <div className="overflow-hidden rounded-[1.75rem] bg-burgundy shadow-card">
            <img
              src={LEFT_IMAGE}
              alt="Ícone da Theotokos com o Menino Jesus"
              width={350}
              height={493}
              className="h-[493px] w-full object-cover object-[center_18%]"
            />
          </div>

          <div className="mt-6 flex items-center justify-between gap-3">
            <h2 className="font-serif text-3xl leading-tight text-ink">Vatican News</h2>
            <NewsArrows onPrev={() => go(-1)} onNext={() => go(1)} />
          </div>

          <ul className="mt-5 space-y-8">
            {visible.map((article) => (
              <li key={article.href}>
                <NewsCard article={article} onOpen={() => setOpen(article)} />
              </li>
            ))}
          </ul>
        </div>

        <div className="hidden lg:grid lg:h-[666px] lg:grid-cols-[350px_minmax(0,1fr)] lg:items-stretch lg:gap-8">
          <div className="h-full overflow-hidden rounded-[1.75rem] bg-burgundy shadow-card">
            <img
              src={LEFT_IMAGE}
              alt="Ícone da Theotokos com o Menino Jesus"
              width={350}
              height={666}
              className="h-full w-full object-cover object-[center_18%]"
            />
          </div>

          <div className="flex h-full min-h-0 min-w-0 flex-col">
            <div className="mb-4 flex shrink-0 items-center justify-between gap-3">
              <h2 className="font-serif text-3xl leading-tight text-ink sm:text-[2rem]">Vatican News</h2>
              <NewsArrows onPrev={() => go(-1)} onNext={() => go(1)} />
            </div>

            <ul className="grid min-h-0 flex-1 grid-cols-2 gap-x-6 gap-y-4">
              {visible.map((article) => (
                <li key={article.href} className="min-h-0">
                  <NewsCard article={article} fit onOpen={() => setOpen(article)} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      {open ? <VaticanNewsModal article={open} onClose={() => setOpen(null)} /> : null}
    </section>
  );
}
