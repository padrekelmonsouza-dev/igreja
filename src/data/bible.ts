export type BibleBookIndex = {
  nome: string;
  slug: string;
  testamento: string;
  capitulos: number;
};

export type BibleVerse = {
  versiculo: number;
  texto: string;
};

export type BibleChapter = {
  capitulo: number;
  versiculos: BibleVerse[];
};

export type BibleBook = {
  nome: string;
  testamento: string;
  capitulos: BibleChapter[];
};

let indexPromise: Promise<BibleBookIndex[]> | null = null;
const bookCache = new Map<string, Promise<BibleBook>>();

export function loadBibleIndex() {
  if (!indexPromise) {
    indexPromise = fetch("/biblia/indice.json").then((response) => {
      if (!response.ok) throw new Error("Não foi possível carregar os livros da Sagrada Escritura.");
      return response.json() as Promise<BibleBookIndex[]>;
    });
  }
  return indexPromise;
}

export function loadBibleBook(slug: string) {
  const cached = bookCache.get(slug);
  if (cached) return cached;

  const request = fetch(`/biblia/livros/${slug}.json`).then((response) => {
    if (!response.ok) throw new Error("Não foi possível carregar este livro.");
    return response.json() as Promise<BibleBook>;
  });
  bookCache.set(slug, request);
  return request;
}

export function getBibleChapter(book: BibleBook, chapter: number) {
  return book.capitulos.find((item) => item.capitulo === chapter);
}
