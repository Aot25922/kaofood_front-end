module.exports = {
  purge: { content: [ './public/**/*.html','./src/**/*.vue', ] },
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      fire: {
        lightest: "#F8C6C6",
        lighter: '#F7B267',
        light: '#F79D65',
        DEFAULT: '#F4845F',
        dark: '#F27059',
        darker: '#F25C54',
        darkest: "#F14A41"
      },
      black: "#000000",
      white: "#FFFFFF",
      red: "#B91C1C",
      blue: {
        light: "#3B82F6",
        DEFAULT: "#1D4ED8"
      },
      gray: {
        DEFAULT: "#9CA3AF",
        dark: "#6B7280",
      },
      salmon: "#ffd1b3",
      yellow: "##F59E0B",
      green: "#10B981"
    },
    // !If fill this config other text size won't work 
    // fontSize:{
    //   'huge': ['10rem', '1']
    // },
    fontFamily: {
      'writing': 'Allison, cursive'
    }
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    themes: [
      {
      'mytheme': {                          /* your theme name */
        'primary' : '#F27059',           /* Primary color */
        'primary-focus' : '#F25C54',     /* Primary color - focused */
        'primary-content' : '#ffffff',   /* Foreground content color to use on primary color */

        'secondary' : '#F79D65',         /* Secondary color */
        'secondary-focus' : '#F4845F',   /* Secondary color - focused */
        'secondary-content' : '#ffffff', /* Foreground content color to use on secondary color */

        'accent' : '#F7B267',            /* Accent color */
        'accent-focus' : '#F9C48B',      /* Accent color - focused */
        'accent-content' : '#ffffff',    /* Foreground content color to use on accent color */

        'neutral' : '#37cdbe',           /* Neutral color */
        'neutral-focus' : '#2aa79b',     /* Neutral color - focused */
        'neutral-content' : '#ffffff',   /* Foreground content color to use on neutral color */

        'base-100' : '#ffffff',          /* Base color of page, used for blank backgrounds */
        'base-200' : '#f9fafb',          /* Base color, a little darker */
        'base-300' : '#d1d5db',          /* Base color, even more darker */
        'base-content' : '#1f2937',      /* Foreground content color to use on base color */

        'info' : '#2094f3',              /* Info */
        'success' : '#009485',           /* Success */
        'warning' : '#ff9900',           /* Warning */
        'error' : '#ff5724',             /* Error */
     },
    }
    ],
  },
}
