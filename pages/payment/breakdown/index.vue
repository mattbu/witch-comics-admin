<template>
  <b-container fluid class="page-min-height py-3">
    <UiPageTitle
      title="결제 내역"
      :breadcrumb="breadcrumb"
    />
    <hr>
    <!--    필터-->
    <b-row class="mt-3 px-3">
      <b-col lg="12" class="my-1">
        <b-form-group
          v-slot="{ ariaDescribedby }"
          label="이메일"
          label-cols-sm="2"
          label-align-sm="left"
          label-size="sm"
          class="mb-0"
        >
          <b-form-input v-model="filter.email" :aria-describedby="ariaDescribedby" class="w-40" />
        </b-form-group>
      </b-col>

      <b-col lg="12" class="my-1">
        <b-form-group
          v-slot="{ ariaDescribedby }"
          label="결제 상품"
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

      <b-col lg="12" class="my-1">
        <b-form-group
          v-slot="{ ariaDescribedby }"
          label="소비 상태"
          label-cols-sm="2"
          label-align-sm="left"
          label-size="sm"
          class="mb-0"
        >
          <b-form-checkbox-group
            v-model="filter.paySystem"
            :options="paySystemOptions"
            :aria-describedby="ariaDescribedby"
            class="mt-1"
          />
        </b-form-group>
      </b-col>

      <b-col lg="12" class="my-1">
        <b-form-group
          v-slot="{ ariaDescribedby }"
          label="결제 시간"
          label-cols-sm="2"
          label-align-sm="left"
          label-size="sm"
          class="mb-0"
        >
          <div class="d-inline-flex w-50">
            <b-form-datepicker
              v-model="filter.startDate"
              placeholder="선택"
              :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
              :aria-describedby="ariaDescribedby"
            />
            <span class="mx-2 align-self-center">~</span>
            <b-form-datepicker
              v-model="filter.endDate"
              placeholder="선택"
              :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
              :aria-describedby="ariaDescribedby"
            />
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
    <b-tabs class="mt-5 pt-5" content-class="mt-3">
      <template #tabs-end>
        <div class="d-inline-flex ml-auto w-15">
          <b-form-select v-model="filter.sort" :options="sortOptions" />
        </div>
      </template>
      <b-tab title="결제 내역 (150)" active>
        <b-row align-h="end">
          <b-col cols="auto" align-self="center">
            <b-button>엑셀 다운로드</b-button>
          </b-col>
        </b-row>
        <hr class="my-2">
        <!-- 테이블 -->
        <b-table
          class="list"
          :items="paymentItems"
          :fields="paymentFields"
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
            {{ (totalRows - (currentPage - 1) * perPage - (data.index + 1) + 1) }}
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
      </b-tab>
      <b-tab title="환불/취소 내역 (30)">
        <b-row align-h="end">
          <b-col cols="auto" align-self="center">
            <b-button>엑셀 다운로드</b-button>
          </b-col>
        </b-row>
        <hr class="my-2">
        <!-- 테이블 -->
        <b-table
          class="list"
          :items="refundItems"
          :fields="refundFields"
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
            {{ (totalRows - (currentPage - 1) * perPage - (data.index + 1) + 1) }}
          </template>
          <template #cell(setting)>
            <b-button variant="outline-secondary" class="table-inner-btn">
              삭제
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
      </b-tab>
    </b-tabs>
  </b-container>
</template>

<script>
export default {
  name: 'PaymentBreakDownPage',
  data () {
    return {
      filter: {
        email: '',
        paymentType: null,
        paySystem: null,
        startDate: '',
        endDate: '',
        sort: 1
      },
      sortOptions: [
        { value: 1, text: '최신순' }
      ],
      paymentOptions: [
        { value: 1, text: '전체' },
        { value: 2, text: '간편 결제' },
        { value: 3, text: '카드' },
        { value: 4, text: '모바일' },
        { value: 5, text: '상품권' },
        { value: 6, text: '계좌 이체' }
      ],
      paySystemOptions: [
        { value: 1, text: '전체' },
        { value: 2, text: '물약' },
        { value: 3, text: '정액제' }
      ],
      //
      currentPage: 1,
      totalRows: 0,
      perPage: 20,
      //
      paymentItems: [
        {
          id: 1,
          type: '자동 충전',
          email: 'example@example.com',
          name: '신규 결제 3900원',
          price: '3900',
          method: '간편 결제 (카카오페이)',
          status: '완료',
          time: '2022-10-24 00:00:00',
          updated_at: '2022-10-24 00:00:00'
        },
        {
          id: 21,
          type: '자동 충전',
          email: 'example@example.com',
          name: '신규 결제 3900원',
          price: '3900',
          method: '간편 결제 (카카오페이)',
          status: '완료',
          time: '2022-10-24 00:00:00',
          updated_at: '2022-10-24 00:00:00'
        },
        {
          id: 333,
          type: '자동 충전',
          email: 'example@example.com',
          name: '신규 결제 3900원',
          price: '3900',
          method: '간편 결제 (카카오페이)',
          status: '완료',
          time: '2022-10-24 00:00:00',
          updated_at: '2022-10-24 00:00:00'
        }
      ],
      paymentFields: [
        { key: 'no', label: 'No.' },
        { key: 'type', label: '종류' },
        { key: 'email', label: '아이디' },
        { key: 'name', label: '결제 상품 이름' },
        { key: 'price', label: '결제 금액' },
        { key: 'method', label: '결제 방법' },
        { key: 'status', label: '결제 상태' },
        { key: 'time', label: '결제 시간' },
        { key: 'setting', label: '설정' }
      ],
      //
      refundItems: [
        {
          id: 222,
          type: '자동 충전',
          email: 'example@example.com',
          name: '신규 결제 3900원',
          price: '3900',
          method: '간편 결제 (카카오페이)',
          status: '완료',
          time: '2022-10-24 00:00:00',
          refund_time: '2022-10-24 00:00:00'
        },
        {
          id: 123,
          type: '자동 충전',
          email: 'example@example.com',
          name: '신규 결제 3900원',
          price: '3900',
          method: '간편 결제 (카카오페이)',
          status: '완료',
          time: '2022-10-24 00:00:00',
          refund_time: '2022-10-24 00:00:00'
        },
        {
          id: 888,
          type: '자동 충전',
          email: 'example@example.com',
          name: '신규 결제 3900원',
          price: '3900',
          method: '간편 결제 (카카오페이)',
          status: '완료',
          time: '2022-10-24 00:00:00',
          refund_time: '2022-10-24 00:00:00'
        }
      ],
      refundFields: [
        { key: 'no', label: 'No.' },
        { key: 'type', label: '종류' },
        { key: 'email', label: '아이디' },
        { key: 'name', label: '결제 상품 이름' },
        { key: 'price', label: '결제 금액' },
        { key: 'method', label: '결제 방법' },
        { key: 'status', label: '결제 상태' },
        { key: 'time', label: '결제 시간' },
        { key: 'refund_time', label: '환불/취소 시간' }
      ]
    }
  },
  computed: {
    breadcrumb () {
      const arr = [
        { label: '홈', url: '/' },
        { label: '결제 관리', url: '#' },
        { label: '결제 내역', url: this.$route.path }
      ]
      return arr
    }
  },
  watch: {},
  created () {
  },
  mounted () {
    this.totalRows = this.paymentItems.length
  },
  methods: {}
}
</script>
