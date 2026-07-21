import clsx from 'clsx';

export default function GlassCard({
  children,
  className,
  hover = true,
}: {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}) {
  return (
    <div
      className={clsx(
        'glass-card p-6',
        hover && 'transition-all duration-300 hover:border-moonviolet/40 hover:shadow-glow',
        className
      )}
    >
      {children}
    </div>
  );
}
