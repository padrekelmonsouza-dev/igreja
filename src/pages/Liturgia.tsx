import { useEffect, useId, useRef, useState } from "react";
import { PageHero } from "../components/Article";
import { KnowOrthodoxy } from "../components/KnowOrthodoxy";
import { NavIcon } from "../components/NavIcon";
import { LITURGY_RITES, LITURGY_TOPICS, type LiturgyRite, type LiturgyTopic } from "../data/liturgy";

type ModalItem =
  | { kind: "rite"; data: LiturgyRite }
  | { kind: "topic"; data: LiturgyTopic };

function LiturgyModal({ item, onClose }: { item: ModalItem; onClose: () => void }) {
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);
  const isRite = item.kind === "rite";
  const title = item.data.title;
  const kicker = isRite ? item.data.kicker : "Divina Liturgia";
  const paragraphs = item.data.body;

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
      <button type="button" className="absolute inset-0 bg-ink/55" aria-label="Fechar informações" onClick={onClose} />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative z-10 flex max-h-[92vh] w-full max-w-2xl flex-col overflow-hidden rounded-t-3xl bg-white shadow-card sm:rounded-3xl"
      >
        {isRite ? (
          <div className="relative h-40 shrink-0 overflow-hidden sm:h-48">
            <img
              src={item.data.image}
              alt=""
              className={`absolute inset-0 h-full w-full ${item.data.imageClass || "object-cover"}`}
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_20%,rgba(78,12,20,.92))]" />
          </div>
        ) : null}
        <div className="flex items-start justify-between gap-4 border-b border-burgundy/10 px-5 py-4">
          <div className="flex min-w-0 items-start gap-3">
            {isRite ? null : (
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-burgundy text-gold-soft ring-1 ring-gold/30">
                <NavIcon name={item.data.icon} className="h-6 w-6" />
              </span>
            )}
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-burgundy">{kicker}</p>
              <h2 id={titleId} className="mt-1 font-serif text-2xl leading-tight text-ink sm:text-3xl">
                {title}
              </h2>
            </div>
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
          {paragraphs.map((paragraph) => (
            <p key={paragraph} className="mt-3 text-base leading-7 text-ink first:mt-0">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

function RiteCard({ rite, onOpen }: { rite: LiturgyRite; onOpen: () => void }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="group relative isolate flex h-full min-h-[420px] flex-col overflow-hidden rounded-[1.75rem] bg-burgundy text-left shadow-card"
    >
      <img
        src={rite.image}
        alt=""
        className={`absolute inset-0 h-full w-full transition duration-500 group-hover:scale-105 ${rite.imageClass || "object-cover object-top"}`}
        loading="lazy"
        decoding="async"
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_28%,rgba(78,12,20,.94))]" />
      <div className="relative mt-auto p-5 text-white sm:p-6">
        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-gold-soft">{rite.kicker}</p>
        <h3 className="mt-1 font-serif text-[1.35rem] leading-tight sm:text-2xl">{rite.title}</h3>
        <p className="mt-3 text-sm leading-6 text-ivory/90">{rite.summary}</p>
      </div>
    </button>
  );
}

function TopicCard({ topic, onOpen }: { topic: LiturgyTopic; onOpen: () => void }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="group flex h-full flex-col rounded-[1.75rem] bg-white p-6 text-left shadow-card ring-1 ring-burgundy/10 transition hover:-translate-y-0.5"
    >
      <span className="grid h-14 w-14 place-items-center rounded-2xl bg-[linear-gradient(160deg,#6E121C,#9B2430)] text-gold-soft shadow-[inset_0_1px_0_rgba(255,255,255,.22)]">
        <NavIcon name={topic.icon} className="h-7 w-7" />
      </span>
      <h3 className="mt-5 font-serif text-2xl leading-tight text-ink">{topic.title}</h3>
      <p className="mt-2 text-sm leading-6 text-stone">{topic.summary}</p>
    </button>
  );
}

export function Liturgia() {
  const [open, setOpen] = useState<ModalItem | null>(null);

  return (
    <>
      <PageHero
        kicker="O coração da vida ortodoxa"
        title="Liturgia"
        intro="As principais liturgias da Ortodoxia e o sentido da Divina Liturgia."
        crumbs={[{ href: "/liturgia", label: "Liturgia" }]}
      />

      <section id="ritos" className="site-section mx-auto w-full max-w-[1280px] px-4">
        <div>
          <p className="kicker">Ritos da Igreja</p>
          <h2 className="mt-3 font-serif text-4xl">As liturgias da Ortodoxia.</h2>
          <p className="mt-3 max-w-3xl text-stone">
            Três formulações principais do Oriente: São João Crisóstomo, São Basílio e São Tiago. Como
            complemento histórico, a liturgia latina do primeiro milênio.
          </p>
        </div>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {LITURGY_RITES.map((rite) => (
            <RiteCard key={rite.slug} rite={rite} onOpen={() => setOpen({ kind: "rite", data: rite })} />
          ))}
        </div>
      </section>

      <section id="divina-liturgia" className="site-section mx-auto w-full max-w-[1280px] px-4">
        <div>
          <p className="kicker">Divina Liturgia</p>
          <h2 className="mt-3 font-serif text-4xl">Compreenda a celebração.</h2>
          <p className="mt-3 max-w-3xl text-stone">
            O que é a Divina Liturgia, como se desenrola, como se preparar e o que esperar na primeira visita.
          </p>
        </div>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {LITURGY_TOPICS.map((topic) => (
            <TopicCard key={topic.slug} topic={topic} onOpen={() => setOpen({ kind: "topic", data: topic })} />
          ))}
        </div>
      </section>

      <KnowOrthodoxy />
      {open ? <LiturgyModal item={open} onClose={() => setOpen(null)} /> : null}
    </>
  );
}
