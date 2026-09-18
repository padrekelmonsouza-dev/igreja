import { ARTICLES, SITE } from "./content";
import { FAQ_ITEMS } from "./faq";

export function siteOrigin() {
  if (typeof window !== "undefined" && window.location?.origin) {
    return window.location.origin;
  }
  return "";
}

export function canonicalUrl(path: string) {
  const origin = siteOrigin();
  const clean = path.startsWith("/") ? path : `/${path}`;
  return origin ? `${origin}${clean === "/" ? "/" : clean}` : clean;
}

export type PageSeo = {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
  noindex?: boolean;
};

export function getPageSeo(pathname: string): PageSeo {
  if (pathname === "/") {
    return {
      title: SITE.homeTitle,
      description: SITE.homeDescription,
      path: "/",
      type: "website",
    };
  }

  const extras: Record<string, Omit<PageSeo, "path">> = {
    "/perguntas-frequentes": {
      title: `Perguntas frequentes | ${SITE.tabTitle}`,
      description:
        "Respostas claras: o que é a Igreja Ortodoxa, diferenças com a Católica, liturgia, comunhão, jejum, batismo e como visitar uma comunidade no Brasil.",
      type: "article",
    },
    "/glossario": {
      title: `Glossário | ${SITE.tabTitle}`,
      description:
        "Dicionário da Igreja Ortodoxa: liturgia, ícone, Theotokos, sínodo, jejum, G.O.C., velho calendário e outros termos explicados em português.",
      type: "article",
    },
    "/paroquias": {
      title: `Paróquias | ${SITE.tabTitle}`,
      description:
        "Lista de paróquias e comunidades da Igreja Ortodoxa Grega G.O.C. no Brasil. Busque por estado, cidade ou sacerdote e prepare sua primeira visita.",
      type: "website",
    },
    "/hierarquia": {
      title: `Clero e hierarquia | ${SITE.tabTitle}`,
      description:
        "Conheça bispos e sacerdotes da Igreja Ortodoxa Grega G.O.C. no Brasil: biografias, eparquias, ordenação e ministério.",
      type: "website",
    },
    "/pesquisa": {
      title: `Pesquisar | ${SITE.tabTitle}`,
      description: "Busque artigos, liturgia, santos, paróquias, glossário e perguntas frequentes sobre a Igreja Ortodoxa no Brasil.",
      type: "website",
    },
    "/pedido-de-oracao": {
      title: `Pedido de oração | ${SITE.tabTitle}`,
      description: "Envie uma intenção de oração para a Igreja Ortodoxa Grega G.O.C. no Brasil. Os pedidos passam por moderação.",
      type: "website",
    },
  };

  if (extras[pathname]) {
    return { path: pathname, ...extras[pathname] };
  }

  const article = ARTICLES.find((page) => page.path === pathname);
  if (article) {
    return {
      path: pathname,
      title: `${article.title} | ${SITE.tabTitle}`,
      description: article.description || article.intro,
      type: "article",
    };
  }

  if (pathname.startsWith("/hierarquia/")) {
    return {
      path: pathname,
      title: `Hierarquia | ${SITE.tabTitle}`,
      description: "Perfil do clero da Igreja Ortodoxa Grega G.O.C. no Brasil.",
      type: "article",
    };
  }

  return {
    path: pathname,
    title: SITE.homeTitle,
    description: SITE.homeDescription,
    type: "website",
    noindex: true,
  };
}

export function websiteJsonLd() {
  const origin = siteOrigin();
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE.portalName,
    alternateName: [SITE.name, "Igreja Ortodoxa", "Igreja Ortodoxa no Brasil"],
    url: origin || undefined,
    inLanguage: "pt-BR",
    description: SITE.homeDescription,
    potentialAction: {
      "@type": "SearchAction",
      target: `${origin}/pesquisa?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
    publisher: {
      "@type": "Church",
      name: SITE.name,
      description: SITE.synod,
    },
  };
}

export function faqJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: FAQ_ITEMS.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export function breadcrumbJsonLd(path: string, label: string) {
  const origin = siteOrigin();
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Início",
        item: origin || "/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: label,
        item: canonicalUrl(path),
      },
    ],
  };
}

export const ALL_INDEX_PATHS = [
  "/",
  "/perguntas-frequentes",
  "/glossario",
  "/paroquias",
  "/hierarquia",
  "/pedido-de-oracao",
  ...ARTICLES.map((page) => page.path),
];
