import Link from 'next/link';
import Image from 'next/image';
import Icon, { type IconName } from '@/components/Icon';
import { CLUB } from '@/lib/club';

const NAV: [string, string][] = [
  ['/', 'Accueil'],
  ['/club', 'Le Club'],
  ['/projet', 'Projet'],
  ['/equipes', 'Équipes'],
  ['/calendrier', 'Calendrier'],
];

const CLUB_LINKS: [string, string][] = [
  ['/inscriptions', 'Inscriptions'],
  ['/actualites', 'Actualités'],
  ['/partenaires', 'Partenaires'],
  ['/contact', 'Contact'],
];

const SOCIALS: { name: IconName; label: string; href: string }[] = [
  { name: 'instagram', label: 'Instagram', href: CLUB.socials.instagram },
];

export default function Footer() {
  return (
    <footer className="relative bg-mesh text-white overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-6 pt-20 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 pb-12 border-b border-white/12">
          <div>
            <div className="flex items-center gap-3 mb-5">
              <Image src="/assets/logo.png" alt="United Football Saint-Denis" width={56} height={56} className="h-14 w-auto" />
              <span className="display-sm text-xl leading-none">United Football<br />Saint-Denis</span>
            </div>
            <p className="text-white/55 text-sm leading-relaxed max-w-xs">
              L’excellence au service de la masse. Former, accompagner, inspirer, au cœur de Saint-Denis.
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
          <FooterColumn title="Le Club" links={CLUB_LINKS} />

          <div>
            <h4 className="font-bold text-xs uppercase tracking-[0.2em] text-white/40 mb-5">Contact</h4>
            <ul className="space-y-3.5 text-sm text-white/70">
              <li className="flex items-start gap-2.5">
                <Icon name="map-pin" size={17} className="mt-0.5 text-flame shrink-0" />
                {CLUB.venue}, {CLUB.address.postalCode} {CLUB.city}
              </li>
              <li className="flex items-center gap-2.5">
                <Icon name="mail" size={17} className="text-flame shrink-0" />
                <a href={`mailto:${CLUB.email}`} className="hover:text-white transition-colors">{CLUB.email}</a>
              </li>
              <li className="flex items-center gap-2.5">
                <Icon name="phone" size={17} className="text-flame shrink-0" />
                {CLUB.phoneDisplay}
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-7 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <p className="text-white/45 text-sm">
            © {new Date().getFullYear()} {CLUB.name} - Tous droits réservés.
          </p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-white/50">
            <Link href="/mentions-legales" className="hover:text-white transition-colors">Mentions légales</Link>
            <Link href="/confidentialite" className="hover:text-white transition-colors">Confidentialité</Link>
            <span className="uppercase tracking-[0.18em] text-white/35">UFSD · Seine-Saint-Denis</span>
          </div>
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
