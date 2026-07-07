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
  { href: '/projet', label: 'Projet' },
  { href: '/equipes', label: 'Équipes' },
  { href: '/calendrier', label: 'Calendrier' },
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

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <div className={`transition-all duration-300 ${embedded ? 'px-3 pt-3 sm:px-5 sm:pt-4' : ''}`}>
        <div
          className={`mx-auto flex h-16 max-w-[1360px] items-center gap-4 px-4 transition-all duration-300 sm:px-5 ${
            embedded
              ? 'rounded-2xl border border-cloud/80 bg-panel/70 shadow-[0_20px_50px_-30px_rgba(13,27,75,0.55)] backdrop-blur-2xl'
              : 'border-b border-cloud bg-surface/85 shadow-[0_10px_30px_-24px_rgba(16,24,43,0.5)] backdrop-blur-xl'
          }`}
        >
          {/* Logo + wordmark */}
          <Link
            href="/"
            aria-label="Accueil United Football Saint-Denis"
            className="group flex shrink-0 items-center gap-3"
          >
            <Image
              src="/assets/logo.png"
              alt="United Football Saint-Denis"
              width={72}
              height={72}
              className="h-11 w-auto rounded-full transition-transform duration-300 group-hover:scale-[1.05]"
              priority
            />
            <span className="hidden font-display text-[0.92rem] font-extrabold uppercase leading-[0.95] tracking-tight text-navy lg:block">
              United Football
              <br />
              <span className="text-flame">Saint-Denis</span>
            </span>
          </Link>

          {/* Navigation centrée */}
          <nav className="hidden flex-1 items-center justify-center gap-6 text-navy xl:flex 2xl:gap-8">
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
          </nav>

          {/* Actions */}
          <div className="ml-auto flex items-center gap-2 xl:ml-0">
            <ThemeToggle className="border-transparent text-navy hover:bg-cloud/70" />
            <Link
              href="/inscriptions"
              className="hidden btn-primary px-5 py-2.5 text-sm md:inline-flex"
            >
              S&apos;inscrire
              <Icon name="arrow-right" size={16} strokeWidth={2.4} />
            </Link>
            <button
              onClick={() => setMenuOpen(true)}
              className="grid h-11 w-11 place-items-center rounded-full text-navy transition-colors hover:bg-cloud/70 xl:hidden"
              aria-label="Ouvrir le menu"
            >
              <Icon name="menu" size={22} strokeWidth={2.2} />
            </button>
          </div>
        </div>
      </div>

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
              <span className="display-sm text-xl text-white">UFSD</span>
              <div className="flex items-center gap-2.5">
                <ThemeToggle className="border-white/30 text-white hover:bg-white/10" />
                <button
                  onClick={() => setMenuOpen(false)}
                  className="grid place-items-center w-11 h-11 rounded-full border border-white/30 text-white hover:bg-white/10 transition-colors"
                  aria-label="Fermer le menu"
                >
                  <Icon name="close" size={20} strokeWidth={2.2} />
                </button>
              </div>
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
