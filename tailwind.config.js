const colors = require("tailwindcss/colors")

module.exports = {
	mode: "jit",
	content: ["./app/**/*.{js,ts,jsx,tsx}", "./src/**/*.{js,ts,jsx,tsx}"],
	darkMode: "media", // or 'media' or 'class'
	theme: {
		extend: {
			colors: {
				"governor-bay": {
					50: "#f0f3fd",
					100: "#e3e9fc",
					200: "#ccd5f9",
					300: "#aebaf3",
					400: "#8d96ec",
					500: "#7173e3",
					600: "#5d56d5",
					700: "#4f46bc",
					800: "#4741a6",
					900: "#393679",
					950: "#222046",
				},
			},
		},
		fontFamily: {
			sans: ["Inter", "ui-sans-serif", "system-ui"],
		},
	},
	variants: {
		extend: {},
	},
	plugins: [],
}
