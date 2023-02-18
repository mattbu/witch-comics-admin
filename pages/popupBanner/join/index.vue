<template>
  <b-container fluid class="page-min-height py-3">
    <UiPageTitle title="로그인/회원관리 배너 관리" :breadcrumb="breadcrumb">
      <template #buttons>
        <b-button variant="primary" to="/popupBanner/join/add">
          등록
        </b-button>
      </template>
    </UiPageTitle>
    <hr>
    <b-container fluid class="px-0" tag="form" @submit.prevent="totalJoinList">
      <b-row class="px-3">
        <b-col lg="12" class="mb-2">
          <b-form-group
            label="설정 회차"
            label-cols-sm="2"
            label-align-sm="left"
            label-size="sm"
            class="align-items-center"
          >
            <b-form-input v-model="searchValue" class="w-25" />
          </b-form-group>
        </b-col>
      </b-row>
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
                class="w-10"
              />
              <b-form-input v-model="searchValue" class="ml-2 w-25" />
            </div>
          </b-form-group>
        </b-col>
      </b-row>

      <b-row class="px-3">
        <b-col lg="12" class="my-1">
          <b-form-group
            label="기간 검색"
            label-cols-sm="2"
            label-align-sm="left"
            label-size="sm"
            class="mb-0"
          >
            <div class="d-inline-flex justify-content-start w-100">
              <div class="d-inline-flex w-30">
                <b-form-datepicker
                  v-model="filter.startDate"
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
                  v-model="filter.endDate"
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
    </b-container>
    <b-row align-h="between" class="mt-5">
      <b-col align-self="center">
        <h6>배너 목록 ({{ totalRows ? totalRows : '0' }})</h6>
      </b-col>
    </b-row>
    <hr class="my-2">
    <b-table
      class="list"
      :items="items"
      :fields="fields"
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
        {{ totalRows - (currentPage - 1) * perPage - (data.index + 1) + 1 }}
      </template>
      <!-- 타이틀 -->
      <template #cell(title)="data">
        {{ data.value ? data.value : '-' }}
      </template>
      <!-- 시작일 -->
      <template #cell(startAt)="data">
        {{ data.value ? data.value : '-' }}
      </template>
      <!-- 종료일 -->
      <template #cell(endAt)="data">
        {{ data.value ? data.value : '-' }}
      </template>
      <!-- 상태 -->
      <template #cell(status)="data">
        {{ data.value ? data.value : '-' }}
      </template>
      <!-- 노출여부 -->
      <template #cell(openYesNo)="data">
        {{ data.value ? data.value : '-' }}
      </template>
      <!-- 등록일 -->
      <template #cell(registAt)="data">
        {{ data.value ? data.value : '-' }}
      </template>
      <!-- 등록/최종수정 -->
      <template #cell(registEdit)="data">
        {{ data.value ? data.value : '-' }}
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
  name: 'CsReplyListPage',
  data () {
    return {
      isLoading: false,
      filter: {
        startDate: '',
        endDate: ''
      },
      totalRows: 0,
      currentPage: 1,
      perPage: 5,
      indeterminate: false,
      name: null,
      items: [],
      fields: [
        { key: 'no', label: '번호' },
        { key: 'name', label: '타이틀' },
        { key: 'startAt', label: '시작일' },
        { key: 'endAt', label: '종료일' },
        { key: 'status', label: '상태' },
        { key: 'openYesNo', label: '노출여부' },
        { key: 'registAt', label: '등록일' },
        { key: 'registEdit', label: '등록/최종수정' }
      ]
    }
  },
  async fetch () {
    await this.totalJoinList()
  },
  computed: {
    breadcrumb () {
      const arr = [
        { label: '홈', url: '/' },
        { label: '팝업/배너 관리', url: '#' },
        { label: '로그인/회원가입 배너 관리', url: this.$route.path }
      ]
      return arr
    }
  },
  watch: {
    async currentPage () {
      await this.totalJoinList()
    }
  },
  created () {},
  mounted () {
    this.totalRows = this.items.length
  },
  methods: {
    async totalJoinList () {
      this.isLoading = true

      try {
        const {
          data: { data }
        } = await this.$axios.get('', {
          params: {
            pageNum: this.currentPage,
            pageSize: this.perPage,
            title: this.filter.title
          }
        })

        this.items = data.list
        this.totalRows = data.total
      } catch (e) {
        console.log(e)
      } finally {
        this.isLoading = false
      }
    }
  }
}
</script>
