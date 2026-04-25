module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
       fontFamily: {
        inter: ['Inter', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
        outfit: ['Outfit', 'sans-serif'],
        space: ['"Space Grotesk"', 'sans-serif'],
        playfair: ['"Playfair Display"', 'serif'],
        bebas: ['"Bebas Neue"', 'sans-serif'],
      },
    },
  },
  plugins: [],
};