import { getClergy } from "../data/clergy";
import { getCommunity } from "../data/communities";
import { ARTICLES } from "../data/content";
import { FOOTER_INSTITUTIONAL, FOOTER_LEARN, FOOTER_LEGAL, MAIN_NAV } from "../data/navigation";
import { getPageSeo } from "../data/seo";

const PAGE_NAMES: Record<string, string> = {
  "/clero": "clero",
  "/igreja/hierarquia": "clero",
  "/comunidades": "comunidades",
  "/igreja": "igreja",
  "/igreja/arcebispos": "arcebispos",
  "/ortodoxia": "ortodoxia",
  "/calendario": "calendário",
  "/perguntas-frequentes": "perguntas frequentes",
  "/contato": "contato",
  "/doacoes": "doações",
  "/formacao": "formação",
  "/videos": "vídeos",
  "/noticias": "notícias",
  "/biblioteca": "biblioteca",
  "/glossario": "glossário",
  "/enciclopedia": "enciclopédia",
  "/paroquias": "paróquias",
  "/mosteiro": "mosteiro",
  "/primeira-visita": "primeira visita",
  "/pedido-de-oracao": "pedido de oração",
  "/pesquisa": "pesquisa",
  "/liturgia": "liturgia",
  "/catequese": "catequese",
  "/missoes": "missões",
  "/pastorais": "pastorais",
  "/ordem-de-sao-jose": "ordem de são josé",
  "/eventos": "eventos",
  "/politica-de-privacidade": "política de privacidade",
  "/termos-de-uso": "termos de uso",
};

function fromNav(pathname: string) {
  const links = [
    ...MAIN_NAV.map((item) => ({ href: item.href, label: item.label })),
    ...MAIN_NAV.flatMap((item) => item.children || []),
    ...FOOTER_INSTITUTIONAL,
    ...FOOTER_LEARN,
    ...FOOTER_LEGAL,
  ];
  return links.find((item) => item.href === pathname)?.label.toLowerCase();
}

export function explorePageName(pathname: string) {
  if (PAGE_NAMES[pathname]) return PAGE_NAMES[pathname];
  const nav = fromNav(pathname);
  if (nav) return nav;
  if (pathname.startsWith("/igreja/hierarquia/")) {
    const person = getClergy(pathname.replace("/igreja/hierarquia/", ""));
    if (person) return person.name.toLowerCase();
    return "clero";
  }
  if (pathname.startsWith("/comunidades/")) {
    const community = getCommunity(pathname.replace("/comunidades/", ""));
    if (community) return community.name.toLowerCase();
    return "comunidades";
  }
  const article = ARTICLES.find((page) => page.path === pathname);
  if (article) return article.title.toLowerCase();
  const seoName = getPageSeo(pathname).title.split("|")[0].trim().toLowerCase();
  if (seoName && seoName !== "página") return seoName;
  const slug = pathname.split("/").filter(Boolean).pop() || "página";
  return decodeURIComponent(slug).replace(/-/g, " ");
}

export function exploreCta(pathname: string) {
  if (pathname === "/") {
    return { label: "Explore o portal", href: "#atalhos" };
  }
  return { label: `Explore a página ${explorePageName(pathname)}`, href: "#pagina" };
}
