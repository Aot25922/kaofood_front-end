module.exports = {
  purge: { content: ['./public/**/*.html', './src/**/*.vue'] },
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      fire: {
        lighter: '#F7B267',
        light: '#F79D65',
        DEFAULT: '#F4845F',
        dark: '#F27059',
        darker: '#F25C54'
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('daisyui'),
  ],
  daisyui: {
    themes: [
      'cupcake',
    ],
  },
}
