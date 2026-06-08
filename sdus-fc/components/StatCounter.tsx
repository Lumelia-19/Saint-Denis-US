'use client';
import { useEffect, useRef, useState } from 'react';
import Icon, { type IconName } from '@/components/Icon';

interface StatCounterProps {
  value: number;
  suffix?: string;
  label: string;
  icon?: IconName;
  animate?: boolean;
}

export default function StatCounter({ value, suffix = '', label, icon, animate = true }: StatCounterProps) {
  const [count, setCount] = useState(value);
  const ref = useRef<HTMLDivElement>(null);
  const animated = useRef(false);
  const displayCount = animate ? count : value;

  useEffect(() => {
    if (!animate) {
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animated.current) {
          animated.current = true;
          const from = Math.max(value > 0 ? 1 : 0, Math.floor(value * 0.72));
          setCount(from);
          let start = 0;
          const duration = 1600;
          const step = (timestamp: number) => {
            if (!start) start = timestamp;
            const progress = Math.min((timestamp - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(from + eased * (value - from)));
            if (progress < 1) requestAnimationFrame(step);
            else setCount(value);
          };
          requestAnimationFrame(step);
        }
      },
      { threshold: 0.5 }
    );
    const node = ref.current;
    if (node) observer.observe(node);
    return () => observer.disconnect();
  }, [animate, value]);

  return (
    <div ref={ref} className="flex flex-col items-center text-center">
      {icon && (
        <span className="grid place-items-center w-10 h-10 sm:w-11 sm:h-11 md:w-12 md:h-12 rounded-2xl bg-white/10 border border-white/15 text-flame mb-3">
          <Icon name={icon} size={22} />
        </span>
      )}
      <p className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black text-white nums" style={{ fontFamily: 'var(--font-display)' }}>
        {displayCount}
        <span className="text-gradient">{suffix}</span>
      </p>
      <p className="text-white/55 text-[0.65rem] sm:text-xs font-semibold mt-1.5 uppercase tracking-[0.16em]">{label}</p>
    </div>
  );
}
