<template>
  <b-container fluid class="page-min-height py-3">
    <UiPageTitle title="쿠폰 등록" :breadcrumb="breadcrumb">
      <template #buttons>
        <!-- <b-button variant="outline-primary" to="/event/coupon">
          취소
        </b-button> -->
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
            <tr>
              <th>쿠폰명</th>
              <td colspan="3">
                <b-form-input v-model="form.name" type="text" class="w-40" />
              </td>
            </tr>

            <tr>
              <th>사용 기간</th>
              <td colspan="3">
                <div class="d-inline-flex justify-content-between w-70">
                  <div class="w-50 pr-2">
                    <b-form-datepicker
                      id="start-date"
                      v-model="form.startDate"
                      placeholder="시작일 선택"
                      class="mb-2"
                      :date-format-options="{
                        year: 'numeric',
                        month: 'numeric',
                        day: 'numeric'
                      }"
                    />
                  </div>
                  <div class="w-50 pr-2">
                    <b-form-datepicker
                      id="end-date"
                      v-model="form.endDate"
                      placeholder="종료일 선택"
                      class="mb-2"
                      :date-format-options="{
                        year: 'numeric',
                        month: 'numeric',
                        day: 'numeric'
                      }"
                    />
                  </div>
                </div>
              </td>
            </tr>

            <tr>
              <th>쿠폰 갯수</th>
              <td colspan="3">
                <div class="d-inline-flex">
                  <b-form-input
                    v-model="form.quantity"
                    type="text"
                    class="w-60"
                  />
                  <b-form-checkbox
                    v-model="form.checkNoLimit"
                    class="align-self-center ml-4"
                  >
                    대기
                  </b-form-checkbox>
                </div>
              </td>
            </tr>

            <tr>
              <th>물약 갯수</th>
              <td colspan="3">
                <b-form-input
                  v-model="form.potionQuantity"
                  type="text"
                  class="w-60"
                />
              </td>
            </tr>

            <tr>
              <th>호박 갯수</th>
              <td colspan="3">
                <b-form-input
                  v-model="form.pumpkinQuantity"
                  type="text"
                  class="w-60"
                />
              </td>
            </tr>

            <tr>
              <th>중복 사용</th>
              <td colspan="3">
                <b-form-checkbox v-model="form.checkRepeat" />
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
  name: 'EventCouponAddPage',
  data () {
    return {
      isMounted: false,
      form: {
        name: '',
        startDate: '',
        endDate: '',
        quantity: '',
        checkNoLimit: false,
        potionQuantity: '',
        pumpkinQuantity: '',
        checkRepeat: false
      }
    }
  },
  computed: {
    breadcrumb () {
      const arr = [
        { label: '홈', url: '/' },
        { label: '이벤트', url: '/event/list' },
        { label: '쿠폰 관리', url: '/event/coupon' },
        { label: '쿠폰 등록', url: this.$route.path }
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
