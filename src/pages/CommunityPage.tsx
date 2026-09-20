import { Link, Navigate, useParams } from "react-router-dom";
import { PageHero } from "../components/Article";
import { OfficialNotice } from "../components/ShareBar";
import { getCommunity, mapsEmbedUrl, mapsSearchUrl, whatsappUrl } from "../data/communities";
import { trackEvent } from "../lib/analytics";

export function CommunityPage() {
  const { slug } = useParams();
  const community = slug ? getCommunity(slug) : undefined;

  if (!community) {
    return <Navigate to="/comunidades" replace />;
  }

  return (
    <>
      <PageHero
        kicker={`${community.city} · ${community.state}`}
        title={community.name}
        intro={community.summary}
        crumbs={[
          { href: "/comunidades", label: "Comunidades" },
          { href: community.href, label: community.city },
        ]}
      />
      <section className="site-section mx-auto grid max-w-6xl gap-8 px-4 lg:grid-cols-[1fr_1fr]">
        <div className="space-y-5">
          {community.patron ? <p><strong>Padroeiro:</strong> {community.patron}</p> : null}
          {community.clergy ? (
            <p>
              <strong>Sacerdote:</strong>{" "}
              {community.clergyHref ? <Link className="underline underline-offset-4" to={community.clergyHref}>{community.clergy}</Link> : community.clergy}
            </p>
          ) : null}
          {community.address ? (
            <p>
              <strong>Endereço:</strong> {community.address}
              {community.cep && !community.address.includes(community.cep) ? ` · CEP ${community.cep}` : ""}
            </p>
          ) : null}
          {community.phone ? (
            <p>
              <strong>Telefone:</strong>{" "}
              <a className="underline underline-offset-4" href={`tel:${community.phone.replace(/\D/g, "")}`} onClick={() => trackEvent("click_phone", { community: community.slug })}>
                {community.phone}
              </a>
            </p>
          ) : null}
          {community.scheduleNote ? <p className="text-stone">{community.scheduleNote}</p> : null}
          {community.pendingOfficial ? (
            <OfficialNotice>
              Informações oficiais ainda necessárias: {community.pendingOfficial.join(", ")}.
            </OfficialNotice>
          ) : null}
          <div className="flex flex-wrap gap-3 pt-2">
            {community.mapsQuery ? (
              <a
                className="btn btn-burgundy"
                href={mapsSearchUrl(community.mapsQuery)}
                target="_blank"
                rel="noreferrer"
                onClick={() => trackEvent("click_maps", { community: community.slug })}
              >
                Como chegar
              </a>
            ) : null}
            {community.whatsapp ? (
              <a
                className="btn btn-outline-dark"
                href={whatsappUrl(community.whatsapp, `Olá, gostaria de informações sobre ${community.name}.`)}
                target="_blank"
                rel="noreferrer"
                onClick={() => trackEvent("click_whatsapp", { community: community.slug })}
              >
                WhatsApp
              </a>
            ) : null}
            <Link className="btn btn-outline-dark" to="/primeira-visita">
              Primeira visita
            </Link>
          </div>
        </div>
        <div className="min-h-[320px] overflow-hidden rounded-3xl border border-burgundy/10 bg-ivory">
          {community.mapsQuery ? (
            <iframe
              title={`Mapa de ${community.name}`}
              src={mapsEmbedUrl(community.mapsQuery)}
              className="h-full min-h-[320px] w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          ) : (
            <div className="grid h-full min-h-[320px] place-items-center p-6 text-center text-stone">
              O mapa será exibido quando o endereço oficial for publicado.
            </div>
          )}
        </div>
      </section>
    </>
  );
}
