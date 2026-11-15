const { fontFamily } = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        moss: "hsl(var(--moss))",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
        display: ["var(--font-sans)", ...fontFamily.sans],
        serif: ["var(--font-serif)", ...fontFamily.serif],
      },
      typography: ({ theme }) => ({
        DEFAULT: {
          css: {
            '--tw-prose-body': 'hsl(var(--foreground) / 0.88)',
            '--tw-prose-headings': 'hsl(var(--foreground))',
            '--tw-prose-links': 'hsl(var(--foreground))',
            '--tw-prose-bold': 'hsl(var(--foreground))',
            '--tw-prose-code': 'hsl(var(--foreground))',
            '--tw-prose-quotes': 'hsl(var(--foreground) / 0.88)',
            '--tw-prose-quote-borders': 'hsl(var(--border))',
            '--tw-prose-hr': 'hsl(var(--border))',
            '--tw-prose-invert-body': 'hsl(var(--foreground) / 0.88)',
            '--tw-prose-invert-headings': 'hsl(var(--foreground))',
            '--tw-prose-invert-links': 'hsl(var(--foreground))',
            '--tw-prose-invert-bold': 'hsl(var(--foreground))',
            '--tw-prose-invert-code': 'hsl(var(--foreground))',
            '--tw-prose-invert-quotes': 'hsl(var(--foreground) / 0.88)',
            '--tw-prose-invert-quote-borders': 'hsl(var(--border))',
            '--tw-prose-invert-hr': 'hsl(var(--border))',
            fontFamily: theme('fontFamily.serif').join(', '),
            fontSize: '1.0625rem',
            lineHeight: '1.7',
            'h1, h2, h3, h4': {
              fontFamily: theme('fontFamily.sans').join(', '),
              letterSpacing: '-0.01em',
              fontWeight: '600',
            },
            h1: { fontSize: '2.25rem', lineHeight: '1.1', marginBottom: '1.5rem' },
            a: {
              textDecorationColor: 'hsl(var(--muted-foreground) / 0.6)',
              textUnderlineOffset: '3px',
              '&:hover': { textDecorationColor: 'hsl(var(--moss))' },
            },
            'code::before': { content: 'none' },
            'code::after': { content: 'none' },
            code: {
              fontWeight: '400',
              fontSize: '0.9em',
              background: 'hsl(var(--muted))',
              padding: '0.1em 0.35em',
              borderRadius: '0.25rem',
            },
            pre: {
              background: 'hsl(var(--code))',
              color: '#c9d1d9',
              borderRadius: 'var(--radius)',
              padding: '1rem 1.25rem',
              fontSize: '0.875rem',
              lineHeight: '1.6',
            },
            'pre code': { background: 'none', padding: '0', fontSize: 'inherit' },
          },
        },
      }),
    },
  },
  plugins: [
    require("@tailwindcss/typography"),
    require("tailwindcss-animate"),
  ],
}
