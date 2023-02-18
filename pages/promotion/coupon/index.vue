<template>
  <b-container fluid class="page-min-height py-3">
    <UiPageTitle title="쿠폰" :breadcrumb="breadcrumb">
      <template #buttons>
        <b-button variant="primary" to="/promotion/coupon/add">
          등록
        </b-button>
      </template>
    </UiPageTitle>
    <hr>
    <!--필터-->
    <b-container fluid class="px-0" tag="form" @submit.prevent="getList">
      <b-row class="px-3">
        <b-col lg="12" class="mb-2">
          <b-form-group
            label="쿠폰명"
            label-class="align-self-center"
            label-cols-sm="2"
            label-align-sm="left"
            label-size="sm"
            class="mb-0 align-items-center"
          >
            <div class="d-inline-flex">
              <b-form-input v-model="filter.searchValue" />
            </div>
          </b-form-group>
        </b-col>

        <b-col lg="12" class="my-1">
          <b-form-group
            label="기간"
            label-cols-sm="2"
            label-align-sm="left"
            label-size="sm"
          >
            <div class="d-inline-flex justify-content-start w-100 my-2">
              <div class="d-inline-flex w-40">
                <b-form-datepicker
                  v-model="startDate"
                  label-help=""
                  hide-header
                  placeholder="선택"
                  :date-format-options="{
                    year: 'numeric',
                    month: 'numeric',
                    day: 'numeric'
                  }"
                />
                <b-form-datepicker
                  v-model="endDate"
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
            </div>
          </b-form-group>
        </b-col>
      </b-row>
      <hr>
      <b-row align-h="center" class="mb-4">
        <b-col cols="2">
          <b-button type="submit" variant="primary" class="w-75">
            검색
          </b-button>
        </b-col>
      </b-row>
    </b-container>
    <b-row class="pt-5">
      <b-col align-self="center">
        <h6>쿠폰 목록 ({{ totalRows ? totalRows : '0' }})</h6>
      </b-col>
    </b-row>
    <hr class="my-2">

    <!-- 테이블 -->
    <b-table
      class="list"
      :items="list"
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
      <template #cell(name)="data">
        <NuxtLink :to="`/promotion/coupon/${data.item.id}`">
          {{ data.value }}
        </NuxtLink>
      </template>
      <template #cell(useDate)="data">
        {{ data.value ? data.value : '-' }}
      </template>
      <template #cell(isUse)="data">
        {{ data.value ? data.value : '-' }}
      </template>
      <template #cell(useType)="data">
        {{ data.value ? data.value : '-' }}
      </template>
      <template #cell(cnt)="data">
        {{ data.value ? data.value : '0' }}
      </template>
      <template #cell(manager)="data">
        {{ data.value ? data.value : '-' }}
      </template>
      <template #cell(allCnt)="data">
        {{ data.value ? data.value : '0' }}
      </template>
      <template #cell(useCnt)="data">
        {{ data.value ? data.value : '0' }}
      </template>
      <template #cell(noUseCnt)="data">
        {{ data.value ? data.value : '0' }}
      </template>
      <template #cell(expTime)="data">
        {{ data.value ? data.value : '0' }}
      </template>
      <template #cell(overlap)="data">
        {{ data.value ? data.value : '-' }}
      </template>
      <template #cell(setting)="data">
        <b-button
          variant="outline-secondary"
          class="table-inner-btn"
          @click="removeCoupon(data.item.id)"
        >
          삭제
        </b-button>
      </template>
    </b-table>
    <UiPagination
      class="py-4"
      :page="filter.pageNum"
      :per-page="filter.pageSize"
      :total-rows="totalRows"
      @change-page="filter.pageNum = $event"
    />
  </b-container>
</template>

<script>
export default {
  name: 'PromotionCouponListPage',
  data () {
    return {
      // 필터
      filter: {
        searchValue: '',
        searchStartDt: '',
        searchEndDt: '',
        pageNum: 1,
        pageSize: 5
      },
      // 리스트
      isLoading: false,
      totalRows: 0,
      list: [],
      fields: [
        { key: 'no', label: '번호' },
        { key: 'name', label: '쿠폰명' },
        { key: 'useDate', label: '사용기간' },
        { key: 'isUse', label: '상태' },
        { key: 'useType', label: '발급 종류' },
        { key: 'cnt', label: '개수' },
        { key: 'manager', label: '발급자' },
        { key: 'allCnt', label: '총개수' },
        { key: 'useCnt', label: '사용 개수' },
        { key: 'noUseCnt', label: '미사용 개수' },
        { key: 'expTime', label: '만료일' },
        { key: 'overlap', label: '중복사용' },
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
        { label: '프로모션 관리', url: '#' },
        { label: '쿠폰', url: this.$route.path }
      ]
      return arr
    }
  },
  watch: {
    async 'filter.pageNum' () {
      await this.getList()
    }
  },
  mounted () {},
  methods: {
    /** 목록 */
    async getList () {
      this.isLoading = true

      try {
        const {
          status,
          data: { data }
        } = await this.$axios.get('/api/manager/coupon/list', {
          params: this.filter
        })
        if (status === 200) {
          this.list = data.list
          this.totalRows = data.total
        }
      } catch (e) {
        console.log(e)
      } finally {
        this.isLoading = false
      }
    },
    /** 쿠폰 삭제 */
    async removeCoupon (id) {
      if (confirm('정말 삭제하시겠습니까?') === true) {
        try {
          const { status } = await this.$axios.delete(
            `/api/manager/coupon/delete/${id}`
          )

          if (status === 200) {
            alert('쿠폰 삭제가 완료 되었습니다.')
            await this.getList()
          }
        } catch (e) {
          console.log(e)
        }
      } else {
        return false
      }
    }
  }
}
</script>
