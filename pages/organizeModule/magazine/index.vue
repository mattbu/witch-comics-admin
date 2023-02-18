<template>
  <b-container fluid class="page-min-height py-3">
    <UiPageTitle title="매거진 관리" :breadcrumb="breadcrumb" />
    <hr>
    <p>준비중입니다.</p>
  </b-container>
</template>

<script>
export default {
  name: 'ContentMagazineListPage',
  data () {
    return {}
  },
  computed: {
    breadcrumb () {
      const arr = [
        { label: '홈', url: '/' },
        { label: '편성모듈 관리', url: '#' },
        { label: '매거진 관리', url: this.$route.path }
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
