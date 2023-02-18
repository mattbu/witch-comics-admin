<template>
  <b-container fluid class="page-min-height py-3">
    <UiPageTitle title="작품 관리" :breadcrumb="breadcrumb">
      <template #buttons>
        <b-button variant="primary" to="/content/piece/add">
          작품 등록
        </b-button>
      </template>
    </UiPageTitle>
    <hr>
    <!--필터-->
    <b-container fluid class="px-0" tag="form" @submit.prevent="getList">
      <b-row class="mt-3 px-3">
        <b-col lg="12" class="my-1">
          <b-form-group
            label="구분"
            label-cols-sm="2"
            label-align-sm="left"
            label-size="sm"
            class="mb-0"
          >
            <b-form-checkbox-group
              v-model="filter.division"
              :options="divisionOptions"
            />
          </b-form-group>
        </b-col>

        <!-- 유형 -->
        <b-col lg="12" class="my-1">
          <b-form-group
            label="유형"
            label-cols-sm="2"
            label-align-sm="left"
            label-size="sm"
            class="mb-0"
          >
            <b-form-checkbox-group
              v-model="filter.type"
              :options="typeOptions"
            />
          </b-form-group>
        </b-col>

        <b-col lg="12" class="my-1">
          <b-form-group
            label="장르"
            label-cols-sm="2"
            label-align-sm="left"
            label-size="sm"
            class="mb-0"
          >
            <b-form-checkbox-group
              v-model="filter.genre"
              :options="genreOptions"
            />
          </b-form-group>
        </b-col>

        <b-col lg="12" class="my-1">
          <b-form-group
            label="연령등급"
            label-cols-sm="2"
            label-align-sm="left"
            label-size="sm"
            class="mb-0"
          >
            <b-form-checkbox-group
              v-model="filter.rate"
              :options="rateOptions"
            />
          </b-form-group>
        </b-col>

        <b-col lg="12" class="my-1">
          <b-form-group
            label="검색"
            label-cols-sm="2"
            label-align-sm="left"
            label-size="sm"
            class="mb-0 align-items-center"
          >
            <div class="d-inline-flex">
              <b-form-select
                v-model="filter.searchType"
                :options="searchOptions"
              />
              <b-form-input
                v-model="filter.searchValue"
                type="text"
                placeholder="검색어"
                class="ml-2"
              />
            </div>
          </b-form-group>
        </b-col>

        <b-col lg="12" class="my-1">
          <b-form-group
            label="일자"
            label-cols-sm="2"
            label-align-sm="left"
            label-size="sm"
          >
            <div class="d-inline-flex justify-content-start w-100 my-2">
              <b-form-select
                v-model="filter.searchDtType"
                class="w-13"
                :options="dateSearchOptions"
              />
              <div class="d-inline-flex ml-2 w-30">
                <b-form-datepicker
                  v-model="filter.searchStartDt"
                  placeholder="선택"
                  class="w-50"
                  hide-header
                  label-help=""
                  :date-format-options="{
                    year: 'numeric',
                    month: 'numeric',
                    day: 'numeric'
                  }"
                />
                <b-form-datepicker
                  v-model="filter.searchEndDt"
                  placeholder="선택"
                  hide-header
                  label-help=""
                  :date-format-options="{
                    year: 'numeric',
                    month: 'numeric',
                    day: 'numeric'
                  }"
                  class="ml-2 w-50"
                />
              </div>
            </div>
          </b-form-group>
        </b-col>

        <b-col lg="12" class="my-1">
          <b-form-group
            label="연재여부"
            label-cols-sm="2"
            label-align-sm="left"
            label-size="sm"
            class="mb-0"
          >
            <b-form-checkbox-group
              v-model="filter.serialStatus"
              :options="serialStatusOptions"
              class="mt-1"
            />
          </b-form-group>
        </b-col>
        <b-col lg="12" class="my-1">
          <b-form-group
            label="작품 상태"
            label-cols-sm="2"
            label-align-sm="left"
            label-size="sm"
            class="mb-0"
          >
            <b-form-checkbox-group
              v-model="filter.pieceStatus"
              :options="pieceStatusOptions"
              class="mt-1"
            />
          </b-form-group>
        </b-col>
      </b-row>
      <hr class="my-2">
      <b-row align-h="center" class="mb-4">
        <b-col cols="2" class="d-flex">
          <b-button type="submit" variant="primary" class="w-75">
            검색
          </b-button>
        </b-col>
      </b-row>
    </b-container>

    <b-row class="pt-5">
      <b-col align-self="center">
        <h6>작품 목록 ({{ isLoading ? 0 : totalRows ? totalRows : 0 }})</h6>
      </b-col>
      <b-col align-self="center" class="text-right">
        <b-form-select
          v-model="perPage"
          :options="perPageOptions"
          class="w-50"
        />
      </b-col>
    </b-row>
    <hr class="my-2">
    <b-row align-h="end" class="mb-4">
      <b-col cols="auto">
        <b-button variant="primary">
          엑셀 다운로드
        </b-button>
      </b-col>
    </b-row>
    <!-- 테이블 -->
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
      <template #cell(menucode)="data">
        {{
          data.value === '1' ? '웹툰/만화' : data.value === '2' ? '소설' : '-'
        }}
      </template>
      <template #cell(isBook)="data">
        {{ data.value ? data.value : '-' }}
      </template>
      <template #cell(genre)="data">
        {{ data.value ? data.value : '-' }}
      </template>
      <!-- rate -->
      <template #cell(rate)="data">
        {{ data.value }}
      </template>
      <template #cell(title)="data">
        <NuxtLink :to="`/content/piece/${data.item.id}/edition`">
          {{ data.value }}
        </NuxtLink>
      </template>
      <template #cell(writer)="data">
        {{ data.value ? data.value : '-' }}
      </template>
      <template #cell(saleCnt)="data">
        {{ data.value ? data.value : '0' }}
      </template>
      <template #cell(totalCnt)="data">
        {{ data.value ? data.value : '0' }}
      </template>
      <template #cell(registDate)="data">
        {{ data.value ? data.value : '-' }}
      </template>
      <template #cell(displayStartDate)="data">
        {{ data.value ? data.value : '-' }}
      </template>
      <template #cell(isEnd)="data">
        {{ data.value ? data.value : '-' }}
      </template>
      <template #cell(updateDate)="data">
        {{ data.value ? data.value : '-' }}
      </template>
      <template #cell(status)="data">
        {{ data.value ? data.value : '-' }}
      </template>
      <template #cell(cpName)="data">
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
  name: 'ContentPieceListPage',
  data () {
    return {
      // 필터
      filter: {
        division: [],
        type: [],
        genre: [],
        rate: [],
        searchType: '작품명',
        searchValue: '',
        searchDtType: '등록일',
        searchStartDt: '',
        searchEndDt: '',
        serialStatus: [],
        pieceStatus: []
      },
      // 구분
      divisionOptions: [
        { value: '1', text: '웹툰/만화' },
        { value: '2', text: '소설' }
      ],
      // 유형
      typeOptions: [
        { value: '연재', text: '연재' },
        { value: '단행본', text: '단행본' }
      ],
      // 장르
      genreOptions: [
        { value: '드라마', text: '드라마' },
        { value: '로맨스', text: '로맨스' },
        { value: '액션/스포츠', text: '액션/스포츠' },
        { value: '호러/미스테리', text: '호러/미스테리' },
        { value: 'BL/GL', text: 'BL/GL' },
        { value: '판타지', text: '판타지' }
      ],
      // 연령등급
      rateOptions: [
        { value: '성인', text: '성인' },
        { value: '전체이용가', text: '전체이용가' }
      ],
      // 검색 타입
      searchOptions: [
        { value: '작품명', text: '작품명' },
        { value: '작가명', text: '작가명' },
        { value: 'CP사', text: 'CP사' },
        { value: '작품번호', text: '작품번호' }
      ],
      // 일자
      dateSearchOptions: [
        { value: '시작일', text: '시작일' },
        { value: '수정일', text: '수정일' },
        { value: '등록일', text: '등록일' }
      ],
      // 연재여부:
      serialStatusOptions: [
        { value: '연재', text: '연재' },
        { value: '완결', text: '완결' },
        { value: '휴재', text: '휴재' }
      ],
      // 작품상태:
      pieceStatusOptions: [
        { value: '등록중', text: '등록중' },
        { value: '판매중', text: '판매중' },
        { value: '판매대기', text: '판매대기' },
        { value: '판매중지', text: '판매중지' },
        { value: '서비스중지', text: '서비스중지' }
      ],
      // 조회 페이지 설정
      perPageOptions: [
        { value: 30, text: '30개씩 보기' },
        { value: 50, text: '50개씩 보기' },
        { value: 100, text: '100개씩 보기' },
        { value: 200, text: '200개씩 보기' },
        { value: 300, text: '300개씩 보기' }
      ],
      // 리스트
      isLoading: false,
      totalRows: 0,
      currentPage: 1,
      perPage: 30,
      items: [],
      fields: [
        { key: 'no', label: '번호' },
        { key: 'menucode', label: '구분' },
        { key: 'isBook', label: '유형' },
        { key: 'genre', label: '장르' },
        { key: 'rate', label: '연령등급' },
        { key: 'title', label: '(작품아이디)작품명' },
        { key: 'writer', label: '작가' },
        { key: 'saleCnt', label: '판매중 회차 수' },
        { key: 'totalCnt', label: '전체 회차 수' },
        { key: 'registDate', label: '등록일' },
        { key: 'displayStartDate', label: '시작일' },
        { key: 'isEnd', label: '연재여부' },
        { key: 'updateDate', label: '수정일' },
        { key: 'status', label: '작품상태' },
        { key: 'cpName', label: 'CP사' }
      ]
    }
  },
  async fetch () {
    await this.getList()
  },
  computed: {
    breadcrumb () {
      const arr = [
        { label: '홈', url: '/' },
        { label: '콘텐츠 관리', url: '#' },
        { label: '작품 관리', url: '/content/piece' }
      ]
      return arr
    }
  },
  watch: {
    async perPage () {
      await this.getList()
    },
    async currentPage () {
      await this.getList()
    }
  },
  methods: {
    async getList () {
      this.isLoading = true

      try {
        const {
          data: { data }
        } = await this.$axios.get('/api/cartoon/contents/list/main', {
          params: {
            pageNum: this.currentPage,
            pageSize: this.perPage,
            ...(this.filter.division.length > 0
              ? { menucode: this.filter.division }
              : {}),
            ...(this.filter.type.length > 0
              ? { isBook: this.filter.type }
              : {}),
            ...(this.filter.genre.length > 0
              ? { genre: this.filter.genre }
              : {}),
            ...(this.filter.rate.length > 0 ? { rate: this.filterRate } : {}),
            searchType: this.filter.searchType,
            searchValue: this.filter.searchValue,
            ...(this.filter.serialStatus.length > 0
              ? { isEnd: this.filter.serialStatus }
              : {}),
            ...(this.filter.pieceStatus.length > 0
              ? { status: this.filter.pieceStatus }
              : {})
          }
        })
        this.items = data.list
        this.totalRows = data.total
        this.isLoading = false
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>
