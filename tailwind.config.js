/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx,png,gif}"
  ],
  theme: {
    extend: {},
  },
  plugins: [
    ('@tailwindcss/forms')
  ],
}
