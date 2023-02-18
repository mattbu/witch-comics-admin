<template>
  <b-container fluid class="page-min-height py-3">
    <UiPageTitle
      title="매거진 관리"
      :breadcrumb="breadcrumb"
    />
    <hr>
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
        { label: '콘텐츠 관리', url: '#' },
        { label: '매거진 관리', url: '/content/magazine' }
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
