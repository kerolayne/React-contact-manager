/** @type {import('tailwindcss').Config} */
export default {
  // A propriedade 'content' diz ao Tailwind quais ficheiros deve analisar
  // para encontrar as classes que estão a ser utilizadas.
  content: [
    "./index.html", // Analisa o ficheiro HTML principal
    "./src/**/*.{js,ts,jsx,tsx}", // Analisa todos os ficheiros JavaScript/TypeScript e React na pasta 'src'
  ],

  // A propriedade 'theme' é onde pode personalizar o design system do Tailwind.
  // Pode estender cores, fontes, espaçamentos, etc.
  theme: {
    extend: {
      // Exemplo de como estender o tema:
      // colors: {
      //   'brand-blue': '#1992d4',
      // },
    },
  },

  // A propriedade 'plugins' permite adicionar plugins de terceiros ao Tailwind,
  // como plugins para formulários, tipografia, etc.
  plugins: [],
}