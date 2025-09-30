import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // CSS-Variablen sauber eingebunden
        brand: {
          primary: "hsl(var(--brand-primary))",
          secondary: "hsl(var(--brand-secondary))",
          accent: "hsl(var(--brand-accent))",
        },
        text: {
          base: "hsl(var(--text-base))",
          muted: "hsl(var(--text-muted))",
          inverted: "hsl(var(--text-inverted))",
        },
        bg: {
          base: "hsl(var(--bg-base))",
          soft: "hsl(var(--bg-soft))",
          strong: "hsl(var(--bg-strong))",
        },
      },
      fontFamily: {
        // z. B. via @font-face oder Google Fonts
        sans: ["'Open Sans'", "system-ui", "sans-serif"],
      },
      spacing: {
        // optionale Custom-Scale
        18: "4.5rem",
      },
    },
  },
  plugins: [],
} satisfies Config;
