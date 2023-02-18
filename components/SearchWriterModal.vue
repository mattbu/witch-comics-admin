<template>
  <b-modal
    id="search-writer-modal"
    :title="`${checkWriterType()}작가 검색`"
    ok-only
    ok-title="등록"
    centered
    scrollable
    size="lg"
    @ok="selectWriter"
  >
    <b-row class="px-3">
      <b-col md="12" class="my-2">
        <b-form class="d-flex" @submit.prevent="getList">
          <b-form-input
            v-model="writerName"
            placeholder="작가검색"
            class="w-75"
          />
          <b-button type="submit" variant="primary" class="ml-2">
            검색
          </b-button>
        </b-form>
      </b-col>
    </b-row>
    <b-row class="mt-3 px-3">
      <b-col lg="12" class="my-2">
        <p class="font-weight-700 my-1">
          선택된 작가 목록
        </p>
        <b-table
          class="list"
          :items="selectedWriterList"
          :fields="fields"
          stacked="md"
          show-empty
          small
        >
          <template #empty>
            <h4 class="mt-4">
              작가를 선택해 주세요.
            </h4>
          </template>
          <template #cell(check)="data">
            <b-form-checkbox v-model="selectedWriterList" :value="data.item" />
          </template>
          <template #cell(penName)="data">
            {{ data.item.penName ? data.item.penName : '-' }}
          </template>
        </b-table>
      </b-col>
    </b-row>
    <b-row class="mt-3 px-3">
      <b-col lg="12" class="my-1">
        <p class="font-weight-700 my-1">
          작가 검색 목록
        </p>
        <b-table
          class="list"
          :items="writerList"
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
            <b-form-checkbox v-model="selectedWriterList" :value="data.item" />
          </template>
          <template #cell(penName)="data">
            {{ data.value ? data.value : '-' }}
          </template>
        </b-table>
      </b-col>
    </b-row>
  </b-modal>
</template>

<script>
export default {
  props: {
    modalType: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      writerName: '',
      isLoading: false,
      writerList: [],
      totalRows: 0,
      currentPage: 1,
      perPage: 20,
      selectedWriterList: [],
      fields: [
        { key: 'check', label: '' },
        { key: 'penName', label: '작가명' }
      ]
    }
  },
  methods: {
    checkWriterType () {
      if (this.modalType === 'WRITER') {
        return '글'
      } else if (this.modalType === 'ILLUSTRATOR') {
        return '그림'
      }
      return '원'
    },
    selectWriter (e) {
      if (this.selectedWriterList.length > 0) {
        const obj = {
          type: this.modalType,
          list: this.selectedWriterList
        }
        this.$emit('select-writer', obj)
        this.selectedWriterList = []
        this.writerList = []
        this.writerName = ''
      } else {
        e.preventDefault()
        alert(`${this.checkWriterType()}작가를 선택해 주세요.`)
      }
    },
    async getList () {
      this.isLoading = true

      try {
        const {
          data: { data }
        } = await this.$axios.get('/api/cartoon/manager/writerList', {
          params: {
            pageNum: this.currentPage,
            pageSize: this.perPage,
            penName: this.writerName
          }
        })
        this.writerList = data.list
        this.totalRows = data.total
        this.writerName = ''
        this.isLoading = false
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>
