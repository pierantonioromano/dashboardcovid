const colors = require('tailwindcss/colors')

module.exports = {
  mode: 'jit',
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    extend: {},
	fontFamily: {
		'sans': ['Inter', 'ui-sans-serif', 'system-ui']
	}
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
