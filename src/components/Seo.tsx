import { useEffect } from "react";
import { canonicalUrl } from "../data/seo";

function upsertMeta(selector: string, attributes: Record<string, string>) {
  let element = document.head.querySelector(selector) as HTMLMetaElement | HTMLLinkElement | null;
  if (!element) {
    const tag = selector.startsWith("link") ? "link" : "meta";
    element = document.createElement(tag) as HTMLMetaElement | HTMLLinkElement;
    document.head.appendChild(element);
  }
  Object.entries(attributes).forEach(([key, value]) => {
    element?.setAttribute(key, value);
  });
}

export function Seo({
  title,
  description,
  path,
  type = "website",
  jsonLd,
  noindex,
}: {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
  jsonLd?: object | object[];
  noindex?: boolean;
}) {
  useEffect(() => {
    document.title = title;
    const url = canonicalUrl(path);
    const image = `${window.location.origin}/media/painel-oficial.jpg`;

    upsertMeta('meta[name="description"]', { name: "description", content: description });
    upsertMeta('meta[name="robots"]', { name: "robots", content: noindex ? "noindex, nofollow" : "index, follow" });
    upsertMeta('link[rel="canonical"]', { rel: "canonical", href: url });
    upsertMeta('meta[property="og:title"]', { property: "og:title", content: title });
    upsertMeta('meta[property="og:description"]', { property: "og:description", content: description });
    upsertMeta('meta[property="og:type"]', { property: "og:type", content: type });
    upsertMeta('meta[property="og:url"]', { property: "og:url", content: url });
    upsertMeta('meta[property="og:locale"]', { property: "og:locale", content: "pt_BR" });
    upsertMeta('meta[property="og:image"]', { property: "og:image", content: image });
    upsertMeta('meta[name="twitter:card"]', { name: "twitter:card", content: "summary_large_image" });
    upsertMeta('meta[name="twitter:title"]', { name: "twitter:title", content: title });
    upsertMeta('meta[name="twitter:description"]', { name: "twitter:description", content: description });

    const scriptId = "portal-jsonld";
    let script = document.getElementById(scriptId) as HTMLScriptElement | null;
    const payload = jsonLd ? JSON.stringify(jsonLd) : "";
    if (!payload) {
      script?.remove();
      return;
    }
    if (!script) {
      script = document.createElement("script");
      script.id = scriptId;
      script.type = "application/ld+json";
      document.head.appendChild(script);
    }
    script.textContent = payload;
  }, [title, description, path, type, jsonLd, noindex]);

  return null;
}
