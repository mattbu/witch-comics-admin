<template>
  <b-container fluid class="page-min-height py-3">
    <UiPageTitle
      title="이용권 상세"
      :breadcrumb="breadcrumb"
    >
      <!--      <template #buttons>-->
      <!--        <b-button variant="outline-primary" to="/event/ticket">-->
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
  name: 'EventTicketDetailPage',
  data () {
    return {}
  },
  computed: {
    breadcrumb () {
      const arr = [
        { label: '홈', url: '/' },
        { label: '이벤트', url: '/event/list' },
        { label: '이용권 관리', url: '/event/ticket' },
        { label: '이용권 상세', url: this.$route.fullPath }
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
