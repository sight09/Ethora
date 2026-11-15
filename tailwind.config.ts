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
        background: "#08090E",
        foreground: "#F1F5F9",
        ethora: {
          bg: "#08090E",
          card: "#0E111A",
          surface: "#141826",
          elevated: "#1C2237",
          border: "#232A42",
          "border-bright": "#3A456B",
          violet: {
            DEFAULT: "#8B5CF6",
            50: "#F5F3FF",
            100: "#EDE9FE",
            200: "#DDD6FE",
            300: "#C4B5FD",
            400: "#A78BFA",
            500: "#8B5CF6",
            600: "#7C3AED",
            700: "#6D28D9",
            800: "#5B21B6",
            900: "#4C1D95",
            glow: "rgba(139, 92, 246, 0.35)",
          },
          cyan: {
            DEFAULT: "#06B6D4",
            glow: "rgba(6, 182, 212, 0.35)",
          },
          gold: {
            DEFAULT: "#F59E0B",
            light: "#FCD34D",
          },
          emerald: {
            DEFAULT: "#10B981",
            light: "#6EE7B7",
          },
          crimson: {
            DEFAULT: "#EF4444",
            light: "#FCA5A5",
          },
          text: {
            primary: "#F8FAFC",
            secondary: "#94A3B8",
            muted: "#64748B",
            disabled: "#475569",
          },
        },
      },
      fontFamily: {
        sans: ["'Public Sans'", "var(--font-public-sans)", "system-ui", "-apple-system", "sans-serif"],
        serif: ["'Fraunces'", "var(--font-fraunces)", "Georgia", "serif"],
        mono: ["var(--font-geist-mono)", "monospace"],
      },
      boxShadow: {
        "glow-violet": "0 0 25px -5px rgba(139, 92, 246, 0.4)",
        "glow-cyan": "0 0 25px -5px rgba(6, 182, 212, 0.4)",
        "glow-gold": "0 0 25px -5px rgba(245, 158, 11, 0.4)",
        "card-glass": "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "ethora-mesh":
          "radial-gradient(at 0% 0%, rgba(139, 92, 246, 0.12) 0px, transparent 50%), radial-gradient(at 100% 100%, rgba(6, 182, 212, 0.08) 0px, transparent 50%)",
        "cyber-grid":
          "linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px)",
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
