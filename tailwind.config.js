module.exports = {
  purge: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      fontSize: {
        small: '.6rem',
      },
      colors: {
        primary: '#06141D',
        secondary: '#1B2730',
        secondaryHover: '#1a252d',
        secondaryLigth: '#28343E',
        thirdPurple: '#5046bb',
        thirdBlue: '#0099ff',
        fourth: '#ffc540',
        textWhite: '#F5FDFF',
        textGray: '#4D5B66',
      },
      gridTemplateColumns: {
        mobile: '62px 1fr',
        laptop: '1fr 2fr',
        desktop: '1fr 3fr 1fr',
      },
      maxWidth: {
        aside: '280px',
        maxAside: '325px',
        post: '596px',
        maxPost: '615px',
      },
      minWidth: {
        minAside: '230px',
        minForm: '380px',
      },
      minHeight: {
        nav: '48px',
      },
    },
  },
  variants: {
    extend: {
      transitionProperty: ['responsive', 'motion-safe', 'motion-reduce'],
    },
  },
  plugins: [],
}
