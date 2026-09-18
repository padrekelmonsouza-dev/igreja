import { ARTICLES, SITE } from "./content";
import { FAQ_ITEMS } from "./faq";
import { absoluteUrl, SITE_ORIGIN } from "./site";
import { getClergy } from "./clergy";
import { getCommunity } from "./communities";

export function siteOrigin() {
  return SITE_ORIGIN;
}

export function canonicalUrl(path: string) {
  return absoluteUrl(path);
}

export type PageSeo = {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
  noindex?: boolean;
  image?: string;
};

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
  "/comunidades": {
    title: `Comunidades | ${SITE.tabTitle}`,
    description:
      "Encontre uma Igreja Ortodoxa Grega no Brasil. Comunidades em Nova Iguaçu, São Paulo e Rio de Janeiro, com os dados oficiais já publicados.",
    type: "website",
  },
  "/igreja": {
    title: `A Igreja | ${SITE.tabTitle}`,
    description:
      "Quem somos, história, fé, hierarquia e sucessão apostólica da Igreja Ortodoxa Grega G.O.C. no Brasil.",
    type: "website",
  },
  "/igreja/hierarquia": {
    title: `Hierarquia e clero | ${SITE.tabTitle}`,
    description:
      "Conheça bispos e sacerdotes da Igreja Ortodoxa Grega G.O.C. no Brasil: biografias, eparquias, ordenação e ministério.",
    type: "website",
  },
  "/ortodoxia": {
    title: `Ortodoxia | ${SITE.tabTitle}`,
    description:
      "O que é a Ortodoxia: Divina Liturgia, ícones, Santos Mistérios, santos, jejum e oração explicados em português.",
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
  "/formacao": {
    title: `Formação | ${SITE.tabTitle}`,
    description:
      "Formação ortodoxa em português: introdução, história, teologia, liturgia, espiritualidade, santos, ícones e catequese.",
    type: "website",
  },
  "/noticias": {
    title: `Notícias | ${SITE.tabTitle}`,
    description: "Notícias e artigos da Igreja Ortodoxa Grega no Brasil. Conteúdo oficial e editorial em publicação.",
    type: "website",
  },
  "/biblioteca": {
    title: `Biblioteca | ${SITE.tabTitle}`,
    description: "Biblioteca digital da Igreja Ortodoxa no Brasil: história, teologia, liturgia, Santos Padres e catequese.",
    type: "website",
  },
  "/videos": {
    title: `Vídeos | ${SITE.tabTitle}`,
    description: "Central de vídeos da Igreja Ortodoxa Grega no Brasil: liturgia, homilias, catequese e música bizantina.",
    type: "website",
  },
  "/eventos": {
    title: `Eventos | ${SITE.tabTitle}`,
    description: "Agenda de eventos da Igreja Ortodoxa Grega G.O.C. no Brasil. As datas oficiais serão publicadas pela Secretaria.",
    type: "website",
  },
  "/calendario": {
    title: `Calendário ortodoxo | ${SITE.tabTitle}`,
    description:
      "Calendário litúrgico patrístico da Igreja Ortodoxa: festas, jejuns e a vida do ano eclesial. Confirme datas com a comunidade.",
    type: "website",
  },
  "/doacoes": {
    title: `Apoie a Igreja | ${SITE.tabTitle}`,
    description: "Apoie a Igreja Ortodoxa Grega no Brasil. Espaço institucional para manutenção, obras, evangelização e formação.",
    type: "website",
  },
  "/contato": {
    title: `Contato | ${SITE.tabTitle}`,
    description: "Fale com a Igreja Ortodoxa Grega G.O.C. no Brasil. Contatos das comunidades já publicadas e pedidos de oração.",
    type: "website",
  },
  "/politica-de-privacidade": {
    title: `Política de privacidade | ${SITE.tabTitle}`,
    description: "Como o portal da Igreja Ortodoxa Grega no Brasil trata dados pessoais, formulários e cookies.",
    type: "website",
  },
  "/termos-de-uso": {
    title: `Termos de uso | ${SITE.tabTitle}`,
    description: "Termos de uso do portal institucional da Igreja Ortodoxa Grega G.O.C. no Brasil.",
    type: "website",
  },
  "/primeira-visita": {
    title: `Primeira visita a uma Igreja Ortodoxa | ${SITE.tabTitle}`,
    description:
      "É sua primeira vez na Igreja Ortodoxa? Quem pode visitar, o que esperar na Divina Liturgia, como se vestir e como encontrar uma comunidade.",
    type: "article",
  },
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

  if (pathname.startsWith("/igreja/hierarquia/")) {
    const person = getClergy(pathname.replace("/igreja/hierarquia/", ""));
    if (person) {
      return {
        path: pathname,
        title: `${person.name} | ${SITE.tabTitle}`,
        description: `${person.name}, ${person.role}. ${person.summary}`,
        type: "article",
        image: person.image,
      };
    }
  }

  if (pathname.startsWith("/comunidades/")) {
    const community = getCommunity(pathname.replace("/comunidades/", ""));
    if (community) {
      return {
        path: pathname,
        title: `${community.name} | ${SITE.tabTitle}`,
        description: `${community.name} em ${community.city} (${community.state}). ${community.summary}`,
        type: "website",
      };
    }
  }

  return {
    path: pathname,
    title: `Página não encontrada | ${SITE.tabTitle}`,
    description: "Esta página não existe no portal da Igreja Ortodoxa Grega no Brasil.",
    type: "website",
    noindex: true,
  };
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Church",
    name: SITE.name,
    alternateName: [SITE.shortName, SITE.portalName, "Igreja Ortodoxa Grega no Brasil"],
    url: SITE_ORIGIN,
    inLanguage: SITE.language,
    description: SITE.homeDescription,
    logo: absoluteUrl(SITE.logo),
    image: absoluteUrl(SITE.ogImage),
    motto: SITE.motto,
    parentOrganization: {
      "@type": "Organization",
      name: SITE.synod,
    },
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE.portalName,
    alternateName: [SITE.name, "Igreja Ortodoxa", "Igreja Ortodoxa no Brasil", "Igreja Ortodoxa Grega"],
    url: SITE_ORIGIN,
    inLanguage: SITE.language,
    description: SITE.homeDescription,
    publisher: organizationJsonLd(),
    potentialAction: {
      "@type": "SearchAction",
      target: `${SITE_ORIGIN}/pesquisa?q={search_term_string}`,
      "query-input": "required name=search_term_string",
    },
  };
}

