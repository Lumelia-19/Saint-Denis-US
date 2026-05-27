import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import Icon from '@/components/Icon';
import Reveal from '@/components/Reveal';

const ARTICLES = [
  {
    title: 'Victoire au bout du suspense',
    excerpt: "Les U16 s'imposent 2-1 dans les dernières minutes après un match intense et plein d'émotions.",
    image: '/assets/bg-article.png',
    date: '2024-04-28',
  },
  {
    title: 'Retour sur le week-end de nos éducateurs',
    excerpt: "Échanges, formations et partages d'expériences : focus sur un week-end riche en apprentissages.",
    image: '/assets/club_hero.webp',
    date: '2024-04-24',
  },
  {
    title: 'Stage de printemps : une réussite collective',
    excerpt: '3 jours de progression, de fun et de cohésion pour nos jeunes joueurs. Merci à tous les encadrants !',
    image: '/assets/inscriptions-bg.webp',
    date: '2024-04-20',
  },
];

const SOCIAL_IMAGES = [
  '/assets/bg-article.png',
  '/assets/inscriptions-bg.webp',
  '/assets/player_u10_u13.webp',
  '/assets/player_u6_u9.webp',
];

export const metadata: Metadata = {
  title: 'Actualités',
  description:
    "Toute l'actualité du Saint-Denis U.S. Football Club : matchs, stages, événements, bénévoles et vie du club.",
};

function formatDate(date: string) {
  return new Date(date)
    .toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' })
    .toUpperCase();
}

