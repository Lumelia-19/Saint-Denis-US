import ArticleCard from '@/components/ArticleCard';
import TacticalPattern from '@/components/TacticalPattern';
import SectionTitle from '@/components/ui/SectionTitle';
import Reveal from '@/components/Reveal';
import Icon from '@/components/Icon';
import { Article } from '@/lib/types';

const ARTICLES: Article[] = [
  {
    id: '1',
    title: 'Victoire au bout du suspense',
    excerpt: "Les U16 s'imposent 2-1 dans les dernières minutes face à un adversaire accrocheur.",
    date: '2024-04-28',
    category: 'Match',
  },
  {
    id: '2',
    title: 'Retour sur le week-end de nos éducateurs',
    excerpt: "Échanges, formations et partages d'expériences pour un staff toujours mieux préparé.",
    date: '2024-04-24',
    category: 'Formation',
  },
  {
    id: '3',
    title: 'Stage de printemps : une réussite collective',
    excerpt: '3 jours de progression, de fun et de cohésion pour nos jeunes licenciés.',
    date: '2024-04-20',
    category: 'Stage',
  },
];

export default function ActualitesPage() {
  return (
    <>
      {/* ===================== HERO ===================== */}
      <section className="relative pt-40 pb-20 bg-mesh overflow-hidden">
        <TacticalPattern />
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <p className="eyebrow text-flame mb-4 animate-rise">Le journal du club</p>
          <h1 className="hero-title text-white animate-rise" style={{ animationDelay: '120ms' }}>
            Actualités &amp;
            <br />
            <span className="text-gradient">vie du club</span>
          </h1>
        </div>
      </section>

      {/* ===================== ARTICLES ===================== */}
      <section className="py-24 bg-surface">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal>
            <SectionTitle eyebrow="À la une" blue="Derniers" orange="articles" />
          </Reveal>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            {ARTICLES.map((article, i) => (
              <Reveal key={article.id} delay={i * 0.1}>
                <ArticleCard article={article} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== INSTAGRAM ===================== */}
      <section className="py-24 bg-mist">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal>
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-5">
              <SectionTitle eyebrow="Sur les réseaux" blue="Suivez" orange="@sdus_football" />
              <a
                href="#"
                className="btn-outline group self-start sm:self-auto"
              >
                Voir Instagram
                <Icon
                  name="instagram"
                  size={16}
                  className="transition-transform duration-300 group-hover:scale-110"
                />
              </a>
            </div>
          </Reveal>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12">
            {[0, 1, 2, 3].map((i) => (
              <Reveal key={i} delay={i * 0.08}>
                <a
                  href="#"
                  className="group relative block aspect-square rounded-2xl bg-mesh overflow-hidden sheen"
                >
                  <span className="absolute inset-0 grid place-items-center">
                    <Icon
                      name="camera"
                      size={42}
                      strokeWidth={1.5}
                      className="text-white/25 transition-transform duration-500 group-hover:scale-110"
                    />
                  </span>
                  <span className="absolute bottom-3 left-3 flex items-center gap-1 text-white/55 text-xs">
                    <Icon name="heart" size={13} />
                    SDUS
                  </span>
                </a>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ===================== QUOTE / CTA ===================== */}
      <section className="py-24 bg-surface">
        <div className="max-w-7xl mx-auto px-6">
          <Reveal>
            <div className="relative overflow-hidden rounded-[2.4rem] bg-mesh px-8 py-20 sm:px-16 text-center">
              <TacticalPattern />
              <div className="relative z-10 max-w-3xl mx-auto">
                <Icon name="quote" size={46} className="text-flame mx-auto mb-6" />
                <p className="section-title text-white">
                  Au SDUS, on ne forme pas seulement des joueurs.{' '}
                  <span className="text-gradient">On fait grandir des personnes.</span>
                </p>
                <p className="text-white/45 mt-6 uppercase tracking-[0.2em] text-sm">— Le staff du club</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
