<template>
  <b-container fluid class="px-0" tag="form">
    <b-tabs v-model="currentTab" content-class="mt-3">
      <b-tab title="열람" active>
        <PageUserServiceHistorySearchBar :tab-id="0" @on-search="onSearch" />
        <!--        <table class="table border mb-0">-->
        <!--          <tbody>-->
        <!--            <tr>-->
        <!--              <th>-->
        <!--                <b-form-group-->
        <!--                  label="열람 시간"-->
        <!--                  label-size="sm"-->
        <!--                  class="mb-0"-->
        <!--                  :options="opts.date"-->
        <!--                />-->
        <!--              </th>-->
        <!--              <td colspan="3">-->
        <!--                <div class="d-inline-flex justify-content-start w-100 my-2">-->
        <!--                  <div class="d-inline-flex w-40">-->
        <!--                    <b-form-datepicker-->
        <!--                      placeholder="선택"-->
        <!--                      :date-format-options="{-->
        <!--                        year: 'numeric',-->
        <!--                        month: 'numeric',-->
        <!--                        day: 'numeric'-->
        <!--                      }"-->
        <!--                    />-->
        <!--                    <b-form-datepicker-->
        <!--                      placeholder="선택"-->
        <!--                      :date-format-options="{-->
        <!--                        year: 'numeric',-->
        <!--                        month: 'numeric',-->
        <!--                        day: 'numeric'-->
        <!--                      }"-->
        <!--                      class="ml-2"-->
        <!--                    />-->
        <!--                  </div>-->
        <!--                  <div class="mx-2">-->
        <!--                    <b-button-->
        <!--                      variant="outline-secondary active"-->
        <!--                      class="period-btn"-->
        <!--                    >-->
        <!--                      전체-->
        <!--                    </b-button>-->
        <!--                    <b-button-->
        <!--                      variant="outline-secondary"-->
        <!--                      class="period-btn"-->
        <!--                    >-->
        <!--                      오늘-->
        <!--                    </b-button>-->
        <!--                    <b-button-->
        <!--                      variant="outline-secondary"-->
        <!--                      class="period-btn"-->
        <!--                    >-->
        <!--                      7일-->
        <!--                    </b-button>-->
        <!--                    <b-button-->
        <!--                      variant="outline-secondary"-->
        <!--                      class="period-btn"-->
        <!--                    >-->
        <!--                      1개월-->
        <!--                    </b-button>-->
        <!--                    <b-button-->
        <!--                      variant="outline-secondary"-->
        <!--                      class="period-btn"-->
        <!--                    >-->
        <!--                      3개월-->
        <!--                    </b-button>-->
        <!--                    <b-button-->
        <!--                      variant="outline-secondary"-->
        <!--                      class="period-btn"-->
        <!--                    >-->
        <!--                      6개월-->
        <!--                    </b-button>-->
        <!--                    <b-button-->
        <!--                      variant="outline-secondary"-->
        <!--                      class="period-btn"-->
        <!--                    >-->
        <!--                      1년-->
        <!--                    </b-button>-->
        <!--                  </div>-->
        <!--                </div>-->
        <!--              </td>-->
        <!--            </tr>-->
        <!--            <tr>-->
        <!--              <th>구분</th>-->
        <!--              <td class="d-flex">-->
        <!--                <b-form-checkbox class="ml-3">-->
        <!--                  웹툰/만화-->
        <!--                </b-form-checkbox>-->
        <!--                <b-form-checkbox class="ml-3">-->
        <!--                  소설-->
        <!--                </b-form-checkbox>-->
        <!--              </td>-->
        <!--            </tr>-->
        <!--            <tr>-->
        <!--              <th>작품 검색</th>-->
        <!--              <td colspan="3">-->
        <!--                <b-form inline>-->
        <!--                  <b-form-input placeholder="" />-->
        <!--                  <b-button variant="primary" class="ml-2">-->
        <!--                    찾기-->
        <!--                  </b-button>-->
        <!--                </b-form>-->
        <!--              </td>-->
        <!--            </tr>-->
        <!--            <tr>-->
        <!--              <th>열람 방식</th>-->
        <!--              <td class="d-flex">-->
        <!--                <b-form-checkbox class="ml-3">-->
        <!--                  대여-->
        <!--                </b-form-checkbox>-->
        <!--                <b-form-checkbox class="ml-3">-->
        <!--                  소장-->
        <!--                </b-form-checkbox>-->
        <!--                <b-form-checkbox class="ml-3">-->
        <!--                  이따무-->
        <!--                </b-form-checkbox>-->
        <!--                <b-form-checkbox class="ml-3">-->
        <!--                  무료-->
        <!--                </b-form-checkbox>-->
        <!--                <b-form-checkbox class="ml-3">-->
        <!--                  호박-->
        <!--                </b-form-checkbox>-->
        <!--                <b-form-checkbox class="ml-3">-->
        <!--                  이용권 대여-->
        <!--                </b-form-checkbox>-->
        <!--                <b-form-checkbox class="ml-3">-->
        <!--                  이용권 소장-->
        <!--                </b-form-checkbox>-->
        <!--              </td>-->
        <!--            </tr>-->
        <!--          </tbody>-->
        <!--        </table>-->

        <b-row class="pt-5" align-h="between">
          <b-col align-self="center">
            <h6> 열람 내역 ({{ pagination.totalRows ? pagination.totalRows : '0' }})</h6>
          </b-col>
        </b-row>
        <hr class="my-2">
        <b-row align-h="end" class="mb-2" />
        <PageUserTabTable
          :items="items"
          :fields="fields.open"
          :current-page="pagination.pageNum"
          :per-page="pagination.pageSize"
          :total-rows="pagination.totalRows"
          :busy="isLoading"
        />
      </b-tab>
      <b-tab title="물약충전">
        <PageUserServiceHistorySearchBar :tab-id="1" @on-search="onSearch" />
        <b-row class="pt-5" align-h="between">
          <b-col align-self="center">
            <h6>물약 충전 내역 ({{ pagination.totalRows ? pagination.totalRows : '0' }})</h6>
          </b-col>
          <b-col cols="auto">
            <b-button
              variant="primary"
              @click="openModal('ChargePointsModal','coin')"
            >
              지급
            </b-button>
          </b-col>
        </b-row>
        <hr class="my-2 mb-2">
        <b-row align-h="end" class="mb-2" />
        <PageUserTabTable
          :items="items"
          :fields="fields.chargePotion"
          :current-page="pagination.pageNum"
          :per-page="pagination.pageSize"
          :total-rows="pagination.totalRows"
          :busy="isLoading"
          @on-popup="onPopup"
        />
      </b-tab>
      <b-tab title="물약사용">
        <PageUserServiceHistorySearchBar :tab-id="2" />
        <b-row class="pt-5" align-h="between">
          <b-col align-self="center">
            <h6>물약 사용 내역 ({{ pagination.totalRows ? pagination.totalRows : '0' }})</h6>
          </b-col>
        </b-row>
        <hr class="my-2">
        <b-row align-h="end" class="mb-2" />
        <PageUserTabTable
          :items="items"
          :fields="fields.usePotion"
          :current-page="pagination.pageNum"
          :per-page="pagination.pageSize"
          :total-rows="pagination.totalRows"
          :busy="isLoading"
        />
      </b-tab>
      <b-tab title="호박충전">
        <PageUserServiceHistorySearchBar :tab-id="3" />
        <b-row class="pt-5" align-h="between">
          <b-col align-self="center">
            <h6> 호박 충전 내역 ({{ pagination.totalRows ? pagination.totalRows : '0' }})</h6>
          </b-col>
          <b-col cols="auto">
            <b-button
              variant="primary"
              @click="openModal('ChargePointsModal', 'point')"
            >
              지급
            </b-button>
          </b-col>
        </b-row>
        <hr class="my-2 mb-2">
        <b-row align-h="end" class="mb-2" />

        <PageUserTabTable
          :items="items"
          :fields="fields.chargePumpkin"
          :current-page="pagination.pageNum"
          :per-page="pagination.pageSize"
          :total-rows="pagination.totalRows"
          :busy="isLoading"
        />
      </b-tab>
      <b-tab title="호박사용">
        <PageUserServiceHistorySearchBar :tab-id="4" />
        <b-row class="pt-5" align-h="between">
          <b-col align-self="center">
            <h6>호박 사용 내역 ({{ pagination.totalRows ? pagination.totalRows : '0' }})</h6>
          </b-col>
        </b-row>
        <hr class="my-2">
        <b-row align-h="end" class="mb-2" />
        <!-- 테이블 -->
        <PageUserTabTable
          :items="items"
          :fields="fields.usePumpkin"
          :current-page="pagination.pageNum"
          :per-page="pagination.pageSize"
          :total-rows="pagination.totalRows"
          :busy="isLoading"
        />
      </b-tab>
      <b-tab title="이용권">
        <PageUserServiceHistorySearchBar :tab-id="5" />
        <b-row class="pt-5" align-h="between">
          <b-col align-self="center">
            <h6>이용권 내역 ({{ pagination.totalRows ? pagination.totalRows : '0' }})</h6>
          </b-col>
        </b-row>
        <hr class="my-2">
        <b-row align-h="end" class="mb-2" />
        <PageUserTabTable
          :items="items"
          :fields="fields.useTicket"
          :current-page="pagination.pageNum"
          :per-page="pagination.pageSize"
          :total-rows="pagination.totalRows"
          :busy="isLoading"
        />
      </b-tab>
      <b-tab title="쿠폰">
        <PageUserServiceHistorySearchBar :tab-id="6" />
        <b-row class="pt-5" align-h="between">
          <b-col align-self="center">
            <h6>쿠폰 내역 ({{ pagination.totalRows ? pagination.totalRows : '0' }})</h6>
          </b-col>
        </b-row>
        <hr class="my-2">
        <b-row align-h="end" class="mb-2" />
        <PageUserTabTable
          :items="items"
          :fields="fields.coupons"
          :current-page="pagination.pageNum"
          :per-page="pagination.pageSize"
          :total-rows="pagination.totalRows"
          :busy="isLoading"
        />
      </b-tab>
      <b-tab title="이벤트 참여">
        <PageUserServiceHistorySearchBar :tab-id="7" />
        <b-row class="pt-5" align-h="between">
          <b-col align-self="center">
            <h6>이벤트 참여 내역 ({{ pagination.totalRows ? pagination.totalRows : '0' }})</h6>
          </b-col>
        </b-row>
        <hr class="my-2">
        <b-row align-h="end" class="mb-2" />
        <PageUserTabTable
          :items="items"
          :fields="fields.events"
          :current-page="pagination.pageNum"
          :per-page="pagination.pageSize"
          :total-rows="pagination.totalRows"
          :busy="isLoading"
        />
      </b-tab>
      <b-tab title="댓글">
        <PageUserServiceHistorySearchBar :tab-id="8" />
        <b-row class="pt-5" align-h="between">
          <b-col align-self="center">
            <h6>댓글 내역 ({{ pagination.totalRows ? pagination.totalRows : '0' }})</h6>
          </b-col>
        </b-row>
        <hr class="my-2">
        <b-row align-h="end" class="mb-2" />
        <PageUserTabTable
          :items="items"
          :fields="fields.comments"
          :current-page="pagination.pageNum"
          :per-page="pagination.pageSize"
          :total-rows="pagination.totalRows"
          :busy="isLoading"
          @on-popup="onCommentModal"
        />
      </b-tab>
      <b-tab title="메시지">
        <PageUserServiceHistorySearchBar :tab-id="9" />
        <b-row class="pt-5" align-h="between">
          <b-col align-self="center">
            <h6>메세지 내역 ({{ pagination.totalRows ? pagination.totalRows : '0' }})</h6>
          </b-col>
        </b-row>
        <hr class="my-2">
        <b-row align-h="end" class="mb-2" />
        <PageUserTabTable
          :items="items"
          :fields="fields.messages"
          :current-page="pagination.pageNum"
          :per-page="pagination.pageSize"
          :total-rows="pagination.totalRows"
          :busy="isLoading"
        />
      </b-tab>
      <b-tab title="1:1문의">
        <PageUserServiceHistorySearchBar :tab-id="10" />
        <b-row class="pt-5" align-h="between">
          <b-col align-self="center">
            <h6>1:1 문의내역 ({{ pagination.totalRows ? pagination.totalRows : '0' }})</h6>
          </b-col>
        </b-row>
        <hr class="my-2">
        <b-row align-h="end" class="mb-2" />
        <PageUserTabTable
          :items="items"
          :fields="fields.enquiry"
          :current-page="pagination.pageNum"
          :per-page="pagination.pageSize"
          :total-rows="pagination.totalRows"
          :busy="isLoading"
        />
      </b-tab>
      <b-tab title="계정">
        <b-row class="pt-4" align-h="between">
          <b-col align-self="center">
            <h6>계정 내역 ({{ pagination.totalRows ? pagination.totalRows : '0' }})</h6>
          </b-col>
        </b-row>
        <hr class="my-2">
        <b-row align-h="end" class="mb-2" />
        <PageUserTabTable
          :items="items"
          :fields="fields.accounts"
          :current-page="pagination.pageNum"
          :per-page="pagination.pageSize"
          :total-rows="pagination.totalRows"
          :busy="isLoading"
        />
      </b-tab>
    </b-tabs>
    <UiPagination
      class="py-4"
      :page="pagination.currentPage"
      :per-page="pagination.perPage"
      :total-rows="pagination.totalRows"
      @change-page="movePage"
    />
    <PageUserChargePointsModal modal-id="ChargePointsModal" :data-type="currentTab===1?'coin':'point'" />
    <PageUserCollectPointsModal modal-id="CollectPointsModal" :data-type="currentTab===1?'coin':'point'" />
    <PageUserCommentDetailModal modal-id="CommentDetailModal" :comment-id="commentId" />
    <PageUserEventDetailModal modal-id="EventDetailModal" event-id="" />
    <UiCenterModal
      modal-id="CheckRefundModal"
      modal-title="환불처리"
      modal-size="sm"
      ok-title="확인"
      cancel-title="취소"
      @ok="onRefund"
    >
      <template #contents>
        <div class="text-center">
          정말로 환불 처리하시겠습니까?
        </div>
      </template>
    </UiCenterModal>
  </b-container>
