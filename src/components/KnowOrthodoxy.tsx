import { Link } from "react-router-dom";
import { COMMUNITIES } from "../data/communities";
import { BibleCard } from "./BibleCard";

const TOPICS = [
  { href: "/ortodoxia/o-que-e-a-ortodoxia", title: "O que é a Ortodoxia?" },
  { href: "/ortodoxia/divina-liturgia", title: "Divina Liturgia" },
  { href: "/ortodoxia/icones", title: "Ícones" },
  { href: "/ortodoxia/santos", title: "Santos" },
];

export function KnowOrthodoxy() {
  return (
    <section id="conheca-a-ortodoxia" className="site-section mx-auto w-full max-w-[1280px] px-4">
      <div className="grid items-stretch gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(20rem,24rem)]">
        <div className="flex h-full min-h-0 flex-col rounded-[2rem] bg-white p-6 text-[#6E121C] shadow-card sm:p-8">
          <p className="text-[11px] font-bold uppercase tracking-[0.28em] text-[#6E121C]">Conheça a Ortodoxia</p>
          <h2 className="mt-3 font-serif text-4xl text-[#6E121C]">Fé, liturgia e Tradição Apostólica.</h2>
          <div className="mt-6 grid gap-3 sm:grid-cols-2">
            {TOPICS.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className="rounded-2xl bg-ivory p-5 text-[#6E121C] ring-1 ring-burgundy/10 hover:bg-parchment"
              >
                <h3 className="font-serif text-2xl text-[#6E121C]">{item.title}</h3>
              </Link>
            ))}
          </div>
          <p className="mt-8 text-[11px] font-bold uppercase tracking-[0.28em] text-[#6E121C]">Próximas celebrações</p>
          <h3 className="mt-3 font-serif text-3xl leading-tight text-[#6E121C]">A vida da Igreja se mede pela liturgia.</h3>
          <p className="mt-3 text-[#6E121C]">
            Horários e datas específicas devem ser confirmados com cada comunidade. O Mosteiro de São Basílio pede
            contato prévio: {COMMUNITIES[0].phone}.
          </p>
          <div className="mt-5 rounded-2xl bg-ivory p-5 ring-1 ring-burgundy/10">
            <p className="text-sm uppercase tracking-[0.2em] text-[#6E121C]">Próxima celebração</p>
            <p className="mt-2 font-serif text-2xl text-[#6E121C]">Confirme com a comunidade local</p>
            <p className="mt-2 text-[#6E121C]">
              A agenda oficial de ofícios será publicada quando a Secretaria da Igreja disponibilizar os horários.
            </p>
          </div>
          <div className="mt-auto flex flex-col gap-3 pt-6 sm:flex-row">
            <Link className="btn btn-burgundy" to="/calendario">
              Ver calendário litúrgico
            </Link>
            <Link className="btn btn-outline-dark" to="/comunidades">
              Encontrar uma Igreja
            </Link>
          </div>
        </div>
        <div className="h-full lg:justify-self-end lg:w-full">
          <BibleCard />
        </div>
      </div>
    </section>
  );
}
