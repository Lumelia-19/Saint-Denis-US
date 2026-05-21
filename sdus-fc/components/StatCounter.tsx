'use client';
import { useEffect, useRef, useState } from 'react';
import Icon, { type IconName } from '@/components/Icon';

interface StatCounterProps {
  value: number;
  suffix?: string;
  label: string;
  icon?: IconName;
}

export default function StatCounter({ value, suffix = '', label, icon }: StatCounterProps) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const animated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animated.current) {
          animated.current = true;
          let start = 0;
          const duration = 1600;
          const step = (timestamp: number) => {
            if (!start) start = timestamp;
            const progress = Math.min((timestamp - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.floor(eased * value));
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
  }, [value]);

  return (
    <div ref={ref} className="flex flex-col items-center text-center">
      {icon && (
        <span className="grid place-items-center w-12 h-12 rounded-2xl bg-white/10 border border-white/15 text-flame mb-3">
          <Icon name={icon} size={22} />
        </span>
      )}
      <p className="text-5xl sm:text-6xl font-black text-white nums" style={{ fontFamily: 'var(--font-display)' }}>
        {count}
        <span className="text-gradient">{suffix}</span>
      </p>
      <p className="text-white/55 text-xs font-semibold mt-1.5 uppercase tracking-[0.16em]">{label}</p>
    </div>
  );
}
