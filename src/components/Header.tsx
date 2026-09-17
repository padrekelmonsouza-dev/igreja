import { Link, NavLink, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { MENU_LINKS, SITE } from "../data/content";

export function Header() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-40">
      <div className="bg-burgundy text-parchment">
        <div className="mx-auto flex max-w-6xl items-center justify-center gap-6 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.28em] sm:text-[11px]">
          <span>Tradição Apostólica</span>
          <span className="hidden opacity-80 sm:inline">Velho Calendarista</span>
          <span>G.O.C. no Brasil</span>
        </div>
      </div>
      <div className="border-b border-[rgba(90,13,24,.14)] bg-cream/96 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
          <Link
            to="/"
            aria-label={SITE.name}
            className="flex min-w-0 items-center gap-3"
            onClick={() => setOpen(false)}
          >
            <img
              src="/logo-gog.webp"
              alt={SITE.name}
              className="h-14 w-auto max-w-[min(100%,280px)] object-contain sm:h-16"
            />
          </Link>
          <button
            type="button"
            className="flex h-12 w-12 items-center justify-center rounded-full border border-[rgba(90,13,24,.3)] bg-cream text-ink"
            aria-expanded={open}
            aria-label={open ? "Fechar menu" : "Abrir menu"}
            onClick={() => setOpen((value) => !value)}
          >
            <span className="sr-only">{open ? "Fechar menu" : "Abrir menu"}</span>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              {open ? (
                <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.8" />
              ) : (
                <path d="M5 8h14M5 12h14M5 16h14" stroke="currentColor" strokeWidth="1.8" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {open ? (
        <div className="fixed inset-0 top-[108px] z-50 overflow-y-auto bg-cream">
          <nav className="mx-auto grid max-w-4xl gap-3 px-4 py-8 sm:grid-cols-2">
            {MENU_LINKS.map((link) => (
              <NavLink
                key={link.href}
                to={link.href}
                onClick={() => setOpen(false)}
                className="rounded-2xl border border-[rgba(90,13,24,.14)] bg-white px-5 py-4 text-lg transition hover:border-burgundy/40 hover:shadow-card"
              >
                {link.label}
              </NavLink>
            ))}
          </nav>
        </div>
      ) : null}
    </header>
  );
}
