<template>
  <b-modal
    id="search-publisher-modal"
    title="출판사 검색"
    ok-only
    ok-title="등록"
    centered
    scrollable
    size="lg"
    @ok="selectPublisher"
  >
    <b-row class="px-3">
      <b-col md="12" class="my-2">
        <b-form class="d-flex" @submit.prevent="getList">
          <b-form-input v-model="publisherName" placeholder="출판사검색" class="w-75" />
          <b-button type="submit" variant="primary" class="ml-2">
            검색
          </b-button>
        </b-form>
      </b-col>
    </b-row>
    <b-row class="mt-3 px-3">
      <b-col lg="12" class="my-2">
        <table class="table border mb-0 table-layout-fixed center-box">
          <colgroup>
            <col style="width: 15%">
            <col>
            <col style="width: 10%">
            <col>
          </colgroup>
          <tbody>
            <tr>
              <th>선택된 출판사</th>
              <td>
                <p>{{ currentPublisher.name ? currentPublisher.name : '-' }}</p>
              </td>
            </tr>
          </tbody>
        </table>
      </b-col>
    </b-row>
    <b-row class="mt-3 px-3">
      <b-col lg="12" class="my-1">
        <p class="font-weight-700 my-1">
          출판사 검색 목록
        </p>
        <b-table
          class="list"
          :items="publisherList"
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
            <b-form-radio v-model="currentPublisher" :value="data.item" />
          </template>
          <template #cell(name)="data">
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
      publisherName: '',
      isLoading: false,
      publisherList: [],
      totalRows: 0,
      currentPage: 1,
      perPage: 20,
      fields: [
        { key: 'check', label: '' },
        { key: 'name', label: '출판사명' }
      ],
      currentPublisher: {}
    }
  },
  methods: {
    selectPublisher (e) {
      if (this.currentPublisher.id) {
        this.$emit('select-publisher', this.currentPublisher)
        this.publisherList = []
        this.publisherName = ''
        this.currentPublisher = {}
      } else {
        e.preventDefault()
        alert('출판사를 선택해 주세요.')
      }
    },
    async getList () {
      this.isLoading = true

      try {
        const {
          data: { data }
        } = await this.$axios.get('/api/cartoon/manager/publisherList', {
          params: {
            pageNum: this.currentPage,
            pageSize: this.perPage,
            publisherName: this.publisherName
          }
        })
        this.publisherList = data.list
        this.totalRows = data.total
        this.publisherName = ''
        this.isLoading = false
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>
