module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  mode: 'jit',
  theme: {
    extend: {
      container: {
        padding: {
          DEFAULT: '1rem',
          sm: '1rem'
        },
      },
      gridAutoColumns: {
        '2fr': 'repeat(2, auto)',
      }        
    },
  },
  plugins: [],
}