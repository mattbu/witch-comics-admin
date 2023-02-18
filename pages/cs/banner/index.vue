<template>
  <b-container fluid class="page-min-height py-3">
    <UiPageTitle
      title="배너 관리"
      :breadcrumb="breadcrumb"
    />
    <hr>
  </b-container>
</template>

<script>
export default {
  name: 'CsBannerListPage',
  data () {
    return {}
  },
  computed: {
    breadcrumb () {
      const arr = [
        { label: '홈', url: '/' },
        { label: '서비스 운영 관리', url: '#' },
        { label: '배너 관리', url: this.$route.path }
      ]
      return arr
    }
  },
  watch: {},
  created () {},
  mounted () {},
  methods: {}
}
</script>
