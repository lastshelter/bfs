/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: "#020b24",          // Primary Deep Navy Dark
          navyLight: "#06153b",     // Primary Deep Navy Light
          blue: "#0ba5f9",          // Bright Financial Blue
          blueDark: "#008ee3",      // Darker Financial Blue
          amber: "#e08b00",         // Brand Amber
          amberDark: "#d67d00",     // Darker Brand Amber
          white: "#ffffff",         // Pure White Contrast
        },
        primary: {
          DEFAULT: "#020b24",
          foreground: "#ffffff",
        },
        secondary: {
          DEFAULT: "#e08b00",
          foreground: "#020b24",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        display: ["var(--font-outfit)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
