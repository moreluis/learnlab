// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ['@nuxtjs/tailwindcss'],
  devtools: { enabled: true },
  nitro: {
    devProxy: {
        "/devApi": {
            target:"http://localhost:80",
            changeOrigin: true,
            prependPath: true,
        }
    }
  },
  runtimeConfig: {
    public: {
      apiBaseUrl: 'http://localhost:3000/devApi',
    },
  },
  css: [
    '~/assets/fonts.css',
  ],
  app: {
    head: {
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      title: 'LearnLab'
    }
  }
})
