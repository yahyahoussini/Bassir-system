import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          teal:      '#00C9B1',
          'teal-dark':  '#00A896',
          'teal-light': '#E6FAF8',
          charcoal:  '#0D0D0D',
          slate:     '#30323A',
          stone:     '#828394',
          cloud:     '#EBECF0',
          white:     '#FFFFFF',
        },
      },
      fontFamily: {
        display: ['"Big Shoulders Display"', 'sans-serif'],
        body:    ['Outfit', 'sans-serif'],
        mono:    ['"Geist Mono"', 'monospace'],
        arabic:  ['"Noto Sans Arabic"', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['7rem',   { lineHeight: '0.9',  letterSpacing: '-0.02em', fontWeight: '900' }],
        'display-lg': ['5rem',   { lineHeight: '0.9',  letterSpacing: '-0.02em', fontWeight: '900' }],
        'display-md': ['3.5rem', { lineHeight: '1',    letterSpacing: '-0.01em', fontWeight: '900' }],
        'display-sm': ['2.5rem', { lineHeight: '1.05', letterSpacing: '-0.01em', fontWeight: '700' }],
      },
      borderRadius: {
        'brand':    '12px',
        'brand-lg': '20px',
      },
      boxShadow: {
        'brand':    '0 4px 24px rgba(0, 201, 177, 0.15)',
        'brand-lg': '0 8px 48px rgba(0, 201, 177, 0.2)',
        'card':     '0 2px 16px rgba(13, 13, 13, 0.06)',
        'card-hover': '0 8px 32px rgba(13, 13, 13, 0.12)',
      },
      animation: {
        'fade-up':     'fadeUp 0.6s ease forwards',
        'fade-in':     'fadeIn 0.4s ease forwards',
        'pulse-teal':  'pulseTeal 2s ease-in-out infinite',
        'marquee':     'marquee 30s linear infinite',
        'float':       'float 3s ease-in-out infinite',
        'ping-slow':   'ping 2s cubic-bezier(0,0,0.2,1) infinite',
      },
      keyframes: {
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        pulseTeal: {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(0, 201, 177, 0.4)' },
          '50%':       { boxShadow: '0 0 0 12px rgba(0, 201, 177, 0)' },
        },
        marquee: {
          '0%':   { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%':       { transform: 'translateY(-8px)' },
        },
      },
      // Arabic-aware spacing
      spacing: {
        'section':    '6rem',
        'section-sm': '4rem',
      },
    },
  },
  plugins: [],
};

export default config;
