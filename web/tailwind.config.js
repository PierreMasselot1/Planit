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
        secondary: {
          100: "#6C7A8C",
          200: "#57667A",
          300: "#425268",
          400: "#2D3E56",
          500: "#242F40",
          600: "#1D2331",
          700: "#161A21",
          800: "#0F1111",
          900: "#080808",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
