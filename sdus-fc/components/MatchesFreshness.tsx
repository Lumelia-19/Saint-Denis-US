import { MATCHES_SOURCE_URL, type MatchesFeed } from '@/lib/matches-feed';

export default function MatchesFreshness({ feed }: { feed: MatchesFeed | null }) {
  if (!feed) return null;
  const stale = feed.state !== 'fresh';
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-xs leading-relaxed text-slate-soft" role="status">
      <span className={`inline-flex items-center gap-2 font-semibold ${stale ? 'text-flame' : 'text-navy'}`}>
        <span className={`h-2 w-2 rounded-full ${stale ? 'bg-flame' : 'bg-royal'}`} aria-hidden="true" />
        {feed.state === 'unavailable' ? 'Source momentanément indisponible' : stale ? 'Dernières données disponibles' : 'Actualisation automatique'}
      </span>
      {feed.fetchedAt && (
        <span>Récupérées le <time dateTime={feed.fetchedAt}>{new Date(feed.fetchedAt).toLocaleString('fr-FR', {
          timeZone: 'Europe/Paris', day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit',
        })}</time></span>
      )}
      <a href={MATCHES_SOURCE_URL} target="_blank" rel="noopener noreferrer" className="font-semibold underline underline-offset-4 hover:text-flame">
        Source : TheFootData · données FFF
      </a>
      {stale && <p className="basis-full">La source n’a pas encore pu être actualisée. Vérifiez les horaires auprès du club avant de vous déplacer.</p>}
    </div>
  );
}
