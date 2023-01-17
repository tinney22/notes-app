/** @type {import('tailwindcss').Config} */
const colors = require('tailwindcss/colors')

module.exports = {
  mode: 'jit',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'bg0': "url('./img/backgrounds/bg0.jpg')",
        'bg1': "url('./img/backgrounds/bg1.jpg')",
        'bg2': "url('./img/backgrounds/bg2.jpg')",
        'bg3': "url('./img/backgrounds/bg3.jpg')",
        'bg4': "url('./img/backgrounds/bg4.jpg')",
        'bg5': "url('./img/backgrounds/bg5.jpg')",
        'bg6': "url('./img/backgrounds/bg6.jpg')",
        'bg7': "url('./img/backgrounds/bg7.jpg')",
        'bg8': "url('./img/backgrounds/bg8.jpg')",
        'bg9': "url('./img/backgrounds/bg9.jpg')",

        'bg0-sm': "url('./img/bg-img/bg0.png')",
        'bg1-sm': "url('./img/bg-img/bg1.png')",
        'bg2-sm': "url('./img/bg-img/bg2.png')",
        'bg3-sm': "url('./img/bg-img/bg3.png')",
        'bg4-sm': "url('./img/bg-img/bg4.png')",
        'bg5-sm': "url('./img/bg-img/bg5.png')",
        'bg6-sm': "url('./img/bg-img/bg6.png')",
        'bg7-sm': "url('./img/bg-img/bg7.png')",
        'bg8-sm': "url('./img/bg-img/bg8.png')",
        'bg9-sm': "url('./img/bg-img/bg9.png')",
      },
      colors: {
        // MAKE SURE TO CHANGE VARIABLE COLOR IN CSS FILE IF NEEDED

        'primary': '#ef4444',
        'primarySelected': '#991b1b'
      }
    },
    boxShadow: {
      blurred: "0px 0px 15px black"
    },
  },
  plugins: [],
}
