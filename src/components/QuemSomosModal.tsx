import { createContext, useCallback, useContext, useEffect, useId, useRef, useState } from "react";
import { Link } from "react-router-dom";

type QuemSomosContextValue = {
  openQuemSomos: () => void;
  closeQuemSomos: () => void;
};

const QuemSomosContext = createContext<QuemSomosContextValue | null>(null);

export function useQuemSomosModal() {
  const context = useContext(QuemSomosContext);
  if (!context) {
    throw new Error("useQuemSomosModal precisa estar dentro de QuemSomosProvider");
  }
  return context;
}

export function QuemSomosProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const titleId = useId();
  const closeRef = useRef<HTMLButtonElement>(null);

  const openQuemSomos = useCallback(() => setOpen(true), []);
  const closeQuemSomos = useCallback(() => setOpen(false), []);

  useEffect(() => {
    if (!open) return;
    const timer = window.setTimeout(() => closeRef.current?.focus(), 40);
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

  return (
    <QuemSomosContext.Provider value={{ openQuemSomos, closeQuemSomos }}>
      {children}
      {open ? (
        <div className="fixed inset-0 z-[80] flex items-end justify-center p-0 sm:items-center sm:p-6">
          <button type="button" className="absolute inset-0 bg-ink/55" aria-label="Fechar Quem somos" onClick={closeQuemSomos} />
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby={titleId}
            className="relative z-10 flex max-h-[92vh] w-full max-w-5xl flex-col overflow-hidden rounded-t-3xl bg-white shadow-card sm:rounded-3xl"
          >
            <div className="flex items-start justify-between gap-4 border-b border-burgundy/10 px-5 py-4">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-burgundy">Quem somos</p>
                <h2 id={titleId} className="mt-1 font-serif text-2xl leading-tight text-ink sm:text-3xl">
                  Igreja Ortodoxa Grega G.O.C. no Brasil
                </h2>
              </div>
              <button
                ref={closeRef}
                type="button"
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-burgundy/20 text-burgundy"
                aria-label="Fechar"
                onClick={closeQuemSomos}
              >
                ×
              </button>
            </div>
            <div className="overflow-y-auto px-5 py-5">
              <div className="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_min(100%,22rem)]">
                <div>
                  <p className="text-base leading-7 text-stone">
                    A Igreja Ortodoxa Grega G.O.C. no Brasil apresenta a fé apostólica, a Divina Liturgia e a vida das
                    comunidades em comunhão com o Santo Sínodo de Eugenio de Atenas. G.O.C. refere-se aos Cristãos
                    Ortodoxos Genuínos, na tradição velho-calendarista grega.
                  </p>
                  <p className="mt-3 text-base leading-7 text-stone">
                    É um portal de fé, formação, história e missão, para quem chega agora e para quem já vive a fé.
                    Confessamos a Igreja una, santa, católica e apostólica; honramos os Santos Ícones, o jejum e o
                    calendário patrístico.
                  </p>
                  <p className="mt-3 text-base leading-7 text-stone">
                    A presença ortodoxa no Brasil cresceu por missões, mosteiros, paróquias e o testemunho de clérigos e
                    fiéis. A história da Igreja é a transmissão da mesma fé, nos mesmos Mistérios, de geração em geração.
                  </p>
                  <p className="mt-3 text-base leading-7 text-stone">
                    Há comunidades, missões e o Mosteiro de São Basílio em Marapicu, Nova Iguaçu, com núcleos pastorais
                    em São Paulo e no Rio de Janeiro. A Tradição Apostólica — Escritura, liturgia, Padres e sucessão
                    episcopal — é o que a Igreja transmite. O convite permanece: vinde e vede.
                  </p>
                  <Link className="btn btn-burgundy mt-8 w-fit" to="/igreja/quem-somos" onClick={closeQuemSomos}>
                    Quem somos
                  </Link>
                </div>
                <img
                  src="/media/igreja-ortodoxa-grega-no-brasil.jpg"
                  alt="Igreja Ortodoxa Grega G.O.C. no Brasil, Santo Sínodo de Eugenios de Atenas, Ortodoxia do Velho Calendário"
                  width={600}
                  height={600}
                  className="aspect-square h-auto w-full rounded-3xl object-cover shadow-card"
                />
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </QuemSomosContext.Provider>
  );
}
