interface SectionTitleProps {
  eyebrow?: string;
  blue: string;
  orange: string;
  subtitle?: string;
  center?: boolean;
  light?: boolean;
}

export default function SectionTitle({
  eyebrow,
  blue,
  orange,
  subtitle,
  center = false,
  light = false,
}: SectionTitleProps) {
  return (
    <div className={`flex flex-col ${center ? 'items-center text-center' : 'items-start'}`}>
      {eyebrow && <span className="eyebrow mb-4 text-flame">{eyebrow}</span>}
      <h2 className="section-title">
        <span className={light ? 'text-white' : 'text-navy'}>{blue} </span>
        <span className="text-gradient">{orange}</span>
      </h2>
      {subtitle && (
        <p
          className={`mt-4 max-w-2xl text-base sm:text-lg leading-relaxed ${
            light ? 'text-white/65' : 'text-slate-soft'
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
