/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class', // 或 'media' 根據需要選擇
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'serifjp': ['NotoSerifJP', 'sans-serif'],
      },
    },
  },
  plugins: [],
}