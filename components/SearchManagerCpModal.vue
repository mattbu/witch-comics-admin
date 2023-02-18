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
          <b-form-input v-model="cp" placeholder="CP사 검색" class="w-50" />
          <b-button type="submit" variant="primary" class="ml-2">
            검색
          </b-button>
        </b-form>
      </b-col>
    </b-row>
    <b-row class="mt-3 px-3">
      <b-col lg="12" class="my-2">
        <p class="font-weight-700 my-1">
          선택된 CP사 목록
        </p>
        <b-table
          class="list"
          :items="selectedCpList"
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
              CP사를 선택해 주세요.
            </h4>
          </template>
          <template #cell(check)="data">
            <b-form-checkbox v-model="selectedCpList" :value="data.item" />
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
            <b-form-checkbox v-model="selectedCpList" :value="data.item" />
          </template>
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
  props: {},
  data () {
    return {
      cp: '',
      isLoading: false,
      cpList: [],
      totalRows: 0,
      currentPage: 1,
      perPage: 20,
      selectedCpList: [],
      fields: [
        { key: 'check', label: '' },
        { key: 'cp', label: 'CP사' }
      ]
    }
  },
  async fetch () {
    await this.getList()
  },
  watch: {},
  methods: {
    selectCp (e) {
      if (this.selectedCpList.length > 0) {
        this.$emit('select-work', this.selectedCpList)
        this.selectedCpList = []
        this.cpList = []
        this.cp = ''
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
        } = await this.$axios.get('/api/manager/admin/master/find/cp', {
          params: {
            pageNum: this.currentPage,
            pageSize: this.perPage,
            cp: this.cp
          }
        })
        this.cpList = data.splice(0, 20)
        this.cp = ''
        this.isLoading = false
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>
