import { FormEvent, useState } from "react";
import { PageHero } from "../components/Article";

type PrayerRequest = {
  name: string;
  city: string;
  request: string;
  publicId: boolean;
  createdAt: string;
};

export function PedidoOracao() {
  const [sent, setSent] = useState(false);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const payload: PrayerRequest = {
      name: String(data.get("name") || "").replace(/[<>]/g, "").trim().slice(0, 120),
      city: String(data.get("city") || "").replace(/[<>]/g, "").trim().slice(0, 80),
      request: String(data.get("request") || "").replace(/[<>]/g, "").trim().slice(0, 2000),
      publicId: data.get("publicId") === "on",
      createdAt: new Date().toISOString(),
    };
    try {
      const current = JSON.parse(localStorage.getItem("pedidos-oracao") || "[]") as PrayerRequest[];
      localStorage.setItem("pedidos-oracao", JSON.stringify([payload, ...current]));
    } catch {
      // Continua mesmo se o armazenamento local estiver indisponível.
    }
    setSent(true);
    event.currentTarget.reset();
  }

  return (
    <>
      <PageHero
        kicker="Confie sua intenção"
        title="Pedido de Oração"
        intro="Envie sua intenção para oração. Todos os pedidos passam por moderação."
        crumbs={[{ href: "/pedido-de-oracao", label: "Pedido de Oração" }]}
      />
      <section className="site-section mx-auto max-w-2xl px-4">
        {sent ? (
          <div className="mb-8 rounded-3xl border border-burgundy/20 bg-parchment p-5" role="status">
            Seu pedido foi registrado para moderação. A Igreja rezará por esta intenção.
          </div>
        ) : null}
        <form onSubmit={onSubmit} className="space-y-5 rounded-3xl border border-burgundy/12 bg-white p-6 sm:p-8">
          <label className="block">
            <span className="mb-2 block text-sm font-bold">Nome</span>
            <input required name="name" maxLength={120} className="h-12 w-full rounded-xl border border-burgundy/15 px-4" />
          </label>
          <label className="block">
            <span className="mb-2 block text-sm font-bold">Cidade</span>
            <input required name="city" maxLength={80} className="h-12 w-full rounded-xl border border-burgundy/15 px-4" />
          </label>
          <label className="block">
            <span className="mb-2 block text-sm font-bold">Pedido</span>
            <textarea required name="request" maxLength={2000} rows={6} className="w-full rounded-xl border border-burgundy/15 px-4 py-3" />
          </label>
          <label className="flex items-center gap-3">
            <input name="publicId" type="checkbox" />
            <span>Desejo identificação pública</span>
          </label>
          <p className="text-sm text-muted">Os pedidos passam por moderação antes de qualquer publicação.</p>
          <button className="btn btn-burgundy" type="submit">
            Enviar para moderação
          </button>
        </form>
      </section>
    </>
  );
}
