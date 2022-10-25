/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "neutral-1000": "#181826",
        "neutral-900": "#212134",
        "neutral-800": "#32324D",
        "neutral-700": "#4A4A6A",
        "neutral-600": "#666687",
        "neutral-500": "#8E8EA9",
        "neutral-400": "#A5A5BA",
        "neutral-300": "#C0C0CF",
        "neutral-200": "#DCDCE4",
        "neutral-150": "#EAEAEF",
        "neutral-100": "#F6F6F9",
        "neutral-0": "#FFFFFF",

        "primary-700": "#271FE0",
        "primary-600": "#4945FF",
        "primary-500": "#7B79FF",
        "primary-200": "#D9D8FF",
        "primary-100": "#F0F0FF",

        "success-700": "#2F6846",
        "success-600": "#328048",
        "success-500": "#5CB176",
        "success-200": "#C6F0C2",
        "success-100": "#EAFBE7",

        "danger-700": "#B72B1A",
        "danger-600": "#D02B20",
        "danger-500": "#EE5E52",
        "danger-200": "#F5C0B8",
        "danger-100": "#FCECEA",

        "warning-700": "#BE5D01",
        "warning-600": "#D9822F",
        "warning-500": "#F29D41",
        "warning-200": "#FAE7B9",
        "warning-100": "#FDF4DC",

        "secondary-700": "#006096",
        "secondary-600": "#0C75AF",
        "secondary-500": "#66B7F1",
        "secondary-200": "#B8E1FF",
        "secondary-100": "#EAF5FF",

        "alternative-700": "#8312D1",
        "alternative-600": "#9736E8",
        "alternative-500": "#AC73E6",
        "alternative-200": "#E0C1F4",
        "alternative-100": "#F6ECFC",

        "button-primary-600": "#4945FF",
        "button-primary-500": "#7B79FF",
      },
    },
  },
  plugins: [],
};
