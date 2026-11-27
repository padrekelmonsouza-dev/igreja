import { Link } from "react-router-dom";
import { COMMUNITIES } from "../data/communities";
import { FOOTER_INSTITUTIONAL, FOOTER_LEARN, FOOTER_LEGAL, SUPPORT_LINK } from "../data/navigation";
import { SITE, SITE_CONTACT } from "../data/site";

export function Footer() {
  return (
    <footer className="w-full bg-white">
      <div className="w-full bg-white">
        <div className="mx-auto grid max-w-[1280px] gap-10 px-4 py-14 sm:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <img
              src="/media/brasao-goc.webp"
              alt="Brasão da Igreja Ortodoxa Grega G.O.C. no Brasil"
              width={112}
              height={112}
              className="mb-4 h-24 w-24 object-contain"
              loading="lazy"
              decoding="async"
            />
            <h2 className="font-serif text-2xl leading-tight">{SITE.name}</h2>
            <p className="mt-3 max-w-md text-stone">
              Portal institucional de fé, liturgia, história e comunidades da Igreja Ortodoxa Grega no Brasil.
            </p>
            <p className="mt-4 text-sm text-burgundy">{SITE.synod}</p>
            <p className="mt-3 text-sm text-stone">Mosteiro de São Basílio — {SITE_CONTACT.monasteryAddress}</p>
          </div>
          <div>
            <h3 className="font-serif text-2xl !font-bold text-burgundy">Igreja</h3>
            <ul className="mt-4 space-y-2">
              {FOOTER_INSTITUTIONAL.map((link) => (
                <li key={link.href}>
                  <Link className="hover:text-burgundy" to={link.href}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-serif text-2xl !font-bold text-burgundy">Conhecer</h3>
            <ul className="mt-4 space-y-2">
              {FOOTER_LEARN.map((link) => (
                <li key={link.href}>
                  <Link className="hover:text-burgundy" to={link.href}>
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-serif text-2xl !font-bold text-burgundy">Comunidades</h3>
            <ul className="mt-4 space-y-2">
              {COMMUNITIES.map((community) => (
                <li key={community.slug}>
                  <Link className="hover:text-burgundy" to={community.href}>
                    {community.city}
                  </Link>
                </li>
              ))}
              <li>
                <Link className="hover:text-burgundy" to="/contato">
                  Contato
                </Link>
              </li>
              <li>
                <Link className="hover:text-burgundy" to={SUPPORT_LINK.href}>
                  {SUPPORT_LINK.label}
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div className="w-full border-t border-burgundy/10">
        <div className="mx-auto flex max-w-[1280px] flex-col items-center justify-between gap-3 px-4 py-6 text-sm text-stone sm:flex-row">
          <p>
            © {SITE.year} {SITE.name} — {SITE.synod}
          </p>
          <ul className="flex flex-wrap justify-center gap-4">
            {FOOTER_LEGAL.map((link) => (
              <li key={link.href}>
                <Link className="hover:text-burgundy" to={link.href}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
