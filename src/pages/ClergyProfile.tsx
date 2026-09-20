import { Link, Navigate, useParams } from "react-router-dom";
import { PageHero } from "../components/Article";
import { getClergy, isArchbishop } from "../data/clergy";

export function ClergyProfile() {
  const { slug } = useParams();
  const person = slug ? getClergy(slug) : undefined;

  if (!person) {
    return <Navigate to="/clero" replace />;
  }

  const archbishop = isArchbishop(person.slug);

  return (
    <>
      <PageHero
        kicker={archbishop ? "Arcebispos" : "Clero"}
        title={person.name}
        intro={person.role}
        crumbs={
          archbishop
            ? [
                { href: "/igreja", label: "Igreja" },
                { href: "/igreja/arcebispos", label: "Arcebispos" },
                { href: `/igreja/hierarquia/${person.slug}`, label: person.name },
              ]
            : [
                { href: "/clero", label: "Clero" },
                { href: `/igreja/hierarquia/${person.slug}`, label: person.name },
              ]
        }
      />
      <article className="mx-auto grid max-w-6xl gap-10 px-4 py-12 lg:grid-cols-[280px_1fr]">
        <aside>
          <img
            src={person.image}
            alt={person.name}
            className="w-full rounded-3xl object-cover shadow-card"
            loading="lazy"
            decoding="async"
          />
          <div className="mt-5 rounded-3xl border border-burgundy/10 bg-white p-5">
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-burgundy">Dados oficiais</p>
            <dl className="mt-4 space-y-3">
              {person.facts.map((fact) => (
                <div key={fact.label}>
                  <dt className="text-sm text-stone">{fact.label}</dt>
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
          <Link className="btn btn-burgundy" to={archbishop ? "/igreja/arcebispos" : "/clero"}>
            {archbishop ? "Ver os arcebispos" : "Ver todo o clero"}
          </Link>
        </div>
      </article>
    </>
  );
}
