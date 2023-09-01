module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          100: "#FEEFB3",
          200: "#FEDD7C",
          300: "#FECA45",
          400: "#FDBB0F",
          500: "#CCA43B",
          600: "#A17D2D",
          700: "#6E4C1E",
          800: "#3B1D0F",
          900: "#0A0A0A",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
