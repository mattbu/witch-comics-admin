<template>
  <b-container fluid class="page-min-height py-3">
    <UiPageTitle title="권한 그룹 관리" :breadcrumb="breadcrumb">
      <template #buttons>
        <b-button variant="primary" to="/manager/power-group/add">
          등록
        </b-button>
      </template>
    </UiPageTitle>
    <hr>
    <!--필터-->
    <b-row class="px-3">
      <b-col lg="12" class="mb-2">
        <b-form-group
          label="권한그룹"
          label-cols-sm="2"
          label-align-sm="left"
          label-size="sm"
          class="mb-0 align-items-center"
        >
          <div class="d-flex justify-content-between">
            <b-form-select
              v-model="filter.search"
              :options="searchOptions"
              class="w-15"
            />
            <b-button variant="primary" class="w-12">
              조회
            </b-button>
          </div>
        </b-form-group>
      </b-col>
    </b-row>
    <hr class="my-2">
    <b-row class="pt-5">
      <b-col align-self="center">
        <h6>권한그룹 정보</h6>
      </b-col>
    </b-row>
    <hr class="my-2">
    <b-row>
      <b-col class="mt-1">
        <b-form-checkbox-group
          id="checkbox-group-1"
          v-model="filter.type"
          title="설정"
          :options="powerGroupInfoOptions"
          class="d-flex justify-content-start"
          :aria-describedby="ariaDescribedby"
          name="flavour-1"
        />
        <b-button variant="primary" class="w-10 mt-4">
          수정
        </b-button>
      </b-col>
    </b-row>
    <hr class="mb-4">
    <!-- <b-row align-h="center" class="mb-4">
      <b-col cols="2">
        <b-button variant="primary" class="w-75">
          수정
        </b-button>
      </b-col>
    </b-row> -->

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
        {{ totalRows - (currentPage - 1) * perPage - (data.index + 1) + 1 }}
      </template>
       <!-- 아이디 -->
       <template #cell(id)="data">
        {{ data.value ? data.value : '-' }}
      </template>
     <!-- 계정명 -->
     <template #cell(name)="data">
        {{ data.value ? data.value : '-' }}
      </template>
       <!-- 소속부서 -->
       <template #cell(part)="data">
        {{ data.value ? data.value : '-' }}
      </template>
       <!-- 계정 활성화 -->
       <template #cell(account)="data">
        {{ data.value ? data.value : '-' }}
      </template>
       <!-- 최근 로그인 -->
       <template #cell(login)="data">
        {{ data.value ? data.value : '-' }}
      </template>
    </b-table>

    <!-- cp 등록 모달 -->
    <UiCenterModal
      modal-id="add-cp-modal"
      modal-title="cp사 등록하기"
      ok-title="등록"
      cancel-title="취소"
    >
      <template #contents>
        <b-container fluid class="px-0">
          <b-row>
            <b-col>
              <table class="table border mt-3">
                <tr class="cursor-pointer">
                  <th>CP사</th>
                  <td><b-form-input /></td>
                </tr>
                <tr class="cursor-pointer">
                  <th>CP사 정산 비율</th>
                  <td>
                    <div
                      class="d-flex justify-content-start align-items-center"
                    >
                      <p>마녀</p>
                      <b-form-input class="ml-2 w-10" />
                      <p class="ml-2">
                        CP사
                      </p>
                      <b-form-input class="ml-2 w-10" />
                      <p class="ml-2">
                        *도합이 100이 되어야 합니다.
                      </p>
                    </div>
                  </td>
                </tr>
                <tr class="cursor-pointer">
                  <th>CP사 정보</th>
                  <td>
                    <b-textarea rows="6" />
                  </td>
                </tr>
              </table>
            </b-col>
          </b-row>
        </b-container>
      </template>
    </UiCenterModal>

    <!-- cp사 수 모달 -->
    <b-modal
      id="count-cp-modal"
      title="작품목록"
      ok-only
      ok-title="닫기"
      centered
      scrollable
      size="lg"
    >
      <p>
        <b-container fluid class="px-0">
          <b-row class="px-3">
            <b-col lg="12" class="">
              <b-table
                class="list"
                :items="items"
                :fields="fields"
                :current-page="currentPage"
                :per-page="perPage"
                stacked="md"
                show-empty
                small
              />
            </b-col>
          </b-row>
        </b-container>
      </p>
    </b-modal>
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
      sort: 1,
      sortOptions: [{ text: '선택', value: 1 }],
      searchOptions: [{ text: '선택', value: '선택' }],
      filter: {
        search: '선택'
      },
      currentSettingId: '',
      selectedPerPage: 100,
      powerGroupInfoOptions: [
        { text: '콘텐츠 관리', value: 1 },
        { text: '편성모듈 관리', value: 1 },
        { text: '프로모션 관리', value: 1 },
        { text: '이벤트 관리', value: 1 },
        { text: '팝업/배너 관리', value: 1 },
        { text: '회원 관리', value: 1 },
        { text: '서비스 운영관리', value: 1 },
        { text: '결제 관리', value: 1 },
        { text: '상품 관리', value: 1 },
        { text: '퀘스트 관리', value: 1 },
        { text: '정산 관리', value: 1 },
        { text: '투고 관리', value: 1 }
      ],
      items: [
        // {
        //   id: 3,
        //   email: 'acdd@gmail.com',
        //   account: '홍길동',
        //   position: '디지털 사업팀',
        //   powerGroup: '권한그룹1',
        //   accountActive: '활성화',
        //   recentLogin: '2018.10.29'
        // },
        // {
        //   id: 3,
        //   email: 'acdd@gmail.com',
        //   account: '홍길동',
        //   position: '디지털 사업팀',
        //   powerGroup: '권한그룹1',
        //   accountActive: '활성화',
        //   recentLogin: '2018.10.29'
        // },
        // {
        //   id: 3,
        //   email: 'acdd@gmail.com',
        //   account: '홍길동',
        //   position: '디지털 사업팀',
        //   powerGroup: '권한그룹1',
        //   accountActive: '활성화',
        //   recentLogin: '2018.10.29'
        // }
      ],
      // fields: [
      //   { key: 'no', label: '번호' },
      //   { key: 'email', label: '아이디' },
      //   { key: 'account', label: '계정명' },
      //   { key: 'position', label: '소속부서' },
      //   { key: 'powerGroup', label: '권한그룹' },
      //   { key: 'accountActive', label: '계정 활성화' },
      //   { key: 'recentLogin', label: '최신 로그인' }
      // ],
      // 임시 데이터
      fields: [
        { key: 'no', label: '번호' },
        { key: 'name', label: '아이디' },
        { key: 'contentCnt', label: '계정명' },
        { key: 'updatedAt', label: '소속부서' },
        { key: 'createdAt', label: '계정 활성화' },
        { key: 'createdAt', label: '최근 로그인' }
        // { key: 'setting', label: '관리' }
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
  async fetch () {
    await this.powerGroupGetList()
  },
  computed: {
    breadcrumb () {
      const arr = [
        { label: '홈', url: '/' },
        { label: '관리자 관리', url: '#' },
        { label: '권한 그룹 관리', url: this.$route.path }
      ]
      return arr
    }
  },
  watch: {},
  mounted () {
    this.totalRows = this.items.length
  },
  methods: {
    async powerGroupGetList () {
      this.isLoading = true
      try {
        const {
          data: { data }
        } = await this.$axios.get('/api/manager/admin/list', {
          params: {
            publisherName: this.searchValue,
            pageNum: this.currentPage,
            pageSize: this.perPage
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
    openModal (id) {
      this.$root.$emit('bv::show::modal', id)
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
