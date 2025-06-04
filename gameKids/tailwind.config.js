/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class', // <--- ADICIONE ESTA LINHA
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Paleta de cores vibrantes
        primary: '#FF6F61',      // Laranja vibrante
        secondary: '#6EC6FF',    // Azul claro
        accent: '#FFD600',       // Amarelo vibrante
        success: '#00E676',      // Verde vibrante
        info: '#00B8D4',         // Azul piscina
        pink: '#FF80AB',         // Rosa vibrante
        purple: '#B388FF',       // Roxo claro
        // Gradientes podem ser usados via bg-gradient-to-*
        'ws-hover': '#F3E8FF',   // Roxo bem claro para hover do caça-palavras
      },
      fontFamily: {
        comic: ['"Comic Neue"', 'cursive'],
        baloo: ['"Baloo 2"', 'cursive'],
      },
      boxShadow: {
        'card': '0 4px 20px 0 rgba(255, 111, 97, 0.15)', // sombra lúdica para cards
        'mascot': '0 8px 32px 0 rgba(110, 198, 255, 0.25)', // sombra especial para mascote
      },
    },
  },
  plugins: [],
};