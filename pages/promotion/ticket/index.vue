<template>
  <b-container fluid class="page-min-height py-3">
    <UiPageTitle title="이용권" :breadcrumb="breadcrumb">
      <template #buttons>
        <b-button variant="primary" to="/promotion/ticket/add">
          이용권 등록
        </b-button>
      </template>
    </UiPageTitle>
    <hr>
    <b-container
      fluid
      class="px-0"
      tag="form"
      @submit.prevent="totalTicketList"
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
              <b-form-input v-model="searchValue" class="ml-2 w-25" />
              <b-button variant="primary" class="ml-2">
                찾기
              </b-button>
            </div>
          </b-form-group>
        </b-col>
      </b-row>

      <b-row class="px-3">
        <b-col lg="12" class="mb-2">
          <b-form-group
            v-slot="{ ariaDescribedby }"
            label="대상자"
            label-cols-sm="2"
            label-align-sm="left"
            label-size="sm"
            class="mb-0"
          >
            <b-form-checkbox-group
              v-model="filter.ranking"
              :options="rankingOptions"
              :aria-describedby="ariaDescribedby"
              class="mt-1"
            />
          </b-form-group>
        </b-col>
      </b-row>

      <b-row class="px-3">
        <b-col lg="12">
          <b-form-group
            v-slot="{ ariaDescribedby }"
            label="기간"
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
                  class="ml-2"
                />
              </div>
            </div>
          </b-form-group>
        </b-col>
      </b-row>
    </b-container>

    <hr class="my-2">
    <b-row align-h="center" class="mb-4">
      <b-col cols="2">
        <b-button variant="primary" class="w-75">
          검색
        </b-button>
      </b-col>
    </b-row>
    <b-row align-h="between" class="mt-5">
      <b-col align-self="center">
        <h6>이용권 목록 ({{ totalRows ? totalRows : '0' }})</h6>
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
      <!-- 작품명 -->
      <template #cell(title)="data">
        {{ data.value ? data.value : '-' }}
      </template>
      <!-- 이용권명 -->
      <template #cell(name)="data">
        <NuxtLink :to="`/promotion/ticket/${data.item.id}`">
          {{ data.value }}
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
      <!-- 대상자 -->
      <template #cell(ranking)="data">
        {{ data.value ? data.value : '-' }}
      </template>
      <!-- 발행 종류 -->
      <template #cell(viewType)="data">
        {{ data.value ? data.value : '-' }}
      </template>
      <!-- 발행 개수 -->
      <template #cell(initialTicketCount)="data">
        {{ data.value ? data.value : '-' }}
      </template>
      <!-- 정산 여부 -->
      <template #cell(settlementYn)="data">
        {{ data.value ? data.value : '-' }}
      </template>
      <!-- 상태 -->
      <template #cell(status)="data">
        <p
          v-if="data.value === '진행중'"
          variant="info"
          class="table-inner-btn ml-2"
          :style="{ color: 'blue' }"
        >
          진행중
        </p>
        <p v-if="data.value === '대기'">
          대기
        </p>
        <p v-if="data.value === '종료'" :style="{ color: 'red' }">
          종료
        </p>
      </template>

      <!-- 등록일 -->
      <template #cell(createdAt)="data">
        {{ data.value ? data.value.split(' ')[0] : '-' }}
      </template>
      <!-- 담당자 -->
      <template #cell(manager)="data">
        {{ data.value ? data.value : '-' }}
      </template>
      <!-- 설정 -->
      <template #cell(setting)="data">
        <b-button
          variant="outline-secondary"
          class="table-inner-btn"
          @click="deleteTicket(data.item.id)"
        >
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
  name: 'GiftUtilizeListPage',
  data () {
    return {
      isLoading: false,
      filter: {
        search: '선택',
        dateSearch: '시작일',
        startDate: '',
        endDate: ''
      },
      searchOptions: [
        { value: '선택', text: '선택' },
        { value: '작품명', text: '작품명' },
        { value: '이용권명', text: '이용권명' }
      ],
      rankingOptions: [
        { value: '정액제 회원', text: '정액제 회원' },
        { value: '노란마녀', text: '노란마녀' },
        { value: '초록마녀', text: '초록마녀' }
      ],
      dateSearchOptions: [
        { value: '시작일', text: '시작일' },
        { value: '종료일', text: '종료일' },
        { value: '등록일', text: '등록일' }
      ],
      totalRows: 0,
      currentPage: 1,
      perPage: 5,
      indeterminate: false,
      name: null,
      items: [],
      fields: [
        { key: 'no', label: '번호' },
        { key: 'title', label: '작품명' },
        { key: 'name', label: '이용권명' },
        { key: 'startDate', label: '시작일' },
        { key: 'endDate', label: '종료일' },
        { key: 'ranking', label: '대상자' },
        { key: 'viewType', label: '발행 종류' },
        { key: 'initialTicketCount', label: '발급 개수' },
        { key: 'settlementYn', label: '정산 여부' },
        { key: 'status', label: '상태' },
        { key: 'createdAt', label: '등록일' },
        { key: '여기다시넣어야함', label: '담당자' },
        { key: 'setting', label: '설정' }
      ]
    }
  },
  async fetch () {
    await this.totalTicketList()
  },
  computed: {
    breadcrumb () {
      const arr = [
        { label: '홈', url: '/' },
        { label: '프로모션 관리', url: '#' },
        { label: '이용권', url: this.$route.path }
      ]
      return arr
    }
  },
  watch: {
    async currentPage () {
      await this.totalTicketList()
    }
  },
  created () {},
  mounted () {
    this.totalRows = this.items.length
  },
  methods: {
    async totalTicketList () {
      this.isLoading = true

      try {
        const {
          data: { data }
        } = await this.$axios.get('/api/manager/ticket/list', {
          params: {
            search: this.search,
            ranking: this.ranking,
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
    },
    // 삭제
    async deleteTicket (id) {
      if (confirm('정말 삭제하시겠습니까?') === true) {
        try {
          const { status } = await this.$axios.delete(
            `/api/manager/ticket/delete/${id}`
          )

          if (status === 200) {
            alert('이용권 삭제가 완료 되었습니다.')
            await this.totalTicketList()
          }
        } catch (e) {
          console.log(e)
        }
      } else {
        return false
      }
    }
  }
}
</script>
