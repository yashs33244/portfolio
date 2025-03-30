import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}", "*.{js,ts,jsx,tsx,mdx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
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
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        amber: {
          DEFAULT: '#ffbe0b',
          100: '#352700',
          200: '#6a4e00',
          300: '#9f7500',
          400: '#d49c00',
          500: '#ffbe0b',
          600: '#ffcb3b',
          700: '#ffd86c',
          800: '#ffe59d',
          900: '#fff2ce'
        },
        orange: {
          DEFAULT: '#fb5607',
          100: '#331101',
          200: '#662202',
          300: '#9a3202',
          400: '#cd4303',
          500: '#fb5607',
          600: '#fc773a',
          700: '#fd996b',
          800: '#febb9d',
          900: '#feddce'
        },
        rose: {
          DEFAULT: '#ff006e',
          100: '#330016',
          200: '#66002c',
          300: '#990042',
          400: '#cc0058',
          500: '#ff006e',
          600: '#ff338b',
          700: '#ff66a8',
          800: '#ff99c5',
          900: '#ffcce2'
        },
        blueviolet: {
          DEFAULT: '#8338ec',
          100: '#190535',
          200: '#320a6a',
          300: '#4b0fa0',
          400: '#6414d5',
          500: '#8338ec',
          600: '#9b5ef0',
          700: '#b487f4',
          800: '#cdaff8',
          900: '#e6d7fb'
        },
        azure: {
          DEFAULT: '#3a86ff',
          100: '#00183e',
          200: '#00307c',
          300: '#0048bb',
          400: '#005ff9',
          500: '#3a86ff',
          600: '#609dff',
          700: '#88b5ff',
          800: '#afceff',
          900: '#d7e6ff'
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      typography: () => ({
        DEFAULT: {
          css: {
            maxWidth: '100ch',
            color: 'var(--tw-prose-body)',
            '[class~="lead"]': {
              color: 'var(--tw-prose-lead)',
            },
            a: {
              color: 'var(--tw-prose-links)',
              textDecoration: 'underline',
              fontWeight: '500',
            },
            strong: {
              color: 'var(--tw-prose-bold)',
              fontWeight: '600',
            },
            'a strong': {
              color: 'inherit',
            },
            'blockquote strong': {
              color: 'inherit',
            },
            'thead strong': {
              color: 'inherit',
            },
            'ol > li::marker': {
              color: 'var(--tw-prose-counters)',
              fontWeight: '400',
            },
            'ul > li::marker': {
              color: 'var(--tw-prose-bullets)',
            },
            hr: {
              borderColor: 'var(--tw-prose-hr)',
              borderTopWidth: 1,
            },
            blockquote: {
              fontWeight: '500',
              fontStyle: 'italic',
              color: 'var(--tw-prose-quotes)',
              borderLeftWidth: '0.25rem',
              borderLeftColor: 'var(--tw-prose-quote-borders)',
              quotes: '"\\201C""\\201D""\\2018""\\2019"',
            },
            'blockquote p:first-of-type::before': {
              content: 'open-quote',
            },
            'blockquote p:last-of-type::after': {
              content: 'close-quote',
            },
            'h1': {
              color: 'var(--tw-prose-headings)',
              fontWeight: '800',
              fontSize: 'var(--tw-prose-h1-size)',
              lineHeight: 'var(--tw-prose-h1-line-height)',
              letterSpacing: 'var(--tw-prose-h1-letter-spacing)',
            },
            'h2': {
              color: 'var(--tw-prose-headings)',
              fontWeight: '700',
              fontSize: 'var(--tw-prose-h2-size)',
              lineHeight: 'var(--tw-prose-h2-line-height)',
              letterSpacing: 'var(--tw-prose-h2-letter-spacing)',
            },
            'h3': {
              color: 'var(--tw-prose-headings)',
              fontWeight: '600',
              fontSize: 'var(--tw-prose-h3-size)',
              lineHeight: 'var(--tw-prose-h3-line-height)',
              letterSpacing: 'var(--tw-prose-h3-letter-spacing)',
            },
            'h4': {
              color: 'var(--tw-prose-headings)',
              fontWeight: '600',
              fontSize: 'var(--tw-prose-h4-size)',
              lineHeight: 'var(--tw-prose-h4-line-height)',
              letterSpacing: 'var(--tw-prose-h4-letter-spacing)',
            },
            code: {
              color: 'var(--tw-prose-code)',
              fontWeight: '600',
              fontSize: '0.875em',
            },
            'code::before': {
              content: '"`"',
            },
            'code::after': {
              content: '"`"',
            },
            'a code': {
              color: 'inherit',
            },
            'h1 code': {
              color: 'inherit',
            },
            'h2 code': {
              color: 'inherit',
            },
            'h3 code': {
              color: 'inherit',
            },
            'h4 code': {
              color: 'inherit',
            },
            'blockquote code': {
              color: 'inherit',
            },
            'thead code': {
              color: 'inherit',
            },
            pre: {
              color: 'var(--tw-prose-pre-code)',
              backgroundColor: 'var(--tw-prose-pre-bg)',
              overflowX: 'auto',
              fontWeight: '400',
              fontSize: '0.875em',
              lineHeight: '1.7142857',
              borderRadius: '0.375rem',
              paddingTop: '0.8571429em',
              paddingRight: '1.1428571em',
              paddingBottom: '0.8571429em',
              paddingLeft: '1.1428571em',
            },
            'pre code': {
              backgroundColor: 'transparent',
              borderWidth: '0',
              borderRadius: '0',
              padding: '0',
              fontWeight: 'inherit',
              color: 'inherit',
              fontSize: 'inherit',
              fontFamily: 'inherit',
              lineHeight: 'inherit',
            },
            'pre code::before': {
              content: 'none',
            },
            'pre code::after': {
              content: 'none',
            },
          },
        },
      }),
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
} satisfies Config;

export default config;

