import { FormEvent, useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { NAV_KNOWLEDGE, NAV_MORE, NAV_PRIMARY, SITE } from "../data/content";

export function Header() {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflowY = open ? "hidden" : "";
    return () => {
      document.body.style.overflowY = "";
    };
  }, [open]);

  function onSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const q = String(new FormData(event.currentTarget).get("q") || "").trim();
    setOpen(false);
    navigate(q ? `/pesquisa?q=${encodeURIComponent(q)}` : "/pesquisa");
  }

  return (
    <header className="relative sticky top-0 z-40">
      <div className="bg-burgundy text-parchment">
        <div className="mx-auto max-w-6xl px-3 py-2 text-center text-[10px] font-bold uppercase leading-relaxed tracking-[0.12em] sm:px-4 sm:text-[11px] sm:tracking-[0.28em]">
          Portal da Igreja Ortodoxa Grega no Brasil
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
              src="/media/brasao-goc.jpg"
              alt="Brasão da Igreja Ortodoxa Grega G.O.C. no Brasil"
              className="h-14 w-14 object-contain sm:h-16 sm:w-16"
            />
            <span className="min-w-0 leading-tight">
              <span className="block text-sm font-bold text-burgundy sm:text-base">Igreja Ortodoxa Grega</span>
              <span className="block text-xs text-muted sm:text-sm">G.O.C. no Brasil</span>
            </span>
          </Link>
          <nav className="hidden items-center gap-5 lg:flex">
            {NAV_KNOWLEDGE.slice(0, 4).map((link) => (
              <Link key={link.href} to={link.href} className="text-sm hover:text-burgundy">
                {link.label}
              </Link>
            ))}
          </nav>
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
        <div className="absolute inset-x-0 top-full z-50 h-[calc(100dvh-100%)] overflow-x-hidden overflow-y-auto bg-cream">
          <form onSubmit={onSearch} className="search-form mx-auto max-w-4xl px-4 pt-6">
            <input
              name="q"
              type="search"
              placeholder="Pesquisar Igreja Ortodoxa..."
              className="search-field flex-1 border border-[rgba(90,13,24,.18)] bg-white outline-none"
            />
            <button className="btn btn-burgundy px-10" type="submit">
              Buscar
            </button>
          </form>
          <div className="mx-auto max-w-4xl px-4 py-8">
            <p className="kicker mb-3">Conhecer a fé</p>
            <nav className="grid gap-3 sm:grid-cols-2">
              {NAV_KNOWLEDGE.map((link) => (
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
            <p className="kicker mb-3 mt-10">A Igreja</p>
            <nav className="grid gap-3 sm:grid-cols-2">
              {[...NAV_PRIMARY, ...NAV_MORE].map((link) => (
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
        </div>
      ) : null}
    </header>
  );
}
