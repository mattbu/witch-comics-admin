<template>
  <b-container fluid class="page-min-height py-3">
    <UiPageTitle title="팝업 관리" :breadcrumb="breadcrumb">
      <template #buttons>
        <b-button variant="primary" to="/cs/popup/add">
          등록
        </b-button>
      </template>
    </UiPageTitle>
    <hr>
    <!--    필터-->
    <b-row class="mt-3 px-3">
      <b-col lg="12" class="my-1">
        <b-form inline>
          <legend class="pl-0 col-sm-2 fs-14 text-sm-left">
            제목
          </legend>
          <b-form-input v-model="filter.title" placeholder="제목" />
        </b-form>
      </b-col>

      <b-col lg="12" class="my-1">
        <b-form-group
          v-slot="{ ariaDescribedby }"
          label="상태"
          label-cols-sm="2"
          label-align-sm="left"
          label-size="sm"
          class="mb-0"
        >
          <b-form-checkbox-group
            v-model="filter.selectedStatus"
            :options="statusOptions"
            :aria-describedby="ariaDescribedby"
            class="mt-1"
          />
        </b-form-group>
      </b-col>

      <b-col lg="12" class="my-1">
        <b-form-group
          v-slot="{ ariaDescribedby }"
          label="표시 여부"
          label-cols-sm="2"
          label-align-sm="left"
          label-size="sm"
          class="mb-0"
        >
          <b-form-checkbox-group
            v-model="filter.selectedDisplay"
            :options="displayOptions"
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
    <b-row class="pt-5" align-h="between">
      <b-col align-self="center">
        <h6>팝업 목록 (30)</h6>
      </b-col>
      <b-col
        v-if="false"
        align-self="center"
        class="d-inline-flex justify-content-end"
      >
        <b-form-select
          v-model="selectedOrder"
          :options="orderOptions"
          class="w-30"
        />
        <b-form-select
          v-model="perPage"
          :options="perPageOptions"
          class="w-30 ml-2"
        />
      </b-col>
    </b-row>
    <hr class="my-2">
    <b-row align-h="end" class="mb-4">
      <b-col cols="auto">
        <b-button variant="primary">
          미리보기
        </b-button>
      </b-col>
    </b-row>
    <!-- 테이블 -->
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
      <template #table-colgroup>
        <col style="width: 10%">
      </template>
      <template #empty>
        <PageNoResult />
      </template>
      <template #cell(order)="data">
        <b-form-input v-model="data.value" class="w-100" />
      </template>
      <template #cell(no)="data">
        {{ totalRows - (currentPage - 1) * perPage - (data.index + 1) + 1 }}
      </template>
      <template #cell(setting)>
        <b-button variant="outline-secondary" class="table-inner-btn">
          삭제
        </b-button>
        <b-button variant="outline-secondary" class="table-inner-btn">
          해제
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
  name: 'CsPopUpListPage',
  data () {
    return {
      filter: {
        title: '',
        selectedStatus: [],
        selectedDisplay: []
      },
      statusOptions: [
        { value: 2, text: '개시' },
        { value: 3, text: '대기' },
        { value: 4, text: '종료' }
      ],
      displayOptions: [
        { value: 2, text: '일반/성인' },
        { value: 2, text: '일반' },
        { value: 2, text: '성인' }
      ],
      selectedOrder: 1,
      orderOptions: [
        { value: 1, text: '인기순' },
        { value: 2, text: '최신순' }
      ],
      currentPage: 1,
      totalRows: 0,
      perPage: 10,
      perPageOptions: [
        { value: 10, text: '10개씩 보기' },
        { value: 20, text: '20개씩 보기' },
        { value: 30, text: '30개씩 보기' },
        { value: 50, text: '50개씩 보기' }
      ],
      items: [
        {
          id: 1233,
          order: 1,
          title: '제목',
          is_adult: '성인여부',
          start_date: '2022-10-20',
          end_date: '2022-10-20',
          status: '상태',
          created_at: '2022-10-20',
          admin: '000'
        },
        {
          id: 12332,
          order: 2,
          title: '제목',
          is_adult: '성인여부',
          start_date: '2022-10-20',
          end_date: '2022-10-20',
          status: '상태',
          created_at: '2022-10-20',
          admin: '000'
        },
        {
          id: 12334,
          order: 3,
          title: '제목',
          is_adult: '성인여부',
          start_date: '2022-10-20',
          end_date: '2022-10-20',
          status: '상태',
          created_at: '2022-10-20',
          admin: '000'
        }
      ],
      fields: [
        { key: 'order', label: '노출 순서' },
        { key: 'no', label: '번호' },
        //
        { key: 'title', label: '제목' },
        { key: 'is_adult', label: '성인여부' },
        { key: 'start_date', label: '시작일' },
        { key: 'end_date', label: '종료일' },
        { key: 'status', label: '상태' },
        { key: 'created_at', label: '등록일' },
        { key: 'admin', label: '게시자' },
        { key: 'setting', label: '관리' }
      ]
    }
  },
  computed: {
    breadcrumb () {
      const arr = [
        { label: '홈', url: '/' },
        { label: '서비스 운영 관리', url: '#' },
        { label: '팝업 관리', url: this.$route.path }
      ]
      return arr
    }
  },
  watch: {},
  created () {},
  mounted () {
    this.totalRows = this.items.length
  },
  methods: {}
}
</script>
