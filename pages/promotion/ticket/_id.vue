<template>
  <b-container fluid class="page-min-height py-3">
    <UiPageTitle title="이용권 상세" :breadcrumb="breadcrumb">
      <template #buttons>
        <b-button
          variant="outline-primary"
          @click="$router.push('/promotion/ticket/edit')"
        >
          수정
        </b-button>
      </template>
    </UiPageTitle>
    <hr>

    <b-row>
      <b-col>
        <table class="table border mb-0 table-layout-fixed text-center">
          <colgroup>
            <col style="width: 10%">
            <col>
            <col style="width: 10%">
            <col>
          </colgroup>
          <tbody>
            <tr>
              <th>이용권명</th>
              <td colspan="15">
                {{ ticketInfo.name ? ticketInfo.name : '-' }}
              </td>
            </tr>
            <tr>
              <th>이용권 대상 작품</th>
              <td colspan="15">
                {{ ticketInfo.title ? ticketInfo.title : '-' }}
              </td>
            </tr>
            <tr>
              <th>발급 종류</th>
              <td colspan="4">
                {{ ticketInfo.issuType ? ticketInfo.issuType : '-' }}
              </td>
              <th>발급자 수</th>
              <td colspan="4">
                {{ ticketInfo.issuCnt ? ticketInfo.issuCnt : '-' }}
              </td>
              <th>사용자 수</th>
              <td colspan="4">
                {{ ticketInfo.useCnt ? ticketInfo.useCnt : '-' }}
              </td>
              <th>미사용자 수</th>
              <td colspan="4">
                {{ ticketInfo.noUseCnt ? ticketInfo.noUseCnt : '-' }}
              </td>
            </tr>
            <tr>
              <th>이용권 상태</th>
              <td colspan="4">
                <p
                  v-if="ticketInfo.status === '진행중'"
                  variant="info"
                  class="table-inner-btn ml-2"
                  :style="{ color: 'blue' }"
                >
                  진행중
                </p>
                <p v-if="ticketInfo.status === '대기'">
                  대기
                </p>
                <p
                  v-if="ticketInfo.status === '종료'"
                  :style="{ color: 'red' }"
                >
                  종료
                </p>
              </td>
              <th>시작일</th>
              <td colspan="4">
                {{ ticketInfo.startDate ? ticketInfo.startDate : '-' }}
              </td>
              <th>종료일</th>
              <td colspan="4">
                {{ ticketInfo.endDate ? ticketInfo.endDate : '-' }}
              </td>
              <th>정산여부</th>
              <td colspan="4">
                {{ ticketInfo.settlementYn ? ticketInfo.settlementYn : '-' }}
              </td>
            </tr>
          </tbody>
        </table>

        <b-row class="mt-5" align-h="between">
          <b-col>
            <table class="table border table-layout-fixed text-center">
              <colgroup>
                <col style="width: 16.7%">
              </colgroup>
              <tbody>
                <tr>
                  <th>아이디</th>
                  <td><b-form-input class="w-20" /></td>
                </tr>
              </tbody>
            </table>
          </b-col>
        </b-row>
      </b-col>
    </b-row>
    <b-container fluid class="px-0" tag="form" @submit.prevent="getList">
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
        <h6>
          {{ ticketInfo.name ? ticketInfo.name : '-' }} 목록({{
            totalRows ? totalRows : '0'
          }})
        </h6>
      </b-col>
    </b-row>
    <hr class="my-2">
    <b-table
      class="list"
      :items="items"
      :fields="fields"
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
        <div class="text-center text danger my-4">
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
      <!-- 회원 -->
      <template #cell(cartoonMainId)="data">
        {{ data.value ? data.value : '-' }}
      </template>
      <!-- 이용권명 -->
      <template #cell(name)="data">
        {{ data.value ? data.value : '-' }}
      </template>
      <!-- 작품명 (새로운 버전에서 삭제 - 보류)-->
      <!-- <template #cell(title)="data">
        {{ data.value ? data.value : '-' }}
      </template> -->
      <!-- 시작일 -->
      <template #cell(startDate)="data">
        {{ data.value ? data.value : '-' }}
      </template>
      <!-- 종료일 -->
      <template #cell(endDate)="data">
        {{ data.value ? data.value : '-' }}
      </template>
      <!-- 발급 개수 -->
      <template #cell(initialTicketCount)="data">
        {{ data.value ? data.value : '-' }}
      </template>
      <!-- 사용 개수 -->
      <template #cell(usedCount)="data">
        {{ data.value ? data.value : '-' }}
      </template>
      <!-- 미사용 개수 -->
      <template #cell(noUsedCount)="data">
        {{ data.value ? data.value : '-' }}
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
  name: 'PromotionDetailPage',
  data () {
    return {
      isTicketInfoLoading: false,
      ticketInfo: {},
      filter: {
        pageNum: 1,
        pageSize: 5
      },
      isLoading: false,
      totalRows: 0,
      items: [],
      fields: [
        { key: 'no', label: '번호' },
        { key: 'cartoonMainId', label: '회원' },
        { key: 'name', label: '이용권명' },
        // { key: 'title', label: '작품명' },
        { key: 'startDate', label: '시작일' },
        { key: 'endDate', label: '종료일' },
        { key: 'initialTicketCount', label: '발급 개수' },
        { key: 'usedCount', label: '사용개수' },
        { key: 'noUsedCount', label: '미사용개수' }
      ],
      currentPage: 1,
      perPage: 5,
      filterSort: [],
      searchValue: '',
      startDate: '',
      endDate: ''
    }
  },
  async fetch () {
    await this.getInfo()
    await this.getList()
  },
  computed: {
    breadcrumb () {
      const arr = [
        { label: '홈', url: '/' },
        { label: '프로모션 관리', url: '#' },
        { label: '이용권 상세', url: this.$route.path }
      ]
      return arr
    }
  },
  watch: {},
  created () {},
  mounted () {},
  methods: {
    async getList () {
      this.isLoading = true

      try {
        const {
          status,
          data: { data }
        } = await this.$axios.get(
          `/api/manager/ticket/detail/${this.$route.params.id}`,
          {
            params: this.filter
          }
        )

        if (status === 200) {
          this.list = data.list
          this.totalRows = data.total
        }
      } catch (e) {
        console.log(e)
      } finally {
        this.isLoading = false
      }
    },

    // 상단
    async getInfo () {
      this.isTicketInfoLoading = true
      try {
        const {
          status,
          data: { data }
        } = await this.$axios.get(
          `/api/manager/ticket/issu/detail/${this.$route.params.id}`
        )
        if (status === 200) {
          this.ticketInfo = data
        }
      } catch (e) {
        console.log(e)
      } finally {
        this.isTicketInfoLoading = false
      }
    },
    openSearchModal (id) {
      this.$root.$emit('bv::show::modal', id)
    }
  }
}
</script>
