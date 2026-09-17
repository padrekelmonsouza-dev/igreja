import { Link } from "react-router-dom";
import { PageHero } from "../components/Article";
import { CLERGY } from "../data/clergy";

export function Hierarquia() {
  return (
    <>
      <PageHero
        kicker="Serviço à Igreja"
        title="Hierarquia e Clero"
        intro="Homens a serviço da Igreja."
        crumbs={[{ href: "/hierarquia", label: "Hierarquia e Clero" }]}
      />
      <div className="mx-auto grid max-w-6xl gap-5 px-4 py-12 md:grid-cols-2">
        {CLERGY.map((person) => (
          <Link
            key={person.slug}
            to={`/hierarquia/${person.slug}`}
            className="overflow-hidden rounded-3xl border border-[rgba(90,13,24,.12)] bg-white hover:shadow-card"
          >
            <div className="relative h-72">
              <img src={person.image} alt={person.name} className="h-full w-full object-cover object-top" />
            </div>
            <div className="p-6">
              <h2 className="text-2xl">{person.name}</h2>
              <p className="mt-1 text-burgundy">{person.role}</p>
              <p className="mt-3 text-muted">{person.summary}</p>
              <dl className="mt-4 space-y-1 text-sm">
                {person.facts.map((fact) => (
                  <div key={fact.label}>
                    <dt className="inline font-bold">{fact.label}: </dt>
                    <dd className="inline">{fact.value}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
}
