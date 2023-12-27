/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      padding: {
        'p-100': '100%',
        
      },
      width: {
        'screen-90' : '96vw'
      }
    },
  },
  plugins: [],
}

