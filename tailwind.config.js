/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Fraunces"', 'Georgia', '"Times New Roman"', 'serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      colors: {
        ink: { 900: '#0a0e12', 800: '#101820', 700: '#16222c' },
        line: '#33566e',
        data: '#8fb2c6',
        gold: '#b8cdd9',
        pos: '#dceaf2',
        neg: '#92a7b4',
        mut: '#92a7b4',
        cream: '#e6edf1',
      },
    },
  },
  plugins: [],
};
