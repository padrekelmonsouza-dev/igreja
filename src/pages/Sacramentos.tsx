import { useEffect, useId, useRef, useState } from "react";
import { PageHero } from "../components/Article";
import { HierarchyNews } from "../components/HierarchyNews";
import { KnowOrthodoxy } from "../components/KnowOrthodoxy";
import { NavIcon } from "../components/NavIcon";
import {
  EUCARISTIA_THEMES,
  FEATURED_SACRAMENTS,
  MATRIMONIO_GRID_CARDS,
  ORDEM_RANKS,
  SACRAMENT_TOPICS,
  type FeaturedSacrament,
  type SacramentGridCard,
  type SacramentTheme,
  type SacramentTopic,
} from "../data/sacraments";

type ModalItem = { kind: "grid"; data: SacramentGridCard } | { kind: "topic"; data: SacramentTopic };

function featuredBySlug(slug: string) {
  return FEATURED_SACRAMENTS.find((item) => item.slug === slug) || FEATURED_SACRAMENTS[0];
}

const FEATURED_ORDEM = featuredBySlug("ordem");
const FEATURED_EUCARISTIA = featuredBySlug("eucaristia");
const FEATURED_MATRIMONIO = featuredBySlug("matrimonio");

function SacramentosModal({ item, onClose }: { item: ModalItem; onClose: () => void }) {
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);
  const isGrid = item.kind === "grid";
  const title = item.data.title;
  const kicker = isGrid ? item.data.kicker : "Sacramentos";
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
        {isGrid ? (
          <div className="relative h-48 shrink-0 overflow-hidden bg-ink sm:h-56">
            <img src={item.data.image} alt="" className="absolute inset-0 h-full w-full object-cover object-center" />
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,transparent_40%,rgba(78,12,20,.88))]" />
          </div>
        ) : null}
        <div className="flex items-start justify-between gap-4 border-b border-burgundy/10 px-5 py-4">
          <div className="flex min-w-0 items-start gap-3">
            {isGrid ? null : (
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
          {paragraphs.map((paragraph, index) => (
            <p key={`${index}-${paragraph.slice(0, 32)}`} className="mt-3 text-base leading-7 text-ink first:mt-0">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}

function FeaturedMedia({ item }: { item: FeaturedSacrament }) {
  if (item.video) {
    return (
      <video
        key={item.video}
        src={item.video}
        poster={item.poster}
        className="h-full w-full object-cover object-center"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata"
        aria-label={`${item.title} (${item.kicker})`}
      />
    );
  }
  return <img src={item.poster} alt="" className="h-full w-full object-cover object-[center_28%]" />;
}

function SacramentGridButton({
  item,
  fit,
  onOpen,
}: {
  item: SacramentGridCard;
  fit?: boolean;
  onOpen: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="group flex h-full min-h-0 w-full flex-col overflow-hidden rounded-3xl border border-burgundy/20 bg-white text-left shadow-card transition hover:-translate-y-0.5 hover:border-gold/50 hover:shadow-[0_22px_40px_-24px_rgba(110,18,28,.55)]"
    >
      <div className={fit ? "min-h-0 flex-1 overflow-hidden bg-parchment" : "aspect-[16/9] overflow-hidden bg-parchment"}>
        <img
          src={item.image}
          alt=""
          className="h-full w-full object-cover object-center transition duration-300 group-hover:scale-[1.02]"
        />
      </div>
      <div className={fit ? "flex shrink-0 flex-col px-3 pb-3 pt-3" : "flex flex-col px-4 pb-4 pt-4 sm:px-5 sm:pb-5"}>
        <h3 className="overflow-hidden text-ellipsis whitespace-nowrap text-[1.15rem] font-semibold leading-none text-ink [hyphens:none] [overflow-wrap:normal] group-hover:text-burgundy sm:text-[1.25rem]">
          {item.title}
        </h3>
        <span className="mt-2 inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-[0.16em] text-burgundy">
          Ler completo
          <span aria-hidden="true">→</span>
        </span>
      </div>
    </button>
  );
}

function TopicCard({ topic, onOpen }: { topic: SacramentTopic; onOpen: () => void }) {
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

function SectionHeading({ kicker, title }: { kicker: string; title: string }) {
  return (
    <div>
      <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-burgundy">{kicker}</p>
      <h2 className="mt-1 font-serif text-3xl leading-tight text-ink sm:text-[2rem]">{title}</h2>
    </div>
  );
}

function ThemeCard({ theme, onOpen }: { theme: SacramentTheme; onOpen: () => void }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="h-full w-full rounded-[1.25rem] border border-burgundy/15 bg-white px-4 py-5 text-left shadow-card transition hover:-translate-y-0.5 hover:border-gold/50"
    >
      <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold">{theme.label}</p>
      <h3 className="mt-1.5 font-serif text-[1.2rem] leading-none text-ink">{theme.title}</h3>
      <p className="mt-2 text-[12px] leading-5 text-stone">{theme.summary}</p>
    </button>
  );
}

function EditorialPanel({
  item,
  titleAccent,
  themes,
  footerLead,
  footerQuote,
  onOpen,
}: {
  item: FeaturedSacrament;
  titleAccent: string;
  themes: SacramentTheme[];
  footerLead: string;
  footerQuote: string;
  onOpen: (topic: SacramentTopic) => void;
}) {
  return (
    <div className="flex min-w-0 max-w-xl flex-col lg:h-full">
      <p className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.22em] text-burgundy">
        <span className="h-px w-10 bg-gold" aria-hidden="true" />
        {item.kicker}
      </p>
      <h2 className="mt-5 font-serif text-5xl leading-[1.02] text-ink sm:text-6xl">
        O Sacramento
        <span className="block text-burgundy">{titleAccent}</span>
      </h2>
      <p className="mt-5 max-w-xl font-serif text-lg leading-7 text-stone">{item.summary}</p>
      <div className="my-5 h-px w-full bg-[linear-gradient(90deg,#D4AF37,rgba(212,175,55,.2),transparent)]" aria-hidden="true" />
      {item.body.map((paragraph) => (
        <p key={paragraph.slice(0, 40)} className="mt-3 text-[15px] leading-7 text-stone first:mt-0">
          {paragraph}
        </p>
      ))}
      <ul className="mt-6 grid gap-3 sm:grid-cols-3 lg:min-h-0 lg:flex-1">
        {themes.map((theme) => (
          <li key={theme.slug} className="lg:min-h-0">
            <ThemeCard theme={theme} onOpen={() => onOpen(theme)} />
          </li>
        ))}
      </ul>
      <p className="mt-5 flex items-start gap-3 font-serif text-[15px] italic leading-6 text-stone lg:mt-auto lg:pt-5">
        <span className="mt-0.5 text-xl not-italic leading-none text-gold" aria-hidden="true">
          ✦
        </span>
        <span>
          {footerLead} <strong className="not-italic text-burgundy">{footerQuote}</strong>
        </span>
      </p>
    </div>
  );
}

function EditorialSection({
  item,
  titleAccent,
  themes,
  footerLead,
  footerQuote,
  onOpen,
}: {
  item: FeaturedSacrament;
  titleAccent: string;
  themes: SacramentTheme[];
  footerLead: string;
  footerQuote: string;
  onOpen: (topic: SacramentTopic) => void;
}) {
  return (
    <section className="site-section bg-ivory px-4">
      <div className="mx-auto grid w-full max-w-[1280px] items-center gap-8 lg:h-[666px] lg:max-h-[666px] lg:grid-cols-[350px_minmax(0,1fr)] lg:items-stretch lg:gap-14 lg:overflow-hidden">
        <div className="overflow-hidden rounded-[1.75rem] bg-burgundy shadow-card">
          <div className="h-[493px] w-full lg:h-full">
            <FeaturedMedia item={item} />
          </div>
        </div>
        <EditorialPanel
          item={item}
          titleAccent={titleAccent}
          themes={themes}
          footerLead={footerLead}
          footerQuote={footerQuote}
          onOpen={onOpen}
        />
      </div>
    </section>
  );
}

function HighlightSection({
  item,
  cards,
  onOpen,
}: {
  item: FeaturedSacrament;
  cards: SacramentGridCard[];
  onOpen: (card: SacramentGridCard) => void;
}) {
  return (
    <section className="site-section bg-ivory px-4">
      <div className="mx-auto w-full max-w-[1280px]">
        <div className="lg:hidden">
          <div className="overflow-hidden rounded-[1.75rem] bg-burgundy shadow-card">
            <div className="h-[493px] w-full">
              <FeaturedMedia item={item} />
            </div>
          </div>

          <div className="mt-6">
            <SectionHeading kicker={item.kicker} title={item.title} />
          </div>

          <ul className="mt-5 grid grid-cols-2 gap-x-4 gap-y-4">
            {cards.map((card) => (
              <li key={card.slug} className="min-h-0">
                <SacramentGridButton item={card} onOpen={() => onOpen(card)} />
              </li>
            ))}
          </ul>
        </div>

        <div className="hidden lg:grid lg:h-[666px] lg:grid-cols-[350px_minmax(0,1fr)] lg:items-stretch lg:gap-8">
          <div className="h-full overflow-hidden rounded-[1.75rem] bg-burgundy shadow-card">
            <FeaturedMedia item={item} />
          </div>

          <div className="flex h-full min-h-0 min-w-0 flex-col">
            <div className="mb-4 shrink-0">
              <SectionHeading kicker={item.kicker} title={item.title} />
            </div>
            <ul className="grid min-h-0 flex-1 grid-cols-2 grid-rows-2 gap-x-6 gap-y-4">
              {cards.map((card) => (
                <li key={card.slug} className="min-h-0">
                  <SacramentGridButton item={card} fit onOpen={() => onOpen(card)} />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Sacramentos() {
  const [open, setOpen] = useState<ModalItem | null>(null);

  return (
    <>
      <PageHero
        kicker="Igreja"
        title="Sacramentos"
        intro="Os Santos Mistérios da Igreja Ortodoxa: a graça de Cristo tornada visível."
        crumbs={[{ href: "/sacramentos", label: "Sacramentos" }]}
      />

      <EditorialSection
        item={FEATURED_ORDEM}
        titleAccent="da Ordem"
        themes={ORDEM_RANKS}
        footerLead="Durante a ordenação, a Igreja proclama:"
        footerQuote="«Áxios!» — «Ele é digno!»"
        onOpen={(topic) => setOpen({ kind: "topic", data: topic })}
      />

      <HierarchyNews />

      <EditorialSection
        item={FEATURED_EUCARISTIA}
        titleAccent="da Eucaristia"
        themes={EUCARISTIA_THEMES}
        footerLead="Durante a Santa Comunhão, a Igreja proclama:"
        footerQuote="«Recebei o Corpo de Cristo; saboreai a fonte da imortalidade.»"
        onOpen={(topic) => setOpen({ kind: "topic", data: topic })}
      />

      <HighlightSection
        item={FEATURED_MATRIMONIO}
        cards={MATRIMONIO_GRID_CARDS}
        onOpen={(card) => setOpen({ kind: "grid", data: card })}
      />

      <section id="temas" className="site-section mx-auto w-full max-w-[1280px] px-4">
        <div>
          <p className="kicker">Cada Mistério</p>
          <h2 className="mt-3 font-serif text-4xl">O que a Igreja celebra.</h2>
          <p className="mt-3 max-w-3xl text-stone">
            Iniciação, Comunhão, reconciliação, cura dos enfermos, matrimônio e o serviço ordenado.
          </p>
        </div>
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {SACRAMENT_TOPICS.map((topic) => (
            <TopicCard key={topic.slug} topic={topic} onOpen={() => setOpen({ kind: "topic", data: topic })} />
          ))}
        </div>
      </section>

      <KnowOrthodoxy />
      {open ? <SacramentosModal item={open} onClose={() => setOpen(null)} /> : null}
    </>
  );
}
