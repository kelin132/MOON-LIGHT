import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        void: '#0A0A12',
        surface: '#12121C',
        surface2: '#191926',
        moonviolet: {
          DEFAULT: '#8B7CF6',
          light: '#B4A9FA',
          dark: '#6555D9',
        },
        moongold: '#D4C9A8',
        'text-hi': '#F5F3FF',
        'text-lo': '#8B8AA3',
        border: 'rgba(245,243,255,0.08)',
        danger: '#E5637A',
        success: '#6FCF97',
      },
      fontFamily: {
        display: ['var(--font-fraunces)', 'serif'],
        body: ['var(--font-manrope)', 'sans-serif'],
        mono: ['var(--font-jbmono)', 'monospace'],
      },
      backgroundImage: {
        'moon-glow': 'radial-gradient(circle at 50% 0%, rgba(139,124,246,0.18), transparent 60%)',
        'card-sheen': 'linear-gradient(135deg, rgba(255,255,255,0.06), rgba(255,255,255,0.01))',
      },
      boxShadow: {
        glass: '0 8px 32px rgba(0,0,0,0.35)',
        glow: '0 0 24px rgba(139,124,246,0.35)',
      },
      keyframes: {
        drift: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '1' },
        },
      },
      animation: {
        drift: 'drift 6s ease-in-out infinite',
        pulseGlow: 'pulseGlow 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};

export default config;
