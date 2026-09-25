import { FormEvent, useState } from "react";
import { Link } from "react-router-dom";
import { SITE, SITE_CONTACT } from "../data/site";

function cleanField(value: FormDataEntryValue | null, max: number) {
  return String(value || "")
    .replace(/[<>]/g, "")
    .trim()
    .slice(0, max);
}

function VocationalContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: cleanField(data.get("name"), 120),
      whatsapp: cleanField(data.get("whatsapp"), 40),
      phone: cleanField(data.get("phone"), 40),
      email: cleanField(data.get("email"), 120),
      message: cleanField(data.get("message"), 2000),
      _subject: "Pastoral Vocacional — contato pelo portal",
    };

    setStatus("sending");

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${SITE_CONTACT.vocationalEmail}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify(payload),
      });
      if (!response.ok) throw new Error("send failed");
      setStatus("sent");
      form.reset();
    } catch {
      const body = [
        `Nome: ${payload.name}`,
        `WhatsApp: ${payload.whatsapp}`,
        `Telefone: ${payload.phone}`,
        `E-mail: ${payload.email}`,
        "",
        payload.message,
      ].join("\n");
      window.location.href = `mailto:${SITE_CONTACT.vocationalEmail}?subject=${encodeURIComponent(payload._subject)}&body=${encodeURIComponent(body)}`;
      setStatus("sent");
      form.reset();
    }
  }

  const fieldClass =
    "h-9 w-full rounded-lg border border-white/25 bg-white/10 px-3 text-sm text-white placeholder:text-white/50 outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/30";

  return (
    <form
      onSubmit={onSubmit}
      className="flex h-full min-h-0 min-w-0 w-full flex-col rounded-2xl bg-white/10 p-4 text-left text-white shadow-card backdrop-blur-md"
    >
      <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-gold-soft">Fale conosco</p>
      <div className="mt-3 grid min-h-0 flex-1 grid-rows-[auto_auto_auto_1fr] gap-2 sm:grid-cols-2">
        <label className="block sm:col-span-2">
          <span className="mb-1 block text-xs font-semibold text-ivory/90">Nome</span>
          <input required name="name" maxLength={120} autoComplete="name" className={fieldClass} />
        </label>
        <label className="block">
          <span className="mb-1 block text-xs font-semibold text-ivory/90">WhatsApp</span>
          <input required name="whatsapp" type="tel" maxLength={40} autoComplete="tel" className={fieldClass} />
        </label>
        <label className="block">
          <span className="mb-1 block text-xs font-semibold text-ivory/90">Telefone</span>
          <input required name="phone" type="tel" maxLength={40} autoComplete="tel-national" className={fieldClass} />
        </label>
        <label className="block sm:col-span-2">
          <span className="mb-1 block text-xs font-semibold text-ivory/90">E-mail</span>
          <input required name="email" type="email" maxLength={120} autoComplete="email" className={fieldClass} />
        </label>
        <label className="flex min-h-0 flex-col sm:col-span-2">
          <span className="mb-1 block text-xs font-semibold text-ivory/90">Mensagem</span>
          <textarea
            required
            name="message"
            maxLength={2000}
            rows={3}
            className="min-h-[5.5rem] w-full flex-1 rounded-lg border border-white/25 bg-white/10 px-3 py-2 text-sm text-white outline-none transition focus:border-gold focus:ring-2 focus:ring-gold/30"
          />
        </label>
      </div>
      {status === "sent" ? (
        <p className="mt-3 text-sm leading-5 text-gold-soft" role="status">
          Mensagem encaminhada para {SITE_CONTACT.vocationalEmail}.
        </p>
      ) : null}
      <button className="btn btn-gold mt-3 h-10 w-full px-5 text-sm sm:w-auto" type="submit" disabled={status === "sending"}>
        {status === "sending" ? "Enviando…" : "Enviar"}
      </button>
    </form>
  );
}

export function PastoralVocacional() {
  return (
    <section id="pastoral-vocacional" className="full-bleed relative overflow-hidden text-white">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat [background-attachment:fixed]"
        style={{ backgroundImage: `url(${SITE.heroImage})` }}
        aria-hidden="true"
      />
      <div className="absolute inset-0 bg-burgundy/80" aria-hidden="true" />
      <div className="relative mx-auto grid w-full max-w-[1280px] grid-cols-1 items-stretch gap-5 px-4 py-8 lg:grid-cols-2 lg:gap-6">
        <div className="min-w-0 w-full">
          <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-gold-soft">O Senhor chama</p>
          <h2 className="mt-2 font-serif text-4xl leading-[0.95] text-gold-soft sm:text-[2.75rem]">
            Pastoral Vocacional
          </h2>
          <p className="mt-3 max-w-lg font-serif text-xl leading-snug text-white sm:text-2xl">
            Você já pensou em dedicar sua vida a Deus servindo aos irmãos?
          </p>
          <p className="mt-3 max-w-lg text-sm leading-6 text-ivory/85">
            Não é preciso ter todas as respostas. Se o coração se inquieta, a Igreja escuta, discerne e acompanha no
            mesmo espírito do Evangelho: vinde e vede.
          </p>
          <ul className="mt-5 space-y-3">
            {[
              {
                title: "Missionário ortodoxo",
                text: "Leve o Evangelho e a Tradição Apostólica a quem ainda não encontrou a Igreja.",
              },
              {
                title: "Monge",
                text: "Entregue os dias à oração, ao silêncio e à vida comum no mosteiro.",
              },
              {
                title: "Padre",
                text: "Celebre a Divina Liturgia e caminhe com o povo que Deus lhe confiar.",
              },
            ].map((item) => (
              <li key={item.title}>
                <p className="font-serif text-lg leading-tight text-gold-soft">{item.title}</p>
                <p className="mt-0.5 text-sm leading-5 text-ivory/85">{item.text}</p>
              </li>
            ))}
          </ul>
          <div className="mt-5">
            <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-gold-soft">
              Padre Diretor Vocacional
            </p>
            <p className="mt-1 font-serif text-xl leading-tight">
              <Link to="/igreja/hierarquia/padre-aquila" className="transition hover:text-gold-soft">
                Padre Aquila Peroba
              </Link>
            </p>
            <p className="mt-1 text-xs leading-5 text-ivory/70">
              Escreva ao lado. Sua mensagem chega a{" "}
              <a href={`mailto:${SITE_CONTACT.vocationalEmail}`} className="text-gold-soft hover:text-gold">
                {SITE_CONTACT.vocationalEmail}
              </a>
              .
            </p>
          </div>
        </div>
        <div className="flex min-h-0 min-w-0 w-full">
          <VocationalContactForm />
        </div>
      </div>
    </section>
  );
}
