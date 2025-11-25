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
        sans: ['Inter', 'system-ui', 'sans-serif'],
        heading: ['Poppins', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'Liberation Mono', 'Courier New', 'monospace'],
      },
      colors: {
        brand: {
          // Primary Colors
          primary: '#329A92',      // Onebit Teal
          teal: '#329A92',         // Onebit Teal (alias)
          dark: '#343844',         // Onebit Charcoal
          light: '#5FC1B8',        // Onebit Mint
          
          // Accent Colors
          accent: '#2AD1C2',       // Aqua Pulse
          coral: '#FF6B6B',        // Coral Energy
          indigo: '#3C3F91',       // Royal Indigo
        },
        neutral: {
          // Neutral Palette
          950: '#1C1E24',          // Deep Space Gray
          900: '#343844',          // Onebit Charcoal
          700: '#3E4049',          // Slate Line
          500: '#B0B3B8',          // Cool Gray
          300: '#B0B3B8',          // Cool Gray (alias)
          100: '#F5F7F8',          // Off-White
          50: '#F9FAFB',           // Soft White
        },
        surface: {
          DEFAULT: '#F9FAFB',      // Soft White
          dark: '#1C1E24',         // Deep Space Gray
          light: '#F5F7F8',        // Off-White
        },
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #329A92 0%, #3C3F91 100%)',
        'gradient-light': 'linear-gradient(135deg, #5FC1B8 0%, #329A92 100%)',
        'gradient-dark': 'linear-gradient(135deg, #1C1E24 0%, #343844 100%)',
      },
      borderRadius: {
        xl: '1.5rem',
        lg: '1rem',
      },
      boxShadow: {
        card: '0 24px 60px rgba(13, 20, 38, 0.2)',
        soft: '0 12px 30px rgba(15, 23, 36, 0.12)',
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
