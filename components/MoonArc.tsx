'use client';

/**
 * The site's signature element: a crescent arc that fills clockwise based
 * on real progress (XP toward next level, by default). Used small in the
 * nav as the brand mark, and larger on the profile page as an actual
 * progress ring — same component, same meaning, two sizes.
 */
export default function MoonArc({
  progress = 0.35,
  size = 40,
  label,
}: {
  progress?: number; // 0..1
  size?: number;
  label?: string;
}) {
  const stroke = Math.max(2, size * 0.08);
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - Math.min(1, Math.max(0, progress)));

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="animate-drift">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="rgba(245,243,255,0.08)"
          strokeWidth={stroke}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="url(#moonGradient)"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          transform={`rotate(-90 ${size / 2} ${size / 2})`}
          className="transition-[stroke-dashoffset] duration-700 ease-out"
        />
        <defs>
          <linearGradient id="moonGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#B4A9FA" />
            <stop offset="100%" stopColor="#8B7CF6" />
          </linearGradient>
        </defs>
      </svg>
      <div
        className="absolute rounded-full bg-moonviolet/20 animate-pulseGlow"
        style={{ width: size * 0.4, height: size * 0.4 }}
      />
      {label && (
        <span className="absolute -bottom-5 text-[10px] text-text-lo font-mono whitespace-nowrap">
          {label}
        </span>
      )}
    </div>
  );
}
