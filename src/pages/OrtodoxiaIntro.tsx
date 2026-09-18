import { Link } from "react-router-dom";
import { ArticleBody, PageHero } from "../components/Article";
import { Related } from "../components/Related";
import { getArticle } from "../data/content";
import { FAQ_ITEMS, type FaqItem } from "../data/faq";

const INTRO_QUESTIONS = [
  "O que é a Igreja Ortodoxa?",
  "A Igreja Ortodoxa é cristã?",
  "Qual é a origem da Igreja Ortodoxa?",
  "O que significa ser ortodoxo?",
  "O que é a Divina Liturgia?",
  "O que são ícones ortodoxos?",
  "Como me batizar na Igreja Ortodoxa?",
  "Como funciona o casamento ortodoxo?",
  "Quem pode visitar uma igreja ortodoxa?",
  "Posso participar da liturgia sem ser ortodoxo?",
];

export function OrtodoxiaIntro() {
  const page = getArticle("/ortodoxia/o-que-e-a-ortodoxia");
  if (!page) return null;
  const faq = INTRO_QUESTIONS.map((question) => FAQ_ITEMS.find((item) => item.question === question)).filter(
    (item): item is FaqItem => Boolean(item),
  );

  return (
    <>
      <PageHero
        kicker={page.kicker}
        title={page.title}
        intro={page.intro}
        crumbs={[
          { href: "/ortodoxia", label: "Ortodoxia" },
          { href: page.path, label: page.title },
        ]}
      />
      <ArticleBody page={page} />
      <section className="mx-auto max-w-4xl px-4 pb-8">
        <h2 className="font-serif text-3xl">Perguntas frequentes</h2>
        <div className="mt-6 space-y-4">
          {faq.map((item) =>
            item ? (
              <article key={item.question} className="rounded-2xl border border-burgundy/10 bg-white p-5">
                <h3 className="font-serif text-xl">{item.question}</h3>
                <p className="mt-2 leading-7 text-[#3a342d]">{item.answer}</p>
                {item.href ? (
                  <Link className="mt-3 inline-block text-burgundy underline underline-offset-4" to={item.href}>
                    Ler mais
                  </Link>
                ) : null}
              </article>
            ) : null,
          )}
        </div>
      </section>
      <Related paths={page.related} />
    </>
  );
}
