<template>
  <b-container fluid class="page-min-height py-3">
    <UiPageTitle title="회원가입" :breadcrumb="breadcrumb">
      <template #buttons>
        <b-button variant="primary" to="/promotion/join/add">
          등록
        </b-button>
      </template>
    </UiPageTitle>
    <hr>
    <!--필터-->
    <b-row class="mt-3 px-3">
      <!-- 상태-->
      <b-col lg="12" class="my-1">
        <b-form-group
          v-slot="{ ariaDescribedby }"
          label="프로모션 상태"
          label-cols-sm="2"
          label-align-sm="left"
          label-size="sm"
          class="mb-0"
        >
          <b-form-checkbox-group
            v-model="filter.status"
            :options="statusOptions"
            :aria-describedby="ariaDescribedby"
            class="mt-1"
          />
        </b-form-group>
      </b-col>

      <b-col lg="12" class="my-1">
        <b-form-group
          v-slot="{ ariaDescribedby }"
          label="프로모션 기간"
          label-cols-sm="2"
          label-align-sm="left"
          label-size="sm"
          class="mb-0"
        >
          <b-form-radio-group
            v-model="filter.promotionPeriod"
            :options="periodOptions"
            :aria-describedby="ariaDescribedby"
            class="mt-1"
          />
          <div class="d-inline-flex justify-content-start w-100 my-2">
            <div class="d-inline-flex w-40">
              <b-form-datepicker
                v-model="startDate"
                label-help=""
                hide-header
                placeholder="선택"
                :date-format-options="{
                  year: 'numeric',
                  month: 'numeric',
                  day: 'numeric'
                }"
              />
              <b-form-datepicker
                v-model="endDate"
                label-help=""
                hide-header
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
        <h6>프로모션 로그인 내역 (10)</h6>
      </b-col>
    </b-row>
    <hr class="my-2">

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
      <template #cell(setting)="data">
        <b-button
          variant="outline-secondary"
          :to="`/promotion/login/${data.item.id}`"
          class="table-inner-btn"
        >
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
  </b-container>
</template>

<script>
export default {
  name: 'ContentPieceListPage',

  data () {
    return {
      filter: {
        search: 1,
        type: [],
        status: [],
        period: ''
      },
      currentSettingId: '',
      // 프로모션 상태
      selectAllStatus: false,
      indeterminate: false,
      statusOptions: [
        { value: '대기', text: '대기' },
        { value: '진행중', text: '진행중' },
        { value: '종료', text: '종료' }
      ],
      // 프로모션 기간
      periodOptions: [
        { value: '시작일', text: '시작일' },
        { value: '종료일', text: '종료일' }
      ],
      items: [
        {
          id: 1,
          divisionName: '11월 지급 이벤트',
          start_at: '2022-09-25 00:00',
          end_at: '2022-09-25 00:00',
          givePumpkin: '30',
          givePotion: '30',
          point_end_at: '2022-09-25 00:00',
          status: '진행중',
          regist_at: '2022-09-25 00:00',
          admin: '박담당',
          setting: '삭제'
        },
        {
          id: 1,
          divisionName: '11월 지급 이벤트',
          start_at: '2022-09-25 00:00',
          end_at: '2022-09-25 00:00',
          givePumpkin: '30',
          givePotion: '30',
          point_end_at: '2022-09-25 00:00',
          status: '진행중',
          regist_at: '2022-09-25 00:00',
          admin: '박담당',
          setting: '삭제'
        },
        {
          id: 1,
          divisionName: '11월 지급 이벤트',
          start_at: '2022-09-25 00:00',
          end_at: '2022-09-25 00:00',
          givePumpkin: 30,
          givePotion: 30,
          point_end_at: '2022-09-25 00:00',
          status: '진행중',
          regist_at: '2022-09-25 00:00',
          admin: '박담당',
          setting: '삭제'
        }
      ],
      fields: [
        { key: 'no', label: '번호' },
        { key: 'divisionName', label: '구분명' },
        { key: 'start_at', label: '시작일' },
        { key: 'end_at', label: '종료일' },
        { key: 'givePumpkin ', label: '지급호박' },
        { key: 'givePotion', label: '지급물약' },
        { key: 'point_end_at', label: '포인트 만료일' },
        { key: 'status', label: '상태' },
        { key: 'regist_at', label: '등록일' },
        { key: 'admin', label: '등록/최종수정' },
        { key: 'setting', label: '관리' }
      ],
      totalRows: 1,
      currentPage: 1,
      perPage: 5,
      filterSort: [],
      filterAdult: [],
      searchValue: '',
      startDate: '',
      endDate: ''
    }
  },
  computed: {
    breadcrumb () {
      const arr = [
        { label: '홈', url: '/' },
        { label: '프로모션 관리', url: '#' },
        { label: '회원가입', url: this.$route.path }
      ]
      return arr
    }
  },
  watch: {},
  mounted () {
    this.totalRows = this.items.length
  },
  methods: {
    openSetting (id) {
      this.disabledTooltip = !this.disabledTooltip

      if (this.disabledTooltip) {
        this.$refs[`setting-${id}`].$emit('open')
      } else {
        this.$refs[`setting-${id}`].$emit('close')
      }

      this.$root.$on('bv::tooltip::shown', (e) => {
        this.currentSettingId = e.target.id
      })
    }
  }
}
</script>
