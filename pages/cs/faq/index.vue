<template>
  <b-container fluid class="page-min-height py-3">
    <UiPageTitle title="도움말/FAQ 관리" :breadcrumb="breadcrumb">
      <template #buttons>
        <b-button variant="primary" to="/cs/faq/add">
          등록
        </b-button>
      </template>
    </UiPageTitle>
    <hr>
    <!-- 필터 -->
    <b-container fluid class="px-0" tag="form" @submit.prevent="totalFaqList">
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
              <b-form-input v-model="searchValue" class="ml-2 w-25" />
            </div>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row class="px-3">
        <b-col lg="12" class="">
          <b-form-group
            v-slot="{ ariaDescribedby }"
            label="분류"
            label-cols-sm="2"
            label-align-sm="left"
            label-size="sm"
            class="mb-0"
          >
            <b-form-checkbox-group
              id="checkbox-group-1"
              v-model="filter.division"
              class="my-2"
              :options="divisionOptions"
              :aria-describedby="ariaDescribedby"
              name=""
            />
          </b-form-group>
        </b-col>
      </b-row>
      <!-- 검색 기간 -->
      <b-row class="px-3">
      <b-col lg="12" class="my-1">
        <b-form-group
            v-slot="{ ariaDescribedby }"
            label="기간 검색"
            label-cols-sm="2"
            label-align-sm="left"
            label-size="sm"
          >
            <div class="d-inline-flex justify-content-start w-100 my-2">
              <b-form-select
                v-model="filter.dateSearch"
                class="w-13"
                :options="dateSearchOptions"
                :aria-describedby="ariaDescribedby"
              />
              <div class="d-inline-flex ml-2 w-40">
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
                <span class="mx-2 align-self-center">~</span>
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
    <b-row class="mt-5">
      <b-col align-self="center">
        <h6>도움말/FAQ 목록 ({{ totalRows ? totalRows : '0' }})</h6>
      </b-col>
    </b-row>
    <hr class="my-2">
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
      <template #head(select)>
        <b-form-checkbox
          v-model="selectAll"
          :indeterminate="indeterminate"
          @change="toggleAll"
        />
      </template>
      <template #cell(select)="data">
        <b-form-checkbox
          v-model="selectedList"
          :value="data.item.id"
          style="float: unset"
        />
      </template>
      <!-- 번호 -->
      <template #cell(no)="data">
        {{ totalRows - (currentPage - 1) * perPage - (data.index + 1) + 1 }}
      </template>
      <!-- 분류 -->
      <template #cell(type)="data">
        {{ data.value ? data.value : '-' }}
      </template>
      <!-- 제목 -->
      <template #cell(title)="data">
        <NuxtLink :to="`/cs/notice/${data.item.id}/edit`">
          {{ data.value }}
        </NuxtLink>
      </template>
      <!-- 내용 -->
      <template #cell(content)="data">
        {{ data.value ? data.value : '-' }}
      </template>
      <!-- 노출여부 -->
      <template #cell(openYesNo)="data">
        {{ data.value ? data.value : '-' }}
      </template>
      <!-- 등록일 -->
      <template #cell(createdAt)="data">
        {{ data.value ? data.value.split('T')[0] : '-' }}
      </template>
      <!-- 시작일 -->
      <template #cell(startAt)="data">
        {{ data.value ? data.value.split('T')[0] : '-' }}
      </template>
      <!-- 종료일 -->
      <template #cell(endAt)="data">
        {{ data.value ? data.value.split('T')[0] : '-' }}
      </template>
      <!-- 수정일 -->
      <template #cell(editAt)="data">
        {{ data.value ? data.value.split('T')[0] : '-' }}
      </template>
      <!-- 등록/최종수정 -->
      <template #cell(updatedAt)="data">
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
  name: 'FAQList',
  data () {
    return {
      filter: {
        search: '제목',
        dateSearch: '등록일'
      },
      searchOptions: [
        { text: '제목', value: '제목' },
        { text: '제목 + 내용', value: '제목 + 내용' }
      ],
      divisionOptions: [
        { value: '서비스 이용', text: '서비스 이용' },
        { value: '콘텐츠', text: '콘텐츠' },
        { value: '결제/환불', text: '결제/환불' },
        { value: '로그인/회원정보', text: '로그인/회원정보' },
        { value: '기타', text: '기타' }
      ],
      perPage: 10,
      totalRows: 1,
      currentPage: 1,
      //
      selectAll: false,
      selectedList: [],
      indeterminate: false,

      dateSearchOptions: [
        { value: '등록일', text: '등록일' },
        { value: '시작일', text: '시작일' },
        { value: '종료일', text: '종료일' },
        { value: '수정일', text: '수정일' }
      ],
      items: [
        {
          id: 1,
          type: '서비스이용',
          title: '서비스 이용에 대하여',
          content: '서비스 이용에 대하여 설명 드립니다…',
          openYesNo: '노출',
          createdAt: '2020-10-21',
          startAt: '2020-10-21',
          endAt: '2020-10-21',
          editAt: '2020-10-21',
          updatedAt: '박담당'
        }
      ],
      fields: [
        { key: 'select', label: '상단배치' },
        { key: 'no', label: '번호' },
        { key: 'type', label: '분류' },
        { key: 'title', label: '제목' },
        { key: 'content', label: '내용' },
        { key: 'openYesNo', label: '노출여부' },
        { key: 'createdAt', label: '등록일' },
        { key: 'startAt', label: '시작일' },
        { key: 'endAt', label: '종료일' },
        { key: 'editAt', label: '수정일' },
        { key: 'updatedAt', label: '등록/최종수정' }
      ],
      searchValue: ''
    }
  },
  async fetch () {
    await this.totalFaqList()
  },
  computed: {
    breadcrumb () {
      const arr = [
        { label: '홈', url: '/' },
        { label: '서비스 운영 관리', url: '#' },
        { label: '도움말/FAQ 관리', url: this.$route.path }
      ]
      return arr
    }
  },
  watch: {
    selectedList (val) {
      if (val.length === 0) {
        this.indeterminate = false
        this.selectAll = false
      } else if (val.length === this.items.length) {
        this.indeterminate = false
        this.selectAll = true
      } else {
        this.indeterminate = true
        this.selectAll = false
      }
    }
  },
  created () {},
  mounted () {
    this.totalRows = this.items.length
  },
  methods: {
    async totalFaqList () {
      this.isLoading = true

      try {
        const {
          data: { data }
        } = await this.$axios.get('/api/cartoon/manager/writerList', {
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
