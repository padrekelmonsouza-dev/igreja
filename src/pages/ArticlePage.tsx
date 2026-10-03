import { Navigate, useLocation } from "react-router-dom";
import { ArticleBody, PageHero } from "../components/Article";
import { AbbotSection, FounderSection } from "../components/FounderSection";
import { QuemSomosIntro } from "../components/QuemSomosIntro";
import { Related } from "../components/Related";
import { getArticle } from "../data/content";
import type { Crumb } from "../data/seo";

const IGREJA_PAGES = new Set(["/mosteiro", "/pastorais", "/ordem-de-sao-jose", "/paroquias"]);

function crumbsFor(path: string, title: string): Crumb[] {
  const crumbs: Crumb[] = [];
  if (path.startsWith("/igreja/") || IGREJA_PAGES.has(path)) crumbs.push({ href: "/igreja", label: "Igreja" });
  if (path.startsWith("/ortodoxia/")) crumbs.push({ href: "/ortodoxia", label: "Ortodoxia" });
  if (path.startsWith("/formacao/")) crumbs.push({ href: "/formacao", label: "Formação" });
  crumbs.push({ href: path, label: title });
  return crumbs;
}

export function ArticlePage() {
  const { pathname } = useLocation();
  const page = getArticle(pathname);

  if (!page) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <PageHero kicker={page.kicker} title={page.title} intro={page.intro} crumbs={crumbsFor(page.path, page.title)} />
      {page.path === "/ordem-de-sao-jose" ? <FounderSection /> : null}
      {page.path === "/mosteiro" ? <AbbotSection /> : null}
      {page.path === "/igreja/quem-somos" ? <QuemSomosIntro /> : null}
      <ArticleBody page={page} />
      <Related paths={page.related} />
    </>
  );
}
