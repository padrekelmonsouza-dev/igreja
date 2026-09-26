export type VaticanArticle = {
  href: string;
  title: string;
  text: string;
  image: string;
};

const FALLBACK_IMAGE = "/media/vatican-theotokos.jpg";

export const VATICAN_FALLBACK: VaticanArticle[] = [
  {
    href: "https://www.vaticannews.va/pt/papa/news/2026-09/papa-leao-xiv-pos-angelus-apelo-somalia-crise-violencia.html",
    title: "Papa: grave crise humanitária na Somália, é necessária assistência internacional",
    text: "Após o Angelus, Leão XIV pediu um envolvimento generoso da comunidade internacional para ajudar a população da Somália.",
    image: "https://www.vaticannews.va/content/dam/vaticannews/agenzie/images/reuters/2022/10/13/13/1665661065679.JPG/_jcr_content/renditions/cq5dam.thumbnail.cropped.750.422.jpeg",
  },
  {
    href: "https://www.vaticannews.va/pt/papa/news/2026-09/papa-leao-xiv-angelus-20-setembro-2026-confiar-misericordia-deus.html",
    title: "Leão XIV no Angelus: diante de Deus não há lugar para invejas nem divisões",
    text: "No Angelus, o Papa recordou que diante de Deus não há lugar para invejas nem divisões.",
    image: "https://www.vaticannews.va/content/dam/vaticannews/agenzie/images/srv/2026/09/20/2026-09-20-angelus/1789898697943.JPG/_jcr_content/renditions/cq5dam.thumbnail.cropped.750.422.jpeg",
  },
  {
    href: "https://www.vaticannews.va/pt/vaticano/news/2026-09/conclusao-restauracao-cupula-capela-clementina-basilica-s-pedro.html",
    title: "Conclusão da restauração da cúpula da Capela Clementina",
    text: "Concluída a restauração da cúpula da Capela Clementina, na Basílica de São Pedro.",
    image: "https://www.vaticannews.va/content/dam/vaticannews/multimedia/2026/settembre/18/dsc-5132.jpg/_jcr_content/renditions/cq5dam.thumbnail.cropped.750.422.jpeg",
  },
  {
    href: "https://www.vaticannews.va/pt/papa/news/2026-09/papa-leao-xiv-carta-bispos-america-latina-caribe-sao-turibio.html",
    title: "Papa: tantas vozes reivindicam autoridade sobre fiéis, o bispo dê ensinamento claro",
    text: "Leão XIV escreveu aos bispos da América Latina e do Caribe sobre o ensinamento claro do bispo.",
    image: "https://www.vaticannews.va/content/dam/vaticannews/agenzie/images/srv/2026/09/10/2026-09-10-partecipantii-al-corso-di-formazione-per-i-nuovi-vesc/1789031112469.JPG/_jcr_content/renditions/cq5dam.thumbnail.cropped.750.422.jpeg",
  },
  {
    href: "https://www.vaticannews.va/pt/papa/news/2026-09/papa-leao-xiv-esporte-audiencia-special-olympics-deficiencia.html",
    title: "Leão XIV: que os atletas mostrem ao mundo que somente a partilha leva à paz",
    text: "Na audiência com os Special Olympics, o Papa pediu que o esporte mostre que só a partilha leva à paz.",
    image: "https://www.vaticannews.va/content/dam/vaticannews/agenzie/images/srv/2026/09/19/12/1789814998458.JPG/_jcr_content/renditions/cq5dam.thumbnail.cropped.750.422.jpeg",
  },
  {
    href: "https://www.vaticannews.va/pt/vaticano/news/2026-09/padre-luigi-di-liegro-beatificacao-leao-xiv-bispo-dom-di-tora.html",
    title: "Padre Di Liegro, o bispo Di Tora: o “santo” dos últimos que batia à porta de todos",
    text: "Memória de Padre Luigi Di Liegro, o “santo” dos últimos, na cobertura do Vatican News.",
    image: "https://www.vaticannews.va/content/dam/vaticannews/multimedia/2026/settembre/18/whatsapp-image-2026-09-18-at-17-41-02aem.jpg/_jcr_content/renditions/cq5dam.thumbnail.cropped.750.422.jpeg",
  },
  {
    href: "https://www.vaticannews.va/pt/africa/news/2026-09/igreja-ucm-etica-servico-sociedade-direitos-humanos-dignidade.html",
    title: "Moçambique. UCM gradua 690 estudantes e exorta-os a servir com ética",
    text: "A Universidade Católica de Moçambique graduou 690 estudantes e os exortou a servir com ética.",
    image: "https://www.vaticannews.va/content/dam/vaticannews/multimedia/2026/settembre/18/ucm-graduou-690-estudantesaem.jpg/_jcr_content/renditions/cq5dam.thumbnail.cropped.750.422.jpeg",
  },
  {
    href: "https://www.vaticannews.va/pt/igreja/news/2026-09/antonio-cardoso-cancao-prece-homem-bom.html",
    title: "Antonio Cardoso na Canção e a Prece: “O homem bom”",
    text: "Antonio Cardoso na Canção e a Prece, na cobertura do Vatican News em português.",
    image: "https://www.vaticannews.va/content/dam/vaticannews/multimedia/2019/04/29/person-835453_1920%20ok.jpg/_jcr_content/renditions/cq5dam.thumbnail.cropped.750.422.jpeg",
  },
];

