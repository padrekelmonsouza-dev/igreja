import { ARTICLES, MENU_LINKS } from "./content";
import { CLERGY } from "./clergy";
import { COMMUNITIES } from "./communities";
import { EXTERNAL_SOURCES, type ExternalItem } from "./externalSources";
import { FAQ_ITEMS } from "./faq";
import { GLOSSARY } from "./glossary";
import { MAIN_NAV } from "./navigation";

export type SearchItem = {
  href: string;
  title: string;
  text: string;
};

export const SEARCH_INDEX: SearchItem[] = [
  {
    href: "/",
    title: "Igreja Ortodoxa no Brasil",
    text: "Portal de referência Igreja Ortodoxa Brasil fé liturgia santos ícones catequese paróquias G.O.C.",
  },
  {
    href: "/perguntas-frequentes",
    title: "Perguntas frequentes sobre a Igreja Ortodoxa",
    text: FAQ_ITEMS.map((item) => `${item.question} ${item.answer}`).join(" "),
  },
  {
    href: "/glossario",
    title: "Glossário da Igreja Ortodoxa",
    text: GLOSSARY.map((item) => `${item.term} ${item.definition}`).join(" "),
  },
  ...MENU_LINKS.map((link) => ({
    href: link.href,
    title: link.label,
    text: link.label,
  })),
  ...ARTICLES.map((page) => ({
    href: page.path,
    title: page.title,
    text: [page.title, page.kicker, page.intro, page.description || "", ...page.sections.flatMap((section) => [section.title, ...section.body])].join(" "),
  })),
  ...CLERGY.map((person) => ({
    href: `/igreja/hierarquia/${person.slug}`,
    title: person.name,
    text: [person.name, person.role, person.summary, ...person.facts.map((fact) => fact.value)].join(" "),
  })),
  ...COMMUNITIES.map((community) => ({
    href: community.href,
    title: community.name,
    text: `${community.name} ${community.city} ${community.state} ${community.clergy || ""} ${community.address || ""} paróquia ortodoxa brasil`,
  })),
  ...MAIN_NAV.flatMap((item) => [
    { href: item.href, title: item.label, text: item.label },
    ...(item.children || []).map((child) => ({ href: child.href, title: child.label, text: child.label })),
  ]),
];

const STOP = new Set([
  "o",
  "a",
  "os",
  "as",
  "de",
  "da",
  "do",
  "das",
  "dos",
  "e",
  "ou",
  "um",
  "uma",
  "no",
  "na",
  "em",
  "por",
  "para",
  "com",
  "que",
  "qual",
  "quais",
  "como",
  "é",
  "eh",
  "ser",
  "sao",
  "são",
  "me",
  "se",
  "ao",
  "à",
  "às",
  "aos",
  "pelo",
  "pela",
  "sobre",
  "entre",
  "tem",
  "ter",
  "foi",
  "era",
  "vai",
  "quero",
  "saber",
  "qualquer",
  "coisa",
]);

const SYNONYMS: Record<string, string[]> = {
  missa: ["liturgia", "divina liturgia"],
  padre: ["sacerdote", "presbitero"],
  padres: ["sacerdote", "clero"],
  catolica: ["catolica", "filioque", "papa"],
  catolico: ["catolica", "filioque"],
  paroquia: ["comunidade", "eparquia"],
  igreja: ["ortodoxa", "comunidade"],
  batizar: ["batismo"],
  casar: ["matrimonio", "casamento"],
  jejuar: ["jejum"],
  oracao: ["oracao de jesus"],
  maria: ["theotokos"],
  virgem: ["theotokos"],
  calendario: ["juliano", "velho calendario"],
  endereco: ["comunidades", "mosteiro"],
  horario: ["liturgia", "comunidades"],
  goc: ["g.o.c.", "genuinos"],
  grega: ["goc", "ortodoxa"],
  imagens: ["icones", "santos"],
  adorar: ["veneracao", "icones"],
};

