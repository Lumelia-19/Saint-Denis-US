import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import Icon from '@/components/Icon';

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
  title: 'Actualités | Saint-Denis U.S. Football Club',
  description:
    'Toute l’actualité du Saint-Denis U.S. Football Club : matchs, stages, événements, bénévoles et vie du club.',
};

function formatDate(date: string) {
  return new Date(date).toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
}

function NewsDecor() {
  return (
    <>
      <svg
        className="pointer-events-none absolute right-5 top-28 hidden h-72 w-56 lg:block"
        viewBox="0 0 220 300"
        aria-hidden="true"
      >
        <circle cx="150" cy="32" r="16" fill="none" stroke="#f26522" strokeWidth="7" />
        <circle cx="158" cy="108" r="15" fill="none" stroke="#fff" strokeWidth="7" />
        <circle cx="144" cy="214" r="10" fill="none" stroke="#fff" strokeWidth="5" />
        <path d="M178 48c42 36 40 78 8 116" fill="none" stroke="#f26522" strokeWidth="5" strokeLinecap="round" />
        <path d="M158 166c-22 24-19 47 5 68" fill="none" stroke="#fff" strokeWidth="3.5" strokeDasharray="12 12" strokeLinecap="round" />
        <path d="M70 68l23 23M93 68 70 91M62 170l24 24M86 170l-24 24M154 176l24 24M178 176l-24 24" stroke="#fff" strokeWidth="6" strokeLinecap="round" />
        <path d="m182 54-25-4M157 50l15 21M152 164l19-20M171 144l4 26" fill="none" stroke="#fff" strokeWidth="4" strokeLinecap="round" />
      </svg>
      <svg
        className="pointer-events-none absolute bottom-4 left-0 hidden h-48 w-72 text-flame sm:block"
        viewBox="0 0 360 240"
        aria-hidden="true"
      >
        <path d="M12 186c72-52 170-58 294-16" fill="none" stroke="#f26522" strokeWidth="5" strokeLinecap="round" />
        <path d="M30 206c84-30 162-30 252 2" fill="none" stroke="#1b3a8c" strokeWidth="3" strokeLinecap="round" />
        <path d="M6 70l22 22M28 70 6 92M62 178l22 22M84 178l-22 22M142 194l20 20M162 194l-20 20" stroke="#0d1b4b" strokeWidth="5" strokeLinecap="round" />
        <circle cx="52" cy="124" r="15" fill="none" stroke="#0d1b4b" strokeWidth="5" />
        <circle cx="104" cy="188" r="13" fill="none" stroke="#f26522" strokeWidth="5" />
      </svg>
    </>
  );
}

