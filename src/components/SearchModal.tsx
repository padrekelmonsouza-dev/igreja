import { createContext, FormEvent, useCallback, useContext, useEffect, useId, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { answerQuery } from "../data/search";

type SearchContextValue = {
  openSearch: (query: string) => void;
  closeSearch: () => void;
};

const SearchContext = createContext<SearchContextValue | null>(null);

export function useSearchModal() {
  const context = useContext(SearchContext);
  if (!context) {
    throw new Error("useSearchModal precisa estar dentro de SearchProvider");
  }
  return context;
}

export function SearchProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [draft, setDraft] = useState("");
  const titleId = useId();
  const inputRef = useRef<HTMLInputElement>(null);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const answer = useMemo(() => (open && query ? answerQuery(query) : null), [open, query]);

  const openSearch = useCallback((value: string) => {
    const next = value.trim();
    if (!next) return;
    setQuery(next);
    setDraft(next);
    setOpen(true);
  }, []);

  const closeSearch = useCallback(() => {
    setOpen(false);
  }, []);

  useEffect(() => {
    if (!open) return;
    const timer = window.setTimeout(() => inputRef.current?.focus(), 40);
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    const previous = document.body.style.overflowY;
    document.body.style.overflowY = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(timer);
      document.body.style.overflowY = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  function submitDraft(event?: FormEvent) {
    event?.preventDefault();
    const next = draft.trim();
    if (!next) return;
    setQuery(next);
  }

  function onDraftChange(value: string) {
    setDraft(value);
    window.clearTimeout(debounceRef.current);
    if (value.trim().length < 3) return;
    debounceRef.current = window.setTimeout(() => {
      setQuery(value.trim());
    }, 450);
  }

  return (
    <SearchContext.Provider value={{ openSearch, closeSearch }}>
      {children}
      {open && answer ? (
        <div className="fixed inset-0 z-[80] flex items-end justify-center p-0 sm:items-center sm:p-6">
          <button
            type="button"
            className="absolute inset-0 bg-ink/55"
            aria-label="Fechar resposta"
            onClick={closeSearch}
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="relative z-10 flex max-h-[92vh] w-full max-w-2xl flex-col overflow-hidden rounded-t-3xl bg-white shadow-card sm:rounded-3xl"
          >
            <div className="flex items-start justify-between gap-4 border-b border-burgundy/10 px-5 py-4">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-burgundy">Resposta do portal</p>
                <h2 id={titleId} className="mt-1 font-serif text-2xl leading-tight text-ink sm:text-3xl">
                  {answer.title}
                </h2>
              </div>
              <button
                type="button"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-burgundy/20 text-burgundy"
                aria-label="Fechar"
                onClick={closeSearch}
              >
                ×
              </button>
            </div>

            <form onSubmit={submitDraft} className="border-b border-burgundy/10 px-5 py-3">
              <label className="sr-only" htmlFor="search-modal-q">
                Refinar pesquisa
              </label>
              <input
                ref={inputRef}
                id="search-modal-q"
                type="search"
                value={draft}
                onChange={(event) => onDraftChange(event.target.value)}
                placeholder="Digite outra pergunta sobre a fé ortodoxa"
                className="h-12 w-full rounded-full border border-burgundy/15 bg-ivory px-5 text-ink outline-none"
              />
            </form>

            <div className="overflow-y-auto px-5 py-5">
              <p className="text-base leading-7 text-ink">{answer.answer}</p>
              {answer.sourceHref ? (
                <Link
                  to={answer.sourceHref}
                  className="mt-4 inline-flex text-sm font-semibold text-burgundy hover:underline"
                  onClick={closeSearch}
                >
                  Abrir {answer.sourceLabel || "página"} no site
                </Link>
              ) : null}

              {answer.pages.length ? (
                <div className="mt-6">
                  <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-burgundy">Páginas relacionadas</p>
                  <ul className="mt-3 space-y-2">
                    {answer.pages.map((page) => (
                      <li key={page.href}>
                        <Link
                          to={page.href}
                          className="block rounded-2xl border border-burgundy/10 bg-ivory px-4 py-3 hover:border-burgundy/30"
                          onClick={closeSearch}
                        >
                          <span className="font-medium">{page.title}</span>
                          <span className="mt-0.5 block text-sm text-burgundy">{page.href}</span>
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      ) : null}
    </SearchContext.Provider>
  );
}
