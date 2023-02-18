<template>
  <b-container fluid class="page-min-height py-3">
    <UiPageTitle
      title="관리자 계정 등록"
      :breadcrumb="breadcrumb"
    >
      <template #buttons>
        <b-button variant="outline-primary" @click="$router.push('/content/piece')">
          취소
        </b-button>
        <b-button variant="primary">
          등록
        </b-button>
      </template>
    </UiPageTitle>
    <hr>
    <b-row class="mt-4">
      <b-col cols="12">
        <table class="table border mb-0 table-layout-fixed">
          <colgroup>
            <col style="width: 15%">
            <col>
            <col style="width: 10%">
            <col>
          </colgroup>
          <tbody>
            <!-- 정보 -->
            <tr>
              <th>이메일</th>
              <td colspan="3">
                <b-form-group v-slot="{ ariaDescribedby }">
                  <div class="d-inline-flex w-100">
                    <b-form-input
                      v-model="form.email"
                      type="text"
                      placeholder="연결할 이메일을 입력해 주세요."
                      :aria-describedby="ariaDescribedby"
                      class="w-35"
                    />
                    <b-button variant="outline-secondary" class="table-inner-btn ml-2">
                      중복 체크
                    </b-button>
                  </div>
                </b-form-group>
              </td>
            </tr>

            <tr>
              <th>계정명</th>
              <td colspan="3">
                <b-form-input
                  v-model="form.accountName"
                  type="text"
                  placeholder="계정명을 입력해 주세요."
                  class="w-35"
                />
              </td>
            </tr>

            <tr>
              <th>소속</th>
              <td colspan="3">
                <b-form-input
                  v-model="form.belongTo"
                  type="text"
                  placeholder="계정명을 입력해 주세요."
                  class="w-35"
                />
              </td>
            </tr>

            <tr>
              <th>CP</th>
              <td colspan="3">
                <b-form-group v-slot="{ ariaDescribedby }">
                  <b-form-radio-group
                    v-model="form.cp"
                    :options="cpOptions"
                    :aria-describedby="ariaDescribedby"
                  />
                </b-form-group>
              </td>
            </tr>

            <template v-if="form.cp === 2">
              <tr>
                <th>CP사 선택</th>
                <td colspan="3">
                  <b-form-group v-slot="{ ariaDescribedby }">
                    <b-form-select
                      v-model="form.selectCp"
                      :options="cpList"
                      class="w-20"
                      :aria-describedby="ariaDescribedby"
                    />
                  </b-form-group>
                </td>
              </tr>
            </template>

            <tr>
              <th>기간 설정</th>
              <td colspan="3">
                <b-form-group v-slot="{ ariaDescribedby }">
                  <b-form-radio-group
                    v-model="form.setPeriod"
                    :options="periodOptions"
                    :aria-describedby="ariaDescribedby"
                  />
                </b-form-group>

                <template v-if="form.setPeriod === 2">
                  <div class="d-inline-flex mt-3">
                    <div class="">
                      <label for="start-date" class="fs-14 mb-0">시작일</label>
                      <b-form-datepicker
                        id="start-date"
                        v-model="form.startDate"
                        placeholder="시작일 선택"
                        :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
                      />
                    </div>
                    <div class="ml-2">
                      <label for="end-date" class="fs-14 mb-0">종료일</label>
                      <b-form-datepicker
                        id="end-date"
                        v-model="form.endDate"
                        placeholder="종료일 선택"
                        :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
                      />
                    </div>
                  </div>
                </template>
              </td>
            </tr>

            <tr>
              <th>권한</th>
              <td colspan="3">
                <b-form-group v-slot="{ ariaDescribedby }">
                  <b-form-radio-group
                    v-model="form.auth"
                    :options="authOptions"
                    :aria-describedby="ariaDescribedby"
                  />
                </b-form-group>
              </td>
            </tr>
          </tbody>
        </table>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: 'SettingAdminAddPage',
  data () {
    return {
      form: {
        accountName: '',
        belongTo: '',
        cp: null,
        selectCp: null,
        setPeriod: null,
        startDate: '',
        endDate: '',
        auth: null,
        authList: []
      },
      cpOptions: [
        { text: '전체', value: 1 },
        { text: '선택', value: 2 }
      ],
      periodOptions: [
        { text: '무제한', value: 1 },
        { text: '기간 설정', value: 2 },
        { text: '비활성', value: 3 }
      ],
      authOptions: [
        { text: '전체', value: 1 },
        { text: '설정', value: 2 }
      ],
      cpList: [
        { text: '선택', value: null },
        { text: 'CP1', value: 1 },
        { text: 'CP2', value: 2 },
        { text: 'CP3', value: 3 }
      ],
      menuList: [
        {
          id: 1,
          name: '회원 관리',
          subMenuList: [
            { url: '/user/list', menuName: '회원 리스트' },
            { url: '/user/point', menuName: '포인트 관리' },
            { url: '/user/group', menuName: '회원 그룹 관리' },
            {
              url: '/user/message',
              menuName: '메시지',
              moreSubMenuList: [
                { url: '/user/message/send', menuName: '메시지 전송' },
                { url: '/user/message/list', menuName: '메시지 내역' }
              ]
            }
          ]
        },
        {
          id: 2,
          name: '콘텐츠 관리',
          subMenuList: [
            { url: '/content/piece', menuName: '작품 관리' },
            { url: '/content/magazine', menuName: '매거진 관리' },
            { url: '/content/formation', menuName: '편성 모듈' },
            { url: '/content/serial-tab', menuName: '연재 탭' }
          ]
        },
        {
          id: 3,
          name: '이용 현황',
          subMenuList: [
            { url: '/usage/status', menuName: '사용자 이용 현황' },
            { url: '/usage/purchase-history', menuName: '콘텐츠 구매 이력' }
          ]
        },
        {
          id: 4,
          name: '서비스 운영 관리',
          subMenuList: [
            { url: '/cs/popup', menuName: '팝업 관리' },
            { url: '/cs/banner', menuName: '배너 관리' },
            { url: '/cs/search', menuName: '검색 관리' },
            { url: '/cs/cp', menuName: 'CP 관리' },
            { url: '/cs/writer', menuName: '작가 관리' },
            { url: '/cs/posted', menuName: '투고 작품 관리' },
            { url: '/cs/comment', menuName: '댓글 관리' }
          ]
        },
        {
          id: 5,
          name: '통계',
          subMenuList: [
            { url: '/statistics/all', menuName: '통합 통계' },
            { url: '/statistics/sales', menuName: '매출 현황' },
            { url: '/statistics/user', menuName: '회원 현황' },
            { url: '/statistics/point', menuName: '물약 사용 현황' },
            { url: '/statistics/access', menuName: '접속 통계' }
          ]
        },
        {
          id: 6,
          name: '이벤트',
          subMenuList: [
            { url: '/event', menuName: '이벤트' },
            { url: '/event/coupon', menuName: '쿠폰' },
            { url: '/event/ticket', menuName: '이용권' },
            { url: '/event/wait', menuName: '이따무' },
            { url: '/event/reward', menuName: '리워드 설정' },
            { url: '/event/calendar', menuName: '작품 캘린더' }
          ]
        },
        {
          id: 7,
          name: '정산 관리',
          subMenuList: [
            { url: '/calculate/point', menuName: '물약 결제 내역' },
            { url: '/calculate/content', menuName: '콘텐츠별 결제 내역' }
          ]
        },
        {
          id: 8,
          name: '결제 관리',
          subMenuList: [
            { url: '/payment/product', menuName: '결제 상품 관리' },
            { url: '/payment/breakdown', menuName: '결제 내역' },
            { url: '/payment/point', menuName: '물약 소진/지급 내역' }
          ]
        },
        {
          id: 9,
          name: '게시판 관리',
          subMenuList: [
            { url: '/board/notice', menuName: '공지사항' },
            { url: '/board/faq', menuName: 'FAQ' }
          ]
        },
        {
          id: 10,
          name: '퀘스트',
          subMenuList: [
            { url: '/quest/check', menuName: '출석체크' },
            { url: '/quest/random', menuName: '랜덤박스' },
            { url: '/quest/mission', menuName: '일일 미션' },
            { url: '/quest/list', menuName: '퀘스트' }
          ]
        },
        {
          id: 11,
          name: '설정',
          subMenuList: [
            { url: '/setting/info', menuName: '나의 정보' },
            { url: '/setting/admin', menuName: '관리자 계정' },
            { url: '/setting/ban', menuName: '금칙어 관리' },
            { url: '/setting/policy', menuName: '정책 관리' }
          ]
        }
      ]
    }
  },
  computed: {
    breadcrumb () {
      const arr = [
        { label: '홈', url: '/' },
        { label: '설정', url: '#' },
        { label: '관리자 계정', url: '/setting/admin' },
        { label: '관리자 계정 등록', url: this.$route.fullPath }
      ]
      return arr
    }
  },
  watch: {},
  created () {},
  mounted () {},
  methods: {}
}
</script>
