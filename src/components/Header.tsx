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
import { useSearchModal } from "./SearchModal";

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const location = useLocation();
  const { openSearch } = useSearchModal();
  const menuId = useId();
  const headerRef = useRef<HTMLElement>(null);
  const searchTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  useEffect(() => {
    setOpen(false);
    setOpenGroup(null);
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

  function onSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const q = String(new FormData(event.currentTarget).get("q") || "").trim();
    setOpen(false);
    if (q) openSearch(q);
  }

  function onSearchInput(value: string) {
    window.clearTimeout(searchTimer.current);
    if (value.trim().length < 3) return;
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
          className={`border-b transition-[background-color,box-shadow,border-color] duration-300 ${
            scrolled
              ? "border-burgundy/15 bg-ivory/90 shadow-[0_12px_40px_-24px_rgba(110,18,28,.5)] backdrop-blur-xl"
              : "border-burgundy/15 bg-ivory/96"
          }`}
        >
          <div className="mx-auto flex w-full max-w-[1280px] items-center gap-3 px-4 py-2.5 lg:gap-6">
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
                      className="inline-flex items-center gap-1 rounded-full px-2.5 py-2 text-[13px] text-ink hover:bg-burgundy/5 hover:text-burgundy"
                      aria-expanded={openGroup === item.id}
                      aria-haspopup="true"
                      onClick={() => setOpenGroup((current) => (current === item.id ? null : item.id))}
                    >
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
                              className="block rounded-xl px-3 py-2.5 text-sm hover:bg-ivory hover:text-burgundy"
                            >
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
                    className="rounded-full px-2.5 py-2 text-[13px] text-ink hover:bg-burgundy/5 hover:text-burgundy"
                  >
                    {item.label}
                  </NavLink>
                ),
              )}
            </nav>

            <div className="ml-auto flex items-center xl:ml-0">
              <button
                type="button"
                className="flex h-11 w-11 items-center justify-center rounded-full border border-burgundy/20 bg-white text-burgundy xl:hidden"
                aria-expanded={open}
                aria-controls={menuId}
                aria-label={open ? "Fechar menu" : "Abrir menu"}
                onClick={() => setOpen((value) => !value)}
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
          </div>
        </div>

        {open ? (
          <div
            id={menuId}
            className="fixed inset-x-0 bottom-0 top-[5.15rem] z-[60] overflow-y-auto bg-white sm:top-[5.8rem]"
          >
            <form onSubmit={onSearch} className="search-form mx-auto max-w-3xl px-4 pt-5">
              <label className="sr-only" htmlFor="mobile-search">
                Pesquisar
              </label>
              <input
                id="mobile-search"
                name="q"
                type="search"
                placeholder="Pesquisar no portal"
                className="search-field border border-burgundy/15 bg-white"
                onChange={(event) => onSearchInput(event.target.value)}
              />
              <button className="btn btn-burgundy px-8" type="submit">
                Buscar
              </button>
            </form>
            <nav className="mx-auto max-w-3xl space-y-2 px-4 py-6" aria-label="Menu móvel">
              {MAIN_NAV.map((item) => (
                <div key={item.id} className="rounded-2xl bg-ivory ring-1 ring-burgundy/10">
                  {item.children?.length ? (
                    <details>
                      <summary className="flex cursor-pointer list-none items-center justify-between gap-3 px-4 py-4 text-lg font-medium">
                        <span>{item.label}</span>
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
                        <Link to={item.href} className="block rounded-xl px-3 py-3 text-burgundy" onClick={() => setOpen(false)}>
                          Visão geral
                        </Link>
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            to={child.href}
                            className="block rounded-xl px-3 py-3"
                            onClick={() => setOpen(false)}
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </details>
                  ) : (
                    <Link to={item.href} className="block px-4 py-4 text-lg" onClick={() => setOpen(false)}>
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}
              <Link to={START_HERE_LINK.href} className="block rounded-2xl bg-ivory px-4 py-4 ring-1 ring-burgundy/10" onClick={() => setOpen(false)}>
                {START_HERE_LINK.label}
              </Link>
              <Link to={SUPPORT_LINK.href} className="block rounded-2xl bg-ivory px-4 py-4 ring-1 ring-burgundy/10" onClick={() => setOpen(false)}>
                {SUPPORT_LINK.label}
              </Link>
              <Link to={FIND_CHURCH_LINK.href} className="btn btn-gold mt-4 w-full" onClick={() => setOpen(false)}>
                {FIND_CHURCH_LINK.label}
              </Link>
            </nav>
          </div>
        ) : null}
      </header>
      <div className="h-[5.15rem] sm:h-[5.8rem]" aria-hidden="true" />
    </>
  );
}
