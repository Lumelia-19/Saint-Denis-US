'use client';

import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import TacticalPattern from '@/components/TacticalPattern';
import Icon, { type IconName } from '@/components/Icon';

const EASE = [0.22, 0.7, 0.2, 1] as const;

const PARTNER_AUDIENCES: { icon: IconName; title: string; className: string }[] = [
  {
    icon: 'store',
    title: 'Commerces\nde proximité',
    className: 'lg:left-[22%] lg:top-[2%]',
  },
  {
    icon: 'building',
    title: 'Entreprises\nlocales',
    className: 'lg:right-[22%] lg:top-[2%]',
  },
  {
    icon: 'institution',
    title: 'Collectivités\n& institutions',
    className: 'lg:left-[4%] lg:top-[37%]',
  },
  {
    icon: 'handshake',
    title: 'Acteurs\néconomiques',
    className: 'lg:right-[4%] lg:top-[37%]',
  },
  {
    icon: 'users',
    title: 'Associations\n& citoyens',
    className: 'lg:left-[25%] lg:bottom-[8%]',
  },
  {
    icon: 'graduation',
    title: 'Éducation\n& formation',
    className: 'lg:right-[25%] lg:bottom-[8%]',
  },
];

const PARTNER_BENEFITS: { icon: IconName; title: string; desc: string }[] = [
  {
    icon: 'eye',
    title: 'Visibilité',
    desc: "Valorisez votre image auprès d'un public engagé, local et grandissant.",
  },
  {
    icon: 'map-pin',
    title: 'Territoire',
    desc: 'Associez votre marque au développement et à la dynamique de Saint-Denis.',
  },
  {
    icon: 'users',
    title: 'Jeunesse',
    desc: "Soutenez la formation, l'éducation et l'insertion par le sport.",
  },
];

const rise = {
  hidden: { opacity: 1, y: 28 },
  show: { opacity: 1, y: 0 },
};

