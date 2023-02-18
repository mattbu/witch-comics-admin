<template>
  <b-container fluid class="page-min-height py-3">
    <UiPageTitle title="소설 랭킹 관리" :breadcrumb="breadcrumb">
      <template #buttons>
        <b-button variant="primary">
          미리보기
        </b-button>
        <b-button variant="primary" @click="rankOrderSet">
          저장
        </b-button>
      </template>
    </UiPageTitle>
    <hr>
    <!-- 필터 -->
    <b-row class="mb-3">
      <b-col cols="12">
        <b-button
          :variant="moduleType === 1 ? 'primary' : 'outline-primary'"
          @click="
            moduleType = 1
            $router.push('/organizeModule/comicRank?type=all')
          "
        >
          일반
        </b-button>
        <b-button
          :variant="moduleType === 3 ? 'primary' : 'outline-primary'"
          @click="
            moduleType = 3
            $router.push('/organizeModule/comicRank?type=adult')
          "
        >
          성인
        </b-button>
      </b-col>
    </b-row>

    <b-tabs v-model="currentTab" content-class="mt-3">
      <b-tab title="실시간" />

      <b-tab title="신작" />

      <b-tab title="이벤트" />

      <b-tab title="월간" />
    </b-tabs>
    <b-row class="mt-2">
      <b-col cols="12">
        <table class="table border mb-4 table-layout-fixed">
          <colgroup>
            <col style="width: 15%">
            <col>
            <col style="width: 10%">
            <col>
          </colgroup>
          <tbody>
            <tr>
              <th>작품 추가</th>
              <td colspan="3">
                <b-button
                  variant="outline-secondary"
                  class="table-inner-btn"
                  @click="openModal('rank-search-works-modal')"
                >
                  추가
                </b-button>
              </td>
            </tr>
            <tr>
              <th>작품 목록</th>
              <td colspan="3">
                <!-- <template v-if="form.list.length > 0"> -->
                <b-table
                  class="list"
                  :items="form"
                  :fields="fields"
                  stacked="md"
                  :busy="isLoading"
                  show-empty
                  small
                >
                  <template #table-colgroup>
                    <col style="width: 7%">
                  </template>

                  <template #empty>
                    <h4 class="mt-4">
                      지정 작품이 없습니다.
                    </h4>
                    <span class="fs-14 text-muted">작품을 추가해주세요.</span>
                  </template>

                  <template #table-busy>
                    <div class="text-center text-danger my-4">
                      <b-spinner variant="primary" class="align-middle" />
                      <span class="ml-3">데이터를 불러오고 있습니다.</span>
                    </div>
                  </template>
                  <template #cell(orders)="data">
                    <b-form-input
                      v-model.number="form[data.index].orders"
                      class="w-100 text-center"
                    />
                  </template>
                  <!-- 순서 -->
                  <template #cell(no)="data">
                    {{ data.value ? data.value : '-' }}
                  </template>
                  <!-- 제목 -->
                  <template #cell(title)="data">
                    {{ data.value ? data.value : '-' }}
                  </template>
                  <!-- 작가 -->
                  <template #cell(writer)="data">
                    {{ data.value ? data.value : '-' }}
                  </template>
                  <!-- 연령등급 -->
                  <template #cell(rate)="data">
                    {{ data.value ? data.value : '-' }}
                  </template>
                  <!-- 판매중 회차 수 -->
                  <template #cell(saleCnt)="data">
                    {{ data.value ? data.value : '-' }}
                  </template>
                  <!-- 전체 회차 수 -->
                  <template #cell(allCnt)="data">
                    {{ data.value ? data.value : '-' }}
                  </template>
                  <!-- 연재 여부 -->
                  <template #cell(isEnd)="data">
                    {{ data.value ? data.value : '-' }}
                  </template>
                  <!-- 연재 상태 -->
                  <template #cell(status)="data">
                    {{ data.value ? data.value : '-' }}
                  </template>
                  <!-- 관리 -->
                  <template #cell(setting)="data">
                    <b-button
                      variant="outline-secondary"
                      class="table-inner-btn"
                      @click="removeRank(data.item.id)"
                    >
                      삭제
                    </b-button>
                  </template>
                </b-table>
                <!-- </template> -->
                <!-- <template v-else>
                  <span class="fs-14 text-muted">작품을 추가해 주세요.</span>
                </template> -->
              </td>
            </tr>
          </tbody>
        </table>
      </b-col>
    </b-row>

    <SearchEventModal :module-type="moduleType" @select-event="selectEvent" />

    <SearchRankModal :module-type="moduleType" @select-rank="addRank" />
  </b-container>
