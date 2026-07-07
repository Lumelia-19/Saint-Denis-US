import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import Icon from '@/components/Icon';
import Reveal from '@/components/Reveal';
import { getAllArticles, getArticleBySlug } from '@/lib/articles';

type Params = { slug: string };

export async function generateStaticParams() {
  return getAllArticles().map((article) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) {
    return {
      title: 'Article introuvable',
      description: "L'article recherché n'existe pas ou a été déplacé.",
    };
  }

  const date = new Date(article.date).toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });

  return {
    title: article.title,
    description: article.excerpt,
    alternates: { canonical: `/actualites/${article.slug}` },
    openGraph: {
      title: `${article.title} | UFSD`,
      description: article.excerpt,
      url: `/actualites/${article.slug}`,
      type: 'article',
      publishedTime: article.date,
      authors: article.author ? [article.author] : undefined,
      images: article.image
        ? [
            {
              url: article.image,
              width: 1200,
              height: 630,
              alt: article.title,
            },
          ]
        : undefined,
    },
    other: { 'article:section': article.category, 'article:published_time': article.date },
  };
}

function formatDate(date: string) {
  return new Date(date)
    .toLocaleDateString('fr-FR', { day: '2-digit', month: 'long', year: 'numeric' })
    .toUpperCase();
}

export default async function ArticleDetailPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const paragraphs = Array.isArray(article.content)
    ? article.content
    : (article.content ?? '').split('\n\n').filter(Boolean);

  const others = getAllArticles().filter((a) => a.slug !== article.slug).slice(0, 3);

  return (
    <article
      className="relative isolate overflow-hidden bg-surface pt-20 lg:pt-16"
      aria-labelledby="article-title"
    >
      {/* Atmosphere bleue en haut qui revient en scrim */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(13,27,75,0.12)_0%,rgba(13,27,75,0.28)_34%,color-mix(in_srgb,var(--color-scrim)_92%,transparent)_64%,var(--color-scrim)_88%)]"
      />

      <div className="mx-auto max-w-3xl px-5 pb-24 pt-10 sm:px-8 lg:pt-16">
        {/* Lien retour */}
        <Reveal>
          <Link
            href="/actualites"
            className="inline-flex items-center gap-2 text-sm font-bold text-navy/80 transition-colors hover:text-flame"
          >
            <Icon name="arrow-right" size={16} strokeWidth={2.4} className="rotate-180" />
            Retour aux actualités
          </Link>
        </Reveal>

        {/* En-tête de l'article */}
        <Reveal>
          <div className="mt-6">
            <div className="flex flex-wrap items-center gap-3">
              <span className="chip bg-flame text-white">{article.category}</span>
              <p className="inline-flex items-center gap-2 text-[0.72rem] font-extrabold uppercase tracking-wide text-navy">
                <Icon name="calendar" size={14} className="text-flame" />
                {formatDate(article.date)}
              </p>
            </div>

            <h1
              id="article-title"
              className="hero-title text-navy mt-4 text-4xl sm:text-5xl lg:text-[3.6rem]"
            >
              {article.title}
            </h1>
            <div className="mt-4 h-1.5 w-16 rounded-full bg-flame" />
            <p className="mt-6 text-lg leading-relaxed text-navy/80">{article.excerpt}</p>

            {article.author && (
              <p className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-slate-soft">
                <Icon name="users" size={16} className="text-flame" />
                Par {article.author}
              </p>
            )}
          </div>
        </Reveal>

        {/* Image de couverture */}
        <Reveal>
          <div className="relative mt-8 aspect-[16/9] overflow-hidden rounded-3xl border border-cloud bg-royal shadow-[0_30px_70px_-36px_rgba(13,27,75,0.6)]">
            {article.image ? (
              <Image
                src={article.image}
                alt={article.title}
                fill
                priority
                sizes="(min-width: 1024px) 768px, 100vw"
                className="object-cover"
              />
            ) : null}
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(7,12,32,0)_60%,rgba(7,12,32,0.45)_100%)]" />
          </div>
        </Reveal>

        {/* Corps de l'article */}
        <div className="mt-10 max-w-3xl">
          {paragraphs.map((paragraph, i) => (
            <Reveal key={i} delay={Math.min(i * 0.05, 0.2)}>
              <p
                className={
                  i === 0
                    ? 'text-[1.02rem] leading-[1.85] text-navy/90 first-letter:font-display first-letter:text-flame first-letter:text-[1.6em] first-letter:font-bold first-letter:mr-1.5 first-letter:float-left first-letter:leading-[0.85] first-letter:mt-1'
                    : 'text-[1.02rem] leading-[1.85] text-navy/90'
                }
              >
                {paragraph}
              </p>
            </Reveal>
          ))}
        </div>

        {/* Pied d'article : partage + retour */}
        <Reveal>
          <div className="mt-12 flex flex-col gap-4 border-t border-cloud pt-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap items-center gap-2 text-sm font-semibold text-slate-soft">
              <span>Partager :</span>
              <a
                href={`https://www.instagram.com/sdus_football/`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-cloud text-navy transition-colors hover:bg-royal hover:text-white"
                aria-label="Partager sur Instagram"
              >
                <Icon name="instagram" size={18} />
              </a>
              <a
                href={`https://www.facebook.com/`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-cloud text-navy transition-colors hover:bg-royal hover:text-white"
                aria-label="Partager sur Facebook"
              >
                <Icon name="facebook" size={18} />
              </a>
            </div>
            <Link href="/actualites" className="btn-outline group">
              Toutes les actualités
              <Icon
                name="arrow-right"
                size={18}
                strokeWidth={2.4}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </div>
        </Reveal>
      </div>

      {/* À lire aussi */}
      {others.length > 0 ? (
        <section className="mx-auto max-w-[1500px] px-5 pb-24 sm:px-8 lg:px-10 min-[1400px]:px-16">
          <Reveal>
            <div className="max-w-3xl">
              <p className="eyebrow text-flame mb-3">Continuer la lecture</p>
              <h2 className="section-title text-navy">À lire aussi</h2>
              <div className="mt-4 h-1.5 w-16 rounded-full bg-flame" />
            </div>
          </Reveal>
          <div className="mt-8 grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
            {others.map((other, i) => (
              <Reveal key={other.slug} delay={i * 0.08}>
                <Link
                  href={`/actualites/${other.slug}`}
                  className="card card-hover group flex h-full flex-col overflow-hidden"
                  aria-label={`Lire l’article : ${other.title}`}
                >
                  <div className="relative h-40 overflow-hidden bg-mesh">
                    {other.image ? (
                      <Image
                        src={other.image}
                        alt={other.title}
                        fill
                        sizes="(min-width: 1280px) 33vw, (min-width: 640px) 50vw, 100vw"
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : null}
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,12,32,0)_22%,rgba(7,12,32,0.78)_100%)]" />
                    <span className="absolute top-3 left-3 chip bg-flame text-white">
                      {other.category}
                    </span>
                  </div>
                  <div className="flex flex-1 flex-col p-5">
                    <p className="text-[0.7rem] font-extrabold uppercase tracking-wide text-navy">
                      {formatDate(other.date)}
                    </p>
                    <h3 className="display-sm mt-2 text-lg leading-snug text-navy transition-colors group-hover:text-flame">
                      {other.title}
                    </h3>
                    <p className="mt-2 flex-1 text-sm leading-relaxed text-slate-soft line-clamp-3">
                      {other.excerpt}
                    </p>
                    <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-flame">
                      Lire
                      <Icon
                        name="arrow-right"
                        size={16}
                        strokeWidth={2.4}
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </section>
      ) : null}
    </article>
  );
}