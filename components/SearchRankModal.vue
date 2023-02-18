<template>
  <b-modal
    id="rank-search-works-modal"
    title="작품 검색"
    ok-only
    ok-title="등록"
    centered
    scrollable
    size="xl"
    body-class="pt-2"
    @ok="selectRank"
  >
    <b-container fluid class="px-0" tag="form" @submit.prevent="getList">
      <b-row class="px-3">
        <b-col lg="12" class="my-1">
          <b-form-group
            label="작품 검색"
            label-cols-sm="2"
            label-align-sm="left"
            label-size="sm"
            label-class="align-self-center"
            class="mb-0 align-items-center"
          >
            <b-form-input
              v-model="filter.title"
              class="w-25"
              placeholder="작품명"
            />
          </b-form-group>
        </b-col>
      </b-row>
      <hr class="my-2">
      <b-row align-h="center" class="mb-4">
        <b-col cols="2" class="text-center">
          <b-button type="submit" variant="primary" class="w-60">
            검색
          </b-button>
        </b-col>
      </b-row>
    </b-container>

    <b-row class="mt-3 px-3">
      <b-col lg="12" class="my-2">
        <p class="font-weight-700 my-1">
          선택된 작품 목록
        </p>
        <b-table
          class="list"
          :items="selectedRankList"
          :fields="fields"
          stacked="md"
          show-empty
          small
        >
          <template #empty>
            <h4 class="mt-4">
              작품을 선택해 주세요.
            </h4>
          </template>
          <template #cell(check)="data">
            <b-form-checkbox v-model="selectedRankList" :value="data.item" />
          </template>
          <template #cell(title)="data">
            {{ data.item.title ? data.item.title : '-' }}
          </template>
          <template #cell(writer)="data">
            {{ data.item.writer ? data.item.writer : '-' }}
          </template>
          <template #cell(genre)="data">
            {{ data.item.genre ? data.item.genre : '-' }}
          </template>
          <template #cell(rate)="data">
            {{ data.item.rate ? data.item.rate : '-' }}
          </template>
          <template #cell(serial)="data">
            {{ data.item.serial ? data.item.serial : '-' }}
          </template>
          <template #cell(cp)="data">
            {{ data.item.cp ? data.item.cp : '-' }}
          </template>
        </b-table>
      </b-col>
    </b-row>
    <b-row class="mt-3 px-3">
      <b-col lg="12" class="my-1">
        <p class="font-weight-700 my-1">
          작품 검색 목록
        </p>
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
          <template #cell(check)="data">
            <b-form-checkbox v-model="selectedRankList" :value="data.item" />
          </template>
          <!-- 작품명 -->
          <template #cell(title)="data">
            {{ data.value ? data.value : '-' }}
          </template>
          <!-- 작가명 -->
          <template #cell(writer)="data">
            {{ data.value ? data.value : '-' }}
          </template>
          <!-- 장르 -->
          <template #cell(genre)="data">
            {{ data.value ? data.value : '-' }}
          </template>
          <!-- 연령등급 -->
          <template #cell(rate)="data">
            {{ data.value ? data.value : '-' }}
          </template>
          <!-- 연재요일 -->
          <template #cell(serial)="data">
            {{ data.value ? data.value : '-' }}
          </template>
          <!-- CP사 -->
          <template #cell(cp)="data">
            {{ data.value ? data.value : '-' }}
          </template>
        </b-table>
      </b-col>
    </b-row>
  </b-modal>
</template>

<script>
export default {
  name: 'SearchRankModal',
  props: {
    // moduleType: {
    //   type: Number,
    //   required: true,
    //   default: 1
    // }
  },
  data () {
    return {
      filter: {
        title: ''
      },

      isLoading: false,
      list: [],
      selectedRankList: [],
      fields: [
        { key: 'check', label: '' },
        { key: 'title', label: '작품명' },
        { key: 'writer', label: '작가명' },
        { key: 'genre', label: '장르' },
        { key: 'rate', label: '연령 등급' },
        { key: 'serial', label: '연재 요일' },
        { key: 'cp', label: 'CP사' }
      ]
    }
  },
  watch: {},
  methods: {
    selectRank () {
      this.$emit('select-rank', this.selectedRankList)
      this.selectedRankList = []
      this.list = []
    },

    // async seleckWork (e) {
    //   if (this.selectedRankList.length > 0) {
    //     try {
    //       const res = await this.$axios.post(
    //         `/api/manager/ranking/${this.$route.params.id}`,
    //         {
    //           cartoonId: this.selectedRankList.map(item => item.id)
    //         }
    //       )
    //       console.log(res)
    //       if (res.status === 200) {
    //         this.selectedWorkList = []
    //         this.list = []
    //         this.filter.title = ''
    //         this.$emit('add-work', res.status)
    //       }
    //     } catch (e) {
    //       console.log(e)
    //     }
    //   } else {
    //     e.preventDefault()
    //     alert('작품을 선택해 주세요.')
    //   }
    // },
    async getList () {
      this.isLoading = true

      try {
        const {
          data: { data }
        } = await this.$axios.get('/api/manager/ranking/search', {
          params: this.filter
        })
        this.list = data
        this.isLoading = false
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>
