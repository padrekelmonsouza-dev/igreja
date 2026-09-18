import { FormEvent, useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { NAV_KNOWLEDGE, NAV_MORE, NAV_PRIMARY, SITE } from "../data/content";
import { NavIcon, NavLabel } from "./NavIcon";

const HOME_NAV = { href: "/", label: "Início", icon: "home" };

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
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

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 10);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function onSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const q = String(new FormData(event.currentTarget).get("q") || "").trim();
    setOpen(false);
    navigate(q ? `/pesquisa?q=${encodeURIComponent(q)}` : "/pesquisa");
  }

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50">
        <div
          className={`text-parchment transition-[background-color,backdrop-filter] duration-300 ${
            scrolled ? "bg-burgundy/70 backdrop-blur-xl" : "bg-burgundy"
          }`}
        >
          <div className="mx-auto max-w-6xl px-3 py-2 text-center text-[10px] font-bold uppercase leading-relaxed tracking-[0.12em] sm:px-4 sm:text-[11px] sm:tracking-[0.28em]">
            Portal da Igreja Ortodoxa Grega no Brasil
          </div>
        </div>
        <div
          className={`border-b transition-[background-color,backdrop-filter,box-shadow,border-color] duration-300 ${
            scrolled
              ? "border-white/35 bg-cream/55 shadow-[0_12px_40px_-18px_rgba(90,13,24,.45)] backdrop-blur-2xl"
              : "border-[rgba(90,13,24,.14)] bg-cream/92 backdrop-blur-md"
          }`}
        >
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
            <Link
              to="/"
              aria-label={SITE.name}
              className="flex min-w-0 shrink-0 items-center"
              onClick={() => setOpen(false)}
            >
              <img
                src="/logo-gog.webp"
                alt=""
                className="h-[3.75rem] w-auto max-w-[min(100%,14.5rem)] object-contain object-left sm:h-[4.5rem] sm:max-w-[18rem]"
              />
            </Link>
            <div className="ml-auto flex min-w-0 items-center gap-1 sm:gap-2">
              <nav className="hidden min-w-0 items-center lg:flex">
                <NavLink
                  to="/"
                  end
                  className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-2 text-[13px] text-ink hover:bg-[rgba(90,13,24,.06)] hover:text-burgundy xl:px-3"
                >
                  <NavIcon name={HOME_NAV.icon} className="h-4 w-4 shrink-0 text-burgundy" />
                  {HOME_NAV.label}
                </NavLink>
                {NAV_KNOWLEDGE.slice(0, 4).map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    className="inline-flex items-center gap-1.5 whitespace-nowrap rounded-full px-2.5 py-2 text-[13px] text-ink hover:bg-[rgba(90,13,24,.06)] hover:text-burgundy xl:px-3"
                  >
                    <NavIcon name={link.icon} className="h-4 w-4 shrink-0 text-burgundy" />
                    {link.label}
                  </Link>
                ))}
              </nav>
              <button
                type="button"
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-[rgba(90,13,24,.3)] bg-cream/80 text-ink backdrop-blur-sm"
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
        </div>

        {open ? (
          <div className="absolute inset-x-0 top-full z-50 h-[calc(100dvh-100%)] overflow-x-hidden overflow-y-auto bg-cream/92 backdrop-blur-xl">
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
                <NavLink
                  to="/"
                  end
                  onClick={() => setOpen(false)}
                  className="inline-flex items-center rounded-2xl border border-[rgba(90,13,24,.14)] bg-white px-5 py-4 text-lg transition hover:border-burgundy/40 hover:shadow-card"
                >
                  <NavLabel icon={HOME_NAV.icon} label={HOME_NAV.label} variant="badge" />
                </NavLink>
                {NAV_KNOWLEDGE.map((link) => (
                  <NavLink
                    key={link.href}
                    to={link.href}
                    onClick={() => setOpen(false)}
                    className="inline-flex items-center rounded-2xl border border-[rgba(90,13,24,.14)] bg-white px-5 py-4 text-lg transition hover:border-burgundy/40 hover:shadow-card"
                  >
                    <NavLabel icon={link.icon} label={link.label} variant="badge" />
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
                    className="inline-flex items-center rounded-2xl border border-[rgba(90,13,24,.14)] bg-white px-5 py-4 text-lg transition hover:border-burgundy/40 hover:shadow-card"
                  >
                    <NavLabel icon={link.icon} label={link.label} variant="badge" />
                  </NavLink>
                ))}
              </nav>
            </div>
          </div>
        ) : null}
      </header>
      <div className="h-[6.85rem] sm:h-[7.65rem]" aria-hidden="true" />
    </>
  );
}
