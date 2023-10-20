/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./web/index.html', './web/**/*.{vue,js,ts}'],
  plugins: [require('daisyui')],
  daisyui: {
    themes: ['light', 'dark', 'cupcake']
  }
};
