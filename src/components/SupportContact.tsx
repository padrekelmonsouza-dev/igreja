import { Link } from "react-router-dom";
import { SITE_CONTACT } from "../data/site";
import { trackEvent } from "../lib/analytics";

export function SupportContact() {
  return (
    <section className="site-section mx-auto grid w-full max-w-[1280px] gap-6 px-4 md:grid-cols-2">
      <div className="rounded-3xl border border-burgundy/10 bg-white p-8">
        <p className="kicker">Apoie a Igreja</p>
        <h2 className="mt-3 font-serif text-3xl">Sustente a vida litúrgica e missionária.</h2>
        <p className="mt-4 text-stone">
          Espaço institucional para manutenção, obras, evangelização e formação. Dados bancários serão publicados somente
          quando oficiais.
        </p>
        <Link className="btn btn-burgundy mt-6" to="/doacoes">
          Apoie a Igreja
        </Link>
      </div>
      <div className="rounded-3xl border border-burgundy/10 bg-white p-8">
        <p className="kicker">Contato</p>
        <h2 className="mt-3 font-serif text-3xl">Fale com uma comunidade.</h2>
        <p className="mt-4 text-stone">
          Telefone do Mosteiro de São Basílio: {SITE_CONTACT.monasteryPhone}. Pedidos de oração passam por moderação.
        </p>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Link className="btn btn-burgundy" to="/contato">
            Contato
          </Link>
          <a
            className="btn btn-outline-dark"
            href={`https://wa.me/${SITE_CONTACT.monasteryWhatsapp}`}
            onClick={() => trackEvent("click_whatsapp", { community: "nova-iguacu" })}
          >
            WhatsApp do mosteiro
          </a>
        </div>
      </div>
    </section>
  );
}
