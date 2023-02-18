<template>
  <b-container fluid class="page-min-height py-3">
    <UiPageTitle title="할인 상세" :breadcrumb="breadcrumb">
      <template #buttons>
        <b-button
          variant="outline-primary"
          @click="editDiscount"
        >
          수정
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
          <tbody class="text-center">
            <!-- 정보 -->
            <tr>
              <th>작품명</th>
              <td>
                {{ discountInfo.title ? discountInfo.title : '-' }}
              </td>
              <th>작품 아이디</th>
              <td>
                {{ discountInfo.id ? discountInfo.id : '-' }}
              </td>
              <th>작가명</th>
              <td>
                {{ discountInfo.writer ? discountInfo.writer : '-' }}
              </td>
            </tr>
            <tr>
              <th>유형</th>
              <td>
                {{ discountInfo.isBook ? discountInfo.isBook : '-' }}
              </td>
              <th>구분</th>
              <td>
                {{ discountInfo.menucode ? discountInfo.menucode : '-' }}
              </td>
              <th>상태</th>
              <td>
                {{ discountInfo.status ? discountInfo.status : '-' }}
              </td>
            </tr>
            <tr>
              <th>CP사</th>
              <td>
                {{ discountInfo.cpName ? discountInfo.cpName : '-' }}
              </td>
              <th>장르</th>
              <td>
                {{ discountInfo.genre ? discountInfo.genre : '-' }}
              </td>
              <th>연령등급</th>
              <td>
                {{ discountInfo.rate ? discountInfo.rate : '-' }}
              </td>
            </tr>
            <tr>
              <th>연재일</th>
              <td>
                {{
                  discountInfo.displayStartDate
                    ? discountInfo.displayStartDate
                    : '-'
                }}
              </td>
              <th>가격</th>
              <td>
                {{ discountInfo.price ? `물약 ${discountInfo.price}개` : '-' }}
              </td>
              <th>무료회차수</th>
              <td>
                {{ discountInfo.freeCnt ? `${discountInfo.freeCnt}화` : '-' }}
              </td>
            </tr>
          </tbody>
        </table>
      </b-col>
    </b-row>
    <b-row class="pt-5">
      <b-col align-self="center">
        <h6>할인상세 설정 정보</h6>
      </b-col>
    </b-row>
    <hr class="my-2">
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
              <th>할인 설정</th>

              <td colspan="3">
                <b-form-group>
                  <b-form-radio-group
                    v-model="form.discountType"
                    :options="discountTypeOptions"
                  />
                </b-form-group>
                <div class="mt-2 d-inline-flex w-70 justify-content-start">
                  <div class="d-inline-flex w-auto">
                    <span class="align-self-center mr-2">호박 대여</span>
                    <b-form-input v-model.number="form.pointRental" class="w-30" />
                    <span class="align-self-center ml-2">
                      {{ form.discountType === 'P' ? '%' : '개' }}
                    </span>
                  </div>
                  <div class="d-inline-flex w-auto">
                    <span class="align-self-center mr-2">물약 대여</span>
                    <b-form-input v-model.number="form.priceRental" class="w-30" />
                    <span class="align-self-center ml-2">
                      {{ form.discountType === 'P' ? '%' : '개' }}
                    </span>
                  </div>
                  <div class="d-inline-flex w-auto">
                    <span class="align-self-center mr-2">물약 소장</span>
                    <b-form-input v-model.number="form.price" class="w-30" />
                    <span class="align-self-center ml-2">
                      {{ form.discountType === 'P' ? '%' : '개' }}
                    </span>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <th>할인 금액</th>
              <td colspan="3">
                <p>
                  호박 대여: {{ getPercentage(form.salePointRental, form.pointRental) }}
                </p>
                <p class="my-2">
                  물약 대여: {{ getPercentage(form.salePriceRental, form.priceRental) }}
                </p>
                <p>
                  물약 소장: {{ getPercentage(form.salePrice, form.price) }}
                </p>
              </td>
            </tr>
            <tr>
              <th>기간</th>
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
          </tbody>
        </table>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: 'DiscountDetailPage',
  data () {
    return {
      isLoading: false,
      discountInfo: {},
      //
      form: {},
      editForm: {},
      discountTypeOptions: [
        { text: '개수', value: 'C' },
        { text: '%', value: 'P' }
      ]
    }
  },
  async fetch () {
    await this.getInfo()
    await this.getDetail()
  },
  computed: {
    breadcrumb () {
      const arr = [
        { label: '홈', url: '/' },
        { label: '프로모션 관리', url: '#' },
        { label: '할인 상세', url: this.$route.path }
      ]
      return arr
    }
  },
  watch: {},
  created () {},
  mounted () {},
  methods: {
    getPercentage (total, num) {
      let computed

      if (this.form.discountType === 'P') {
        computed = Number(total - (total * num) / 100)
      } else {
        computed = Number(total - num)
      }

      const isMinus = Math.sign(computed)

      if (isNaN(computed) || isMinus === -1) { return '0개' }
      return `${computed}개`
    },
    setForm () {
      this.editForm = {
        discount_type: this.form.discountType,
        price: this.form.price.toString(),
        price_rental: this.form.priceRental.toString(),
        point_rental: this.form.pointRental.toString(),
        startDate: this.form.startDate,
        endDate: this.form.endDate
      }
    },
    async editDiscount () {
      this.setForm()

      try {
        const res = await this.$axios.put(`/api/manager/free/update/sale/${this.$route.params.id}`, this.editForm)
        if (res.status === 200) {
          alert('수정이 완료 되었습니다.')
          await this.$router.push('/promotion/discount')
        }
      } catch (e) {
        console.log(e)
      }
    },
    async getInfo () {
      this.isLoading = true
      try {
        const {
          status,
          data: { data }
        } = await this.$axios.get(
          `/api/manager/free/detail/top/${this.$route.params.id}`
        )
        if (status === 200) {
          this.discountInfo = data
        }
      } catch (e) {
        console.log(e)
      } finally {
        this.isLoading = false
      }
    },
    async getDetail () {
      try {
        const { status, data: { data } } = await this.$axios.get(
          `/api/manager/free/detail/sale/${this.$route.params.id}`
        )
        if (status === 200) {
          console.log(data)
          this.form = data
          if (data.startDate) {
            this.form.startDate = data.startDate.split('T')[0]
          } else {
            this.form.startDate = ''
          }
          if (data.endDate) {
            this.form.endDate = data.endDate.split('T')[0]
          } else {
            this.form.endDate = ''
          }
        }
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>
