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
        // ── Brand Palette (Light Mode - "Clean Studio") ──
        'brand-bg':        '#F8FAFC',
        'brand-bg-low':    '#F1F5F9',
        'brand-card':      '#FFFFFF',
        'brand-text':      '#1E293B',
        'brand-muted':     '#64748B',
        'brand-primary':   '#0F172A',
        'brand-secondary': '#334155',
        'brand-accent':    '#D97706',
        'brand-accent-dim':'#F59E0B',
        'brand-chip':      '#E2E8F0',
        'brand-border':    'rgba(0,0,0,0.04)',

        // ── Dark Palette (Primary - "Premium Dark") ──
        'dark-bg':        '#0B0F14',
        'dark-bg-low':    '#070A0F',
        'dark-sidebar':   '#121821',
        'dark-card':      '#181F2A',
        'dark-text':      '#F8FAFC',
        'dark-muted':     '#94A3B8',
        'dark-primary':   '#F59E0B',
        'dark-border':    'rgba(255,255,255,0.06)',

        // ── Status ──
        'success':        '#10B981',
        'error-red':      '#EF4444',
        'error-light':    '#FEE2E2',
        'warning':        '#F59E0B',
      },

      fontFamily: {
        'headline': ['Manrope', 'sans-serif'],
        'body':     ['Inter', 'sans-serif'],
        'label':    ['Inter', 'sans-serif'],
        'sans':     ['Inter', 'sans-serif'],
      },

      borderRadius: {
        'sm':  '0.375rem',
        'md':  '0.5rem',
        'lg':  '0.75rem',
        'xl':  '1rem',
        '2xl': '1.25rem',
        '3xl': '1.75rem',
        'full':'9999px',
      },

      boxShadow: {
        'card':    '0 1px 3px rgba(0,0,0,0.05), 0 1px 2px rgba(0,0,0,0.1)',
        'card-lg': '0 10px 15px -3px rgba(0,0,0,0.1), 0 4px 6px -2px rgba(0,0,0,0.05)',
        'glow':    '0 0 12px rgba(245,158,11,0.15)',
        'primary': '0 4px 12px rgba(15,23,42,0.12)',
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
