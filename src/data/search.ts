import { ARTICLES, MENU_LINKS } from "./content";
import { CLERGY, PARISHES } from "./clergy";

export type SearchItem = {
  href: string;
  title: string;
  text: string;
};

export const SEARCH_INDEX: SearchItem[] = [
  ...MENU_LINKS.map((link) => ({
    href: link.href,
    title: link.label,
    text: link.label,
  })),
  ...ARTICLES.map((page) => ({
    href: page.path,
    title: page.title,
    text: [page.title, page.kicker, page.intro, ...page.sections.flatMap((section) => [section.title, ...section.body])].join(" "),
  })),
  ...CLERGY.map((person) => ({
    href: `/hierarquia/${person.slug}`,
    title: person.name,
    text: [person.name, person.role, person.summary, ...person.facts.map((fact) => fact.value)].join(" "),
  })),
  ...PARISHES.map((parish) => ({
    href: parish.href,
    title: parish.comunidade,
    text: `${parish.comunidade} ${parish.cidade} ${parish.estado} ${parish.sacerdote} ${parish.endereco}`,
  })),
  {
    href: "/",
    title: "Página inicial",
    text: "Vinde e vede Igreja Ortodoxa Grega G.O.C. Brasil liturgia santos ícones catequese",
  },
];

export function searchSite(query: string) {
  const terms = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
  if (terms.length === 0) return [];

  const seen = new Set<string>();
  return SEARCH_INDEX.filter((item) => {
    const haystack = `${item.title} ${item.text}`.toLowerCase();
    return terms.every((term) => haystack.includes(term));
  }).filter((item) => {
    if (seen.has(item.href)) return false;
    seen.add(item.href);
    return true;
  });
}