export function faqJsonLd(items = FAQ_ITEMS) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

export type Crumb = { href: string; label: string };

export function breadcrumbJsonLd(crumbs: Crumb[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Início",
        item: `${SITE_ORIGIN}/`,
      },
      ...crumbs.map((crumb, index) => ({
        "@type": "ListItem",
        position: index + 2,
        name: crumb.label,
        item: canonicalUrl(crumb.href),
      })),
    ],
  };
}

export function articleJsonLd(page: { title: string; description: string; path: string; image?: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: page.title,
    description: page.description,
    inLanguage: SITE.language,
    mainEntityOfPage: canonicalUrl(page.path),
    image: absoluteUrl(page.image || SITE.ogImage),
    publisher: organizationJsonLd(),
    author: {
      "@type": "Organization",
      name: SITE.name,
    },
  };
}

export function personJsonLd(slug: string) {
  const person = getClergy(slug);
  if (!person) return null;
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: person.name,
    jobTitle: person.role,
    image: absoluteUrl(person.image),
    description: person.summary,
    url: canonicalUrl(`/igreja/hierarquia/${person.slug}`),
    affiliation: organizationJsonLd(),
  };
}

export function placeJsonLd(slug: string) {
  const community = getCommunity(slug);
  if (!community) return null;
  return {
    "@context": "https://schema.org",
    "@type": "Place",
    name: community.name,
    description: community.summary,
    url: canonicalUrl(community.href),
    address: community.address
      ? {
          "@type": "PostalAddress",
          streetAddress: community.address,
          addressLocality: community.city,
          addressRegion: community.state,
          postalCode: community.cep,
          addressCountry: "BR",
        }
      : {
          "@type": "PostalAddress",
          addressLocality: community.city,
          addressRegion: community.state,
          addressCountry: "BR",
        },
    telephone: community.phone,
  };
}

export const PUBLIC_INDEX_PATHS = [
  "/",
  "/igreja",
  "/igreja/quem-somos",
  "/igreja/nossa-historia",
  "/igreja/nossa-fe",
  "/igreja/hierarquia",
  "/igreja/sucessao-apostolica",
  "/ortodoxia",
  "/ortodoxia/o-que-e-a-ortodoxia",
  "/ortodoxia/divina-liturgia",
  "/ortodoxia/icones",
  "/ortodoxia/sacramentos",
  "/ortodoxia/santos",
  "/ortodoxia/jejum",
  "/ortodoxia/oracao",
  "/ortodoxia/catolica-e-ortodoxa",
  "/ortodoxia/theotokos",
  "/ortodoxia/batismo",
  "/comunidades",
  "/comunidades/nova-iguacu",
  "/comunidades/sao-paulo",
  "/comunidades/rio-de-janeiro",
  "/calendario",
  "/noticias",
  "/formacao",
  "/biblioteca",
  "/videos",
  "/eventos",
  "/doacoes",
  "/contato",
  "/primeira-visita",
  "/perguntas-frequentes",
  "/glossario",
  "/enciclopedia",
  "/pedido-de-oracao",
  "/politica-de-privacidade",
  "/termos-de-uso",
  "/catequese",
  "/mosteiro",
  "/santo-sinodo",
  "/pesquisa",
  ...ARTICLES.map((page) => page.path),
  ...["dom-eugenios-de-atenas", "dom-leontios", "padre-kelmon-luis", "padre-joao-damasceno", "abade-julio"].map(
    (slug) => `/igreja/hierarquia/${slug}`,
  ),
];

export const ALL_INDEX_PATHS = Array.from(new Set(PUBLIC_INDEX_PATHS));
