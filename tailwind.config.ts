import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './src/app/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--accent)',
        text: 'var(--text)',
        muted: 'var(--muted)',
        surface: 'var(--bg-1)',
        'surface-low': 'var(--bg-2)',
      },
      fontFamily: {
        sans: ['var(--font-vazirmatn)', 'var(--font-inter)', 'system-ui', 'sans-serif'],
        blackfuture: ['var(--font-blackfuture)', 'sans-serif'], // فونت شما
      },
      borderRadius: {
        DEFAULT: 'var(--radius)',
        lg: 'var(--radius)',
        xl: 'var(--radius)',
      },
      minHeight: {
        touch: '44px',
      },
      minWidth: {
        touch: '44px',
      },
      typography: () => ({
        ultimateguide: {
          css: {
            '--tw-prose-body': 'var(--text)',
            '--tw-prose-headings': 'var(--text)',
            '--tw-prose-links': 'var(--accent)',
            '--tw-prose-bold': 'var(--text)',
            'h2, h3, h4': { scrollMarginTop: '6rem' },
          },
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/typography')],
};

export default config;