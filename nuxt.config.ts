// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },
  css: ["~/assets/css/main.css"],
  // build: {
  //   transpile: ["@heroicons/vue"],
  // },
  runtimeConfig:{
    API_KEY: "YOUR_API_KEY",
  }
})
