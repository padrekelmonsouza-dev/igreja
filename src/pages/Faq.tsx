import { Link } from "react-router-dom";
import { PageHero } from "../components/Article";
import { Related } from "../components/Related";
import { FAQ_ITEMS } from "../data/faq";

export function Faq() {
  return (
    <>
      <PageHero
        kicker="Perguntas frequentes"
        title="O que as pessoas perguntam sobre a Igreja Ortodoxa"
        intro="Respostas diretas, em português, para quem pesquisa a fé ortodoxa no Brasil — da primeira visita ao jejum, dos ícones ao Batismo."
        crumbs={[{ href: "/perguntas-frequentes", label: "Perguntas frequentes" }]}
      />
      <section className="mx-auto max-w-4xl px-4 py-12">
        <div className="space-y-4">
          {FAQ_ITEMS.map((item) => (
            <article key={item.question} className="rounded-3xl border border-burgundy/12 bg-white p-6">
              <h2 className="text-2xl">{item.question}</h2>
              <p className="mt-3 text-lg leading-8 text-[#3a342d]">{item.answer}</p>
              {item.href ? (
                <Link className="mt-4 inline-block text-burgundy underline underline-offset-4" to={item.href}>
                  Ler o artigo completo
                </Link>
              ) : null}
            </article>
          ))}
        </div>
      </section>
      <Related paths={["/ortodoxia/o-que-e-a-ortodoxia", "/ortodoxia/catolica-e-ortodoxa", "/primeira-visita", "/glossario"]} />
    </>
  );
}
