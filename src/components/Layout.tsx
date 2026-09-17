import { useEffect, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { ARTICLES, SITE } from "../data/content";
import { getClergy } from "../data/clergy";
import { Footer } from "./Footer";
import { Header } from "./Header";

function pageTitle(pathname: string) {
  if (pathname === "/") return SITE.name;
  if (pathname.startsWith("/hierarquia/")) {
    const person = getClergy(pathname.replace("/hierarquia/", ""));
    return person ? `${person.name} — ${SITE.shortName}` : SITE.name;
  }
  const labels: Record<string, string> = {
    "/hierarquia": "Hierarquia e Clero",
    "/paroquias": "Paróquias",
    "/comunidades": "Paróquias",
    "/pedido-de-oracao": "Pedido de Oração",
    "/pesquisa": "Pesquisa",
  };
  const article = ARTICLES.find((page) => page.path === pathname);
  const label = article?.title || labels[pathname];
  return label ? `${label} — ${SITE.shortName}` : SITE.name;
}

export function Layout() {
  const location = useLocation();
  const [showTop, setShowTop] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    document.title = pageTitle(location.pathname);
  }, [location.pathname]);

  useEffect(() => {
    function onScroll() {
      setShowTop(window.scrollY > 500);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="min-h-screen bg-cream text-ink">
      <a className="skip-link" href="#conteudo">
        Ir para o conteúdo
      </a>
      <Header />
      <main id="conteudo">
        <Outlet />
      </main>
      <Footer />
      {showTop ? (
        <button
          type="button"
          className="fixed bottom-5 right-5 z-30 flex h-12 w-12 items-center justify-center rounded-full bg-burgundy text-parchment shadow-card"
          aria-label="Voltar ao topo"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          ↑
        </button>
      ) : null}
    </div>
  );
}
