import Link from 'next/link';
import Icon, { type IconName } from '@/components/Icon';

type Variant = 'primary' | 'light' | 'dark' | 'ghost' | 'outline';

interface ButtonProps {
  href?: string;
  onClick?: () => void;
  variant?: Variant;
  children: React.ReactNode;
  className?: string;
  type?: 'button' | 'submit';
  icon?: IconName;
}

const CLASS: Record<Variant, string> = {
  primary: 'btn-primary',
  light: 'btn-light',
  dark: 'btn-dark',
  ghost: 'btn-ghost',
  outline: 'btn-outline',
};

export default function Button({
  href,
  onClick,
  variant = 'primary',
  children,
  className = '',
  type = 'button',
  icon = 'arrow-right',
}: ButtonProps) {
  const cls = `${CLASS[variant]} group ${className}`;
  const inner = (
    <>
      {children}
      <Icon
        name={icon}
        size={16}
        strokeWidth={2.4}
        className="transition-transform duration-300 group-hover:translate-x-1"
      />
    </>
  );

  if (href) {
    return (
      <Link href={href} className={cls}>
        {inner}
      </Link>
    );
  }
  return (
    <button type={type} onClick={onClick} className={cls}>
      {inner}
    </button>
  );
}
