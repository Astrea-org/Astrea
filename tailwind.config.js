import plugin from "tailwindcss/plugin";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      fontFamily: {
        poppinsRegular: ["Poppins Regular", "sans-serif"],
        poppinsThin: ["Poppins Thin", "sans-serif"],
        poppinsSemiBold: ["Poppins SemiBold", "sans-serif"],
      },
      textStroke: {
        DEFAULT: "1px white",
        sm: "0.5px white",
        lg: "4px white",
        black: "2px black",
      },
    },
  },
  plugins: [
    plugin(function ({ addUtilities, e, theme }) {
      const textStrokeUtilities = Object.entries(theme("textStroke") || {}).map(
        ([key, value]) => {
          return {
            [`.${e(`text-stroke-${key}`)}`]: {
              "-webkit-text-stroke": value,
            },
          };
        }
      );

      addUtilities(textStrokeUtilities);
    }),
  ],
  variants: {
    extend: {
      textStroke: ["responsive"],
    },
  },
};
