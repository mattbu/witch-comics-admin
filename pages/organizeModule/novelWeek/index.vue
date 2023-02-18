<template>
  <b-container fluid class="page-min-height py-3">
    <UiPageTitle title="소설 요일 관리" :breadcrumb="breadcrumb">
      <template #buttons>
        <b-button variant="primary" @click="modalValue = true">
          미리보기
        </b-button>
        <b-button variant="primary" @click="setOrders">
          적용
        </b-button>
      </template>
    </UiPageTitle>
    <hr>
    <!--    필터-->
    <b-container fluid class="px-0" tag="form" @submit.prevent="search">
      <b-row class="mt-3 px-3">
        <b-col lg="12" class="my-1">
          <b-form-group
            label="작품 검색"
            label-cols-sm="2"
            label-align-sm="left"
            label-size="sm"
            class="mb-0"
          >
            <b-form-input v-model="filter.title" class="w-30" />
          </b-form-group>
        </b-col>
      </b-row>
      <hr>
      <b-row align-h="center" class="mt-2 mb-4">
        <b-col cols="2">
          <b-button type="submit" variant="primary" class="w-75">
            검색
          </b-button>
        </b-col>
      </b-row>
      <b-row>
        <b-col cols="12" class="d-inline-flex">
          <b-button
            v-for="(tab, index) in weekdayTabs"
            :key="`serial-tab-${index}`"
            :variant="tab.id === currentDay ? 'primary' : 'outline-secondary'"
            class="mr-2 table-inner-btn"
            @click="changeTab(tab.id)"
          >
            {{ tab.name }}
          </b-button>
        </b-col>
      </b-row>
    </b-container>
    <hr class="my-2">

    <b-table
      class="list"
      :items="items"
      :fields="fields"
      stacked="md"
      show-empty
      :busy="isLoading"
      small
    >
      <template #table-colgroup>
        <col style="width: 7%">
      </template>
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
      <template #cell(subOrders)="data">
        <b-form-input
          v-model.number="orderList[data.index].order"
          class="w-100 text-center"
        />
      </template>
      <!-- 번호 -->
      <template #cell(no)="data">
        {{ data.index + 1 }}
      </template>
      <!-- 썸네일 -->
      <template #cell(thumbnail)="data">
        <div v-if="data.value" class="thumbnail-wrapper">
          <img :src="data.value" alt="">
        </div>
        <div v-else class="thumbnail-wrapper none" />
      </template>
      <!-- 제목 -->
      <template #cell(title)="data">
        {{ data.value ? data.value : '-' }}
      </template>
      <!-- 작가 -->
      <template #cell(writer)="data">
        {{ data.value ? data.value : '-' }}
      </template>
      <!-- 판매중 회차 수 -->
      <template #cell(saleCnt)="data">
        {{ data.value ? `${data.value}화` : '0화' }}
      </template>
      <!-- 전체 회차 수 -->
      <template #cell(allCnt)="data">
        {{ data.value ? `${data.value}화` : '0화' }}
      </template>
      <!-- 연재 여부 -->
      <template #cell(isEnd)="data">
        {{ data.value ? data.value : '-' }}
      </template>
      <!-- 연재 상태 -->
      <template #cell(status)="data">
        {{ data.value ? data.value : '-' }}
      </template>
    </b-table>

    <PageSerialTabPreviewModal
      :detect-modal="modalValue"
      modal-id="preview-modal"
      modal-title="소설 요일 미리보기"
      cancel-title="닫기"
      modal-size="xl"
      contents-type="2"
      @close-modal="modalValue = false"
    />
  </b-container>
</template>

<script>
export default {
  name: 'WeekManagementListPage',
  data () {
    return {
      modalValue: false,
      selectedList: [],
      weekdayTabs: [],
      currentDay: null,
      filter: {
        title: ''
      },
      isLoading: false,
      orderList: [],
      items: [],
      fields: [
        { key: 'subOrders', label: '배치순서' },
        { key: 'no', label: '번호' },
        { key: 'thumbnail', label: '썸네일' },
        { key: 'title', label: '제목' },
        { key: 'writer', label: '작가' },
        { key: 'saleCnt', label: '판매중 회차 수' },
        { key: 'allCnt', label: '전체 회차 수' },
        { key: 'isEnd', label: '연재 여부' },
        { key: 'status', label: '연재 상태' }
      ]
    }
  },
  async fetch () {
    await this.getWeekday()
    if (this.currentDay) {
      await this.getList()
    }
  },
  computed: {
    breadcrumb () {
      const arr = [
        { label: '홈', url: '/' },
        { label: '편성모듈 관리', url: '#' },
        { label: '소설 요일 관리', url: this.$route.fullPath }
      ]
      return arr
    }
  },
  watch: {},
  created () {},
  mounted () {},
  methods: {
    async search () {
      await this.getList()
      await this.getWeekday()
    },
    async setOrders () {
      try {
        const res = await this.$axios.put('/api/manager/series/order', this.orderList)
        if (res.status === 200) {
          alert('수정이 완료 되었습니다.')
          await this.getList()
        }
      } catch (e) {
        console.log(e)
      }
    },
    async changeTab (dayId) {
      this.currentDay = dayId
      await this.getList()
    },
    async getList () {
      this.isLoading = true
      try {
        const { status, data: { data } } = await this.$axios.get(`/api/manager/series/list/${this.currentDay}/2`, {
          params: {
            title: this.filter.title
          }
        })

        if (status === 200) {
          this.items = data
          if (this.items && this.items.length > 0) {
            this.orderList = this.items.map((item, idx) => ({ id: item.id, order: item.subOrders }))
          }
        }
      } catch (e) {
        console.log(e)
      } finally {
        this.isLoading = false
      }
    },
    async getWeekday () {
      try {
        const { data: { data } } = await this.$axios.get('/api/manager/series/tab/list/2', {
          params: {
            title: this.filter.title
          }
        })
        this.weekdayTabs = data
        this.currentDay = data[0].id
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>
