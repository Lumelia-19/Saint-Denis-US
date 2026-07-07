import Image from 'next/image';
import Link from 'next/link';
import type { ArticleEntry } from '@/lib/articles';
import Icon, { type IconName } from '@/components/Icon';

const CATEGORY_ICON: Record<string, IconName> = {
  Club: 'shield',
  Formation: 'graduation',
  'Vie du club': 'heart',
  Match: 'trophy',
  Stage: 'flame',
};

export default function ArticleCard({ article }: { article: ArticleEntry }) {
  const date = new Date(article.date)
    .toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })
    .toUpperCase();
  const icon = CATEGORY_ICON[article.category] ?? 'ball';
  const href = `/actualites/${article.slug}`;

  return (
    <Link
      href={href}
      aria-label={`Lire l’article : ${article.title}`}
      className="card card-hover group flex flex-col overflow-hidden rounded-2xl"
    >
      <div className="relative h-52 bg-mesh overflow-hidden">
        {article.image ? (
          <Image
            src={article.image}
            alt={`Image de l’article : ${article.title}`}
            fill
            sizes="(min-width: 768px) 33vw, 100vw"
            className="object-cover transition-transform duration-700 group-hover:scale-105"
          />
        ) : (
          <div className="absolute inset-0 grid place-items-center">
            <Icon
              name={icon}
              size={66}
              strokeWidth={1.4}
              className="text-white/20 transition-transform duration-500 group-hover:scale-110 group-hover:text-white/30"
            />
          </div>
        )}
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(7,12,32,0)_22%,rgba(7,12,32,0.82)_100%)]" />
        <span className="absolute top-3 left-3 chip bg-flame text-white">{article.category}</span>
        <span className="absolute bottom-4 left-4 text-[0.68rem] font-semibold text-white/80 uppercase tracking-wider">
          {date}
        </span>
      </div>
      <div className="p-5 flex flex-col flex-1">
        <h3 className="display-sm text-lg text-navy leading-snug mb-2 group-hover:text-flame transition-colors">
          {article.title}
        </h3>
        <p className="text-slate-soft text-sm leading-relaxed mb-4 flex-1">{article.excerpt}</p>
        <span className="inline-flex items-center gap-1.5 text-flame text-sm font-semibold">
          Lire l’article
          <Icon
            name="arrow-right"
            size={16}
            strokeWidth={2.4}
            className="transition-transform duration-300 group-hover:translate-x-1"
          />
        </span>
      </div>
    </Link>
  );
}