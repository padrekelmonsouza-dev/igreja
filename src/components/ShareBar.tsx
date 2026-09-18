import type { ReactNode } from "react";
import { trackEvent } from "../lib/analytics";
import { absoluteUrl } from "../data/site";

export function ShareBar({ title, path }: { title: string; path: string }) {
  const url = absoluteUrl(path);

  async function share() {
    trackEvent("share", { content_path: path });
    if (navigator.share) {
      try {
        await navigator.share({ title, url });
        return;
      } catch {
        // Usuário cancelou ou o navegador não concluiu o compartilhamento.
      }
    }
    await navigator.clipboard?.writeText(url);
  }

  return (
    <div className="mt-10 flex flex-wrap items-center gap-3 border-t border-burgundy/10 pt-6">
      <p className="text-sm font-semibold uppercase tracking-[0.16em] text-burgundy">Compartilhar</p>
      <button type="button" className="btn btn-outline-dark" onClick={share}>
        Copiar link
      </button>
      <a
        className="btn btn-outline-dark"
        href={`https://wa.me/?text=${encodeURIComponent(`${title} ${url}`)}`}
        target="_blank"
        rel="noreferrer"
        onClick={() => trackEvent("share_whatsapp", { content_path: path })}
      >
        WhatsApp
      </a>
    </div>
  );
}

export function OfficialNotice({ children }: { children: ReactNode }) {
  return (
    <p className="rounded-2xl border border-dashed border-burgundy/20 bg-ivory px-4 py-3 text-sm text-stone">
      {children}
    </p>
  );
}

export function CategoryPills({
  items,
  active,
  onSelect,
}: {
  items: { slug: string; label: string }[];
  active: string;
  onSelect: (slug: string) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      <button
        type="button"
        className={`rounded-full px-4 py-2 text-sm ${active === "todos" ? "bg-burgundy text-ivory" : "bg-white text-ink ring-1 ring-burgundy/10"}`}
        onClick={() => onSelect("todos")}
      >
        Todas
      </button>
      {items.map((item) => (
        <button
          key={item.slug}
          type="button"
          className={`rounded-full px-4 py-2 text-sm ${active === item.slug ? "bg-burgundy text-ivory" : "bg-white text-ink ring-1 ring-burgundy/10"}`}
          onClick={() => onSelect(item.slug)}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
}
