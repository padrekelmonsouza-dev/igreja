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
      name: String(data.get("name") || ""),
      city: String(data.get("city") || ""),
      request: String(data.get("request") || ""),
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
      <section className="mx-auto max-w-2xl px-4 py-12">
        {sent ? (
          <div className="mb-8 rounded-3xl border border-burgundy/20 bg-parchment p-5" role="status">
            Seu pedido foi registrado para moderação. A Igreja rezará por esta intenção.
          </div>
        ) : null}
        <form onSubmit={onSubmit} className="space-y-5 rounded-3xl border border-[rgba(90,13,24,.12)] bg-white p-6 sm:p-8">
          <label className="block">
            <span className="mb-2 block text-sm font-bold">Nome</span>
            <input required name="name" className="h-12 w-full rounded-xl border border-[rgba(90,13,24,.18)] px-4" />
          </label>
          <label className="block">
            <span className="mb-2 block text-sm font-bold">Cidade</span>
            <input required name="city" className="h-12 w-full rounded-xl border border-[rgba(90,13,24,.18)] px-4" />
          </label>
          <label className="block">
            <span className="mb-2 block text-sm font-bold">Pedido</span>
            <textarea required name="request" rows={6} className="w-full rounded-xl border border-[rgba(90,13,24,.18)] px-4 py-3" />
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
