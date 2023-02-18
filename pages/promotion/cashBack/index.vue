<template>
  <b-container fluid class="page-min-height py-3">
    <UiPageTitle title="캐시백" :breadcrumb="breadcrumb">
      <template #buttons>
        <b-button variant="primary" to="/promotion/cashBack/add">
          등록
        </b-button>
      </template>
    </UiPageTitle>
    <hr>
    <b-container
      fluid
      class="px-0"
      tag="form"
      @submit.prevent="getList"
    >
      <!-- 필터 -->
      <b-row>
        <b-col lg="12" class="my-1">
          <b-form-group
            label="지급 유형"
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
        <b-col lg="12" class="my-1">
          <b-form-group
            label="캐시백 조건"
            label-cols-sm="2"
            label-align-sm="left"
            label-size="sm"
            class="mb-0"
          >
            <b-form-checkbox-group
              v-model="filter.condition"
              :options="cashbackOptions"
              class="mt-1"
            />
          </b-form-group>
        </b-col>
        <b-col lg="12" class="my-1">
          <b-form-group
            label="기간"
            label-cols-sm="2"
            label-align-sm="left"
            label-size="sm"
            class="mb-0"
            label-class="align-self-center"
          >
            <div class="d-inline-flex justify-content-start w-100 my-2">
              <b-form-select
                v-model="filter.dateSearch"
                class="w-13"
                :options="periodOptions"
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
                <span class="ml-2 align-self-center">~</span>
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
          <b-button type="submit" variant="primary" class="w-75">
            검색
          </b-button>
        </b-col>
      </b-row>
    </b-container>
    <b-row class="pt-5">
      <b-col align-self="center">
        <h6>캐시백 내역 ({{ totalRows ? totalRows : '0' }})</h6>
      </b-col>
    </b-row>
    <hr class="my-2">
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
      <!-- 상태 -->
      <template #cell(status)="data">
        <p
          v-if="data.value === '진행'"
          class="table-inner-btn ml-2 text-info"
        >
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
          @click="removeCashback(data.item.id)"
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
  name: 'CashBackListPage',
  data () {
    return {
      filter: {
        type: [],
        condition: [],
        dateSearch: '시작일',
        startDate: '',
        endDate: '',
        pageSize: 10,
        pageNum: 1
      },
      // 지급 유형 옵션
      typeOptions: [
        { text: '물약', value: '물약' },
        { text: '호박', value: '호박' },
        { text: '기타', value: '기타' },
        { text: '룰렛 참여권', value: '룰렛 참여권' },
        { text: '이용권', value: '이용권' }
      ],
      // 캐시백 조건 옵션
      cashbackOptions: [
        { text: '물약', value: '물약' },
        { text: '회차', value: '회차' },
        { text: '이용권', value: '이용권' },
        { text: '이따무', value: '이따무' }
      ],
      // 기간 옵션
      periodOptions: [
        { value: '시작일', text: '시작일' },
        { value: '종료일', text: '종료일' },
        { value: '등록일', text: '등록일' }
      ],
      isLoading: false,
      items: [],
      fields: [
        { key: 'no', label: '번호' },
        { key: 'division', label: '구분명' },
        { key: 'type', label: '시작일' },
        { key: 'name', label: '종료일' },
        { key: 'start_at', label: '지급유형' },
        { key: 'end_at', label: '캐시백 조건' },
        { key: 'cashBackCondition', label: '중복지급' },
        { key: 'provide', label: '댓글설정' },
        { key: 'updated_at', label: '상태' },
        { key: 'admin', label: '등록일' },
        { key: 'admin', label: '등록/최종수정' },
        { key: 'setting', label: '관리' }
      ],
      totalRows: 0
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
        { label: '캐시백', url: this.$route.path }
      ]
      return arr
    }
  },
  watch: {},
  mounted () {},
  methods: {
    // 목록
    async getList () {
      this.isLoading = true
      try {
        const {
          data: { data }
        } = await this.$axios.get('/api/manager/free/E/list', {
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
    },

    // 삭제
    async removeCashback (id) {
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
