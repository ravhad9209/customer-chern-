/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      borderRadius: {
        card: '10px',
      },
      colors: {
        surface: {
          DEFAULT: '#0f1117',
          elevated: '#16181d',
          muted: '#0c0e12',
        },
        border: {
          subtle: '#1f2329',
          default: '#2d323c',
        },
        primary: {
          DEFAULT: '#3b82f6',
          hover: '#2563eb',
          muted: 'rgba(59, 130, 246, 0.15)',
        },
        status: {
          critical: '#dc2626',
          high: '#ea580c',
          medium: '#ca8a04',
          low: '#16a34a',
        },
      },
      backgroundImage: {
        'card-subtle': 'linear-gradient(180deg, rgba(255,255,255,0.02) 0%, transparent 100%)',
      },
    },
  },
  plugins: [],
}
