export type EcclesiaArticle = {
  href: string;
  title: string;
  text: string;
  image: string;
  body: string[];
};

const FALLBACK_IMAGE = "/media/ecclesia-christo.png";

export const ECCLESIA_FALLBACK: EcclesiaArticle[] = [
  {
    href: "https://news.ecclesia.org.br/patriarca-bartolomeu-a-primazia-na-igreja-deve-ser-exercida-dentro-e-nunca-acima-da-comunhao/",
    title: "A primazia na Igreja deve ser exercida “dentro, e nunca acima, da comunhão”",
    text: "Em Budapeste, o Patriarca Ecumênico retoma a experiência da Igreja indivisa do primeiro milênio e aponta a Pentarquia como chave para pensar a primazia e a sinodalidade.",
    image: "https://news.ecclesia.org.br/wp-content/uploads/2026/09/bucareste-a.jpg",
    body: [
      "Em Budapeste, o Patriarca Ecumênico retoma a experiência da Igreja indivisa do primeiro milênio e aponta a Pentarquia como chave para pensar a primazia, a sinodalidade e o caminho para a unidade.",
    ],
  },
  {
    href: "https://news.ecclesia.org.br/mensagem-patriarcal-para-o-novo-ano-eclesiastico-e-dia-de-oracao-pela-protecao-do-meio-ambiente/",
    title: "Mensagem Patriarcal para o Novo Ano Eclesiástico",
    text: "Por ocasião do Novo Ano Eclesiástico, o Patriarca Ecumênico Bartolomeu dirige uma reflexão sobre o cuidado da Criação e o Dia de Oração pela Proteção do Meio Ambiente.",
    image: "https://news.ecclesia.org.br/wp-content/uploads/2020/07/patriarca-bartolomeu3.jpg",
    body: [
      "Por ocasião do início do Novo Ano Eclesiástico (1º de Setembro), Sua Santidade o Patriarca Ecumênico Bartolomeu dirige uma reflexão teológica e ética sobre a responsabilidade humana no cuidado da Criação.",
    ],
  },
  {
    href: "https://news.ecclesia.org.br/nao-existe-uma-guerra-santa/",
    title: "Não existe uma «guerra santa»",
    text: "O Patriarca Ecumênico Bartolomeu falou dos santos mártires e dos cristãos perseguidos. O conceito de “guerra santa” é contraditório: tal guerra jamais poderá existir.",
    image: "https://news.ecclesia.org.br/wp-content/uploads/2023/10/patriarca-bartolomeu-salamanca.jpg",
    body: [
      "Sua Santidade o Patriarca Ecumênico Bartolomeu falou com emoção sobre os santos mártires e a dura realidade que os cristãos perseguidos enfrentam em nossos dias.",
      "Como Sua Santidade tem enfatizado repetidamente, o conceito de “guerra santa” é contraditório e tal guerra jamais poderá existir.",
    ],
  },
  {
    href: "https://news.ecclesia.org.br/panegirico-para-a-festa-da-dormicao-da-santissima/",
    title: "Panegírico para a Festa da Dormição da Santíssima",
    text: "Dom Iosif, Arcebispo Metropolitano de Buenos Aires, dedica uma reflexão ao papel central da Mãe de Deus no plano da Salvação.",
    image: "https://news.ecclesia.org.br/wp-content/uploads/2026/08/15-dormicao-da-theotokos-el-greco-sec-xvi.jpg",
    body: [
      "Por ocasião da Solenidade da Dormição da Santíssima Theotokos, o Arcebispo Metropolitano de Buenos Aires, Dom Iosif, apresentou uma profunda reflexão teológica dedicada ao papel central da Mãe de Deus no plano da Salvação.",
    ],
  },
];

