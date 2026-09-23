import { useEffect, useId, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { LITURGICAL_FASTS, LITURGICAL_NOTE, MAJOR_FEASTS } from "../data/calendar";
import { CLERGY } from "../data/clergy";
import { COMMUNITIES } from "../data/communities";
import { DONATION_PROJECTS, FORMATION_LINKS } from "../data/collections";
import { getArticle } from "../data/content";
import { FAQ_ITEMS, type FaqItem } from "../data/faq";
import { SITE } from "../data/site";
import { trackEvent } from "../lib/analytics";
import { EcclesiaNews } from "../components/EcclesiaNews";
import { KnowOrthodoxy } from "../components/KnowOrthodoxy";
import { LatestEvents } from "../components/LatestEvents";
import { VaticanNews } from "../components/VaticanNews";
import { VideoGallery } from "../components/VideoGallery";

const featuredClergy = ["padre-kelmon-luis", "padre-joao-damasceno", "dom-leontios"]
  .map((slug) => CLERGY.find((person) => person.slug === slug))
  .filter(Boolean);

const HIERARCHY_NEWS_CARDS = [
  {
    slug: "dom-leontios",
    title: "Dom Leontios de Noronha e Valdigem",
    kicker: "Sua Eminência Dom Leontios",
    image: "/media/card-dom-leontios.jpg",
    imageClass: "object-cover object-[center_18%]",
    meta: "De bendita e eterna memória",
    body: "De bendita e eterna memória, Sua Eminência Dom Leontios ocupou lugar de destaque na história da Ortodoxia Tradicional no Brasil. Como Arcebispo Metropolita da América do Sul, dedicou sua vida ao serviço da Santa Igreja, ao anúncio do Santo Evangelho e à preservação da fé ortodoxa recebida dos Santos Apóstolos e transmitida ao longo dos séculos pelos Santos Padres.",
  },
  {
    slug: "dom-eugenios-de-atenas",
    title: "O Arcebispo atual: Dom Eugenios de Atenas",
    kicker: "O Santo Sínodo de Sua Beatitude Eugenios de Atenas",
    image: "/media/card-dom-eugenios.jpg",
    imageClass: "object-cover object-center",
    meta: "Santo Sínodo",
    body: "O Santo Sínodo presidido por Sua Beatitude Eugenios de Atenas constitui a autoridade suprema da Igreja Ortodoxa Grega G.O.C., exercendo a responsabilidade de preservar a integridade da fé ortodoxa, a sucessão apostólica e a sagrada tradição recebida dos Santos Apóstolos, dos Santos Padres e dos Santos Concílios da Igreja.",
  },
  {
    slug: "padre-kelmon-luis",
    title: "Padre Kelmon Luís",
    kicker: "Eparquia de São Paulo",
    image: "/media/padre-kelmon-luis.jpg",
    imageClass: "object-cover object-[center_20%]",
    meta: "Nascimento: 21/10/1976 · Ordenação: 02/08/2015",
    body: "Padre Kelmon nasceu em Salvador, na Bahia, em 1976. Há mais de 30 anos vive a fé no dia a dia: formação, pastoral e o debate público. Começou na juventude, na Legião de Maria. Depois estudou Filosofia, Teologia e Pedagogia e atuou em missões e ações humanitárias.",
  },
] as const;

const HERO_SHORTCUTS = [
  {
    href: "/igreja",
    label: "Conheça a Igreja",
    description: "Fé apostólica, história e a vida da Igreja Ortodoxa Grega G.O.C. no Brasil.",
    icon: "book",
  },
  {
    href: "/comunidades",
    label: "Encontre uma comunidade",
    description: "Mosteiro em Nova Iguaçu e comunidades em São Paulo e no Rio de Janeiro.",
    icon: "church",
  },
  {
    href: "/calendario",
    label: "Calendário litúrgico",
    description: "Páscoa, Teofania, jejuns e o ritmo do ano da Igreja.",
    icon: "calendar",
  },
  {
    href: "/videos",
    label: "Vídeos e homilias",
    description: "Homilias, liturgia e catequese, quando o acervo oficial for publicado.",
    icon: "video",
  },
  {
    href: "/formacao",
    label: "Formação e biblioteca",
    description: "Textos e materiais autorizados para estudar a fé ortodoxa.",
    icon: "library",
  },
  {
    href: "/doacoes",
    label: "Apoie a Igreja",
    description: "Sustente a liturgia, as obras e a missão das comunidades.",
    icon: "heart",
  },
] as const;

function HeroShortcutIcon({ name }: { name: (typeof HERO_SHORTCUTS)[number]["icon"] }) {
  const common = {
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    className: "h-6 w-6",
    "aria-hidden": true,
  };
  if (name === "book") {
    return (
      <svg {...common}>
        <path d="M5 19.2A2.2 2.2 0 0 1 7.3 17H20" />
        <path d="M7.3 4H20v16H7.3A2.3 2.3 0 0 1 5 17.7V6.3A2.3 2.3 0 0 1 7.3 4Z" />
        <path d="M8.6 8.2h7.4M8.6 11.6h5.2" />
      </svg>
    );
  }
  if (name === "church") {
    return (
      <svg {...common}>
        <path d="M12 3v3M10.6 4.2h2.8" />
        <path d="M12 6.2 5.5 10.4V21h13V10.4L12 6.2Z" />
        <path d="M10 21v-5.2h4V21" />
        <path d="M8.2 13.2h1.4M14.4 13.2h1.4" />
      </svg>
    );
  }
  if (name === "calendar") {
    return (
      <svg {...common}>
        <rect x="4" y="5.5" width="16" height="14" rx="1.6" />
        <path d="M8 3.8v3.4M16 3.8v3.4M4 10.2h16" />
      </svg>
    );
  }
  if (name === "video") {
    return (
      <svg {...common}>
        <rect x="3.4" y="6.2" width="12.4" height="11.6" rx="1.8" />
        <path d="m15.8 10.2 4.8-2.4v8.4l-4.8-2.4Z" />
      </svg>
    );
  }
  if (name === "library") {
    return (
      <svg {...common}>
        <path d="M5 6.2h5.2v12.2H5zM10.6 8.2h5.2v10.2h-5.2zM16.2 5.5h3.4v12.9h-3.4z" />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <path d="M12 20s-7-4.35-7-9.15A3.85 3.85 0 0 1 12 8.1a3.85 3.85 0 0 1 7 2.75C19 15.65 12 20 12 20Z" />
    </svg>
  );
}

type ShortcutItem = (typeof HERO_SHORTCUTS)[number];
type ShortcutBlock = { title: string; text: string };

function shortcutContent(item: ShortcutItem): { kicker: string; paragraphs: string[]; blocks: ShortcutBlock[] } {
  if (item.href === "/igreja") {
    const article = getArticle("/igreja/quem-somos");
    return {
      kicker: "Igreja",
      paragraphs: [
        "Arcebispos, mosteiros, paróquias, pastorais e a Ordem de São José — a vida institucional da Igreja Ortodoxa Grega G.O.C. no Brasil.",
        ...(article?.sections.slice(0, 3).flatMap((section) => section.body) || []),
      ],
      blocks: [
        { title: "Arcebispos", text: "O primaz do Santo Sínodo e o Arcebispo Metropolita da América do Sul." },
        { title: "Mosteiros", text: "O Mosteiro de São Basílio, casa de oração em Nova Iguaçu." },
        { title: "Paróquias", text: "Encontre uma comunidade por estado, cidade ou sacerdote." },
        { title: "Pastorais", text: "Acolhida, família, enfermos e formação." },
        { title: "Ordem de São José", text: "Serviço laical inspirado em São José." },
      ],
    };
  }

  if (item.href === "/comunidades") {
    return {
      kicker: "Comunidades",
      paragraphs: [
        "Onde a Igreja reza no Brasil. Horários e datas específicas devem ser confirmados com cada comunidade.",
      ],
      blocks: COMMUNITIES.map((community) => ({
        title: `${community.name} · ${community.city}`,
        text: [
          community.summary,
          community.clergy ? `Celebrante: ${community.clergy}.` : "",
          community.address || "",
          community.scheduleNote || "",
          community.phone ? `Telefone: ${community.phone}.` : community.pendingOfficial?.length
            ? `Ainda não publicados: ${community.pendingOfficial.join(", ")}.`
            : "",
        ]
          .filter(Boolean)
          .join(" "),
      })),
    };
  }

  if (item.href === "/calendario") {
    const article = getArticle("/calendario");
    return {
      kicker: "O tempo da Igreja",
      paragraphs: [LITURGICAL_NOTE, article?.intro || item.description],
      blocks: [
        ...MAJOR_FEASTS.map((feast) => ({ title: feast.name, text: feast.description })),
        ...LITURGICAL_FASTS.map((fast) => ({ title: fast.name, text: fast.description })),
      ],
    };
  }

  if (item.href === "/videos") {
    const article = getArticle("/videos");
    return {
      kicker: article?.kicker || "Ouvir e ver",
      paragraphs: [
        article?.intro || item.description,
        ...(article?.sections.flatMap((section) => section.body) || []),
        "Homilias, liturgia e catequese, quando o acervo oficial for publicado.",
      ],
      blocks: [],
    };
  }

  if (item.href === "/formacao") {
    const formation = getArticle("/formacao");
    const library = getArticle("/biblioteca");
    return {
      kicker: "Estude a fé",
      paragraphs: [formation?.intro || item.description, library?.intro || ""],
      blocks: FORMATION_LINKS.slice(0, 6).map((link) => ({ title: link.title, text: link.summary })),
    };
  }

  return {
    kicker: "Apoie a Igreja",
    paragraphs: [
      "Espaço institucional para apoio à manutenção, às obras, à evangelização e à formação. Dados bancários e PIX só serão publicados quando oficiais.",
    ],
    blocks: DONATION_PROJECTS.map((project) => ({ title: project.title, text: project.text })),
  };
}

function ShortcutModal({ item, onClose }: { item: ShortcutItem; onClose: () => void }) {
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);
  const content = shortcutContent(item);

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
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-burgundy text-gold-soft ring-1 ring-gold/30">
              <HeroShortcutIcon name={item.icon} />
            </span>
            <div>
              <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-burgundy">{content.kicker}</p>
              <h2 id={titleId} className="mt-1 font-serif text-2xl leading-tight text-ink sm:text-3xl">
                {item.label}
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
          {content.paragraphs.filter(Boolean).map((paragraph) => (
            <p key={paragraph} className="mt-3 text-base leading-7 text-ink first:mt-0">
              {paragraph}
            </p>
          ))}
          {content.blocks.length ? (
            <ul className="mt-5 space-y-2">
              {content.blocks.map((block) => (
                <li key={block.title} className="rounded-2xl border border-burgundy/10 bg-ivory px-4 py-3">
                  <p className="font-medium text-ink">{block.title}</p>
                  <p className="mt-0.5 text-sm leading-6 text-stone">{block.text}</p>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>
    </div>
  );
}

function FaqModal({ item, onClose }: { item: FaqItem; onClose: () => void }) {
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
      <button type="button" className="absolute inset-0 bg-ink/55" aria-label="Fechar pergunta" onClick={onClose} />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative z-10 flex max-h-[92vh] w-full max-w-2xl flex-col overflow-hidden rounded-t-3xl bg-white shadow-card sm:rounded-3xl"
      >
        <div className="flex items-start justify-between gap-4 border-b border-burgundy/10 px-5 py-4">
          <div className="min-w-0">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-burgundy">Perguntas frequentes</p>
            <h2 id={titleId} className="mt-1 font-serif text-2xl leading-tight text-ink sm:text-3xl">
              {item.question}
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
          <p className="text-base leading-7 text-ink sm:text-lg sm:leading-8">{item.answer}</p>
          {item.href ? (
            <Link className="btn btn-burgundy mt-6" to={item.href} onClick={onClose}>
              Ler o artigo completo
            </Link>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export function Home() {
  const [openShortcut, setOpenShortcut] = useState<ShortcutItem | null>(null);
  const [openFaq, setOpenFaq] = useState<FaqItem | null>(null);

  return (
    <div>
      <section className="relative isolate bg-ivory text-ink">
        <nav id="atalhos" aria-label="Atalhos da página inicial" className="site-section scroll-mt-24 px-4">
          <ul className="grid grid-cols-2 gap-2.5 sm:gap-3 lg:grid-cols-3">
            {HERO_SHORTCUTS.map((item) => (
              <li key={item.href}>
                <button
                  type="button"
                  aria-haspopup="dialog"
                  onClick={() => setOpenShortcut(item)}
                  className="group flex h-full w-full flex-col rounded-2xl border border-burgundy/10 bg-white p-3.5 text-left shadow-card transition hover:-translate-y-0.5 hover:border-gold/50 hover:shadow-[0_22px_40px_-24px_rgba(110,18,28,.55)] sm:flex-row sm:items-start sm:gap-4 sm:rounded-3xl sm:p-5"
                >
                  <span className="mb-3 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-burgundy text-gold-soft ring-1 ring-gold/30 sm:mb-0 sm:h-12 sm:w-12 sm:rounded-2xl">
                    <HeroShortcutIcon name={item.icon} />
                  </span>
                  <span className="min-w-0">
                    <span className="block font-serif text-[15px] leading-tight text-ink group-hover:text-burgundy sm:text-xl">
                      {item.label}
                    </span>
                    <span className="mt-1 line-clamp-2 text-xs leading-5 text-stone sm:mt-1.5 sm:text-sm sm:leading-6">
                      {item.description}
                    </span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </section>

      <EcclesiaNews />

      <section className="site-section">
        <div className="mx-auto max-w-7xl px-4">
          <h2 className="font-serif leading-tight">
            <span className="block text-lg text-[#6E121C] sm:text-xl">No Brasil e no mundo</span>
            <span className="mt-1 block text-3xl text-[#1A0E0C] sm:text-4xl">Igreja Ortodoxa Grega</span>
          </h2>
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {HIERARCHY_NEWS_CARDS.map((card) => (
              <article
                key={card.slug}
                className="flex h-full flex-col overflow-hidden rounded-2xl border border-[#d9e2ec] bg-white shadow-[0_8px_24px_-18px_rgba(15,23,42,.45)]"
              >
                <div className="aspect-[16/10] overflow-hidden bg-[#f6f1e8]">
                  <img
                    src={card.image}
                    alt={card.title}
                    className={`h-full w-full ${card.imageClass}`}
                    loading="lazy"
                    decoding="async"
                  />
                </div>
                <div className="flex flex-1 flex-col p-5 sm:p-6">
                  <h3 className="truncate font-serif text-lg leading-7 text-[#1b2430]">
                    {card.title}
                    <span className="font-sans text-sm font-medium text-burgundy"> · {card.kicker}</span>
                  </h3>
                  <p className="mt-3 h-[7.5rem] text-[15px] leading-6 text-stone line-clamp-5">
                    {card.body}
                  </p>
                  <p className="mt-4 text-sm text-stone/70">{card.meta}</p>
                  <Link
                    to={`/igreja/hierarquia/${card.slug}`}
                    className="mt-3 inline-flex w-fit items-center gap-1 text-[13px] font-semibold uppercase tracking-[0.08em] text-burgundy hover:underline"
                  >
                    Ler perfil
                    <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <LatestEvents />

      <VaticanNews />

      <section className="site-section mx-auto max-w-7xl px-4">
        <p className="kicker">Eparquia</p>
        <h2 className="mt-3 font-serif text-4xl">Homens a serviço da Igreja.</h2>
        <div className="mt-10 grid gap-5 lg:grid-cols-3">
          {featuredClergy.map((person) =>
            person ? (
              <Link
                key={person.slug}
                to={`/igreja/hierarquia/${person.slug}`}
                className="group relative isolate min-h-[420px] overflow-hidden rounded-3xl"
              >
                <img
                  src={person.image}
                  alt={person.name}
                  className="absolute inset-0 h-full w-full object-cover object-top transition duration-500 group-hover:scale-105"
                  loading="lazy"
                  decoding="async"
                />
                <div className="absolute inset-0 bg-[linear-gradient(transparent_25%,rgba(78,12,20,.92))]" />
                <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                  <h3 className="font-serif text-2xl">{person.name.replace(" de Noronha e Valdigem", "")}</h3>
                  <p className="mt-1 text-gold-soft">{person.role}</p>
                </div>
              </Link>
            ) : null,
          )}
        </div>
      </section>

      <section className="site-section px-4">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl bg-white px-4 py-16 sm:px-8 sm:py-20">
          <p className="kicker">Primeira vez aqui?</p>
          <h2 className="mt-3 font-serif text-4xl">É sua primeira vez conhecendo a Igreja Ortodoxa?</h2>
          <p className="mt-4 max-w-3xl text-lg text-stone">
            Visitantes são bem-vindos. Não é preciso saber grego nem memorizar o ofício. Basta chegar com respeito, observar
            e deixar a liturgia ensinar.
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[
              { title: "Quem pode visitar", text: "Todos. A Santa Comunhão é reservada aos fiéis ortodoxos preparados." },
              { title: "O que esperar", text: "Canto, ícones, incenso e uma liturgia que costuma durar de uma hora e meia a duas horas." },
              { title: "Como se portar", text: "Roupa recatada, silêncio, chegar alguns minutos antes e cumprimentar o sacerdote ao final." },
            ].map((item) => (
              <div key={item.title} className="rounded-3xl border border-burgundy/10 bg-ivory p-6">
                <h3 className="font-serif text-2xl">{item.title}</h3>
                <p className="mt-2 text-stone">{item.text}</p>
              </div>
            ))}
          </div>
          <Link className="btn btn-gold mt-8" to="/primeira-visita">
            Comece aqui
          </Link>
        </div>
      </section>

      <KnowOrthodoxy />

      <section className="site-section mx-auto max-w-7xl px-4">
        <p className="kicker">Comunidades</p>
        <h2 className="mt-3 font-serif text-4xl">Onde a Igreja reza no Brasil.</h2>
        <div className="mt-8 grid gap-4 md:grid-cols-3">
          {COMMUNITIES.map((community) => (
            <Link key={community.slug} to={community.href} className="rounded-3xl border border-burgundy/10 bg-white p-6 hover:shadow-card">
              <p className="text-sm font-bold uppercase tracking-[0.16em] text-burgundy">
                {community.city} · {community.state}
              </p>
              <h3 className="mt-3 font-serif text-2xl">{community.name}</h3>
              <p className="mt-2 text-stone">{community.summary}</p>
              {community.address ? <p className="mt-3 text-stone">{community.address}</p> : null}
              {community.scheduleNote ? <p className="mt-2 text-stone">{community.scheduleNote}</p> : null}
              {community.slug === "sao-paulo" && community.clergy ? (
                <p className="mt-2 text-stone">Celebrante: Padre Kelmon</p>
              ) : null}
            </Link>
          ))}
        </div>
        <Link className="btn btn-burgundy mt-8" to="/comunidades">
          Encontre uma Igreja
        </Link>
      </section>

      <section className="site-section px-4">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl bg-white px-4 py-12 sm:px-8 sm:py-14">
          <VideoGallery />
        </div>
      </section>

      <section className="full-bleed relative flex h-[350px] items-center justify-center overflow-hidden text-white">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat [background-attachment:fixed]"
          style={{ backgroundImage: `url(${SITE.heroImage})` }}
          aria-hidden="true"
        />
        <div className="absolute inset-0 bg-burgundy/80" aria-hidden="true" />
        <div className="relative mx-auto max-w-4xl px-4 text-center">
          <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-gold-soft">Convite</p>
          <h2 className="mt-2 font-serif text-4xl sm:text-5xl">Venha e veja.</h2>
          <p className="mx-auto mt-3 max-w-2xl text-lg text-ivory/90">
            Conheça a Igreja, prepare sua primeira visita e encontre uma comunidade.
          </p>
          <div className="mt-5 flex flex-col justify-center gap-3 sm:flex-row">
            <Link className="btn btn-gold" to="/primeira-visita">
              Comece aqui
            </Link>
            <Link className="btn btn-outline" to="/comunidades">
              Encontre uma comunidade
            </Link>
          </div>
        </div>
      </section>

      <section className="site-section mx-auto grid max-w-7xl gap-6 px-4 md:grid-cols-2">
        <div className="rounded-3xl border border-burgundy/10 bg-white p-8">
          <p className="kicker">Apoie a Igreja</p>
          <h2 className="mt-3 font-serif text-3xl">Sustente a vida litúrgica e missionária.</h2>
          <p className="mt-4 text-stone">
            Espaço institucional para manutenção, obras, evangelização e formação. Dados bancários serão publicados somente
            quando oficiais.
          </p>
          <Link className="btn btn-burgundy mt-6" to="/doacoes">
            Apoie a Igreja
          </Link>
        </div>
        <div className="rounded-3xl border border-burgundy/10 bg-white p-8">
          <p className="kicker">Contato</p>
          <h2 className="mt-3 font-serif text-3xl">Fale com uma comunidade.</h2>
          <p className="mt-4 text-stone">
            Telefone do Mosteiro de São Basílio: {COMMUNITIES[0].phone}. Pedidos de oração passam por moderação.
          </p>
          <div className="mt-6 flex flex-col gap-3 sm:flex-row">
            <Link className="btn btn-burgundy" to="/contato">
              Contato
            </Link>
            <a
              className="btn btn-outline-dark"
              href={`https://wa.me/${COMMUNITIES[0].whatsapp}`}
              onClick={() => trackEvent("click_whatsapp", { community: "nova-iguacu" })}
            >
              WhatsApp do mosteiro
            </a>
          </div>
        </div>
      </section>

      <section className="site-section px-4">
        <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl bg-white px-4 py-16 sm:px-8 sm:py-20">
          <p className="kicker">Perguntas frequentes</p>
          <h2 className="mt-3 font-serif text-4xl">O que as pessoas perguntam.</h2>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {FAQ_ITEMS.slice(0, 4).map((item) => (
              <button
                key={item.question}
                type="button"
                aria-haspopup="dialog"
                onClick={() => setOpenFaq(item)}
                className="rounded-3xl border border-burgundy/10 p-6 text-left hover:shadow-card"
              >
                <h3 className="font-serif text-xl">{item.question}</h3>
                <p className="mt-2 text-stone">{item.answer}</p>
              </button>
            ))}
          </div>
        </div>
      </section>
      {openShortcut ? <ShortcutModal item={openShortcut} onClose={() => setOpenShortcut(null)} /> : null}
      {openFaq ? <FaqModal item={openFaq} onClose={() => setOpenFaq(null)} /> : null}
    </div>
  );
}
