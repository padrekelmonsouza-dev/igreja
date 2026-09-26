import { useEffect, useId, useRef, useState } from "react";
import { LATEST_EVENT_ARTICLE, LATEST_FEATURED_VIDEO, LATEST_SIDE_VIDEOS } from "../data/latestEvents";

function PlayIcon({ className = "h-6 w-6" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={`${className} fill-white`} aria-hidden="true">
      <path d="M8.4 5.8v12.4L18.2 12 8.4 5.8Z" />
    </svg>
  );
}

function VideoModal({ src, onClose }: { src: string; onClose: () => void }) {
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);

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
      <button type="button" className="absolute inset-0 bg-ink/60" aria-label="Fechar vídeo" onClick={onClose} />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative z-10 w-full overflow-hidden rounded-t-3xl bg-ink shadow-card sm:max-w-sm sm:rounded-3xl"
      >
        <div className="flex items-center justify-between px-4 py-3">
          <h2 id={titleId} className="font-serif text-xl text-white">
            Vídeo
          </h2>
          <button
            ref={closeRef}
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-white/40 text-white"
            aria-label="Fechar"
            onClick={onClose}
          >
            ×
          </button>
        </div>
        <video
          src={src}
          className="aspect-[9/16] max-h-[80vh] w-full bg-black object-contain"
          controls
          autoPlay
          muted
          playsInline
        />
      </div>
    </div>
  );
}

export function LatestEvents() {
  const [active, setActive] = useState<string | null>(null);
  const article = LATEST_EVENT_ARTICLE;

  return (
    <section id="ultimos-eventos" className="site-section mx-auto w-full max-w-[1280px] px-4">
      <p className="kicker">Últimos eventos e notícias</p>
      <h2 className="mt-3 font-serif text-4xl">I Encontro de Padres e Pastores.</h2>
      <p className="mt-3 max-w-3xl text-stone">
        Encontro realizado em São Paulo, em 21 de setembro de 2026: matéria e registros em vídeo.
      </p>

      <div className="mt-8 grid w-full grid-cols-1 items-start gap-5 lg:grid-cols-[30%_70%]">
        <div className="aspect-[1125/1936] w-full justify-self-start overflow-hidden rounded-[1.75rem] bg-ink shadow-card">
          <video
            src={LATEST_FEATURED_VIDEO.src}
            poster={LATEST_FEATURED_VIDEO.poster}
            className="h-full w-full object-cover"
            controls
            playsInline
            preload="metadata"
          />
        </div>

        <div className="flex min-h-0 w-full min-w-0 flex-col overflow-hidden rounded-[1.75rem] bg-white p-4 shadow-card ring-1 ring-burgundy/10 sm:p-6 lg:max-h-[calc((min(1280px,100vw)-2rem)*0.3*1936/1125)] lg:p-8">
          <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-burgundy">Matéria</p>
          <h3 className="mt-2 font-serif text-xl leading-tight text-ink sm:text-2xl">{article.title}</h3>
          <p className="mt-3 line-clamp-5 text-sm leading-6 text-stone">{article.summary}</p>
          <p className="mt-3 text-sm text-stone">
            Fonte: <span className="font-semibold text-burgundy">{article.source}</span>
            {" · "}
            {article.date}
            {" · "}
            {article.author}
          </p>
          <a
            href={article.href}
            target="_blank"
            rel="noreferrer"
            className="mt-3 inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-[0.16em] text-burgundy"
          >
            Ler a matéria no Portal VV8
            <span aria-hidden="true">→</span>
          </a>

          <div className="mt-4 grid min-h-0 flex-1 grid-cols-3 gap-2">
            {LATEST_SIDE_VIDEOS.map((video) => (
              <button
                key={video.src}
                type="button"
                onClick={() => setActive(video.src)}
                aria-label={`Abrir ${video.label}`}
                className="group relative min-h-0 overflow-hidden rounded-2xl bg-burgundy"
              >
                <img
                  src={video.poster}
                  alt=""
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
                <span className="absolute inset-0 bg-[linear-gradient(180deg,transparent_50%,rgba(78,12,20,.82))]" />
                <span className="absolute left-1/2 top-1/2 flex h-10 w-10 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-burgundy/80 ring-2 ring-gold/70">
                  <PlayIcon className="h-5 w-5" />
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {active ? <VideoModal src={active} onClose={() => setActive(null)} /> : null}
    </section>
  );
}
