<template>
  <b-container fluid class="page-min-height py-3">
    <UiPageTitle
      title="정책 관리"
      :breadcrumb="breadcrumb"
    >
      <template #buttons>
        <b-button variant="primary" to="/setting/policy/add">
          정책 등록
        </b-button>
      </template>
    </UiPageTitle>
    <hr>
    <b-row align-h="between" class="mt-5">
      <b-col align-self="center">
        <h6>정책 목록 (20)</h6>
      </b-col>
      <b-col cols="auto" align-self="center" class="w-15">
        <b-form-select v-model="sort" :options="sortOptions" />
      </b-col>
    </b-row>
    <hr class="my-2">
    <b-row align-h="end" class="mb-2">
      <b-col cols="auto">
        <b-button variant="primary">
          삭제
        </b-button>
      </b-col>
    </b-row>
    <b-table
      class="list"
      :items="items"
      :fields="fields"
      :current-page="currentPage"
      :per-page="perPage"
      stacked="md"
      show-empty
      small
    >
      <template #head(select)>
        <b-form-checkbox
          v-model="selectAll"
          :indeterminate="indeterminate"
          @change="toggleAll"
        />
      </template>
      <template #cell(select)="data">
        <b-form-checkbox v-model="selectedList" :value="data.item.id" style="float: unset" />
      </template>
      <template #cell(no)="data">
        {{ (totalRows - (currentPage - 1) * perPage - (data.index + 1) + 1) }}
      </template>
      <template #cell(setting)="data">
        <b-button variant="outline-secondary" class="table-inner-btn" :to="`/setting/policy/${data.item.id}`">
          보기
        </b-button>
      </template>
    </b-table>
    <UiPagination
      class="py-4"
      :page="currentPage"
      :per-page="perPage"
      :total-rows="totalRows"
      @change-page="currentPage = $event"
    />
  </b-container>
</template>

<script>
export default {
  name: 'SettingPolicyListPage',
  data () {
    return {
      sort: 1,
      sortOptions: [
        { text: '최신순', value: 1 }
      ],
      perPage: 10,
      totalRows: 1,
      currentPage: 1,
      //
      selectAll: false,
      selectedList: [],
      indeterminate: false,

      items: [
        {
          id: 1,
          type: '이용 약관',
          title: '서비스 이용약관에 대하여',
          created_at: '2022-10-21 12:00:00',
          admin: 'OOO'
        },
        {
          id: 12,
          type: '이용 약관',
          title: '서비스 이용약관에 대하여',
          created_at: '2022-10-21 12:00:00',
          admin: 'OOO'
        },
        {
          id: 21,
          type: '이용 약관',
          title: '서비스 이용약관에 대하여',
          created_at: '2022-10-21 12:00:00',
          admin: 'OOO'
        }
      ],
      fields: [
        { key: 'select', label: '' },
        { key: 'no', label: 'No.' },
        { key: 'type', label: '작성 항목' },
        { key: 'title', label: '제목' },
        { key: 'created_at', label: '작성일' },
        { key: 'admin', label: '등록자' },
        { key: 'setting', label: '관리' }
      ]
    }
  },
  computed: {
    breadcrumb () {
      const arr = [
        { label: '홈', url: '/' },
        { label: '설정', url: '#' },
        { label: '정책 관리', url: this.$route.path }
      ]
      return arr
    }
  },
  watch: {
    selectedList (val) {
      if (val.length === 0) {
        this.indeterminate = false
        this.selectAll = false
      } else if (val.length === this.items.length) {
        this.indeterminate = false
        this.selectAll = true
      } else {
        this.indeterminate = true
        this.selectAll = false
      }
    }
  },
  created () {},
  mounted () {
    this.totalRows = this.items.length
  },
  methods: {
    toggleAll (checked) {
      if (checked) {
        this.selectedList = this.items.map(item => item.id)
      } else {
        this.selectedList = []
      }
    }
  }
}
</script>
