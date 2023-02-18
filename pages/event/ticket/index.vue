<template>
  <b-container fluid class="page-min-height py-3">
    <UiPageTitle title="이용권 관리" :breadcrumb="breadcrumb">
      <template #buttons>
        <b-button variant="primary" to="/event/ticket/add">
          이용권 등록
        </b-button>
      </template>
    </UiPageTitle>
    <hr>
    <b-row class="mt-3 px-3">
      <b-col lg="12" class="mt-1 mb-2 d-inline-flex w-100">
        <legend class="pl-0 col-sm-2 fs-14 text-sm-left align-self-center mb-0">
          이용권명
        </legend>
        <b-form-input v-model="filter.name" class="w-30 align-self-center" />
      </b-col>

      <b-col lg="12" class="my-2">
        <b-form-group
          label="이용 기간"
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
                :date-format-options="{
                  year: 'numeric',
                  month: 'numeric',
                  day: 'numeric'
                }"
              />
              <b-form-datepicker
                v-model="filter.endDate"
                placeholder="선택"
                :date-format-options="{
                  year: 'numeric',
                  month: 'numeric',
                  day: 'numeric'
                }"
                class="ml-2"
              />
            </div>
          </div>
        </b-form-group>
      </b-col>

      <b-col lg="12" class="my-2">
        <b-form-group
          v-slot="{ ariaDescribedby }"
          label="대상자"
          label-cols-sm="2"
          label-align-sm="left"
          label-size="sm"
          class="mb-0"
        >
          <b-form-checkbox-group
            v-model="filter.eventType"
            :options="eventTypeOptions"
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

    <b-row align-h="between" class="mt-5">
      <b-col align-self="center">
        <h6>이용권 목록 (243)</h6>
      </b-col>
      <b-col align-self="center" class="d-inline-flex justify-content-end">
        <b-form-select v-model="filter.sort" :options="sortOptions" />
        <b-form-select
          v-model="perPage"
          :options="perPageOptions"
          class="ml-2"
        />
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
      :per-page="perPage"
      stacked="md"
      show-empty
      small
    >
      <template #cell(no)="data">
        {{ totalRows - (currentPage - 1) * perPage - (data.index + 1) + 1 }}
      </template>
      <template #cell(setting)>
        <b-button variant="outline-secondary" class="table-inner-btn">
          취소
        </b-button>
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
  name: 'EventTicketPage',
  data () {
    return {
      filter: {
        name: '',
        sort: 1,
        startDate: '',
        endDate: ''
      },
      currentPage: 1,
      totalRows: 0,
      perPage: 20,

      sortOptions: [{ value: 1, text: '최신순' }],

      eventTypeOptions: [
        { value: 1, text: '무료화' },
        { value: 2, text: '할인' },
        { value: 3, text: '리워드' },
        { value: 4, text: '이따무' }
      ],
      perPageOptions: [
        { value: 20, text: '20개씩 보기' },
        { value: 30, text: '30개씩 보기' },
        { value: 50, text: '50개씩 보기' }
      ],
      selectAll: false,
      selectedList: [],
      indeterminate: false,

      items: [
        {
          id: 1,
          name: '엔네우두',
          ticket_name: '오늘은 소설 보는 날',
          period: '2022-10-26 ~ 2022-10-26',
          target: 'OOO',
          type: '대여 3개',
          yn: 'O',
          status: '예약',
          date: '2022-10-21',
          admin: 'OOO'
        },
        {
          id: 14,
          name: '엔네우두',
          ticket_name: '오늘은 소설 보는 날',
          period: '2022-10-26 ~ 2022-10-26',
          target: 'OOO',
          type: '대여 3개',
          yn: 'O',
          status: '예약',
          date: '2022-10-21',
          admin: 'OOO'
        },
        {
          id: 18,
          name: '엔네우두',
          ticket_name: '오늘은 소설 보는 날',
          period: '2022-10-26 ~ 2022-10-26',
          target: 'OOO',
          type: '대여 3개',
          yn: 'O',
          status: '예약',
          date: '2022-10-21',
          admin: 'OOO'
        }
      ],
      fields: [
        { key: 'select', label: '' },
        { key: 'no', label: 'No.' },
        { key: 'name', label: '작품명' },
        { key: 'ticket_name', label: '이용권명' },
        { key: 'period', label: '이용 기간' },
        { key: 'target', label: '대상자' },
        { key: 'type', label: '발행 종류' },
        { key: 'yn', label: '정산 여부' },
        { key: 'status', label: '상태' },
        { key: 'date', label: '발급일' },
        { key: 'admin', label: '발급자' },
        { key: 'setting', label: '관리' }
      ]
    }
  },
  computed: {
    breadcrumb () {
      const arr = [
        { label: '홈', url: '/' },
        { label: '이벤트', url: '/event/list' },
        { label: '이용권 관리', url: this.$route.fullPath }
      ]
      return arr
    }
  },
  watch: {
    currentTab (val) {
      console.log(val)
    },
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
