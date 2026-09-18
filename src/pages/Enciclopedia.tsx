import { Link } from "react-router-dom";
import { PageHero } from "../components/Article";
import { ARTICLES, iconForPath } from "../data/content";
import { NavLabel } from "../components/NavIcon";

const GROUPS = [
  {
    title: "Comece por aqui",
    paths: ["/ortodoxia/o-que-e-a-ortodoxia", "/ortodoxia/catolica-e-ortodoxa", "/primeira-visita", "/igreja/nossa-fe"],
  },
  {
    title: "Fé e liturgia",
    paths: ["/ortodoxia/divina-liturgia", "/ortodoxia/santos", "/ortodoxia/theotokos", "/ortodoxia/sacramentos", "/ortodoxia/oracao", "/ortodoxia/jejum"],
  },
  {
    title: "Vida da Igreja",
    paths: ["/calendario", "/ortodoxia/batismo", "/catequese", "/igreja/nossa-historia", "/comunidades"],
  },
  {
    title: "Institucional",
    paths: ["/igreja", "/santo-sinodo", "/igreja/hierarquia", "/mosteiro", "/missoes"],
  },
];

export function Enciclopedia() {
  return (
    <>
      <PageHero
        kicker="Enciclopédia ortodoxa"
        title="A biblioteca viva da Igreja Ortodoxa no Brasil"
        intro="Artigos para quem pesquisa a fé ortodoxa em português: doutrina, história, liturgia, santos, glossário e vida paroquial."
        crumbs={[{ href: "/enciclopedia", label: "Enciclopédia" }]}
      />
      <section className="mx-auto max-w-6xl px-4 py-12">
        <div className="mb-10 grid gap-3 sm:grid-cols-3">
          <Link to="/perguntas-frequentes" className="rounded-2xl border border-burgundy/10 bg-white p-5 hover:shadow-card">
            <h2 className="text-xl">
              <NavLabel icon="question" label="Perguntas frequentes" variant="badge" />
            </h2>
            <p className="mt-2 text-stone">O que o Google mais pergunta sobre a Ortodoxia, respondido com clareza.</p>
          </Link>
          <Link to="/glossario" className="rounded-2xl border border-burgundy/10 bg-white p-5 hover:shadow-card">
            <h2 className="text-xl">
              <NavLabel icon="glossary" label="Glossário" variant="badge" />
            </h2>
            <p className="mt-2 text-stone">Ícone, Theotokos, sínodo, jejum e os termos da liturgia.</p>
          </Link>
          <Link to="/pesquisa" className="rounded-2xl border border-burgundy/10 bg-white p-5 hover:shadow-card">
            <h2 className="text-xl">
              <NavLabel icon="search" label="Busca do portal" variant="badge" />
            </h2>
            <p className="mt-2 text-stone">Encontre qualquer artigo, paróquia ou perfil do clero.</p>
          </Link>
        </div>
        {GROUPS.map((group) => (
          <section key={group.title} className="mb-12">
            <h2 className="font-serif text-3xl">{group.title}</h2>
            <div className="mt-5 grid gap-3 md:grid-cols-2">
              {group.paths.map((path) => {
                const page = ARTICLES.find((item) => item.path === path);
                const extras: Record<string, string> = {
                  "/igreja/hierarquia": "Hierarquia e clero da Igreja no Brasil.",
                  "/comunidades": "Encontre uma comunidade ortodoxa por estado ou cidade.",
                  "/igreja": "Quem somos, história, fé e sucessão apostólica.",
                };
                const title =
                  page?.title ||
                  (path === "/igreja/hierarquia"
                    ? "Hierarquia e clero"
                    : path === "/comunidades"
                      ? "Comunidades no Brasil"
                      : path === "/igreja"
                        ? "A Igreja"
                        : path);
                const intro = page?.intro || extras[path] || "";
                return (
                  <Link key={path} to={path} className="rounded-2xl border border-burgundy/10 bg-white p-5 hover:shadow-card">
                    <h3 className="text-xl">
                      <NavLabel icon={iconForPath(path)} label={title} variant="badge" />
                    </h3>
                    <p className="mt-2 text-sm text-stone">{intro}</p>
                  </Link>
                );
              })}
            </div>
          </section>
        ))}
      </section>
    </>
  );
}
