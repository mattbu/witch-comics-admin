<template>
  <b-container fluid class="page-min-height py-3">
    <UiPageTitle title="메세지 알림 수정" :breadcrumb="breadcrumb">
      <template #buttons>
        <b-button variant="primary" @click="editMessage">
          수정
        </b-button>
      </template>
    </UiPageTitle>
    <hr>
    <b-container
      fluid
      class="px-0"
      tag="form"
      @submit.prevent="MessageDetailList"
    >
      <table class="table border mb-0 table-layout-fixed">
        <tbody>
          <tr>
            <th>가입방법</th>
            <td />
            <th>닉네임</th>
            <td />
            <th>최근 접속일</th>
            <td />
          </tr>
          <tr>
            <th>가입일</th>
            <td />
            <th>등급</th>
            <td />
            <th>마케팅정보 수신 동의</th>
            <td>
              <b-form-checkbox />
            </td>
          </tr>
        </tbody>
      </table>

      <table class="table border my-2 table-layout-fixed">
        <colgroup>
          <col style="width: 15%">
          <col>
          <col style="width: 10%">
          <col>
        </colgroup>
        <tbody>
          <tr>
            <th>아이디</th>
            <td><b-form-input class="w-60" /></td>
          </tr>
          <tr>
            <th>열람일</th>
            <td>
              <div class="d-inline-flex justify-content-start w-100">
                <div class="d-inline-flex w-30">
                  <b-form-datepicker
                    v-model="filter.startDate"
                    placeholder="선택"
                    :date-format-options="{
                      year: 'numeric',
                      month: 'numeric',
                      day: 'numeric'
                    }"
                  />
                  <b-form-datepicker
                    v-model="filter.endDate"
                    placeholder="선택"
                    :date-format-options="{
                      year: 'numeric',
                      month: 'numeric',
                      day: 'numeric'
                    }"
                    class="ml-2"
                  />
                </div>
                <div class="ml-2">
                  <b-button variant="outline-secondary" class="period-btn">
                    전체
                  </b-button>
                  <b-button variant="outline-secondary" class="period-btn">
                    오늘
                  </b-button>
                  <b-button variant="outline-secondary" class="period-btn">
                    7일
                  </b-button>
                  <b-button variant="outline-secondary" class="period-btn">
                    1개월
                  </b-button>
                  <b-button variant="outline-secondary" class="period-btn">
                    3개월
                  </b-button>
                  <b-button variant="outline-secondary" class="period-btn">
                    6개월
                  </b-button>
                  <b-button variant="outline-secondary" class="period-btn">
                    1년
                  </b-button>
                  <b-button variant="outline-secondary" class="period-btn">
                    초기화
                  </b-button>
                </div>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
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
        <h6>메세지 열람 회원 목록 ({{ totalRows ? totalRows : '0' }})</h6>
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
      <template #cell(no)="data">
        {{
          totalRows - (currentPage - 1) * filter.perPage - (data.index + 1) + 1
        }}
      </template>
      <!-- 회원 -->
      <template #cell(email)="data">
        {{ data.value ? data.value : '-' }}
      </template>
      <!-- 메시지 내용 -->
      <template #cell(content)="data">
        {{ data.value ? data.value : '-' }}
      </template>
      <!-- 열람일 -->
      <template #cell(open)="data">
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
  name: 'CsMessageEditPage',

  data () {
    return {
      filter: {
        startDate: '',
        endDate: ''
      },
      items: [
        // {
        //   id: 5,
        //   type: '웹툰',
        //   title: '작품 제목',
        //   comment: '존나 재밌어요 ㅋ',
        //   reply: '103',
        //   writer: 'OOO',
        //   created_at: '2022-10-21',
        //   yn: 'O',
        //   reason: '비속어',
        //   status: '숨김'
        // }
      ],
      fields: [
        { key: 'no', label: '번호' },
        { key: 'receive', label: '수신인' },
        { key: 'type', label: '메시지 종류' },
        { key: 'content', label: '메시지 내용' },
        { key: 'admin', label: '담당자' },
        { key: 'bookAt', label: '예약일' },
        { key: 'startAt', label: '상태' },
        { key: 'sendAt', label: '발송일' },
        { key: 'setting', label: '관리' }
      ],
      totalRows: 1,
      currentPage: 1,
      selectAll: false,
      selectedList: [],
      indeterminate: false
    }
  },
  async fetch () {
    await this.totalMessageList()
  },
  computed: {
    breadcrumb () {
      const arr = [
        { label: '홈', url: '/' },
        { label: '서비스 운영 관리', url: '#' },
        { label: '메세지 알림 관리', url: this.$route.path }
      ]
      return arr
    }
  },
  watch: {},
  mounted () {},
  methods: {
    async MessageDetailList () {
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
