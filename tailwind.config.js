/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/antd/dist/antd.css"
  ],
  theme: {
    extend: {
      colors: {
        primary: '#F28C28',
      }
    },
  },
  plugins: [],
};
