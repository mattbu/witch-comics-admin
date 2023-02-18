<template>
  <b-container fluid class="page-min-height py-3">
    <UiPageTitle
      title="회원 현황"
      :breadcrumb="breadcrumb"
    />
    <hr>
    <b-row class="mt-3 px-3">
      <b-col lg="12" class="my-1">
        <b-form-group
          label="기간"
          label-cols-sm="2"
          label-align-sm="left"
          label-size="sm"
          class="mb-0"
        >
          <div class="d-inline-flex w-100">
            <div class="d-inline-flex justify-content-between w-50">
              <b-form-datepicker
                v-model="filter.startDate"
                placeholder="선택"
                :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
                class="w-45"
              />
              <span class="align-self-center text-center w-10">~</span>
              <b-form-datepicker
                v-model="filter.endDate"
                placeholder="선택"
                :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
                class="ml-2 w-45"
              />
            </div>
            <div class="d-inline-flex ml-2">
              <b-button variant="outline-secondary" class="">
                검색
              </b-button>
            </div>
          </div>
        </b-form-group>
      </b-col>
    </b-row>
    <b-row class="pt-5">
      <b-col align-self="center">
        <h6>통합 현황 ({{ !isTable ? '차트' : '표' }})</h6>
      </b-col>
      <b-col align-self="center" class="text-right">
        <b-button @click="isTable = !isTable">
          {{ !isTable ? '표' : '차트' }} 보기
        </b-button>
      </b-col>
    </b-row>
    <hr class="my-2">
    <b-row align-h="between" class="mb-4">
      <b-col cols="auto">
        <b-button variant="outline-primary" class="table-inner-btn">
          일 별
        </b-button>
        <b-button variant="outline-primary" class="table-inner-btn">
          주 별
        </b-button>
        <b-button variant="outline-primary" class="table-inner-btn">
          월 별
        </b-button>
        <b-button variant="outline-primary" class="table-inner-btn">
          년 별
        </b-button>
      </b-col>
      <b-col v-if="isTable" cols="auto">
        <b-button variant="primary">
          엑셀 다운로드
        </b-button>
      </b-col>
    </b-row>
    <template v-if="!isTable">
      <bar-chart
        chart-id="testId"
        :chart-data="chartData"
        :chart-options="chartOptions"
        style="height: 500px"
      />
    </template>
    <template v-else>
      <b-table-simple class="list split-header">
        <b-thead>
          <b-tr>
            <b-th
              v-for="(th, thIdx) in fields"
              :key="`th-${thIdx}`"
              :rowspan="thIdx !== 3 ? 2 : null"
              :colspan="thIdx === 3 ? 5 : null"
            >
              {{ th.label }}
            </b-th>
          </b-tr>
          <b-tr>
            <b-th>카카오</b-th>
            <b-th>네이버</b-th>
            <b-th>페이스북</b-th>
            <b-th>페이코</b-th>
            <b-th>구글</b-th>
          </b-tr>
        </b-thead>
        <b-tbody>
          <b-tr
            v-for="(tr, trIdx) in items"
            :key="`tr-${trIdx}`"
          >
            <b-td
              v-for="(td, tdIdx) in sortTableItems(tr, fields)"
              :key="`td-${tdIdx}`"
              :colspan="td.key === 'sns_join' ? 5 : null"
            >
              <template v-if="td.key === 'no'">
                {{ (totalRows - (currentPage - 1) * perPage - (trIdx + 1) + 1) }}
              </template>
              <template v-else-if="td.key === 'sns_join'">
                <b-row>
                  <b-col v-for="(key) in td.value" :key="`sns-${key}`">
                    {{ key }}
                  </b-col>
                </b-row>
              </template>
              <template v-else>
                {{ td.value }}
              </template>
            </b-td>
          </b-tr>
        </b-tbody>
      </b-table-simple>
    </template>
  </b-container>
</template>

<script>
import { sortTableItems } from '@/plugins/mixins'

export default {
  name: 'StatisticsUserPage',
  mixins: [sortTableItems],
  data () {
    return {
      filter: {
        startDate: '',
        endDate: ''
      },
      //
      isTable: false,
      //
      currentPage: 1,
      totalRows: 0,
      perPage: 10,
      //
      items: [
        {
          id: 3,
          date: '2022-10-24',
          normal_join: '32',
          sns_join: {
            kakao: '144',
            naver: '90',
            facebook: '24',
            payco: '10',
            google: '321'
          },
          current_users: '10000',
          withdraw_users: '10000',
          all_users: '10000'
        },
        {
          id: 4,
          date: '2022-10-24',
          normal_join: '32',
          sns_join: {
            kakao: '144',
            naver: '90',
            facebook: '24',
            payco: '10',
            google: '321'
          },
          current_users: '10000',
          withdraw_users: '10000',
          all_users: '10000'
        },
        {
          id: 5,
          date: '2022-10-24',
          normal_join: '32',
          sns_join: {
            kakao: '144',
            naver: '90',
            facebook: '24',
            payco: '10',
            google: '321'
          },
          current_users: '10000',
          withdraw_users: '10000',
          all_users: '10000'
        }
      ],
      fields: [
        { key: 'no', label: 'No.' },
        { key: 'date', label: '날짜' },
        { key: 'normal_join', label: '일반 가입' },
        { key: 'sns_join', label: '간편 가입' },
        { key: 'current_users', label: '가입 회원' },
        { key: 'withdraw_users', label: '탈퇴 회원' },
        { key: 'all_users', label: '총 회원' }
      ],
      // 차트
      chartData: {
        labels: ['2022-07', '2022-08', '2022-09', '2022-10'],
        datasets: [
          {
            label: '가입 회원',
            backgroundColor: '#f87979',
            data: [80, 39, 10, 40]
          },
          {
            label: '일반 가입',
            backgroundColor: '#5533CC',
            data: [40, 39, 10, 40]
          },
          {
            label: '간편 가입 (카카오)',
            backgroundColor: '#FEE500',
            data: [20, 10, 12, 33],
            stack: 'stack 1'
          },
          {
            label: '간편 가입 (페이스북)',
            backgroundColor: '#1877F2',
            data: [20, 10, 12, 33],
            stack: 'stack 1'
          },
          {
            label: '간편 가입 (구글)',
            backgroundColor: '#E2E2E2',
            data: [20, 10, 12, 33],
            stack: 'stack 1'
          },
          {
            label: '간편 가입 (페이코)',
            backgroundColor: '#E7322D',
            data: [20, 10, 12, 33],
            stack: 'stack 1'
          },
          {
            label: '간편 가입 (네이버)',
            backgroundColor: '#03C75A',
            data: [20, 10, 12, 33],
            stack: 'stack 1'
          },
          {
            label: '탈퇴 회원',
            backgroundColor: '#9d9d9d',
            data: [20, 10, 12, 33]
          },
          {
            label: '신규 방문자',
            backgroundColor: '#faa470',
            data: [20, 10, 12, 33],
            stack: 'stack 2'
          },
          {
            label: '재방문자',
            backgroundColor: '#fc7b33',
            data: [30, 10, 12, 33],
            stack: 'stack 2'
          }
        ]
      },
      chartOptions: {
        responsive: true,
        maintainAspectRatio: false
      }
    }
  },
  computed: {
    breadcrumb () {
      const arr = [
        { label: '홈', url: '/' },
        { label: '통계', url: '#' },
        { label: '회원 현황', url: this.$route.path }
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
