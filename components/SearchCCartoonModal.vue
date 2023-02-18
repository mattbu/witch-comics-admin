<template>
  <b-modal
    id="search-c-cartoon-modal"
    title="작품 검색"
    ok-only
    ok-title="등록"
    centered
    scrollable
    size="xl"
    @ok="onSave"
  >
    <b-row class="px-3">
      <b-col md="12" class="my-2">
        <b-form class="d-flex" @submit.prevent="getList">
          <b-form-input v-model="keyword" placeholder="작품명" class="w-50" />
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
          :items="selectedItems"
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
            <b-form-checkbox
              v-model="selectedItems"
              :value="data.item"
              @click="removeItem(data.item)"
            />
          </template>
          <template #cell(title)="data">
            <div style="max-width: 200px">
              ({{ data.item.id }}){{ data.value ? data.value : '-' }}
            </div>
          </template>
          <template #cell()="data">
            {{ data.value === '' ? '-' : data.value }}
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
          :items="items"
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
            <b-form-checkbox v-model="selectedItems" :value="data.item" />
          </template>
          <template #cell(title)="data">
            <div style="max-width: 200px">
              ({{ data.item.id }}){{ data.value ? data.value : '-' }}
            </div>
          </template>
          <template #cell()="data">
            {{ data.value === '' ? '-' : data.value }}
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
      keyword: '',
      isLoading: false,
      items: [],
      selectedItems: [],
      fields: [
        { key: 'check', label: '' },
        { key: 'title', label: '작품명' },
        { key: 'writer', label: '작가명' },
        { key: 'genre', label: '장르' },
        { key: 'rate', label: '연령등급' },
        { key: 'serial', label: '연재요일' },
        { key: 'cp', label: 'CP사' }
      ]
    }
  },
  methods: {
    onSave (e) {
      if (this.selectedItems.length > 0) {
        const arr = this.selectedItems.map((item) => {
          return item.id
        })
        this.$emit('on-save', arr)
        this.selectedItems = []
        this.items = []
        this.keyword = ''
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
        } = await this.$axios.get('/api/manager/schedule/acartoon/search', {
          params: {
            title: this.keyword
          }
        })
        this.items = data
        this.keyword = ''
        this.isLoading = false
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>
