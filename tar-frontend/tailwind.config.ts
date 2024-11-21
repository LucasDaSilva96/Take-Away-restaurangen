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
          secondary: "#B42638",
          secondaryLight: "#c23c48",
          light: "#EFE1D9",
          navy: "#191D46",
          moss: "#003B2D",
        },
      },
      backgroundImage: {
        "noise-pattern": "url('/noise.png')",
      },
      backgroundPosition: {
        "50": "50%",
      },
      animation: {
        noise: "noise 2s steps(2) infinite",
      },
      keyframes: {
        noise: {
          "0%": { transform: "translate3d(0, 9rem, 0)" },
          "10%": { transform: "translate3d(-1rem, -4rem, 0)" },
          "20%": { transform: "translate3d(-8rem, 2rem, 0)" },
          "30%": { transform: "translate3d(9rem, -9rem, 0)" },
          "40%": { transform: "translate3d(-2rem, 7rem, 0)" },
          "50%": { transform: "translate3d(-9rem, -4rem, 0)" },
          "60%": { transform: "translate3d(2rem, 6rem, 0)" },
          "70%": { transform: "translate3d(7rem, -8rem, 0)" },
          "80%": { transform: "translate3d(-9rem, 1rem, 0)" },
          "90%": { transform: "translate3d(6rem, -5rem, 0)" },
          "100%": { transform: "translate3d(-7rem, 0, 0)" },
        },
      },
      zIndex: {
        inf: "999999",
      },
    },
  },
  plugins: [],
} satisfies Config;
