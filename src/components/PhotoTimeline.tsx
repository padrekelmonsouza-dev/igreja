import { useEffect, useState } from "react";
import type { TimelineEra } from "../data/clergy";

export function PhotoTimeline({ eras, name }: { eras: TimelineEra[]; name: string }) {
  const all = eras.flatMap((era) => era.photos.map((src) => ({ src, era })));
  const [open, setOpen] = useState<number | null>(null);

  useEffect(() => {
    if (open === null) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(null);
      if (event.key === "ArrowRight") setOpen((i) => (i === null ? i : (i + 1) % all.length));
      if (event.key === "ArrowLeft") setOpen((i) => (i === null ? i : (i - 1 + all.length) % all.length));
    }
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [open, all.length]);

  const [active, setActive] = useState(0);
  const era = eras[active];
  const offset = eras.slice(0, active).reduce((sum, e) => sum + e.photos.length, 0);
  const current = open === null ? null : all[open];

  return (
    <section aria-labelledby="historia-em-fotos">
      <p className="text-sm font-bold uppercase tracking-[0.18em] text-burgundy">Galeria</p>
      <h2 id="historia-em-fotos" className="mt-2 font-serif text-3xl text-ink sm:text-4xl">
        Minha história em fotos
      </h2>
      <p className="mt-3 max-w-2xl text-lg text-stone">
        Da infância em Salvador ao ministério e às missões: a caminhada de {name}, contada em imagens.
      </p>

      <div className="mt-6 flex flex-wrap gap-2" role="tablist" aria-label="Fases da história">
        {eras.map((era, i) => (
          <button
            key={era.title}
            type="button"
            role="tab"
            aria-selected={active === i}
            onClick={() => setActive(i)}
            className={`rounded-full px-4 py-2 text-sm font-medium ring-1 transition ${
              active === i
                ? "bg-burgundy text-gold ring-gold/50 shadow-card"
                : "bg-white text-ink ring-burgundy/15 hover:bg-ivory hover:text-burgundy"
            }`}
          >
            {era.title}
            <span className={`ml-2 text-xs ${active === i ? "text-gold/80" : "text-stone"}`}>{era.photos.length}</span>
          </button>
        ))}
      </div>

      <div className="mt-6 rounded-3xl border border-burgundy/10 bg-white p-5 sm:p-6" role="tabpanel">
        <p className="text-sm font-bold uppercase tracking-[0.16em] text-gold-dark">{era.period}</p>
        <h3 className="mt-1 font-serif text-3xl text-burgundy">{era.title}</h3>
        <p className="mt-2 max-w-2xl text-[#3a342d]">{era.text}</p>
        <div className="mt-6 columns-2 gap-4 md:columns-3 xl:columns-4">
          {era.photos.map((src, i) => (
            <button
              key={src}
              type="button"
              onClick={() => setOpen(offset + i)}
              className="group mb-4 block w-full break-inside-avoid overflow-hidden rounded-2xl bg-ivory shadow-card ring-1 ring-burgundy/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
              aria-label={`Ampliar foto ${i + 1}: ${era.title}`}
            >
              <img
                src={src}
                alt={`${era.title} — ${name}`}
                loading="lazy"
                decoding="async"
                className="block h-auto w-full transition-transform duration-300 group-hover:scale-[1.03]"
              />
            </button>
          ))}
        </div>
      </div>

      {current ? (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={current.era.title}
          className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black/90 p-4"
          onClick={() => setOpen(null)}
        >
          <img
            src={current.src}
            alt={`${current.era.title} — ${name}`}
            className="max-h-[80vh] max-w-full rounded-xl object-contain"
            onClick={(event) => event.stopPropagation()}
          />
          <p className="mt-4 text-center text-white/90">
            <span className="text-gold">{current.era.period}</span> · {current.era.title} · {(open ?? 0) + 1} de {all.length}
          </p>
          <button
            type="button"
            className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-2xl text-white hover:bg-white/20"
            aria-label="Fechar"
            onClick={() => setOpen(null)}
          >
            ×
          </button>
          <button
            type="button"
            className="absolute left-2 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-3xl text-white hover:bg-white/20 sm:left-6"
            aria-label="Foto anterior"
            onClick={(event) => {
              event.stopPropagation();
              setOpen((i) => (i === null ? i : (i - 1 + all.length) % all.length));
            }}
          >
            ‹
          </button>
          <button
            type="button"
            className="absolute right-2 top-1/2 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white/10 text-3xl text-white hover:bg-white/20 sm:right-6"
            aria-label="Próxima foto"
            onClick={(event) => {
              event.stopPropagation();
              setOpen((i) => (i === null ? i : (i + 1) % all.length));
            }}
          >
            ›
          </button>
        </div>
      ) : null}
    </section>
  );
}
