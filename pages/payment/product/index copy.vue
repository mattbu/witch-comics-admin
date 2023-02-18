<template>
  <b-container fluid class="page-min-height py-3">
    <UiPageTitle title="상품 결제 내역" :breadcrumb="breadcrumb" />
    <hr>
    <!--필터-->
    <b-row class="mt-3 px-3">
      <b-col lg="12" class="my-1">
        <b-form-group
          v-slot="{ ariaDescribedby }"
          label="아이디"
          label-cols-sm="2"
          label-align-sm="left"
          label-size="sm"
          class="mb-0"
        >
          <b-form-input :aria-describedby="ariaDescribedby" class="w-19" />
        </b-form-group>
      </b-col>

      <b-col lg="12" class="my-1">
        <b-form-group
          v-slot="{ ariaDescribedby }"
          label="상품 종류"
          label-cols-sm="2"
          label-align-sm="left"
          label-size="sm"
          class="mb-0"
        >
          <b-form-checkbox-group
            :options="paymentOptions"
            :aria-describedby="ariaDescribedby"
            class="mt-1"
          />
        </b-form-group>
      </b-col>

      <b-col lg="12" class="my-1">
        <b-form-group
          v-slot="{ ariaDescribedby }"
          label="결제방법"
          label-cols-sm="2"
          label-align-sm="left"
          label-size="sm"
          class="mb-0"
        >
          <b-form-checkbox-group
            :options="paySystemOptions"
            :aria-describedby="ariaDescribedby"
            class="mt-1"
          />
        </b-form-group>
      </b-col>

      <b-col lg="12" class="my-1">
        <b-form-group
          v-slot="{ ariaDescribedby }"
          label="결제 시간"
          label-cols-sm="2"
          label-align-sm="left"
          label-size="sm"
          class="mb-0"
        >
          <div class="d-inline-flex w-40">
            <b-form-datepicker
              placeholder="선택"
              :date-format-options="{
                year: 'numeric',
                month: 'numeric',
                day: 'numeric'
              }"
              :aria-describedby="ariaDescribedby"
            />
            <span class="mx-2 align-self-center">~</span>
            <b-form-datepicker
              placeholder="선택"
              :date-format-options="{
                year: 'numeric',
                month: 'numeric',
                day: 'numeric'
              }"
              :aria-describedby="ariaDescribedby"
            />
          </div>
        </b-form-group>
      </b-col>
    </b-row>
    <hr class="my-2">
    <b-row align-h="center" class="mb-4">
      <b-col cols="2">
        <b-button variant="primary" class="w-75">
          검색
        </b-button>
      </b-col>
    </b-row>
    <b-row class="pt-5" align-h="between">
      <b-col align-self="center">
        <h6>결제 내역</h6>
      </b-col>
      <b-col align-self="center" class="d-inline-flex justify-content-end">
        <!-- <b-form-select v-model="filter.sort" :options="sortOptions" /> -->
        <b-form-select
          v-model="perPage"
          :options="perPageOptions"
          class="ml-2"
        />
      </b-col>
    </b-row>
    <hr class="my-2">
    <b-row align-h="end" class="mb-2">
      <b-col cols="auto" align-self="center">
        <b-button>엑셀 다운로드</b-button>
      </b-col>
    </b-row>
    <!-- 테이블 -->
        <b-tr v-for="(tr, trIdx) in items" :key="`tr-${trIdx}`">
          <b-td
            v-for="(td, tdIdx) in sortTableItems(tr, fields)"
            :key="`td-${tdIdx}`"
            :colspan="setBodyColspan(td.key)"
          >
            <template v-if="td.key === 'title'">
              <NuxtLink :to="`/calculate/content/${tr['id']}`">
                {{ td.value }}
              </NuxtLink>
            </template>
            <template
              v-else-if="td.key === 'potion' || td.key === 'fixed_charge'"
            >
              <b-row>
                <b-col v-for="key in td.value" :key="`sns-${key}`">
                  {{ key }}
                </b-col>
              </b-row>
            </template>
            <template v-else>
              {{ td.value }}
            </template>
          </b-td>
        </b-tr>
      </b-tbody>
    </b-table-simple>
    <UiPagination
      class="py-4"
      :page="currentPage"
      :per-page="perPage"
      :total-rows="totalRows"
      @change-page="currentPage = $event"
    />
  </b-container>
