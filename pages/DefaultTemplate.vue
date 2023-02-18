<template>
  <b-container fluid class="page-min-height py-3">
    <UiPageTitle
      title="복사용 템플릿"
      :breadcrumb="breadcrumb"
    />
    <hr>
  </b-container>
</template>

<script>
export default {
  name: 'PageTitlePage',
  data () {
    return {}
  },
  computed: {
    breadcrumb () {
      const arr = [
        { label: '홈', url: '/' },
        { label: '회원 관리', url: '#' },
        { label: '회원리스트', url: this.$route.path }
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
