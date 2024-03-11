/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        background: '#201d1e',
        backgroundlight: '#6b6b6b',
        primary: '#d99f54',
        accent: '#b82e32'
      }
    }
  },
  plugins: []
};
