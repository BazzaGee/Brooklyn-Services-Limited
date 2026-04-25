/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#CD5C5C',
          container: '#e28c8c',
          fixed: '#9f393b',
          'fixed-dim': '#bf5152',
          'on-primary': '#ffffff',
        },
        surface: {
          DEFAULT: '#fcf9f8',
          bright: '#ffffff',
          dim: '#e5e2e1',
          'container-lowest': '#ffffff',
          'container-low': '#f6f3f2',
          container: '#f0eded',
          'container-high': '#eae7e7',
          'container-highest': '#e5e2e1',
          tint: '#564241',
        },
        background: '#fcf9f8',
        foreground: '#1b1b1c',
        muted: {
          DEFAULT: '#f6f3f2',
          foreground: '#564241',
        },
        accent: {
          DEFAULT: '#f0eded',
          foreground: '#1b1b1c',
        },
        destructive: {
          DEFAULT: '#9f393b',
          foreground: '#ffffff',
        },
        border: '#ddc0be',
        input: '#ddc0be',
        ring: '#CD5C5C',
        outline: '#897170',
        'outline-variant': '#ddc0be',
        'on-surface': '#1b1b1c',
        'on-surface-variant': '#564241',
        secondary: {
          DEFAULT: '#5f5e5e',
          foreground: '#ffffff',
        },
        inverse: {
          surface: '#1b1b1c',
          'on-surface': '#f3f0ef',
        },
      },
      fontFamily: {
        headline: ['Space Grotesk', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        label: ['Space Grotesk', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '0.25rem',
        lg: '0.25rem',
        xl: '0.75rem',
        full: '9999px',
      },
      animation: {
        'fade-in-up': 'fadeInUp 0.8s ease-out forwards',
        'slide-in-right': 'slideInRight 0.8s cubic-bezier(0.2, 0, 0, 1) forwards',
        'block-pop': 'blockPop 0.4s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        'scale-in': 'scaleIn 0.3s ease-out forwards',
      },
      keyframes: {
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideInRight: {
          '0%': { opacity: '0', transform: 'translateX(30px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        blockPop: {
          '0%': { transform: 'scale(0.98)' },
          '100%': { transform: 'scale(1)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
      },
      boxShadow: {
        'ambient': '0 20px 40px rgba(27, 27, 28, 0.06)',
        'modular': '8px 8px 0px rgba(205, 92, 92, 0.15)',
        'glass': '0 8px 32px rgba(27, 27, 28, 0.08)',
      },
      backdropBlur: {
        glass: '12px',
      },
    },
  },
  plugins: [],
};