</template>

<script>
export default {
  name: 'ServiceHistory',
  data () {
    return {
      isLoading: false,
      userId: this.$route.query.id,
      commentId: '',
      filter: {
        searchStartDt: '',
        searchEndDt: ''
      },
      pagination: {
        currentPage: 1,
        perPage: 50,
        totalRows: 0
      },
      currentTab: 0,
      items: [],
      fields: {
        open: [
          { key: 'no', label: '번호' },
          { key: 'isBook', label: '유형' },
          { key: 'menucode', label: '구분' },
          { key: 'title', label: '작품명' },
          { key: 'subTitle', label: '회차명' },
          { key: 'viewType', label: '열람방식' },
          { key: 'buyType', label: '구매방법' },
          { key: 'createdAt', label: '열람시간' }
        ],
        chargePotion: [
          { key: 'no', label: '번호' },
          { key: 'no', label: '번호' },
          { key: 'createdAt', label: '발생일' },
          { key: 'chargeType', label: '충전/지급' },
          { key: 'name', label: '상품명' },
          { key: 'charge', label: '물약' },
          { key: 'useDate', label: '유효기간' },
          { key: 'changeDetail', label: '사유' },
          { key: 'manager', label: '담당자' },
          { key: 'events', label: '' }
        ],
        usePotion: [
          { key: 'no', label: '번호' },
          { key: 'startDate', label: '사용일' },
          { key: 'isBook', label: '유형' },
          { key: 'menucode', label: '구분' },
          { key: 'title', label: '작품명' },
          { key: 'subTitle', label: '회차명' },
          { key: 'buyType', label: '구매' },
          { key: 'buyCnt', label: '물약' },
          { key: 'openYn', label: '열람' },
          { key: 'openDt', label: '열람시간' }
        ],
        chargePumpkin: [
          { key: 'no', label: '번호' },
          { key: 'createdAt', label: '발생일' },
          { key: 'chargeType', label: '구분' },
          { key: 'name', label: '상품명' },
          { key: 'charge', label: '호박' },
          { key: 'useDate', label: '유효기간' },
          { key: 'changeDetail', label: '사유' },
          { key: 'manager', label: '담당자' },
          { key: 'events', label: '' }
        ],
        usePumpkin: [
          { key: 'no', label: '번호' },
          { key: 'startDate', label: '사용일' },
          { key: 'isBook', label: '사용유형' },
          { key: 'type', label: '작품유형' },
          { key: 'menucode', label: '구분' },
          { key: 'title', label: '작품명' },
          { key: 'episodeNo', label: '회차명' },
          { key: 'buyCnt', label: '호박' },
          { key: 'openDt', label: '열람시간' }
        ],
        useTicket: [
          { key: 'no', label: '번호' },
          { key: 'isBook', label: '유형' },
          { key: 'menucode', label: '구분' },
          { key: 'title', label: '작품명' },
          { key: 'viewType', label: '이용권 형태' },
          { key: 'ranking', label: '발행대상' },
          { key: 'settlementYn', label: '정산여부' },
          { key: 'initialTicketCount', label: '발급수' },
          { key: 'usedCount', label: '사용수' },
          { key: 'expireYn', label: '기간만료' },
          { key: 'startDate', label: '발급일' },
          { key: 'endDate', label: '만료일' }
        ],
        coupons: [
          { key: 'no', label: '번호' },
          { key: 'startDate', label: '발생일' },
          { key: 'name', label: '쿠폰명' },
          { key: 'code', label: '쿠폰번호' },
          { key: 'coin', label: '물약/호박' },
          { key: 'usedDate', label: '사용일' },
          { key: 'manager', label: '담당자' }
        ],
        events: [
          { key: 'no', label: '번호' },
          { key: 'name', label: '이벤트명' },
          { key: 'join', label: '참여일' },
          { key: 'period', label: '이벤트 기간' },
          { key: 'history', label: '내역' },
          { key: 'admin', label: '담당자' }
        ],
        comments: [
          { key: 'no', label: '번호' },
          { key: 'title', label: '작품명' },
          { key: 'subTitle', label: '회차명' },
          { key: 'replyType', label: '유형' },
          { key: 'comment', label: '작성글' },
          { key: 'createdAt', label: '작성일' },
          { key: 'likeCnt', label: '공감' },
          { key: 'accusedCnt', label: '신고' },
          { key: 'isShow', label: '상태' },
          { key: 'updatedAt', label: '차단/숨김 날짜' },
          { key: 'manager', label: '담당자' }
        ],
        messages: [
          { key: 'no', label: '번호' },
          { key: 'title', label: '수신인' },
          { key: 'messengerType', label: '메신저 종류' },
          { key: 'messageType', label: '메시지 종류' },
          { key: 'content', label: '메시지 내용' },
          { key: 'sendDate', label: '발송일' },
          { key: 'reserveTime', label: '예약 시간' },
          { key: 'status', label: '상태' }
        ],
        enquiry: [
          { key: 'no', label: '번호' },
          { key: 'queryType', label: '문의종류' },
          { key: 'title', label: '제목' },
          { key: 'writeDate', label: '작성일' },
          { key: 'replyYesNo', label: '답변여부' },
          { key: 'replyTime', label: '답변시간' },
          { key: 'replyUser', label: '답변자' },
          { key: 'history', label: '답변관리' }
        ],
        accounts: [
          { key: 'no', label: '번호' },
          { key: 'status', label: '상태' },
          { key: 'history', label: '내역' },
          { key: 'issueDate', label: '발생일' }
        ]
      }
    }
  },
  watch: {
    currentTab () {
      this.pagination = {
        currentPage: 1,
        perPage: 50,
        totalRows: 0
      }
      this.getItems()
    }
  },
  methods: {
    async getItems () {
      this.isLoading = true
      try {
        const req = {
          pageNum: this.pagination.currentPage,
          pageSize: this.pagination.perPage
        }
        if (this.filter.searchStartDt) { req.searchStartDt = this.filter.searchStartDt }
        if (this.filter.searchEndDt) { req.searchEndDt = this.filter.searchEndDt }

        // 더미용 아이디 780537
        // 0 열람 ,
        // 1 물약충전 coin,
        // 2 물약사용 ,
        // 3 호박충전 point,
        // 4 호박사용 ,
        // 5 이용권 ,
        // 6 쿠폰 ,
        // 7 이벤트 참여 ,
        // 8 댓글 ,
        // 9 메시지 ,
        // 10 1:1 문의 ,
        // 11 계정 ,
        let params = 780537
        let address = ''
        if (this.currentTab === 0) { address = 'lookup'; params = 780537 } else if (this.currentTab === 1) { address = 'charge/coin'; params = 780537 } else if (this.currentTab === 2) { address = 'use/coin'; params = 780537 } else if (this.currentTab === 3) { address = 'charge/point'; params = 780537 } else if (this.currentTab === 4) { address = 'use/point'; params = 780537 } else if (this.currentTab === 5) { address = 'use/ticket'; params = 780537 } else if (this.currentTab === 6) { address = 'use/coupon'; params = 780537 } else if (this.currentTab === 7) { address = '이벤트참여'; params = 780537 } else if (this.currentTab === 8) { address = 'reply'; params = 780537 } else if (this.currentTab === 9) { address = '메시지'; params = 780537 } else if (this.currentTab === 10) { address = '1대1문의'; params = 780537 } else if (this.currentTab === 11) { address = '계정'; params = 780537 }
        console.log('params', params)
        const {
          status,
          data: { data }
        } = await this.$axios.get(
            // dummy id 780537
            `/api/manager/user/${address}/${this.userId}`,
            {
              params: req
            }
        )
        if (status === 200) {
          console.log('resp ::: ', data)
          this.items = data.list
          this.pagination.totalRows = data.total
        }
      } catch (e) {
        console.log(e)
      } finally {
        this.isLoading = false
      }
    },
    openModal (id, type) {
      this.$root.$emit('bv::show::modal', id)
    },
    movePage (event) {
      this.pagination.currentPage = event
      this.getItems()
    },
    onPopup (val) {
      // 충전일 경우 모달 확인 후 다이렉트로 환불 api 요청
      if (val.chargeType === '충전') { this.$root.$emit('bv::show::modal', 'CheckRefundModal') }
      // 지급일 경우 회수 팝업
      if (val.chargeType === '지급') { this.$root.$emit('bv::show::modal', 'CollectPointsModal') }
    },
    onRefund () {
      console.log('on refund')
    },
    onCommentModal (val) {
      console.log('comment modal ::: ', val)
      this.commentId = val.id
      this.$root.$emit('bv::show::modal', 'CommentDetailModal')
      //  댓글 아이디 값으로 상세 조회
      // this.$root.$emit('bv::show::modal', 'CommentDetailModal')
    },
    onSearch (params) {
      console.log('emits param ::: ', params)
    },
    openTest () {
      // 모달 테스트용
      // this.$root.$emit('bv::show::modal', 'CommentDetailModal')
    }
  }
}
</script>
