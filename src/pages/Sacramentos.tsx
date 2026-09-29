import { useEffect, useId, useRef, useState } from "react";
import { PageHero } from "../components/Article";
import { HierarchyNews } from "../components/HierarchyNews";
import { KnowOrthodoxy } from "../components/KnowOrthodoxy";
import { NavIcon } from "../components/NavIcon";
import {
  EUCARISTIA_THEMES,
  FEATURED_SACRAMENTS,
  MATRIMONIO_THEMES,
  ORDEM_RANKS,
  SACRAMENT_TOPICS,
  type FeaturedSacrament,
  type SacramentTheme,
  type SacramentTopic,
} from "../data/sacraments";

type ModalItem = { kind: "topic"; data: SacramentTopic };

function featuredBySlug(slug: string) {
  return FEATURED_SACRAMENTS.find((item) => item.slug === slug) || FEATURED_SACRAMENTS[0];
}

const FEATURED_ORDEM = featuredBySlug("ordem");
const FEATURED_EUCARISTIA = featuredBySlug("eucaristia");
const FEATURED_MATRIMONIO = featuredBySlug("matrimonio");

function SacramentosModal({ item, onClose }: { item: ModalItem; onClose: () => void }) {
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);
  const title = item.data.title;
  const kicker: string =
    "label" in item.data && typeof (item.data as SacramentTheme).label === "string"
      ? (item.data as SacramentTheme).label
      : item.data.greek || "Santo Mistério";
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
        <div className="flex items-start justify-between gap-4 border-b border-burgundy/10 px-5 py-4">
          <div className="flex min-w-0 items-start gap-3">
            <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-[linear-gradient(160deg,#6E121C,#9B2430)] text-gold-soft ring-1 ring-gold">
              <NavIcon name={item.data.icon} className="h-5 w-5" />
            </span>
            <div>
              <p className={`text-[11px] font-bold tracking-[0.18em] text-burgundy ${item.data.greek ? "" : "uppercase"}`}>
                {kicker}
              </p>
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

function TopicCard({ topic, onOpen }: { topic: SacramentTopic; onOpen: () => void }) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="group flex h-full flex-col rounded-[1.25rem] border border-burgundy/15 bg-white px-4 py-4 text-left shadow-card transition hover:-translate-y-0.5 hover:border-gold/50"
    >
      <span className="grid h-11 w-11 place-items-center rounded-full bg-[linear-gradient(160deg,#6E121C,#9B2430)] text-gold-soft ring-1 ring-gold">
        <NavIcon name={topic.icon} className="h-5 w-5" />
      </span>
      {topic.greek ? (
        <p className="mt-3 font-serif text-[12px] tracking-[0.1em] text-gold">{topic.greek}</p>
      ) : null}
      <h3 className="mt-1 font-serif text-xl leading-tight text-ink">{topic.title}</h3>
      <p className="mt-1.5 text-[13px] leading-5 text-stone">{topic.summary}</p>
    </button>
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

      <section id="temas" className="bg-ivory px-4 py-8 sm:py-10">
        <div className="mx-auto w-full max-w-[1280px]">
          <p className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.2em] text-burgundy">
            <span className="h-px w-8 bg-gold" aria-hidden="true" />
            Cada Mistério
          </p>
          <h2 className="mt-2 font-serif text-[1.75rem] leading-tight text-ink sm:text-3xl">O que a Igreja celebra.</h2>
          <p className="mt-2 max-w-2xl text-[15px] leading-6 text-stone">
            Santos Mistérios (μυστήρια): Batismo, Crisma, Eucaristia, Confissão, Unção, Matrimônio e Ordem. A iniciação
            é uma só — água, Myron e Comunhão, inclusive às crianças.
          </p>
          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {SACRAMENT_TOPICS.map((topic) => (
              <TopicCard key={topic.slug} topic={topic} onOpen={() => setOpen({ kind: "topic", data: topic })} />
            ))}
          </div>
        </div>
      </section>

      <EditorialSection
        item={FEATURED_MATRIMONIO}
        titleAccent="do Matrimônio"
        themes={MATRIMONIO_THEMES}
        footerLead="Durante a Coroação, a Igreja proclama:"
        footerQuote="«Ó Senhor nosso Deus, coroa-os com glória e honra.»"
        onOpen={(topic) => setOpen({ kind: "topic", data: topic })}
      />

      <KnowOrthodoxy />
      {open ? <SacramentosModal item={open} onClose={() => setOpen(null)} /> : null}
    </>
  );
}
