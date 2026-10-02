/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Times New Roman"', 'Times', '"Liberation Serif"', 'Georgia', 'serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      colors: {
        ink: { 900: '#2B2233', 800: '#382D42', 700: '#463A52' },
        line: '#5A4B69',
        data: '#F0B493',
        gold: '#EFEAC6',
        pos: '#D8969E',
        neg: '#8E7BA0',
        mut: '#C4A9B8',
        cream: '#F4EFDD',
      },
    },
  },
  plugins: [],
};