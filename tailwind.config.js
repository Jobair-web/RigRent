const c = (v) => `rgb(var(--${v}) / <alpha-value>)`;

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        background: c("background"),
        card: c("card"),
        border: c("border"),
        foreground: c("foreground"),
        muted: c("muted"),
        primary: c("primary"),
        "primary-fg": c("primary-fg"),
        tint: c("tint"),
        navy: c("navy"),
        accent: c("accent"),
        success: c("success"),
      },
      fontFamily: {
        sans: ["var(--font-body)", "system-ui", "sans-serif"],
        heading: ["var(--font-heading)", "var(--font-body)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
