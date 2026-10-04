export default {content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  theme: {
    extend: {
      colors: {
        midnight: "#0B0B0D",
        ink: {
          900: "#111114",
          800: "#16161A",
          700: "#1E1E23",
          600: "#2A2A30",
        },
        hero: {
          DEFAULT: "#E63946",
          dark: "#C92F3B",
        },
        steel: "#6B7280",
        silver: "#C7CBD1",
      },
      fontFamily: {
        display: ["Montserrat", "system-ui", "sans-serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
      },
    },
  },
};
