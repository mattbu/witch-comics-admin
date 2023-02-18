<template>
  <b-modal
    id="search-piece-modal"
    title="작품 검색"
    ok-only
    ok-title="등록"
    centered
    scrollable
    size="lg"
    @ok="selectPiece"
  >
    <b-row class="px-3">
      <b-col md="12" class="my-2">
        <b-form class="d-flex" @submit.prevent="getList">
          <b-form-input v-model="title" placeholder="작품검색" class="w-50" />
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
          :items="selectedPieceList"
          :fields="fields"
          stacked="md"
          show-empty
          small
        >
          <template #table-colgroup="scope">
            <col
              v-for="field in scope.fields"
              :key="field.key"
              :style="{ width: field.key === 'check' ? '10px' : '120px' }"
            >
          </template>
          <template #empty>
            <h4 class="mt-4">
              작품를 선택해 주세요.
            </h4>
          </template>
          <template #cell(check)="data">
            <b-form-checkbox v-model="selectedPieceList" :value="data.item" />
          </template>
          <template #cell(title)="data">
            {{ data.item.title ? data.item.title : '-' }}
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
          :items="pieceList"
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
            <b-form-checkbox v-model="selectedPieceList" :value="data.item" />
          </template>
          <template #cell(title)="data">
            {{ data.value ? data.value : '-' }}
          </template>
        </b-table>
      </b-col>
    </b-row>
  </b-modal>
</template>

<script>
export default {
  props: {},
  data () {
    return {
      title: '',
      isLoading: false,
      pieceList: [],
      totalRows: 0,
      currentPage: 1,
      perPage: 20,
      selectedPieceList: [],
      fields: [
        { key: 'check', label: '' },
        { key: 'name', label: '작품명' }
      ]
    }
  },
  async fetch () {
    await this.getList()
  },
  watch: {},
  methods: {
    selectPiece (e) {
      if (this.selectedPieceList.length > 0) {
        this.$emit('select-work', this.selectedPieceList)
        this.selectedPieceList = []
        this.pieceList = []
        this.title = ''
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
        } = await this.$axios.get('/api/manager/free/main/list', {
          params: {
            pageNum: this.currentPage,
            pageSize: this.perPage,
            title: this.title
          }
        })
        this.pieceList = data.splice(0, 20)
        this.title = ''
        this.isLoading = false
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>
