<template>
  <b-container fluid class="page-min-height py-3">
    <UiPageTitle
      title="콘텐츠 구매 이력"
      :breadcrumb="breadcrumb"
    />
    <hr>
    <!--    필터-->
    <b-row class="mt-3 px-3">
      <b-col lg="12" class="my-1 d-inline-flex">
        <legend class="pl-0 col-sm-2 fs-14 text-sm-left align-self-center">
          작품명
        </legend>
        <b-form-input v-model="filter.title" placeholder="작품명" class="w-30 align-self-center" />
        <b-button variant="primary" class="ml-2" @click="isSearched = true">
          찾기
        </b-button>
      </b-col>

      <b-col v-if="isSearched" cols="12" class="my-3">
        <b-card>
          <b-container fluid class="px-0">
            <b-row>
              <b-col>
                <h5>작품리스트</h5>
              </b-col>
            </b-row>
            <b-row class="mt-3">
              <b-col>
                <ul>
                  <li @click="isSelected = true; isSearched = false">
                    작품코드 작품명
                  </li>
                  <li @click="isSelected = true; isSearched = false">
                    작품코드 작품명
                  </li>
                  <li @click="isSelected = true; isSearched = false">
                    작품코드 작품명
                  </li>
                </ul>
              </b-col>
            </b-row>
          </b-container>
        </b-card>
      </b-col>

      <b-col v-else-if="isSelected" cols="12" class="my-3">
        <b-card style="min-height: 100%; height: 160px; overflow-y: scroll">
          <b-container fluid class="px-0">
            <b-row>
              <b-col>
                <h5>작품 회차</h5>
              </b-col>
            </b-row>
            <b-row class="mt-3">
              <b-col>
                <b-form-checkbox
                  v-for="(option, index) in editionOptions"
                  :key="`option-${index}`"
                  v-model="filter.selectedEdtition"
                  :value="option.value"
                  class="d-inline-flex mb-3"
                >
                  <span class="mr-3">{{ option.text }}</span>
                </b-form-checkbox>
              </b-col>
            </b-row>
          </b-container>
        </b-card>
      </b-col>

      <b-col lg="12" class="my-1">
        <b-form-group
          label="표시 기간"
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

      <b-col lg="12" class="my-1">
        <b-form-group
          v-slot="{ ariaDescribedby }"
          label="과금 내역"
          label-cols-sm="2"
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
        <b-form inline>
          <legend class="pl-0 col-sm-2 fs-14 text-sm-left">
            구매 구분
            <UiTooltipButton target-id="payment-type-tooltip" class="ml-1" />
            <UiTooltip
              target="payment-type-tooltip"
              description="전체 구매를 선택 시 설정된 회차를 다 구매한 회원 목록이 나옵니다, 개별 구매 선택 시 설정된 각 회차를 구매한 회원 목록이 나옵니다."
            />
          </legend>

          <b-form-radio-group
            id="payment-type-radio"
            v-model="filter.selectedPaymentType"
            :options="paymentOptions"
          />
        </b-form>
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
        <h6>'검색한 작품명' 이용 목록 (30)</h6>
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
        title: '',
        selectedEdtition: [],
        selectedUsageType: [],
        selectedPaymentType: null,
        startDate: '',
        endDate: ''
      },
      paymentOptions: [
        { value: 1, text: '전체 구매' },
        { value: 2, text: '개별 구매' }
      ],
      usageTypeOptions: [
        { value: 1, text: '전체' },
        { value: 2, text: '물약' },
        { value: 3, text: '호박' },
        { value: 4, text: '무료' }
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
          name: '웹툰',
          user_id: '제목',
          user_email: 'example@example.com',
          usage_type: '물약 00개',
          payment: '대여',
          time: '2022-10-20 12:00:00'
        },
        {
          id: 2123,
          name: '웹툰',
          user_id: '제목',
          user_email: 'example@example.com',
          usage_type: '물약 00개',
          payment: '대여',
          time: '2022-10-20 12:00:00'
        },
        {
          id: 1233,
          name: '웹툰',
          user_id: '제목',
          user_email: 'example@example.com',
          usage_type: '물약 00개',
          payment: '대여',
          time: '2022-10-20 12:00:00'
        }
      ],
      fields: [
        { key: 'no', label: 'No.' },
        { key: 'id', label: '화별번호' },
        { key: 'name', label: '화이름' },
        { key: 'user_id', label: '회원번호' },
        { key: 'user_email', label: '회원 아이디' },
        { key: 'payment', label: '구매 방법' },
        { key: 'usage_type', label: '이용 종류' },
        { key: 'time', label: '사용 시간' }
      ],
      isSearched: false,
      isSelected: false,
      editionOptions: [
        { value: 1, text: '전체' },
        { value: 2, text: '1화' },
        { value: 3, text: '2화' },
        { value: 4, text: '3화' },
        { value: 5, text: '4화' },
        { value: 6, text: '5화' },
        { value: 7, text: '6화' },
        { value: 8, text: '7화' },
        { value: 9, text: '8화' },
        { value: 10, text: '9화' },
        { value: 11, text: '10화' },
        { value: 12, text: '11화' },
        { value: 13, text: '12화' },
        { value: 14, text: '13화' },
        { value: 15, text: '14화' },
        { value: 16, text: '15화' },
        { value: 17, text: '16화' },
        { value: 18, text: '17화' },
        { value: 19, text: '18화' },
        { value: 20, text: '19화' },
        { value: 21, text: '20화' },
        { value: 1, text: '전체' },
        { value: 2, text: '1화' },
        { value: 3, text: '2화' },
        { value: 4, text: '3화' },
        { value: 5, text: '4화' },
        { value: 6, text: '5화' },
        { value: 7, text: '6화' },
        { value: 8, text: '7화' },
        { value: 9, text: '8화' },
        { value: 10, text: '9화' },
        { value: 11, text: '10화' },
        { value: 12, text: '11화' },
        { value: 13, text: '12화' },
        { value: 14, text: '13화' },
        { value: 15, text: '14화' },
        { value: 16, text: '15화' },
        { value: 17, text: '16화' },
        { value: 18, text: '17화' },
        { value: 19, text: '18화' },
        { value: 20, text: '19화' },
        { value: 21, text: '20화' },
        { value: 1, text: '전체' },
        { value: 2, text: '1화' },
        { value: 3, text: '2화' },
        { value: 4, text: '3화' },
        { value: 5, text: '4화' },
        { value: 6, text: '5화' },
        { value: 7, text: '6화' },
        { value: 8, text: '7화' },
        { value: 9, text: '8화' },
        { value: 10, text: '9화' },
        { value: 11, text: '10화' },
        { value: 12, text: '11화' },
        { value: 13, text: '12화' },
        { value: 14, text: '13화' },
        { value: 15, text: '14화' },
        { value: 16, text: '15화' },
        { value: 17, text: '16화' },
        { value: 18, text: '17화' },
        { value: 19, text: '18화' },
        { value: 20, text: '19화' },
        { value: 21, text: '20화' },
        { value: 1, text: '전체' },
        { value: 2, text: '1화' },
        { value: 3, text: '2화' },
        { value: 4, text: '3화' },
        { value: 5, text: '4화' },
        { value: 6, text: '5화' },
        { value: 7, text: '6화' },
        { value: 8, text: '7화' },
        { value: 9, text: '8화' },
        { value: 10, text: '9화' },
        { value: 11, text: '10화' },
        { value: 12, text: '11화' },
        { value: 13, text: '12화' },
        { value: 14, text: '13화' },
        { value: 15, text: '14화' },
        { value: 16, text: '15화' },
        { value: 17, text: '16화' },
        { value: 18, text: '17화' },
        { value: 19, text: '18화' },
        { value: 20, text: '19화' },
        { value: 21, text: '20화' }
      ]
    }
  },
  computed: {
    breadcrumb () {
      const arr = [
        { label: '홈', url: '/' },
        { label: '이용 현황', url: '#' },
        { label: '콘텐츠 구매 이력', url: this.$route.path }
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
