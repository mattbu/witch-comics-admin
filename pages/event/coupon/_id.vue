<template>
  <b-container fluid class="page-min-height py-3">
    <UiPageTitle
      title="쿠폰 상세"
      :breadcrumb="breadcrumb"
    />
    <hr>
    <b-row class="mt-3 px-3">
      <b-col lg="12" class="mt-1 mb-3">
        <b-form-group
          v-slot="{ ariaDescribedby }"
          label="사용 여부"
          label-cols-sm="2"
          label-align-sm="left"
          label-size="sm"
          class="mb-0"
        >
          <b-form-checkbox-group
            v-model="filter.status"
            :options="statusOptions"
            :aria-describedby="ariaDescribedby"
            class="mt-1"
          />
        </b-form-group>
      </b-col>
    </b-row>
    <hr class="my-2">
    <b-row align-h="center" class="mb-4">
      <b-col cols="2">
        <b-button variant="primary" class="w-75">
          검색
        </b-button>
      </b-col>
    </b-row>
    <b-row class="pt-5" align-h="between">
      <b-col align-self="center">
        <h6>상세 제목 목록 (23123)</h6>
      </b-col>
    </b-row>
    <hr class="my-2">
    <b-row align-h="end" class="mb-2">
      <b-col cols="auto" align-self="center">
        <b-button variant="primary">
          엑셀 다운로드
        </b-button>
      </b-col>
    </b-row>
    <b-table
      class="list"
      :items="items"
      :fields="fields"
      stacked="md"
      show-empty
      small
    >
      <template #empty>
        <PageNoResult />
      </template>
      <template #cell(no)="data">
        {{ (totalRows - (currentPage - 1) * perPage - (data.index + 1) + 1) }}
      </template>
    </b-table>
    <UiPagination
      class="py-4"
      :page="currentPage"
      :per-page="perPage"
      :total-rows="totalRows"
      @change-page="currentPage = $event"
    />
  </b-container>
</template>

<script>
export default {
  name: 'EventCouponDetailPage',
  data () {
    return {
      filter: {
        status: []
      },
      statusOptions: [
        { value: 1, text: '전체' },
        { value: 2, text: '사용' },
        { value: 3, text: '미사용' }
      ],
      totalRows: 1,
      currentPage: 1,
      perPage: 20,
      items: [
        {
          id: 1,
          name: '페이스북 물약 1900',
          period: '2022-10-27 ~ 2022-10-27',
          date: '2022-10-27',
          status: '0',
          user: '000',
          use_date: '2022-10-27',
          coupon_id: '0000000'
        },
        {
          id: 3,
          name: '페이스북 물약 1900',
          period: '2022-10-27 ~ 2022-10-27',
          date: '2022-10-27',
          status: '0',
          user: '000',
          use_date: '2022-10-27',
          coupon_id: '0000000'
        },
        {
          id: 89273,
          name: '페이스북 물약 1900',
          period: '2022-10-27 ~ 2022-10-27',
          date: '2022-10-27',
          status: '0',
          user: '000',
          use_date: '2022-10-27',
          coupon_id: '0000000'
        }
      ],
      fields: [
        { key: 'no', label: 'No.' },
        { key: 'name', label: '쿠폰명' },
        { key: 'period', label: '사용 기간' },
        { key: 'date', label: '발급일' },
        { key: 'status', label: '사용 여부' },
        { key: 'user', label: '사용자' },
        { key: 'use_date', label: '사용일' },
        { key: 'coupon_id', label: '쿠폰번호' }
      ]
    }
  },
  computed: {
    breadcrumb () {
      const arr = [
        { label: '홈', url: '/' },
        { label: '이벤트', url: '/event/list' },
        { label: '쿠폰 관리', url: '/event/coupon' },
        { label: '쿠폰 상세', url: this.$route.path }
      ]
      return arr
    }
  },
  watch: {},
  created () {},
  mounted () {
    this.totalRows = this.items.length
  },
  methods: {}
}
</script>
