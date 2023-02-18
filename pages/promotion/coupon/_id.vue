<template>
  <b-container fluid class="page-min-height py-3">
    <UiPageTitle title="쿠폰 상세" :breadcrumb="breadcrumb" />

    <hr>
    <b-row class="mt-4">
      <b-col cols="12">
        <table class="table border mb-0 table-layout-fixed">
          <colgroup>
            <col style="width: 10%">
            <col>
            <col style="width: 10%">
            <col>
          </colgroup>
          <tbody class="text-center">
            <!-- 정보 -->
            <tr>
              <th>쿠폰명</th>
              <td colspan="15">
                <div class="d-inline-flex w-100 justify-content-between">
                  <span class="align-self-center">{{ info.name ? info.name : '-' }}</span>
                  <b-button class="ml-2" @click="preventUse">
                    사용 중지
                  </b-button>
                </div>
              </td>
            </tr>
            <tr>
              <th>발급 종류</th>
              <td colspan="3">
                {{ `${info.useType ? info.useType : '-'} (${info.cnt ? info.cnt : '0'})개` }}
              </td>
              <th>발급 개수</th>
              <td colspan="3">
                {{ info.allCnt ? info.allCnt : '0' }}
              </td>
              <th>사용 개수</th>
              <td colspan="3">
                {{ info.useCnt ? info.useCnt : '0' }}
              </td>
              <th>미사용 개수</th>
              <td colspan="3">
                {{ info.noUseCnt ? info.noUseCnt : '0' }}
              </td>
            </tr>
            <tr>
              <th>쿠폰 상태</th>
              <td colspan="3">
                {{ info.isUse ? info.isUse : '-' }}
              </td>
              <th>사용기간</th>
              <td colspan="3">
                {{ info.useDate ? info.useDate : '-' }}
              </td>
              <th>중복여부</th>
              <td colspan="3">
                {{ info.overlap ? info.overlap : '-' }}
              </td>
              <th>발급일</th>
              <td colspan="3">
                {{ info.createdAt ? info.createdAt : '-' }}
              </td>
            </tr>
          </tbody>
        </table>
      </b-col>
    </b-row>
    <b-container fluid class="px-0" tag="form" @submit.prevent="getList">
      <b-row class="mt-4">
        <b-col cols="12">
          <table class="table border table-layout-fixed">
            <colgroup>
              <col style="width: 10%">
              <col>
            </colgroup>
            <tbody>
              <tr>
                <th>사용 여부</th>
                <td colspan="3">
                  <b-form-group>
                    <b-form-checkbox-group
                      v-model="filter.useYn"
                      :options="useYesNoOptions"
                    />
                  </b-form-group>
                </td>
              </tr>
            </tbody>
          </table>
        </b-col>
      </b-row>
      <hr>
      <b-row align-h="center" class="my-2">
        <b-col cols="2">
          <b-button type="submit" variant="primary" class="w-75">
            검색
          </b-button>
        </b-col>
      </b-row>
    </b-container>
    <b-row class="pt-5">
      <b-col align-self="center">
        <h6>{{ info.name ? info.name : '-' }} 목록({{ totalRows ? totalRows : '0' }})</h6>
      </b-col>
    </b-row>
    <hr class="my-2">
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
        {{ totalRows - (filter.pageNum - 1) * filter.pageSize - (data.index + 1) + 1 }}
      </template>
      <template #cell(name)="data">
        {{ data.value ? data.value : '-' }}
      </template>
      <template #cell(useAbleDate)="data">
        {{ data.value ? data.value : '-' }}
      </template>
      <template #cell(createdAt)="data">
        {{ data.value ? data.value : '-' }}
      </template>
      <template #cell(useYn)="data">
        {{ data.value ? data.value : '-' }}
      </template>
      <template #cell(email)="data">
        {{ data.value ? data.value : '-' }}
      </template>
      <template #cell(usedDate)="data">
        {{ data.value ? data.value : '-' }}
      </template>
      <template #cell(code)="data">
        {{ data.value ? data.value : '-' }}
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
  name: 'PromotionCouponDetailPage',
  data () {
    return {
      // 상단 정보
      isInfoLoading: false,
      info: {},
      // 필터
      filter: {
        pageNum: 1,
        pageSize: 5,
        useYn: []
      },
      useYesNoOptions: [
        { text: '사용', value: '사용' },
        { text: '미사용', value: '미사용' }
      ],
      // 리스트
      isLoading: false,
      totalRows: 0,
      list: [],
      fields: [
        { key: 'no', label: '번호' },
        { key: 'name', label: '쿠폰명' },
        { key: 'useAbleDate', label: '사용기간' },
        { key: 'createdAt', label: '발급일' },
        { key: 'useYn', label: '사용여부' },
        { key: 'email', label: '사용자' },
        { key: 'usedDate', label: '사용일' },
        { key: 'code', label: '쿠폰번호' }
      ]
    }
  },
  async fetch () {
    await this.getInfo()
    await this.getList()
  },
  computed: {
    breadcrumb () {
      const arr = [
        { label: '홈', url: '/' },
        { label: '프로모션 관리', url: '#' },
        { label: '쿠폰 상세', url: this.$route.path }
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
    /** 사용 중지 */
    async preventUse () {
      try {
        const { status } = await this.$axios.put(`/api/manager/coupon/nouse/${this.$route.params.id}`)

        if (status === 200) {
          alert('사용 중지가 완료 되었습니다.')
          await this.$router.push('/promotion/coupon')
        }
      } catch (e) {
        console.log(e)
      }
    },
    /** 쿠폰 상세 목록 */
    async getList () {
      this.isLoading = true

      try {
        const { status, data: { data } } = await this.$axios.get(`/api/manager/coupon/detail/list/${this.$route.params.id}`, {
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
    /** 상세 상단 정보 */
    async getInfo () {
      this.isInfoLoading = true
      try {
        const { status, data: { data } } = await this.$axios.get(`/api/manager/coupon/detail/base/${this.$route.params.id}`)
        if (status === 200) {
          this.info = data
        }
      } catch (e) {
        console.log(e)
      } finally {
        this.isInfoLoading = false
      }
    }
  }
}
</script>