function normalize(value: string) {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function queryTerms(query: string) {
  const raw = normalize(query)
    .split(/[^a-z0-9.]+/i)
    .filter((term) => term.length > 1 && !STOP.has(term));
  const expanded = new Set(raw);
  for (const term of raw) {
    for (const [key, aliases] of Object.entries(SYNONYMS)) {
      if (term.includes(key) || key.includes(term)) {
        aliases.forEach((alias) => expanded.add(normalize(alias)));
      }
    }
  }
  return [...expanded];
}

function fuzzyHit(text: string, term: string) {
  if (text.includes(term)) return term.length > 5 ? 4 : 2;
  if (term.length < 3) return 0;
  const words = text.split(/[^a-z0-9.]+/);
  for (const word of words) {
    if (word.length < 3) continue;
    if (word.includes(term) || term.includes(word)) return 1;
  }
  return 0;
}

function scoreHaystack(haystack: string, terms: string[]) {
  const text = normalize(haystack);
  if (!terms.length) return 1;
  let score = 0;
  let hits = 0;
  for (const term of terms) {
    const points = fuzzyHit(text, term);
    if (points) {
      hits += 1;
      score += points;
    }
  }
  if (hits === 0) return 0;
  if (hits === terms.length) score += 10;
  return score + hits;
}

const FALLBACK_HREFS = [
  "/ortodoxia/o-que-e-a-ortodoxia",
  "/perguntas-frequentes",
  "/primeira-visita",
  "/paroquias",
  "/liturgia",
  "/santo-sinodo",
];

export function searchSite(query: string) {
  const terms = queryTerms(query);
  const seen = new Set<string>();
  const ranked = SEARCH_INDEX.map((item) => ({
    item,
    score: scoreHaystack(`${item.title} ${item.text}`, terms) + scoreHaystack(item.title, terms) * 2,
  }))
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((entry) => entry.item)
    .filter((item) => {
      if (seen.has(item.href)) return false;
      seen.add(item.href);
      return true;
    });

  if (ranked.length) return ranked;
  return SEARCH_INDEX.filter((item) => FALLBACK_HREFS.includes(item.href));
}

export function searchExternal(query: string, extra: ExternalItem[] = []) {
  const terms = queryTerms(query);
  const pool = [...extra, ...EXTERNAL_SOURCES];
  const seen = new Set<string>();
  const ranked = pool
    .map((item) => ({
      item,
      score: scoreHaystack(`${item.title} ${item.text} ${item.source}`, terms) + scoreHaystack(item.title, terms) * 2,
    }))
    .filter((entry) => entry.score > 0)
    .sort((a, b) => b.score - a.score)
    .map((entry) => entry.item)
    .filter((item) => {
      if (seen.has(item.href + item.title)) return false;
      seen.add(item.href + item.title);
      return true;
    });
  return ranked.length ? ranked.slice(0, 6) : EXTERNAL_SOURCES.slice(0, 4);
}

export type SearchAnswer = {
  query: string;
  title: string;
  answer: string;
  sourceHref?: string;
  sourceLabel?: string;
  pages: SearchItem[];
  external: ExternalItem[];
  localStrong: boolean;
};

export function answerQuery(query: string, liveExternal: ExternalItem[] = []): SearchAnswer {
  const trimmed = query.trim() || "fé ortodoxa";
  const terms = queryTerms(trimmed);
  const pages = searchSite(trimmed).slice(0, 6);
  const external = searchExternal(trimmed, liveExternal);

  type Candidate = { score: number; title: string; answer: string; href?: string; label?: string };
  const candidates: Candidate[] = [];

  for (const item of FAQ_ITEMS) {
    const score =
      scoreHaystack(item.question, terms) * 3 + scoreHaystack(`${item.question} ${item.answer}`, terms);
    if (score > 0) {
      candidates.push({
        score: score + 6,
        title: item.question,
        answer: item.answer,
        href: item.href,
        label: "Perguntas frequentes",
      });
    }
  }

  for (const item of GLOSSARY) {
    const score = scoreHaystack(item.term, terms) * 5 + scoreHaystack(item.definition, terms);
    if (score > 0) {
      candidates.push({
        score,
        title: item.term,
        answer: item.definition,
        href: item.href || "/glossario",
        label: item.href && item.href !== "/glossario" ? item.term : "Glossário",
      });
    }
  }

  for (const page of ARTICLES) {
    const blobs = [page.intro, ...(page.sections?.flatMap((section) => section.body) || [])];
    let bestBlob = page.intro;
    let best = scoreHaystack(`${page.title} ${page.intro}`, terms);
    for (const blob of blobs) {
      const score = scoreHaystack(`${page.title} ${blob}`, terms);
      if (score > best) {
        best = score;
        bestBlob = blob;
      }
    }
    if (best > 0) {
      candidates.push({
        score: best + (normalize(page.title).split(" ").some((word) => terms.includes(word)) ? 8 : 0),
        title: page.title,
        answer: bestBlob,
        href: page.path,
        label: page.kicker || "Página do portal",
      });
    }
  }

  for (const person of CLERGY) {
    const score = scoreHaystack(`${person.name} ${person.role} ${person.summary}`, terms);
    if (score > 0) {
      candidates.push({
        score: score + 4,
        title: person.name,
        answer: `${person.name} é ${person.role}. ${person.summary}`,
        href: `/igreja/hierarquia/${person.slug}`,
        label: "Hierarquia",
      });
    }
  }

  for (const community of COMMUNITIES) {
    const score = scoreHaystack(
      `${community.name} ${community.city} ${community.state} ${community.summary} ${community.clergy || ""}`,
      terms,
    );
    if (score > 0) {
      candidates.push({
        score: score + 4,
        title: community.name,
        answer: `${community.name}, em ${community.city} (${community.state}). ${community.summary}`,
        href: community.href,
        label: "Comunidades",
      });
    }
  }

  candidates.sort((a, b) => b.score - a.score);
  const best = candidates[0];

  if (best && best.score >= 4) {
    return {
      query: trimmed,
      title: best.title,
      answer: best.answer,
      sourceHref: best.href,
      sourceLabel: best.label,
      pages,
      external,
      localStrong: true,
    };
  }

  const web = external[0];
  return {
    query: trimmed,
    title: web?.title || trimmed,
    answer: web
      ? `${web.text} Fonte: ${web.source}. Este portal G.O.C. também reúne a fé apostólica, a Divina Liturgia e a vida das comunidades no Brasil nas páginas abaixo.`
      : "A fé ortodoxa grega apresentada neste portal — Tradição Apostólica, Divina Liturgia, ícones, jejum e vida das comunidades G.O.C. no Brasil — está nas páginas abaixo. Consulte também as fontes ortodoxas da internet.",
    sourceHref: pages[0]?.href || "/ortodoxia/o-que-e-a-ortodoxia",
    sourceLabel: web ? web.source : "Portal",
    pages,
    external,
    localStrong: false,
  };
}
