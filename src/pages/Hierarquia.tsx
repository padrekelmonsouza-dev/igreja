import { Link } from "react-router-dom";
import { PageHero } from "../components/Article";
import { KnowOrthodoxy } from "../components/KnowOrthodoxy";
import { OfficialNotice } from "../components/ShareBar";
import { clergyByCategory, type ClergyCategory, type ClergyProfile } from "../data/clergy";

const SECTIONS: {
  category: ClergyCategory;
  extra?: ClergyCategory[];
  id: string;
  kicker: string;
  title: string;
  intro: string;
  layout: "featured" | "grid" | "wide" | "padres";
}[] = [
  {
    category: "arcebispo",
    id: "arcebispos",
    kicker: "Arcebispos",
    title: "O primaz e o metropolita.",
    intro: "O Santo Sínodo e o Arcebispo Metropolita da América do Sul.",
    layout: "featured",
  },
  {
    category: "presbitero",
    extra: ["sacerdote-casado"],
    id: "padres",
    kicker: "Padres",
    title: "Padres a serviço da Igreja.",
    intro: "Padres já apresentados neste portal, com os dados oficiais publicados.",
    layout: "padres",
  },
  {
    category: "sacerdote-monge",
    id: "sacerdote-monge",
    kicker: "Sacerdote monge",
    title: "Sacerdote monge.",
    intro: "Incardinado na Eparquia de São Paulo.",
    layout: "wide",
  },
  {
    category: "seminarista",
    id: "seminaristas",
    kicker: "Seminaristas",
    title: "Formação para o ministério.",
    intro: "Quem se prepara para o ministério na Igreja Ortodoxa Grega G.O.C. no Brasil.",
    layout: "grid",
  },
];

function peopleFor(section: (typeof SECTIONS)[number]) {
  return [section.category, ...(section.extra ?? [])].flatMap((category) => clergyByCategory(category));
}

function displayName(person: ClergyProfile) {
  return person.name.replace(" de Noronha e Valdigem", "");
}

function PortraitCard({ person, compact }: { person: ClergyProfile; compact?: boolean }) {
  return (
    <Link
      to={`/igreja/hierarquia/${person.slug}`}
      className="group relative isolate flex h-full min-h-[420px] flex-col overflow-hidden rounded-[1.75rem] bg-burgundy shadow-card"
    >
      <img
        src={person.image}
        alt={person.name}
        className="absolute inset-0 h-full w-full object-cover object-top transition duration-500 group-hover:scale-105"
        loading="lazy"
        decoding="async"
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_28%,rgba(78,12,20,.94))]" />
      <div className="relative mt-auto p-5 text-white sm:p-6">
        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-gold-soft">{person.role}</p>
        <h3
          className={
            compact
              ? "mt-1 truncate font-serif text-[1.05rem] leading-none tracking-tight whitespace-nowrap sm:text-lg"
              : "mt-1 font-serif text-2xl leading-tight sm:text-3xl"
          }
        >
          {displayName(person)}
        </h3>
        <dl className="mt-4 flex flex-wrap gap-2">
          {person.facts
            .filter((fact) => fact.label !== "Eparquia")
            .slice(0, 3)
            .map((fact) => (
              <div key={fact.label} className="rounded-full bg-white/12 px-3 py-1 text-xs text-ivory/90 ring-1 ring-white/15">
                <dt className="inline font-semibold">{fact.label}: </dt>
                <dd className="inline">{fact.value}</dd>
              </div>
            ))}
        </dl>
      </div>
    </Link>
  );
}

function WideCard({ person }: { person: ClergyProfile }) {
  return (
    <Link
      to={`/igreja/hierarquia/${person.slug}`}
      className="group grid overflow-hidden rounded-[1.75rem] bg-white shadow-card ring-1 ring-burgundy/10 lg:grid-cols-[minmax(280px,38%)_1fr]"
    >
      <div className="relative min-h-[280px] overflow-hidden bg-parchment lg:min-h-[340px]">
        <img
          src={person.image}
          alt={person.name}
          className="absolute inset-0 h-full w-full object-cover object-top transition duration-500 group-hover:scale-105"
          loading="lazy"
          decoding="async"
        />
      </div>
      <div className="flex flex-col justify-center p-6 sm:p-8 lg:p-10">
        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-burgundy">{person.role}</p>
        <h3 className="mt-2 font-serif text-3xl leading-tight text-ink sm:text-4xl">{person.name}</h3>
        <p className="mt-4 max-w-2xl text-base leading-7 text-stone">{person.summary}</p>
        <dl className="mt-6 grid gap-3 sm:grid-cols-2">
          {person.facts.map((fact) => (
            <div key={fact.label} className="rounded-2xl bg-ivory px-4 py-3 ring-1 ring-burgundy/10">
              <dt className="text-[11px] font-bold uppercase tracking-[0.16em] text-burgundy">{fact.label}</dt>
              <dd className="mt-1 text-ink">{fact.value}</dd>
            </div>
          ))}
        </dl>
      </div>
    </Link>
  );
}

export function Hierarquia() {
  return (
    <>
      <PageHero
        kicker="Serviço à Igreja"
        title="Clero"
        intro="Arcebispos, padres e seminaristas da Igreja Ortodoxa Grega G.O.C. no Brasil."
        crumbs={[{ href: "/clero", label: "Clero" }]}
      />

      {SECTIONS.map((section) => {
        const people = peopleFor(section);
        if (people.length === 0) {
          return (
            <section key={section.category} id={section.id} className="site-section mx-auto w-full max-w-[1280px] px-4">
              <p className="kicker">{section.kicker}</p>
              <h2 className="mt-3 font-serif text-4xl">{section.title}</h2>
              <div className="mt-8">
                <OfficialNotice>
                  Ainda não há nomes publicados nesta seção. O espaço está pronto para receber os dados oficiais.
                </OfficialNotice>
              </div>
            </section>
          );
        }

        return (
          <section key={section.category} id={section.id} className="site-section mx-auto w-full max-w-[1280px] px-4">
            <div>
              <p className="kicker">{section.kicker}</p>
              <h2 className="mt-3 font-serif text-4xl">{section.title}</h2>
              <p className="mt-3 max-w-3xl text-stone">{section.intro}</p>
            </div>

            {section.layout === "wide" ? (
              <div className="mt-8 space-y-5">
                {people.map((person) => (
                  <WideCard key={person.slug} person={person} />
                ))}
              </div>
            ) : section.layout === "padres" ? (
              <div className="mt-8 grid gap-5 lg:grid-cols-4">
                {people.map((person) => (
                  <PortraitCard key={person.slug} person={person} compact />
                ))}
              </div>
            ) : (
              <div
                className={`mt-8 grid gap-5 ${
                  section.layout === "featured" ? "md:grid-cols-2" : "sm:grid-cols-2 lg:grid-cols-3"
                }`}
              >
                {people.map((person) => (
                  <PortraitCard key={person.slug} person={person} compact={section.layout !== "featured"} />
                ))}
              </div>
            )}
          </section>
        );
      })}

      <KnowOrthodoxy />
    </>
  );
}
