<template>
  <b-container fluid class="page-min-height py-3">
    <UiPageTitle
      title="관리자 계정"
      :breadcrumb="breadcrumb"
    >
      <template #buttons>
        <b-button variant="primary" to="/setting/admin/add">
          등록
        </b-button>
      </template>
    </UiPageTitle>
    <hr>
    <!--    필터-->
    <b-row class="px-3">
      <b-col lg="12" class="my-1">
        <b-form>
          <div class="d-inline-flex w-100">
            <legend class="pl-0 col-sm-2 fs-14 text-sm-left mb-0 align-self-center">
              이메일
            </legend>
            <b-form-input v-model="filter.email" placeholder="연결할 계정을 입력해 주세요." class="w-30 align-self-center" />
          </div>

          <div class="d-inline-flex w-100 my-3">
            <legend class="pl-0 col-sm-2 fs-14 text-sm-left mb-0 align-self-center">
              계정명
            </legend>
            <b-form-input v-model="filter.accountName" placeholder="계정명을 입력해 주세요." class="w-30 align-self-center" />
          </div>

          <div class="d-inline-flex w-100 mb-3">
            <legend class="pl-0 col-sm-2 fs-14 text-sm-left mb-0 align-self-center">
              소속
            </legend>
            <b-form-input v-model="filter.belongTo" placeholder="소속을 입력해 주세요. (예: 회사명, 팀명 등)" class="w-30 align-self-center" />
          </div>

          <div class="d-inline-flex w-100">
            <legend class="pl-0 col-sm-2 fs-14 text-sm-left mb-0 align-self-center">
              CP
            </legend>
            <b-form-select v-model="filter.cp" :options="cpOptions" class="w-30" />
          </div>
        </b-form>
      </b-col>
    </b-row>
    <hr>
    <b-row align-h="center" class="mb-4">
      <b-col cols="2">
        <b-button variant="primary" class="w-75">
          검색
        </b-button>
      </b-col>
    </b-row>
    <b-row class="pt-5" align-h="between">
      <b-col align-self="center">
        <h6>관리자 목록 (20)</h6>
      </b-col>
      <b-col align-self="center" class="text-right">
        <b-form-select v-model="filter.sort" :options="sortOptions" class="w-30" />
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
      <template #empty>
        <PageNoResult />
      </template>
      <template #cell(no)="data">
        {{ (totalRows - (currentPage - 1) * perPage - (data.index + 1) + 1) }}
      </template>
      <template #cell(setting)="data">
        <b-button variant="outline-secondary" class="table-inner-btn" :to="`/setting/admin/${data.item.id}`">
          상세보기
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
  name: 'SettingAdminPage',
  data () {
    return {
      filter: {
        email: '',
        accountName: '',
        belongTo: '',
        cp: 1,
        sort: 1
      },
      cpOptions: [
        { value: 1, text: '선택' },
        { value: 2, text: 'CP 1' },
        { value: 3, text: 'CP 2' },
        { value: 4, text: 'CP 3' }
      ],
      sortOptions: [
        { text: '최신순', value: 1 }
      ],
      //
      currentPage: 1,
      totalRows: 0,
      perPage: 20,
      //
      items: [
        {
          id: 723,
          email: 'example@example.com',
          account_name: '홍길동',
          belong_to: '사업팀',
          authorization: '전체',
          period: '무제한',
          recent: '2022-10-24'
        },
        {
          id: 321,
          email: 'example@example.com',
          account_name: '홍길동',
          belong_to: '사업팀',
          authorization: '전체',
          period: '무제한',
          recent: '2022-10-24'
        },
        {
          id: 123,
          email: 'example@example.com',
          account_name: '홍길동',
          belong_to: '사업팀',
          authorization: '전체',
          period: '무제한',
          recent: '2022-10-24'
        }
      ],
      fields: [
        { key: 'no', label: 'No.' },
        { key: 'email', label: '이메일' },
        { key: 'account_name', label: '계정명' },
        { key: 'belong_to', label: '소속' },
        { key: 'authorization', label: '권한' },
        { key: 'period', label: '활성 기간' },
        { key: 'recent', label: '최근 로그인' },
        { key: 'setting', label: '관리' }
      ]
    }
  },
  computed: {
    breadcrumb () {
      const arr = [
        { label: '홈', url: '/' },
        { label: '설정', url: '#' },
        { label: '관리자 계정', url: this.$route.path }
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
