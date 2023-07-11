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
    },
  },
  plugins: [headlessui],
};
