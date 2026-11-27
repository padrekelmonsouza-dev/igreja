import { FormEvent, useEffect, useId, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import {
  FIND_CHURCH_LINK,
  MAIN_NAV,
  START_HERE_LINK,
  SUPPORT_LINK,
} from "../data/navigation";
import { SITE } from "../data/site";
import { MenuIcon } from "./MenuIcon";
import { useSearchModal } from "./SearchModal";
import { BagIcon, useCart } from "./StoreCart";

export function Header() {
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const { openSearch } = useSearchModal();
  const { count: cartCount } = useCart();
  const menuId = useId();
  const headerRef = useRef<HTMLElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const [barHeight, setBarHeight] = useState(0);

  useEffect(() => {
    setOpen(false);
    setSearchOpen(false);
    document.documentElement.style.overflow = "";
    document.body.style.overflow = "";
    document.body.style.position = "";
    document.body.style.top = "";
    document.body.style.width = "";
  }, [location.pathname]);

  useEffect(() => {
    const html = document.documentElement;
    if (!open) return;
    const y = window.scrollY;
    html.style.overflow = "hidden";
    document.body.style.overflow = "hidden";
    document.body.style.position = "fixed";
    document.body.style.top = `-${y}px`;
    document.body.style.width = "100%";
    return () => {
      html.style.overflow = "";
      document.body.style.overflow = "";
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      window.scrollTo(0, y);
    };
  }, [open]);

  useEffect(() => {
    function onScroll() {
      setScrolled(window.scrollY > 8);
    }
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setOpen(false);
        setSearchOpen(false);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("keydown", onKey);
    };
  }, []);

  useEffect(() => {
    const node = barRef.current;
    if (!node) return;
    const measure = () => {
      const current = barRef.current;
      if (!current) return;
      setBarHeight(current.getBoundingClientRect().height);
    };
    measure();
    if (typeof ResizeObserver === "undefined") {
      window.addEventListener("resize", measure);
      return () => window.removeEventListener("resize", measure);
    }
    const observer = new ResizeObserver(measure);
    observer.observe(node);
    return () => observer.disconnect();
  }, [searchOpen]);

  useEffect(() => {
    if (!searchOpen) return;
    const timer = window.setTimeout(() => searchInputRef.current?.focus(), 40);
    return () => window.clearTimeout(timer);
  }, [searchOpen]);

  function toggleSearch() {
    setSearchOpen((value) => !value);
    setOpen(false);
  }

  function toggleMenu() {
    setOpen((value) => !value);
    setSearchOpen(false);
  }

  function onSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const q = String(new FormData(event.currentTarget).get("q") || "").trim();
    setOpen(false);
    openSearch(q);
  }

  function onSearchInput(value: string) {
    window.clearTimeout(searchTimer.current);
    searchTimer.current = window.setTimeout(() => {
      setOpen(false);
      openSearch(value);
    }, 700);
  }

  const desktopLinkClass =
    "relative inline-flex items-center whitespace-nowrap px-1 py-3 text-[13px] font-medium tracking-wide transition-colors after:absolute after:inset-x-1 after:bottom-0 after:h-0.5 after:origin-center after:scale-x-0 after:rounded-full after:bg-gold after:transition-transform hover:text-burgundy hover:after:scale-x-100";

  return (
    <>
      <header ref={headerRef} className="fixed inset-x-0 top-0 z-50 w-full">
        <div
          ref={barRef}
          className={`border-b border-burgundy/15 bg-ivory transition-[box-shadow] duration-300 ${
            scrolled ? "shadow-[0_12px_40px_-24px_rgba(110,18,28,.5)]" : ""
          }`}
        >
          <div className="mx-auto grid w-full max-w-[1280px] grid-cols-[minmax(0,1fr)_auto] items-center gap-x-3 gap-y-2.5 px-4 py-2.5 xl:flex xl:gap-4">
            <Link to="/" aria-label={SITE.name} className="shrink-0" onClick={() => setOpen(false)}>
              <img
                src={SITE.logo}
                alt=""
                width={286}
                height={94}
                className="h-[3.9rem] w-auto max-w-[min(100%,14.95rem)] object-contain object-left sm:h-[4.55rem] sm:max-w-[18.2rem]"
              />
            </Link>


            <div className="flex items-center gap-2 justify-self-end xl:hidden">
              <StoreButton count={cartCount} compact />
              <button
                type="button"
                className={`flex h-11 w-11 items-center justify-center rounded-full border shadow-[0_6px_14px_-8px_rgba(110,18,28,.8)] ${
                  searchOpen
                    ? "border-gold/50 bg-burgundy text-gold"
                    : "border-burgundy/20 bg-white text-burgundy"
                }`}
                aria-expanded={searchOpen}
                aria-controls="header-search-panel"
                aria-label={searchOpen ? "Fechar pesquisa" : "Abrir pesquisa"}
                onClick={toggleSearch}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="pointer-events-none">
                  {searchOpen ? (
                    <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.8" />
                  ) : (
                    <>
                      <circle cx="11" cy="11" r="6.2" stroke="currentColor" strokeWidth="1.8" />
                      <path d="m16.2 16.2 4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                    </>
                  )}
                </svg>
              </button>
              <button
                type="button"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-burgundy/20 bg-white text-burgundy"
                aria-expanded={open}
                aria-controls={menuId}
                aria-label={open ? "Fechar menu" : "Abrir menu"}
                onClick={toggleMenu}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  {open ? (
                    <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.8" />
                  ) : (
                    <path d="M5 8h14M5 12h14M5 16h14" stroke="currentColor" strokeWidth="1.8" />
                  )}
                </svg>
              </button>
            </div>

            <form
              id="header-search-panel"
              onSubmit={onSearch}
              className={`${searchOpen ? "flex" : "hidden"} col-span-2 h-11 w-full min-w-0 items-center gap-2 rounded-full bg-white pl-3.5 pr-1 shadow-[inset_0_1px_0_rgba(255,255,255,.8),0_8px_20px_-16px_rgba(110,18,28,.55)] ring-1 ring-gold/45 transition focus-within:ring-2 focus-within:ring-gold xl:col-auto xl:ml-auto xl:flex xl:max-w-[18.5rem]`}
            >
              <label className="sr-only" htmlFor="header-search">
                Pesquisar
              </label>
              <input
                ref={searchInputRef}
                id="header-search"
                name="q"
                type="search"
                placeholder="Pesquisar no portal"
                className="min-w-0 flex-1 bg-transparent text-[13px] text-ink outline-none placeholder:text-stone/55"
                onChange={(event) => onSearchInput(event.target.value)}
              />
              <button
                type="submit"
                className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-burgundy text-gold shadow-[0_6px_14px_-8px_rgba(110,18,28,.8)] ring-1 ring-gold/40 transition hover:bg-burgundy-light"
                aria-label="Buscar"
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true" className="pointer-events-none">
                  <circle cx="11" cy="11" r="6.2" stroke="currentColor" strokeWidth="2" />
                  <path d="m16.2 16.2 4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
            </form>
            <div className="hidden xl:block">
              <StoreButton count={cartCount} />
            </div>
          </div>

          <nav className="hidden border-t border-burgundy/10 xl:block" aria-label="Principal">
            <ul className="mx-auto flex w-full max-w-[1280px] items-center justify-between gap-2 px-4">
              {MAIN_NAV.map((item) => (
                <li key={item.id}>
                  <NavLink
                    to={item.href}
                    end={item.href === "/" || item.href === "/igreja"}
                    className={({ isActive }) =>
                      `${desktopLinkClass} ${isActive ? "text-burgundy after:scale-x-100" : "text-ink"}`
                    }
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        {open ? (
          <div
            id={menuId}
            className="fixed inset-x-0 bottom-0 z-[60] overflow-y-auto bg-white [-webkit-overflow-scrolling:touch]"
            style={{ top: barHeight, paddingBottom: "env(safe-area-inset-bottom)" }}
          >
            <nav className="mx-auto max-w-3xl space-y-2 px-4 py-6" aria-label="Menu móvel">
              {MAIN_NAV.map((item) => (
                <div key={item.id} className="rounded-2xl bg-ivory ring-1 ring-burgundy/10">
                  <Link to={item.href} className="flex items-center gap-3 px-4 py-4 text-lg" onClick={() => setOpen(false)}>
                    <MenuIcon name={item.icon} className="h-5 w-5 text-burgundy" />
                    {item.label}
                  </Link>
                </div>
              ))}
              <Link to={START_HERE_LINK.href} className="flex items-center gap-3 rounded-2xl bg-ivory px-4 py-4 ring-1 ring-burgundy/10" onClick={() => setOpen(false)}>
                <MenuIcon name="door" className="h-5 w-5 text-burgundy" />
                {START_HERE_LINK.label}
              </Link>
              <Link to={SUPPORT_LINK.href} className="flex items-center gap-3 rounded-2xl bg-ivory px-4 py-4 ring-1 ring-burgundy/10" onClick={() => setOpen(false)}>
                <MenuIcon name="heart" className="h-5 w-5 text-burgundy" />
                {SUPPORT_LINK.label}
              </Link>
              <Link to={FIND_CHURCH_LINK.href} className="btn btn-gold mt-4 w-full" onClick={() => setOpen(false)}>
                {FIND_CHURCH_LINK.label}
              </Link>
            </nav>
          </div>
        ) : null}
      </header>
      <div aria-hidden="true" style={{ height: barHeight }} />
    </>
  );
}

function StoreButton({ count, compact = false }: { count: number; compact?: boolean }) {
  return (
    <NavLink
      to="/loja"
      aria-label={count ? `Loja, ${count} ${count === 1 ? "item" : "itens"} no carrinho` : "Loja"}
      className={({ isActive }) =>
        `relative inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-[linear-gradient(135deg,#9B2430,#6E121C)] font-semibold text-gold shadow-[0_8px_20px_-10px_rgba(110,18,28,.9)] ring-1 ring-gold/60 transition hover:brightness-110 ${
          compact ? "h-11 w-11" : "h-11 px-5 text-[13px] uppercase tracking-[0.16em]"
        } ${isActive ? "ring-2 ring-gold" : ""}`
      }
    >
      <BagIcon className="h-5 w-5" />
      {compact ? null : "Loja"}
      {count ? (
        <span className="absolute -right-1.5 -top-1.5 grid h-5 min-w-5 place-items-center rounded-full bg-gold px-1 text-[11px] font-bold leading-none tracking-normal text-burgundy ring-2 ring-ivory">
          {count}
        </span>
      ) : null}
    </NavLink>
  );
}
