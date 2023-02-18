<template>
  <b-container fluid class="page-min-height py-3">
    <UiPageTitle title="기간무료" :breadcrumb="breadcrumb">
      <template #buttons>
        <b-button variant="primary" to="/promotion/periodFree/add">
          등록
        </b-button>
      </template>
    </UiPageTitle>
    <hr>
    <!--필터-->
    <b-container
      fluid
      class="px-0"
      tag="form"
      @submit.prevent="getList"
    >
      <b-row class="mt-3 px-3">
        <b-col lg="12" class="my-1">
          <b-form-group
            label="검색"
            label-cols-sm="2"
            label-align-sm="left"
            label-size="sm"
            class="mb-0 align-items-center"
          >
            <div class="d-inline-flex">
              <b-form-select v-model="filter.search" :options="searchOptions" />
              <b-form-input
                v-model="searchValue"
                type="text"
                placeholder="검색어"
                class="ml-2"
              />
            </div>
            <b-button variant="primary" class="ml-2">
              찾기
            </b-button>
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
              class="mt-1"
            />
          </b-form-group>
        </b-col>
        <!-- 상태-->
        <b-col lg="12" class="my-1">
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
              class="mt-1"
            />
          </b-form-group>
        </b-col>

        <b-col lg="12" class="mb-1">
          <b-form-group
            label="기간 검색"
            label-cols-sm="2"
            label-align-sm="left"
            label-class="align-self-center"
            label-size="sm"
            class="mb-0"
          >
            <div class="d-inline-flex justify-content-start w-100 my-2">
              <b-form-select
                v-model="filter.dateSearch"
                class="w-13"
                :options="dateSearchOptions"
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
        <h6>기간무료 작품 목록 ({{ totalRows ? totalRows : '0' }})</h6>
      </b-col>
    </b-row>
    <hr class="my-2">
    <!-- 테이블 -->
    <b-table
      class="list"
      :items="items"
      :fields="fields"
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
        {{ totalRows - (filter.pageNum - 1) * filter.pageSize - (data.index + 1) + 1 }}
      </template>
      <!-- 구분 -->
      <template #cell(isBook)="data">
        {{ data.value ? data.value : '-' }}
      </template>
      <!-- 유형 -->
      <template #cell(menucode)="data">
        {{ data.value ? data.value : '-' }}
      </template>
      <!-- 작품명 -->
      <template #cell(title)="data">
        <NuxtLink :to="`/promotion/periodFree/${data.item.id}`">
          {{ data.value ? data.value : '-' }}
        </NuxtLink>
      </template>
      <!-- CP사 -->
      <template #cell(cp)="data">
        {{ data.value ? data.value : '-' }}
      </template>
      <!-- 시작일 -->
      <template #cell(startDate)="data">
        {{ data.value ? data.value : '-' }}
      </template>
      <!-- 종료일 -->
      <template #cell(endDate)="data">
        {{ data.value ? data.value : '-' }}
      </template>
      <!-- 무료 설정화 -->
      <template #cell(episode)="data">
        {{ data.value ? `${data.value}화` : '-' }}
      </template>
      <!-- 등록일 -->
      <template #cell(createdAt)="data">
        {{ data.value ? data.value : '-' }}
      </template>
      <!-- 등록/최종 수정 -->
      <template #cell(manager)="data">
        {{ data.value ? data.value : '-' }}
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
      <template #cell(setting)="data">
        <b-button
          variant="outline-secondary"
          class="table-inner-btn"
          @click="removePeriodFree(data.item.id)"
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
  name: 'PeriodFreeListPage',

  data () {
    return {
      filter: {
        search: '작품명',
        dateSearch: '시작일',
        type: [],
        status: [],
        period: '',
        startDate: '',
        endDate: '',
        pageNum: 1,
        pageSize: 10
      },
      currentSettingId: '',
      searchOptions: [
        { text: '작품명', value: '작품명' },
        { text: 'CP사', value: 'CP사' },
        { text: '작품번호', value: '작품번호' }
      ],
      // 유형
      typeOptions: [
        { text: '웹툰/만화', value: '웹툰/만화' },
        { text: '소설', value: '소설' }
      ],
      // 작품상태
      statusOptions: [
        { text: '대기', value: '대기' },
        { text: '진행중', value: '진행중' },
        { text: '종료', value: '종료' }
      ],
      // 기간 검색
      dateSearchOptions: [
        { value: '시작일', text: '시작일' },
        { value: '종료일', text: '종료일' },
        { value: '등록일', text: '등록일' }
      ],
      // 리스트
      isLoading: false,
      totalRows: 0,
      items: [],
      fields: [
        { key: 'no', label: '번호' },
        { key: 'isBook', label: '구분' },
        { key: 'menucode', label: '유형' },
        { key: 'title', label: '작품명' },
        { key: 'cp', label: 'CP사' },
        { key: 'startDate', label: '시작일' },
        { key: 'endDate', label: '종료일' },
        { key: 'episode', label: '무료 설정화' },
        { key: 'createdAt', label: '등록일' },
        { key: 'manager', label: '등록/최종수정' },
        { key: 'status', label: '상태' },
        { key: 'setting', label: '설정' }
      ],
      currentPage: 1,
      perPage: 5,
      searchValue: '',
      startDate: '',
      endDate: ''
    }
  },
  async fetch () {
    await this.getList()
  },
  computed: {
    breadcrumb () {
      const arr = [
        { label: '홈', url: '/' },
        { label: '프로모션 관리', url: '#' },
        { label: '기간무료', url: this.$route.path }
      ]
      return arr
    }
  },
  watch: {
    async 'filter.pageNum' () {
      await this.getList()
    }
  },
  mounted () {},
  methods: {
    async getList () {
      this.isLoading = true

      try {
        const { data: { data } } = await this.$axios.get('/api/manager/free/D/list', {
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
    async removePeriodFree (id) {
      const confirm = window.confirm('삭제 하시겠습니까?')

      if (confirm) {
        try {
          const { status } = await this.$axios.delete(`/api/manager/free/delete/${id}`)

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
