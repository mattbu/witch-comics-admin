<template>
  <b-container fluid class="page-min-height py-3">
    <UiPageTitle title="검색어 관리" :breadcrumb="breadcrumb">
      <template #buttons>
        <b-button variant="primary" to="/cs/search/add">
          등록
        </b-button>
      </template>
    </UiPageTitle>
    <hr>
    <b-container
      fluid
      class="px-0"
      tag="form"
      @submit.prevent="totalSearchList"
    >
      <b-row class="px-3">
        <b-col lg="12" class="my-1">
          <b-form-group
            label="기간"
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
      <b-row class="px-3">
        <b-col lg="12" class="my-2">
          <b-form-group
            label="상태"
            label-cols-sm="2"
            label-align-sm="left"
            label-size="sm"
            class="mb-0"
          >
            <b-form-checkbox-group
              v-model="filter.status"
              :options="statusOptions"
              :aria-describedby="ariaDescribedby"
            />
          </b-form-group>
        </b-col>
      </b-row>
    </b-container>
    <b-row align-h="between" class="mt-5">
      <b-col align-self="center">
        <h6>추천 검색어 그룹 목록 ({{ totalRows ? totalRows : '0' }})</h6>
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
      <!-- 제목 -->
      <template #cell(title)="data">
        <NuxtLink :to="`/cs/search/${data.item.id}/edit`">
          {{ data.value }}
        </NuxtLink>
      </template>
      <!-- 추천 검색어 수 -->
      <template #cell(cnt)="data">
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
      <!-- 관리 -->
      <template #cell(setting)>
        <b-button variant="primary">
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
  name: 'CsSearchListPage',
  data () {
    return {
      isLoading: false,
      filter: {
        status: '',
        startDate: '',
        endDate: ''
      },
      statusOptions: [
        { value: '진행중', text: '진행중' },
        { value: '종료', text: '종료' },
        { value: '대기', text: '대기' }
      ],
      totalRows: 0,
      currentPage: 1,
      perPage: 5,
      indeterminate: false,
      name: null,
      items: [],
      fields: [
        { key: 'no', label: '번호' },
        { key: 'title', label: '제목' },
        { key: 'cnt', label: '추천 검색어 수' },
        { key: 'startAt', label: '시작일' },
        { key: 'endAt', label: '종료일' },
        { key: 'status', label: '상태' },
        { key: 'openYesNo', label: '노출여부' },
        { key: 'setting', label: '관리' }
      ]
    }
  },
  async fetch () {
    await this.totalSearchList()
  },
  computed: {
    breadcrumb () {
      const arr = [
        { label: '홈', url: '/' },
        { label: '서비스 운영 관리', url: '#' },
        { label: '검색어 관리', url: this.$route.path }
      ]
      return arr
    }
  },
  watch: {
    async currentPage () {
      await this.totalSearchList()
    }
  },
  created () {},
  mounted () {
    this.totalRows = this.items.length
  },
  methods: {
    async totalSearchList () {
      this.isLoading = true

      try {
        const {
          data: { data }
        } = await this.$axios.get('', {
          params: {
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
    }
  }
}
</script>
