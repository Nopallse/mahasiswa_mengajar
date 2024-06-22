/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./views/*.{html,js,ejs}",
    "./views/admin/*.{html,js,ejs}", // Menambahkan folder Mahasiswa
    "./views/relawan/*.{html,js,ejs}", // Menambahkan folder Dashboard
    "node_modules/preline/dist/*.js",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

