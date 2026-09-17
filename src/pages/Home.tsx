import { FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CLERGY } from "../data/clergy";
import { MENU_LINKS } from "../data/content";
import { FAQ_ITEMS } from "../data/faq";

const STEPS = [
  { n: "01", title: "O que é a Ortodoxia?", href: "/o-que-e-igreja-ortodoxa" },
  { n: "02", title: "Quem é Jesus Cristo?", href: "/formacao/jesus-cristo" },
  { n: "03", title: "O que é a Igreja?", href: "/formacao/igreja" },
  { n: "04", title: "Os Santos e os Ícones", href: "/santos" },
  { n: "05", title: "A Divina Liturgia", href: "/liturgia" },
  { n: "06", title: "Os Santos Mistérios", href: "/formacao/misterios" },
  { n: "07", title: "Jejum e oração", href: "/formacao/jejum-e-oracao" },
  { n: "08", title: "Calendário Antigo", href: "/calendario" },
  { n: "09", title: "Encontre uma comunidade", href: "/paroquias" },
];

const INTROS = [
  {
    icon: "✝",
    title: "O que é a Ortodoxia?",
    text: "Uma introdução à Igreja, sua fé, história e Tradição Apostólica.",
    href: "/o-que-e-igreja-ortodoxa",
  },
  {
    icon: "🕯",
    title: "Divina Liturgia",
    text: "Entenda cada momento da celebração e como participar pela primeira vez.",
    href: "/liturgia",
  },
  {
    icon: "☦",
    title: "Ícones e Santos",
    text: "Conheça a veneração dos Santos e o significado espiritual dos ícones.",
    href: "/santos",
  },
  {
    icon: "📅",
    title: "Calendário Patrístico",
    text: "Explore festas, santos, leituras e períodos de jejum do calendário litúrgico.",
    href: "/calendario",
  },
  {
    icon: "⚖",
    title: "Católica e Ortodoxa",
    text: "As diferenças e o que há em comum, explicadas com respeito.",
    href: "/catolica-e-ortodoxa",
  },
  {
    icon: "🚪",
    title: "Primeira visita",
    text: "O que vestir, se pode comungar e o que esperar na liturgia.",
    href: "/primeira-visita",
  },
];

const LIBRARY = [
  {
    icon: "📖",
    title: "Enciclopédia Ortodoxa",
    text: "Páginas aprofundadas sobre doutrina, história, liturgia, Santos Padres e tradição.",
    href: "/enciclopedia",
  },
  {
    icon: "📰",
    title: "Notícias e artigos",
    text: "Atualizações da Igreja, reflexões, homilias e conteúdo editorial.",
    href: "/noticias",
  },
  {
    icon: "🎥",
    title: "Vídeos e homilias",
    text: "Um acervo organizado por sacerdote, tema, data e comunidade.",
    href: "/videos",
  },
  {
    icon: "📚",
    title: "Biblioteca",
    text: "Livros, revistas, documentos e materiais de formação em um só lugar.",
    href: "/biblioteca",
  },
];

const featuredClergy = ["padre-kelmon-luis", "padre-joao-damasceno", "dom-leontios"]
  .map((slug) => CLERGY.find((person) => person.slug === slug))
  .filter(Boolean);

function HomeSearch() {
  const navigate = useNavigate();
  function onSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const q = String(new FormData(event.currentTarget).get("q") || "").trim();
    navigate(q ? `/pesquisa?q=${encodeURIComponent(q)}` : "/pesquisa");
  }
  return (
    <form onSubmit={onSearch} className="search-form mt-8 max-w-2xl">
      <label className="sr-only" htmlFor="home-search">
        Pesquisar Igreja Ortodoxa
      </label>
      <input
        id="home-search"
        name="q"
        type="search"
        placeholder="Ex.: diferença entre católica e ortodoxa"
        className="search-field flex-1 border-0 text-ink outline-none"
      />
      <button className="btn btn-gold px-10" type="submit">
        Pesquisar
      </button>
    </form>
  );
}

