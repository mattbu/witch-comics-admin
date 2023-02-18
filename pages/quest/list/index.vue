<template>
  <b-container fluid class="page-min-height py-3">
    <UiPageTitle
      title="퀘스트"
      :breadcrumb="breadcrumb"
    />
    <hr>
  </b-container>
</template>

<script>
export default {
  name: 'QuestCheckPage',
  data () {
    return {}
  },
  computed: {
    breadcrumb () {
      const arr = [
        { label: '홈', url: '/' },
        { label: '퀘스트', url: this.$route.fullPath }
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
