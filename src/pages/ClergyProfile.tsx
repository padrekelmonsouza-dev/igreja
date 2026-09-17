import { Link, Navigate, useParams } from "react-router-dom";
import { PageHero } from "../components/Article";
import { getClergy } from "../data/clergy";

export function ClergyProfile() {
  const { slug } = useParams();
  const person = slug ? getClergy(slug) : undefined;

  if (!person) {
    return <Navigate to="/hierarquia" replace />;
  }

  return (
    <>
      <PageHero
        kicker="Hierarquia e Clero"
        title={person.name}
        intro={person.role}
        crumbs={[
          { href: "/hierarquia", label: "Hierarquia" },
          { href: `/hierarquia/${person.slug}`, label: person.name },
        ]}
      />
      <article className="mx-auto grid max-w-6xl gap-10 px-4 py-12 lg:grid-cols-[280px_1fr]">
        <aside>
          <img src={person.image} alt={person.name} className="w-full rounded-3xl object-cover shadow-card" />
          <div className="mt-5 rounded-3xl border border-[rgba(90,13,24,.12)] bg-white p-5">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-burgundy">Dados oficiais</p>
            <dl className="mt-4 space-y-3">
              {person.facts.map((fact) => (
                <div key={fact.label}>
                  <dt className="text-sm text-muted">{fact.label}</dt>
                  <dd className="text-lg">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </aside>
        <div className="prose-church">
          {person.sections.map((section) => (
            <section key={section.title} className="mb-10">
              <h2>{section.title}</h2>
              {section.body.map((paragraph) => (
                <p key={paragraph} className="text-lg leading-8 text-[#3a342d]">
                  {paragraph}
                </p>
              ))}
            </section>
          ))}
          <Link className="btn btn-burgundy" to="/hierarquia">
            Ver todo o clero
          </Link>
        </div>
      </article>
    </>
  );
}
