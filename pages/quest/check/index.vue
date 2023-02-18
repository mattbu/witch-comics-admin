<template>
  <b-container fluid class="page-min-height py-3">
    <UiPageTitle title="출석체크" :breadcrumb="breadcrumb" />
    <hr>
    <p class="">
      준비중입니다.
    </p>
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
        { label: '퀘스트', url: '#' },
        { label: '출석체크', url: this.$route.path }
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
