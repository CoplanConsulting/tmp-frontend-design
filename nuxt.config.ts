// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite'

export default defineNuxtConfig({
  compatibilityDate: '2024-11-01',
  devtools: { enabled: true },

  modules: [
    'shadcn-nuxt',
    '@nuxtjs/color-mode'
  ],

  vite: {
    plugins: [
      tailwindcss()
    ]
  },

  shadcn: {
    prefix: '',
    componentDir: './components/ui'
  },

  colorMode: {
    classSuffix: ''
  },

  css: ['~/assets/css/main.css'],

  typescript: {
    strict: true,
    typeCheck: true
  }
})
