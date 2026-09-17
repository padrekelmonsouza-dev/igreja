import { Link } from "react-router-dom";
import { PageHero } from "../components/Article";
import { ARTICLES } from "../data/content";

const GROUPS = [
  {
    title: "Comece por aqui",
    paths: ["/o-que-e-igreja-ortodoxa", "/catolica-e-ortodoxa", "/primeira-visita", "/fe"],
  },
  {
    title: "Fé e liturgia",
    paths: ["/liturgia", "/santos", "/theotokos", "/formacao/misterios", "/oracao-de-jesus", "/jejum-ortodoxo"],
  },
  {
    title: "Vida da Igreja",
    paths: ["/calendario", "/batismo-ortodoxo", "/catequese", "/historia-da-igreja-ortodoxa", "/paroquias"],
  },
  {
    title: "Institucional",
    paths: ["/igreja", "/santo-sinodo", "/hierarquia", "/mosteiro", "/missoes"],
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
          <Link to="/perguntas-frequentes" className="rounded-2xl border border-[rgba(90,13,24,.12)] bg-white p-5 hover:shadow-card">
            <h2 className="text-xl">Perguntas frequentes</h2>
            <p className="mt-2 text-muted">O que o Google mais pergunta sobre a Ortodoxia, respondido com clareza.</p>
          </Link>
          <Link to="/glossario" className="rounded-2xl border border-[rgba(90,13,24,.12)] bg-white p-5 hover:shadow-card">
            <h2 className="text-xl">Glossário</h2>
            <p className="mt-2 text-muted">Ícone, Theotokos, sínodo, jejum e os termos da liturgia.</p>
          </Link>
          <Link to="/pesquisa" className="rounded-2xl border border-[rgba(90,13,24,.12)] bg-white p-5 hover:shadow-card">
            <h2 className="text-xl">Busca do portal</h2>
            <p className="mt-2 text-muted">Encontre qualquer artigo, paróquia ou perfil do clero.</p>
          </Link>
        </div>
        {GROUPS.map((group) => (
          <section key={group.title} className="mb-12">
            <h2 className="font-serif text-3xl">{group.title}</h2>
            <div className="mt-5 grid gap-3 md:grid-cols-2">
              {group.paths.map((path) => {
                const page = ARTICLES.find((item) => item.path === path);
                const extras: Record<string, string> = {
                  "/hierarquia": "Hierarquia e clero da Igreja no Brasil.",
                  "/paroquias": "Encontre uma comunidade ortodoxa por estado ou cidade.",
                };
                const title =
                  page?.title ||
                  (path === "/hierarquia" ? "Hierarquia e clero" : path === "/paroquias" ? "Paróquias no Brasil" : path);
                const intro = page?.intro || extras[path] || "";
                return (
                  <Link key={path} to={path} className="rounded-2xl border border-[rgba(90,13,24,.12)] bg-white p-5 hover:shadow-card">
                    <h3 className="text-xl">{title}</h3>
                    <p className="mt-2 text-sm text-muted">{intro}</p>
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
