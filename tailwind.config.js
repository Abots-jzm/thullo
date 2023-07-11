/** @type {import('tailwindcss').Config} */

import headlessui from "@headlessui/tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        notoSans: ['"Noto Sans"', "sans-serif"],
      },
      boxShadow: {
        light: "0px 2px 12px rgba(0, 0, 0, 0.1)",
      },
      colors: {
        primaryBlue: "#2F80ED",
        primaryRed: "#EB5757",
        ash: "#828282",
        grey1: "#bdbdbd",
      },
    },
  },
  plugins: [headlessui],
};
