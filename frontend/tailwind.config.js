/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "#0B1120",
        "background-secondary": "#111827",
        card: "#1F2937",
        border: "#374151",
        primary: {
          DEFAULT: "#3B82F6",
          hover: "#60A5FA",
        },
        success: "#22C55E",
        warning: "#F59E0B",
        danger: "#EF4444",
        text: {
          primary: "#F9FAFB",
          secondary: "#9CA3AF",
          muted: "#6B7280",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      borderRadius: {
        DEFAULT: "8px",
        md: "10px",
        lg: "14px",
        xl: "18px",
      },
      boxShadow: {
        soft: "0 2px 8px rgba(0, 0, 0, 0.25)",
        "soft-lg": "0 4px 16px rgba(0, 0, 0, 0.3)",
        "accent-glow": "0 0 0 3px rgba(59, 130, 246, 0.15)",
      },
      transitionDuration: {
        250: "250ms",
      },
      keyframes: {

     logoGlow: {
       "0%": {
         filter: "hue-rotate(0deg)",
         opacity: "1"
       },

       "25%": {
         filter: "hue-rotate(10deg)",
         opacity: ".95"
       },

       "50%": {
         filter: "brightness(.85)",
         opacity: ".9"
       },

       "75%": {
         filter: "brightness(.65)",
         opacity: ".95"
       },

       "100%": {
         filter: "hue-rotate(0deg)",
         opacity: "1"
       }
     },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideUpFade: {
          "0%": { opacity: "0", transform: "translateY(12px) scale(0.98)" },
          "100%": { opacity: "1", transform: "translateY(0) scale(1)" },
        },
        meshDrift: {
          "0%, 100%": { transform: "translate(0, 0) scale(1)" },
          "50%": { transform: "translate(2%, -2%) scale(1.05)" },
        },
      },
      animation: {
        fadeIn: "fadeIn 400ms ease-out",
        fadeInUp: "fadeInUp 400ms ease-out",
        slideUpFade: "slideUpFade 250ms ease-out",
       logoGlow: "logoGlow 5s ease-in-out infinite",
        meshDrift: "meshDrift 40s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};