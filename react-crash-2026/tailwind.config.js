/** @type {import('tailwindcss').Config} */
export default {
 content: [
   "./index.html",
   "./src/**/*.{html,js,ts,jsx,tsx}",
 ],
 theme: {
   extend: {
     fontFamily: {
       sans: ['Robot', 'sans-serif']
     },
     gridTemplateColumns: {
      '70/30':'70% 28%',
     },
   },
 },
 plugins: [],
}