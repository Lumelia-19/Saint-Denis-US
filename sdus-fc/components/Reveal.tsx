'use client';
import { motion } from 'framer-motion';
import type { ReactNode } from 'react';

interface RevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
}

const EASE = [0.22, 0.7, 0.2, 1] as const;

export default function Reveal({ children, className, delay = 0, y = 26 }: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 1, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.62, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  );
}
