<template>
  <b-container fluid class="page-min-height py-3">
    <UiPageTitle title="물약 결제 내역" :breadcrumb="breadcrumb" />
    <hr>
    <!--    필터-->
    <b-row class="mt-3 px-3">
      <b-col lg="12" class="my-2">
        <b-form-group
          v-slot="{ ariaDescribedby }"
          label="이메일"
          label-cols-sm="2"
          label-align-sm="left"
          label-size="sm"
          class="mb-0"
        >
          <b-form-input
            v-model="filter.email"
            :aria-describedby="ariaDescribedby"
            class="w-40"
          />
        </b-form-group>
      </b-col>

      <b-col lg="12" class="my-2">
        <b-form-group
          v-slot="{ ariaDescribedby }"
          label="기간"
          label-cols-sm="2"
          label-align-sm="left"
          label-size="sm"
          class="mb-0"
        >
          <div class="d-inline-flex w-50">
            <b-form-datepicker
              v-model="filter.startDate"
              placeholder="선택"
              :date-format-options="{
                year: 'numeric',
                month: 'numeric',
                day: 'numeric'
              }"
              :aria-describedby="ariaDescribedby"
            />
            <span class="mx-2 align-self-center">~</span>
            <b-form-datepicker
              v-model="filter.endDate"
              placeholder="선택"
              :date-format-options="{
                year: 'numeric',
                month: 'numeric',
                day: 'numeric'
              }"
              :aria-describedby="ariaDescribedby"
            />
          </div>
        </b-form-group>
      </b-col>

      <b-col lg="12" class="my-2">
        <b-form-group
          v-slot="{ ariaDescribedby }"
          label="결제 방법"
          label-cols-sm="2"
          label-align-sm="left"
          label-size="sm"
          class="mb-0"
        >
          <b-form-checkbox-group
            v-model="filter.paymentType"
            :options="paymentOptions"
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
        <h6>물약 결제 내역</h6>
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
    <b-row align-h="end" class="mb-2">
      <b-col cols="auto" align-self="center">
        <b-button>엑셀 다운로드</b-button>
      </b-col>
    </b-row>
    <!-- 테이블 -->
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
      <template #empty>
        <PageNoResult />
      </template>
      <template #cell(no)="data">
        {{ totalRows - (currentPage - 1) * perPage - (data.index + 1) + 1 }}
      </template>
      <template #cell(charge)="data">
        {{ data.value ? `${data.value}개` : '-' }}
      </template>
      <template #cell(history)="data">
        {{ data.value ? `${data.value}개` : '-' }}
      </template>
      <template #cell(sum)="data">
        {{ data.value ? `${data.value}원` : '-' }}
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
  name: 'CalculatePointPage',
  data () {
    return {
      filter: {
        email: '',
        paymentType: null,
        startDate: '',
        endDate: '',
        sort: 1
      },
      sortOptions: [{ value: 1, text: '최신순' }],
      perPageOptions: [
        { value: 20, text: '20개씩 보기' },
        { value: 30, text: '30개씩 보기' },
        { value: 50, text: '50개씩 보기' }
      ],
      paymentOptions: [
        { value: 1, text: '간편 결제' },
        { value: 2, text: '카드' },
        { value: 3, text: '모바일' },
        { value: 4, text: '상품권' },
        { value: 5, text: '계좌 이체' }
      ],
      //
      currentPage: 1,
      totalRows: 0,
      perPage: 20,
      //
      items: [
        {
          id: 15,
          email: 'example@example.com',
          name: 'OOO',
          charge: '30',
          history: '300',
          sum: '3,900',
          method: '카드',
          created_at: '2022-10-24 00:00:00'
        },
        {
          id: 22,
          email: 'example@example.com',
          name: 'OOO',
          charge: '1020',
          history: '990(+30)',
          sum: '9,900',
          method: '카드',
          created_at: '2022-10-24 00:00:00'
        },
        {
          id: 18,
          email: 'example@example.com',
          name: 'OOO',
          charge: '3140',
          history: '2990(+150)',
          sum: '29,900',
          method: '카드',
          created_at: '2022-10-24 00:00:00'
        }
      ],
      fields: [
        { key: 'no', label: 'No.' },
        { key: 'email', label: '아이디' },
        { key: 'name', label: '구매자 명' },
        { key: 'charge', label: '충전 물약' },
        { key: 'history', label: '결제 내역' },
        { key: 'sum', label: '결제 금액' },
        { key: 'method', label: '결제 방법' },
        { key: 'created_at', label: '결제 일시' }
      ]
    }
  },
  computed: {
    breadcrumb () {
      const arr = [
        { label: '홈', url: '/' },
        { label: '정산 관리', url: '#' },
        { label: '물약 결제 내역', url: this.$route.path }
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
