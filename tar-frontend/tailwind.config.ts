import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        heart: "var(--font-heart)",
        motter: "var(--font-motter)",
        alumni: "var(--font-alumni)",
      },
      colors: {
        main: {
          primary: "#EBA13D",
          primaryBright: "#FFC823",
          secondary: "B42638",
          light: "#EFE1D9",
          navy: "#191D46",
          moss: "#003B2D",
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
