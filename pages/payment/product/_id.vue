<template>
  <b-container fluid class="page-min-height py-3">
    <UiPageTitle title="상품 결제 상세" :breadcrumb="breadcrumb" />
    <hr>
    <b-row class="pt-3" align-h="between">
      <b-col align-self="center">
        <h6 class="font-weight-bold">
          결제 상품 정보
        </h6>
      </b-col>
    </b-row>
    <hr class="my-2">

    <b-row class="d-flex">
      <b-col cols="12">
        <table class="table border mb-0 table-layout-fixed user-detail-info">
          <tbody>
            <tr>
              <th>상품명</th>
              <td colspan="3">
                신규결제_3,900원
              </td>

              <th>결제일</th>
              <td colspan="3">
                2022-06-22 00:00:00
              </td>
            </tr>

            <tr>
              <th>상품 종류</th>
              <td>자동충전</td>

              <th>충전물약</th>
              <td>300</td>

              <th>충전호박</th>
              <td>200</td>

              <th>결제금액</th>
              <td>3900</td>
            </tr>

            <tr>
              <th>자동충전상태</th>
              <td>해지완료</td>

              <th>해지일</th>
              <td colspan="2">
                2022-06-22 00:00:00
              </td>

              <th>충전기준<br>(일/물약)</th>
              <td colspan="2">
                -
              </td>
            </tr>
          </tbody>
        </table>

        <b-row class="pt-5" align-h="between">
          <b-col align-self="center">
            <h6 class="font-weight-bold">
              결제 정보
            </h6>
          </b-col>
        </b-row>
        <hr class="my-2">
        <table class="table border mb-0 table-layout-fixed user-detail-info">
          <tbody>
            <!-- 정보 -->
            <tr>
              <th>결제방법</th>
              <td>간편결제(카카오)</td>

              <th>결제번호</th>
              <td>XXXXXXXX</td>

              <th>결제상태</th>
              <td>
                <span>{{ status }}</span>
                <b-button variant="outline-primary" class="table-inner-btn ml-2" @click="openModal('check-refund-modal')">
                  환불
                </b-button>
              </td>
            </tr>

            <tr>
              <th>결제업체</th>
              <td> - </td>

              <th>승인번호</th>
              <td> - </td>

              <th>승인일시</th>
              <td> - </td>
            </tr>

            <tr>
              <th>실패코드</th>
              <td colspan="2">
                -
              </td>

              <th>실패사유</th>
              <td colspan="2">
                -
              </td>
            </tr>
          </tbody>
        </table>
      </b-col>
    </b-row>

    <UiCenterModal
      modal-id="check-refund-modal"
      modal-title="CP사 정보"
      modal-size="md"
      :ok-title="status === '결제 완료' ? '확인' : '환불'"
      cancel-title="취소"
      :hide-header="true"
      :ok-only="status === '결제 완료' ? true : false"
    >
      <template #contents>
        <div class="text-center py-3">
          <template v-if="status === '결제 완료'">
            <h5>환불이 불가능 합니다.</h5>
            <p class="fs-14 mt-4 text-warning">
              불가 사유: ~
            </p>
          </template>
          <template v-else>
            <h5>해당 결제 내용을 환불 처리 하시겠습니까?</h5>
            <p class="fs-14 mt-4 text-warning">
              *환불 처리 후 취소가 불가능 합니다.
            </p>
          </template>
        </div>
      </template>
    </UiCenterModal>
  </b-container>
</template>

<script>
export default {
  name: 'PaymentProductDetailPage',
  data () {
    return {
      status: '결제 완료',
      form: {
        name: '',
        price: '',
        chargePotion: '',
        bonusPotion: '',
        bonusPumpkin: '',
        period: null,
        startDate: '',
        endDate: '',
        useYn: null,
        checkFirst: false,
        discountPercentage: '',
        //
        use_period: ''
        //
      },
      periodOptions: [
        { text: '무제한', value: 1 },
        { text: '기간 설정', value: 2 }
      ],
      useOptions: [
        { text: '사용', value: 1 },
        { text: '대기', value: 2 }
      ]
    }
  },
  computed: {
    breadcrumb () {
      const arr = [
        { label: '홈', url: '/' },
        { label: '결제 관리', url: '#' },
        { label: '상품 결제 관리', url: '/payment/product' },
        { label: '상품 결제 상세', url: this.$route.fullPath }
      ]
      return arr
    },
    type () {
      if (this.$route.query.type === '0') {
        return '물약'
      } else if (this.$route.query.type === '1') {
        return '정액제'
      }
      return '자동 충전'
    }
  },
  watch: {},
  created () {},
  mounted () {},
  methods: {
    openModal (modalId) {
      this.$root.$emit('bv::show::modal', modalId)
    }
  }
}
</script>
