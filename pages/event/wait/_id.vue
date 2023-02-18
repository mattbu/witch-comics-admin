<template>
  <b-container fluid class="page-min-height py-3">
    <UiPageTitle
      title="이따무 상세"
      :breadcrumb="breadcrumb"
    >
      <!--      <template #buttons>-->
      <!--        <b-button variant="outline-primary" to="/event/wait">-->
      <!--          취소-->
      <!--        </b-button>-->
      <!--        <b-button variant="primary">-->
      <!--          등록-->
      <!--        </b-button>-->
      <!--      </template>-->
    </UiPageTitle>
    <hr>
  </b-container>
</template>

<script>
export default {
  name: 'EventWaitDetailPage',
  data () {
    return {}
  },
  computed: {
    breadcrumb () {
      const arr = [
        { label: '홈', url: '/' },
        { label: '이벤트', url: '/event/list' },
        { label: '이따무', url: '/event/wait' },
        { label: '이따무 상세', url: this.$route.fullPath }
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
