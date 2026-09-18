import { useEffect, useMemo, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { getClergy } from "../data/clergy";
import { SITE } from "../data/content";
import { MAIN_NAV } from "../data/navigation";
import {
  articleJsonLd,
  breadcrumbJsonLd,
  faqJsonLd,
  getPageSeo,
  organizationJsonLd,
  personJsonLd,
  placeJsonLd,
  websiteJsonLd,
} from "../data/seo";
import { initAnalytics, trackPageView } from "../lib/analytics";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { SearchProvider } from "./SearchModal";
import { Seo } from "./Seo";

function crumbsFor(pathname: string, label: string) {
  const parts = pathname.split("/").filter(Boolean);
  if (parts.length === 0) return [];
  const crumbs = [];
  let href = "";
  for (let index = 0; index < parts.length; index += 1) {
    href += `/${parts[index]}`;
    const navMatch = MAIN_NAV.find((item) => item.href === href);
    const childMatch = MAIN_NAV.flatMap((item) => item.children || []).find((item) => item.href === href);
    const text = index === parts.length - 1 ? label : childMatch?.label || navMatch?.label || parts[index];
    crumbs.push({ href, label: text });
  }
  return crumbs;
}

export function Layout() {
  const location = useLocation();
  const [showTop, setShowTop] = useState(false);
  const seo = useMemo(() => {
    const base = getPageSeo(location.pathname);
    if (location.pathname.startsWith("/igreja/hierarquia/")) {
      const person = getClergy(location.pathname.replace("/igreja/hierarquia/", ""));
      if (person) {
        return {
          ...base,
          title: `${person.name} | ${SITE.tabTitle}`,
          description: `${person.name}, ${person.role}. ${person.summary}`,
          noindex: false,
          image: person.image,
        };
      }
    }
    const q = new URLSearchParams(location.search).get("q");
    if (location.pathname === "/pesquisa" && q) {
      return {
        ...base,
        title: `Pesquisa: ${q} | ${SITE.tabTitle}`,
      };
    }
    return base;
  }, [location.pathname, location.search]);

  const jsonLd = useMemo(() => {
    const crumbs = crumbsFor(seo.path, seo.title.split("|")[0].trim());
    const blocks: object[] = [organizationJsonLd(), websiteJsonLd()];
    if (crumbs.length) blocks.push(breadcrumbJsonLd(crumbs));
    if (location.pathname === "/perguntas-frequentes" || location.pathname === "/ortodoxia/o-que-e-a-ortodoxia") {
      blocks.push(faqJsonLd());
    }
    if (seo.type === "article") {
      blocks.push(articleJsonLd({ title: seo.title, description: seo.description, path: seo.path, image: seo.image }));
    }
    if (location.pathname.startsWith("/igreja/hierarquia/")) {
      const person = personJsonLd(location.pathname.replace("/igreja/hierarquia/", ""));
      if (person) blocks.push(person);
    }
    if (location.pathname.startsWith("/comunidades/")) {
      const place = placeJsonLd(location.pathname.replace("/comunidades/", ""));
      if (place) blocks.push(place);
    }
    return blocks;
  }, [location.pathname, seo]);

  useEffect(() => {
    initAnalytics();
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    trackPageView(location.pathname + location.search, seo.title);
  }, [location.pathname, location.search, seo.title]);

  useEffect(() => {
    function onScroll() {
      setShowTop(window.scrollY > 500);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <SearchProvider>
    <div className="min-h-screen w-full overflow-x-hidden bg-ivory text-ink">
      <Seo
        title={seo.title}
        description={seo.description}
        path={seo.path}
        type={seo.type}
        jsonLd={jsonLd}
        noindex={seo.noindex}
        image={seo.image}
      />
      <a className="skip-link" href="#conteudo">
        Ir para o conteúdo
      </a>
      <Header />
      <div className="mx-auto w-full max-w-[1280px]">
        <main id="conteudo">
          <Outlet />
        </main>
      </div>
      <Footer />
      {showTop ? (
        <button
          type="button"
          className="fixed bottom-5 right-5 z-30 flex h-12 w-12 items-center justify-center rounded-full bg-burgundy text-gold shadow-card"
          aria-label="Voltar ao topo"
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        >
          ↑
        </button>
      ) : null}
    </div>
    </SearchProvider>
  );
}
