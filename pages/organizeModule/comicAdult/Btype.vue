<template>
  <b-container fluid class="page-min-height py-3">
    <UiPageTitle title="B형 편성모듈 관리" :breadcrumb="breadcrumb">
      <template #buttons>
        <b-button variant="primary" to="comicAdult/BtypeAdd">
          등록
        </b-button>
      </template>
    </UiPageTitle>
    <hr>
    <!--필터-->
    <b-container fluid class="px-0" tag="form" @submit.prevent="getList">
      <b-row class="mt-3 px-3">
        <b-col lg="12">
          <b-form-group
            label="작품명"
            label-cols-sm="2"
            label-align-sm="left"
            label-size="sm"
            class="mb-0 align-items-center"
          >
            <div class="d-inline-flex">
              <b-form-input v-model="filter.searchValue" type="text" />
            </div>
            <b-button variant="primary" class="ml-2">
              찾기
            </b-button>
          </b-form-group>
        </b-col>

        <b-col lg="12">
          <b-form-group
            label="기간"
            label-cols-sm="2"
            label-align-sm="left"
            label-size="sm"
            label-class="align-self-center"
          >
            <div class="d-inline-flex justify-content-start w-100 my-2">
              <b-form-select
                v-model="filter.dateSearch"
                class="w-13"
                :options="dateSearchOptions"
              />
              <div class="d-inline-flex ml-2 w-40">
                <b-form-datepicker
                  v-model="filter.searchStartDt"
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
                  v-model="filter.searchEndDt"
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

        <!-- 상태-->
        <b-col lg="12">
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
            />
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
    <b-row class="pt-5">
      <b-col align-self="center">
        <h6>B형 편성모듈 목록 ({{ totalRows ? totalRows : '0' }})</h6>
      </b-col>
    </b-row>
    <hr class="my-2">

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
        {{
          totalRows -
            (filter.pageNum - 1) * filter.pageSize -
            (data.index + 1) +
            1
        }}
      </template>
      <!-- 유형 -->
      <template #cell(name)="data">
        {{ data.value ? data.value : '-' }}
      </template>
      <!-- 타이틀 -->
      <template #cell(title)="data">
        <NuxtLink :to="`/promotion/discount/${data.item.id}`">
          {{ data.value ? data.value : '-' }}
        </NuxtLink>
      </template>
      <!-- 시작일 -->
      <template #cell(startDate)="data">
        {{ data.value ? data.value.split('T')[0] : '-' }}
      </template>
      <!-- 종료일 -->
      <template #cell(endDate)="data">
        {{ data.value ? data.value.split('T')[0] : '미설정' }}
      </template>
      <!-- 상태 -->
      <template #cell(status)="data">
        <p v-if="data.value === '진행중'" class="text-info">
          진행중
        </p>
        <p v-else-if="data.value === '대기'">
          대기
        </p>
        <p v-else-if="data.value === '종료'" class="text-warning">
          종료
        </p>
        <p v-else>
          -
        </p>
      </template>
      <!-- 노출 여부 -->
      <template #cell(isShow)="data">
        {{ data.value ? `${data.value}` : '-' }}
      </template>
      <!-- 관리 -->
      <template #cell(setting)="data">
        <b-button
          variant="outline-secondary"
          class="table-inner-btn"
          @click="removeBtype(data.item.id)"
        >
          삭제
        </b-button>
      </template>
    </b-table>
    <UiPagination
      class="py-4"
      :page="filter.pageNum"
      :per-page="filter.pageSize"
      :total-rows="totalRows"
      @change-page="filter.pageNum = $event"
    />
  </b-container>
</template>

<script>
export default {
  name: 'DiscountListPage',
  data () {
    return {
      filter: {
        searchType: '작품명',
        searchValue: '',
        status: [],
        dateSearch: '등록일',
        pageNum: 1,
        pageSize: 10
      },
      searchOptions: [
        { text: '작품명', value: '작품명' },
        { text: 'CP사', value: 'CP사' },
        { text: '작품번호', value: '작품번호' }
      ],
      // 작품상태
      statusOptions: [
        { value: '대기', text: '대기' },
        { value: '진행중', text: '진행중' },
        { value: '종료', text: '종료' }
      ],
      // 기간 검색
      dateSearchOptions: [
        { value: '시작일', text: '시작일' },
        { value: '종료일', text: '종료일' },
        { value: '등록일', text: '등록일' }
      ],
      items: [],
      fields: [
        { key: 'no', label: '번호' },
        { key: 'type', label: '유형' },
        { key: 'title', label: '타이틀' },
        { key: 'startDate', label: '시작일' },
        { key: 'endDate', label: '종료일' },
        { key: 'status', label: '상태' },
        { key: 'isShow', label: '노출여부' },
        { key: 'setting', label: '관리' }
      ],
      totalRows: 0,
      isLoading: false
    }
  },
  async fetch () {
    await this.getList()
  },
  computed: {
    breadcrumb () {
      const arr = [
        { label: '홈', url: '/' },
        { label: '편성모듈', url: '#' },
        { label: 'B형 편성모듈 관리', url: this.$route.path }
      ]
      return arr
    }
  },
  watch: {},
  mounted () {},
  methods: {
    // 조회
    async getList () {
      this.isLoading = true
      try {
        const {
          data: { data }
        } = await this.$axios.get('/api/manager/free/list/sale', {
          params: {
            pageNum: this.filter.pageNum,
            pageSize: this.filter.pageSize
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
    // 삭제
    async removeBtype (id) {
      const confirm = window.confirm('삭제 하시겠습니까?')

      if (confirm) {
        try {
          const { status } = await this.$axios.delete(
            `/api/manager/free/delete/${id}`
          )

          if (status === 200) {
            alert('삭제가 완료 되었습니다.')
            await this.getList()
          }
        } catch (e) {
          console.log(e)
        }
      } else {
        alert('삭제가 취소 되었습니다.')
      }
    }
  }
}
</script>
