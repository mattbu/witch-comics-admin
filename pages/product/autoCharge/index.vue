<template>
  <b-container fluid class="page-min-height py-3">
    <UiPageTitle title="자동 충전 상품 관리" :breadcrumb="breadcrumb">
      <template #buttons>
        <b-button
          variant="primary"
          @click="$router.push('/product/autoCharge/add')"
        >
          상품 추가
        </b-button>
      </template>
    </UiPageTitle>
    <hr>
    <b-container fluid class="px-0" tag="form" @submit.prevent="getList">
      <b-tabs v-model="currentTab" content-class="mt-3">
        <b-tab title="상품" active>
          <!-- 테이블 -->
          <b-row class="mt-3 px-3">
            <b-col lg="12" class="my-1">
              <b-form-group
                label="상태"
                label-cols-sm="2"
                label-align-sm="left"
                label-size="sm"
                class="mb-0"
              >
                <b-form-checkbox-group
                  v-model="filter.searchType"
                  :options="statusOptions"
                />
              </b-form-group>
            </b-col>

            <b-col lg="12" class="my-1">
              <b-form-group
                label="기간"
                label-class="align-self-center"
                label-cols-sm="2"
                label-align-sm="left"
                label-size="sm"
                class="mb-0"
              >
                <b-form-radio-group
                  v-model="filter.searchDtType"
                  :options="periodOptions"
                  class="mb-1"
                />
                <div class="d-inline-flex w-40 mb-1">
                  <b-form-datepicker
                    v-model="filter.searchStartDt"
                    label-help=""
                    hide-header
                    placeholder="선택"
                    :date-format-options="{
                      year: 'numeric',
                      month: 'numeric',
                      day: 'numeric'
                    }"
                  />
                  <span class="ml-2 align-self-center">~</span>
                  <b-form-datepicker
                    v-model="filter.searchEndDt"
                    label-help=""
                    hide-header
                    placeholder="선택"
                    :date-format-options="{
                      year: 'numeric',
                      month: 'numeric',
                      day: 'numeric'
                    }"
                    class="ml-2"
                  />
                </div>
              </b-form-group>
            </b-col>
          </b-row>
          <hr class="my-2">
          <b-row align-h="center" class="mb-4">
            <b-col cols="2" class="d-flex">
              <b-button type="submit" variant="primary" class="w-75">
                검색
              </b-button>
            </b-col>
          </b-row>
          <!-- 테이블 -->
          <b-table
            class="list mt-5"
            :items="items"
            :fields="fields"
            stacked="md"
            show-empty
            small
          >
            <template #empty>
              <PageNoResult />
            </template>
            <template #cell(no)="data">
              {{
                totalRows - (filter.pageNum - 1) * filter.pageSize - (data.index + 1) + 1
              }}
            </template>
            <template #cell(title)="data">
              <NuxtLink :to="`/product/autoCharge/${data.item.id}`">
                {{ data.value ? data.value : '-' }}
              </NuxtLink>
            </template>
            <template #cell(price)="data">
              {{ data.value ? `${paintMoneyComma(data.value)}원` : '0원' }}
            </template>
            <template #cell(coin)="data">
              {{ data.value ? data.value : '0' }}
            </template>
            <template #cell(bonusCoin)="data">
              {{ data.value ? data.value : '0' }}
            </template>
            <template #cell(bonusPoint)="data">
              {{ data.value ? data.value : '0' }}
            </template>
            <template #cell(startDate)="data">
              {{ data.value ? data.value : '-' }}
            </template>
            <template #cell(endDate)="data">
              {{ data.value ? data.value : '-' }}
            </template>
            <template #cell(status)="data">
              <p v-if="data.value === '진행중'" class="text-info">
                진행중
              </p>
              <p v-else-if="data.value === '대기'">
                대기
              </p>
              <p v-else-if="data.value === '종료'" class="text-warning">
                종료
              </p>
              <p v-else>
                -
              </p>
            </template>
            <template #cell(isShow)="data">
              {{ data.value ? data.value : '-' }}
            </template>
            <template #cell(setting)="data">
              <b-button
                variant="outline-secondary"
                class="table-inner-btn"
                @click="removeProduct(data.item.id)"
              >
                삭제
              </b-button>
            </template>
          </b-table>
        </b-tab>
        <b-tab title="기준물약 설정">
          <table class="table border mb-0">
            <tbody>
            <!-- 정보 -->
            </tbody>
          </table>
          <!-- 테이블 -->
          <b-table
            class="list"
            :items="productList"
            :fields="potionFields"
            stacked="md"
            show-empty
            small
          >
            <template #empty>
              <PageNoResult />
            </template>
            <template #table-colgroup="scope">
              <col
                v-for="field in scope.fields"
                :key="field.key"
                :style="{ width: '40px' }"
              >
            </template>
            <template #cell(no)="data">
              {{ data.index }}
            </template>
            <template #cell(coin)="data">
              <template v-if="data.index === 0">
                <b-form-input v-model.number="productList[0].coin" />
              </template>
              <template v-else>
                {{ productList[data.index].coin }}
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
        </b-tab>
      </b-tabs>
    </b-container>
  </b-container>
