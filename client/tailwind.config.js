/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./index.html",
    "./src/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      aspectRatio:{
        '2/3' : '2/3'
      },
      colors: {
        'blockbuster-yellow' : '#FFD100',
        'blockbuster-blue' : '#002163',
      },
      rotate: {
        '355': '355deg',
      },
      fontFamily: {
        sans: ["Helvetica", "Arial", "sans-serif"],
        myfont: ['"roboto"'],
        itcmachine:["itcmachine"]
      },
    },
  },
  plugins: [require("daisyui")],
};
