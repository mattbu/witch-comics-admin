<template>
  <b-container fluid class="px-0 layout-container">
    <b-row tag="header">
      <b-col>
        <LayoutHeader />
      </b-col>
    </b-row>
    <b-row v-if="!isDisuse" class="lnb-wrap" :class="{'close': isClosed }">
      <b-col tag="nav" class="px-0">
        <LayoutSideNavigationBar :is-closed="isClosed" />
      </b-col>
    </b-row>
    <b-row tag="main" :class="{'nav-closed': isClosed, 'no-nav' : isDisuse}">
      <b-col>
        <TransitionPage>
          <Nuxt />
        </TransitionPage>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
export default {
  data () {
    return {
      isClosed: false
    }
  },
  computed: {
    isLogin () {
      if (this.$store.state.token) { return true }
      return false
    },
    isShowLNB () {
      return true
    },
    isDisuse () {
      return this.$route.path.includes('/auth')
    }
  },
  watch: {},
  created () {},
  mounted () {
    this.$nuxt.$on('lnb-close', (data) => {
      this.isClosed = data
    })
  },
  methods: {}
}
</script>
