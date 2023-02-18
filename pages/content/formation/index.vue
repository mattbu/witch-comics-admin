<template>
  <b-container fluid class="page-min-height py-3">
    <UiPageTitle
      title="편성 모듈"
      :breadcrumb="breadcrumb"
    />
    <hr>
  </b-container>
</template>

<script>
export default {
  name: 'ContentFormationListPage',
  data () {
    return {}
  },
  computed: {
    breadcrumb () {
      const arr = [
        { label: '홈', url: '/' },
        { label: '콘텐츠 관리', url: '#' },
        { label: '편성 모듈', url: this.$route.path }
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
