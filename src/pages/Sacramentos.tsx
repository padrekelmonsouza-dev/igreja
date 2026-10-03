import { useEffect, useId, useRef, useState } from "react";
import { PageHero } from "../components/Article";
import { KnowOrthodoxy } from "../components/KnowOrthodoxy";
import { NavIcon } from "../components/NavIcon";
import {
  BATISMO_THEMES,
  CONFISSAO_THEMES,
  CRISMA_THEMES,
  EUCARISTIA_THEMES,
  UNCAO_THEMES,
  FEATURED_SACRAMENTS,
  MATRIMONIO_THEMES,
  ORDEM_RANKS,
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
const FEATURED_BATISMO = featuredBySlug("batismo");
const FEATURED_CRISMA = featuredBySlug("crisma");
const FEATURED_CONFISSAO = featuredBySlug("confissao");
const FEATURED_UNCAO = featuredBySlug("uncao");

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

function Slideshow({ slides, label }: { slides: NonNullable<FeaturedSacrament["slides"]>; label: string }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (slides.length < 2) return;
    const timer = window.setInterval(() => setIndex((i) => (i + 1) % slides.length), 4500);
    return () => window.clearInterval(timer);
  }, [slides.length]);

  const current = slides[index];

  return (
    <div className="relative h-full w-full overflow-hidden bg-ink" role="region" aria-roledescription="carrossel" aria-label={label}>
      {slides.map((slide, i) => (
        <img
          key={slide.src}
          src={slide.src}
          alt={slide.alt}
          aria-hidden={i !== index}
          loading={i === 0 ? "eager" : "lazy"}
          decoding="async"
          className={`absolute inset-0 h-full w-full object-cover transition-[opacity,transform] duration-[1200ms] ease-out ${
            i === index ? "scale-105 opacity-100" : "scale-100 opacity-0"
          }`}
          style={{ objectPosition: slide.position || "center" }}
        />
      ))}
      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink/80 via-ink/30 to-transparent px-4 pb-3 pt-10">
        <div className={`flex justify-center gap-1.5 ${slides.length < 2 ? "hidden" : ""}`}>
          {slides.map((slide, i) => (
            <button
              key={slide.src}
              type="button"
              onClick={() => setIndex(i)}
              aria-label={`Mostrar imagem ${i + 1}: ${slide.alt}`}
              aria-current={i === index}
              className={`h-1.5 rounded-full transition-all ${i === index ? "w-6 bg-gold" : "w-1.5 bg-white/60 hover:bg-white"}`}
            />
          ))}
        </div>
        <a
          href={current.href}
          target="_blank"
          rel="noreferrer"
          className="mt-2 block truncate text-center text-[10px] text-white/70 hover:text-white"
        >
          {current.credit}
        </a>
      </div>
    </div>
  );
}

