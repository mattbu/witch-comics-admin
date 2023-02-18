<template>
  <b-container fluid class="page-min-height py-3">
    <UiPageTitle title="쿠폰 등록" :breadcrumb="breadcrumb">
      <template #buttons>
        <b-button variant="primary" @click="addCoupon">
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
              <th>쿠폰명</th>
              <td colspan="3">
                <b-form-input
                  v-model="form.name"
                  class="w-30"
                  placeholder="쿠폰명 입력"
                />
              </td>
            </tr>
            <tr>
              <th>쿠폰기간</th>
              <td colspan="3">
                <div class="d-inline-flex w-50">
                  <b-form-datepicker
                    v-model="form.startDate"
                    placeholder="선택"
                    hide-header
                    label-help=""
                    :date-format-options="{
                      year: 'numeric',
                      month: 'numeric',
                      day: 'numeric'
                    }"
                  />
                  <span class="ml-2 align-self-center">~</span>
                  <b-form-datepicker
                    v-model="form.endDate"
                    placeholder="선택"
                    hide-header
                    label-help=""
                    :date-format-options="{
                      year: 'numeric',
                      month: 'numeric',
                      day: 'numeric'
                    }"
                    class="ml-2"
                  />
                </div>
              </td>
            </tr>
            <tr>
              <th>쿠폰 개수</th>
              <td colspan="3">
                <div class="d-inline-flex w-30">
                  <b-form-input
                    v-model="form.issuCnt"
                    placeholder="쿠폰 개수 입력"
                  />
                </div>
              </td>
            </tr>
            <tr>
              <th>물약 개수</th>
              <td colspan="3">
                <div class="d-inline-flex w-30">
                  <b-form-input
                    v-model="form.coin"
                    placeholder="물약 개수 입력"
                  />
                </div>
              </td>
            </tr>
            <tr>
              <th>호박 개수</th>
              <td colspan="3">
                <div class="d-inline-flex w-30">
                  <b-form-input
                    v-model="form.point"
                    placeholder="호박 개수 입력"
                  />
                </div>
              </td>
            </tr>
            <tr>
              <th>중복 사용</th>
              <td colspan="3">
                <b-form-checkbox
                  v-model="form.isUniq"
                  value="y"
                  unchecked-value="n"
                />
              </td>
            </tr>
            <tr>
              <th>포인트 만료일</th>
              <td colspan="3">
                <b-form-group>
                  <b-form-radio-group
                    v-model="form.expTimeOpt"
                    :options="expireOptions"
                  />
                </b-form-group>
                <div class="d-inline-flex w-15 mt-2">
                  <b-form-input
                    v-model.number="form.expTime"
                    placeholder="만료일 입력"
                    :disabled="form.expTimeOpt === 2"
                  />
                  <span class="ml-2 align-self-center">일</span>
                </div>
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
  name: 'PromotionCouponAddPage',
  data () {
    return {
      form: {
        name: '', // 쿠폰명
        startDate: '', // 쿠폰기간
        endDate: '', // 쿠폰기간
        issuCnt: '', // 쿠폰 개수
        coin: '', // 물약 개수
        point: '', // 호박 개수
        isUniq: 'n', // 중복 사용
        expTimeOpt: 1, // 포인트 만료일 설정
        expTime: '' // 포인트 만료일
      },
      expireOptions: [
        { text: '기간 설정', value: 1 },
        { text: '영구', value: 2 }
      ]
    }
  },
  computed: {
    breadcrumb () {
      const arr = [
        { label: '홈', url: '/' },
        { label: '프로모션 관리', url: '#' },
        { label: '쿠폰 등록', url: this.$route.path }
      ]
      return arr
    }
  },
  watch: {
    'form.expTimeOpt' (val) {
      if (val) {
        this.form.expTime = 0
      } else {
        this.form.expTime = ''
      }
    }
  },
  created () {},
  mounted () {},
  methods: {
    /** 쿠폰 등록 */
    async addCoupon () {
      try {
        delete this.form.expTimeOpt

        const { status } = await this.$axios.post(
          '/api/manager/coupon/regist',
          this.form
        )

        if (status === 200) {
          alert('쿠폰 등록이 완료 되었습니다.')
          await this.$router.push('/promotion/coupon')
        }
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>
