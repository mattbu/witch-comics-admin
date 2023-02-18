<template>
  <b-container fluid class="page-min-height py-3">
    <UiPageTitle title="마스터 관리자" :breadcrumb="breadcrumb">
      <template #buttons>
        <b-button variant="primary" to="/manager/master-account/add">
          등록
        </b-button>
      </template>
    </UiPageTitle>
    <hr>
    <b-container
      fluid
      class="px-0"
      tag="form"
      @submit.prevent="totalMasterList"
    >
      <b-row class="px-3">
        <b-col lg="12" class="mb-2">
          <b-form-group
            label="검색"
            label-cols-sm="2"
            label-align-sm="left"
            label-size="sm"
            class="align-items-center"
          >
            <div class="d-flex">
              <b-form-select
                v-model="filter.search"
                :options="searchOptions"
                class="w-15"
              />
              <b-form-input class="ml-2 w-25" />
            </div>
          </b-form-group>
        </b-col>
      </b-row>

      <b-row class="px-3">
        <b-col lg="12" class="mb-2">
          <b-form-group
            label="CP사"
            label-cols-sm="2"
            label-align-sm="left"
            label-size="sm"
            class="align-items-center"
          >
            <div class="d-flex">
              <b-form-select
                v-model="filter.cp"
                :options="cpOptions"
                class="w-15"
              />
            </div>
          </b-form-group>
        </b-col>
      </b-row>
    </b-container>
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
        <h6>관리자 목록({{ totalRows ? totalRows : '0' }})</h6>
      </b-col>
      <b-col cols="auto" align-self="center" class="w-10">
        <b-form-select v-model="sort" :options="sortOptions" />
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
      :busy="isLoading"
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
      <template #cell(email)="data">
        <NuxtLink :to="`/manager/master-account/${data.item.id}/edit`">
          {{ data.value }}
        </NuxtLink>
      </template>
      <!-- 계정명 -->
      <template #cell(name)="data">
        {{ data.value ? data.value : '-' }}
      </template>
      <!-- 소속부서 -->
      <template #cell(inCharge)="data">
        {{ data.value ? data.value : '-' }}
      </template>
      <!-- CP사 -->
      <template #cell(cp)="data">
        {{ data.value ? data.value : '-' }}
      </template>
      <!-- 계정 활성화 -->
      <template #cell(activeYn)="data">
        {{ data.value ? data.value : '-' }}
      </template>
      <!-- 최근 로그인 -->
      <template #cell(lastLoginDt)="data">
        {{ data.value ? data.value.split('T')[0] : '-' }}
      </template>
      <!-- 관리 또는 설정 -->
      <template #cell(setting)="data">
        <b-button
          variant="outline-secondary"
          class="table-inner-btn"
          @click="deleteMaster(data.item.id)"
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
  name: 'UserMessageListPage',

  data () {
    return {
      sort: '최신순',
      totalRows: 1,
      currentPage: 1,
      perPage: 5,
      sortOptions: [
        { text: '최신순', value: '최신순' },
        { value: '등록일 순', text: '등록일 순' },
        { value: '오래된 순', text: '오래된 순' }
      ],
      filter: {
        search: '선택',
        cp: '선택'
      },
      selectedSearch: 1,
      cpOptions: [{ text: '선택', value: '선택' }],
      searchOptions: [
        { text: '선택', value: '선택' },
        { text: '아이디', value: '아이디' },
        { text: '계정명', value: '계정명' },
        { text: '소속', value: '소속' }
      ],
      items: [],
      fields: [
        { key: 'no', label: '번호' },
        { key: 'email', label: '아이디' },
        { key: 'name', label: '계정명' },
        { key: 'inCharge', label: '소속 부서' },
        { key: 'cp', label: 'CP사' },
        { key: 'activeYn', label: '계정 활성화' },
        { key: 'lastLoginDt', label: '최근 로그인' },
        { key: 'setting', label: '설정' }
      ]
    }
  },
  async fetch () {
    await this.totalMasterList()
  },
  computed: {
    breadcrumb () {
      const arr = [
        { label: '홈', url: '/' },
        { label: '관리자 관리', url: '#' },
        { label: '마스터 관리자', url: this.$route.path }
      ]
      return arr
    }
  },
  watch: {},
  mounted () {
    this.totalRows = this.items.length
  },
  methods: {
    async totalMasterList () {
      this.isLoading = true
      try {
        const {
          data: { data }
        } = await this.$axios.get('/api/manager/admin/master', {
          params: {
            search: this.search,
            cp: this.cp,
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
    async deleteMaster (id) {
      if (confirm('정말 삭제하시겠습니까?') === true) {
        try {
          const { status } = await this.$axios.delete(
            `/api/manager/admin/master/${id}`
          )

          if (status === 200) {
            alert('삭제가 완료 되었습니다.')
            await this.totalMasterList()
          }
        } catch (e) {
          console.log(e)
        }
      } else {
        return false
      }
    }
  }
}
</script>
