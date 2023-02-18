<template>
  <b-container fluid class="page-min-height py-3">
    <UiPageTitle title="상품 그룹 수정" :breadcrumb="breadcrumb">
      <template #buttons>
        <b-button variant="primary">
          수정
        </b-button>
      </template>
    </UiPageTitle>
    <hr>
    <b-row class="mt-4">
      <b-col cols="12">
        <h6>상품 그룹 설정</h6>
        <hr class="mt-2">
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
              <th>그룹 타이틀</th>
              <td colspan="3">
                <div class="d-inline-flex">
                  <b-form-input v-model="form.title" />
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
    <b-row class="pt-5" align-h="between">
      <b-col align-self="center">
        <h6>상품 설정</h6>
      </b-col>
    </b-row>
    <hr class="my-2">
    <b-row align-h="end" class="mb-2" />
    <!-- 테이블 -->
    <b-table
      class="list"
      :items="productList"
      :fields="fields"
      stacked="md"
      :busy="isLoading"
      show-empty
      small
    >
      <template #table-busy>
        <div class="text-center text-danger my-4">
          <b-spinner variant="primary" class="align-middle" />
          <span class="ml-3">데이터를 불러오고 있습니다.</span>
        </div>
      </template>
      <template #empty>
        <PageNoResult description="상품을 설정해 주세요." />
      </template>
      <template #table-colgroup="scope">
        <col
          v-for="field in scope.fields"
          :key="field.key"
          :style="{ width: field.key === 'name' ? '180px' : '60px' }"
        >
      </template>
      <template #cell(no)="data">
        {{ data.index }}
      </template>
      <template #cell(name)="data">
        <template v-if="data.index === 0">
          <b-form-input v-model="productList[0].name" />
        </template>
        <template v-else>
          {{ productList[data.index].name ? productList[data.index].name : '-' }}
        </template>
      </template>
      <template #cell(price)="data">
        <template v-if="data.index === 0">
          <b-form-input v-model.number="productList[0].price" />
        </template>
        <template v-else>
          {{ productList[data.index].price ? `${paintMoneyComma(productList[data.index].price)}원` : '0원' }}
        </template>
      </template>
      <template #cell(discountRate)="data">
        <template v-if="data.index === 0">
          <b-form-input v-model.number="productList[0].discountRate" />
        </template>
        <template v-else>
          {{ productList[data.index].discountRate ? `${productList[data.index].discountRate}%` : '0%' }}
        </template>
      </template>
      <template #cell(showPrice)="data">
        <template v-if="data.index === 0">
          <b-form-input v-model.number="productList[0].showPrice" />
        </template>
        <template v-else>
          {{ productList[data.index].showPrice ? `${paintMoneyComma(productList[data.index].showPrice)}원` : '0원' }}
        </template>
      </template>
      <template #cell(coin)="data">
        <template v-if="data.index === 0">
          <b-form-input v-model.number="productList[0].coin" />
        </template>
        <template v-else>
          {{ productList[data.index].coin ? productList[data.index].coin : '0' }}
        </template>
      </template>
      <template #cell(bonusCoin)="data">
        <template v-if="data.index === 0">
          <b-form-input v-model.number="productList[0].bonusCoin" />
        </template>
        <template v-else>
          {{ productList[data.index].bonusCoin ? productList[data.index].bonusCoin : '0' }}
        </template>
      </template>
      <template #cell(bonusPoint)="data">
        <template v-if="data.index === 0">
          <b-form-input v-model.number="productList[0].bonusPoint" />
        </template>
        <template v-else>
          {{ productList[data.index].bonusPoint ? productList[data.index].bonusPoint : '0' }}
        </template>
      </template>
      <template #cell(setting)="data">
        <b-button v-if="data.index === 0" variant="outline-secondary" class="table-inner-btn" @click="addRow">
          추가
        </b-button>
        <b-button v-else variant="outline-secondary" class="table-inner-btn" @click="removeRow(data.index)">
          삭제
        </b-button>
      </template>
    </b-table>
  </b-container>
</template>
<script>
import { timeOptions, commonFuctions } from '@/plugins/mixins'

export default {
  name: 'PromotionAddPage',
  mixins: [timeOptions, commonFuctions],
  data () {
    return {
      form: {
        title: '',
        isShow: 'y'
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
      secondsOptions: [],
      isLoading: false,
      productList: [{
        name: '',
        price: 0,
        coin: 0,
        showPrice: 0,
        discountRate: 0,
        bonusCoin: 0,
        bonusPoint: 0,
        isShow: 'y'
      }],
      fields: [
        { key: 'no', label: '번호' },
        { key: 'name', label: '상품이름' },
        { key: 'price', label: '상품가격' },
        { key: 'discountRate', label: '할인율' },
        { key: 'showPrice', label: '판매금액' },
        { key: 'coin', label: '충전물약' },
        { key: 'bonusCoin', label: '보너스 물약' },
        { key: 'bonusPoint', label: '보너스 호박' },
        { key: 'setting', label: '관리' }
      ]
    }
  },
  async fetch () {
    await this.getList()
  },
  computed: {
    breadcrumb () {
      const arr = [
        { label: '홈', url: '/' },
        { label: '상품 관리', url: '#' },
        { label: '상품 그룹 수정', url: this.$route.path }
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
    async getList () {
      this.isLoading = true

      try {
        const { status, data: { data } } = await this.$axios.get(`/api/manager/product/${this.$route.params.id}`)

        if (status === 200) {
          this.form.title = data.title
          this.productList.push(...data.productlists)
        }
      } catch (e) {
        console.log(e)
      } finally {
        this.isLoading = false
      }
    },
    addRow () {
      this.productList.push({
        name: this.productList[0].name,
        price: this.productList[0].price,
        coin: this.productList[0].coin,
        showPrice: this.productList[0].showPrice,
        discountRate: this.productList[0].discountRate,
        bonusCoin: this.productList[0].bonusCoin,
        bonusPoint: this.productList[0].bonusPoint,
        isShow: this.form.isShow
      })
      this.productList[0].name = ''
      this.productList[0].price = 0
      this.productList[0].coin = 0
      this.productList[0].showPrice = 0
      this.productList[0].discountRate = 0
      this.productList[0].bonusCoin = 0
      this.productList[0].bonusPoint = 0
    },
    removeRow (idx) {
      this.productList = this.productList.filter((row, rowIdx) => rowIdx !== idx)
    }
  }
}
</script>
