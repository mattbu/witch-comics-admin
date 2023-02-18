<template>
  <b-container fluid class="page-min-height py-3">
    <UiPageTitle title="권한 그룹 등록" :breadcrumb="breadcrumb">
      <template #buttons>
        <!-- <b-button
          variant="outline-primary"
          @click="$router.push('/manager/inner-admin')"
        >
          취소
        </b-button> -->
        <b-button variant="primary" @click="enroll">
          등록
        </b-button>
      </template>
    </UiPageTitle>
    <hr>
    <!--필터-->
    <b-row class="px-3">
      <b-col lg="12" class="mb-2">
        <b-form-group
          label="권한그룹명"
          label-cols-sm="2"
          label-align-sm="left"
          label-size="sm"
          class="mb-0 align-items-center"
        >
          <div class="d-flex">
            <b-form-input />
          </div>
        </b-form-group>
      </b-col>
    </b-row>
    <hr class="my-2">

    <b-row class="pt-5">
      <b-col align-self="center">
        <h6>권한 설정</h6>
      </b-col>
    </b-row>
    <hr class="my-2">
    <b-row>
      <b-col cols="auto" align-self="center" class="my-2">
        <b-form-checkbox-group :style="{ backgroundColor: '#f2f2f2' }"
          id="checkbox-group-1"
          v-model="filter.type"
          :options="powerGroupInfoOptions"
          class="d-flex justify-content-start p-2"
          :aria-describedby="ariaDescribedby"
          name="flavour-1"
        />
      </b-col>
    </b-row>
    <hr class="my-2">

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
      sortOptions: [{ text: '최신순', value: 1 }],
      filter: {
        search: 1,
        type: [],
        status: [],
        period: '',
        dateSearch: 1
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
        {
          id: 3,
          email: '화화원행기',
          account: 1,
          position: '2018.10.29',
          account_active: '2018.10.29',
          recent_login: '대여'
        }
      ],
      fields: [
        { key: 'no', label: '번호' },
        { key: 'email', label: '아이디' },
        { key: 'account', label: '계정명' },
        { key: 'position', label: '소속부서' },
        { key: 'account_active', label: '계정 활성화' },
        { key: 'recent_login', label: '최근 로그인' }
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
        { label: '관리자 관리', url: '#' },
        { label: '권한 그룹 등록', url: this.$route.path }
      ]
      return arr
    }
  },
  watch: {},
  mounted () {
    this.totalRows = this.items.length
  },
  methods: {
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
