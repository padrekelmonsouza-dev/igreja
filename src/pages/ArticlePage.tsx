import { Navigate, useLocation } from "react-router-dom";
import { ArticleBody, PageHero } from "../components/Article";
import { getArticle } from "../data/content";

export function ArticlePage() {
  const { pathname } = useLocation();
  const page = getArticle(pathname);

  if (!page) {
    return <Navigate to="/" replace />;
  }

  return (
    <>
      <PageHero
        kicker={page.kicker}
        title={page.title}
        intro={page.intro}
        crumbs={[{ href: page.path, label: page.title }]}
      />
      <ArticleBody page={page} />
    </>
  );
}
