<template>
  <b-modal
    id="search-piece-modal"
    title="작품 검색"
    ok-only
    ok-title="등록"
    centered
    scrollable
    size="lg"
    @ok="selectWork"
  >
    <b-row class="px-3">
      <b-col md="12" class="my-2">
        <b-form class="d-flex" @submit.prevent="getList">
          <b-form-input v-model="workName" placeholder="작품검색" class="w-75" />
          <b-button type="submit" variant="primary" class="ml-2">
            검색
          </b-button>
        </b-form>
      </b-col>
    </b-row>
    <b-row class="mt-3 px-3">
      <b-col lg="12" class="my-2">
        <p class="font-weight-700 my-1">
          선택된 작품 목록
        </p>
        <b-table
          class="list"
          :items="selectedWorkList"
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
            <b-form-checkbox v-model="selectedWorkList" :value="data.item" />
          </template>
          <template #cell(id)="data">
            {{ data.item.item.id ? data.item.item.id : '-' }}
          </template>
          <template #cell(title)="data">
            {{ data.item.item.title ? data.item.item.title : '-' }}
          </template>
          <template #cell(writer)="data">
            {{ data.item.item.writer ? data.item.item.writer : '-' }}
          </template>
          <template #cell(genre)="data">
            {{ data.item.item.genre ? data.item.item.genre : '-' }}
          </template>
          <template #cell(cpName)="data">
            {{ data.item.item.cpName ? data.item.item.cpName : '-' }}
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
          :items="workList"
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
            <b-form-checkbox v-model="selectedWorkList" :value="data" />
          </template>
          <template #cell(id)="data">
            {{ data.value ? data.value : '-' }}
          </template>
          <template #cell(title)="data">
            {{ data.value ? data.value : '-' }}
          </template>
          <template #cell(writer)="data">
            {{ data.value ? data.value : '-' }}
          </template>
          <template #cell(genre)="data">
            {{ data.value ? data.value : '-' }}
          </template>
          <template #cell(cpName)="data">
            {{ data.value ? data.value : '-' }}
          </template>
        </b-table>
      </b-col>
    </b-row>
  </b-modal>
</template>

<script>
export default {
  data () {
    return {
      workName: '',
      isLoading: false,
      workList: [],
      totalRows: 0,
      currentPage: 1,
      perPage: 20,
      selectedWorkList: [],
      fields: [
        { key: 'check', label: '' },
        { key: 'id', label: '작품번호' },
        { key: 'title', label: '작품명' },
        { key: 'writer', label: '작가명' },
        { key: 'genre', label: '장르' },
        { key: 'cpName', label: 'CP사' }
      ]
    }
  },
  watch: {},
  methods: {
    selectWork (e) {
      if (this.selectedWorkList.length > 0) {
        this.$emit('select-work', this.selectedWorkList)
        this.selectedWorkList = []
        this.workList = []
        this.workName = ''
      } else {
        e.preventDefault()
        alert('작품을 선택해 주세요.')
      }
    },
    async getList () {
      this.isLoading = true

      try {
        const {
          data: { data }
        } = await this.$axios.get('/api/cartoon/contents/list/main', {
          params: {
            pageNum: this.currentPage,
            pageSize: this.perPage,
            searchType: '작품명',
            searchValue: this.workName
          }
        })
        this.workList = data.list
        this.totalRows = data.total
        this.workName = ''
        this.isLoading = false
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>
