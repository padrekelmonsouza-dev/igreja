import { useEffect, useMemo, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { getClergy } from "../data/clergy";
import { breadcrumbJsonLd, faqJsonLd, getPageSeo, websiteJsonLd } from "../data/seo";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { Seo } from "./Seo";

export function Layout() {
  const location = useLocation();
  const [showTop, setShowTop] = useState(false);
  const seo = useMemo(() => {
    const base = getPageSeo(location.pathname);
    if (location.pathname.startsWith("/hierarquia/")) {
      const person = getClergy(location.pathname.replace("/hierarquia/", ""));
      if (person) {
        return {
          ...base,
          title: `${person.name} | Clero da Igreja Ortodoxa no Brasil`,
          description: `${person.name}, ${person.role}. ${person.summary}`,
          noindex: false,
        };
      }
    }
    const q = new URLSearchParams(location.search).get("q");
    if (location.pathname === "/pesquisa" && q) {
      return {
        ...base,
        title: `Pesquisa: ${q} | Igreja Ortodoxa no Brasil`,
      };
    }
    return base;
  }, [location.pathname, location.search]);

  const jsonLd = useMemo(() => {
    if (location.pathname === "/") return websiteJsonLd();
    if (location.pathname === "/perguntas-frequentes") {
      return [websiteJsonLd(), faqJsonLd(), breadcrumbJsonLd(seo.path, "Perguntas frequentes")];
    }
    return [breadcrumbJsonLd(seo.path, seo.title.split("|")[0].trim())];
  }, [location.pathname, seo.path, seo.title]);

  useEffect(() => {
    window.scrollTo(0, 0);
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
    <div className="min-h-screen max-w-full overflow-x-hidden bg-cream text-ink">
      <Seo
        title={seo.title}
        description={seo.description}
        path={seo.path}
        type={seo.type}
        jsonLd={jsonLd}
        noindex={seo.noindex}
      />
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