export default function PartnerSponsoringSection() {
  const ref = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], prefersReducedMotion ? ['0%', '0%'] : ['-4%', '7%']);
  const bgScale = useTransform(scrollYProgress, [0, 0.55, 1], prefersReducedMotion ? [1, 1, 1] : [1.08, 1.03, 1]);
  const fadeOut = useTransform(scrollYProgress, [0.68, 1], [1, 0.72]);

  return (
    <motion.section
      ref={ref}
      className="relative isolate overflow-hidden bg-white py-16 sm:py-20 lg:min-h-[900px] lg:py-0"
      initial="hidden"
      whileInView="show"
      viewport={{ once: true, amount: 0.26 }}
      transition={{ staggerChildren: 0.08 }}
    >
      <motion.div className="absolute inset-0" style={{ y: bgY, scale: bgScale, opacity: fadeOut }}>
        <Image
          src="/assets/sponsor-bg.webp"
          alt=""
          aria-hidden="true"
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
      </motion.div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_42%,rgba(255,255,255,0.96)_0%,rgba(255,255,255,0.88)_34%,rgba(255,255,255,0.56)_58%,rgba(255,255,255,0.18)_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.9)_0%,rgba(255,255,255,0.3)_52%,rgba(27,58,140,0.18)_82%,rgba(255,255,255,0.96)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-b from-transparent to-surface" />
      <TacticalPattern tone="onLight" className="z-[1] opacity-55" />

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6 lg:min-h-[900px]">
        <motion.div
          variants={rise}
          transition={{ duration: 0.7, ease: EASE }}
          className="grid gap-8 lg:absolute lg:left-6 lg:top-[28%] lg:w-[230px]"
        >
          <div className="max-w-xs">
            <span className="mb-4 grid h-14 w-14 place-items-center rounded-full border border-flame/30 bg-white/76 text-flame shadow-[0_18px_40px_-28px_rgba(13,27,75,0.55)] backdrop-blur">
              <Icon name="users" size={28} />
            </span>
            <p className="nums text-6xl font-black italic leading-none text-royal" style={{ fontFamily: 'var(--font-display)' }}>
              500<span className="text-flame">+</span>
            </p>
            <p className="display-sm mt-1 text-2xl italic text-flame">Jeunes licenciés</p>
            <p className="mt-4 text-sm leading-relaxed text-deep/78">
              Un vivier de talents formés avec passion au cœur de Saint-Denis.
            </p>
          </div>
        </motion.div>

        <motion.div
          variants={rise}
          transition={{ duration: 0.7, delay: 0.12, ease: EASE }}
          className="grid gap-8 lg:absolute lg:right-6 lg:top-[31%] lg:w-[250px]"
        >
          <div className="max-w-xs lg:ml-auto">
            <span className="mb-4 grid h-14 w-14 place-items-center rounded-full border border-flame/30 bg-white/76 text-flame shadow-[0_18px_40px_-28px_rgba(13,27,75,0.55)] backdrop-blur">
              <Icon name="target" size={28} />
            </span>
            <p className="nums text-6xl font-black italic leading-none text-royal" style={{ fontFamily: 'var(--font-display)' }}>
              1
              <span className="ml-2 align-middle text-2xl not-italic text-royal">stade</span>
            </p>
            <p className="display-sm mt-1 text-2xl italic text-flame">Au cœur de Saint-Denis</p>
            <p className="mt-4 text-sm leading-relaxed text-deep/78">
              Le Stade de France, notre fierté, notre force.
            </p>
          </div>
        </motion.div>

        <div className="relative mx-auto flex min-h-[520px] max-w-[1080px] flex-col items-center justify-center py-10 text-center lg:min-h-[650px] lg:py-0">
          <svg
            className="pointer-events-none absolute left-1/2 top-1/2 hidden h-[620px] w-[620px] -translate-x-1/2 -translate-y-1/2 overflow-visible lg:block"
            viewBox="0 0 620 620"
            aria-hidden="true"
          >
            <motion.circle
              cx="310"
              cy="310"
              r="300"
              fill="none"
              stroke="rgba(27,58,140,0.58)"
              strokeWidth="2"
              strokeDasharray="7 8"
              initial={{ pathLength: 0.08, opacity: 1 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true, amount: 0.45 }}
              transition={{ duration: 1.25, ease: EASE }}
            />
            {[10, 60, 120, 180, 240, 300].map((deg, i) => {
              const rad = (deg * Math.PI) / 180;
              const x = 310 + Math.cos(rad) * 300;
              const y = 310 + Math.sin(rad) * 300;
              return (
                <motion.circle
                  key={deg}
                  cx={x}
                  cy={y}
                  r="7"
                  fill="white"
                  stroke="#f26522"
                  strokeWidth="2"
                  initial={{ scale: 0.64, opacity: 1 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true, amount: 0.45 }}
                  transition={{ duration: 0.34, delay: 0.38 + i * 0.08, ease: EASE }}
                />
              );
            })}
          </svg>
          <div className="pointer-events-none absolute left-1/2 top-1/2 hidden h-[390px] w-[390px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/54 blur-2xl lg:block" />

          {PARTNER_AUDIENCES.map((item, i) => (
            <motion.div
              key={item.title}
              className={`mb-4 flex items-center gap-4 rounded-[1rem] border border-royal/20 bg-white/90 px-4 py-3 text-left shadow-[0_22px_44px_-30px_rgba(13,27,75,0.72)] backdrop-blur lg:absolute lg:z-10 lg:mb-0 lg:block lg:h-36 lg:w-36 lg:rounded-full lg:border-2 lg:border-royal lg:px-4 lg:py-6 lg:text-center lg:ring-4 lg:ring-white/70 ${item.className}`}
              initial={{ opacity: 1, scale: 0.9, y: 16 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, amount: 0.36 }}
              transition={{ duration: 0.56, delay: 0.2 + i * 0.08, ease: EASE }}
            >
              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-white text-royal lg:mx-auto lg:mb-2 lg:h-auto lg:w-auto lg:bg-transparent">
                <Icon name={item.icon} size={34} strokeWidth={1.8} />
              </span>
              <p className="display-sm whitespace-pre-line text-base italic leading-[0.98] text-royal lg:text-[1.02rem]">
                {item.title}
              </p>
            </motion.div>
          ))}

          <motion.div
            className="relative z-20 mx-auto max-w-xl pt-4 lg:pt-0"
            variants={rise}
            transition={{ duration: 0.72, delay: 0.22, ease: EASE }}
          >
            <p className="eyebrow mb-5 justify-center text-flame">Ensemble</p>
            <h2 className="hero-title text-royal">
              Partenaires
              <br />
              <span className="text-flame">&amp; Sponsoring</span>
            </h2>
            <p className="mx-auto mt-6 max-w-lg text-base leading-relaxed text-deep/78">
              Soutenez un club formateur et ambitieux, engagé pour la jeunesse, l&apos;inclusion et le rayonnement de
              Saint-Denis.
            </p>
            <Link href="/partenaires" className="btn-primary group mt-8 min-w-56">
              Devenir partenaire
              <Icon
                name="arrow-right"
                size={18}
                strokeWidth={2.4}
                className="transition-transform duration-300 group-hover:translate-x-1"
              />
            </Link>
          </motion.div>
        </div>

        <div className="grid gap-4 lg:absolute lg:bottom-12 lg:left-1/2 lg:w-[760px] lg:-translate-x-1/2 lg:grid-cols-3">
          {PARTNER_BENEFITS.map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 1, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.42 }}
              transition={{ duration: 0.62, delay: 0.18 + i * 0.1, ease: EASE }}
            >
              <Link
                href="/partenaires"
                className="group relative block min-h-[170px] overflow-hidden rounded-[0.7rem] border border-royal/14 bg-white/96 p-6 shadow-[0_22px_54px_-34px_rgba(13,27,75,0.65)] backdrop-blur transition duration-300 hover:-translate-y-1"
              >
                <span className="mb-4 grid h-12 w-12 place-items-center rounded-full bg-royal text-white shadow-[0_14px_28px_-18px_rgba(13,27,75,0.8)] transition-colors duration-300 group-hover:bg-flame">
                  <Icon name={item.icon} size={24} />
                </span>
                <h3 className="display-sm text-2xl italic text-royal">{item.title}</h3>
                <div className="mt-2 mb-4 h-0.5 w-9 rounded-full bg-flame" />
                <p className="text-sm leading-relaxed text-slate-soft">{item.desc}</p>
                <Icon
                  name="arrow-right"
                  size={24}
                  strokeWidth={2}
                  className="absolute bottom-5 right-5 text-flame transition-transform duration-300 group-hover:translate-x-1"
                />
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
