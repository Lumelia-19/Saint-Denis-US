import { Player } from '@/lib/types';
import Icon from '@/components/Icon';

const POSITION_LABEL: Record<Player['position'], string> = {
  Gardien: 'GAR',
  Défenseur: 'DÉF',
  Milieu: 'MIL',
  Attaquant: 'ATT',
};

export default function PlayerCard({ player }: { player: Player }) {
  const initials = `${player.firstName[0]}${player.lastName[0]}`;
  const stats = [
    { label: 'Matchs', value: player.stats.matches },
    { label: 'Buts', value: player.stats.goals },
    { label: 'Passes D.', value: player.stats.assists },
    { label: 'Note', value: player.stats.rating.toFixed(1) },
  ];

  return (
    <div className="flip h-80" tabIndex={0} role="group" aria-label={`${player.firstName} ${player.lastName}`}>
      <div className="flip-inner">
        {/* FRONT */}
        <div className="flip-face bg-mesh">
          <div className="relative h-full flex flex-col items-center justify-center p-6 text-center">
            <span
              className="absolute top-1/2 -translate-y-1/2 text-[10rem] font-black text-white/[0.07] select-none leading-none nums"
              style={{ fontFamily: 'var(--font-display)' }}
            >
              {player.number}
            </span>
            <div className="relative z-10 grid place-items-center w-24 h-24 rounded-full border-2 border-flame/60 bg-white/10 mb-4">
              <span className="text-3xl font-black text-white" style={{ fontFamily: 'var(--font-display)' }}>
                {initials}
              </span>
            </div>
            <div className="relative z-10">
              <span className="chip bg-flame text-white mb-2">
                #{player.number} · {POSITION_LABEL[player.position]}
              </span>
              <h3 className="display-sm text-2xl text-white leading-none mt-2">{player.firstName}</h3>
              <h3 className="display-sm text-2xl text-white leading-none">{player.lastName}</h3>
              <p className="text-white/45 text-xs uppercase tracking-[0.18em] mt-2">{player.category}</p>
            </div>
            <span className="absolute bottom-4 right-4 flex items-center gap-1 text-white/30 text-[0.65rem] uppercase tracking-wider">
              Stats <Icon name="chevron-right" size={12} strokeWidth={2.6} />
            </span>
          </div>
        </div>

        {/* BACK */}
        <div className="flip-face flip-back bg-deep">
          <div className="h-full flex flex-col justify-center p-6">
            <p className="text-white/40 text-[0.68rem] uppercase tracking-[0.2em] mb-4 text-center">
              Statistiques · Saison
            </p>
            <div className="grid grid-cols-2 gap-3">
              {stats.map((s) => (
                <div key={s.label} className="rounded-xl bg-white/[0.06] border border-white/10 p-3 text-center">
                  <p
                    className="text-flame text-2xl font-black nums"
                    style={{ fontFamily: 'var(--font-display)' }}
                  >
                    {s.value}
                  </p>
                  <p className="text-white/50 text-[0.68rem] uppercase tracking-wider mt-0.5">{s.label}</p>
                </div>
              ))}
            </div>
            <p className="text-center text-white/70 text-sm font-semibold mt-4">
              {player.firstName} {player.lastName}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