</template>
<script>
export default {
  name: 'PaymentProductPage',
  data () {
    return {
      setForm: {
        day: '',
        potionCount: ''
      },
      currentPage: 1,
      totalRows: 0,
      perPage: 20,
      currentTab: 0,
      potionItems: [
        {
          id: 723,
          type: '자동 충전',
          name: '신규 결제 3900원',
          price: '3900',
          charge_potion: '390',
          bonus_potion: '0',
          bonus_pumpkin: '0',
          period: '2022-10-24 00:00:00 ~ 2022-10-24 12:00:00',
          yn: '사용',
          updated_at: '2022-10-24 00:00:00'
        },
        {
          id: 73,
          type: '자동 충전',
          name: '신규 결제 3900원',
          price: '3900',
          charge_potion: '390',
          bonus_potion: '0',
          bonus_pumpkin: '0',
          period: '2022-10-24 00:00:00 ~ 2022-10-24 12:00:00',
          yn: '사용',
          updated_at: '2022-10-24 00:00:00'
        },
        {
          id: 7231,
          type: '자동 충전',
          name: '신규 결제 3900원',
          price: '3900',
          charge_potion: '390',
          bonus_potion: '0',
          bonus_pumpkin: '0',
          period: '2022-10-24 00:00:00 ~ 2022-10-24 12:00:00',
          yn: '사용',
          updated_at: '2022-10-24 00:00:00'
        }
      ],
      paymentOptions: [
        { text: '전체', value: 1 },
        { text: '일반충전', value: 2 },
        { text: '자동충전', value: 3 }
      ],
      paySystemOptions: [
        { value: 1, text: '전체' },
        { value: 2, text: '간편결제' },
        { value: 3, text: '카드' },
        { value: 4, text: '모바일' },
        { value: 5, text: '상품권' },
        { value: 6, text: '계좌이체' }
      ],
      potionFields: [
        { key: 'no', label: '번호' },
        { key: 'type', label: '상품 종류' },
        { key: 'name', label: '아이디' },
        { key: 'price', label: '결제번호' },
        { key: 'charge_potion', label: '결제상품이름' },
        { key: 'bonus_potion', label: '결제금액' },
        { key: 'bonus_pumpkin', label: '결제방법' },
        { key: 'period', label: '결제상태' },
        { key: 'updated_at', label: '결제일' },
        { key: 'setting', label: '설정' }
      ],
      fixedChargeItems: [
        {
          id: 723,
          type: '정액제',
          name: '신규 결제 3900원',
          price: '3900',
          charged_period: '390',
          bonus_potion: '0',
          bonus_pumpkin: '0',
          period: '2022-10-24 00:00:00 ~ 2022-10-24 12:00:00',
          yn: '사용',
          updated_at: '2022-10-24 00:00:00'
        },
        {
          id: 73,
          type: '정액제',
          name: '신규 결제 3900원',
          price: '3900',
          charged_period: '390',
          bonus_potion: '0',
          bonus_pumpkin: '0',
          period: '2022-10-24 00:00:00 ~ 2022-10-24 12:00:00',
          yn: '사용',
          updated_at: '2022-10-24 00:00:00'
        },
        {
          id: 7231,
          type: '정액제',
          name: '신규 결제 3900원',
          price: '3900',
          charged_period: '390',
          bonus_potion: '0',
          bonus_pumpkin: '0',
          period: '2022-10-24 00:00:00 ~ 2022-10-24 12:00:00',
          yn: '사용',
          updated_at: '2022-10-24 00:00:00'
        }
      ],
      fixedChargeFields: [
        { key: 'no', label: 'No.' },
        { key: 'type', label: '종류' },
        { key: 'name', label: '상품 이름' },
        { key: 'price', label: '가격' },
        { key: 'charged_period', label: '정액 기간' },
        { key: 'bonus_potion', label: '보너스 물약' },
        { key: 'bonus_pumpkin', label: '보너스 호박' },
        { key: 'period', label: '기간' },
        { key: 'yn', label: '사용 여부' },
        { key: 'updated_at', label: '수정일' },
        { key: 'setting', label: '설정' }
      ],
      autoItems: [
        {
          id: 723,
          type: '자동 충전',
          name: '신규 결제 3900원',
          price: '3900',
          charge_potion: '390',
          bonus_potion: '0',
          bonus_pumpkin: '0',
          period: '2022-10-24 00:00:00 ~ 2022-10-24 12:00:00',
          yn: '사용',
          updated_at: '2022-10-24 00:00:00'
        },
        {
          id: 73,
          type: '자동 충전',
          name: '신규 결제 3900원',
          price: '3900',
          charge_potion: '390',
          bonus_potion: '0',
          bonus_pumpkin: '0',
          period: '2022-10-24 00:00:00 ~ 2022-10-24 12:00:00',
          yn: '사용',
          updated_at: '2022-10-24 00:00:00'
        },
        {
          id: 7231,
          type: '자동 충전',
          name: '신규 결제 3900원',
          price: '3900',
          charge_potion: '390',
          bonus_potion: '0',
          bonus_pumpkin: '0',
          period: '2022-10-24 00:00:00 ~ 2022-10-24 12:00:00',
          yn: '사용',
          updated_at: '2022-10-24 00:00:00'
        }
      ],
      Fields: [
        { key: 'no', label: 'No.' },
        { key: 'type', label: '종류' },
        { key: 'name', label: '상품 이름' },
        { key: 'price', label: '가격' },
        { key: 'charge_potion', label: '충전 물약' },
        { key: 'bonus_potion', label: '보너스 물약' },
        { key: 'bonus_pumpkin', label: '보너스 호박' },
        { key: 'period', label: '기간' },
        { key: 'yn', label: '사용 여부' },
        { key: 'updated_at', label: '수정일' },
        { key: 'setting', label: '설정' }
      ]
    }
  },
  computed: {
    breadcrumb () {
      const arr = [
        { label: '홈', url: '/' },
        { label: '결제 관리', url: '#' },
        { label: '상품 결제 내역', url: this.$route.path }
      ]
      return arr
    }
  },
  watch: {},
  created () {},
  mounted () {
    this.totalRows = this.autoItems.length
  },
  methods: {}
}
</script>
