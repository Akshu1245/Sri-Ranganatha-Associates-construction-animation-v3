import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand palette — drawn from Sri Ranganatha Associates flyer (deep navy, amber, warm paper)
        navy: {
          50: "#EEF2F8",
          100: "#D5DEEC",
          200: "#A6B7D2",
          300: "#7791B8",
          400: "#4E6E9E",
          500: "#2B4D80",
          600: "#1B3A6B", // PRIMARY — blueprint navy
          700: "#163057",
          800: "#0F2543",
          900: "#091830",
          950: "#040C1C",
        },
        amber: {
          50: "#FDF8E8",
          100: "#FAEEC2",
          200: "#F4D77F",
          300: "#EDC04D",
          400: "#E8A020", // ACCENT — construction amber
          500: "#D08A12",
          600: "#A86C0B",
          700: "#7C4F08",
        },
        paper: {
          50: "#FBF9F4",
          100: "#F8F6F2", // BACKGROUND — warm off-white
          200: "#EFEAE0",
          300: "#E5E0D8", // BORDER
          400: "#C8C0AE",
        },
        ink: {
          900: "#1A1A1A", // Text
          700: "#3D3D3D",
          500: "#6B7280", // Muted
          300: "#A3A3A3",
        },
        success: {
          500: "#16A34A", // Sanction approved green
        },
      },
      fontFamily: {
        display: ['"Playfair Display"', "serif"],
        sans: ['"Inter"', "sans-serif"],
        mono: ['"JetBrains Mono"', "monospace"],
      },
      backgroundImage: {
        "blueprint-grid":
          "linear-gradient(rgba(27,58,107,0.08) 1px, transparent 1px), linear-gradient(90deg, rgba(27,58,107,0.08) 1px, transparent 1px)",
        "blueprint-grid-dark":
          "linear-gradient(rgba(232,160,32,0.10) 1px, transparent 1px), linear-gradient(90deg, rgba(232,160,32,0.10) 1px, transparent 1px)",
        "blueprint-radial":
          "radial-gradient(circle at 20% 0%, rgba(232,160,32,0.10), transparent 50%), radial-gradient(circle at 80% 100%, rgba(27,58,107,0.20), transparent 50%)",
      },
      backgroundSize: {
        "blueprint": "32px 32px",
        "blueprint-sm": "16px 16px",
      },
      keyframes: {
        "draw-line": {
          "0%": { strokeDashoffset: "1000" },
          "100%": { strokeDashoffset: "0" },
        },
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "pulse-soft": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.6" },
        },
        "scroll-x": {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "draw-line": "draw-line 3s ease-out forwards",
        "fade-up": "fade-up 0.6s ease-out forwards",
        "pulse-soft": "pulse-soft 2s ease-in-out infinite",
        "scroll-x": "scroll-x 30s linear infinite",
      },
      boxShadow: {
        "blueprint": "0 1px 0 rgba(27,58,107,0.06), 0 8px 24px -8px rgba(27,58,107,0.18)",
        "amber-glow": "0 0 0 4px rgba(232,160,32,0.18), 0 8px 24px -4px rgba(232,160,32,0.30)",
      },
    },
  },
  plugins: [],
};

export default config;