function decodeHtml(value: string) {
  return value
    .replace(/<!\[CDATA\[|\]\]>/g, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/O post .+ apareceu primeiro em .+$/i, "")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;|&#8220;|&#8221;/g, '"')
    .replace(/&#8211;/g, "–")
    .replace(/&#8212;/g, "—")
    .replace(/&#8230;/g, "…")
    .replace(/&#8216;|&#8217;/g, "'")
    .replace(/&nbsp;/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function firstImage(html: string) {
  return html.match(/<img[^>]+src=["']([^"']+)["']/i)?.[1] || "";
}

function paragraphsFromHtml(html: string) {
  const matches = html.match(/<p(?:\s[^>]*)?>[\s\S]*?<\/p>/gi) || [];
  const paragraphs: string[] = [];
  for (const tag of matches) {
    const text = decodeHtml(tag);
    if (text.length < 40) continue;
    if (/^O post .+ apareceu primeiro em /i.test(text)) continue;
    if (/JavaScript is required to view this PDF/i.test(text)) continue;
    if (/^Download PDF$/i.test(text)) continue;
    paragraphs.push(text);
  }
  if (paragraphs.length) return paragraphs;
  const plain = decodeHtml(html);
  return plain.length > 40 ? [plain] : [];
}

type WpPost = {
  link?: string;
  title?: { rendered?: string };
  excerpt?: { rendered?: string };
  content?: { rendered?: string };
  _embedded?: {
    "wp:featuredmedia"?: Array<{ source_url?: string }>;
  };
};

function fromWp(posts: WpPost[]): EcclesiaArticle[] {
  return posts
    .map((post) => {
      const title = decodeHtml(post.title?.rendered || "");
      const href = post.link || "";
      const html = post.content?.rendered || post.excerpt?.rendered || "";
      const body = paragraphsFromHtml(html);
      const text = decodeHtml(post.excerpt?.rendered || "") || body[0] || title;
      const image =
        post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ||
        firstImage(post.content?.rendered || "") ||
        FALLBACK_IMAGE;
      return { href, title, text, image, body };
    })
    .filter((item) => item.href && item.title)
    .slice(0, 12);
}

function fromRss(xml: string): EcclesiaArticle[] {
  const blocks = xml.match(/<item[\s\S]*?<\/item>/gi) || [];
  return blocks
    .map((block) => {
      const title = decodeHtml(block.match(/<title>([\s\S]*?)<\/title>/i)?.[1] || "");
      const href = decodeHtml(block.match(/<link>([\s\S]*?)<\/link>/i)?.[1] || "");
      const raw =
        block.match(/<content:encoded>([\s\S]*?)<\/content:encoded>/i)?.[1] ||
        block.match(/<description>([\s\S]*?)<\/description>/i)?.[1] ||
        title;
      const body = paragraphsFromHtml(raw);
      const text = body[0] || decodeHtml(raw);
      return {
        href,
        title,
        text,
        image: firstImage(raw) || FALLBACK_IMAGE,
        body,
      };
    })
    .filter((item) => item.href && item.title)
    .slice(0, 12);
}

async function readJson(url: string) {
  const response = await fetch(url);
  if (!response.ok) return [];
  const text = await response.text();
  if (!text.trim().startsWith("[")) return [];
  const data = JSON.parse(text) as WpPost[];
  return Array.isArray(data) ? fromWp(data) : [];
}

async function readRss(url: string) {
  const response = await fetch(url);
  if (!response.ok) return [];
  return fromRss(await response.text());
}

async function readWpPages() {
  const hosts = [
    (page: number) => `https://news.ecclesia.org.br/wp-json/wp/v2/posts?per_page=4&page=${page}&_embed=true`,
    (page: number) => `/proxy/ecclesia/wp-json/wp/v2/posts?per_page=4&page=${page}&_embed=true`,
  ];

  for (const make of hosts) {
    const items: EcclesiaArticle[] = [];
    try {
      for (let page = 1; page <= 3; page += 1) {
        const batch = await readJson(make(page));
        if (!batch.length) break;
        items.push(...batch);
      }
      if (items.length) return items;
    } catch {
      // next host
    }
  }
  return [];
}

export async function fetchEcclesiaNews(): Promise<EcclesiaArticle[]> {
  const sources = [readWpPages, () => readRss("/proxy/ecclesia/feed/"), () => readRss("https://news.ecclesia.org.br/feed/")];

  for (const load of sources) {
    try {
      const items = await load();
      if (items.length) return items;
    } catch {
      // next source
    }
  }
  return ECCLESIA_FALLBACK;
}

export async function fetchEcclesiaArticleBody(href: string, fallback: string[]): Promise<string[]> {
  const slug = href.replace(/\/+$/, "").split("/").pop() || "";
  if (!slug) return fallback;

  const sources = [
    `https://news.ecclesia.org.br/wp-json/wp/v2/posts?slug=${encodeURIComponent(slug)}`,
    `/proxy/ecclesia/wp-json/wp/v2/posts?slug=${encodeURIComponent(slug)}`,
  ];

  for (const url of sources) {
    try {
      const response = await fetch(url);
      if (!response.ok) continue;
      const data = (await response.json()) as WpPost[];
      const html = data[0]?.content?.rendered || "";
      const paragraphs = paragraphsFromHtml(html);
      if (paragraphs.length) return paragraphs;
    } catch {
      // next source
    }
  }

  return fallback;
}
