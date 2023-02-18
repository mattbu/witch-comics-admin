<template>
  <b-container fluid class="page-min-height py-3">
    <UiPageTitle title="정책 관리" :breadcrumb="breadcrumb">
      <template #buttons>
        <b-button variant="primary" to="/cs/policy/add">
          등록
        </b-button>
      </template>
    </UiPageTitle>
    <hr>
    <b-container
      fluid
      class="px-0"
      tag="form"
      @submit.prevent="totalPolicyList"
    >
      <b-row class="mt-3 px-3">
        <b-col lg="12" class="my-1">
          <b-form-group
            label="기간 검색"
            label-cols-sm="2"
            label-align-sm="left"
            label-size="sm"
            class="mb-0"
          >
            <div class="d-inline-flex justify-content-start w-100">
              <b-form-select
                v-model="filter.dateSearch"
                class="w-13"
                :options="dateSearchOptions"
                :aria-describedby="ariaDescribedby"
              />
              <div class="d-inline-flex ml-2 w-40">
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
      <hr class="my-2">
      <b-row align-h="center" class="mb-4">
        <b-col cols="2">
          <b-button variant="primary" class="w-75">
            검색
          </b-button>
        </b-col>
      </b-row>
    </b-container>
    <b-row align-h="between" class="mt-5">
      <b-col align-self="center">
        <h6>이용약관 목록 ({{ totalRows ? totalRows : '0' }})</h6>
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
        <NuxtLink :to="`/cs/policy/${data.item.id}/edit`">
          {{ data.value ? data.value : '-' }}
        </NuxtLink>
      </template>
      <!-- 시작일 -->
      <template #cell(startDate)="data">
        {{ data.value ? data.value.split(' ')[0] : '-' }}
      </template>
      <!-- 종료일 -->
      <template #cell(endDate)="data">
        {{ data.value ? data.value.split(' ')[0] : '-' }}
      </template>
      <!-- 노출여부 -->
      <template #cell(isShow)="data">
        {{ data.value ? data.value : '-' }}
      </template>
      <!-- 등록일 -->
      <template #cell(createdAt)="data">
        {{ data.value ? data.value.split(' ')[0] : '-' }}
      </template>
      <!-- 수정일 -->
      <template #cell(updatedAt)="data">
        {{ data.value ? data.value.split(' ')[0] : '-' }}
      </template>
      <!-- 등록/최종수정 -->
      <template #cell(manager)="data">
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
  name: 'CsPolicyListPage',
  data () {
    return {
      isLoading: false,
      filter: {
        dateSearch: '등록일',
        startDate: '',
        endDate: ''
      },
      perPage: 10,
      totalRows: 0,
      currentPage: 1,
      indeterminate: false,
      name: null,
      // 기간 검색
      dateSearchOptions: [
        { value: '등록일', text: '등록일' },
        { value: '시작일', text: '시작일' },
        { value: '종료일', text: '종료일' },
        { value: '수정일', text: '수정일' }
      ],
      items: [],
      fields: [
        { key: 'no', label: '번호' },
        { key: 'title', label: '제목' },
        { key: 'startDate', label: '시작일' },
        { key: 'endDate', label: '종료일' },
        { key: 'isShow', label: '노출여부' },
        { key: 'createdAt', label: '등록일' },
        { key: 'updatedAt', label: '수정일' },
        { key: 'manager', label: '등록/최종수정' }
      ]
    }
  },
  async fetch () {
    await this.totalPolicyList()
  },
  computed: {
    breadcrumb () {
      const arr = [
        { label: '홈', url: '/' },
        { label: '서비스 운영 관리', url: '#' },
        { label: '정책 관리', url: this.$route.path }
      ]
      return arr
    }
  },
  watch: {},
  created () {},
  mounted () {},
  methods: {
    // 조회
    async totalPolicyList () {
      this.isLoading = true

      try {
        const {
          data: { data }
        } = await this.$axios.get('/api/manager/policy', {
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
