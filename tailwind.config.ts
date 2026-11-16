import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "#0A0A12",
        foreground: "#B8B3CC",
        ethora: {
          bg: "#0A0A12",
          card: "#14111F",
          surface: "#14111F",
          elevated: "#1D192E",
          panel: "#14111F",
          border: "rgba(168, 85, 247, 0.25)",
          "border-bright": "rgba(168, 85, 247, 0.5)",
          purple: {
            DEFAULT: "#A855F7",
            glow: "rgba(168, 85, 247, 0.35)",
          },
          accent: "#A855F7",
          gold: "#F5B82E",
          rank3: "#F97316",
          positive: "#22C55E",
          negative: "#EF4444",
          text: {
            headline: "#F4F1FF",
            body: "#B8B3CC",
            muted: "#7D7896",
          },
        },
      },
      fontFamily: {
        sans: ["'Exo 2'", "sans-serif"],
        serif: ["'Exo 2'", "sans-serif"],
        mono: ["'Exo 2'", "monospace"],
        exo: ["'Exo 2'", "sans-serif"],
      },
      boxShadow: {
        "glow-violet": "0 0 25px -5px rgba(168, 85, 247, 0.4)",
        "glow-gold": "0 0 25px -5px rgba(245, 184, 46, 0.4)",
        "glow-cyan": "0 0 25px -5px rgba(6, 182, 212, 0.4)",
        "card-glass": "0 8px 32px 0 rgba(0, 0, 0, 0.45)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "ethora-mesh":
          "radial-gradient(at 0% 0%, rgba(168, 85, 247, 0.14) 0px, transparent 50%), radial-gradient(at 100% 100%, rgba(168, 85, 247, 0.08) 0px, transparent 50%)",
        "cyber-grid":
          "linear-gradient(to right, rgba(168, 85, 247, 0.04) 1px, transparent 1px), linear-gradient(to bottom, rgba(168, 85, 247, 0.04) 1px, transparent 1px)",
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float": "float 6s ease-in-out infinite",
        "shimmer": "shimmer 2.5s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
