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
				shadow1: "0px 2px 2px 0px rgba(0, 0, 0, 0.05)",
				shadow2: "0px 4px 12px rgba(0, 0, 0, 0.10)",
				shadow3: "0px 4px 12px 0px rgba(0, 0, 0, 0.05)",
			},
			colors: {
				primaryBlue: "#2F80ED",
				primaryRed: "#EB5757",
				ash: "#828282",
				grey1: "#BDBDBD",
				grey2: "#E0E0E0",
				grey3: "#F2F2F2",
				offWhite: "#f8f9fd",
			},
			gridTemplateColumns: {
				fluid: "repeat(auto-fill, minmax(232px, 1fr))",
			},
			keyframes: {
				juggle: {
					"0%": { top: "8px", height: "64px" },
					"50%, 100%": { top: "24px", height: "32px" },
				},
			},
			animation: {
				juggle: "juggle 1.2s cubic-bezier(0, 0.5, 0.5, 1) infinite",
			},
		},
	},
	plugins: [headlessui],
};
