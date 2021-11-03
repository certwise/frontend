const colors = require('tailwindcss/colors');

module.exports = {
  purge: {
    content: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
    options: {
      safelist: [
        /data-theme$/,
      ]
    },
  },
  darkMode: false, // or 'media' or 'class'
  theme: {

    extend: {
      colors: {

        blue: {
          100: '#E6F0FD',
          200: '#CCE2FC',
          300: '#99C5FA',
          400: '#66A9F7',
          500: '#338CF5',
          600: '#0070F4',
          700: '#0064DA',
          800: '#0059C2',
          900: '#004391',
        },
        teal: {
          100: '#E6FFFA',
          200: '#B2F5EA',
          300: '#81E6D9',
          400: '#4FD1C5',
          500: '#3ABAB4',
          600: '#319795',
          700: '#2C7A7B',
          800: '#285E61',
          900: '#234E52',
        },
        cyan: {
          100: colors.cyan[100],
          200: colors.cyan[200],
          300: colors.cyan[300],
          400: colors.cyan[400],
          500: colors.cyan[500],
          600: colors.cyan[600],
          700: colors.cyan[700],
          800: colors.cyan[800],
          900: colors.cyan[900],
        },
        gray: colors.blueGray,
        trueGray: colors.trueGray,
        warmGray: colors.warmGray,
        'light-blue': colors.sky,
        red: colors.rose,
      },
      boxShadow: {
        xs: '0 0 0 1px rgba(0, 0, 0, 0.16)',
        sm: '0 1px 2px 0 rgba(0, 0, 0, 0.16)',
        default: '0 1px 3px 0 rgba(0, 0, 0, 0.12), 0 1px 2px 0 rgba(0, 0, 0, 0.03)',
        md: '0 4px 6px -1px rgba(0, 0, 0, 0.04), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
        lg: '0 10px 15px -3px rgba(0, 0, 0, 0.04), 0 4px 6px -2px rgba(0, 0, 0, 0.02)',
        xl: '0 20px 25px -5px rgba(0, 0, 0, 0.12), 0 10px 10px -5px rgba(0, 0, 0, 0.02)',
        '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.15)',
        inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.04)',
        outline: '0 0 0 3px rgba(66, 153, 225, 0.5)',
        none: 'none',
      },
      spacing: {
        '9/16': '56.25%',
        '3/4': '75%',
        '1/1': '100%',
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif']
      },
      fontSize: {
        xs: '0.75rem',
        sm: '0.875rem',
        base: '1rem',
        lg: '1.125rem',
        xl: '1.25rem',
        '2xl': '1.5rem',
        '3xl': '2rem',
        '4xl': '2.625rem',
        '5xl': '3.25rem',
        '6xl': '5.5rem',
      },
      inset: {
        '1/2': '50%',
        'full': '100%',
      },
      letterSpacing: {
        tighter: '-0.02em',
        tight: '-0.01em',
        normal: '0',
        wide: '0.01em',
        wider: '0.02em',
        widest: '0.4em',
      },
      lineHeight: {
        none: '1',
        tighter: '1.125',
        tight: '1.25',
        snug: '1.375',
        normal: '1.5',
        relaxed: '1.625',
        loose: '2',
        '3': '.75rem',
        '4': '1rem',
        '5': '1.2rem',
        '6': '1.5rem',
        '7': '1.75rem',
        '8': '2rem',
        '9': '2.25rem',
        '10': '2.5rem',
      },
      minWidth: {
        '10': '2.5rem',
        '48': '12rem',
      },
      opacity: {
        '90': '0.9',
      },
      scale: {
        '98': '.98'
      },
      animation: {
        float: 'float 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)', },
          '50%': { transform: 'translateY(-5%)', },
        },
      },
      zIndex: {
        '-1': '-1',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('daisyui'),
    require('tailwind-scrollbar-hide')
  ],
  daisyui: {
    styled: true,
    themes: false,
    base: true,
    utils: true,
    logs: false,
    rtl: false,
    themes: [
      {
        mytheme: {
          'primary': colors.indigo[500],
          'primary-focus': colors.indigo[700],
          'primary-content': '#ffffff',
          'secondary': colors.cyan[400],
          'secondary-focus': colors.cyan[500],
          'secondary-content': '#444444',
          'accent': colors.sky[600],
          'accent-focus': colors.sky[800],
          'accent-content': '#343434',
          'neutral': '#3d4451',
          'neutral-focus': '#2a2e37',
          'neutral-content': '#ffffff',
          'base-100': '#ffffff',
          'base-200': '#f9fafb',
          'base-300': '#d1d5db',
          'base-content': '#1f2937',
          'info': '#2094f3',
          'success': '#009485',
          'warning': '#ff9900',
          'warning-focus': '#ff8800',
          'error': '#ff5724',
        },
      }
    ],
  }
}