export default function ActualitesPage() {
  return (
    <>
      <section className="relative isolate min-h-screen overflow-hidden bg-white pt-28 lg:pt-24" aria-labelledby="actualites-title">
        <Image
          src="/assets/bg-article.png"
          alt="Joueurs du Saint-Denis U.S. Football Club célébrant un moment de match."
          fill
          priority
          sizes="100vw"
          className="object-cover object-[62%_0%]"
        />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(255,255,255,0.96)_0%,rgba(255,255,255,0.88)_31%,rgba(255,255,255,0.16)_58%,rgba(255,255,255,0)_100%)]" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.58)_0%,rgba(255,255,255,0.04)_42%,rgba(18,54,143,0.72)_100%)]" />
        <NewsDecor />

        <div className="relative z-10 mx-auto grid min-h-[calc(100vh-6rem)] max-w-[1500px] content-center gap-6 px-5 pb-8 sm:px-8 lg:grid-cols-[1.18fr_0.82fr] lg:px-12 min-[1400px]:px-20">
          <div className="pt-8 lg:pt-16">
            <div className="max-w-[620px]">
              <h1 id="actualites-title" className="hero-title text-royal lg:text-[5.4rem]">
                Actualités
                <br />
                <span className="text-flame">&amp; vie du club</span>
              </h1>
              <div className="mt-4 h-1.5 w-14 rounded-full bg-flame" />
              <p className="mt-5 max-w-[520px] text-base font-semibold leading-relaxed text-deep sm:text-lg">
                Retrouvez toute l’actualité du Saint-Denis U.S. Football Club : résumés de matchs, stages,
                actions des bénévoles, moments forts avec les familles, événements et initiatives qui font
                vivre notre club au quotidien.
              </p>
            </div>

            <div className="mt-8 grid gap-5 md:grid-cols-3">
              {ARTICLES.map((article) => (
                <article
                  key={article.title}
                  className="group overflow-hidden rounded-[1.15rem] bg-white shadow-[0_22px_60px_-34px_rgba(13,27,75,0.65)]"
                >
                  <div className="relative h-24 overflow-hidden bg-royal min-[1500px]:h-28">
                    <Image
                      src={article.image}
                      alt={`Photo liée à l'article : ${article.title}`}
                      fill
                      sizes="(min-width: 1024px) 23vw, (min-width: 768px) 33vw, 100vw"
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(13,27,75,0)_25%,rgba(13,27,75,0.22)_100%)]" />
                  </div>
                  <div className="p-4">
                    <p className="flex items-center gap-2 text-[0.68rem] font-extrabold uppercase tracking-wide text-royal/80">
                      <Icon name="calendar" size={14} className="text-flame" />
                      {formatDate(article.date)}
                    </p>
                    <h2 className="display-sm mt-3 min-h-[2.45rem] text-[1.05rem] italic text-royal min-[1500px]:text-[1.1rem]">
                      {article.title}
                    </h2>
                    <p className="mt-2 min-h-[3.25rem] text-[0.74rem] font-medium leading-relaxed text-deep/78 min-[1500px]:text-[0.76rem]">
                      {article.excerpt}
                    </p>
                    <Link href="/contact" className="mt-3 flex justify-end text-flame">
                      <Icon name="arrow-right" size={24} strokeWidth={2.4} />
                    </Link>
                  </div>
                </article>
              ))}
            </div>

            <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center">
              <Link href="/actualites" className="btn-primary group min-w-64">
                Voir toutes les actualités
                <Icon name="arrow-right" size={18} strokeWidth={2.4} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <p className="text-sm font-semibold text-white lg:text-white/95">
                Rejoignez-nous et vivez l’actualité du club au plus près.
              </p>
            </div>
          </div>

          <aside className="grid content-end gap-5 lg:pt-72">
            <section className="rounded-[1.15rem] bg-white/96 p-5 shadow-[0_22px_60px_-34px_rgba(13,27,75,0.62)] backdrop-blur">
              <div className="flex items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <Icon name="instagram" size={28} className="text-flame" />
                  <p className="font-extrabold text-royal">@sdus_football</p>
                </div>
                <a
                  href="https://www.instagram.com/sdus_football/"
                  target="_blank"
                  rel="noreferrer"
                  className="btn-primary group px-5 py-3 text-sm"
                >
                  S’abonner
                  <Icon name="arrow-right" size={17} strokeWidth={2.4} />
                </a>
              </div>
              <div className="mt-4 grid grid-cols-4 gap-2">
                {SOCIAL_IMAGES.map((src, i) => (
                  <a
                    key={src}
                    href="https://www.instagram.com/sdus_football/"
                    target="_blank"
                    rel="noreferrer"
                    className="relative aspect-[1.08] overflow-hidden rounded-lg bg-royal"
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

            <figure className="relative overflow-hidden rounded-[1.15rem] bg-white/96 p-6 shadow-[0_22px_60px_-34px_rgba(13,27,75,0.62)] backdrop-blur">
              <Icon name="quote" size={38} className="text-flame" />
              <blockquote className="relative z-10 mt-3 display-sm text-[1.45rem] italic leading-[1.03] text-royal">
                Ce club, c’est plus qu’un maillot. C’est une famille, des valeurs, et une passion partagée.
              </blockquote>
              <figcaption className="relative z-10 mt-5 text-sm font-bold text-flame">- Samir, parent bénévole</figcaption>
              <div className="absolute -bottom-10 -right-8 text-royal/8">
                <Icon name="shield" size={180} strokeWidth={1.15} />
              </div>
            </figure>
          </aside>
        </div>
      </section>
    </>
  );
}
