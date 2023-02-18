<template>
  <b-container fluid class="page-min-height py-3">
    <UiPageTitle title="일반 충전 관리" :breadcrumb="breadcrumb">
      <template #buttons>
        <b-button
          v-if="currentTab === 0"
          variant="primary"
          @click="$router.push('/product/general/add')"
        >
          그룹 추가
        </b-button>
        <b-button v-if="currentTab === 1" variant="primary">
          저장
        </b-button>
      </template>
    </UiPageTitle>
    <hr>
    <!--    필터-->
    <b-container fluid class="px-0" tag="form" @submit.prevent="getList">
      <b-tabs v-model="currentTab">
        <!-- 그룹 -->
        <b-tab title="그룹" active>
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

          <b-row class="pt-5" align-h="between">
            <b-col align-self="center">
              <h6>그룹 목록 ({{ totalRows ? totalRows : '0' }})</h6>
            </b-col>
          </b-row>
          <hr class="my-2 mb-2">
          <b-row align-h="end" class="mb-2" />

          <!-- 테이블 -->
          <b-table
            class="list"
            :items="items"
            :fields="fields"
            :busy="isLoading"
            stacked="md"
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
            <!-- 그룹 타이틀 -->
            <template #cell(title)="data">
              <NuxtLink :to="`/product/general/${data.item.id}`">
                {{ data.value }}
              </NuxtLink>
            </template>
            <!-- 상품 개수 -->
            <template #cell(productCount)="data">
              {{ data.value ? data.value : '-' }}
            </template>
            <!-- 시작일 -->
            <template #cell(startDate)="data">
              {{ data.value ? data.value : '-' }}
            </template>
            <!-- 종료일 -->
            <template #cell(endDate)="data">
              {{ data.value ? data.value : '-' }}
            </template>
            <!-- 상태 -->
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
            <!-- 노출 여부 -->
            <template #cell(isShow)="data">
              {{ data.value ? data.value : '-' }}
            </template>
            <!-- 관리 -->
            <template #cell(setting)="data">
              <b-button
                variant="outline-secondary"
                class="table-inner-btn"
                @click="removeGeneral(data.item.id)"
              >
                삭제
              </b-button>
            </template>
          </b-table>
        </b-tab>

        <!-- 서비스 중 상품 -->
        <b-tab title="서비스 중 상품">
          <table class="table border mb-0">
            <tbody>
              <!-- 정보 -->
            </tbody>
          </table>
          <b-row class="pt-5" align-h="between">
            <b-col align-self="center">
              <h6>
                상품 목록({{
                  secondItems.length > 0 ? secondItems.length : '0'
                }})
              </h6>
            </b-col>
          </b-row>
          <hr class="my-2 mb-2">
          <b-row align-h="end" class="mb-2" />

          <!-- 테이블 -->
          <b-table
            class="list"
            :items="secondItems"
            :fields="secondFields"
            :busy="isSecondLoading"
            stacked="md"
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
            <!-- 순서 -->
            <template #cell(select)="data">
              <b-form-checkbox
                v-model="data.item.isHot"
                value="y"
                unchecked-value="n"
                style="float: unset"
                @change="updateHot($event, data.item.id)"
              />
            </template>
            <template #cell(no)="data">
              {{
                secondItems.length -
                  (currentPage - 1) * perPage -
                  (data.index + 1) +
                  1
              }}
            </template>
            <!-- 그룹 타이틀 -->
            <template #cell(title)="data">
              {{ data.value ? data.value : '-' }}
            </template>
            <!-- 상품이름 -->
            <template #cell(name)="data">
              {{ data.value ? data.value : '-' }}
            </template>
            <!-- 상품가격 -->
            <template #cell(price)="data">
              {{ data.value ? `${paintMoneyComma(data.value)}원` : '0원' }}
            </template>
            <!-- 할인율 -->
            <template #cell(discountRate)="data">
              {{ data.value ? `${data.value}%` : '0%' }}
            </template>
            <!-- 판매금액 -->
            <template #cell(showPrice)="data">
              {{ data.value ? `${paintMoneyComma(data.value)}원` : '0원' }}
            </template>
            <!-- 충전물약 -->
            <template #cell(coin)="data">
              {{ data.value ? data.value : '0' }}
            </template>
            <!-- 보너스 물약 -->
            <template #cell(bonusCoin)="data">
              {{ data.value ? data.value : '0' }}
            </template>
            <!-- 보너스 호박 -->
            <template #cell(bonusPoint)="data">
              {{ data.value ? data.value : '0' }}
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
  name: 'ProductGeneralListPage',
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
      isLoading: false,
      totalRows: 0,
      items: [],
      fields: [
        { key: 'no', label: '번호' },
        { key: 'title', label: '그룹 타이틀' },
        { key: 'productCount', label: '상품 개수' },
        { key: 'startDate', label: '시작일' },
        { key: 'endDate', label: '종료일' },
        { key: 'status', label: '상태' },
        { key: 'isShow', label: '노출 여부' },
        { key: 'setting', label: '관리' }
      ],

      currentPage: 1,
      perPage: 10,
      // 서비스 중 상품 데이터
      isSecondLoading: false,
      secondItems: [],
      secondFields: [
        { key: 'select', label: '인기상품' },
        { key: 'no', label: '번호' },
        { key: 'title', label: '그룹 타이틀' },
        { key: 'name', label: '상품이름' },
        { key: 'price', label: '상품가격' },
        { key: 'discountRate', label: '할인율' },
        { key: 'showPrice', label: '판매금액' },
        { key: 'coin', label: '충전물약' },
        { key: 'bonusCoin', label: '보너스 물약' },
        { key: 'bonusPoint', label: '보너스 호박' }
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
        { label: '일반 충전 관리', url: this.$route.path }
      ]
      return arr
    }
  },
  watch: {
    async currentTab (val) {
      if (val === 0) {
        await this.getList()
      } else {
        await this.getSecondList()
      }
    }
  },
  mounted () {},
  methods: {
    async updateHot (e, id) {
      try {
        const res = await this.$axios.put(
          `/api/manager/product/popular/${id}`,
          {},
          {
            params: {
              hotYn: e
            }
          }
        )
        console.log(res)
        if (res.status === 200) {
          if (e === 'y') {
            alert('인기 상품으로 수정 되었습니다.')
          } else {
            alert('일반 상품으로 수정 되었습니다.')
          }
          await this.getSecondList()
        }
      } catch (e) {
        console.log(e)
      }
    },
    async getSecondList () {
      this.isSecondLoading = true

      try {
        const {
          data: { data }
        } = await this.$axios.get('/api/manager/product/product/list')
        this.secondItems = data
      } catch (e) {
        console.log(e)
      } finally {
        this.isSecondLoading = false
      }
    },
    async getList () {
      this.isLoading = true

      try {
        const {
          data: { data }
        } = await this.$axios.get('/api/manager/product/group/list', {
          params: {
            ...(this.filter.searchType.length > 0
              ? { searchType: this.filter.searchType }
              : {}),
            ...(this.filter.searchStartDt
              ? { searchStartDt: this.filter.searchStartDt }
              : {}),
            ...(this.filter.searchEndDt
              ? { searchEndDt: this.filter.searchEndDt }
              : {}),
            ...this.filter
          }
        })
        this.items = data.list
        this.totalRows = data.total
      } catch (e) {
        console.log(e)
      } finally {
        this.isLoading = false
      }
    },
    // 삭제
    async removeGeneral (id) {
      const confirm = window.confirm('삭제 하시겠습니까?')

      if (confirm) {
        try {
          const res = await this.$axios.delete(
            `/api/manager/product/group/${id}`
          )
          console.log(res)
          if (res.status === 200) {
            alert('삭제가 완료 되었습니다.')
            await this.getList()
          }
        } catch (e) {
          console.log(e)
        }
      } else {
        alert('삭제가 취소 되었습니다.')
      }
    }
  }
}
</script>
