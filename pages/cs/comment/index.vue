<template>
  <b-container fluid class="page-min-height py-3">
    <UiPageTitle title="댓글/답글 관리" :breadcrumb="breadcrumb">
      <template #buttons>
        <b-button variant="primary" to="/cs/policy/add">
          등록
        </b-button>
      </template>
    </UiPageTitle>
    <hr>
    <b-container fluid class="px-0" tag="form" @submit.prevent="totalReplyList">
      <b-row class="px-3">
        <b-col lg="12" class="mb-2">
          <b-form-group
            label="작품"
            label-cols-sm="2"
            label-align-sm="left"
            label-size="sm"
            class="align-items-center"
          >
            <div class="d-flex">
              <b-button variant="primary">
                찾기
              </b-button>
            </div>
          </b-form-group>
        </b-col>
      </b-row>
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
                <span class="mx-2 align-self-center">~</span>
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
                />
              </div>
            </div>
          </b-form-group>
        </b-col>
      </b-row>
    </b-container>
    <b-row align-h="between" class="mt-5">
      <b-col align-self="center">
        <h6>댓글 목록 ({{ totalRows ? totalRows : '0' }})</h6>
      </b-col>
      <b-col align-self="center" class="text-right">
        <b-form-select
          v-model="filter.perPage"
          :options="perPageOptions"
          class="w-20"
        />
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
      <template #cell(name)="data">
        <NuxtLink
          :to="{
            path: `/cs/policy/${data.item.name}`,
            query: { id: data.item.id }
          }"
        >
          {{ data.value }}
        </NuxtLink>
      </template>
      <template #cell(piece)="data">
        {{ data.value ? data.value : '-' }}
      </template>
      <template #cell(serial)="data">
        {{ data.value ? data.value : '-' }}
      </template>
      <template #cell(type)="data">
        {{ data.value ? data.value : '-' }}
      </template>
      <template #cell(content)="data">
        {{ data.value ? data.value : '-' }}
      </template>
      <template #cell(writeAt)="data">
        {{ data.value ? data.value : '-' }}
      </template>
      <template #cell(agree)="data">
        {{ data.value ? data.value : '-' }}
      </template>
      <template #cell(singo)="data">
        {{ data.value ? data.value : '-' }}
      </template>
      <template #cell(status)="data">
        {{ data.value ? data.value : '-' }}
      </template>
      <template #cell(hideAt)="data">
        {{ data.value ? data.value.split(' ')[0] : '-' }}
      </template>
      <template #cell(admin)="data">
        {{ data.value ? data.value : '-' }}
      </template>
      <template #cell(setting)>
        <b-button variant="primary">
          설정
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
  name: 'CsReplyListPage',
  data () {
    return {
      isLoading: false,
      filter: {
        order: '최신순',
        startDate: '',
        endDate: '',
        perPage: '20개씩 보기'
      },
      sort: 1,
      sortOptions: [{ text: '최신순', value: 1 }],
      orderOptions: [
        { value: '최신순', text: '최신 순' },
        { value: '오래된 순', text: '오래된 순' }
      ],
      perPageOptions: [
        { value: '20개씩 보기', text: '20개씩 보기' },
        { value: '30개씩 보기', text: '30개씩 보기' },
        { value: '50개씩 보기', text: '50개씩 보기' },
        { value: '100개씩 보기', text: '100개씩 보기' },
        { value: '200개씩 보기', text: '200개씩 보기' }
      ],
      totalRows: 0,
      currentPage: 1,
      perPage: 5,
      indeterminate: false,
      name: null,
      items: [],
      fields: [
        { key: 'no', label: '번호' },
        { key: 'name', label: '작성자' },
        { key: 'piece', label: '작품' },
        { key: 'serial', label: '회차' },
        { key: 'type', label: '유형' },
        { key: 'content', label: '작성글' },
        { key: 'writeAt', label: '작성일' },
        { key: 'agree', label: '공감' },
        { key: 'singo', label: '신고' },
        { key: 'status', label: '상태' },
        { key: 'hideAt', label: '차단/숨김 날짜' },
        { key: 'admin', label: '담당자' },
        { key: 'setting', label: '담당자' }
      ]
    }
  },
  async fetch () {
    await this.totalReplyList()
  },
  computed: {
    breadcrumb () {
      const arr = [
        { label: '홈', url: '/' },
        { label: '서비스 운영 관리', url: '#' },
        { label: '댓글/답글 관리', url: this.$route.path }
      ]
      return arr
    }
  },
  watch: {
    async currentPage () {
      await this.totalReplyList()
    }
  },
  created () {},
  mounted () {
    this.totalRows = this.items.length
  },
  methods: {
    async totalReplyList () {
      this.isLoading = true

      try {
        const {
          data: { data }
        } = await this.$axios.get('/api/cartoon/manager/cpList', {
          params: {
            pageNum: this.currentPage,
            pageSize: this.perPage,
            name: this.filter.name
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
