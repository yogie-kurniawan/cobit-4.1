module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "var(--clr-primary)",
        "primary-light": "var(--clr-primary-light)",
        "primary-dark": "var(--clr-primary-dark)",
        secondary: "var(--clr-secondary)",
        "secondary-dark": "var(--clr-secondary-dark)",
      },
      fontFamily: {
        times: ['"Times New Roman"', "serif"], // Add Times New Roman
      },
    },
  },
  plugins: [],
};
