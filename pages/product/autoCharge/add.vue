<template>
  <b-container fluid class="page-min-height py-3">
    <UiPageTitle title="자동충전 상품 등록" :breadcrumb="breadcrumb">
      <template #buttons>
        <b-button variant="primary" @click="addAutoChargeProduct">
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
              <th>상품 이름</th>
              <td colspan="3">
                <div class="d-inline-flex">
                  <b-form-input v-model="form.name" />
                </div>
              </td>
            </tr>
            <tr>
              <th>상품가격*</th>
              <td colspan="3">
                <div class="d-inline-flex">
                  <b-form-input v-model.number="form.price" />
                  <span class="ml-2 align-self-center">원</span>
                </div>
              </td>
            </tr>
            <tr>
              <th>할인율</th>
              <td colspan="3">
                <div class="d-inline-flex">
                  <b-form-input v-model.number="form.discountRate" />
                  <span class="ml-2 align-self-center">%</span>
                </div>
              </td>
            </tr>
            <tr>
              <th>판매금액</th>
              <td colspan="3">
                <div class="d-inline-flex">
                  <b-form-input v-model.number="form.showPrice" />
                  <span class="ml-2 align-self-center">원</span>
                </div>
              </td>
            </tr>
            <tr>
              <th>충전 물약*</th>
              <td colspan="3">
                <div class="d-inline-flex">
                  <b-form-input v-model.number="form.coin" />
                  <span class="m-2">개</span>
                </div>
              </td>
            </tr>
            <tr>
              <th>보너스 물약</th>
              <td colspan="3">
                <div class="d-inline-flex">
                  <b-form-input v-model.number="form.bonusCoin" />
                  <span class="m-2">개</span>
                </div>
              </td>
            </tr>
            <tr>
              <th>보너스 호박</th>
              <td colspan="3">
                <div class="d-inline-flex">
                  <b-form-input v-model.number="form.bonusPoint" />
                  <span class="m-2">개</span>
                </div>
              </td>
            </tr>

            <tr>
              <th>노출 여부</th>
              <td colspan="3">
                <b-form-radio-group
                  v-model="form.isShow"
                  :options="isShowOptions"
                  class="mt-1"
                />
              </td>
            </tr>

            <th>시작일</th>
            <td colspan="3">
              <div class="d-inline-flex justify-content-between w-70">
                <div class="w-50 pr-2">
                  <label for="start-date" class="fs-14 mb-1">날짜*</label>
                  <b-form-datepicker
                    id="start-date"
                    v-model="start.dt"
                    label-help=""
                    hide-header
                    placeholder="시작일 선택"
                    class="mb-2"
                    :date-format-options="{
                      year: 'numeric',
                      month: 'numeric',
                      day: 'numeric'
                    }"
                  />
                </div>
                <div class="w-25 pr-2">
                  <label for="start-hours" class="fs-14 mb-1">시간</label>
                  <b-form-select
                    id="start-hours"
                    v-model="start.hrs"
                    :options="hoursOptions"
                  />
                </div>
                <div class="w-25 pr-2">
                  <label for="start-minutes" class="fs-14 mb-1">분</label>
                  <b-form-select
                    id="start-minutes"
                    v-model="start.min"
                    :options="minutesOptions"
                  />
                </div>
                <div class="w-25 pr-2">
                  <label for="start-seconds" class="fs-14 mb-1">초</label>
                  <b-form-select
                    id="start-seconds"
                    v-model="start.sec"
                    :options="secondsOptions"
                  />
                </div>
              </div>
            </td>
            <tr>
              <th>종료일</th>
              <td colspan="3">
                <div class="d-inline-flex justify-content-between w-70">
                  <b-checkbox v-model="setEnd" class="mt-4 w-15">
                    설정
                  </b-checkbox>
                  <div class="w-50 pr-2 ml-2">
                    <label for="end-date" class="fs-14 mb-1">날짜*</label>
                    <b-form-datepicker
                      id="end-date"
                      v-model="end.dt"
                      label-help=""
                      hide-header
                      placeholder="종료일 선택"
                      class="mb-2"
                      :date-format-options="{
                        year: 'numeric',
                        month: 'numeric',
                        day: 'numeric'
                      }"
                      :disabled="!setEnd"
                    />
                  </div>
                  <div class="w-25 pr-2">
                    <label for="end-hours" class="fs-14 mb-1">시간</label>
                    <b-form-select
                      id="end-hours"
                      v-model="end.hrs"
                      :options="hoursOptions"
                      :disabled="!setEnd"
                    />
                  </div>
                  <div class="w-25 pr-2">
                    <label for="end-minutes" class="fs-14 mb-1">분</label>
                    <b-form-select
                      id="end-minutes"
                      v-model="end.min"
                      :options="minutesOptions"
                      :disabled="!setEnd"
                    />
                  </div>
                  <div class="w-25 pr-2">
                    <label for="end-seconds" class="fs-14 mb-1">초</label>
                    <b-form-select
                      id="end-seconds"
                      v-model="end.sec"
                      :options="secondsOptions"
                      :disabled="!setEnd"
                    />
                  </div>
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
import { timeOptions } from '@/plugins/mixins'

export default {
  name: 'AutoChargeProductAddPage',
  mixins: [timeOptions],
  data () {
    return {
      form: {
        name: '',
        price: '',
        discountRate: '',
        showPrice: '',
        coin: '',
        bonusCoin: '',
        bonusPoint: '',
        isShow: 'y',
        startDate: '',
        endDate: ''
      },
      // 노출여부 옵션
      isShowOptions: [
        { value: 'y', text: '노출' },
        { value: 'n', text: '미노출' }
      ],
      setEnd: false,
      // 시간
      start: { dt: '', hrs: '00', min: '00', sec: '00' },
      end: { dt: '', hrs: '00', min: '00', sec: '00' },
      // 시간 옵션
      hoursOptions: [],
      minutesOptions: [],
      secondsOptions: []
    }
  },
  computed: {
    breadcrumb () {
      const arr = [
        { label: '홈', url: '/' },
        { label: '상품 관리', url: '#' },
        { label: '자동 충전 상품 등록', url: this.$route.path }
      ]
      return arr
    }
  },
  watch: {},
  created () {},
  mounted () {
    this.hoursOptions = this.getHours()
    this.minutesOptions = this.getMinutes()
    this.secondsOptions = this.getSeconds()
  },
  methods: {
    setForm () {
      if (this.start.dt) {
        this.form.startDate = `${this.start.dt} ${this.start.hrs}:${this.start.min}:${this.start.sec}`
      } else {
        this.form.startDate = ''
      }

      if (this.end.dt) {
        this.form.endDate = `${this.end.dt} ${this.end.hrs}:${this.end.min}:${this.end.sec}`
      } else {
        this.form.endDate = ''
      }
    },
    async addAutoChargeProduct () {
      await this.setForm()

      try {
        const res = await this.$axios.post('/api/manager/product/auto/product', this.form)
        console.log(res)
        if (res.status === 200) {
          alert('등록이 완료 되었습니다.')
          await this.$router.push('/product/autoCharge')
        }
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>
