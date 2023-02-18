<template>
  <b-container fluid class="layout-lnb h-100">
    <b-row v-if="false" class="layout-lnb-close">
      <!-- 닫기 버튼-->
      <b-col md="12" class="py-5 position-relative">
        <b-button
          pill
          variant="primary"
          class="btn-lnb-close"
          :class="{ flip: isClosed }"
          @click="toggleNav"
        >
          <svg
            width="9"
            height="12"
            viewBox="0 0 9 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M2.62268e-07 6L9 0.803849L9 11.1962L2.62268e-07 6Z"
              fill="white"
            />
          </svg>
        </b-button>
      </b-col>
    </b-row>
    <b-row class="pt-3">
      <b-col md="12" class="px-0">
        <div class="layout-lnb-menu">
          <div
            v-for="(menu, index) in menuList"
            :key="index"
            class="layout-lnb-menu-item"
          >
            <b-button
              v-b-toggle="`menu-${menu.id}`"
              variant="transparent"
              class="menu-toggle-btn"
              :class="{ active: !isClosed }"
            >
              <div>
                <b-icon :icon="menu.icon" />
                <span v-if="!isClosed" class="ml-1 text-left menu-title">{{
                  menu.name
                }}</span>
              </div>
              <img
                v-if="!isClosed"
                class="caret-icon menu-title"
                src="@/assets/icons/footer/caret-up.svg"
                alt=""
              >
            </b-button>
            <b-collapse :id="`menu-${menu.id}`">
              <ul class="mb-0">
                <li
                  v-for="(sub, index) in menu.subMenuList"
                  :key="`sub-menu-${index}`"
                >
                  <template v-if="!sub.moreSubMenuList">
                    <NuxtLink
                      :to="sub.url"
                      :class="{
                        'current-link': $route.fullPath.includes(sub.url)
                      }"
                    >
                      {{ sub.menuName }}
                    </NuxtLink>
                  </template>
                  <!--메시지-->
                  <template v-else>
                    <b-button
                      v-b-toggle="'message-sub-menu'"
                      variant="transparent"
                      class="pl-2 sub-menu-toggle"
                    >
                      <span>{{ sub.menuName }}</span>
                      <img
                        class="caret-icon menu-title"
                        src="@/assets/icons/footer/caret-up.svg"
                        alt=""
                      >
                    </b-button>
                    <b-collapse :id="`message-sub-menu`">
                      <ul class="mb-0">
                        <li
                          v-for="(moreSub, moreIdx) in sub.moreSubMenuList"
                          :key="`more-sub-menu-${moreIdx}`"
                        >
                          <NuxtLink
                            :to="moreSub.url"
                            :class="{
                              'current-link': $route.path.includes(moreSub.url)
                            }"
                          >
                            {{ moreSub.menuName }}
                          </NuxtLink>
                        </li>
                      </ul>
                    </b-collapse>
                  </template>
                </li>
              </ul>
            </b-collapse>
          </div>
        </div>
      </b-col>
    </b-row>
    <b-row align-v="end" class="layout-lnb-footer">
      <b-col class="logo">
        <div class="mb-2">
          <b-img src="@/assets/icons/logoA.svg" />
        </div>
        <p class="text-muted fs-12">
          Copyright© 2022 마녀코믹스
        </p>
        <p class="text-muted fs-12">
          All rights reserved.
        </p>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: 'LayoutSideNavigationBar',
  props: {
    isClosed: {
      type: Boolean,
      required: false,
      default: false
    }
  },
  data () {
    return {
      menuList: [
        {
          id: 1,
          icon: 'book',
          name: '콘텐츠 관리',
          subMenuList: [
            { url: '/content/piece', menuName: '작품 관리' },
            { url: '/content/magazine', menuName: '매거진 관리' },
            { url: '/content/writer', menuName: '작가 정보 관리' },
            { url: '/content/publisher', menuName: '출판사 정보 관리' },
            { url: '/content/outerLead', menuName: '외부 연결 관리' },
            { url: '/content/video', menuName: '동영상 관리' }
            // { url: '/content/serial-tab', menuName: '연재 탭' }
          ]
        },
        {
          id: 2,
          icon: 'ui-checks-grid',
          name: '편성모듈 관리',
          subMenuList: [
            {
              url: '/organizeModule/webComic?type=all',
              menuName: '웹툰/만화 홈 관리'
            },
            {
              url: '/organizeModule/comicWeek',
              menuName: '웹툰/만화 요일 관리'
            },
            {
              url: '/organizeModule/comicRank?type=all',
              menuName: '웹툰/만화 랭킹 관리'
            },
            {
              url: '/organizeModule/novelHome?type=all',
              menuName: '소설 홈 관리'
            },
            // { url: '/organizeModule/novel-adult', menuName: '소설19+ 홈 관리' },
            { url: '/organizeModule/novelWeek', menuName: '소설 요일 관리' },
            {
              url: '/organizeModule/novelRank?type=all',
              menuName: '소설 랭킹 관리'
            },
            {
              url: '/organizeModule/comicAdult',
              menuName: '19+ 홈 관리'
            },
            { url: '/organizeModule/magazine', menuName: '매거진 홈 관리' }
            // { url: '/content/piece', menuName: '작품 관리' },
            // { url: '/content/formation', menuName: '편성 모듈' },
            // { url: '/content/serial-tab', menuName: '연재 탭' }
          ]
        },
        {
          id: 3,
          icon: 'list-check',
          name: '프로모션 관리',
          subMenuList: [
            { url: '/promotion/itamu', menuName: '이따무' },
            { url: '/promotion/periodFree', menuName: '기간무료' },
            { url: '/promotion/freeChange', menuName: '무료전환' },
            { url: '/promotion/discount', menuName: '할인' },
            { url: '/promotion/ticket', menuName: '선물함 이용권' },
            { url: '/promotion/coupon', menuName: '쿠폰' },
            { url: '/promotion/join', menuName: '회원가입' },
            { url: '/promotion/login', menuName: '로그인' },
            { url: '/promotion/cashBack', menuName: '캐시백' },
            { url: '/promotion/win', menuName: '프로모션 당첨관리' }
          ]
        },
        {
          id: 4,
          icon: 'gift',
          name: '이벤트 관리',
          subMenuList: [
            { url: '/event/list', menuName: '이벤트' },
            { url: '/event/reply', menuName: '이벤트 댓글관리' }
            // { url: '/event/coupon', menuName: '쿠폰 관리' },
            // { url: '/event/ticket', menuName: '이용권 관리' },
            // { url: '/event/wait', menuName: '이따무' },
            // { url: '/event/reward', menuName: '리워드 지급 내역' },
            // { url: '/event/calendar', menuName: '작품 캘린더' }
          ]
        },
        // {
        //   id: 5,
        //   icon: 'signpost',
        //   name: '팝업/배너 관리',
        //   subMenuList: [
        //     { url: '/cs/popup', menuName: '팝업관리' },
        //     { url: '/cs/search', menuName: '웹툰/만화 배너 관리' },
        //     { url: '/cs/cp', menuName: '소설 배너 관리' },
        //     { url: '/cs/cp', menuName: '매거진 배너 관리' },
        //     { url: '/cs/cp', menuName: '소설 배너 관리' },
        //     { url: '/cs/comment', menuName: '로그인/회원가입 배너 관리' },
        //     // { url: '/cs/banner', menuName: '코믹진' },
        //     { url: '/cs/posted', menuName: '투고 배너 관리' }
        //     // { url: '/cs/banner', menuName: '웹툰' },
        //     // { url: '/cs/writer', menuName: '매거진 홈' },
        //   ]
        // },
        {
          id: 5,
          icon: 'signpost',
          name: '팝업/배너 관리',
          subMenuList: [
            { url: '/popupBanner/popup', menuName: '팝업/배너 관리' },
            {
              url: '/popupBanner/webComicsBanner',
              menuName: '웹툰/만화 배너 관리'
            },
            { url: '/popupBanner/novel', menuName: '소설 배너 관리' },
            { url: '/popupBanner/magazine', menuName: '매거진 배너 관리' },
            { url: '/popupBanner/join', menuName: '로그인/회원가입 관리' },
            { url: '/popupBanner/posted', menuName: '투고 배너 관리' }
          ]
        },
        {
          id: 6,
          icon: 'person',
          name: '회원 관리',
          subMenuList: [
            { url: '/user/list', menuName: '회원관리' },
            { url: '/user/flatRate', menuName: '정액제 회원관리' },
            { url: '/user/group', menuName: '회원등급별 관리' }
            // { url: '/user/point', menuName: '포인트 관리' },
            // {
            //   url: '/user/message',
            //   menuName: '메시지',
            //   moreSubMenuList: [
            //     { url: '/user/message/send', menuName: '메시지 전송' },
            //     { url: '/user/message/list', menuName: '메시지 내역' }
            //   ]
            // }
          ]
        },
        {
          id: 7,
          icon: 'bar-chart-line',
          name: '서비스 운영 관리',
          subMenuList: [
            { url: '/cs/notice', menuName: '공지사항 관리' },
            { url: '/cs/faq', menuName: '도움말/FAQ 관리' },
            { url: '/cs/questions', menuName: '1:1 문의사항 관리' },
            { url: '/cs/policy', menuName: '정책 관리' },
            { url: '/cs/comment', menuName: '댓글/답글 관리' },
            { url: '/cs/ban', menuName: '금칙어 관리' },
            { url: '/cs/message', menuName: '메시지 알람 관리' },
            { url: '/cs/kakaoAram', menuName: '카카오톡 알람 관리' },
            { url: '/cs/search', menuName: '검색어 관리' }
            // { url: '/cs/popup', menuName: '팝업 관리' },
            // { url: '/cs/popup', menuName: '회원관리' },
            // { url: '/cs/banner', menuName: '배너 관리' },
            // { url: '/cs/search', menuName: '검색 관리' },
            // { url: '/cs/writer', menuName: '작가 관리' },
            // { url: '/cs/posted', menuName: '투고 작품 관리' },
          ]
        },
        {
          id: 8,
          icon: 'credit-card',
          name: '결제 관리',
          subMenuList: [
            { url: '/payment/product', menuName: '상품결제 관리' },
            { url: '/payment/potion', menuName: '물약소진/지급 관리' },
            { url: '/payment/pumpkin', menuName: '호박소진/지급 관리' },
            { url: '/payment/givePotion', menuName: '물약/호박지급 관리' },
            { url: '/payment/fixedCharge', menuName: '정액제결제/취소 관리' },
            { url: '/payment/givePumpkin', menuName: '환불관리' }
            //
            // { url: '/payment/product', menuName: '결제 상품 관리' },
            // { url: '/payment/breakdown', menuName: '결제 내역' },
            // { url: '/payment/point', menuName: '물약 소진/지급 내역' }
          ]
        },
        {
          id: 9,
          icon: 'box',
          name: '상품 관리',
          subMenuList: [
            // { url: '/product/generalCharge ', menuName: '일반 충전' },
            { url: '/product/general', menuName: '일반 충전 상품 관리' },
            { url: '/product/autoCharge', menuName: '자동 충전 상품 관리' },
            { url: '/product/flatRate', menuName: '정액제 상품 관리' }
          ]
        },
        {
          id: 10,
          icon: 'card-checklist',
          name: '퀘스트 관리',
          subMenuList: [
            { url: '/quest/check', menuName: '출석체크' },
            { url: '/quest/random', menuName: '랜덤박스' },
            { url: '/quest/mission', menuName: '일일 미션' }
            // { url: '/quest/list', menuName: '퀘스트' }
          ]
        },
        {
          id: 11,
          icon: 'file-bar-graph',
          name: '정산 관리',
          subMenuList: [
            { url: '/calculate/sale', menuName: '매출 내역 관리' },
            { url: '/calculate/cp-calculate', menuName: 'CP사 정산 관리' },
            { url: '/calculate/cp-list', menuName: 'CP사 관리' }
            //
            // { url: '/calculate/point', menuName: '물약 결제 내역' },
            // { url: '/calculate/content', menuName: '콘텐츠별 결제 내역' }
          ]
        },
        {
          id: 12,
          icon: 'stickies',
          name: '투고 관리',
          subMenuList: [
            { url: '/submit/submit', menuName: '투고 관리' },
            { url: '/submit/review', menuName: '검토 관리' }

            // { url: '/statistisubmit/all', menuName: '통합 통계' },
            // { url: '/statistics/sales', menuName: '매출 현황' },
            // { url: '/statistics/user', menuName: '회원 현황' },
            // { url: '/statistics/point', menuName: '물약 사용 현황' },
            // { url: '/statistics/access', menuName: '접속 통계' }
          ]
        },
        {
          id: 13,
          icon: 'pie-chart',
          name: '통계',
          subMenuList: [
            { url: '/statistics/all', menuName: '통합 통계' },
            { url: '/statistics/user', menuName: '회원 통계' },
            { url: '/statistics/user', menuName: '작품별 통계' },
            { url: '/statistics/user', menuName: '회차별 통계' },
            { url: '/statistics/sales', menuName: '매출 통계' },
            { url: '/statistics/sales', menuName: '정액제 구독자 통계' },
            { url: '/statistics/sales', menuName: '프로모션 통계' },
            { url: '/statistics/sales', menuName: '이벤트 통계' },
            { url: '/statistics/sales', menuName: '배너/팝업 통계' },
            { url: '/statistics/sales', menuName: '편성모듈 통계' },
            { url: '/statistics/sales', menuName: '유입별 통계' },
            { url: '/statistics/sales', menuName: '퀘스트 통계' },
            { url: '/statistics/sales', menuName: '이벤트 통계' }
            // { url: '/statistics/user', menuName: '회원 현황' },
            // { url: '/statistics/point', menuName: '물약 사용 현황' },
            // { url: '/statistics/access', menuName: '접속 통계' },
            // { url: '/statistics/all', menuName: '통합 통계' },
            // { url: '/statistics/sales', menuName: '매출 현황' },
            // { url: '/statistics/user', menuName: '회원 현황' },
            // { url: '/statistics/point', menuName: '물약 사용 현황' },
            // { url: '/statistics/access', menuName: '접속 통계' }
          ]
        },
        {
          id: 14,
          icon: 'nut',
          name: '관리자 관리',
          subMenuList: [
            { url: '/manager/inner-admin', menuName: '내부 관리자 관리' },
            { url: '/manager/master-account', menuName: '마스터 계정 관리' },
            { url: '/manager/power-group', menuName: '권한 그룹 관리' }
          ]
        }
        // 끝
        // {
        //   id: 5,
        //   icon: 'signpost',
        //   name: '팝업/배너 관리',
        //   subMenuList: [
        //     { url: '/cs/popup', menuName: '팝업/배너 관리' },
        //     { url: '/cs/banner', menuName: '팝업' },
        //     { url: '/cs/search', menuName: '웹툰/만화 홈' },
        //     { url: '/cs/cp', menuName: '소설 홈' },
        //     { url: '/cs/writer', menuName: '매거진 홈' },
        //     { url: '/cs/comment', menuName: '로그인/회원가입' },
        //     { url: '/cs/posted', menuName: '투고' }
        //   ]
        // },
        // {
        //   id: 11,
        //   icon: 'clipboard',
        //   name: '게시판 관리',
        //   subMenuList: [
        //     { url: '/board/notice', menuName: '공지사항' },
        //     { url: '/board/faq', menuName: 'FAQ' }
        //   ]
        // },
        // {
        //   id: 13,
        //   icon: 'gear',
        //   name: '설정',
        //   subMenuList: [
        //     { url: '/setting/info', menuName: '나의 정보' },
        //     { url: '/setting/admin', menuName: '관리자 계정' },
        //     { url: '/setting/policy', menuName: '정책 관리' }
        //   ]
        // }
      ]
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    toggleNav () {
      this.$nuxt.$emit('lnb-close', !this.isClosed)
    }
  }
}
</script>

<style scoped lang="scss">
.sub-menu-toggle {
  &.btn {
    transition: all 300ms;
    span {
      color: var(--dark);
      opacity: 0.8;
    }
    &:hover {
      span {
        color: var(--primary) !important;
      }
    }
  }
}
</style>