export default function ActualitesPage() {
  return (
    <section className="relative isolate overflow-hidden bg-white pt-28 lg:pt-24" aria-labelledby="actualites-title">
      {/* Mascotte tigre en fond */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[url('/assets/logo.png')] bg-[length:46rem_auto] bg-[position:18%_18%] bg-no-repeat opacity-[0.04] dark:opacity-[0.07]"
      />

      <div className="relative z-10 mx-auto grid max-w-[1500px] gap-10 px-5 pb-16 sm:px-8 lg:grid-cols-[1.18fr_0.82fr] lg:gap-12 lg:px-10 min-[1400px]:px-16">
        {/* ============ COLONNE GAUCHE ============ */}
        <div className="pt-8 lg:pt-12">
          <Reveal>
            <p className="eyebrow text-flame mb-4">Vie du club</p>
            <h1 id="actualites-title" className="hero-title text-royal lg:text-[5.6rem]">
              Actualités
              <br />
              <span className="text-flame">&amp; vie du club</span>
            </h1>
            <div className="mt-4 h-1.5 w-16 rounded-full bg-flame" />
            <p className="mt-6 max-w-xl text-base leading-relaxed text-deep/82 sm:text-lg">
              Retrouvez toute l&apos;actualité du Saint-Denis U.S. Football Club : résumés de matchs, stages,
              actions des bénévoles, moments forts avec les familles, événements et initiatives qui font vivre
              notre club au quotidien.
            </p>
          </Reveal>

          {/* ===== 3 articles ===== */}
          <div className="mt-10 grid gap-5 sm:grid-cols-3">
            {ARTICLES.map((article, i) => (
              <Reveal key={article.title} delay={i * 0.08}>
                <article className="group flex h-full flex-col overflow-hidden rounded-[1.15rem] border border-cloud bg-white shadow-[0_22px_60px_-34px_rgba(13,27,75,0.55)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_30px_70px_-30px_rgba(13,27,75,0.7)]">
                  <div className="relative h-32 overflow-hidden bg-royal">
                    <Image
                      src={article.image}
                      alt={`Photo liée à l'article : ${article.title}`}
                      fill
                      sizes="(min-width: 1024px) 22vw, (min-width: 640px) 30vw, 100vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(13,27,75,0)_30%,rgba(13,27,75,0.4)_100%)]" />
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <p className="flex items-center gap-2 text-[0.7rem] font-extrabold uppercase tracking-wide text-royal">
                      <Icon name="calendar" size={14} className="text-flame" />
                      {formatDate(article.date)}
                    </p>
                    <h2 className="display-sm mt-3 text-[1.05rem] italic leading-tight text-royal group-hover:text-flame transition-colors">
                      {article.title}
                    </h2>
                    <p className="mt-2 flex-1 text-[0.78rem] leading-relaxed text-deep/72">{article.excerpt}</p>
                    <Link href="/contact" aria-label={`Lire l'article : ${article.title}`} className="mt-4 flex justify-end text-flame">
                      <Icon name="arrow-right" size={22} strokeWidth={2.4} className="transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>

          {/* ===== CTA bas ===== */}
          <Reveal delay={0.18}>
            <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
              <Link href="/contact" className="btn-primary group">
                Voir toutes les actualités
                <Icon name="arrow-right" size={18} strokeWidth={2.4} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <p className="text-sm font-semibold text-deep/72">
                Rejoignez-nous et vivez l&apos;actualité du club au plus près.
              </p>
            </div>
          </Reveal>
        </div>

        {/* ============ COLONNE DROITE ============ */}
        <aside className="flex flex-col gap-6 lg:pt-8">
          {/* Image héros en arc */}
          <Reveal>
            <div
              className="relative aspect-[4/3] w-full overflow-hidden shadow-[0_40px_100px_-40px_rgba(13,27,75,0.6)]"
              style={{ clipPath: 'ellipse(85% 95% at 55% 50%)' }}
            >
              <Image
                src="/assets/bg-article.png"
                alt="Joueur du SDUS FC 93 célébrant un moment de match."
                fill
                priority
                sizes="(min-width: 1024px) 40vw, 100vw"
                className="object-cover object-[62%_28%]"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(13,27,75,0)_60%,rgba(13,27,75,0.45)_100%)]" />
            </div>
          </Reveal>

          {/* Panel Instagram */}
          <Reveal delay={0.1}>
            <section className="rounded-[1.15rem] border border-cloud bg-white p-5 shadow-[0_22px_60px_-34px_rgba(13,27,75,0.6)]">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <Icon name="instagram" size={28} className="text-flame" />
                  <p className="font-extrabold text-royal">@sdus_football</p>
                </div>
                <a
                  href="https://www.instagram.com/sdus_football/"
                  target="_blank"
                  rel="noreferrer"
                  className="btn-primary group px-5 py-2.5 text-sm"
                >
                  S&apos;abonner
                  <Icon name="arrow-right" size={16} strokeWidth={2.4} />
                </a>
              </div>
              <div className="mt-4 grid grid-cols-4 gap-2">
                {SOCIAL_IMAGES.map((src, i) => (
                  <a
                    key={src}
                    href="https://www.instagram.com/sdus_football/"
                    target="_blank"
                    rel="noreferrer"
                    className="relative aspect-square overflow-hidden rounded-lg bg-royal"
                  >
                    <Image
                      src={src}
                      alt={`Aperçu Instagram SDUS FC ${i + 1}`}
                      fill
                      sizes="120px"
                      className="object-cover"
                    />
                  </a>
                ))}
              </div>
            </section>
          </Reveal>

          {/* Citation */}
          <Reveal delay={0.18}>
            <figure className="relative overflow-hidden rounded-[1.15rem] border border-cloud bg-white p-6 shadow-[0_22px_60px_-34px_rgba(13,27,75,0.6)]">
              <Icon name="quote" size={42} className="text-flame" />
              <blockquote className="display-sm relative z-10 mt-3 text-[1.4rem] italic leading-[1.05] text-royal">
                Ce club, c&apos;est plus qu&apos;un maillot. C&apos;est une famille, des valeurs, et une passion partagée.
              </blockquote>
              <figcaption className="relative z-10 mt-5 text-sm font-bold text-flame">— Samir, parent bénévole</figcaption>
              <div className="pointer-events-none absolute -bottom-10 -right-8 text-royal/[0.07]">
                <Icon name="shield" size={180} strokeWidth={1.2} />
              </div>
            </figure>
          </Reveal>
        </aside>
      </div>
    </section>
  );
}
