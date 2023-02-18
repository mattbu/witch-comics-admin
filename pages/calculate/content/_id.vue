<template>
  <b-container fluid class="page-min-height py-3">
    <UiPageTitle title="콘텐츠별 결제 내역 상세" :breadcrumb="breadcrumb" />
    <hr>
    <b-row class="pt-5" align-h="between">
      <b-col align-self="center">
        <h6>엔네아드 회차별 내역</h6>
      </b-col>
      <b-col align-self="center" class="d-inline-flex justify-content-end">
        <div class="d-inline-flex w-50">
          <b-form-datepicker
            v-model="filter.startDate"
            placeholder="선택"
            :date-format-options="{
              year: 'numeric',
              month: 'numeric',
              day: 'numeric'
            }"
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
          />
        </div>
      </b-col>
    </b-row>
    <hr class="my-2">
    <b-row align-h="end" class="mb-2">
      <b-col cols="auto" align-self="center">
        <b-button>엑셀 다운로드</b-button>
      </b-col>
    </b-row>
    <!-- 테이블 -->
    <b-table-simple class="list split-header">
      <b-thead>
        <b-tr>
          <b-th
            v-for="(th, thIdx) in fields"
            :key="`th-${thIdx}`"
            :rowspan="setRowSpan(th.key)"
            :colspan="setColspan(th.key)"
          >
            {{ th.label }}
          </b-th>
        </b-tr>
        <b-tr>
          <b-th>대여</b-th>
          <b-th>소장</b-th>
          <b-th>대여</b-th>
          <b-th>소장</b-th>
        </b-tr>
      </b-thead>
      <b-tbody>
        <b-tr v-for="(tr, trIdx) in items" :key="`tr-${trIdx}`">
          <b-td
            v-for="(td, tdIdx) in sortTableItems(tr, fields)"
            :key="`td-${tdIdx}`"
            :colspan="setBodyColspan(td.key)"
          >
            <template v-if="td.key === 'potion' || td.key === 'fixed_charge'">
              <b-row>
                <b-col v-for="key in td.value" :key="`sns-${key}`">
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
import { sortTableItems } from '@/plugins/mixins'

export default {
  name: 'CalculateContentDetailPage',
  mixins: [sortTableItems],
  data () {
    return {
      filter: {
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
      contentOptions: [
        { value: 1, text: '전체' },
        { value: 2, text: '웹툰/만화' },
        { value: 3, text: '소설' },
        { value: 4, text: '매거진' }
      ],
      //
      currentPage: 1,
      totalRows: 0,
      perPage: 20,
      //
      items: [
        {
          id: 5,
          title: '엔네아드',
          edition: '123화',
          cp: '서울 문화사',
          pumpkin: '520',
          potion: {
            rent: '64',
            own: '80'
          },
          fixed_charge: {
            rent: '90',
            own: '180'
          },
          free_user: '3',
          payed_user: '1',
          payed: '6000',
          payment: '10000'
        },
        {
          id: 20,
          title: '엔네아드',
          edition: '124화',
          cp: '서울 문화사',
          pumpkin: '520',
          potion: {
            rent: '64',
            own: '80'
          },
          fixed_charge: {
            rent: '90',
            own: '180'
          },
          free_user: '3',
          payed_user: '1',
          payed: '6000',
          payment: '10000'
        },
        {
          id: 3,
          title: '엔네아드',
          edition: '125화',
          cp: '서울 문화사',
          pumpkin: '520',
          potion: {
            rent: '64',
            own: '80'
          },
          fixed_charge: {
            rent: '90',
            own: '180'
          },
          free_user: '3',
          payed_user: '1',
          payed: '6000',
          payment: '10000'
        }
      ],
      fields: [
        { key: 'title', label: '작품명' },
        { key: 'edition', label: '회차' },
        { key: 'cp', label: '출판사' },
        { key: 'pumpkin', label: '호박 결제' },

        { key: 'potion', label: '물약 결제' },
        { key: 'fixed_charge', label: '이용권' },

        { key: 'free_user', label: '무료 이용자' },
        { key: 'payed_user', label: '유료 결제자' },
        { key: 'payed', label: '유료 결제' },
        { key: 'payment', label: '총 결제' }
      ]
    }
  },
  computed: {
    breadcrumb () {
      const arr = [
        { label: '홈', url: '/' },
        { label: '정산 관리', url: '#' },
        { label: '콘텐츠별 결제 내역', url: '/calculate/content' },
        { label: '콘텐츠별 결제 내역 상세', url: this.$route.fullPath }
      ]
      return arr
    }
  },
  watch: {},
  created () {},
  mounted () {
    this.totalRows = this.items.length
  },
  methods: {
    setBodyColspan (key) {
      if (key === 'potion') {
        return 2
      } else if (key === 'fixed_charge') {
        return 2
      } else {
        return null
      }
    },
    setRowSpan (key) {
      if (key === 'potion') {
        return null
      } else if (key === 'fixed_charge') {
        return null
      } else {
        return 2
      }
    },
    setColspan (key) {
      if (key === 'potion') {
        return 2
      } else if (key === 'fixed_charge') {
        return 2
      } else {
        return null
      }
    }
  }
}
</script>
