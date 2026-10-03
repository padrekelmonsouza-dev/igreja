import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { formatPrice, getProduct, STORE_WHATSAPP } from "../data/store";

type CartLine = { slug: string; qty: number };

type CartContextValue = {
  lines: CartLine[];
  count: number;
  open: boolean;
  setOpen: (open: boolean) => void;
  add: (slug: string, qty?: number) => void;
  setQty: (slug: string, qty: number) => void;
  remove: (slug: string) => void;
  clear: () => void;
};

const STORAGE_KEY = "igreja-loja-carrinho";
const CartContext = createContext<CartContextValue | null>(null);

function readCart(): CartLine[] {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? (JSON.parse(raw) as CartLine[]) : [];
    return parsed.filter((line) => getProduct(line.slug) && line.qty > 0);
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>(() => (typeof window === "undefined" ? [] : readCart()));
  const [open, setOpen] = useState(false);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      /* armazenamento indisponível: o carrinho vale só nesta visita */
    }
  }, [lines]);

  const add = useCallback((slug: string, qty = 1) => {
    setLines((current) => {
      const found = current.find((line) => line.slug === slug);
      if (found) return current.map((line) => (line.slug === slug ? { ...line, qty: Math.min(99, line.qty + qty) } : line));
      return [...current, { slug, qty }];
    });
  }, []);

  const setQty = useCallback((slug: string, qty: number) => {
    setLines((current) =>
      qty <= 0 ? current.filter((line) => line.slug !== slug) : current.map((line) => (line.slug === slug ? { ...line, qty: Math.min(99, qty) } : line)),
    );
  }, []);

  const remove = useCallback((slug: string) => setLines((current) => current.filter((line) => line.slug !== slug)), []);
  const clear = useCallback(() => setLines([]), []);

  const value = useMemo(
    () => ({ lines, count: lines.reduce((sum, line) => sum + line.qty, 0), open, setOpen, add, setQty, remove, clear }),
    [lines, open, add, setQty, remove, clear],
  );

  return (
    <CartContext.Provider value={value}>
      {children}
      <CartDrawer />
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart precisa estar dentro de CartProvider");
  return context;
}

