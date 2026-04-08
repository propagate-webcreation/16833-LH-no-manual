import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#11212D",
          50: "#f3f5f7",
          100: "#dde3e8",
          500: "#3a4f5e",
          900: "#11212D"
        },
        ivory: {
          DEFAULT: "#F4EFE6",
          50: "#fbf9f4",
          100: "#F4EFE6",
          200: "#e8e0cf"
        },
        ember: {
          DEFAULT: "#8C2A2A",
          500: "#8C2A2A",
          700: "#6e2020"
        },
        ink: "#11212D"
      },
      fontFamily: {
        sans: ["'Noto Sans JP'", "system-ui", "sans-serif"],
        serif: ["'Noto Serif JP'", "Georgia", "serif"],
        num: ["Inter", "system-ui", "sans-serif"]
      }
    }
  },
  plugins: []
};
export default config;