export function Home() {
  return (
    <div>
      <section className="relative isolate min-h-[88vh] overflow-hidden text-white">
        <img
          src="/media/hero-proto.png"
          alt="Celebração ortodoxa"
          className="absolute inset-0 h-full w-full object-cover object-[center_30%]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(18,11,8,.90),rgba(18,11,8,.55)_45%,rgba(18,11,8,.25))]" />
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_75%_35%,rgba(239,213,138,.22),rgba(0,0,0,0)_34%)]" />
        <div className="relative mx-auto flex min-h-[88vh] max-w-6xl flex-col justify-end px-4 pb-16 pt-28 sm:pb-24">
          <p className="text-[11px] font-bold uppercase tracking-[0.12em] text-gold-soft sm:tracking-[0.32em]">
            Portal de referência da Igreja Ortodoxa no Brasil
          </p>
          <h1 className="mt-5 max-w-3xl break-words font-serif text-4xl leading-tight sm:text-7xl">Vinde e vede.</h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-parchment/95 sm:text-xl">
            O lugar para entender a fé ortodoxa em português: o que é a Igreja Ortodoxa, a Divina Liturgia, os Santos,
            os ícones, o jejum e onde encontrar uma comunidade no Brasil.
          </p>
          <HomeSearch />
          <div className="mt-6 flex max-w-2xl flex-col gap-3">
            <Link className="btn btn-outline w-full" to="/o-que-e-igreja-ortodoxa">
              O que é a Igreja Ortodoxa
            </Link>
            <Link className="btn btn-outline w-full" to="/paroquias">
              Encontrar uma comunidade
            </Link>
          </div>
          <a href="#portal" className="mt-10 text-sm tracking-wide text-white/80">
            Explore o portal ↓
          </a>
        </div>
      </section>

      <section id="portal" className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-20 lg:grid-cols-2">
        <div>
          <p className="kicker">Uma tradição viva</p>
          <h2 className="mt-3 font-serif text-4xl leading-tight sm:text-5xl">A referência da Ortodoxia em português.</h2>
          <p className="mt-5 text-lg leading-8 text-muted">
            Este portal foi feito para quem pesquisa “Igreja Ortodoxa” no Brasil: explicações profundas, vocabulário
            claro, guias de primeira visita e caminhos até uma comunidade viva.
          </p>
          <Link className="btn btn-burgundy mt-8" to="/enciclopedia">
            Abrir a enciclopédia
          </Link>
        </div>
        <img
          src="/media/painel-oficial.jpg"
          alt="Igreja Ortodoxa Grega G.O.C. no Brasil, Santo Sínodo de Eugenio de Atenas, Ortodoxia do Velho Calendário"
          className="w-full rounded-3xl shadow-card"
        />
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16">
        <p className="kicker">Acesso rápido</p>
        <h2 className="mt-3 font-serif text-4xl">Navegue pelo portal.</h2>
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {MENU_LINKS.map((link) => (
            <Link
              key={link.href}
              to={link.href}
              className="rounded-[18px] border border-[rgba(90,13,24,.14)] bg-white px-[16.8px] py-4 transition hover:-translate-y-0.5 hover:shadow-card"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-[rgba(246,239,223,.45)] py-20">
        <div className="mx-auto max-w-6xl px-4">
          <p className="kicker">Conheça a fé</p>
          <h2 className="mt-3 font-serif text-4xl">Comece por onde você estiver.</h2>
          <p className="mt-4 max-w-3xl text-lg text-muted">
            Conteúdo organizado para explicar a fé com profundidade, clareza e respeito.
          </p>
          <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {INTROS.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="rounded-3xl border border-[rgba(90,13,24,.12)] bg-white p-6 transition hover:shadow-card"
              >
                <div className="text-2xl">{item.icon}</div>
                <h3 className="mt-3 text-2xl">{item.title}</h3>
                <p className="mt-2 text-muted">{item.text}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20">
        <p className="kicker">O que as pessoas perguntam</p>
        <h2 className="mt-3 font-serif text-4xl">Perguntas sobre a Igreja Ortodoxa.</h2>
        <p className="mt-4 max-w-3xl text-lg text-muted">
          Respostas prontas para as buscas mais comuns em português — da diferença com a Igreja Católica à primeira visita.
        </p>
        <div className="mt-8 grid gap-4 md:grid-cols-2">
          {FAQ_ITEMS.slice(0, 6).map((item) => (
            <Link
              key={item.question}
              to={item.href || "/perguntas-frequentes"}
              className="rounded-3xl border border-[rgba(90,13,24,.12)] bg-white p-6 hover:shadow-card"
            >
              <h3 className="text-xl">{item.question}</h3>
              <p className="mt-2 text-muted">{item.answer}</p>
            </Link>
          ))}
        </div>
        <Link className="btn btn-burgundy mt-8" to="/perguntas-frequentes">
          Ver todas as perguntas
        </Link>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-20">
        <p className="kicker">Primeiros passos</p>
        <h2 className="mt-3 font-serif text-4xl">Descubra a Ortodoxia em 9 passos.</h2>
        <p className="mt-4 max-w-3xl text-lg text-muted">
          Uma jornada guiada para quem está chegando agora e quer entender antes de visitar uma comunidade.
        </p>
        <div className="mt-8 divide-y divide-[rgba(90,13,24,.1)] overflow-hidden rounded-3xl border border-[rgba(90,13,24,.12)] bg-white">
          {STEPS.map((step) => (
            <Link key={step.href} to={step.href} className="flex items-center gap-5 px-5 py-4 hover:bg-parchment/60">
              <span className="w-10 text-sm font-bold text-gold">{step.n}</span>
              <span className="text-lg">{step.title}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-[rgba(246,239,223,.45)] py-20">
        <div className="mx-auto max-w-6xl px-4">
          <p className="kicker">Hierarquia e clero</p>
          <h2 className="mt-3 font-serif text-4xl">Homens a serviço da Igreja.</h2>
          <p className="mt-4 max-w-3xl text-lg text-muted">
            Perfis biográficos, ministério, ordenação, homilias, catequeses e registros históricos — com informações
            oficiais.
          </p>
          <div className="mt-10 grid gap-5 lg:grid-cols-3">
            {featuredClergy.map((person) =>
              person ? (
                <Link
                  key={person.slug}
                  to={`/hierarquia/${person.slug}`}
                  className="group relative isolate min-h-[420px] overflow-hidden rounded-3xl"
                >
                  <img src={person.image} alt={person.name} className="absolute inset-0 h-full w-full object-cover object-top transition duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-[linear-gradient(transparent_25%,rgba(0,0,0,.92))]" />
                  <div className="absolute inset-x-0 bottom-0 p-6 text-white">
                    <h3 className="text-2xl">{person.name.replace(" de Noronha e Valdigem", "")}</h3>
                    <p className="mt-1 text-gold-soft">{person.role}</p>
                    {person.facts.slice(0, 2).map((fact) => (
                      <p key={fact.label} className="mt-1 text-sm text-white/80">
                        <strong>{fact.label}:</strong> {fact.value}
                      </p>
                    ))}
                    {person.slug === "dom-leontios" ? (
                      <p className="mt-2 text-sm text-white/80">{person.summary}</p>
                    ) : null}
                  </div>
                </Link>
              ) : null,
            )}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-20">
        <p className="kicker">Autoridade e missão</p>
        <h2 className="mt-3 font-serif text-4xl">Uma Igreja com história, presença e missão.</h2>
        <p className="mt-4 max-w-3xl text-lg text-muted">
          O portal terá páginas institucionais para o Santo Sínodo, a hierarquia, as comunidades e as missões, sempre
          separando informação oficial de conteúdo editorial.
        </p>
        <div className="mt-10 grid gap-5 md:grid-cols-2">
          {[CLERGY[0], CLERGY[1]].map((person) => (
            <Link key={person.slug} to={`/hierarquia/${person.slug}`} className="overflow-hidden rounded-3xl border border-[rgba(90,13,24,.12)] bg-white">
              <div className="relative h-64">
                <img src={person.image} alt={person.name} className="h-full w-full object-cover object-top" />
              </div>
              <div className="p-6">
                <h3 className="text-2xl">{person.name}</h3>
                <p className="mt-2 text-muted">{person.summary}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="bg-[rgba(246,239,223,.45)] py-20">
        <div className="mx-auto max-w-6xl px-4">
          <p className="kicker">Portal de conhecimento</p>
          <h2 className="mt-3 font-serif text-4xl">Uma biblioteca viva da fé.</h2>
          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {LIBRARY.map((item) => (
              <Link key={item.href} to={item.href} className="rounded-3xl border border-[rgba(90,13,24,.12)] bg-white p-6 hover:shadow-card">
                <div className="text-2xl">{item.icon}</div>
                <h3 className="mt-3 text-2xl">{item.title}</h3>
                <p className="mt-2 text-muted">{item.text}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="relative isolate overflow-hidden py-24 text-white">
        <img src="/media/hero-proto.png" alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(18,11,8,.92),rgba(18,11,8,.72))]" />
        <div className="relative mx-auto max-w-4xl px-4 text-center">
          <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-gold-soft">Venha e veja</p>
          <h2 className="mt-3 font-serif text-4xl sm:text-5xl">Encontre uma comunidade perto de você.</h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg text-parchment/90">
            O visitante poderá escolher estado ou cidade e encontrar comunidades, horários, contatos, mapa, fotos e
            orientações para sua primeira visita.
          </p>
          <Link className="btn btn-gold mt-8" to="/paroquias">
            Ver comunidades
          </Link>
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-6 px-4 py-20 md:grid-cols-3">
        {[
          { n: "01 · CONHEÇA", title: "Descubra a fé", text: "Comece pelos conteúdos introdutórios." },
          { n: "02 · APROFUNDE", title: "Estude e ore", text: "Explore liturgia, Santos, ícones, jejum e formação." },
          { n: "03 · PARTICIPE", title: "Vá à comunidade", text: "Encontre horários e saiba o que esperar na primeira visita." },
        ].map((item) => (
          <div key={item.title} className="rounded-3xl border border-[rgba(90,13,24,.12)] bg-white p-6">
            <p className="text-sm font-bold text-burgundy">{item.n}</p>
            <h3 className="mt-3 text-2xl">{item.title}</h3>
            <p className="mt-2 text-muted">{item.text}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
