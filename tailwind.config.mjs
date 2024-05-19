/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        background: '#1f1f1f',
        backgroundlight: '#4d4d4d',
        primary: '#d99f54',
        accent: '#da3a3f'
      }
    }
  },
  plugins: []
};
