<template>
  <b-container fluid class="page-min-height py-3">
    <UiPageTitle title="결제 상품 등록" :breadcrumb="breadcrumb">
      <template #buttons>
        <!-- <b-button variant="outline-primary" @click="$router.push('/payment/product')">
          취소
        </b-button> -->
        <b-button variant="primary">
          상품 등록
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
              <th>종류</th>
              <td colspan="3">
                {{ type }}
              </td>
            </tr>
            <tr>
              <th>상품 이름</th>
              <td colspan="3">
                <b-form-input
                  v-model="form.name"
                  type="text"
                  placeholder="관리용 구분 이름, 사용자에게는 표시되지 않습니다."
                />
              </td>
            </tr>
            <tr>
              <th>가격</th>
              <td colspan="3">
                <div class="d-inline-flex">
                  <b-form-input v-model="form.price" type="text" class="w-50" />
                  <span class="align-self-center ml-2">원</span>
                </div>
              </td>
            </tr>
            <!--            정액제 일때-->
            <tr v-if="type === '정액제'">
              <th>가격 (물약)</th>
              <td colspan="3">
                <div class="d-inline-flex w-100">
                  <b-form-input v-model="form.price" type="text" class="w-13" />
                  <span class="align-self-center ml-2">개</span>
                  <span class="align-self-end ml-3 text-muted fs-14">*현금 대신 물약으로 결제 할 수 있는 갯수를 입력해
                    주세요.</span>
                </div>
              </td>
            </tr>
            <tr v-if="type === '물약' || type === '자동 충전'">
              <th>충전 물약</th>
              <td colspan="3">
                <div class="d-inline-flex">
                  <b-form-input
                    v-model="form.chargePotion"
                    type="text"
                    class="w-50"
                  />
                  <span class="align-self-center ml-2">개</span>
                </div>
              </td>
            </tr>
            <tr>
              <th>보너스 물약</th>
              <td colspan="3">
                <div class="d-inline-flex">
                  <b-form-input
                    v-model="form.bonusPotion"
                    type="text"
                    class="w-50"
                  />
                  <span class="align-self-center ml-2">개</span>
                </div>
              </td>
            </tr>
            <tr>
              <th>보너스 호박</th>
              <td colspan="3">
                <div class="d-inline-flex">
                  <b-form-input
                    v-model="form.bonusPumpkin"
                    type="text"
                    class="w-50"
                  />
                  <span class="align-self-center ml-2">개</span>
                </div>
              </td>
            </tr>
            <template v-if="type !== '자동 충전'">
              <tr v-if="type === '정액제'">
                <th>이용 기간</th>
                <td colspan="3">
                  <div class="d-inline-flex">
                    <b-form-input
                      v-model="form.use_period"
                      type="text"
                      class="w-50"
                    />
                    <span class="align-self-center ml-2">일</span>
                  </div>
                </td>
              </tr>
              <tr>
                <th>사용 기간</th>
                <td colspan="3">
                  <b-form-group v-slot="{ ariaDescribedby }">
                    <b-form-radio-group
                      v-model="form.period"
                      :options="periodOptions"
                      :aria-describedby="ariaDescribedby"
                    />
                  </b-form-group>
                </td>
              </tr>
              <tr v-if="form.period === 2">
                <th>기간</th>
                <td colspan="3">
                  <div class="d-inline-flex justify-content-between w-70">
                    <div class="w-50 pr-2">
                      <b-form-datepicker
                        id="start-date"
                        v-model="form.startDate"
                        placeholder="선택"
                        :date-format-options="{
                          year: 'numeric',
                          month: 'numeric',
                          day: 'numeric'
                        }"
                      />
                    </div>
                    <span class="align-self-center mr-2">~</span>
                    <div class="w-50 pr-2">
                      <b-form-datepicker
                        id="start-date"
                        v-model="form.endDate"
                        placeholder="선택"
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
                <th>사용 여부</th>
                <td colspan="3">
                  <b-form-group v-slot="{ ariaDescribedby }">
                    <b-form-radio-group
                      v-model="form.useYn"
                      :options="useOptions"
                      :aria-describedby="ariaDescribedby"
                    />
                  </b-form-group>
                </td>
              </tr>
              <tr>
                <th>{{ type === '물약' ? '첫 결제 할인' : '첫 달 무료' }}</th>
                <td colspan="3">
                  <div class="d-inline-flex">
                    <b-form-checkbox
                      v-model="form.checkFirst"
                      class="with-label"
                    >
                      사용
                    </b-form-checkbox>
                  </div>
                </td>
              </tr>
              <tr v-if="type === '물약' && form.checkFirst">
                <th>할인률</th>
                <td colspan="3">
                  <div class="d-inline-flex">
                    <b-form-input
                      v-model="form.writerName"
                      type="text"
                      class="w-50"
                    />
                    <span class="align-self-center ml-2">%</span>
                  </div>
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: 'PaymentProductAddPage',
  data () {
    return {
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
        { label: '결제 상품 관리', url: '/payment/product' },
        { label: '결제 상품 등록', url: this.$route.fullPath }
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
  methods: {}
}
</script>
