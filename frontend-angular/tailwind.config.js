module.exports = {
  content: [
    "./src/**/*.{html,ts}",
    "./node_modules/flowbite/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#1e1d1d',
          light: '#f1a83e',
          dark: '#ec7c00'
        },
      },
      boxShadow: {
        navbar: '0 2px 3px rgba(0, 0, 0, 0.1)',
      },
      backgroundColor: {
        'navbar-bg': 'rgba(255, 255, 255, 0.9)',
      },
    },
  },
  plugins: [
    require('flowbite/plugin')({
      charts: true,
    })]
}
