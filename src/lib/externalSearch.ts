import { EXTERNAL_SOURCES, type ExternalItem } from "../data/externalSources";

function decode(value: string) {
  return value
    .replace(/<!\[CDATA\[|\]\]>/g, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#8230;/g, "…")
    .replace(/&#8220;|&#8221;/g, '"')
    .replace(/\s+/g, " ")
    .trim();
}

function parseRss(xml: string, source: string): ExternalItem[] {
  const items: ExternalItem[] = [];
  const blocks = xml.match(/<item[\s\S]*?<\/item>/gi) || [];
  for (const block of blocks) {
    const title = decode(block.match(/<title>([\s\S]*?)<\/title>/i)?.[1] || "");
    const href = decode(block.match(/<link>([\s\S]*?)<\/link>/i)?.[1] || "");
    const text = decode(block.match(/<description>([\s\S]*?)<\/description>/i)?.[1] || title);
    if (title && href) items.push({ href, title, text, source });
  }
  return items;
}

async function readFeed(url: string, source: string): Promise<ExternalItem[]> {
  const response = await fetch(url);
  if (!response.ok) return [];
  return parseRss(await response.text(), source);
}

export async function fetchLiveExternal(): Promise<ExternalItem[]> {
  const feeds = [
    { url: "/proxy/ecclesia/feed/", source: "ECCLESIA NEWS" },
    { url: "https://news.ecclesia.org.br/feed/", source: "ECCLESIA NEWS" },
    { url: "/proxy/vatican/pt.rss.xml", source: "Vatican News" },
  ];

  const collected: ExternalItem[] = [];
  for (const feed of feeds) {
    try {
      const items = await readFeed(feed.url, feed.source);
      collected.push(...items);
      if (collected.length >= 8) break;
    } catch {
      // CORS or offline: the static index remains.
    }
  }
  return collected.length ? collected : EXTERNAL_SOURCES;
}
