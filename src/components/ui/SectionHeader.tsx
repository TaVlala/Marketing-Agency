interface SectionHeaderProps {
  label?: string;       // Small uppercase eyebrow label
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  className?: string;
}

export default function SectionHeader({
  label,
  title,
  subtitle,
  align = 'left',
  className = '',
}: SectionHeaderProps) {
  const alignClasses = align === 'center' ? 'text-center items-center' : 'text-left items-start';

  return (
    <div className={`flex flex-col gap-3 ${alignClasses} ${className}`}>
      {label && (
        <span className="text-xs font-semibold uppercase tracking-[0.15em] text-neutral-500">
          {label}
        </span>
      )}
      <h2 className="text-4xl md:text-5xl font-bold text-primary leading-tight tracking-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="text-lg text-neutral-500 max-w-xl leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
