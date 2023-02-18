<template>
  <b-container fluid class="page-min-height py-3">
    <UiPageTitle title="메시지 내역" :breadcrumb="breadcrumb" />
    <hr>
    <!--    필터-->
    <b-row class="mt-3 px-3">
      <b-col lg="12" class="my-1">
        <b-form-group
          label="검색 기간"
          label-cols-sm="2"
          label-align-sm="left"
          label-size="sm"
          class="mb-0"
        >
          <div class="d-flex justify-content-start w-100">
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
          label="수신인"
          label-cols-sm="2"
          label-align-sm="left"
          label-size="sm"
          class="mb-0"
        >
          <div class="d-inline-flex">
            <b-form-input v-model="filter.receiver" type="text" />
            <b-form-select
              v-model="filter.group"
              :options="groupOptions"
              class="ml-2"
            />
          </div>
        </b-form-group>
      </b-col>

      <b-col lg="12" class="my-1">
        <b-form-group
          v-slot="{ ariaDescribedby }"
          label="메시지 종류"
          label-cols-sm="2"
          label-align-sm="left"
          label-size="sm"
          class="mb-0"
        >
          <b-form-checkbox-group
            v-model="filter.type"
            :aria-describedby="ariaDescribedby"
            class="mt-1"
          >
            <b-form-checkbox value="isActive">
              알림
            </b-form-checkbox>
            <b-form-checkbox value="isActive">
              카카오
            </b-form-checkbox>
          </b-form-checkbox-group>
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
        <h6>메시지 내역 (1000)</h6>
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
      <template #cell(no)="data">
        {{ totalRows - (currentPage - 1) * perPage - (data.index + 1) + 1 }}
      </template>
      <template #cell(setting)>
        <b-button variant="outline-secondary" class="table-inner-btn">
          상세
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
  name: 'UserMessageListPage',

  data () {
    return {
      totalRows: 1,
      currentPage: 1,
      perPage: 5,
      //
      filter: {
        startDate: '',
        endDate: '',
        receiver: '',
        group: 1,
        type: null
      },
      selectedSearch: 1,
      groupOptions: [{ value: 1, text: '그룹 선택' }],
      items: [
        {
          id: 1,
          receiver: '전체',
          type: '알림',
          message: '이벤트 알림',
          admin: '박담당',
          created_at: '2022-10-21 12:00'
        },
        {
          id: 3,
          receiver: '전체',
          type: '알림',
          message: '이벤트 알림',
          admin: '박담당',
          created_at: '2022-10-21 12:00'
        },
        {
          id: 5,
          receiver: '전체',
          type: '알림',
          message: '이벤트 알림',
          admin: '박담당',
          created_at: '2022-10-21 12:00'
        }
      ],
      fields: [
        { key: 'no', label: 'No.' },
        { key: 'receiver', label: '수신인' },
        { key: 'type', label: '메시지 종류' },
        { key: 'message', label: '메시지 내용' },
        { key: 'admin', label: '담당자' },
        { key: 'created_at', label: '발송 날짜' },
        { key: 'setting', label: '관리' }
      ]
    }
  },
  computed: {
    breadcrumb () {
      const arr = [
        { label: '홈', url: '/' },
        { label: '회원 관리', url: '#' },
        { label: '메시지', url: '#' },
        { label: '메시지 내역', url: this.$route.path }
      ]
      return arr
    }
  },
  watch: {},
  mounted () {
    this.totalRows = this.items.length
  },
  methods: {}
}
</script>
