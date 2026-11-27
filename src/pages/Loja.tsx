import { useEffect, useRef, useState } from "react";
import { CommunitiesSection } from "../components/CommunitiesSection";
import HoverExpand, { type HoverExpandItem } from "../components/ui/hover-expand";
import { BagIcon, useCart } from "../components/StoreCart";
import { formatPrice, PRODUCTS, STORE_CATEGORIES, type Product, type ProductCategory } from "../data/store";

function useTilt<T extends HTMLElement>(strength = 10) {
  const ref = useRef<T>(null);
  useEffect(() => {
    const node = ref.current;
    if (!node || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    function onMove(event: PointerEvent) {
      if (!node || event.pointerType !== "mouse") return;
      const rect = node.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width - 0.5;
      const y = (event.clientY - rect.top) / rect.height - 0.5;
      node.style.transform = `perspective(900px) rotateY(${x * strength}deg) rotateX(${-y * strength}deg)`;
      node.style.setProperty("--shine-x", `${(x + 0.5) * 100}%`);
      node.style.setProperty("--shine-y", `${(y + 0.5) * 100}%`);
    }
    function onLeave() {
      if (node) node.style.transform = "";
    }
    node.addEventListener("pointermove", onMove);
    node.addEventListener("pointerleave", onLeave);
    return () => {
      node.removeEventListener("pointermove", onMove);
      node.removeEventListener("pointerleave", onLeave);
    };
  }, [strength]);
  return ref;
}

function AddButton({ product, className = "" }: { product: Product; className?: string }) {
  const { add, setOpen } = useCart();
  const [done, setDone] = useState(false);
  return (
    <button
      type="button"
      onClick={(event) => {
        event.stopPropagation();
        add(product.slug);
        setDone(true);
        window.setTimeout(() => setDone(false), 1400);
        window.setTimeout(() => setOpen(true), 350);
      }}
      className={`inline-flex items-center justify-center gap-2 rounded-full px-5 py-3 text-sm font-semibold transition ${
        done ? "bg-gold text-burgundy" : "bg-burgundy text-gold hover:bg-burgundy-light"
      } shadow-card ring-1 ring-gold/40 ${className}`}
    >
      {done ? "✓ Adicionado" : (
        <>
          <BagIcon className="h-4 w-4" />
          Adicionar ao carrinho
        </>
      )}
    </button>
  );
}

function Spotlight({ products, onOpen }: { products: Product[]; onOpen: (product: Product) => void }) {
  const [active, setActive] = useState(0);
  const product = products[active];
  const items: HoverExpandItem[] = products.map((item) => ({
    id: item.slug,
    title: item.name,
    kicker: item.badge,
    description: item.subtitle,
    image: item.image,
    alt: item.name,
  }));

  return (
    <section className="relative overflow-hidden bg-ivory px-4 py-14 sm:py-20">
      <div aria-hidden="true" className="pointer-events-none absolute -right-24 top-0 h-96 w-96 rounded-full bg-gold/15 blur-3xl" />
      <div className="relative mx-auto grid w-full max-w-site items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-14">
        <div className="max-w-xl">
          <p className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.24em] text-burgundy">
            <span className="h-px w-10 bg-gold" aria-hidden="true" />
            Lojinha da Igreja
          </p>
          <h1 className="mt-5 font-serif text-5xl leading-[1.02] text-ink sm:text-6xl">
            Leituras e objetos
            <span className="block text-burgundy">para a vida de fé</span>
          </h1>
          <p className="mt-5 text-lg leading-8 text-stone">
            Os livros do Padre Kelmon e o komboskini, a corda de oração dos monges ortodoxos. Escolha, monte o seu
            carrinho e finalize o pedido direto pelo WhatsApp com a nossa equipe.
          </p>
          <div className="my-6 h-px w-full bg-[linear-gradient(90deg,#D4AF37,rgba(212,175,55,.2),transparent)]" aria-hidden="true" />
          <div aria-live="polite">
            {product.badge ? <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-gold-dark">{product.badge}</p> : null}
            <p className="mt-1 font-serif text-3xl text-ink">{product.name}</p>
            <p className="mt-1 italic text-stone">{product.subtitle}</p>
            <p className="mt-2 font-serif text-xl text-burgundy">{formatPrice(product.price)}</p>
          </div>
          <div className="mt-5 flex flex-wrap items-center gap-3">
            <AddButton product={product} />
            <button
              type="button"
              onClick={() => onOpen(product)}
              className="rounded-full bg-white px-5 py-3 text-sm font-semibold text-burgundy ring-1 ring-burgundy/20 hover:ring-gold"
            >
              Saiba mais
            </button>
          </div>
        </div>

        <HoverExpand
          items={items}
          activeIndex={active}
          onActiveIndexChange={setActive}
          onOpenItem={(item) => onOpen(products.find((p) => p.slug === item.id)!)}
          className="h-[420px] sm:h-[520px]"
        />
      </div>
    </section>
  );
}

function ProductCard({ product, onOpen }: { product: Product; onOpen: () => void }) {
  const tilt = useTilt<HTMLDivElement>(6);
  return (
    <div ref={tilt} className="group transition-transform duration-200 ease-out [transform-style:preserve-3d]">
      <article className="flex h-full flex-col overflow-hidden rounded-[1.75rem] bg-white shadow-card ring-1 ring-burgundy/10 transition group-hover:ring-gold/60">
        <button type="button" onClick={onOpen} className="relative block aspect-[4/5] overflow-hidden bg-parchment" aria-label={`Ver detalhes de ${product.name}`}>
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
          />
          {product.badge ? (
            <span className="absolute left-4 top-4 rounded-full bg-burgundy/90 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.18em] text-gold backdrop-blur">
              {product.badge}
            </span>
          ) : null}
          <span className="absolute inset-x-4 bottom-4 translate-y-3 rounded-full bg-white/90 py-2 text-center text-xs font-semibold text-burgundy opacity-0 backdrop-blur transition group-hover:translate-y-0 group-hover:opacity-100">
            Ver detalhes
          </span>
        </button>
        <div className="flex flex-1 flex-col p-5">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-gold">
            {product.category === "livros" ? "Livro · Padre Kelmon" : "Oração"}
          </p>
          <h3 className="mt-1 font-serif text-2xl leading-tight text-ink">{product.name}</h3>
          <p className="mt-1 text-sm italic text-stone">{product.subtitle}</p>
          <p className="mt-3 text-sm leading-6 text-stone">{product.summary}</p>
          <div className="mt-auto flex flex-wrap items-center justify-between gap-3 pt-5">
            <span className="font-serif text-lg text-burgundy">{formatPrice(product.price)}</span>
            <AddButton product={product} className="px-4 py-2.5" />
          </div>
        </div>
      </article>
    </div>
  );
}

function ProductModal({ product, onClose }: { product: Product; onClose: () => void }) {
  const [qty, setQty] = useState(1);
  const { add, setOpen } = useCart();

  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = previous;
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[85] flex items-end justify-center sm:items-center sm:p-6">
      <button type="button" aria-label="Fechar" onClick={onClose} className="absolute inset-0 bg-ink/70 backdrop-blur-sm" />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={product.name}
        className="relative grid max-h-[92vh] w-full max-w-4xl overflow-y-auto rounded-t-[2rem] bg-cream shadow-2xl sm:rounded-[2rem] md:grid-cols-2 md:overflow-hidden"
      >
        <div className="relative bg-[radial-gradient(circle_at_50%_30%,#9B2430,#3d0a10)] p-6 md:p-8">
          <img src={product.image} alt={product.name} className="mx-auto max-h-[46vh] w-auto rounded-2xl object-contain shadow-[0_30px_60px_-25px_rgba(0,0,0,.8)] md:max-h-[70vh]" />
        </div>
        <div className="flex flex-col p-6 md:overflow-y-auto md:p-8">
          <button
            type="button"
            onClick={onClose}
            aria-label="Fechar"
            className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full bg-burgundy text-xl text-gold"
          >
            ×
          </button>
          {product.badge ? <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-gold">{product.badge}</p> : null}
          <h2 className="mt-1 pr-10 font-serif text-4xl leading-tight text-ink">{product.name}</h2>
          <p className="mt-1 italic text-stone">{product.subtitle}</p>
          <div className="my-4 h-px bg-[linear-gradient(90deg,#D4AF37,transparent)]" aria-hidden="true" />
          {product.description.map((paragraph) => (
            <p key={paragraph.slice(0, 30)} className="mt-3 text-[15px] leading-7 text-[#3a342d] first-of-type:mt-0">
              {paragraph}
            </p>
          ))}
          <dl className="mt-5 grid gap-2 rounded-2xl bg-white p-4 ring-1 ring-burgundy/10">
            {product.details.map((detail) => (
              <div key={detail.label} className="flex justify-between gap-4 text-sm">
                <dt className="text-stone">{detail.label}</dt>
                <dd className="text-right font-medium text-ink">{detail.value}</dd>
              </div>
            ))}
          </dl>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <span className="mr-auto font-serif text-2xl text-burgundy">{formatPrice(product.price)}</span>
            <div className="flex items-center rounded-full bg-white ring-1 ring-burgundy/20">
              <button type="button" aria-label="Diminuir" onClick={() => setQty((q) => Math.max(1, q - 1))} className="grid h-11 w-11 place-items-center text-burgundy">
                −
              </button>
              <span className="w-6 text-center font-semibold">{qty}</span>
              <button type="button" aria-label="Aumentar" onClick={() => setQty((q) => Math.min(99, q + 1))} className="grid h-11 w-11 place-items-center text-burgundy">
                +
              </button>
            </div>
            <button
              type="button"
              onClick={() => {
                add(product.slug, qty);
                onClose();
                window.setTimeout(() => setOpen(true), 200);
              }}
              className="inline-flex items-center gap-2 rounded-full bg-burgundy px-6 py-3 font-semibold text-gold shadow-card ring-1 ring-gold/40 hover:bg-burgundy-light"
            >
              <BagIcon className="h-5 w-5" />
              Adicionar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

const KNOTS = 33;

function PrayerRope() {
  const [count, setCount] = useState(0);
  const [rounds, setRounds] = useState(0);
  const [pulse, setPulse] = useState(false);

  function pray() {
    setPulse(true);
    window.setTimeout(() => setPulse(false), 450);
    if (typeof navigator !== "undefined" && "vibrate" in navigator) navigator.vibrate?.(12);
    setCount((c) => {
      if (c + 1 >= KNOTS) {
        setRounds((r) => r + 1);
        return 0;
      }
      return c + 1;
    });
  }

  const size = 300;
  const r = 126;

  return (
    <section className="relative overflow-hidden bg-ink px-4 py-16 text-ivory sm:py-20">
      <div aria-hidden="true" className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[520px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-burgundy/40 blur-3xl" />
      <div className="relative mx-auto grid w-full max-w-site items-center gap-12 lg:grid-cols-2">
        <div className="max-w-xl">
          <p className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.24em] text-gold">
            <span className="h-px w-10 bg-gold" aria-hidden="true" />
            Experimente rezar
          </p>
          <h2 className="mt-5 font-serif text-4xl leading-tight sm:text-5xl">
            A Oração de Jesus
            <span className="block text-gold">nó por nó</span>
          </h2>
          <p className="mt-5 text-lg leading-8 text-ivory/80">
            Os monges ortodoxos rezam com o komboskini repetindo, a cada nó, uma breve invocação. Toque no centro do
            círculo a cada oração e acompanhe os 33 nós, um para cada ano da vida de Cristo na terra.
          </p>
          <blockquote className="mt-6 border-l-2 border-gold pl-5 font-serif text-2xl italic leading-snug text-ivory">
            «Senhor Jesus Cristo, Filho de Deus, tem piedade de mim, pecador.»
          </blockquote>
        </div>

        <div className="mx-auto flex flex-col items-center">
          <div className="relative" style={{ width: size, height: size }}>
            <svg viewBox={`0 0 ${size} ${size}`} className="absolute inset-0" aria-hidden="true">
              <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke="rgba(212,175,55,.18)" strokeWidth="2" />
              {Array.from({ length: KNOTS }, (_, i) => {
                const angle = (i / KNOTS) * Math.PI * 2 - Math.PI / 2;
                const x = size / 2 + r * Math.cos(angle);
                const y = size / 2 + r * Math.sin(angle);
                const prayed = i < count;
                const current = i === count;
                return (
                  <g key={i}>
                    <circle
                      cx={x}
                      cy={y}
                      r={current ? 9 : 7}
                      fill={prayed ? "#D4AF37" : "#1A0E0C"}
                      stroke={current ? "#F0D56A" : "rgba(212,175,55,.55)"}
                      strokeWidth={current ? 2.5 : 1.5}
                      style={{ transition: "all .35s ease" }}
                    />
                    {prayed ? <path d={`M${x - 3} ${y}h6M${x} ${y - 3}v6`} stroke="#6E121C" strokeWidth="1.6" /> : null}
                  </g>
                );
              })}
            </svg>
            <button
              type="button"
              onClick={pray}
              aria-label={`Rezar. ${count} de ${KNOTS} nós nesta volta`}
              className={`absolute left-1/2 top-1/2 grid h-40 w-40 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-[radial-gradient(circle_at_40%_30%,#9B2430,#6E121C_60%,#3d0a10)] text-center shadow-[0_0_60px_-10px_rgba(212,175,55,.6)] ring-2 ring-gold/60 transition-transform duration-300 active:scale-95 ${
                pulse ? "scale-105" : ""
              }`}
            >
              <span>
                <span className="block text-3xl text-gold" aria-hidden="true">
                  ☦
                </span>
                <span className="block font-serif text-4xl leading-none" aria-live="polite">
                  {count}
                  <span className="text-lg text-ivory/60">/{KNOTS}</span>
                </span>
                <span className="mt-1 block text-[10px] font-bold uppercase tracking-[0.2em] text-gold">Toque para rezar</span>
              </span>
            </button>
          </div>
          <p className="mt-6 text-sm text-ivory/70">
            {rounds > 0 ? `${rounds} ${rounds === 1 ? "volta completa" : "voltas completas"} · ` : ""}
            <button type="button" onClick={() => { setCount(0); setRounds(0); }} className="underline-offset-4 hover:text-gold hover:underline">
              Recomeçar
            </button>
          </p>
        </div>
      </div>
    </section>
  );
}

export function Loja() {
  const [filter, setFilter] = useState<ProductCategory | "todos">("todos");
  const [selected, setSelected] = useState<Product | null>(null);
  const { count, setOpen } = useCart();
  const visible = PRODUCTS.filter((product) => filter === "todos" || product.category === filter);

  return (
    <>
      <Spotlight products={PRODUCTS} onOpen={setSelected} />

      <section className="bg-ivory px-4 py-14 sm:py-16">
        <div className="mx-auto w-full max-w-site">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-[0.22em] text-burgundy">
                <span className="h-px w-10 bg-gold" aria-hidden="true" />
                Vitrine
              </p>
              <h2 className="mt-3 font-serif text-4xl text-ink sm:text-5xl">Todos os produtos</h2>
            </div>
            <div className="flex gap-2" role="tablist" aria-label="Categorias">
              {STORE_CATEGORIES.map((category) => (
                <button
                  key={category.id}
                  type="button"
                  role="tab"
                  aria-selected={filter === category.id}
                  onClick={() => setFilter(category.id)}
                  className={`rounded-full px-4 py-2 text-sm font-medium ring-1 transition ${
                    filter === category.id ? "bg-burgundy text-gold ring-gold/50" : "bg-white text-ink ring-burgundy/15 hover:text-burgundy"
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {visible.map((product) => (
              <ProductCard key={product.slug} product={product} onOpen={() => setSelected(product)} />
            ))}
          </div>

          <ul className="mt-12 grid gap-4 sm:grid-cols-3">
            {[
              ["☦", "Atendimento da Igreja", "Cada pedido é recebido e respondido pela nossa equipe."],
              ["✉", "Pedido pelo WhatsApp", "Monte o carrinho e envie com um toque. Combinamos valor, entrega e pagamento."],
              ["✦", "Feito com fé", "Livros do Padre Kelmon e komboskinis trançados à mão."],
            ].map(([icon, title, text]) => (
              <li key={title} className="flex gap-4 rounded-2xl bg-white p-5 shadow-card ring-1 ring-burgundy/10">
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-[linear-gradient(160deg,#6E121C,#9B2430)] text-lg text-gold-soft ring-1 ring-gold" aria-hidden="true">
                  {icon}
                </span>
                <div>
                  <p className="font-serif text-xl text-ink">{title}</p>
                  <p className="text-sm leading-6 text-stone">{text}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <PrayerRope />

      <CommunitiesSection />

      {count > 0 ? (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="fixed bottom-20 right-5 z-30 flex items-center gap-2 rounded-full bg-burgundy py-3 pl-4 pr-5 font-semibold text-gold shadow-card ring-2 ring-gold/60 md:hidden"
        >
          <BagIcon className="h-5 w-5" />
          Ver carrinho ({count})
        </button>
      ) : null}

      {selected ? <ProductModal product={selected} onClose={() => setSelected(null)} /> : null}
    </>
  );
}