</template>

<script>
import { commonFuctions } from '@/plugins/mixins'

export default {
  name: 'AutoChargeProductListPage',
  mixins: [commonFuctions],
  data () {
    return {
      currentTab: 0,
      filter: {
        searchType: [],
        searchDtType: '시작일',
        searchStartDt: '',
        searchEndDt: '',
        pageNum: 1,
        pageSize: 10
      },
      // 상태 옵션
      statusOptions: [
        { value: '대기', text: '대기' },
        { value: '진행중', text: '진행중' },
        { value: '종료', text: '종료' }
      ],
      // 기간 옵션
      periodOptions: [
        { value: '시작일', text: '시작일' },
        { value: '종료일', text: '종료일' }
      ],
      totalRows: 0,
      isLoading: false,
      items: [],
      fields: [
        { key: 'no', label: '번호' },
        { key: 'title', label: '상품 이름' },
        { key: 'price', label: '가격' },
        { key: 'coin', label: '충전 물약' },
        { key: 'bonusCoin', label: '보너스 물약' },
        { key: 'bonusPoint', label: '보너스 호박' },
        { key: 'startDate', label: '시작일' },
        { key: 'endDate', label: '종료일' },
        { key: 'status', label: '상태' },
        { key: 'isShow', label: '노출 여부' },
        { key: 'setting', label: '관리' }
      ],
      // 기준물약 설정
      productList: [
        { coin: '' }
      ],
      potionFields: [
        { key: 'no', label: '번호' },
        { key: 'coin', label: '충전기준 물약' },
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
        { label: '자동 충전 상품 관리', url: this.$route.path }
      ]
      return arr
    }
  },
  watch: {},
  created () {},
  mounted () {},
  methods: {
    async getList () {
      this.isLoading = true

      try {
        const { status, data: { data } } = await this.$axios.get('/api/manager/product/auto/list', {
          params: {
            ...(this.filter.searchType.length > 0 ? { searchType: this.filter.searchType } : {}),
            ...(this.filter.searchStartDt ? { searchStartDt: this.filter.searchStartDt } : {}),
            ...(this.filter.searchEndDt ? { searchEndDt: this.filter.searchEndDt } : {}),
            ...this.filter
          }
        })

        if (status === 200) {
          this.items = data.list
          this.totalRows = data.total
        }
      } catch (e) {
        console.log(e)
      } finally {
        this.isLoading = false
      }
    },
    async removeProduct (id) {
      const confirm = window.confirm('삭제 하시겠습니까?')

      if (confirm) {
        try {
          const res = await this.$axios.delete(`/api/manager/product/auto/${id}`)

          if (res.status === 200) {
            alert('삭제가 완료 되었습니다.')
            await this.getList()
          }
        } catch (e) {
          console.log(e)
        }
      }
    },
    addRow () {
      this.productList.push({
        coin: this.productList[0].coin
      })
      this.productList[0].coin = ''
    },
    removeRow (idx) {
      this.productList = this.productList.filter((row, rowIdx) => rowIdx !== idx)
    }
  }
}
</script>
