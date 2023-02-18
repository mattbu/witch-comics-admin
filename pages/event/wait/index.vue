<template>
  <b-container fluid class="page-min-height py-3">
    <UiPageTitle
      title="이따무"
      :breadcrumb="breadcrumb"
    >
      <template #buttons>
        <b-button variant="primary" to="/event/wait/add">
          등록
        </b-button>
      </template>
    </UiPageTitle>
    <hr>
    <b-row class="mt-3 px-3">
      <b-col lg="12" class="mt-1 mb-2 d-inline-flex w-100">
        <legend class="pl-0 col-sm-2 fs-14 text-sm-left align-self-center mb-0">
          작품명
        </legend>
        <b-form-input v-model="filter.name" class="w-30 align-self-center mx-2" />
      </b-col>

      <b-col lg="12" class="my-2">
        <b-form-group
          v-slot="{ ariaDescribedby }"
          label="콘텐츠"
          label-cols-sm="2"
          label-align-sm="left"
          label-size="sm"
          class="mb-0"
        >
          <b-form-checkbox-group
            v-model="filter.type"
            :options="typeOptions"
            :aria-describedby="ariaDescribedby"
            class="mt-1"
          />
        </b-form-group>
      </b-col>
    </b-row>
    <hr class="my-2">
    <b-row align-h="center" class="mb-4">
      <b-col cols="2">
        <b-button variant="primary" class="w-75">
          검색
        </b-button>
      </b-col>
    </b-row>
    <b-row align-h="between" class="mt-5">
      <b-col align-self="center">
        <h6>이따무 목록 (20)</h6>
      </b-col>
      <b-col cols="auto" align-self="center" class="w-15">
        <b-form-select v-model="filter.sort" :options="sortOptions" />
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
        <b-button variant="outline-secondary" class="table-inner-btn" :to="`/event/wait/${data.item.id}`">
          상세
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
  name: 'EventWaitPage',
  data () {
    return {
      filter: {
        name: '',
        type: null,
        sort: 1
      },
      typeOptions: [
        { value: 1, text: '전체' },
        { value: 2, text: '웹툰/만화' },
        { value: 3, text: '소설' }
      ],
      sortOptions: [
        { text: '등록순', value: 1 }
      ],
      //
      perPage: 20,
      currentPage: 1,
      totalRows: 0,
      selectAll: false,
      selectedList: [],
      indeterminate: false,

      items: [
        {
          id: 1,
          name: '달빛천사',
          type: '웹툰',
          period: '2022-10-28~2022-10-28',
          time: '12시간',
          recentSetting: '10화',
          admin: 'OOO'
        },
        {
          id: 145,
          name: '달빛천사',
          type: '웹툰',
          period: '2022-10-28~2022-10-28',
          time: '12시간',
          recentSetting: '10화',
          admin: 'OOO'
        },
        {
          id: 1333,
          name: '달빛천사',
          type: '웹툰',
          period: '2022-10-28~2022-10-28',
          time: '12시간',
          recentSetting: '10화',
          admin: 'OOO'
        }
      ],
      fields: [
        { key: 'select', label: '' },
        { key: 'no', label: 'No.' },
        { key: 'name', label: '작품명' },
        { key: 'type', label: '콘텐츠' },
        { key: 'period', label: '기간' },
        { key: 'time', label: '이따무 시간' },
        { key: 'recentSetting', label: '최신화 설정' },
        { key: 'admin', label: '담당자' },
        { key: 'setting', label: '설정' }
      ]
    }
  },
  computed: {
    breadcrumb () {
      const arr = [
        { label: '홈', url: '/' },
        { label: '이벤트', url: '/event/list' },
        { label: '이따무', url: this.$route.fullPath }
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
