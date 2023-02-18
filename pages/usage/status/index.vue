<template>
  <b-container fluid class="page-min-height py-3">
    <UiPageTitle
      title="사용자 이용 현황"
      :breadcrumb="breadcrumb"
    />
    <hr>
    <!--    필터-->
    <b-row class="mt-3 px-3">
      <b-col lg="12" class="my-1">
        <b-form-group
          v-slot="{ ariaDescribedby }"
          label="아이디"
          label-cols-sm="1"
          label-align-sm="left"
          label-size="sm"
          class="mb-0"
        >
          <b-form-input v-model="filter.userId" placeholder="아이디" :aria-describedby="ariaDescribedby" />
        </b-form-group>
      </b-col>

      <b-col lg="12" class="my-1">
        <b-form-group
          v-slot="{ ariaDescribedby }"
          label="콘텐츠"
          label-cols-sm="1"
          label-align-sm="left"
          label-size="sm"
          class="mb-0"
        >
          <b-form-checkbox-group
            v-model="filter.selectedContentType"
            :options="contentTypeOptions"
            :aria-describedby="ariaDescribedby"
            class="mt-1"
          />
        </b-form-group>
      </b-col>

      <b-col lg="12" class="my-1">
        <b-form-group
          v-slot="{ ariaDescribedby }"
          label="이용 종류"
          label-cols-sm="1"
          label-align-sm="left"
          label-size="sm"
          class="mb-0"
        >
          <b-form-checkbox-group
            v-model="filter.selectedUsageType"
            :options="usageTypeOptions"
            :aria-describedby="ariaDescribedby"
            class="mt-1"
          />
        </b-form-group>
      </b-col>

      <b-col lg="12" class="my-1">
        <b-form-group
          v-slot="{ ariaDescribedby }"
          label="과금 내역"
          label-cols-sm="1"
          label-align-sm="left"
          label-size="sm"
          class="mb-0"
        >
          <b-form-checkbox-group
            v-model="filter.selectedPaymentType"
            :options="paymentTypeOptions"
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
        <h6>'검색한 이메일' 이용 목록 (30)</h6>
      </b-col>
      <b-col align-self="center" class="d-inline-flex justify-content-end">
        <b-form-select v-model="selectedOrder" :options="orderOptions" class="w-30" />
        <b-form-select v-model="perPage" :options="perPageOptions" class="w-30 ml-2" />
      </b-col>
    </b-row>
    <hr class="my-2">
    <b-row align-h="end" class="mb-4">
      <b-col cols="auto">
        <b-button variant="primary">
          엑셀 다운로드
        </b-button>
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
  name: 'UsageListPage',
  data () {
    return {
      filter: {
        userId: '',
        selectedContentType: [],
        selectedUsageType: [],
        selectedPaymentType: []
      },
      contentTypeOptions: [
        { value: 1, text: '전체' },
        { value: 2, text: '웹툰' },
        { value: 3, text: '매거진' },
        { value: 4, text: '소설' }
      ],
      usageTypeOptions: [
        { value: 1, text: '전체' },
        { value: 2, text: '물약' },
        { value: 3, text: '호박' },
        { value: 4, text: '정액제' },
        { value: 5, text: '무료' }
      ],
      paymentTypeOptions: [
        { value: 1, text: '전체' },
        { value: 2, text: '대여' },
        { value: 3, text: '소장' }
      ],
      selectedOrder: 1,
      orderOptions: [
        { value: 1, text: '인기순' },
        { value: 2, text: '최신순' }
      ],
      currentPage: 1,
      totalRows: 0,
      perPage: 10,
      perPageOptions: [
        { value: 10, text: '10개씩 보기' },
        { value: 20, text: '20개씩 보기' },
        { value: 30, text: '30개씩 보기' },
        { value: 50, text: '50개씩 보기' }
      ],
      items: [
        {
          id: 132,
          category: '웹툰',
          title: '제목',
          usage_type: '물약 00개',
          payment: '대여',
          time: '2022-10-20 12:00:00'
        },
        {
          id: 2123,
          category: '웹툰',
          title: '제목',
          usage_type: '물약 00개',
          payment: '대여',
          time: '2022-10-20 12:00:00'
        },
        {
          id: 1233,
          category: '웹툰',
          title: '제목',
          usage_type: '물약 00개',
          payment: '대여',
          time: '2022-10-20 12:00:00'
        }
      ],
      fields: [
        { key: 'no', label: 'No.' },
        { key: 'id', label: '작품번호' },
        { key: 'category', label: '콘텐츠' },
        { key: 'title', label: '작품 제목' },
        { key: 'usage_type', label: '이용 종류' },
        { key: 'payment', label: '과금 내역' },
        { key: 'time', label: '사용 시간' }
      ]
    }
  },
  computed: {
    breadcrumb () {
      const arr = [
        { label: '홈', url: '/' },
        { label: '이용 현황', url: '#' },
        { label: '사용자 이용 현황', url: this.$route.path }
      ]
      return arr
    }
  },
  watch: {},
  created () {
  },
  mounted () {
    this.totalRows = this.items.length
  },
  methods: {}
}
</script>
