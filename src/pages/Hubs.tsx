import { HubGrid, PageHero } from "../components/Article";

export function IgrejaHub() {
  return (
    <>
      <PageHero
        kicker="Igreja"
        title="Igreja Ortodoxa Grega no Brasil"
        intro="Arcebispos, mosteiros, paróquias, pastorais e a Ordem de São José — a vida institucional da Igreja Ortodoxa Grega G.O.C. no Brasil."
        crumbs={[{ href: "/igreja", label: "Igreja" }]}
      />
      <section className="site-section mx-auto max-w-6xl px-4">
        <HubGrid
          items={[
            { href: "/igreja/arcebispos", title: "Arcebispos", text: "O primaz do Santo Sínodo e o Arcebispo Metropolita da América do Sul." },
            { href: "/mosteiro", title: "Mosteiros", text: "O Mosteiro de São Basílio, casa de oração em Nova Iguaçu." },
            { href: "/paroquias", title: "Paróquias", text: "Encontre uma comunidade por estado, cidade ou sacerdote." },
            { href: "/pastorais", title: "Pastorais", text: "Acolhida, família, enfermos e formação." },
            { href: "/ordem-de-sao-jose", title: "Ordem de São José", text: "Serviço laical inspirado em São José." },
          ]}
        />
      </section>
    </>
  );
}

export function OrtodoxiaHub() {
  return (
    <>
      <PageHero
        kicker="Ortodoxia"
        title="Conheça a fé ortodoxa"
        intro="O que é a Igreja Ortodoxa, a Divina Liturgia, os ícones, os Santos Mistérios, os santos, o jejum e a oração."
        crumbs={[{ href: "/ortodoxia", label: "Ortodoxia" }]}
      />
      <section className="site-section mx-auto max-w-6xl px-4">
        <HubGrid
          items={[
            { href: "/ortodoxia/o-que-e-a-ortodoxia", title: "O que é a Ortodoxia?", text: "Guia essencial da fé apostólica em português." },
            { href: "/liturgia", title: "Liturgia", text: "O coração da vida ortodoxa." },
            { href: "/ortodoxia/icones", title: "Ícones", text: "Teologia visível da Encarnação." },
            { href: "/ortodoxia/sacramentos", title: "Sacramentos / Mistérios", text: "Batismo, Crisma, Eucaristia e os demais Mistérios." },
            { href: "/ortodoxia/santos", title: "Santos", text: "A nuvem de testemunhas e a Theotokos." },
            { href: "/ortodoxia/jejum", title: "Jejum", text: "A ascese da Igreja ao longo do ano." },
            { href: "/ortodoxia/oracao", title: "Oração", text: "A Oração de Jesus e a vida de oração." },
            { href: "/ortodoxia/catolica-e-ortodoxa", title: "Católica e Ortodoxa", text: "Diferenças e o que há em comum, com respeito." },
          ]}
        />
      </section>
    </>
  );
}
