const { nextui } = require("@nextui-org/react");

module.exports = {
  plugins: {
    tailwindcss: {
      content: [
        "./src/**/*.{html,js,ts,jsx,tsx}",
        // make sure it's pointing to the ROOT node_module
        "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
        "./node_modules/@nextui-org/react/dist/**/*.{js,ts,jsx,tsx}",
      ],
      theme: {
        extend: {},
      },
      darkMode: "class",
      plugins: [nextui()],
    },
    autoprefixer: {},
  },
};
