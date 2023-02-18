<template>
  <b-container fluid class="page-min-height py-3">
    <UiPageTitle title="할인 등록" :breadcrumb="breadcrumb">
      <template #buttons>
        <b-button variant="primary" @click="addDiscount">
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
              <th>할인 설정</th>
              <td colspan="3">
                <b-form-group>
                  <b-form-radio-group
                    v-model="form.discount_type"
                    :options="discountSetOptions"
                  />
                </b-form-group>
                <div class="mt-2 d-inline-flex w-70 justify-content-start">
                  <div class="d-inline-flex w-auto">
                    <span class="align-self-center mr-2">호박 대여</span>
                    <b-form-input v-model.number="form.point_rental" class="w-30" />
                    <span class="align-self-center ml-2">
                      {{ form.discount_type === 'P' ? '%' : '개' }}
                    </span>
                  </div>
                  <div class="d-inline-flex w-auto">
                    <span class="align-self-center mr-2">물약 대여</span>
                    <b-form-input v-model.number="form.price_rental" class="w-30" />
                    <span class="align-self-center ml-2">
                      {{ form.discount_type === 'P' ? '%' : '개' }}
                    </span>
                  </div>
                  <div class="d-inline-flex w-auto">
                    <span class="align-self-center mr-2">물약 소장</span>
                    <b-form-input v-model.number="form.price" class="w-30" />
                    <span class="align-self-center ml-2">
                      {{ form.discount_type === 'P' ? '%' : '개' }}
                    </span>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <th>작품검색</th>
              <td colspan="3">
                <b-button
                  variant="outline-secondary"
                  class="table-inner-btn"
                  @click="openModal('search-works-modal')"
                >
                  추가
                </b-button>
              </td>
            </tr>
            <tr>
              <th>할인 작품</th>
              <td colspan="3">
                <template v-if="form.piece.length > 0">
                  <b-container fluid class="px-0">
                    <b-row>
                      <b-col
                        v-for="(work, idx) in form.piece"
                        :key="`work-${idx}`"
                        cols="4"
                        :class="(idx === 0 || idx === 1 || idx === 2) ? 'mt-0' : 'mt-4'"
                      >
                        <div>
                          <div class="d-inline-flex w-75 justify-content-between">
                            <span class="font-weight-600 text-primary">
                              {{ `(${work.id}) ${work.name}` }}
                            </span>
                            <b-button variant="transparent" class="p-0 table-inner-btn text-warning" @click="removePiece(work.id, idx)">
                              <u>제거하기</u>
                            </b-button>
                          </div>
                          <div class="mt-2">
                            <p>
                              호박 대여: {{ work.pointRental ? work.pointRental : '0' }}
                              <span>{{ `(${work.discountPointRental ? work.discountPointRental : '0'})` }}</span>
                            </p>
                            <p>
                              물약 대여: {{ work.priceRental ? work.priceRental : '0' }}
                              <span>{{ `(${work.discountPriceRental ? work.discountPriceRental : '0'})` }}</span>
                            </p>
                            <p>
                              물약 소장: {{ work.price ? work.price : '0' }}
                              <span>{{ `(${work.discountPrice ? work.discountPrice : '0'})` }}</span>
                            </p>
                          </div>
                        </div>
                      </b-col>
                    </b-row>
                  </b-container>
                </template>
                <template v-else>
                  <span class="fs-14 text-muted">작품을 먼저 선택해 주세요.</span>
                </template>
              </td>
            </tr>
            <tr>
              <th>기간</th>
              <td colspan="3">
                <div class="d-inline-flex w-50">
                  <b-form-datepicker
                    v-model="form.start_date"
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
                    v-model="form.end_date"
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
    <!-- 작품 검색(search-piece-modal) -->
    <SearchWorksModalForDiscount
      @select-work="selectPiece"
    />
  </b-container>
</template>
<script>
export default {
  name: 'DiscountAddPage',
  data () {
    return {
      form: {
        cartoon_main_id: [],
        discount_type: 'C',
        point_rental: '',
        price_rental: '',
        price: '',
        start_date: '',
        end_date: '',
        piece: []
      },
      currentWorkTitle: '',
      isLoading: false,
      discountSetOptions: [
        { text: '개수', value: 'C' },
        { text: '%', value: 'P' }
      ]
    }
  },
  computed: {
    breadcrumb () {
      const arr = [
        { label: '홈', url: '/' },
        { label: '프로모션 관리', url: '#' },
        { label: '할인 등록', url: this.$route.path }
      ]
      return arr
    }
  },
  watch: {
    'form.price' (val) {
      if (typeof val === 'number' && val && this.form.discount_type === 'P') {
        this.form.piece = this.form.piece.map((item) => {
          return {
            ...item,
            discountPrice: item.price - this.getPercentVal(val, item.price)
          }
        })
      } else if (typeof val === 'number' && val && this.form.discount_type === 'C') {
        this.form.piece = this.form.piece.map((item) => {
          return {
            ...item,
            discountPrice: this.form.price
          }
        })
      } else {
        this.form.piece = this.form.piece.map((item) => {
          return {
            ...item,
            discountPrice: 0
          }
        })
      }
    },
    'form.pointRental' (val) {
      if (typeof val === 'number' && val && this.form.discount_type === 'P') {
        this.form.piece = this.form.piece.map((item) => {
          return {
            ...item,
            discountPointRental: item.pointRental - this.getPercentVal(val, item.pointRental)
          }
        })
      } else if (typeof val === 'number' && val && this.form.discount_type === 'C') {
        this.form.piece = this.form.piece.map((item) => {
          return {
            ...item,
            discountPointRental: this.form.point_rental
          }
        })
      } else {
        this.form.piece = this.form.piece.map((item) => {
          return {
            ...item,
            discountPointRental: 0
          }
        })
      }
    },
    'form.priceRental' (val) {
      if (typeof val === 'number' && val && this.form.discount_type === 'P') {
        this.form.piece = this.form.piece.map((item) => {
          return {
            ...item,
            discountPriceRental: item.priceRental - this.getPercentVal(val, item.priceRental)
          }
        })
      } else if (typeof val === 'number' && val && this.form.discount_type === 'C') {
        this.form.piece = this.form.piece.map((item) => {
          return {
            ...item,
            discountPriceRental: this.form.price_rental
          }
        })
      } else {
        this.form.piece = this.form.piece.map((item) => {
          return {
            ...item,
            discountPriceRental: 0
          }
        })
      }
    }
  },
  created () {},
  mounted () {},
  methods: {
    getPercentVal (par, total) {
      if (par && total) {
        return (total * par) / 100
      }
    },
    selectPiece (data) {
      this.form.piece = data
      this.form.cartoon_main_id = data.map(el => el.id)
    },
    removePiece (id, idx) {
      this.form.piece = this.form.piece.filter(piece => piece.id !== id)
      this.form.cartoon_main_id = this.form.cartoon_main_id.filter((piece, pIdx) => pIdx !== idx)
    },
    // 등록
    async addDiscount () {
      delete this.form.piece

      try {
        const { status } = await this.$axios.post(
          '/api/manager/free/regist/sale',
          this.form
        )

        if (status === 200) {
          alert('등록이 완료 되었습니다.')
          await this.$router.push('/promotion/discount')
        }
      } catch (e) {
        console.log(e)
      }
    },
    openModal (id) {
      this.$root.$emit('bv::show::modal', id)
    }
  }
}
</script>
