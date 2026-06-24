/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{ts,tsx,js,jsx}'],
  theme: {
    extend: {
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '1.25rem',
          lg: '1.5rem',
        },
        screens: {
          xl: '1320px',
          '2xl': '1440px',
        },
      },
      fontFamily: {
        // Body / UI — warm, humanist, tall x-height
        sans: ['"Plus Jakarta Sans"', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
        // Display / headings — engineered, wide, geometric-humanist
        heading: ['Sora', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
        display: ['Sora', 'system-ui', 'sans-serif'],
        // Mono accent — the "bit" texture
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
      colors: {
        // ---- Onebit Indigo (master brand) ----
        indigo: {
          50: '#EEEDFB',
          100: '#DAD6F7',
          300: '#A99FEF',
          500: '#5A4FE0',
          600: '#4A3FCB',
          700: '#392FA6',
          900: '#231C66',
        },
        // ---- Onebit Gold (action / energy — always ink text) ----
        gold: {
          300: '#FFD98A',
          400: '#FFC247',
          500: '#F5A623',
          600: '#D8860B',
        },
        // ---- Emerald (Learn / growth) ----
        emerald: {
          400: '#3BD39A',
          500: '#13B97A',
          600: '#0E9A65',
        },
        // ---- Ink + slate neutrals ----
        ink: {
          950: '#0B0E1A',
          900: '#12172A',
          800: '#1A2138',
        },
        slate: {
          700: '#33415C',
          500: '#64748B',
          300: '#CBD3E1',
          100: '#EEF1F7',
        },
        paper: {
          50: '#F9FAFC',
        },

        // ---- Brand namespace (remapped to indigo/gold/emerald) ----
        // Kept so existing `brand-*` utilities across the app re-skin automatically.
        brand: {
          primary: '#5A4FE0',   // indigo-500 (was teal)
          teal: '#5A4FE0',      // alias → indigo
          strong: '#4A3FCB',    // indigo-600
          dark: '#12172A',      // ink-900 (was charcoal)
          light: '#A99FEF',     // indigo-300
          accent: '#13B97A',    // emerald (Learn / growth signal)
          coral: '#E5484D',     // error red (functional)
          indigo: '#5A4FE0',
          warm: '#F5A623',      // gold action
          gold: '#F5A623',
          emerald: '#13B97A',
        },
        // Arm accents
        arm: {
          build: '#5A4FE0',
          learn: '#13B97A',
          bridge: '#F5A623',
        },
        // Accent namespace (mega-menu featured sections) → new palette
        accent: {
          aqua: '#13B97A',      // Learn highlights → emerald
          indigo: '#5A4FE0',    // Bridge/Build highlights → indigo
          amber: '#F5A623',     // warm accents → gold
        },
        neutral: {
          950: '#0B0E1A',       // ink-950
          900: '#12172A',       // ink-900
          800: '#1A2138',
          700: '#33415C',       // slate-700 (body on light)
          500: '#64748B',       // slate-500 (muted)
          400: '#8A96AE',
          300: '#CBD3E1',       // slate-300 (borders)
          200: '#E2E8F2',       // border-soft
          100: '#EEF1F7',       // slate-100 (light sections)
          50: '#F9FAFC',        // paper-50 (page bg)
        },
        surface: {
          DEFAULT: '#F9FAFC',
          dark: '#0B0E1A',
          light: '#EEF1F7',
          card: '#FFFFFF',
        },
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #392FA6 0%, #5A4FE0 55%, #13B97A 100%)',
        'gradient-brand': 'linear-gradient(135deg, #392FA6 0%, #5A4FE0 55%, #13B97A 100%)',
        'gradient-light': 'linear-gradient(135deg, #5A4FE0 0%, #13B97A 100%)',
        'gradient-dark': 'linear-gradient(135deg, #0B0E1A 0%, #12172A 100%)',
        'gradient-spark': 'radial-gradient(circle at 70% 30%, rgba(245,166,35,.35), transparent 45%)',
        'dot-grid': 'radial-gradient(currentColor 1.1px, transparent 1.1px)',
      },
      borderRadius: {
        sm: '0.5rem',   // 8px
        md: '0.75rem',  // 12px (buttons)
        lg: '1rem',     // 16px (cards)
        xl: '1.25rem',  // 20px (large cards/panels)
      },
      boxShadow: {
        sm: '0 1px 2px rgba(18,23,42,.06), 0 1px 3px rgba(18,23,42,.05)',
        md: '0 4px 12px rgba(18,23,42,.07), 0 2px 4px rgba(18,23,42,.05)',
        lg: '0 16px 40px rgba(18,23,42,.10), 0 4px 12px rgba(18,23,42,.06)',
        card: '0 16px 40px rgba(18,23,42,.10), 0 4px 12px rgba(18,23,42,.06)',
        soft: '0 4px 12px rgba(18,23,42,.07), 0 2px 4px rgba(18,23,42,.05)',
        'glow-indigo': '0 0 0 1px rgba(90,79,224,.35), 0 12px 40px rgba(90,79,224,.22)',
        'glow-emerald': '0 0 0 1px rgba(19,185,122,.35), 0 12px 40px rgba(19,185,122,.18)',
        'glow-gold': '0 8px 24px rgba(245,166,35,.32)',
      },
      letterSpacing: {
        eyebrow: '0.22em',
      },
      transitionTimingFunction: {
        'ease-out-soft': 'cubic-bezier(.16,1,.3,1)',
        brand: 'cubic-bezier(.22,.61,.36,1)',
      },
      keyframes: {
        floaty: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
      },
      animation: {
        floaty: 'floaty 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
