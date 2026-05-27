import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import TacticalPattern from '@/components/TacticalPattern';
import Reveal from '@/components/Reveal';
import Icon, { type IconName } from '@/components/Icon';

const TIMELINE: { year: string; icon: IconName; title: string; desc: string }[] = [
  { year: '1945', icon: 'flag', title: 'Naissance du club', desc: 'Un club au service du sport pour tous.' },
  { year: '', icon: 'users', title: 'Club omnisports', desc: 'Plusieurs disciplines, une même passion : rassembler.' },
  { year: '', icon: 'ball', title: 'Section football', desc: "Le football s'impose comme un moteur d'engagement et de réussite." },
  { year: '', icon: 'trophy', title: "Aujourd'hui", desc: "Un club structuré, tourné vers l'avenir, ancré dans son territoire." },
];

const VALUES: { icon: IconName; title: string; desc: string }[] = [
  { icon: 'handshake', title: 'Respect', desc: "Respecter l'autre, le jeu, les règles et nos couleurs." },
  { icon: 'graduation', title: 'Formation', desc: 'Accompagner chaque joueur dans son apprentissage sportif et citoyen.' },
  { icon: 'users', title: 'Esprit collectif', desc: 'Avancer ensemble, se soutenir, se dépasser pour le maillot et pour le club.' },
];

export const metadata: Metadata = {
  title: 'Le Club',
  description:
    "Découvrez l'histoire, les valeurs et le projet formateur du Saint-Denis U.S. Football Club depuis 1993.",
};

export default function ClubPage() {
  return (
    <section className="relative isolate overflow-hidden bg-white pt-28 lg:pt-24" aria-labelledby="club-title">
      {/* ===== Background tigre mascotte ===== */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[url('/assets/logo.png')] bg-[length:48rem_auto] bg-[position:14%_22%] bg-no-repeat opacity-[0.045] dark:opacity-[0.08]"
      />

      <div className="relative z-10 mx-auto grid max-w-[1500px] gap-12 px-5 pb-20 sm:px-8 lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 lg:px-10 min-[1400px]:px-16">
        {/* ============ LEFT — Hero + Timeline + Values ============ */}
        <div className="pt-10 lg:pt-16">
          <p className="eyebrow text-flame mb-4 animate-rise">Le Club · À propos</p>
          <h1 id="club-title" className="hero-title text-royal animate-rise lg:text-[5.6rem]" style={{ animationDelay: '120ms' }}>
            Qui sommes-
            <span className="text-flame">nous ?</span>
          </h1>
          <div className="mt-4 h-1.5 w-16 rounded-full bg-flame" />
          <p className="mt-6 max-w-xl text-base leading-relaxed text-deep/82 sm:text-lg">
            Le Saint-Denis U.S. Football Club, c&apos;est plus qu&apos;un club : c&apos;est une famille.{' '}
            <strong className="font-extrabold text-royal">Formateur, populaire et ambitieux</strong>, nous faisons
            grandir les talents et les valeurs, au cœur de Saint-Denis{' '}
            <strong className="font-extrabold text-flame">depuis 1993</strong>.
          </p>

          {/* ===== Timeline horizontale ===== */}
          <div className="relative mt-14">
            <div
              aria-hidden="true"
              className="absolute left-6 right-6 top-8 hidden h-0.5 md:block"
              style={{
                backgroundImage:
                  'repeating-linear-gradient(90deg, var(--color-flame) 0, var(--color-flame) 6px, transparent 6px, transparent 14px)',
              }}
            />
            <div className="grid grid-cols-1 gap-8 md:grid-cols-4 md:gap-4">
              {TIMELINE.map((item, i) => (
                <Reveal key={item.title} delay={i * 0.08}>
                  <div className="relative flex flex-col items-center text-center">
                    <span className="relative z-10 grid h-16 w-16 place-items-center rounded-full bg-royal text-white shadow-[0_18px_40px_-22px_rgba(13,27,75,0.85)] ring-[6px] ring-white">
                      <Icon name={item.icon} size={26} />
                    </span>
                    <p className="display-sm mt-5 text-2xl italic text-royal">
                      {item.year || item.title.toUpperCase()}
                    </p>
                    {item.year && (
                      <p className="mt-1 text-sm font-bold uppercase tracking-wide text-deep">{item.title}</p>
                    )}
                    <p className="mt-2 max-w-[14rem] text-sm leading-relaxed text-deep/72">{item.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>

          {/* ===== 3 cartes valeurs ===== */}
          <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-3">
            {VALUES.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.08}>
                <article className="group relative h-full overflow-hidden rounded-[1.15rem] border border-cloud bg-white p-6 shadow-[0_22px_56px_-34px_rgba(13,27,75,0.55)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_30px_70px_-30px_rgba(13,27,75,0.7)]">
                  <span className="mb-5 grid h-12 w-12 place-items-center rounded-full bg-royal text-white shadow-[0_14px_28px_-18px_rgba(13,27,75,0.8)] transition-colors duration-300 group-hover:bg-flame">
                    <Icon name={v.icon} size={22} />
                  </span>
                  <h3 className="display-sm text-[1.2rem] italic text-royal">{v.title}</h3>
                  <div className="mt-2 mb-3 h-0.5 w-9 rounded-full bg-flame" />
                  <p className="text-[0.82rem] leading-relaxed text-deep/72">{v.desc}</p>
                  <Icon
                    name="arrow-right"
                    size={22}
                    strokeWidth={2}
                    className="absolute bottom-5 right-5 text-flame transition-transform duration-300 group-hover:translate-x-1"
                  />
                </article>
              </Reveal>
            ))}
          </div>
        </div>

        {/* ============ RIGHT — Image hero en arc + citation finale ============ */}
        <div className="relative flex flex-col gap-8 lg:pt-10">
          <Reveal>
            <div className="relative aspect-[4/5] w-full overflow-hidden shadow-[0_40px_100px_-40px_rgba(13,27,75,0.6)]"
              style={{ clipPath: 'ellipse(75% 96% at 70% 50%)' }}
            >
              <Image
                src="/assets/club_hero.webp"
                alt="Stade de France et joueurs du SDUS FC 93 de dos."
                fill
                priority
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(13,27,75,0)_55%,rgba(13,27,75,0.4)_100%)]" />
              <TacticalPattern tone="onDark" className="opacity-50" />
            </div>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="rounded-[1.4rem] border border-cloud bg-white/96 p-8 text-right shadow-[0_24px_60px_-40px_rgba(13,27,75,0.5)] backdrop-blur lg:pr-12">
              <p className="section-title text-royal">
                Bleu et orange dans le <span className="text-flame">cœur</span>,
                <br />
                Saint-Denis comme <span className="text-flame">terrain</span>.
              </p>
              <div className="mt-6 flex justify-end">
                <Link href="/equipes" className="btn-primary group">
                  Découvrir nos équipes
                  <Icon
                    name="arrow-right"
                    size={17}
                    strokeWidth={2.4}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
