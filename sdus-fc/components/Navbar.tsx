'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import Icon from '@/components/Icon';

const navLinks = [
  { href: '/', label: 'Accueil' },
  { href: '/club', label: 'Le Club' },
  { href: '/equipes', label: 'Équipes' },
  { href: '/calendrier', label: 'Calendrier & Résultats' },
  { href: '/inscriptions', label: 'Inscriptions' },
  { href: '/actualites', label: 'Actualités' },
  { href: '/partenaires', label: 'Partenaires' },
  { href: '/contact', label: 'Contact' },
];

const EMBEDDED_HEADER_ROUTES = ['/', '/club', '/actualites', '/partenaires'];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    handleScroll();
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [menuOpen]);

  const embedded = EMBEDDED_HEADER_ROUTES.includes(pathname) && !scrolled;
  const headerTextClass = embedded ? 'text-[#0d1b4b]' : 'text-navy';

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <nav
        className={`transition-all duration-300 ${embedded ? 'pt-3' : 'bg-surface/92 backdrop-blur-xl border-b border-cloud shadow-[0_10px_30px_-24px_rgba(16,24,43,0.5)]'}`}
      >
        <div className="mx-auto flex h-[58px] max-w-[1360px] items-center gap-3 px-4 transition-all duration-300 sm:h-[68px] sm:px-6 lg:px-7">
          <Link href="/" aria-label="Accueil SDUS FC 93" className="group relative z-10 flex items-center">
            <span className="relative block">
              <Image
                src="/assets/logo.png"
                alt="SDUS FC 93"
                width={78}
                height={78}
                className="h-[46px] w-auto rounded-full drop-shadow-[0_12px_22px_rgba(13,27,75,0.18)] transition-transform duration-300 group-hover:scale-[1.04] sm:h-[54px] lg:h-[70px]"
                priority
              />
            </span>
          </Link>

          <div
            className={`flex h-full flex-1 items-center justify-between px-4 transition-all duration-300 sm:px-6 lg:px-7 ${
              embedded
                ? 'rounded-full border border-white/55 bg-white/72 shadow-[0_18px_50px_-32px_rgba(13,27,75,0.6)] backdrop-blur-2xl'
                : 'rounded-none border border-transparent'
            }`}
          >
            <div className={`hidden items-center gap-6 ${headerTextClass} xl:flex 2xl:gap-9`}>
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  data-active={pathname === link.href}
                  className="nav-link"
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="ml-auto flex items-center gap-3">
              <Link href="/inscriptions" className="hidden md:inline-flex btn-primary py-2.5 px-5 text-sm">
                S&apos;inscrire
                <Icon name="arrow-right" size={16} strokeWidth={2.4} />
              </Link>
              <button
                onClick={() => setMenuOpen(true)}
                className={`grid h-11 w-11 place-items-center rounded-full border border-white/60 bg-white/55 ${headerTextClass} transition-colors hover:bg-white xl:hidden`}
                aria-label="Ouvrir le menu"
              >
                <Icon name="menu" size={20} strokeWidth={2.2} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-[60] flex flex-col bg-mesh"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28 }}
          >
            <div className="mx-auto flex h-[58px] w-full max-w-7xl shrink-0 items-center justify-between px-5 sm:h-[68px] sm:px-6">
              <span className="display-sm text-lg text-white sm:text-xl">SDUS FC 93</span>
              <button
                onClick={() => setMenuOpen(false)}
                className="grid h-11 w-11 place-items-center rounded-full border border-white/30 text-white transition-colors hover:bg-white/10"
                aria-label="Fermer le menu"
              >
                <Icon name="close" size={20} strokeWidth={2.2} />
              </button>
            </div>
            <nav className="flex flex-1 flex-col items-center justify-center gap-0.5 overflow-y-auto px-6 py-4 sm:gap-1">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + i * 0.04, duration: 0.36, ease: [0.22, 0.7, 0.2, 1] }}
                >
                  <Link
                    href={link.href}
                    data-active={pathname === link.href}
                    onClick={() => setMenuOpen(false)}
                    className="display-sm block py-1.5 text-center text-[1.6rem] leading-tight text-white/90 transition-colors hover:text-flame data-[active=true]:text-flame sm:text-[2.1rem]"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.05 + navLinks.length * 0.04, duration: 0.36 }}
              >
                <Link href="/inscriptions" onClick={() => setMenuOpen(false)} className="btn-primary mt-5">
                  S&apos;inscrire
                  <Icon name="arrow-right" size={16} strokeWidth={2.4} />
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
