<template>
  <b-container fluid class="page-min-height py-3">
    <UiPageTitle :title="title" :breadcrumb="breadcrumb">
      <template #buttons>
        <b-button variant="primary" @click="openPreviewModal">
          미리보기
        </b-button>
        <b-button variant="primary">
          적용
        </b-button>
      </template>
    </UiPageTitle>
    <hr>
    <!--    필터-->
    <b-container fluid class="px-0" tag="form" @submit.prevent="getList">
      <b-row class="mt-3 px-3">
        <b-col lg="12" class="my-1">
          <b-form-group
            label="작품 검색"
            label-cols-sm="2"
            label-align-sm="left"
            label-size="sm"
            class="mb-0"
          >
            <b-form-input class="w-30" />
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
          v-model="selectedUsers"
          :value="data.item.id"
          style="float: unset"
        />
      </template>
      <!-- 번호 -->
      <template #cell(no)="data">
        {{ data.index + 1 }}
      </template>
      <!-- 썸네일 -->
      <template #cell(title)="data">
        {{ data.value ? data.value : '-' }}
      </template>
      <!-- 제목 -->
      <template #cell(name)="data">
        {{ data.value ? data.value : '-' }}
      </template>
      <!-- 작가 -->
      <template #cell(price)="data">
        {{ data.value ? `${paintMoneyComma(data.value)}원` : '0원' }}
      </template>
      <!-- 할인율 -->
      <template #cell(discountRate)="data">
        {{ data.value ? `${data.value}%` : '0%' }}
      </template>
      <!-- 판매중 회차 수 -->
      <template #cell(showPrice)="data">
        {{ data.value ? `${paintMoneyComma(data.value)}원` : '0원' }}
      </template>
    </b-table>

    <PageSerialTabPreviewModal
      modal-id="preview-modal"
      modal-title="웹툰/만화 요일 미리보기"
      cancel-title="닫기"
      modal-size="xl"
    />
  </b-container>
</template>

<script>
export default {
  name: 'WeekManagementListPage',
  data () {
    return {
      selectedList: [],
      items: [],
      fields: [
        { key: 'select', label: '배치순서' },
        { key: 'no', label: '번호' },
        { key: 'thumbnail', label: '썸네일' },
        { key: 'title', label: '제목' },
        { key: 'writer', label: '작가' },
        { key: 'episode', label: '판매중 회차 수' },
        { key: 'all_episode', label: '전체 회차 수' },
        { key: 'is_show', label: '연재 여부' },
        { key: 'status', label: '연재 상태' }
      ],
      weekdayTabs: [],
      contentsType: '',
      currentDay: null,
      isLoading: false
    }
  },
  async fetch () {
    await this.getWeekday()
    if (this.currentDay) {
      await this.getList()
    }
  },
  computed: {
    title () {
      if (this.contentsType === '1') { return '웹툰/만화 요일 관리' } else if (this.contentsType === '2') { return '소설 요일 관리' }
      return '요일 관리'
    },
    breadcrumb () {
      const arr = [
        { label: '홈', url: '/' },
        { label: '편성모듈 관리', url: '#' },
        { label: this.title, url: this.$route.fullPath }
      ]
      return arr
    }
  },
  watch: {
    '$route.query.type' (val) {
      if (val === 'webtoon') {
        this.contentsType = '1'
      } else if (val === 'novel') {
        this.contentsType = '2'
      }
    }
  },
  created () {
    if (this.$route.query.type === 'webtoon') {
      this.contentsType = '1'
    } else if (this.$route.query.type === 'novel') {
      this.contentsType = '2'
    }
  },
  mounted () {},
  methods: {
    async changeTab (dayId) {
      this.currentDay = dayId
      await this.getList()
    },
    async getList () {
      this.isLoading = true
      try {
        const { status, data: { data } } = await this.$axios.get(`/api/manager/series/list/${this.currentDay}/${this.contentsType}`)

        if (status === 200) {
          this.items = data
        }
      } catch (e) {
        console.log(e)
      } finally {
        this.isLoading = false
      }
    },
    async getWeekday () {
      try {
        const { data: { data } } = await this.$axios.get('/api/manager/series/tab/list')
        this.weekdayTabs = data
        this.currentDay = data[0].id
      } catch (e) {
        console.log(e)
      }
    },
    openPreviewModal () {
      this.$root.$emit('bv::show::modal', 'preview-modal')
    }
  }
}
</script>
