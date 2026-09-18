import { HubGrid, PageHero } from "../components/Article";

export function IgrejaHub() {
  return (
    <>
      <PageHero
        kicker="A Igreja"
        title="Igreja Ortodoxa Grega no Brasil"
        intro="Quem somos, nossa história, nossa fé, a hierarquia e a sucessão apostólica — a vida institucional da Igreja Ortodoxa Grega G.O.C. no Brasil."
        crumbs={[{ href: "/igreja", label: "A Igreja" }]}
      />
      <section className="mx-auto max-w-6xl px-4 py-12">
        <HubGrid
          items={[
            { href: "/igreja/quem-somos", title: "Quem Somos", text: "A Igreja Ortodoxa Grega G.O.C. no Brasil e o Santo Sínodo de Eugenio de Atenas." },
            { href: "/igreja/nossa-historia", title: "Nossa História", text: "Da Igreja apostólica à presença ortodoxa no Brasil." },
            { href: "/igreja/nossa-fe", title: "Nossa Fé", text: "Tradição Apostólica, Credo e vida litúrgica." },
            { href: "/igreja/hierarquia", title: "Hierarquia", text: "Bispos, sacerdotes e a vida de serviço da Igreja." },
            { href: "/igreja/sucessao-apostolica", title: "Sucessão Apostólica", text: "A continuidade da fé, da liturgia e do episcopado." },
            { href: "/santo-sinodo", title: "Santo Sínodo", text: "Autoridade sinodal e referência canônica apresentada neste portal." },
            { href: "/mosteiro", title: "Mosteiro de São Basílio", text: "Casa de oração em Nova Iguaçu." },
            { href: "/missoes", title: "Missões", text: "Anunciar Cristo e formar comunidades." },
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
      <section className="mx-auto max-w-6xl px-4 py-12">
        <HubGrid
          items={[
            { href: "/ortodoxia/o-que-e-a-ortodoxia", title: "O que é a Ortodoxia?", text: "Guia essencial da fé apostólica em português." },
            { href: "/ortodoxia/divina-liturgia", title: "Divina Liturgia", text: "O coração da vida ortodoxa." },
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
