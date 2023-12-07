/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blackish: "#020104",
        pinkish: "#CF006F",
        whiteish: "#F9DEF2",
        blueish: "#0000FF",
        orangeish: "#FE5E55",
      },
      backgroundImage: {
        'home-desktop': "url('/src/assets/background_images/home_desktop.png')",
        'home-mobile': "url('/src/assets/background_images/home_desktop.png')",
      },
    },
  },
  plugins: [],
}