function decodeHtml(value: string) {
  return value
    .replace(/<!\[CDATA\[|\]\]>/g, "")
    .replace(/<[^>]+>/g, " ")
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

function fromRss(xml: string): VaticanArticle[] {
  const blocks = xml.match(/<item[\s\S]*?<\/item>/gi) || [];
  return blocks
    .map((block) => {
      const title = decodeHtml(block.match(/<title>([\s\S]*?)<\/title>/i)?.[1] || "");
      const href = decodeHtml(block.match(/<link>([\s\S]*?)<\/link>/i)?.[1] || "");
      const raw =
        block.match(/<content:encoded>([\s\S]*?)<\/content:encoded>/i)?.[1] ||
        block.match(/<description>([\s\S]*?)<\/description>/i)?.[1] ||
        title;
      const image =
        block.match(/<media:content[^>]+url=["']([^"']+)["']/i)?.[1] ||
        block.match(/<enclosure[^>]+url=["']([^"']+)["']/i)?.[1] ||
        FALLBACK_IMAGE;
      return { href, title, text: decodeHtml(raw), image };
    })
    .filter((item) => item.href.startsWith("http") && item.title)
    .slice(0, 12);
}

function fromHtml(html: string): VaticanArticle[] {
  const cards = html.match(/<article[\s\S]*?<\/article>/gi) || [];
  return cards
    .map((card) => {
      const hrefMatch = card.match(/href=["'](https:\/\/www\.vaticannews\.va\/pt\/[^"']+\.html)["']/i);
      const title = decodeHtml(card.match(/<h\d[^>]*>([\s\S]*?)<\/h\d>/i)?.[1] || "");
      const image = card.match(/<(?:img|source)[^>]+(?:src|srcset)=["']([^"'\s]+)/i)?.[1] || FALLBACK_IMAGE;
      const href = hrefMatch?.[1] || "";
      return { href, title, text: title, image };
    })
    .filter((item) => item.href && item.title)
    .slice(0, 12);
}

async function readRss(url: string) {
  const response = await fetch(url);
  if (!response.ok) return [];
  return fromRss(await response.text());
}

async function readHtml(url: string) {
  const response = await fetch(url);
  if (!response.ok) return [];
  return fromHtml(await response.text());
}

export async function fetchVaticanNews(): Promise<VaticanArticle[]> {
  const sources = [
    () => readRss("/proxy/vatican/pt.rss.xml"),
    () => readRss("https://www.vaticannews.va/pt.rss.xml"),
    () => readHtml("/proxy/vatican/pt.html"),
    () => readHtml("https://www.vaticannews.va/pt.html"),
  ];

  for (const load of sources) {
    try {
      const items = await load();
      if (items.length) return items;
    } catch {
      // next source
    }
  }
  return VATICAN_FALLBACK;
}

function paragraphsFromHtml(html: string) {
  const start = html.indexOf('class="article__text"');
  const slice = start >= 0 ? html.slice(start, start + 40000) : html;
  const matches = slice.match(/<p(?:\s[^>]*)?>[\s\S]*?<\/p>/gi) || [];
  const paragraphs: string[] = [];
  for (const tag of matches) {
    const text = decodeHtml(tag);
    if (!text || text === "Vatican News") continue;
    if (text.startsWith("Obrigado por ter lido")) break;
    paragraphs.push(text);
  }
  return paragraphs;
}

export async function fetchVaticanArticleBody(href: string, fallback = ""): Promise<string[]> {
  const path = href.replace(/^https:\/\/www\.vaticannews\.va/i, "");
  const urls = [`/proxy/vatican${path}`, href];
  for (const url of urls) {
    try {
      const response = await fetch(url);
      if (!response.ok) continue;
      const paragraphs = paragraphsFromHtml(await response.text());
      if (paragraphs.length) return paragraphs;
    } catch {
      // next source
    }
  }
  return fallback ? [fallback] : [];
}
