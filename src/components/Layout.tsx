import { useEffect, useMemo, useState } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { getClergy } from "../data/clergy";
import { getCommunity } from "../data/communities";
import { SITE } from "../data/content";
import { FOOTER_INSTITUTIONAL, FOOTER_LEARN, FOOTER_LEGAL, MAIN_NAV } from "../data/navigation";
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
import { Breadcrumbs } from "./Breadcrumbs";
import { Footer } from "./Footer";
import { Header } from "./Header";
import { PastoralVocacional } from "./PastoralVocacional";
import { SupportContact } from "./SupportContact";
import { SiteHero } from "./SiteHero";
import { QuemSomosProvider } from "./QuemSomosModal";
import { SearchProvider } from "./SearchModal";
import { Seo } from "./Seo";

function labelForHref(href: string, fallback: string) {
  if (href === "/igreja/hierarquia") return "Clero";
  const links = [
    ...MAIN_NAV.map((item) => ({ href: item.href, label: item.label })),
    ...MAIN_NAV.flatMap((item) => item.children || []),
    ...FOOTER_INSTITUTIONAL,
    ...FOOTER_LEARN,
    ...FOOTER_LEGAL,
  ];
  const nav = links.find((item) => item.href === href);
  if (nav) return nav.label;
  if (href.startsWith("/igreja/hierarquia/")) {
    return getClergy(href.replace("/igreja/hierarquia/", ""))?.name || fallback;
  }
  if (href.startsWith("/comunidades/") && href !== "/comunidades") {
    return getCommunity(href.replace("/comunidades/", ""))?.name || fallback;
  }
  const seoName = getPageSeo(href).title.split("|")[0].trim();
  return seoName || fallback;
}

function crumbsFor(pathname: string, label: string) {
  const parts = pathname.split("/").filter(Boolean);
  if (parts.length === 0) return [];
  const crumbs = [];
  let href = "";
  for (let index = 0; index < parts.length; index += 1) {
    href += `/${parts[index]}`;
    const isLast = index === parts.length - 1;
    crumbs.push({
      href: href === "/igreja/hierarquia" ? "/clero" : href,
      label: isLast ? label : labelForHref(href, parts[index]),
    });
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
    <QuemSomosProvider>
    <div className="min-h-screen w-full bg-ivory text-ink">
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
      <main id="conteudo" className="w-full">
        <SiteHero />
        {location.pathname !== "/" ? (
          <div className="mx-auto w-full max-w-[1280px] px-4 pt-6 text-left">
            <Breadcrumbs crumbs={crumbsFor(location.pathname, seo.title.split("|")[0].trim())} />
          </div>
        ) : null}
        <div id="pagina">
          <Outlet key={location.pathname} />
          <PastoralVocacional />
          <SupportContact />
        </div>
      </main>
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
    </QuemSomosProvider>
    </SearchProvider>
  );
}
