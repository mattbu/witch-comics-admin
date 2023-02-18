<template>
  <b-container fluid class="page-min-height py-3">
    <UiPageTitle title="공지사항 관리" :breadcrumb="breadcrumb">
      <template #buttons>
        <b-button variant="primary" to="/cs/notice/add">
          등록
        </b-button>
      </template>
    </UiPageTitle>
    <hr>
    <!-- 필터 -->
    <b-container
      fluid
      class="px-0"
      tag="form"
      @submit.prevent="totalNoticeList"
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
                class="w-10"
              />
              <b-form-input v-model="searchValue" class="ml-2 w-30" />
            </div>
          </b-form-group>
        </b-col>
      </b-row>
    </b-container>
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
    <b-row class="pt-5">
      <b-col align-self="center">
        <h6>공지사항 목록 ({{ totalRows ? totalRows : '0' }})</h6>
      </b-col>
    </b-row>
    <hr class="my-2">
    <!-- 테이블 -->
    <b-table
      class="list"
      :items="items"
      :fields="fields"
      :current-page="currentPage"
      :per-page="filter.perPage"
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
      <template #cell(no)="data">
        {{
          totalRows - (currentPage - 1) * filter.perPage - (data.index + 1) + 1
        }}
      </template>
      <!-- 제목 -->
      <template #cell(title)="data">
        <NuxtLink :to="`/cs/notice/${data.item.id}/edit`">
          {{ data.value }}
        </NuxtLink>
      </template>
      <!-- 내용 -->
      <template #cell(comment)="data">
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
      <template #cell(registEdit)="data">
        {{ data.value ? data.value : '-' }}
      </template>
    </b-table>
    <UiPagination
      class="py-4"
      :page="currentPage"
      :per-page="filter.perPage"
      :total-rows="totalRows"
      @change-page="currentPage = $event"
    />
  </b-container>
</template>

<script>
export default {
  name: 'NoticeListPage',

  data () {
    return {
      filter: {
        dateSearch: '등록일',
        search: '제목',
        title: '',
        startDate: '',
        endDate: ''
      },
      isSearched: false,
      isSelected: false,
      searchOptions: [
        { text: '제목', value: '제목' },
        { text: '제목 + 내용', value: '제목 + 내용' }
      ],
      editionOptions: [
        { value: 1, text: '전체' },
        { value: 2, text: '1화' },
        { value: 3, text: '2화' },
        { value: 4, text: '3화' },
        { value: 5, text: '4화' },
        { value: 6, text: '5화' },
        { value: 7, text: '6화' },
        { value: 8, text: '7화' },
        { value: 9, text: '8화' },
        { value: 10, text: '9화' },
        { value: 11, text: '10화' },
        { value: 12, text: '11화' },
        { value: 13, text: '12화' },
        { value: 14, text: '13화' },
        { value: 15, text: '14화' },
        { value: 16, text: '15화' },
        { value: 17, text: '16화' },
        { value: 18, text: '17화' },
        { value: 19, text: '18화' },
        { value: 20, text: '19화' },
        { value: 21, text: '20화' },
        { value: 1, text: '전체' },
        { value: 2, text: '1화' },
        { value: 3, text: '2화' },
        { value: 4, text: '3화' },
        { value: 5, text: '4화' },
        { value: 6, text: '5화' },
        { value: 7, text: '6화' },
        { value: 8, text: '7화' },
        { value: 9, text: '8화' },
        { value: 10, text: '9화' },
        { value: 11, text: '10화' },
        { value: 12, text: '11화' },
        { value: 13, text: '12화' },
        { value: 14, text: '13화' },
        { value: 15, text: '14화' },
        { value: 16, text: '15화' },
        { value: 17, text: '16화' },
        { value: 18, text: '17화' },
        { value: 19, text: '18화' },
        { value: 20, text: '19화' },
        { value: 21, text: '20화' },
        { value: 1, text: '전체' },
        { value: 2, text: '1화' },
        { value: 3, text: '2화' },
        { value: 4, text: '3화' },
        { value: 5, text: '4화' },
        { value: 6, text: '5화' },
        { value: 7, text: '6화' },
        { value: 8, text: '7화' },
        { value: 9, text: '8화' },
        { value: 10, text: '9화' },
        { value: 11, text: '10화' },
        { value: 12, text: '11화' },
        { value: 13, text: '12화' },
        { value: 14, text: '13화' },
        { value: 15, text: '14화' },
        { value: 16, text: '15화' },
        { value: 17, text: '16화' },
        { value: 18, text: '17화' },
        { value: 19, text: '18화' },
        { value: 20, text: '19화' },
        { value: 21, text: '20화' },
        { value: 1, text: '전체' },
        { value: 2, text: '1화' },
        { value: 3, text: '2화' },
        { value: 4, text: '3화' },
        { value: 5, text: '4화' },
        { value: 6, text: '5화' },
        { value: 7, text: '6화' },
        { value: 8, text: '7화' },
        { value: 9, text: '8화' },
        { value: 10, text: '9화' },
        { value: 11, text: '10화' },
        { value: 12, text: '11화' },
        { value: 13, text: '12화' },
        { value: 14, text: '13화' },
        { value: 15, text: '14화' },
        { value: 16, text: '15화' },
        { value: 17, text: '16화' },
        { value: 18, text: '17화' },
        { value: 19, text: '18화' },
        { value: 20, text: '19화' },
        { value: 21, text: '20화' }
      ],
      dateSearchOptions: [
        { value: '등록일', text: '등록일' },
        { value: '시작일', text: '시작일' },
        { value: '종료일', text: '종료일' },
        { value: '수정일', text: '수정일' }
      ],
      items: [
        {
          id: 1,
          title: '결제 상품 추가',
          comment: '노출',
          openYesNo: '이벤트 결제 상품이 추가로 등장하였습…',
          createdAt: '2020-10-21',
          startAt: '2020-10-21',
          endAt: '2020-10-21',
          editAt: '2020-10-21',
          registEdit: '박담당'
        }
      ],
      fields: [
        { key: 'select', label: '상단배치' },
        { key: 'no', label: '번호' },
        { key: 'title', label: '제목' },
        { key: 'comment', label: '내용' },
        { key: 'openYesNo', label: '노출여부' },
        { key: 'createdAt', label: '등록일' },
        { key: 'startAt', label: '시작일' },
        { key: 'endAt', label: '종료일' },
        { key: 'editAt', label: '수정일' },
        { key: 'registEdit', label: '등록/최종수정' }
      ],

      totalRows: 1,
      currentPage: 1,
      selectAll: false,
      selectedList: [],
      indeterminate: false
    }
  },
  async fetch () {
    await this.totalNoticeList()
  },
  computed: {
    breadcrumb () {
      const arr = [
        { label: '홈', url: '/' },
        { label: '서비스 운영 관리', url: '#' },
        { label: '공지사항 관리', url: this.$route.path }
      ]
      return arr
    }
  },
  watch: {
    async currentPage () {
      await this.totalNoticeList()
    },
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
  mounted () {},
  methods: {
    async totalNoticeList () {
      this.isLoading = true

      try {
        const {
          data: { data }
        } = await this.$axios.get('/api/cartoon/manager/publisherList', {
          params: {
            pageNum: this.currentPage,
            pageSize: this.perPage
            // title: this.filter.title,
            // period: this.filter.period
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
