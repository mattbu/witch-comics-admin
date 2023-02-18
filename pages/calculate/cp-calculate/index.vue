<template>
  <b-container fluid class="page-min-height py-3">
    <UiPageTitle title="CP사 정산관리" :breadcrumb="breadcrumb" />
    <hr>
    <!--필터-->
    <b-container fluid class="px-0" tag="form" @submit.prevent="getList">
      <b-row class="mt-3 px-3">
        <b-col lg="12" class="my-1">
          <b-form-group
            v-slot="{ ariaDescribedby }"
            label="CP사"
            label-cols-sm="2"
            label-align-sm="left"
            label-size="sm"
            class="mb-0"
          >
            <b-form-checkbox-group
              id="checkbox-group-1"
              v-model="filterType"
              class="my-2"
              :options="typeOptions"
              :aria-describedby="ariaDescribedby"
              name=""
            />
          </b-form-group>
        </b-col>
        <b-col lg="12" class="my-2">
          <b-form-group
            label="작품"
            label-cols-sm="2"
            label-align-sm="left"
            label-size="sm"
            class="mb-0 align-items-center"
          >
            <div class="d-inline-flex">
              <b-form-input
                v-model="searchValue"
                type="text"
                placeholder="검색어"
              />
            </div>
            <b-button variant="primary" class="ml-2">
              찾기
            </b-button>
          </b-form-group>
        </b-col>

        <b-col lg="12" class="my-2">
          <b-form-group
            label="기간"
            label-cols-sm="2"
            label-align-sm="left"
            label-size="sm"
          >
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
    </b-container>
    <b-row>
      <b-col class="d-inline-flex justify-content-between align-items-center">
        <h6 class="">
          매출 내역 ({{ totalRows ? totalRows : '0' }})
        </h6>
        <b-button variant="primary" class="mb-2">
          엑셀 다운
        </b-button>
      </b-col>
    </b-row>
    <hr class="mt-0">

    <!-- 테이블 -->
    <b-table
      class="list"
      :items="items"
      :fields="fields"
      :current-page="currentPage"
      :per-page="perPage"
      stacked="md"
      :busy="isLoading"
      show-empty
      small
    >
      <template #empty>
        <h4 class="mt-4">
          조회 가능한 데이터가 없습니다.
        </h4>
      </template>
      <template #table-busy>
        <div class="text-center text-danger my-4">
          <b-spinner variant="primary" class="align-middle" />
          <span class="ml-3">데이터를 불러오고 있습니다.</span>
        </div>
      </template>
      <template #cell(no)="data">
        {{ data.index + 1 }}
      </template>
      <template #cell(status)="data">
        <p
          v-if="data.value === 1"
          variant="info"
          class="table-inner-btn ml-2"
          :style="{ color: 'blue' }"
        >
          진행중
        </p>
        <p v-if="data.value === 2">
          대기
        </p>
        <p v-if="data.value === 3" :style="{ color: 'red' }">
          종료
        </p>
      </template>
      <template #cell(setting)="data">
        <b-button
          variant="outline-secondary"
          :to="`/calculate/cp-calculate/${data.item.id}`"
          class="table-inner-btn"
        >
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
  name: 'CpCalculateListPage',

  data () {
    return {
      cpList: null,
      totalPage: null,
      pageNum: 1,
      pageSize: 10,

      filter: {
        cp: '',
        piece: '',
        period: ''
      },

      isLoading: false,
      currentSettingId: '',
      selectedPerPage: 100,
      searchOptions: [
        { text: '작품명', value: 1 },
        { text: 'CP사', value: 2 },
        { text: '작품번호', value: 3 }
      ],
      // 유형
      typeOptions: [
        { value: 2, text: '웹툰/만화' },
        { value: 3, text: '소설' }
      ],
      // 상태:
      statusOptions: [
        { value: 2, text: '국내' },
        { value: 3, text: '해외' }
      ],
      // 기간 검색
      dateSearchOptions: [
        { value: 1, text: '시작일' },
        { value: 2, text: '종료일' },
        { value: 3, text: '등록일' }
      ],
      items: [
        // {
        //   id: 3,
        //   division: '연재',
        //   type: '웹툰/만화',
        //   name: '화화원행기',
        //   cp: '서울문화사',
        //   start_at: '2018.10.29',
        //   end_at: '2018.10.29',
        //   utilize: '대여',
        //   time: '12시간',
        //   itamu_set: '10화',
        //   regist_at: '2018.10.29',
        //   admin: '박담당',
        //   status: 3,
        //   set: '상세'
        // },
        // {
        //   id: 3,
        //   division: '연재',
        //   type: '웹툰/만화',
        //   name: '화화원행기',
        //   cp: '서울문화사',
        //   start_at: '2018.10.29',
        //   end_at: '2018.10.29',
        //   utilize: '대여',
        //   time: '12시간',
        //   itamu_set: '10화',
        //   regist_at: '2018.10.29',
        //   admin: '박담당',
        //   status: 2,
        //   set: '상세'
        // },
        // {
        //   id: 3,
        //   division: '연재',
        //   type: '웹툰/만화',
        //   name: '화화원행기',
        //   cp: '서울문화사',
        //   start_at: '2018.10.29',
        //   end_at: '2018.10.29',
        //   utilize: '대여',
        //   time: '12시간',
        //   itamu_set: '10화',
        //   regist_at: '2018.10.29',
        //   admin: '박담당',
        //   status: 1,
        //   set: '상세'
        // }
      ],
      fields: [
        { key: 'no', label: '번호' },
        { key: 'name', label: 'CP사명' },
        { key: 'rate', label: '정산(마녀:CP사)' },
        { key: 'cnt', label: '작품수' },
        { key: 'createdAt', label: '등록일' },
        { key: 'updatedAt', label: '수정일' },
        { key: 'setting', label: '관리' }
      ],
      totalRows: 0,
      currentPage: 1,
      perPage: 10,
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
        { label: '정산 관리', url: '#' },
        { label: 'CP사 정산관리', url: this.$route.path }
      ]
      return arr
    }
  },
  watch: {
    async currentPage () {
      await this.getCpList()
    }
  },
  mounted () {
    // this.totalRows = this.items.length
  },
  methods: {
    async getCpList () {
      this.isLoading = true

      try {
        const {
          data: { data }
        } = await this.$axios.get('/api/cartoon/manager/cpList', {
          params: {
            pageNum: this.currentPage,
            pageSize: this.perPage,
            penName: this.filter.name
          }
        })

        this.items = data.list
        this.totalRows = data.total
      } catch (e) {
        console.log(e)
      } finally {
        this.isLoading = false
      }
    },
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
