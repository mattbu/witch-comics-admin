<template>
  <b-container fluid class="page-min-height py-3">
    <UiPageTitle title="상품결제 관리" :breadcrumb="breadcrumb" />
    <hr>
    <!--필터-->
    <b-container fluid class="px-0" tag="form" @submit.prevent="">
      <b-row class="my-3 px-3">
        <b-col lg="12" class="my-1">
          <b-form-group
            label="아이디"
            label-cols-sm="2"
            label-align-sm="left"
            label-size="sm"
            class="mb-0 align-items-center"
          >
            <div class="d-inline-flex w-40">
              <b-form-input v-model="filter.searchKeyword" type="text" />
            </div>
            <b-button
              variant="primary"
              class="ml-2"
              @click="openFindIdModal('find-id-modal')"
            >
              찾기
            </b-button>
          </b-form-group>
        </b-col>

        <b-col lg="12" class="my-1">
          <b-form-group
            label="상품 종류"
            label-cols-sm="2"
            label-align-sm="left"
            label-size="sm"
            class="mb-0"
          >
            <b-form-checkbox-group
              v-model="filter.type"
              :options="paymentOptions"
              class="mt-1"
            />
          </b-form-group>
        </b-col>

        <b-col lg="12" class="my-1">
          <b-form-group
            label="결제 방법"
            label-cols-sm="2"
            label-align-sm="left"
            label-size="sm"
            class="mb-0"
          >
            <b-form-checkbox-group
              v-model="filter.paymentType"
              :options="paySystemOptions"
              class="mt-1"
            />
          </b-form-group>
        </b-col>

        <b-col lg="12" class="my-1">
          <b-form-group
            label="결제일"
            label-cols-sm="2"
            label-align-sm="left"
            label-size="sm"
            class="mb-0"
          >
            <div class="d-inline-flex w-40">
              <b-form-datepicker
                v-model="filter.startDate"
                placeholder="선택"
                label-help=""
                hide-header
                :date-format-options="{
                  year: 'numeric',
                  month: 'numeric',
                  day: 'numeric'
                }"
              />
              <span class="mx-2 align-self-center">~</span>
              <b-form-datepicker
                v-model="filter.endDate"
                placeholder="선택"
                label-help=""
                hide-header
                :date-format-options="{
                  year: 'numeric',
                  month: 'numeric',
                  day: 'numeric'
                }"
              />
            </div>
          </b-form-group>
        </b-col>
      </b-row>
      <hr class="my-2">
      <b-row align-h="center" class="mb-4">
        <b-col cols="2">
          <b-button type="submit" variant="primary" class="w-75">
            검색
          </b-button>
        </b-col>
      </b-row>
    </b-container>
    <!--    리스트-->
    <b-row class="pt-5">
      <b-col align-self="center">
        <h6>결제 내역 ({{ totalRows ? totalRows : '0' }})</h6>
      </b-col>
      <b-col align-self="center" class="text-right">
        <b-form-select
          v-model="filter.sort"
          :options="sortOptions"
          class="w-20"
        />
      </b-col>
    </b-row>
    <hr class="my-2">
    <b-row align-h="end" class="mb-4">
      <b-col cols="auto">
        <b-button variant="primary">
          엑셀 다운로드
        </b-button>
      </b-col>
    </b-row>
    <!-- 테이블 -->
    <b-table
      class="list"
      :items="products"
      :fields="fields"
      stacked="md"
      :busy="isLoading"
      show-empty
      small
    >
      <template #empty>
        <h4 class="mt-4">
          조회 가능한 데이터가 없습니다.
        </h4>
      </template>
      <template #table-busy>
        <div class="text-center text-danger my-4">
          <b-spinner variant="primary" class="align-middle" />
          <span class="ml-3">데이터를 불러오고 있습니다.</span>
        </div>
      </template>
      <template #cell(no)="data">
        {{
          totalRows -
            (filter.pageNum - 1) * filter.pageSize -
            (data.index + 1) +
            1
        }}
      </template>
      <template #cell(type)="data">
        {{ data.value ? data.value : '-' }}
      </template>
      <template #cell(email)="data">
        {{ data.value ? data.value : '-' }}
      </template>
      <template #cell(price)="data">
        {{ data.value ? data.value : '-' }}
      </template>
      <template #cell(charge_potion)="data">
        {{ data.value ? data.value : '-' }}
      </template>
      <template #cell(bonus_potion)="data">
        {{ data.value ? data.value : '-' }}
      </template>
      <template #cell(bonus_pumpkin)="data">
        {{ data.value ? data.value : '-' }}
      </template>
      <template #cell(period)="data">
        {{ data.value ? data.value : '-' }}
      </template>
      <template #cell(yn)="data">
        {{ data.value ? data.value : '-' }}
      </template>
      <template #cell(setting)="data">
        <b-button
          variant="outline-primary"
          :to="`/payment/product/${data.item.id}`"
          class="table-inner-btn"
        >
          상세
        </b-button>
      </template>
      <!-- end -->
    </b-table>
    <UiPagination
      class="py-4"
      :page="filter.pageNum"
      :per-page="filter.pageSize"
      :total-rows="totalRows"
      @change-page="filter.pageNum = $event"
    />

    <!--    아이디 찾기 모달-->
    <SearchIdModal @select-id="selectId" />
  </b-container>
</template>

<script>
export default {
  name: 'PaymentProductListPage',

  data () {
    return {
      // 검색 필터
      filter: {
        searchKeyword: '',
        type: [],
        paymentType: [],
        startDate: '',
        endDate: '',
        sort: 1,
        pageNum: 1,
        pageSize: 5
      },
      // 상품 종류 옵션
      paymentOptions: [
        { text: '일반충전', value: 1 },
        { text: '자동충전', value: 2 }
      ],
      // 결제 방법 옵션
      paySystemOptions: ['간편결제', '카드', '모바일', '상품권', '계좌이체'],
      // 정렬 옵션
      sortOptions: [
        { value: 1, text: '최신순' },
        { value: 2, text: '오래된 순' }
      ],
      // 리스트
      isLoading: false,
      totalRows: 0,
      products: [],
      fields: [
        { key: 'no', label: '번호' },
        { key: 'type', label: '상품종류' },
        { key: 'email', label: '아이디' },
        { key: 'price', label: '결제번호' },
        { key: 'charge_potion', label: '결제상품이름' },
        { key: 'bonus_potion', label: '결제금액' },
        { key: 'bonus_pumpkin', label: '결제방법' },
        { key: 'period', label: '결제상태' },
        { key: 'yn', label: '결제일' },
        { key: 'setting', label: '설정' }
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
        { label: '결제 관리', url: '#' },
        { label: '상품 결제 관리', url: this.$route.path }
      ]
      return arr
    }
  },
  watch: {
    async 'filter.pageNum' () {
      await this.getList()
    }
  },
  created () {},
  mounted () {},
  methods: {
    /** ID 선택 */
    selectId (data) {
      this.filter.searchKeyword = data.email
    },
    openFindIdModal (id) {
      this.$root.$emit('bv::show::modal', id)
    },
    async getList () {
      this.isLoading = true

      try {
        const {
          status,
          data: { data }
        } = await this.$axios.get('/api/manager/product', {
          params: this.filter
        })
        if (status === 200) {
          this.products = data.list
          this.totalRows = data.total
        }
      } catch (e) {
        console.log(e)
      } finally {
        this.isLoading = false
      }
    }
  }
}
</script>
