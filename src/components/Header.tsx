import { FormEvent, useEffect, useId, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import {
  DESKTOP_NAV_IDS,
  FIND_CHURCH_LINK,
  MAIN_NAV,
  START_HERE_LINK,
  SUPPORT_LINK,
} from "../data/navigation";
import { SITE } from "../data/site";
import { MenuIcon } from "./MenuIcon";
import { useSearchModal } from "./SearchModal";

export function Header() {
  const [open, setOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const location = useLocation();
  const { openSearch } = useSearchModal();
  const menuId = useId();
  const headerRef = useRef<HTMLElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const searchTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);
  const [barHeight, setBarHeight] = useState(0);

  useEffect(() => {
    setOpen(false);
    setOpenGroup(null);
    setSearchOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflowY = open ? "hidden" : "";
    return () => {
      document.body.style.overflowY = "";
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
        setOpenGroup(null);
        setSearchOpen(false);
      }
    }
    function onClick(event: MouseEvent) {
      if (!headerRef.current?.contains(event.target as Node)) {
        setOpenGroup(null);
      }
    }
    window.addEventListener("keydown", onKey);
    window.addEventListener("mousedown", onClick);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("mousedown", onClick);
    };
  }, []);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;
    function measure() {
      setBarHeight(bar.getBoundingClientRect().height);
    }
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(bar);
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

  const desktopNav = MAIN_NAV.filter((item) => DESKTOP_NAV_IDS.includes(item.id as (typeof DESKTOP_NAV_IDS)[number]));

  return (
    <>
      <header ref={headerRef} className="fixed inset-x-0 top-0 z-50 w-full">
        <div
          ref={barRef}
          className={`border-b border-burgundy/15 bg-ivory transition-[box-shadow] duration-300 ${
            scrolled ? "shadow-[0_12px_40px_-24px_rgba(110,18,28,.5)]" : ""
          }`}
        >
          <div className="mx-auto grid w-full max-w-[1280px] grid-cols-[minmax(0,1fr)_auto] items-center gap-x-3 gap-y-2.5 px-4 py-2.5 xl:flex xl:gap-6">
            <Link to="/" aria-label={SITE.name} className="shrink-0" onClick={() => setOpen(false)}>
              <img
                src={SITE.logo}
                alt=""
                width={286}
                height={94}
                className="h-[3.9rem] w-auto max-w-[min(100%,14.95rem)] object-contain object-left sm:h-[4.55rem] sm:max-w-[18.2rem]"
              />
            </Link>

            <nav className="hidden min-w-0 flex-1 items-center justify-end gap-0.5 xl:flex" aria-label="Principal">
              {desktopNav.map((item) =>
                item.children?.length ? (
                  <div key={item.id} className="relative">
                    <button
                      type="button"
                      className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-2 text-[13px] text-ink hover:bg-burgundy/5 hover:text-burgundy"
                      aria-expanded={openGroup === item.id}
                      aria-haspopup="true"
                      onClick={() => setOpenGroup((current) => (current === item.id ? null : item.id))}
                    >
                      <MenuIcon name={item.icon} className="h-4 w-4 text-burgundy" />
                      {item.label}
                      <span aria-hidden="true" className="text-[10px]">
                        ▾
                      </span>
                    </button>
                    {openGroup === item.id ? (
                      <div className="absolute left-0 top-full z-50 min-w-[16rem] pt-2">
                        <div className="rounded-2xl border border-burgundy/10 bg-white p-2 shadow-card">
                          {item.children.map((child) => (
                            <Link
                              key={child.href}
                              to={child.href}
                              className="flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-sm hover:bg-ivory hover:text-burgundy"
                            >
                              <MenuIcon name={child.icon} className="h-4 w-4 text-burgundy" />
                              {child.label}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ) : null}
                  </div>
                ) : (
                  <NavLink
                    key={item.id}
                    to={item.href}
                    end={item.href === "/"}
                    className="inline-flex items-center gap-1.5 rounded-full px-2.5 py-2 text-[13px] text-ink hover:bg-burgundy/5 hover:text-burgundy"
                  >
                    <MenuIcon name={item.icon} className="h-4 w-4 text-burgundy" />
                    {item.label}
                  </NavLink>
                ),
              )}
            </nav>

            <div className="flex items-center gap-2 justify-self-end xl:hidden">
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
              className={`${searchOpen ? "flex" : "hidden"} col-span-2 h-11 w-full min-w-0 items-center gap-2 rounded-full bg-white pl-3.5 pr-1 shadow-[inset_0_1px_0_rgba(255,255,255,.8),0_8px_20px_-16px_rgba(110,18,28,.55)] ring-1 ring-gold/45 transition focus-within:ring-2 focus-within:ring-gold xl:col-auto xl:flex xl:max-w-[18.5rem]`}
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
          </div>
        </div>

        {open ? (
          <div
            id={menuId}
            className="fixed inset-x-0 bottom-0 z-[60] overflow-y-auto bg-white"
            style={{ top: barHeight }}
          >
            <nav className="mx-auto max-w-3xl space-y-2 px-4 py-6" aria-label="Menu móvel">
              {MAIN_NAV.map((item) => (
                <div key={item.id} className="rounded-2xl bg-ivory ring-1 ring-burgundy/10">
                  {item.children?.length ? (
                    <details>
                      <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-4 text-lg font-medium">
                        <span className="inline-flex items-center gap-3">
                          <MenuIcon name={item.icon} className="h-5 w-5 text-burgundy" />
                          {item.label}
                        </span>
                        <svg
                          className="menu-chevron h-5 w-5 shrink-0 text-burgundy"
                          viewBox="0 0 24 24"
                          fill="none"
                          aria-hidden="true"
                        >
                          <path
                            d="M6 9l6 6 6-6"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </summary>
                      <div className="space-y-1 px-3 pb-3">
                        <Link to={item.href} className="flex items-center gap-3 rounded-xl px-3 py-3 text-burgundy" onClick={() => setOpen(false)}>
                          <MenuIcon name={item.icon} className="h-4 w-4" />
                          Visão geral
                        </Link>
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            to={child.href}
                            className="flex items-center gap-3 rounded-xl px-3 py-3"
                            onClick={() => setOpen(false)}
                          >
                            <MenuIcon name={child.icon} className="h-4 w-4 text-burgundy" />
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </details>
                  ) : (
                    <Link to={item.href} className="flex items-center gap-3 px-4 py-4 text-lg" onClick={() => setOpen(false)}>
                      <MenuIcon name={item.icon} className="h-5 w-5 text-burgundy" />
                      {item.label}
                    </Link>
                  )}
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
