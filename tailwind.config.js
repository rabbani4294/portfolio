/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        midnight: "#05070D",
        navy: "#0A1020",
        electric: "#2563EB",
        cyan: { DEFAULT: "#22D3EE" },
        ice: "#F8FAFC",
        slate: { 400: "#94A3B8" },
      },
      fontFamily: {
        display: ['"Unbounded Variable"', "ui-sans-serif", "system-ui", "sans-serif"],
        sans: ['"Manrope Variable"', "ui-sans-serif", "system-ui", "-apple-system", "Segoe UI", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 40px -8px rgba(37,99,235,0.55)",
        "glow-cyan": "0 0 32px -6px rgba(34,211,238,0.45)",
      },
      keyframes: {
        floaty: {
          "0%,100%": { transform: "translate3d(0,0,0)" },
          "50%": { transform: "translate3d(0,-10px,0)" },
        },
        sweep: {
          "0%": { transform: "translateX(-120%)" },
          "100%": { transform: "translateX(220%)" },
        },
      },
      animation: {
        floaty: "floaty 6s ease-in-out infinite",
        sweep: "sweep 2.4s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
