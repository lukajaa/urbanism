// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: false },
  app: {
    head: {
      title: 'Lukajaa Nuxt Template'
    }
  },
  css: ['@/assets/styles/main.scss'],
  typescript: {
    strict: true
  },
  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/google-fonts',
    '@nuxtjs/eslint-module',
    '@nuxtjs/color-mode',
    'nuxt-headlessui',
    'nuxt-gtag',
    'nuxt-icon'
  ],
  plugins: [
    {
      src: '@/plugins/aos',
      ssr: false,
      mode: 'client'
    }
  ],
  googleFonts: {
    families: {}
  },
  colorMode: {
    classSuffix: ''
  },
  gtag: {
    id: 'G-QNLZ5NY7HH'
  }
})
