<template>
  <b-container fluid class="page-min-height py-3">
    <UiPageTitle
      title="물약 소진/지급 내역"
      :breadcrumb="breadcrumb"
    />
    <hr>
    <b-tabs class="mt-5 pt-5" content-class="mt-3">
      <b-tab title="물약 소진 내역 (150)" active>
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
        <hr class="my-2">
        <!-- 테이블 -->
        <b-table
          class="list"
          :items="spendItems"
          :fields="spendFields"
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
      </b-tab>
      <b-tab title="물약 지급 내역 (150)">
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
      </b-tab>
    </b-tabs>
    <b-tabs class="mt-5 pt-5" content-class="mt-3">
      <template #tabs-end>
        <div class="d-inline-flex ml-auto w-25">
          <b-form-select v-model="filter.sort" :options="sortOptions" />
          <b-form-select v-model="perPage" :options="perPageOptions" class="ml-2" />
        </div>
      </template>
      <b-tab title="소비 내역 (150)" active>
        <b-row align-h="end">
          <b-col cols="auto" align-self="center">
            <b-button>엑셀 다운로드</b-button>
          </b-col>
        </b-row>
        <hr class="my-2">
        <!-- 테이블 -->
        <b-table
          class="list"
          :items="spendItems"
          :fields="spendFields"
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
      </b-tab>
      <b-tab title="지급 내역 (30)">
        <b-row align-h="end">
          <b-col cols="auto" align-self="center">
            <b-button>엑셀 다운로드</b-button>
          </b-col>
        </b-row>
        <hr class="my-2">
        <!-- 테이블 -->
        <b-table
          class="list"
          :items="giveItems"
          :fields="giveFields"
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
      </b-tab>
    </b-tabs>
  </b-container>
</template>

<script>
export default {
  name: 'PaymentPointPage',
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
      perPageOptions: [
        { value: 20, text: '20개씩 보기' },
        { value: 30, text: '30개씩 보기' },
        { value: 50, text: '50개씩 보기' }
      ],
      //
      currentPage: 1,
      totalRows: 0,
      perPage: 20,
      //
      spendItems: [
        {
          id: 15,
          email: 'example@example.com',
          count: '30',
          spend: '엔네아드 1화',
          use: '대여',
          created_at: '2022-10-24 00:00:00'
        },
        {
          id: 159,
          email: 'example@example.com',
          count: '30',
          spend: '엔네아드 1화',
          use: '대여',
          created_at: '2022-10-24 00:00:00'
        },
        {
          id: 215,
          email: 'example@example.com',
          count: '30',
          spend: '엔네아드 1화',
          use: '대여',
          created_at: '2022-10-24 00:00:00'
        }
      ],
      spendFields: [
        { key: 'no', label: 'No.' },
        { key: 'email', label: '아이디' },
        { key: 'count', label: '물약 수' },
        { key: 'spend', label: '소진 내역' },
        { key: 'use', label: '사용 내역' },
        { key: 'created_at', label: '날짜' }
      ],
      giveItems: [
        {
          id: 1,
          email: 'example@example.com',
          count: '30',
          reason: '지급 사유',
          admin: 'OOO',
          created_at: '2022-10-24 00:00:00'
        },
        {
          id: 13,
          email: 'example@example.com',
          count: '30',
          reason: '지급 사유',
          admin: 'OOO',
          created_at: '2022-10-24 00:00:00'
        },
        {
          id: 15,
          email: 'example@example.com',
          count: '30',
          reason: '지급 사유',
          admin: 'OOO',
          created_at: '2022-10-24 00:00:00'
        }
      ],
      giveFields: [
        { key: 'no', label: 'No.' },
        { key: 'email', label: '아이디' },
        { key: 'count', label: '물약 수' },
        { key: 'reason', label: '지급 사유' },
        { key: 'admin', label: '담당자' },
        { key: 'created_at', label: '날짜' }
      ]
    }
  },
  computed: {
    breadcrumb () {
      const arr = [
        { label: '홈', url: '/' },
        { label: '결제 관리', url: '#' },
        { label: '물약 소진/지급 내역', url: this.$route.path }
      ]
      return arr
    }
  },
  watch: {},
  created () {
  },
  mounted () {
    this.totalRows = this.spendItems.length
  },
  methods: {}
}
</script>