export function BagIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true" className={className}>
      <path d="M6 8h12l-1 12H7L6 8Z" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
      <path d="M9 10V7a3 3 0 0 1 6 0v3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function CartDrawer() {
  const { lines, open, setOpen, setQty, remove, clear } = useCart();
  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [note, setNote] = useState("");

  useEffect(() => {
    if (!open) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }
    window.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [open, setOpen]);

  const items = lines.map((line) => ({ ...line, product: getProduct(line.slug)! }));
  const priced = items.every((item) => item.product.price !== undefined);
  const total = items.reduce((sum, item) => sum + (item.product.price || 0) * item.qty, 0);

  function checkout() {
    const message = [
      "Olá! Gostaria de fazer um pedido na lojinha da Igreja Ortodoxa:",
      "",
      ...items.map((item) => `• ${item.qty}x ${item.product.name} (${formatPrice(item.product.price)})`),
      priced ? `\nTotal: ${formatPrice(total)}` : "",
      name ? `\nNome: ${name}` : "",
      city ? `Cidade/UF: ${city}` : "",
      note ? `Observação: ${note}` : "",
    ]
      .filter(Boolean)
      .join("\n");
    window.open(`https://wa.me/${STORE_WHATSAPP}?text=${encodeURIComponent(message)}`, "_blank", "noopener");
  }

  return (
    <div className={`fixed inset-0 z-[90] ${open ? "" : "pointer-events-none"}`} aria-hidden={!open}>
      <button
        type="button"
        tabIndex={open ? 0 : -1}
        aria-label="Fechar carrinho"
        onClick={() => setOpen(false)}
        className={`absolute inset-0 bg-ink/60 backdrop-blur-[2px] transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0"}`}
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Seu carrinho"
        className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-cream shadow-2xl transition-transform duration-300 ease-out ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <header className="flex items-center justify-between bg-[linear-gradient(135deg,#6E121C,#3d0a10)] px-5 py-4 text-ivory">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-full bg-gold/15 text-gold ring-1 ring-gold/50">
              <BagIcon className="h-5 w-5" />
            </span>
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-gold">Lojinha</p>
              <h2 className="font-serif text-2xl leading-none">Seu carrinho</h2>
            </div>
          </div>
          <button
            type="button"
            tabIndex={open ? 0 : -1}
            onClick={() => setOpen(false)}
            aria-label="Fechar"
            className="grid h-10 w-10 place-items-center rounded-full text-2xl text-gold hover:bg-white/10"
          >
            ×
          </button>
        </header>

        {items.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-3 px-8 text-center">
            <span className="text-5xl text-gold" aria-hidden="true">
              ☦
            </span>
            <p className="font-serif text-2xl text-ink">Seu carrinho está vazio</p>
            <p className="text-sm text-stone">Escolha um livro ou um komboskini na lojinha.</p>
          </div>
        ) : (
          <>
            <ul className="flex-1 space-y-3 overflow-y-auto px-5 py-5">
              {items.map(({ slug, qty, product }) => (
                <li key={slug} className="flex gap-3 rounded-2xl bg-white p-3 shadow-card ring-1 ring-burgundy/10">
                  <img src={product.image} alt="" className="h-24 w-20 shrink-0 rounded-xl object-cover" />
                  <div className="flex min-w-0 flex-1 flex-col">
                    <p className="font-serif text-lg leading-tight text-ink">{product.name}</p>
                    <p className="text-xs text-stone">{formatPrice(product.price)}</p>
                    <div className="mt-auto flex items-center justify-between pt-2">
                      <div className="flex items-center rounded-full ring-1 ring-burgundy/20">
                        <button
                          type="button"
                          tabIndex={open ? 0 : -1}
                          aria-label={`Diminuir ${product.name}`}
                          onClick={() => setQty(slug, qty - 1)}
                          className="grid h-8 w-8 place-items-center text-burgundy"
                        >
                          −
                        </button>
                        <span className="w-6 text-center text-sm font-semibold">{qty}</span>
                        <button
                          type="button"
                          tabIndex={open ? 0 : -1}
                          aria-label={`Aumentar ${product.name}`}
                          onClick={() => setQty(slug, qty + 1)}
                          className="grid h-8 w-8 place-items-center text-burgundy"
                        >
                          +
                        </button>
                      </div>
                      <button
                        type="button"
                        tabIndex={open ? 0 : -1}
                        onClick={() => remove(slug)}
                        className="text-xs text-stone underline-offset-4 hover:text-burgundy hover:underline"
                      >
                        Remover
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>

            <div className="space-y-3 border-t border-burgundy/10 bg-white px-5 py-4">
              <div className="grid grid-cols-2 gap-2">
                <input
                  tabIndex={open ? 0 : -1}
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="Seu nome"
                  className="rounded-xl border border-burgundy/15 bg-cream px-3 py-2 text-sm outline-none focus:border-gold"
                />
                <input
                  tabIndex={open ? 0 : -1}
                  value={city}
                  onChange={(event) => setCity(event.target.value)}
                  placeholder="Cidade/UF"
                  className="rounded-xl border border-burgundy/15 bg-cream px-3 py-2 text-sm outline-none focus:border-gold"
                />
              </div>
              <input
                tabIndex={open ? 0 : -1}
                value={note}
                onChange={(event) => setNote(event.target.value)}
                placeholder="Observação (dedicatória, entrega…)"
                className="w-full rounded-xl border border-burgundy/15 bg-cream px-3 py-2 text-sm outline-none focus:border-gold"
              />
              <div className="flex items-baseline justify-between">
                <span className="text-sm text-stone">Total</span>
                <span className="font-serif text-2xl text-burgundy">{priced ? formatPrice(total) : "A combinar"}</span>
              </div>
              <button
                type="button"
                tabIndex={open ? 0 : -1}
                onClick={checkout}
                className="flex w-full items-center justify-center gap-2 rounded-full bg-[#1f8f4e] px-5 py-3.5 font-semibold text-white shadow-card transition hover:bg-[#187a42]"
              >
                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden="true">
                  <path d="M12 2a10 10 0 0 0-8.6 15.1L2 22l5-1.3A10 10 0 1 0 12 2Zm5.3 14.2c-.2.6-1.3 1.2-1.8 1.2-.5.1-1 .2-3.4-.7-2.9-1.1-4.7-4-4.9-4.2-.1-.2-1.2-1.6-1.2-3s.8-2.2 1-2.5c.3-.3.6-.4.8-.4h.6c.2 0 .4 0 .6.5l.9 2.1c.1.2.1.3 0 .5l-.4.6-.4.4c-.1.1-.3.3-.1.6.2.3.8 1.3 1.7 2.1 1.2 1 2.1 1.4 2.4 1.5.3.2.5.1.6-.1l.9-1c.2-.3.4-.2.6-.1l2 .9c.3.1.5.2.5.3.1.2.1.7-.1 1.3Z" />
                </svg>
                Finalizar pedido pelo WhatsApp
              </button>
              <button
                type="button"
                tabIndex={open ? 0 : -1}
                onClick={clear}
                className="w-full text-center text-xs text-stone hover:text-burgundy"
              >
                Esvaziar carrinho
              </button>
            </div>
          </>
        )}
      </aside>
    </div>
  );
}
