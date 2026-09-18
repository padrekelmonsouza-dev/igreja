import { Navigate, useLocation } from "react-router-dom";
import { ArticleBody, PageHero } from "../components/Article";
import { Related } from "../components/Related";
import { getArticle } from "../data/content";
import type { Crumb } from "../data/seo";

function crumbsFor(path: string, title: string): Crumb[] {
  const crumbs: Crumb[] = [];
  if (path.startsWith("/igreja/")) crumbs.push({ href: "/igreja", label: "A Igreja" });
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
      <ArticleBody page={page} />
      <Related paths={page.related} />
    </>
  );
}
