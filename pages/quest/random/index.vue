<template>
  <b-container fluid class="page-min-height py-3">
    <UiPageTitle title="랜덤박스" :breadcrumb="breadcrumb" />
    <hr>
    <p class="">
      준비중입니다.
    </p>
  </b-container>
</template>

<script>
export default {
  name: 'QuestRandomPage',
  data () {
    return {}
  },
  computed: {
    breadcrumb () {
      const arr = [
        { label: '홈', url: '/' },
        { label: '퀘스트', url: '#' },
        { label: '랜덤박스', url: this.$route.path }
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
