import Image from 'next/image';
import Link from 'next/link';
import type { Metadata } from 'next';
import TacticalPattern from '@/components/TacticalPattern';
import SectionTitle from '@/components/ui/SectionTitle';
import Reveal from '@/components/Reveal';
import Icon, { type IconName } from '@/components/Icon';

const TIMELINE: { year: string; icon: IconName; title: string; desc: string }[] = [
  { year: '1945', icon: 'flag', title: 'Naissance du club', desc: 'Un club au service du sport pour tous.' },
  { year: '1970s', icon: 'ball', title: 'Club omnisports', desc: 'Plusieurs disciplines, une même passion : rassembler.' },
  { year: '1993', icon: 'target', title: 'Section football', desc: "Le football s'impose comme moteur d'engagement." },
  { year: "Aujourd'hui", icon: 'trophy', title: 'Un club structuré', desc: "Formateur et ambitieux, tourné vers l'avenir." },
];

const VALUES: { icon: IconName; title: string; desc: string }[] = [
  { icon: 'heart', title: 'Respect', desc: "Respecter l'autre, le jeu, les règles et nos couleurs." },
  { icon: 'graduation', title: 'Formation', desc: 'Accompagner chaque joueur dans son apprentissage sportif et citoyen.' },
  { icon: 'users', title: 'Esprit collectif', desc: 'Avancer ensemble, se soutenir, se dépasser pour le maillot et le club.' },
];

export const metadata: Metadata = {
  title: 'Le Club | Saint-Denis U.S. Football Club',
  description:
    "Découvrez l'histoire, les valeurs et le projet formateur du Saint-Denis U.S. Football Club depuis 1993.",
};

export default function ClubPage() {
  return (
    <>
      {/* ===================== HERO ===================== */}
      <section className="relative h-[78vh] min-h-[520px] flex items-end overflow-hidden">
        <Image
          src="/assets/club_hero.webp"
          alt="Joueurs du Saint-Denis U.S. Football Club réunis sur le terrain."
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-deep via-deep/65 to-deep/25" />
        <div className="absolute inset-0 bg-grid opacity-50" />
        <TacticalPattern />
        <div className="relative z-10 max-w-7xl mx-auto px-6 pb-16 w-full">
          <p className="eyebrow text-flame mb-4 animate-rise">Le Club · À propos</p>
          <h1 className="hero-title text-white animate-rise" style={{ animationDelay: '120ms' }}>
            Qui sommes-
            <span className="text-gradient">nous ?</span>
          </h1>
        </div>
      </section>

      {/* ===================== INTRO + TIMELINE ===================== */}
      <section className="py-24 bg-surface">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-20">
            <Reveal>
              <SectionTitle eyebrow="Notre histoire" blue="Une famille" orange="depuis 1993" />
            </Reveal>
            <Reveal delay={0.1}>
              <p className="text-slate-soft text-lg leading-relaxed">
                Le Saint-Denis U.S. Football Club, c&apos;est plus qu&apos;un club : c&apos;est une famille.{' '}
                <strong className="text-navy font-semibold">Formateur, populaire et ambitieux</strong>, nous
                faisons grandir les talents et les valeurs, au cœur de Saint-Denis depuis plus de trente ans.
              </p>
            </Reveal>
          </div>

          {/* Timeline */}
          <div className="relative">
            <div className="absolute top-9 left-0 right-0 h-0.5 bg-gradient-to-r from-cloud via-flame/40 to-cloud hidden md:block" />
            <div className="grid grid-cols-1 md:grid-cols-4 gap-10 md:gap-6">
              {TIMELINE.map((item, i) => (
                <Reveal key={item.year} delay={i * 0.1}>
                  <div className="relative flex flex-col items-center text-center">
                    <span className="grid place-items-center w-[72px] h-[72px] rounded-2xl bg-surface border-2 border-flame text-flame shadow-[var(--shadow-soft)] mb-5 relative z-10">
                      <Icon name={item.icon} size={30} />
                    </span>
                    <span className="display-sm text-2xl text-flame">{item.year}</span>
                    <p className="font-bold text-navy mt-1 mb-1.5">{item.title}</p>
                    <p className="text-slate-soft text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===================== VALUES ===================== */}
      <section className="py-24 bg-mist">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal>
            <SectionTitle
              eyebrow="Nos valeurs"
              blue="Ce qui nous"
              orange="définit"
              center
              subtitle="Sur le terrain comme en dehors, trois valeurs guident chacune de nos actions."
            />
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {VALUES.map((v, i) => (
              <Reveal key={v.title} delay={i * 0.1}>
                <div className="card card-hover group p-8 h-full">
                  <span className="grid place-items-center w-16 h-16 rounded-2xl bg-royal text-white mb-6 transition-transform duration-300 group-hover:scale-105">
                    <Icon name={v.icon} size={28} />
                  </span>
                  <h3 className="display-sm text-2xl text-navy mb-3">{v.title}</h3>
                  <p className="text-slate-soft text-sm leading-relaxed">{v.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== QUOTE ===================== */}
      <section className="py-24 bg-surface">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal>
            <div className="relative overflow-hidden rounded-[2.4rem] bg-mesh px-8 py-20 sm:px-16 text-center">
              <TacticalPattern />
              <div className="relative z-10 max-w-3xl mx-auto">
                <Icon name="quote" size={48} className="text-flame mx-auto mb-6" />
                <p className="section-title text-white">
                  Bleu et orange dans le <span className="text-gradient">cœur</span>, Saint-Denis comme{' '}
                  <span className="text-gradient">terrain</span>.
                </p>
                <Link href="/equipes" className="btn-primary group mt-9">
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
      </section>
    </>
  );
}
