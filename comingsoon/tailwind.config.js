// tailwind.config.js
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3FA9F5', // Example primary color
        secondary: '#000000' // Example secondary color
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'], // Example custom sans-serif font
        serif: ['Merriweather', 'serif'] // Example custom serif font
      }
    },
  },
  plugins: [],
}
