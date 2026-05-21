'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import Icon from '@/components/Icon';
import ThemeToggle from '@/components/ThemeToggle';

const navLinks = [
  { href: '/', label: 'Accueil' },
  { href: '/club', label: 'Le Club' },
  { href: '/equipes', label: 'Équipes' },
  { href: '/calendrier', label: 'Calendrier' },
  { href: '/inscriptions', label: 'Inscriptions' },
  { href: '/actualites', label: 'Actualités' },
  { href: '/partenaires', label: 'Partenaires' },
  { href: '/contact', label: 'Contact' },
];

/** Routes whose hero is dark — the navbar starts transparent over them. */
const DARK_HERO = ['/', '/club', '/actualites', '/partenaires'];

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

  const overDark = DARK_HERO.includes(pathname) && !scrolled;
  const solid = scrolled || !DARK_HERO.includes(pathname);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <nav
        className={`transition-all duration-300 ${
          solid
            ? 'bg-surface/90 backdrop-blur-xl border-b border-cloud shadow-[0_4px_24px_-16px_rgba(16,24,43,0.4)]'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-[76px] flex items-center justify-between">
          <Link href="/" aria-label="Accueil SDUS FC 93" className="flex items-center gap-3 group">
            <span className="relative">
              <Image
                src="/assets/logo.png"
                alt="SDUS FC 93"
                width={52}
                height={52}
                className="h-12 w-auto transition-transform duration-300 group-hover:scale-105"
                priority
              />
            </span>
            <span className="hidden sm:flex flex-col leading-none">
              <span
                className={`display-sm text-lg ${overDark ? 'text-white' : 'text-navy'}`}
              >
                SDUS FC 93
              </span>
              <span
                className={`text-[0.62rem] font-semibold tracking-[0.22em] uppercase ${
                  overDark ? 'text-white/55' : 'text-slate-soft'
                }`}
              >
                Saint-Denis U.S.
              </span>
            </span>
          </Link>

          <div
            className={`hidden xl:flex items-center gap-7 ${overDark ? 'text-white' : 'text-navy'}`}
          >
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

          <div className="flex items-center gap-3">
            <ThemeToggle
              className={
                overDark
                  ? 'border-white/30 text-white hover:bg-white/10'
                  : 'border-cloud text-navy hover:bg-mist'
              }
            />
            <Link href="/inscriptions" className="hidden md:inline-flex btn-primary py-2.5 px-5 text-sm">
              S&apos;inscrire
              <Icon name="arrow-right" size={16} strokeWidth={2.4} />
            </Link>
            <button
              onClick={() => setMenuOpen(true)}
              className={`xl:hidden grid place-items-center w-11 h-11 rounded-full border transition-colors ${
                overDark
                  ? 'border-white/30 text-white hover:bg-white/10'
                  : 'border-cloud text-navy hover:bg-mist'
              }`}
              aria-label="Ouvrir le menu"
            >
              <Icon name="menu" size={20} strokeWidth={2.2} />
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-[60] bg-mesh"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28 }}
          >
            <div className="max-w-7xl mx-auto px-6 h-[76px] flex items-center justify-between">
              <span className="display-sm text-xl text-white">SDUS FC 93</span>
              <button
                onClick={() => setMenuOpen(false)}
                className="grid place-items-center w-11 h-11 rounded-full border border-white/30 text-white hover:bg-white/10 transition-colors"
                aria-label="Fermer le menu"
              >
                <Icon name="close" size={20} strokeWidth={2.2} />
              </button>
            </div>
            <div className="flex flex-col items-center justify-center gap-1 mt-8">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 22 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.06 + i * 0.05, duration: 0.4, ease: [0.22, 0.7, 0.2, 1] }}
                >
                  <Link
                    href={link.href}
                    data-active={pathname === link.href}
                    onClick={() => setMenuOpen(false)}
                    className="display-sm text-4xl text-white/90 hover:text-flame data-[active=true]:text-flame transition-colors py-1.5"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 22 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.06 + navLinks.length * 0.05, duration: 0.4 }}
              >
                <Link
                  href="/inscriptions"
                  onClick={() => setMenuOpen(false)}
                  className="btn-primary mt-6"
                >
                  S&apos;inscrire
                  <Icon name="arrow-right" size={16} strokeWidth={2.4} />
                </Link>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
