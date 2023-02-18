<template>
  <b-container fluid class="page-min-height py-3">
    <UiPageTitle
      title="리워드 지급 내역 상세"
      :breadcrumb="breadcrumb"
    />
    <hr>
    <b-row class="mt-3 px-3">
      <b-col lg="12" class="my-2">
        <b-form-group
          label="아이디"
          label-cols-sm="2"
          label-align-sm="left"
          label-size="sm"
          class="mb-0"
        >
          <b-form-input v-model="filter.userEmail" class="w-30 align-self-center" />
        </b-form-group>
      </b-col>

      <b-col lg="12" class="my-2">
        <b-form-group
          label="기간"
          label-cols-sm="2"
          label-align-sm="left"
          label-size="sm"
          class="mb-0"
        >
          <div class="d-inline-flex w-50 justify-content-between">
            <b-form-datepicker
              v-model="filter.startDate"
              placeholder="선택"
              :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
              class="w-45"
            />
            <span class="align-self-center text-center">~</span>
            <b-form-datepicker
              v-model="filter.endDate"
              placeholder="선택"
              :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
              class="w-45"
            />
          </div>
        </b-form-group>
      </b-col>
    </b-row>
    <hr class="mb-2">
    <b-row align-h="center" class="mb-4">
      <b-col cols="2">
        <b-button variant="primary" class="w-75">
          검색
        </b-button>
      </b-col>
    </b-row>
    <b-row class="pt-5" align-h="between">
      <b-col align-self="center">
        <h6>리워드 지급 목록 (5)</h6>
      </b-col>
      <b-col cols="auto" align-self="center" class="w-15">
        <b-form-select v-model="filter.sort" :options="sortOptions" />
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
  name: 'EventRewardDetailPage',
  data () {
    return {
      filter: {
        userEmail: '',
        startDate: '',
        endDate: '',
        sort: 1
      },
      sortOptions: [
        { text: '등록 순', value: 1 }
      ],
      //
      totalRows: 1,
      currentPage: 1,
      perPage: 20,
      items: [
        {
          id: 1,
          email: 'example@example.com',
          date: '2022-10-28',
          type: '물약',
          quantity: '10개'
        },
        {
          id: 3,
          email: 'example@example.com',
          date: '2022-10-28',
          type: '물약',
          quantity: '10개'
        },
        {
          id: 6,
          email: 'example@example.com',
          date: '2022-10-28',
          type: '물약',
          quantity: '10개'
        }
      ],
      fields: [
        { key: 'no', label: 'No.' },
        { key: 'email', label: '아이디' },
        { key: 'date', label: '리워드 지급일' },
        { key: 'type', label: '지급 종류' },
        { key: 'quantity', label: '갯수' }
      ]
    }
  },
  computed: {
    breadcrumb () {
      const arr = [
        { label: '홈', url: '/' },
        { label: '이벤트', url: '/event/list' },
        { label: '리워드 지급 내역', url: '/event/reward' },
        { label: '리워드 지급 내역 상세', url: this.$route.fullPath }
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
