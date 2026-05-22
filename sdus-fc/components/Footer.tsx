import Link from 'next/link';
import Image from 'next/image';
import Icon, { type IconName } from '@/components/Icon';

const NAV: [string, string][] = [
  ['/', 'Accueil'],
  ['/club', 'Le Club'],
  ['/equipes', 'Équipes'],
  ['/calendrier', 'Calendrier'],
];

const CLUB: [string, string][] = [
  ['/inscriptions', 'Inscriptions'],
  ['/actualites', 'Actualités'],
  ['/partenaires', 'Partenaires'],
  ['/contact', 'Contact'],
];

const SOCIALS: { name: IconName; label: string; href: string }[] = [
  { name: 'instagram', label: 'Instagram', href: 'https://www.instagram.com/sdus_football/' },
];

export default function Footer() {
  return (
    <footer className="relative bg-mesh text-white overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-6 pt-20 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-12 border-b border-white/12">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <Image src="/assets/logo.png" alt="SDUS FC 93" width={56} height={56} className="h-14 w-auto" />
              <span className="display-sm text-xl">SDUS FC 93</span>
            </div>
            <p className="text-white/55 text-sm leading-relaxed max-w-xs">
              Formateur, populaire et ambitieux. Au cœur de Saint-Denis depuis 1993.
            </p>
            <div className="flex gap-2.5 mt-6">
              {SOCIALS.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.label}
                  className="grid place-items-center w-10 h-10 rounded-full border border-white/20 text-white/70 hover:text-flame hover:border-flame hover:-translate-y-1 transition-all"
                >
                  <Icon name={s.name} size={18} />
                </a>
              ))}
            </div>
          </div>

          <FooterColumn title="Navigation" links={NAV} />
          <FooterColumn title="Le Club" links={CLUB} />

          <div>
            <h4 className="font-bold text-xs uppercase tracking-[0.2em] text-white/40 mb-5">Contact</h4>
            <ul className="space-y-3.5 text-sm text-white/70">
              <li className="flex items-start gap-2.5">
                <Icon name="map-pin" size={17} className="mt-0.5 text-flame shrink-0" />
                Stade Marville, Saint-Denis (93)
              </li>
              <li className="flex items-center gap-2.5">
                <Icon name="mail" size={17} className="text-flame shrink-0" />
                contact@sdus-fc93.fr
              </li>
              <li className="flex items-center gap-2.5">
                <Icon name="phone" size={17} className="text-flame shrink-0" />
                Sur demande par email
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-7 flex flex-col md:flex-row items-center justify-between gap-3">
          <p className="text-white/45 text-sm">
            © {new Date().getFullYear()} Saint-Denis U.S. Football Club — Tous droits réservés.
          </p>
          <p className="text-white/35 text-xs uppercase tracking-[0.18em]">SDUS FC 93 · Seine-Saint-Denis</p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: [string, string][] }) {
  return (
    <div>
      <h4 className="font-bold text-xs uppercase tracking-[0.2em] text-white/40 mb-5">{title}</h4>
      <ul className="space-y-3">
        {links.map(([href, label]) => (
          <li key={href}>
            <Link
              href={href}
              className="group inline-flex items-center gap-1.5 text-sm text-white/70 hover:text-white transition-colors"
            >
              <Icon
                name="chevron-right"
                size={14}
                strokeWidth={2.4}
                className="text-flame -ml-0.5 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all"
              />
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
