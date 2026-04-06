/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',   // <-- Tailwind flips styles when <html class="dark">
  theme: {
    extend: {
      colors: {
        // ── Light palette (overridden individually via dark: prefix in JSX) ──
        'brand-bg':        '#f5f7fa',
        'brand-bg-low':    '#eef1f5',
        'brand-card':      '#ffffff',
        'brand-text':      '#0d1b2a',
        'brand-muted':     '#586377',
        'brand-primary':   '#002045',
        'brand-secondary': '#1a365d',
        'brand-accent':    '#00b47d',
        'brand-accent-dim':'#4edea3',
        'brand-chip':      '#d5e0f7',
        'brand-border':    'rgba(0,0,0,0.07)',

        // ── Dark palette ──
        'dark-bg':        '#0b1622',
        'dark-bg-low':    '#061122',
        'dark-card':      '#112240',
        'dark-text':      '#e8f0fe',
        'dark-muted':     '#8caccc',
        'dark-primary':   '#adc7f7',
        'dark-border':    'rgba(255,255,255,0.08)',

        // ── Status ──
        'success':        '#00b47d',
        'error-red':      '#ba1a1a',
        'error-light':    '#ffdad6',
        'warning':        '#f59e0b',
      },

      fontFamily: {
        'headline': ['Manrope', 'sans-serif'],
        'body':     ['Inter', 'sans-serif'],
        'label':    ['Inter', 'sans-serif'],
        'sans':     ['Inter', 'sans-serif'],
      },

      borderRadius: {
        'sm':  '0.25rem',
        'md':  '0.375rem',
        'lg':  '0.5rem',
        'xl':  '0.75rem',
        '2xl': '1rem',
        '3xl': '1.5rem',
        'full':'9999px',
      },

      boxShadow: {
        'card':    '0 2px 12px rgba(0,0,0,0.06)',
        'card-lg': '0 8px 32px rgba(0,0,0,0.10)',
        'glow':    '0 0 16px rgba(0,180,125,0.25)',
        'primary': '0 8px 24px rgba(0,32,69,0.18)',
      },

      animation: {
        'fade-in':  'fadeIn 0.35s ease-out',
        'slide-up': 'slideUp 0.35s ease-out',
      },

      keyframes: {
        fadeIn:  { '0%': { opacity: '0' },                                 '100%': { opacity: '1' } },
        slideUp: { '0%': { transform: 'translateY(10px)', opacity: '0' }, '100%': { transform: 'translateY(0)', opacity: '1' } },
      },

      spacing: {
        '4.5': '1.125rem',
        '18':  '4.5rem',
        '22':  '5.5rem',
      },
    },
  },
  plugins: [],
}
