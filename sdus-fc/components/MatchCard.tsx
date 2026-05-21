import { Match } from '@/lib/types';
import { formatMatchDate, getCategoryColor } from '@/lib/matches';
import Icon from '@/components/Icon';

function TeamBadge({ name, highlight }: { name: string; highlight: boolean }) {
  const initials = name
    .replace(/[^A-Za-zÀ-ÿ ]/g, '')
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0])
    .join('')
    .toUpperCase();
  return (
    <div className="flex-1 flex flex-col items-center gap-2 text-center">
      <span
        className={`grid place-items-center w-12 h-12 rounded-2xl text-sm font-black ${
          highlight ? 'bg-royal text-white' : 'bg-mist text-navy'
        }`}
        style={{ fontFamily: 'var(--font-display)' }}
      >
        {initials}
      </span>
      <p className={`text-xs leading-tight ${highlight ? 'font-bold text-navy' : 'text-slate-soft'}`}>
        {name}
      </p>
    </div>
  );
}

export default function MatchCard({ match }: { match: Match }) {
  const isSDUSHome = match.homeTeam.shortName === 'SDUS';
  const isFinished = match.status === 'finished';
  const color = getCategoryColor(match.category);

  return (
    <article className="card card-hover p-5 flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <span className="chip text-white" style={{ backgroundColor: color }}>
          {match.category}
        </span>
        <span className="text-[0.7rem] font-semibold uppercase tracking-wider text-slate-soft">
          {match.competition}
        </span>
      </div>

      <div className="flex items-center justify-between gap-3">
        <TeamBadge name={match.homeTeam.name} highlight={isSDUSHome} />
        <div className="shrink-0 grid place-items-center min-w-[64px]">
          {isFinished ? (
            <span className="nums text-2xl font-black text-navy" style={{ fontFamily: 'var(--font-display)' }}>
              {match.homeScore}<span className="text-cloud px-1">·</span>{match.awayScore}
            </span>
          ) : (
            <>
              <span className="text-sm font-black text-flame tracking-widest">VS</span>
              <span className="nums text-xs text-slate-soft mt-0.5">{match.time}</span>
            </>
          )}
        </div>
        <TeamBadge name={match.awayTeam.name} highlight={!isSDUSHome} />
      </div>

      <div className="border-t border-cloud pt-3 flex items-center justify-between text-xs text-slate-soft">
        <span className="flex items-center gap-1.5">
          <Icon name="calendar" size={14} className="text-flame" />
          {formatMatchDate(match.date)}
        </span>
        <span className="flex items-center gap-1.5">
          <Icon name="map-pin" size={14} className="text-flame" />
          {match.venue.split(',')[0]}
        </span>
      </div>
    </article>
  );
}
