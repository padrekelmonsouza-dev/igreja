export const SITE_ORIGIN = "https://igrejaortodoxagregabrasil.com.br";

export const SITE = {
  name: "Igreja Ortodoxa Grega G.O.C. no Brasil",
  shortName: "G.O.C. no Brasil",
  synod: "Santo Sínodo de Eugenio de Atenas",
  motto: "Vinde e vede.",
  year: 2026,
  portalName: "Portal da Igreja Ortodoxa no Brasil",
  tabTitle: "Igreja Ortodoxa Grega no Brasil",
  homeTitle: "Igreja Ortodoxa Grega no Brasil",
  homeHeadline: "Igreja Ortodoxa Grega no Brasil",
  homeSubheadline: "Fé, Tradição Apostólica e Vida Litúrgica",
  homeDescription:
    "Portal institucional da Igreja Ortodoxa Grega no Brasil: fé, Tradição Apostólica, Divina Liturgia, comunidades, calendário, formação e vida ortodoxa em português.",
  locale: "pt_BR",
  language: "pt-BR",
  logo: "/logo-gog.webp",
  ogImage: "/media/og-share.jpg",
  heroImage: "/media/hero-proto.webp",
  heroFallback: "/media/hero-proto.png",
  themeColor: "#6E121C",
};

export const SITE_CONTACT = {
  /** Contato oficial já publicado para o Mosteiro de São Basílio. */
  monasteryPhone: "(21) 96483-7295",
  monasteryWhatsapp: "5521964837295",
  monasteryAddress: "R. Gomes Freire, 64 - Marapicu, Nova Iguaçu - RJ, 26295-045",
};

export function absoluteUrl(path = "/") {
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_ORIGIN}${clean === "/" ? "/" : clean}`;
}
