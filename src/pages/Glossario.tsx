import { Link } from "react-router-dom";
import { PageHero } from "../components/Article";
import { Related } from "../components/Related";
import { GLOSSARY } from "../data/glossary";

export function Glossario() {
  const grouped = GLOSSARY.reduce<Record<string, typeof GLOSSARY>>((acc, item) => {
    const letter = item.term.normalize("NFD").replace(/\p{Diacritic}/gu, "")[0].toUpperCase();
    acc[letter] = acc[letter] ? [...acc[letter], item] : [item];
    return acc;
  }, {});

  return (
    <>
      <PageHero
        kicker="Vocabulário da fé"
        title="Glossário da Igreja Ortodoxa"
        intro="Termos da liturgia, da teologia e da vida paroquial explicados em português para estudo, catequese e pesquisa."
        crumbs={[{ href: "/glossario", label: "Glossário" }]}
      />
      <section className="mx-auto max-w-4xl px-4 py-12">
        {Object.entries(grouped).map(([letter, terms]) => (
          <section key={letter} className="mb-10">
            <h2 className="mb-4 font-serif text-3xl text-burgundy">{letter}</h2>
            <div className="space-y-4">
              {terms.map((item) => (
                <article key={item.term} className="rounded-2xl border border-burgundy/12 bg-white p-5">
                  <h3 className="text-xl">{item.term}</h3>
                  <p className="mt-2 leading-7 text-[#3a342d]">{item.definition}</p>
                  {item.href ? (
                    <Link className="mt-2 inline-block text-sm text-burgundy underline underline-offset-4" to={item.href}>
                      Ver página
                    </Link>
                  ) : null}
                </article>
              ))}
            </div>
          </section>
        ))}
      </section>
      <Related paths={["/enciclopedia", "/ortodoxia/divina-liturgia", "/ortodoxia/o-que-e-a-ortodoxia"]} />
    </>
  );
}
