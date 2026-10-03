import { Link } from "react-router-dom";
import { COMMUNITIES } from "../data/communities";

export function CommunitiesSection() {
  return (
  <section className="site-section mx-auto w-full max-w-site px-4">
    <p className="kicker">Comunidades</p>
    <h2 className="mt-3 font-serif text-4xl">Onde a Igreja reza no Brasil.</h2>
    <div className="mt-8 grid gap-4 md:grid-cols-3">
      {COMMUNITIES.map((community) => (
        <Link key={community.slug} to={community.href} className="rounded-3xl border border-burgundy/10 bg-white p-6 hover:shadow-card">
          <p className="text-sm font-bold uppercase tracking-[0.16em] text-burgundy">
            {community.city} · {community.state}
          </p>
          <h3 className="mt-3 font-serif text-2xl">{community.name}</h3>
          <p className="mt-2 text-stone">{community.summary}</p>
          {community.address ? <p className="mt-3 text-stone">{community.address}</p> : null}
          {community.scheduleNote ? <p className="mt-2 text-stone">{community.scheduleNote}</p> : null}
          {community.slug === "sao-paulo" && community.clergy ? (
            <p className="mt-2 text-stone">Celebrante: Padre Kelmon</p>
          ) : null}
        </Link>
      ))}
    </div>
    <Link className="btn btn-burgundy mt-8" to="/comunidades">
      Encontre uma Igreja
    </Link>
  </section>
  );
}
