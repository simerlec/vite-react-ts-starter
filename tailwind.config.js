const colors = require("windicss/colors");

module.exports = {
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      animation: {
        "spin-slow": "spin 20s linear infinite",
      },
      colors: {
        teal: colors.teal,
      },
    },
  },
  plugins: [],
};
