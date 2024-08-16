import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/containers/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        nanum: ["var(--font-nanumSquare)", "sans-serif"],
      },
      screens: {
        "mobile": "375px",
        "tablet": "744px",
        "desktop": "1920px"
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      colors: {
        slate: {
          900: "#0F172A",
          800: "#1E293B",
          500: "#64748B",
          400: "#94A3B8",
          300: "#CBD5E1",
          200: "#E2E8F0",
          100: "#F1F5F9",
        },
        violet: {
          600: "#7C3AED",
          100: "#EDE9FE",
        },
        rose: {
          500: "#F43F5E",
        },
        lime: {
          300: "#BEF264",
        },
        amber: {
          800: "#92400E",
        },
      },
    },
  },
  plugins: [],
};
export default config;
