import { FormEvent, useEffect, useId, useMemo, useRef, useState } from "react";
import { getBibleChapter, loadBibleBook, loadBibleIndex, type BibleBook, type BibleBookIndex, type BibleVerse } from "../data/bible";

const CARD_VERSE = {
  text: "Vossa palavra é um facho que ilumina meus passos, uma luz em meu caminho.",
  ref: "Salmos 118:105",
};

function CrossMark() {
  return (
    <svg viewBox="0 0 24 24" className="h-10 w-10 text-gold-soft/70" fill="none" aria-hidden="true">
      <path d="M12 3v18M5 10h14" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
    </svg>
  );
}

function BibleReaderModal({
  bookName,
  chapter,
  verses,
  loading,
  error,
  onClose,
}: {
  bookName: string;
  chapter: number;
  verses: BibleVerse[];
  loading: boolean;
  error: string;
  onClose: () => void;
}) {
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const timer = window.setTimeout(() => closeRef.current?.focus(), 40);
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    const previous = document.body.style.overflowY;
    document.body.style.overflowY = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(timer);
      document.body.style.overflowY = previous;
      window.removeEventListener("keydown", onKey);
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[80] flex items-end justify-center p-0 sm:items-center sm:p-6">
      <button type="button" className="absolute inset-0 bg-ink/55" aria-label="Fechar leitura" onClick={onClose} />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        className="relative z-10 flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-t-3xl bg-ivory shadow-card sm:rounded-3xl"
      >
        <div className="flex items-start justify-between gap-4 border-b border-burgundy/10 bg-white px-5 py-4">
          <div>
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-burgundy">Bíblia Sagrada</p>
            <h2 id={titleId} className="mt-1 font-serif text-2xl leading-tight text-ink sm:text-3xl">
              {bookName} {chapter}
            </h2>
          </div>
          <button
            ref={closeRef}
            type="button"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-burgundy/20 text-burgundy"
            aria-label="Fechar"
            onClick={onClose}
          >
            ×
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-5 py-6 sm:px-8">
          {loading ? <p className="text-stone">Carregando o capítulo…</p> : null}
          {error ? <p className="text-burgundy">{error}</p> : null}
          {!loading && !error
            ? verses.map((verse) => (
                <p key={verse.versiculo} className="mb-3 text-[17px] leading-8 text-[#3a342d]">
                  <span className="mr-2 font-serif text-sm font-semibold text-burgundy">{verse.versiculo}</span>
                  {" "}
                  {verse.texto}
                </p>
              ))
            : null}
        </div>
      </div>
    </div>
  );
}

export function BibleCard() {
  const [books, setBooks] = useState<BibleBookIndex[]>([]);
  const [bookSlug, setBookSlug] = useState("");
  const [chapter, setChapter] = useState("");
  const [open, setOpen] = useState(false);
  const [reading, setReading] = useState<{ book: BibleBook; chapter: number; verses: BibleVerse[] } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;
    loadBibleIndex()
      .then((list) => {
        if (active) setBooks(list);
      })
      .catch(() => {
        if (active) setError("Não foi possível carregar os livros.");
      });
    return () => {
      active = false;
    };
  }, []);

  const selectedBook = useMemo(() => books.find((book) => book.slug === bookSlug), [books, bookSlug]);
  const chapters = selectedBook ? Array.from({ length: selectedBook.capitulos }, (_, index) => index + 1) : [];
  const canRead = Boolean(bookSlug && chapter);
  const antigo = books.filter((book) => book.testamento === "Antigo Testamento");
  const novo = books.filter((book) => book.testamento === "Novo Testamento");

  function onBookChange(value: string) {
    setBookSlug(value);
    setChapter("");
    setError("");
  }

  async function onRead(event: FormEvent) {
    event.preventDefault();
    if (!bookSlug || !chapter) return;
    const chapterNumber = Number(chapter);
    setOpen(true);
    setLoading(true);
    setError("");
    setReading(null);
    try {
      const book = await loadBibleBook(bookSlug);
      const found = getBibleChapter(book, chapterNumber);
      if (!found) throw new Error("Capítulo não encontrado.");
      setReading({ book, chapter: chapterNumber, verses: found.versiculos });
    } catch {
      setError("Não foi possível abrir este capítulo.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <article className="panel-burgundy flex h-full flex-col overflow-hidden rounded-[2rem] bg-burgundy text-ivory shadow-card">
        <form className="flex flex-1 flex-col p-5 sm:p-6" onSubmit={onRead}>
          <div className="flex items-start justify-between gap-3">
            <h3 className="font-serif text-3xl leading-none tracking-wide text-ivory">Bíblia Sagrada</h3>
            <CrossMark />
          </div>

          <label className="sr-only" htmlFor="bible-book">
            Livro
          </label>
          <select
            id="bible-book"
            value={bookSlug}
            onChange={(event) => onBookChange(event.target.value)}
            className="mt-6 h-12 w-full rounded-full border-0 bg-white px-4 text-sm text-ink outline-none ring-1 ring-white/20 focus:ring-2 focus:ring-gold"
          >
            <option value="">Selecione o livro…</option>
            <optgroup label="Antigo Testamento">
              {antigo.map((book) => (
                <option key={book.slug} value={book.slug}>
                  {book.nome}
                </option>
              ))}
            </optgroup>
            <optgroup label="Novo Testamento">
              {novo.map((book) => (
                <option key={book.slug} value={book.slug}>
                  {book.nome}
                </option>
              ))}
            </optgroup>
          </select>

          <label className="sr-only" htmlFor="bible-chapter">
            Capítulo
          </label>
          <select
            id="bible-chapter"
            value={chapter}
            onChange={(event) => setChapter(event.target.value)}
            disabled={!selectedBook}
            className="mt-3 h-12 w-full rounded-full border-0 bg-white px-4 text-sm text-ink outline-none ring-1 ring-white/20 focus:ring-2 focus:ring-gold disabled:text-stone"
          >
            <option value="">Capítulo</option>
            {chapters.map((number) => (
              <option key={number} value={number}>
                {number}
              </option>
            ))}
          </select>

          <button
            type="submit"
            disabled={!canRead}
            className="mt-4 inline-flex h-12 w-full items-center justify-center rounded-full bg-gold font-semibold text-gold-dark disabled:cursor-not-allowed disabled:bg-white/25 disabled:text-ivory/55"
          >
            Ler
          </button>
          {error && !open ? <p className="mt-3 text-sm text-gold-soft">{error}</p> : null}

          <div className="relative mt-5 min-h-[13rem] flex-1 overflow-hidden rounded-3xl">
            <img
              src="/media/hero-iconostase.webp"
              alt=""
              className="absolute inset-0 h-full w-full object-cover"
              loading="lazy"
              decoding="async"
            />
            <div className="absolute inset-0 bg-burgundy/70" />
            <blockquote className="relative flex h-full flex-col justify-end p-5">
              <p className="font-serif text-xl leading-snug text-ivory">“{CARD_VERSE.text}”</p>
              <footer className="mt-3 text-sm text-gold-soft">— {CARD_VERSE.ref}</footer>
            </blockquote>
          </div>
        </form>
      </article>

      {open ? (
        <BibleReaderModal
          bookName={reading?.book.nome || selectedBook?.nome || "Bíblia Sagrada"}
          chapter={reading?.chapter || Number(chapter)}
          verses={reading?.verses || []}
          loading={loading}
          error={error}
          onClose={() => setOpen(false)}
        />
      ) : null}
    </>
  );
}
