<template>
  <b-container fluid class="page-min-height py-3">
    <UiPageTitle title="일일 미션" :breadcrumb="breadcrumb" />
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
        { label: '일일 미션', url: this.$route.path }
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
