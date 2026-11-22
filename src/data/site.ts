export const SITE_ORIGIN = "https://igrejaortodoxagregabrasil.com.br";

export const SITE = {
  name: "Missão Theotokos",
  shortName: "Missão Theotokos",
  motto: "Vinde e vede.",
  year: 2026,
  portalName: "Portal da Igreja Ortodoxa no Brasil",
  tabTitle: "Missão Theotokos",
  homeTitle: "Missão Theotokos",
  homeHeadline: "Missão Theotokos",
  homeSubheadline: "Fé, Tradição Apostólica e Vida Litúrgica",
  homeDescription:
    "Portal institucional da Missão Theotokos: fé, Tradição Apostólica, Divina Liturgia, comunidades, calendário, formação e vida ortodoxa em português.",
  locale: "pt_BR",
  language: "pt-BR",
  logo: "/media/emblema-theotokos.webp",
  ogImage: "/media/og-share.jpg",
  heroImage: "/media/hero-proto.webp",
  heroFallback: "/media/hero-proto.png",
  themeColor: "#6E121C",
};

export const SITE_CONTACT = {
  vocationalEmail: "contato@igrejaortodoxagregabrasil.com.br",
};

export function absoluteUrl(path = "/") {
  const clean = path.startsWith("/") ? path : `/${path}`;
  return `${SITE_ORIGIN}${clean === "/" ? "/" : clean}`;
}