</template>

<script>
export default {
  name: 'EventModuleAddPage',
  data () {
    return {
      moduleType: null,
      form: [],
      orderList: [],
      isLoading: false,
      totalRows: 0,
      currentPage: 1,
      perPage: 5,
      fields: [
        { key: 'orders', label: '배치순서' },
        { key: 'no', label: '순서' },
        { key: 'title', label: '제목' },
        { key: 'writer', label: '작가' },
        { key: 'rate', label: '연령등급' },
        { key: 'saleCnt', label: '판매중 회차 수' },
        { key: 'allCnt', label: '전체 회차 수' },
        { key: 'isEnd', label: '연재 여부' },
        { key: 'status', label: '연재 상태' },
        { key: 'setting', label: '관리' }
      ],
      currentTab: 0,
      currentType: 'RK',
      copyForm: []
    }
  },
  async fetch () {
    await this.getList('RK')
  },
  computed: {
    breadcrumb () {
      const arr = [
        { label: '홈', url: '/' },
        { label: '편성모듈', url: 'organizeModule/webComic' },
        { label: '소설 랭킹 관리', url: this.$route.fullPath }
      ]
      return arr
    }
  },
  watch: {
    orderList (val) {
      console.log(val)
    },
    async currentTab (val) {
      console.log(val)
      if (val === 0) {
        this.currentType = 'RK'
        // await this.getList('RK') // 실시간 랭킹
      } else if (val === 1) {
        this.currentType = 'NR'
        // await this.getList('NR') // 신작 랭킹
      } else if (val === 2) {
        this.currentType = 'ER'
        // await this.getList('ER') // 이벤트 랭킹
      } else if (val === 3) {
        this.currentType = 'MR'
        // await this.getList('MR') // 월간 랭킹
      }
      await this.getList()
    }
  },
  created () {
    if (this.$route.query.type === 'all') {
      this.moduleType = 1
    } else {
      this.moduleType = 3
    }
    console.log(this.moduleType)
  },
  mounted () {},
  methods: {
    async addRank (data) {
      this.form = [...this.form, ...data].map((item, index) => {
        return {
          orders: '',
          id: item.id,
          no: index + 1,
          title: item.title,
          writer: item.writer,
          rate: item.rate,
          saleCnt: 0,
          allCnt: 0,
          isEnd: null,
          status: null
        }
      })

      this.copyForm = this.form.map(item => item.id).filter(item => item)

      try {
        const { status } = await this.$axios.post(
          `/api/manager/ranking/add/${this.moduleType}/${this.currentType}`,
          this.copyForm
        )
        if (status === 200) {
          alert('등록이 완료 되었습니다.')
          await this.getList()
        }
      } catch (err) {
        alert('등록되지 않았습니다. 다시 시도해보십시오.')
      }
    },

    // 조회
    async getList () {
      this.isLoading = true
      try {
        const {
          status,
          data: { data }
        } = await this.$axios.get(
          `/api/manager/ranking/${this.moduleType}/${this.currentType}`
        )

        if (status === 200) {
          this.form = data
          this.orderList = data.map((item) => {
            return {
              id: item.id,
              order: ''
            }
          })
        }
      } catch (e) {
        console.log(e)
      } finally {
        this.isLoading = false
      }
    },
    async rankOrderSet () {
      this.orderList = this.form.map(item => ({
        id: item.id,
        order: item.orders
      }))

      try {
        const { status } = await this.$axios.put(
          '/api/manager/ranking/orders',
          this.orderList
        )
        if (status === 200) {
          alert('등록이 완료 되었습니다.')
          await this.getList()
        }
      } catch (err) {
        alert('등록되지 않았습니다. 다시 시도해보십시오.')
      }
    },
    openModal (id) {
      this.$root.$emit('bv::show::modal', id)
    },
    // 삭제
    async removeRank (id) {
      const confirm = window.confirm('삭제 하시겠습니까?')
      if (confirm) {
        try {
          const {
            status,
            data: { data }
          } = await this.$axios.delete(`/api/manager/ranking/delete/${id}`)
          if (status === 200) {
            alert('삭제가 완료 되었습니다.')
            await this.getList(data)
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
