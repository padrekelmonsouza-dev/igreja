import { Link } from "react-router-dom";
import { PageHero } from "../components/Article";
import { OfficialNotice } from "../components/ShareBar";
import { COMMUNITIES, whatsappUrl } from "../data/communities";
import { DONATION_PROJECTS } from "../data/collections";
import { SITE, SITE_CONTACT } from "../data/site";
import { trackEvent } from "../lib/analytics";

export function Doacoes() {
  return (
    <>
      <PageHero
        kicker="Apoie a Igreja"
        title="Sustente a vida da Igreja"
        intro="Espaço institucional para apoio à manutenção, às obras, à evangelização e à formação. Dados bancários e PIX só serão publicados quando oficiais."
        crumbs={[{ href: "/doacoes", label: "Apoie a Igreja" }]}
      />
      <section className="site-section mx-auto max-w-4xl space-y-6 px-4">
        <OfficialNotice>
          PIX, dados bancários e doação recorrente ainda não foram publicados pela Secretaria da Igreja. Este espaço está
          pronto para recebê-los.
        </OfficialNotice>
        <div className="grid gap-4 md:grid-cols-2">
          {DONATION_PROJECTS.map((item) => (
            <article key={item.title} className="rounded-3xl border border-burgundy/10 bg-white p-6">
              <h2 className="font-serif text-2xl">{item.title}</h2>
              <p className="mt-2 text-stone">{item.text}</p>
            </article>
          ))}
        </div>
        <Link className="btn btn-burgundy" to="/contato">
          Falar com a Igreja
        </Link>
      </section>
    </>
  );
}

export function Contato() {
  const monastery = COMMUNITIES[0];
  return (
    <>
      <PageHero
        kicker="Contato"
        title="Fale com a Igreja"
        intro="Utilize os contatos oficiais já publicados. Não há e-mail institucional listado neste portal até divulgação oficial."
        crumbs={[{ href: "/contato", label: "Contato" }]}
      />
      <section className="site-section mx-auto grid max-w-5xl gap-6 px-4 md:grid-cols-2">
        <article className="rounded-3xl border border-burgundy/10 bg-white p-6">
          <h2 className="font-serif text-2xl">{monastery.name}</h2>
          <p className="mt-3">{SITE_CONTACT.monasteryAddress}</p>
          <p className="mt-2">
            Telefone / WhatsApp:{" "}
            <a className="underline underline-offset-4" href={`tel:5521964837295`} onClick={() => trackEvent("click_phone", { community: monastery.slug })}>
              {SITE_CONTACT.monasteryPhone}
            </a>
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <a
              className="btn btn-burgundy"
              href={whatsappUrl(monastery.whatsapp || SITE_CONTACT.monasteryWhatsapp)}
              onClick={() => trackEvent("click_whatsapp", { community: monastery.slug })}
            >
              WhatsApp
            </a>
            <Link className="btn btn-outline-dark" to={monastery.href}>
              Ver comunidade
            </Link>
          </div>
        </article>
        <article className="rounded-3xl border border-burgundy/10 bg-white p-6">
          <h2 className="font-serif text-2xl">Pedidos de oração</h2>
          <p className="mt-3 text-stone">Envie uma intenção. Os pedidos passam por moderação antes de qualquer publicação.</p>
          <Link className="btn btn-burgundy mt-5" to="/pedido-de-oracao">
            Enviar pedido
          </Link>
        </article>
      </section>
    </>
  );
}

export function PoliticaPrivacidade() {
  return (
    <>
      <PageHero
        kicker="Legal"
        title="Política de privacidade"
        intro="Como este portal trata informações pessoais, de acordo com o funcionamento atual do site."
        crumbs={[{ href: "/politica-de-privacidade", label: "Política de privacidade" }]}
      />
      <article className="prose-church site-section mx-auto max-w-3xl px-4">
        <h2>Quem é responsável</h2>
        <p>Este portal institucional é publicado em nome da {SITE.name}.</p>
        <h2>Dados que o site pode receber</h2>
        <p>
          A página de pedidos de oração solicita nome, cidade e a intenção. O envio fica registrado no dispositivo do
          visitante (armazenamento local) para moderação posterior. Não há publicação automática do pedido.
        </p>
        <p>
          O formulário da Pastoral Vocacional, presente no portal, solicita nome, WhatsApp, telefone, e-mail e mensagem.
          O envio é encaminhado ao endereço publicado {SITE_CONTACT.vocationalEmail}.
        </p>
        <h2>Cookies e medição</h2>
        <p>
          O Google Analytics 4 só é carregado se um identificador oficial for configurado no ambiente de publicação. Não
          utilizamos identificadores fictícios.
        </p>
        <h2>Contato</h2>
        <p>
          Para questões sobre dados, utilize os contatos oficiais da página de contato, em especial o Mosteiro de São
          Basílio.
        </p>
      </article>
    </>
  );
}

export function TermosUso() {
  return (
    <>
      <PageHero
        kicker="Legal"
        title="Termos de uso"
        intro="Condições de uso do portal institucional da Igreja Ortodoxa Grega G.O.C. no Brasil."
        crumbs={[{ href: "/termos-de-uso", label: "Termos de uso" }]}
      />
      <article className="prose-church site-section mx-auto max-w-3xl px-4">
        <h2>Finalidade</h2>
        <p>
          O site destina-se à informação institucional, à formação da fé e à indicação de comunidades. Conteúdo oficial e
          conteúdo editorial devem ser distinguidos.
        </p>
        <h2>Conteúdo</h2>
        <p>
          Textos, imagens e marcas da Igreja permanecem sob a responsabilidade da instituição. Não reproduza materiais
          litúrgicos ou fotografias sem autorização.
        </p>
        <h2>Limitação</h2>
        <p>
          Informações de horários, endereços e contatos devem ser confirmadas com a comunidade local. O portal não substitui
          o acompanhamento pastoral.
        </p>
      </article>
    </>
  );
}
