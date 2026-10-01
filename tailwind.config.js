/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          dark: '#0f172a',    // Dominant Primary: Dark Slate
          surface: '#1e293b', // Sub-primary card/navbar background
          accent: '#06b6d4',  // Action Color: Vibrant Cyan
          accentHover: '#0891b2', // Darker Teal for button hovers
        }
      }
    },
  },
  plugins: [],
}