function FeaturedMedia({ item }: { item: FeaturedSacrament }) {
  if (item.slides?.length) {
    return <Slideshow slides={item.slides} label={`${item.title}: apresentação de imagens`} />;
  }
  if (item.youtube) {
    const params = `autoplay=1&mute=1&loop=1&playlist=${item.youtube}&controls=0&playsinline=1&rel=0&modestbranding=1`;
    return (
      <div
        className="relative h-full w-full overflow-hidden bg-cover bg-center [container-type:size]"
        style={{ backgroundImage: `url(${item.poster})` }}
      >
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${item.youtube}?${params}`}
          title={`${item.title} (${item.kicker})`}
          loading="lazy"
          allow="autoplay; encrypted-media; picture-in-picture"
          className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 border-0"
          style={{ width: "max(100cqw, 56.25cqh)", height: "max(100cqh, 177.78cqw)" }}
        />
      </div>
    );
  }
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
    <div className="order-1 flex min-w-0 max-w-xl flex-col md:order-none lg:h-full">
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
        <div className="order-2 overflow-hidden rounded-[1.75rem] bg-burgundy shadow-card md:order-none">
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

      <section id="temas" className="bg-ivory px-4 py-8 sm:py-10">
        <div className="mx-auto w-full max-w-[1280px]">
          <p className="flex items-center gap-3 text-[10px] font-bold uppercase tracking-[0.2em] text-burgundy">
            <span className="h-px w-8 bg-gold" aria-hidden="true" />
            Cada Mistério
          </p>
          <h2 className="mt-2 font-serif text-[1.75rem] leading-tight text-ink sm:text-3xl">Os sete Sacramentos da Igreja Ortodoxa.</h2>
          <p className="mt-2 max-w-3xl text-[15px] leading-6 text-stone">
            A Igreja Ortodoxa chama os sacramentos de Santos Mistérios (μυστήρια): ações de Cristo pelas quais a graça
            invisível de Deus nos é dada por sinais visíveis. São sete: Batismo, Crisma e Eucaristia, que fazem nascer
            para a vida em Cristo; Confissão e Unção dos enfermos, que curam a alma e o corpo; Matrimônio e Ordem, que
            consagram a vocação ao serviço do amor e da Igreja.
          </p>
        </div>
      </section>

      <EditorialSection
        item={FEATURED_BATISMO}
        titleAccent="do Batismo"
        themes={BATISMO_THEMES}
        footerLead="Durante o Batismo, a Igreja canta:"
        footerQuote="«Todos vós que fostes batizados em Cristo, de Cristo vos revestistes. Aleluia.»"
        onOpen={(topic) => setOpen({ kind: "topic", data: topic })}
      />

      <EditorialSection
        item={FEATURED_CRISMA}
        titleAccent="da Crisma"
        themes={CRISMA_THEMES}
        footerLead="A cada unção, o sacerdote proclama:"
        footerQuote="«Selo do dom do Espírito Santo.»"
        onOpen={(topic) => setOpen({ kind: "topic", data: topic })}
      />

      <EditorialSection
        item={FEATURED_EUCARISTIA}
        titleAccent="da Eucaristia"
        themes={EUCARISTIA_THEMES}
        footerLead="Durante a Santa Comunhão, a Igreja proclama:"
        footerQuote="«Recebei o Corpo de Cristo; saboreai a fonte da imortalidade.»"
        onOpen={(topic) => setOpen({ kind: "topic", data: topic })}
      />

      <EditorialSection
        item={FEATURED_CONFISSAO}
        titleAccent="da Confissão"
        themes={CONFISSAO_THEMES}
        footerLead="Antes da confissão, o sacerdote recorda:"
        footerQuote="«Eis, meu filho, Cristo está aqui invisivelmente presente, recebendo a tua confissão.»"
        onOpen={(topic) => setOpen({ kind: "topic", data: topic })}
      />

      <EditorialSection
        item={FEATURED_UNCAO}
        titleAccent="da Unção dos Enfermos"
        themes={UNCAO_THEMES}
        footerLead="Durante a Santa Unção, a Igreja reza:"
        footerQuote="«Pai Santo, médico das almas e dos corpos, cura o teu servo.»"
        onOpen={(topic) => setOpen({ kind: "topic", data: topic })}
      />

      <EditorialSection
        item={FEATURED_MATRIMONIO}
        titleAccent="do Matrimônio"
        themes={MATRIMONIO_THEMES}
        footerLead="Durante a Coroação, a Igreja proclama:"
        footerQuote="«Ó Senhor nosso Deus, coroa-os com glória e honra.»"
        onOpen={(topic) => setOpen({ kind: "topic", data: topic })}
      />

      <EditorialSection
        item={FEATURED_ORDEM}
        titleAccent="da Ordem"
        themes={ORDEM_RANKS}
        footerLead="Durante a ordenação, a Igreja proclama:"
        footerQuote="«Áxios!» — «Ele é digno!»"
        onOpen={(topic) => setOpen({ kind: "topic", data: topic })}
      />

      <KnowOrthodoxy />
      {open ? <SacramentosModal item={open} onClose={() => setOpen(null)} /> : null}
    </>
  );
}
