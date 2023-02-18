<template>
  <b-container fluid class="page-min-height py-3">
    <UiPageTitle
      title="쿠폰 관리"
      :breadcrumb="breadcrumb"
    >
      <template #buttons>
        <b-button variant="primary" to="/event/coupon/add">
          쿠폰 등록
        </b-button>
      </template>
    </UiPageTitle>
    <hr>
    <b-row class="mt-3 px-3">
      <b-col lg="12" class="mt-1 mb-2 d-inline-flex w-100">
        <legend class="pl-0 col-sm-2 fs-14 text-sm-left align-self-center mb-0">
          쿠폰명
        </legend>
        <b-form-input v-model="filter.couponName" class="w-30 align-self-center" />
      </b-col>
      <b-col lg="12" class="my-1">
        <b-form-group
          label="기간"
          label-cols-sm="2"
          label-align-sm="left"
          label-size="sm"
          class="mb-0"
        >
          <div class="d-inline-flex justify-content-between w-100">
            <div class="d-inline-flex w-40">
              <b-form-datepicker
                v-model="filter.startDate"
                placeholder="선택"
                :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
              />
              <b-form-datepicker
                v-model="filter.endDate"
                placeholder="선택"
                :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
                class="ml-2"
              />
            </div>
            <div>
              <b-button variant="outline-secondary" class="period-btn">
                전체
              </b-button>
              <b-button variant="outline-secondary" class="period-btn">
                오늘
              </b-button>
              <b-button variant="outline-secondary" class="period-btn">
                7일
              </b-button>
              <b-button variant="outline-secondary" class="period-btn">
                1개월
              </b-button>
              <b-button variant="outline-secondary" class="period-btn">
                3개월
              </b-button>
              <b-button variant="outline-secondary" class="period-btn">
                6개월
              </b-button>
              <b-button variant="outline-secondary" class="period-btn">
                1년
              </b-button>
              <b-button variant="outline-secondary" class="period-btn">
                초기화
              </b-button>
            </div>
          </div>
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
    <b-row class="pt-5">
      <b-col align-self="center">
        <h6>쿠폰 목록 (1000)</h6>
      </b-col>
      <b-col align-self="center" class="d-inline-flex justify-content-end">
        <b-form-select v-model="filter.sort" :options="sortOptions" />
        <b-form-select v-model="filter.perPage" :options="perPageOptions" class="ml-2" />
      </b-col>
    </b-row>
    <hr class="my-2">
    <b-row align-h="end" class="mb-4">
      <b-col cols="auto">
        <b-button variant="primary">
          삭제
        </b-button>
      </b-col>
    </b-row>
    <b-table
      class="list"
      :items="items"
      :fields="fields"
      :current-page="currentPage"
      :per-page="filter.perPage"
      stacked="md"
      show-empty
      small
    >
      <template #head(select)>
        <b-form-checkbox
          v-model="selectAll"
          :indeterminate="indeterminate"
          @change="toggleAll"
        />
      </template>
      <template #cell(select)="data">
        <b-form-checkbox v-model="selectedList" :value="data.item.id" style="float: unset" />
      </template>
      <template #cell(no)="data">
        {{ (totalRows - (currentPage - 1) * filter.perPage - (data.index + 1) + 1) }}
      </template>
      <template #cell(setting)="data">
        <b-button variant="outline-secondary" class="table-inner-btn" :to="`/event/coupon/${data.item.id}`">
          상세
        </b-button>
      </template>
    </b-table>
    <UiPagination
      class="py-4"
      :page="currentPage"
      :per-page="filter.perPage"
      :total-rows="totalRows"
      @change-page="currentPage = $event"
    />
  </b-container>
</template>

<script>
export default {
  name: 'EventCouponPage',
  data () {
    return {
      filter: {
        couponName: '',
        startDate: '',
        endDate: '',
        sort: 1,
        perPage: 20
      },
      sortOptions: [
        { value: 1, text: '최신순' }
      ],
      perPageOptions: [
        { value: 20, text: '20개씩 보기' },
        { value: 30, text: '30개씩 보기' },
        { value: 50, text: '50개씩 보기' }
      ],
      totalRows: 1,
      currentPage: 1,
      selectAll: false,
      selectedList: [],
      indeterminate: false,
      items: [
        {
          id: 1,
          name: '페이스북 물약 1900',
          period: '2022-10-27 ~ 2022-10-27',
          type: '물약 1900',
          admin: 'OOO',
          date: '2022-10-27',
          all: '10',
          used: '100',
          unused: '20',
          repeated: 'X'
        },
        {
          id: 166,
          name: '페이스북 물약 1900',
          period: '2022-10-27 ~ 2022-10-27',
          type: '물약 1900',
          admin: 'OOO',
          date: '2022-10-27',
          all: '10',
          used: '100',
          unused: '20',
          repeated: 'X'
        },
        {
          id: 15,
          name: '페이스북 물약 1900',
          period: '2022-10-27 ~ 2022-10-27',
          type: '물약 1900',
          admin: 'OOO',
          date: '2022-10-27',
          all: '10',
          used: '100',
          unused: '20',
          repeated: 'X'
        }
      ],
      fields: [
        { key: 'select', label: '' },
        { key: 'no', label: 'No.' },
        { key: 'name', label: '쿠폰명' },
        { key: 'period', label: '사용 기간' },
        { key: 'type', label: '발급 종류' },
        { key: 'admin', label: '발급자' },
        { key: 'date', label: '발급일' },
        { key: 'all', label: '총 갯수' },
        { key: 'used', label: '사용 갯수' },
        { key: 'unused', label: '미사용 갯수' },
        { key: 'repeated', label: '중복 사용' },
        { key: 'setting', label: '관리' }
      ]
    }
  },
  computed: {
    breadcrumb () {
      const arr = [
        { label: '홈', url: '/' },
        { label: '이벤트', url: '/event/list' },
        { label: '쿠폰 관리', url: this.$route.fullPath }
      ]
      return arr
    }
  },
  watch: {
    selectedList (val) {
      if (val.length === 0) {
        this.indeterminate = false
        this.selectAll = false
      } else if (val.length === this.items.length) {
        this.indeterminate = false
        this.selectAll = true
      } else {
        this.indeterminate = true
        this.selectAll = false
      }
    }
  },
  created () {},
  mounted () {
    this.totalRows = this.items.length
  },
  methods: {
    toggleAll (checked) {
      if (checked) {
        this.selectedList = this.items.map(item => item.id)
      } else {
        this.selectedList = []
      }
    }
  }
}
</script>
