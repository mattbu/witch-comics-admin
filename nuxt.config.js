export default {
  target: 'server',
  server: {
    host: process.env.WEB_BASE_HOST || 'localhost',
    port: process.env.WEB_BASE_PORT || 3000
  },
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: '마녀코믹스 관리자',
    htmlAttrs: {
      lang: 'ko'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    script: [{ src: 'https://kit.fontawesome.com/45ff15e1c9.js', crossOrigin: 'anonymous', body: true }]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['@/assets/scss/app.scss'],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: '@/plugins/flash-message.js', mode: 'client' },
    { src: '@/plugins/chart.js', mode: 'client' },
    { src: '@/plugins/tui-editor.js', mode: 'client' },
    { src: '@/plugins/v-calendar.js', ssr: false },
    { src: '@/plugins/axios.js', ssr: false },
    { src: '@/plugins/date-format.js', mode: 'client' },
    { src: '@/plugins/draggable.js', mode: 'client' }
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: {
    dirs: [
      '@/components'
    ]
  },

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/eslint
    '@nuxtjs/eslint-module'
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    'bootstrap-vue/nuxt',
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/dotenv'
  ],

  bootstrapVue: {
    icons: true
  },

  router: {
    linkExactActiveClass: 'current-link'
  },

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    // withCredentials: true,
    // baseURL: process.env.API_URL
    // proxy: true,
    // baseURL: 'http://192.168.0.31:18080'
  },
  // proxy: {
  //   '/api/': 'http://192.168.0.31:18080'
  // },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
  publicRuntimeConfig: {
    API_URL: process.env.API_URL
  }
}
