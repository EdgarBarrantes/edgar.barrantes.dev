module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,md,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,md,mdx}",
  ],
  darkMode: "class",

  theme: {
    extend: {},
    fontFamily: {
      sans: ["ui-sans-serif", "system-ui"],
      main: ["Rubik, sans-serif"],
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
