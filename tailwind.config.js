/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Times New Roman"', 'Times', 'Georgia', 'serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        ink: { 900: '#0A0F1E', 800: '#0F172A', 700: '#16213A' },
        line: '#22304A',
        data: '#4CC9F0',
        gold: '#D4A94E',
        pos: '#34D399',
        mut: '#8CA3C7',
      },
    },
  },
  plugins: [],
}