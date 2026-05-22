import type { ReactNode, SVGProps } from 'react';

const PATHS = {
  'arrow-right': (
    <>
      <path d="M5 12h13" />
      <path d="M13 6l6 6-6 6" />
    </>
  ),
  'arrow-up-right': (
    <>
      <path d="M7 17 17 7" />
      <path d="M8 7h9v9" />
    </>
  ),
  'arrow-down': (
    <>
      <path d="M12 5v13" />
      <path d="M6 13l6 6 6-6" />
    </>
  ),
  'chevron-right': <path d="m9 6 6 6-6 6" />,
  'chevron-down': <path d="m6 9 6 6 6-6" />,
  check: <path d="M20 6 9 17l-5-5" />,
  plus: <path d="M12 5v14M5 12h14" />,
  menu: <path d="M3 6h18M3 12h18M3 18h18" />,
  close: <path d="M18 6 6 18M6 6l12 12" />,
  ball: (
    <>
      <circle cx="12" cy="12" r="9.5" />
      <path d="m12 6.6 5 3.6-1.9 5.8H8.9L7 10.2l5-3.6Z" />
      <path d="M12 2.5v4.1M17 10.2l4.4-1.6M15.1 16 18 19.6M8.9 16 6 19.6M7 10.2 2.6 8.6" />
    </>
  ),
  trophy: (
    <>
      <path d="M7 4h10v6a5 5 0 0 1-10 0Z" />
      <path d="M7 5H4v2a3 3 0 0 0 3 3M17 5h3v2a3 3 0 0 1-3 3M9 21h6M12 15v6" />
    </>
  ),
  shield: (
    <>
      <path d="M12 22s8-3.6 8-9.6V5.5L12 2.5 4 5.5v6.9C4 18.4 12 22 12 22Z" />
      <path d="m9 12 2 2 4-4" />
    </>
  ),
  users: (
    <>
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13A4 4 0 0 1 16 11" />
    </>
  ),
  heart: (
    <path d="M19.5 12.6c1.4-1.4 2.5-3 2.5-5.1A4.4 4.4 0 0 0 12 5.3 4.4 4.4 0 0 0 2 7.5c0 2.1 1.1 3.7 2.5 5.1L12 20Z" />
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1.4" />
    </>
  ),
  flag: <path d="M5 21V4c2-1.2 4-1.2 7 0s5 1.2 7 0v9c-2 1.2-4 1.2-7 0s-5-1.2-7 0" />,
  calendar: (
    <>
      <rect x="3" y="5" width="18" height="16" rx="2.5" />
      <path d="M3 10h18M8 3v4M16 3v4" />
    </>
  ),
  'map-pin': (
    <>
      <path d="M20 10.5c0 5.5-8 11-8 11s-8-5.5-8-11a8 8 0 0 1 16 0Z" />
      <circle cx="12" cy="10.5" r="2.8" />
    </>
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="m4 7 8 6 8-6" />
    </>
  ),
  phone: (
    <path d="M21 16.9v2.6a2 2 0 0 1-2.2 2 19.5 19.5 0 0 1-8.5-3 19 19 0 0 1-5.9-5.9 19.5 19.5 0 0 1-3-8.6A2 2 0 0 1 3.4 4h2.6a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L9 12a16 16 0 0 0 6 6l1.5-1.2a2 2 0 0 1 2.1-.5c.9.3 1.8.6 2.7.7A2 2 0 0 1 21 16.9Z" />
  ),
  clock: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3.5 2" />
    </>
  ),
  graduation: (
    <>
      <path d="m12 4 9.5 4.5L12 13 2.5 8.5 12 4Z" />
      <path d="M6 10.5V16c0 1.6 2.7 3 6 3s6-1.4 6-3v-5.5" />
    </>
  ),
  star: (
    <path d="m12 3 2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17.9 6.6 20l1-6.1L3.2 9.5l6.1-.9Z" />
  ),
  sparkles: (
    <>
      <path d="M12 3.5 13.7 9 19 10.8 13.7 12.6 12 18l-1.7-5.4L5 10.8 10.3 9Z" />
      <path d="m18.6 14.6.6 2 2 .6-2 .6-.6 2-.6-2-2-.6 2-.6Z" />
    </>
  ),
  eye: (
    <>
      <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" />
      <circle cx="12" cy="12" r="3.2" />
    </>
  ),
  flame: (
    <path d="M12 2.5c.5 4 4.5 5.5 4.5 10.5a4.5 4.5 0 0 1-9 0c0-1.8.8-2.9 1.5-3.7.4 1.7 1.5 2.2 1.5 2.2-1-3 1-5.5 1.5-9Z" />
  ),
  send: (
    <>
      <path d="M21.5 3 2 10.5l7.5 3 3 7.5Z" />
      <path d="M21.5 3 9.5 13.5" />
    </>
  ),
  search: (
    <>
      <circle cx="10.5" cy="10.5" r="6.5" />
      <path d="m15.4 15.4 5.1 5.1" />
      <circle cx="10.5" cy="10.5" r="2.1" />
    </>
  ),
  runner: (
    <>
      <circle cx="13.5" cy="4.7" r="2.1" />
      <path d="m9.5 21 2.2-5.5-3.5-3.2-2.2 3.1" />
      <path d="m11.7 15.5 4.8 1.7 2.5 3.8" />
      <path d="m8.2 12.3 3.8-4.2 3.5 2.4 3.2-.6" />
      <path d="M5 21h3.2" />
    </>
  ),
  folder: (
    <>
      <path d="M3 7.5A2.5 2.5 0 0 1 5.5 5H10l2 2.5h6.5A2.5 2.5 0 0 1 21 10v7.5a2.5 2.5 0 0 1-2.5 2.5h-13A2.5 2.5 0 0 1 3 17.5Z" />
      <path d="M3 11h18" />
      <path d="m8 15 2 2 5-5" />
    </>
  ),
  ticket: (
    <>
      <path d="M4 6h16a1.5 1.5 0 0 1 1.5 1.5v2.5a2 2 0 0 0 0 4v2.5A1.5 1.5 0 0 1 20 18H4a1.5 1.5 0 0 1-1.5-1.5V14a2 2 0 0 0 0-4V7.5A1.5 1.5 0 0 1 4 6Z" />
      <path d="M14 6v12" />
    </>
  ),
  'file-text': (
    <>
      <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8Z" />
      <path d="M14 3v5h5M9 13h6M9 17h5" />
    </>
  ),
  building: (
    <>
      <path d="M3 21h18M6 21V5a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v16" />
      <path d="M10 8h.01M14 8h.01M10 12h.01M14 12h.01M12 21v-4" />
    </>
  ),
  store: (
    <>
      <path d="M4 10v10h16V10" />
      <path d="M5 4h14l2 5H3l2-5Z" />
      <path d="M3 9c0 1.3 1 2.4 2.4 2.4S8 10.3 8 9c0 1.3 1 2.4 2.4 2.4S13 10.3 13 9c0 1.3 1 2.4 2.4 2.4S18 10.3 18 9c0 1.3 1 2.4 2.6 2.4" />
      <path d="M9 20v-5h6v5" />
    </>
  ),
  handshake: (
    <>
      <path d="m7.5 12 3.2-3.2a2.4 2.4 0 0 1 3.4 0L16 10.7" />
      <path d="m14.5 13.5 1.2 1.2a2 2 0 0 0 2.8 0l2.5-2.5-4.8-4.8-1.6 1.6" />
      <path d="m7.8 8.2-1.6-1.6L1.5 11.4l2.6 2.6a2 2 0 0 0 2.8 0l.9-.9" />
      <path d="m8 13 4 4a1.6 1.6 0 0 0 2.3-2.3l-3.4-3.4" />
      <path d="m6.7 14.2 3.1 3.1a1.5 1.5 0 0 0 2.2-2.1" />
    </>
  ),
  institution: (
    <>
      <path d="M3 21h18" />
      <path d="M5 10h14" />
      <path d="M6 10v9M10 10v9M14 10v9M18 10v9" />
      <path d="m12 3 9 5H3l9-5Z" />
    </>
  ),
  camera: (
    <>
      <rect x="2.5" y="7" width="19" height="13" rx="3" />
      <path d="M8 7 9.6 4.4h4.8L16 7" />
      <circle cx="12" cy="13.5" r="3.6" />
    </>
  ),
  play: <path d="M7 4.5v15l13-7.5Z" />,
  whistle: (
    <>
      <path d="M11 9h9a2 2 0 0 1 2 2 7 7 0 1 1-13.5-2.5" />
      <circle cx="6.5" cy="13.5" r="4" />
      <path d="M14 5v3" />
    </>
  ),
  instagram: (
    <>
      <rect x="3" y="3" width="18" height="18" rx="5.5" />
      <circle cx="12" cy="12" r="3.8" />
      <path d="M17.4 6.6h.01" />
    </>
  ),
  facebook: (
    <path d="M16 3h-3a4.5 4.5 0 0 0-4.5 4.5V11H6v4h2.5v6H13v-6h3l.8-4H13V8a1 1 0 0 1 1-1h2Z" />
  ),
  youtube: (
    <>
      <rect x="2.5" y="6" width="19" height="12" rx="4" />
      <path d="m10.5 9.2 5 2.8-5 2.8Z" />
    </>
  ),
  quote: (
    <>
      <path d="M9.5 6C6.4 7.1 5 9.6 5 13.2V18h6v-7H7.7c.2-1.7 1-2.8 2.7-3.3Z" />
      <path d="M18.7 6c-3.1 1.1-4.5 3.6-4.5 7.2V18h6v-7h-3.3c.2-1.7 1-2.8 2.7-3.3Z" />
    </>
  ),
  sun: (
    <>
      <circle cx="12" cy="12" r="4.1" />
      <path d="M12 2.4v2.3M12 19.3v2.3M4.4 4.4 6 6M18 18l1.6 1.6M2.4 12h2.3M19.3 12h2.3M4.4 19.6 6 18M18 6l1.6-1.6" />
    </>
  ),
  moon: <path d="M20.5 13.3A8.5 8.5 0 0 1 10.7 3.5 8.5 8.5 0 1 0 20.5 13.3Z" />,
} as const;

export type IconName = keyof typeof PATHS;

interface IconProps extends Omit<SVGProps<SVGSVGElement>, 'name'> {
  name: IconName;
  size?: number;
  strokeWidth?: number;
}

export default function Icon({ name, size = 24, strokeWidth = 1.8, ...rest }: IconProps): ReactNode {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...rest}
    >
      {PATHS[name]}
    </svg>
  );
}
