module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx,md}",
    "./components/**/*.{js,ts,jsx,tsx,mdx,md}",
  ],
  darkMode: "class",
  purge: [
    "./components/**/*.{js,ts,jsx,tsx,mdx,md}",
    "./pages/**/*.{js,ts,jsx,tsx,md,mdx}",
  ],

  theme: {
    extend: {},
    fontFamily: {
      sans: ["ui-sans-serif", "system-ui"],
      main: ["Helvetica"],
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
