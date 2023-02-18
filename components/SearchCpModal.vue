<template>
  <b-modal
    id="search-cp-modal"
    title="CP사 검색"
    ok-only
    ok-title="등록"
    centered
    scrollable
    size="lg"
    @ok="selectCp"
  >
    <b-row class="px-3">
      <b-col md="12" class="my-2">
        <b-form class="d-flex" @submit.prevent="getList">
          <b-form-input v-model="cpName" placeholder="CP사" class="w-75" />
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
              <th>선택된 CP사</th>
              <td>
                <p>{{ currentCp.name ? currentCp.name : '-' }}</p>
              </td>
            </tr>
          </tbody>
        </table>
      </b-col>
    </b-row>
    <b-row class="mt-3 px-3">
      <b-col lg="12" class="my-1">
        <p class="font-weight-700 my-1">
          CP사 검색 목록
        </p>
        <b-table
          class="list"
          :items="cpList"
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
            <b-form-radio v-model="currentCp" :value="data.item" />
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
      cpName: '',
      isLoading: false,
      cpList: [],
      totalRows: 0,
      currentPage: 1,
      perPage: 20,
      fields: [
        { key: 'check', label: '' },
        { key: 'name', label: 'CP사명' }
      ],
      currentCp: {}
    }
  },
  watch: {},
  methods: {
    selectCp (e) {
      if (this.currentCp.id) {
        this.$emit('select-cp', this.currentCp)
        this.cpList = []
        this.cpName = ''
        this.currentCp = {}
      } else {
        e.preventDefault()
        alert('CP사를 선택해 주세요.')
      }
    },
    async getList () {
      this.isLoading = true

      try {
        const {
          data: { data }
        } = await this.$axios.get('/api/cartoon/manager/cpList', {
          params: {
            pageNum: this.currentPage,
            pageSize: this.perPage,
            searchName: this.cpName
          }
        })
        this.cpList = data.list
        this.totalRows = data.total
        this.cpName = ''
        this.isLoading = false
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>
