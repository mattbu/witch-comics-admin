<template>
  <b-container fluid class="page-min-height py-3">
    <UiPageTitle
      title="투고 작품 관리"
      :breadcrumb="breadcrumb"
    />
    <hr>
    <!--    필터-->
    <b-row class="mt-3 px-3">
      <b-col lg="12" class="mt-1 mb-3 d-inline-flex">
        <legend class="pl-0 col-sm-2 fs-14 text-sm-left mb-0 align-self-center">
          <b-form-select v-model="filter.option" :options="filterOptions" class="w-75" />
        </legend>
        <b-form-input v-model="filter.searchValue" placeholder="" class="w-30 align-self-center" />
      </b-col>

      <b-col lg="12" class="my-1">
        <b-form-group
          label="등록일"
          label-cols-sm="2"
          label-align-sm="left"
          label-size="sm"
          class="mb-0"
        >
          <div class="d-inline-flex justify-content-between w-100">
            <div class="d-inline-flex w-40">
              <b-form-datepicker
                v-model="filter.startDate"
                placeholder="선택"
                :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
              />
              <b-form-datepicker
                v-model="filter.endDate"
                placeholder="선택"
                :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
                class="ml-2"
              />
            </div>
            <div>
              <b-button variant="outline-secondary" class="period-btn">
                전체
              </b-button>
              <b-button variant="outline-secondary" class="period-btn">
                오늘
              </b-button>
              <b-button variant="outline-secondary" class="period-btn">
                7일
              </b-button>
              <b-button variant="outline-secondary" class="period-btn">
                1개월
              </b-button>
              <b-button variant="outline-secondary" class="period-btn">
                3개월
              </b-button>
              <b-button variant="outline-secondary" class="period-btn">
                6개월
              </b-button>
              <b-button variant="outline-secondary" class="period-btn">
                1년
              </b-button>
              <b-button variant="outline-secondary" class="period-btn">
                초기화
              </b-button>
            </div>
          </div>
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
    <b-row class="pt-5">
      <b-col align-self="center">
        <h6>투고 작품 목록 (1000)</h6>
      </b-col>
      <b-col align-self="center" class="text-right">
        <b-form-select v-model="filter.order" :options="orderOptions" class="w-30" />
        <b-form-select v-model="filter.perPage" :options="perPageOptions" class="w-50" />
      </b-col>
    </b-row>
    <hr class="my-2">
    <b-row align-h="end" class="mb-4">
      <b-col cols="auto">
        <b-button variant="primary">
          선택 작품 CDN 다시 읽기
        </b-button>
      </b-col>
    </b-row>
    <!-- 테이블 -->
    <b-table
      class="list"
      :items="items"
      :fields="fields"
      :current-page="currentPage"
      :per-page="filter.perPage"
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
        {{ (totalRows - (currentPage - 1) * filter.perPage - (data.index + 1) + 1) }}
      </template>
      <template #cell(thumbnail)="data">
        <div class="thumbnail-wrapper">
          <img :src="data.value" alt="">
        </div>
      </template>
      <template #cell(setting)>
        <b-button variant="outline-secondary" class="table-inner-btn">
          설정
        </b-button>
        <b-button variant="outline-secondary" class="table-inner-btn">
          보기
        </b-button>
      </template>
    </b-table>
    <UiPagination
      class="py-4"
      :page="currentPage"
      :per-page="filter.perPage"
      :total-rows="totalRows"
      @change-page="currentPage = $event"
    />
  </b-container>
</template>

<script>
export default {
  name: 'CsPostedListPage',

  data () {
    return {
      filter: {
        option: 1,
        searchValue: '',
        startDate: '',
        endDate: '',
        order: 1,
        perPage: 10
      },
      filterOptions: [
        { value: 1, text: '작품명' }
      ],
      orderOptions: [
        { value: 1, text: '최신 순' },
        { value: 2, text: '오래된 순' }
      ],
      //
      perPageOptions: [
        { value: 10, text: '10개씩 보기' },
        { value: 20, text: '20개씩 보기' },
        { value: 30, text: '30개씩 보기' },
        { value: 50, text: '50개씩 보기' }
      ],
      searchOptions: [
        { value: 1, text: '작품명' },
        { value: 2, text: '글작가' },
        { value: 3, text: '그림작가' },
        { value: 4, text: '태그' }
      ],
      items: [
        {
          id: 1,
          type: '웹툰',
          genre: '드라마',
          writer: '작가 명',
          painter: '그림작가 명',
          is_adult: 'O',
          thumbnail: require('assets/img/다크_나이트_포스터.jpeg'),
          title: '작품 제목',
          created_at: '2022-10-21',
          admin: '미지정'
        },
        {
          id: 3,
          type: '웹툰',
          genre: '드라마',
          writer: '작가 명',
          painter: '그림작가 명',
          is_adult: 'O',
          thumbnail: require('assets/img/beautiful-rain-forest-ang-ka-nature-trail-doi-inthanon-national-park-thailand-36703721.jpeg'),
          title: '작품 제목',
          created_at: '2022-10-21',
          admin: '미지정'
        },
        {
          id: 5,
          type: '웹툰',
          genre: '드라마',
          writer: '작가 명',
          painter: '그림작가 명',
          is_adult: 'O',
          thumbnail: require('assets/img/Rectangle.png'),
          title: '작품 제목',
          created_at: '2022-10-21',
          admin: '미지정'
        }
      ],
      fields: [
        { key: 'select', label: '' },
        { key: 'no', label: 'No.' },
        { key: 'type', label: '콘텐츠' },
        { key: 'genre', label: '장르' },
        { key: 'writer', label: '글작가' },
        { key: 'painter', label: '그림작가' },
        { key: 'is_adult', label: '성인 여부' },
        { key: 'thumbnail', label: '썸네일' },
        { key: 'title', label: '제목' },
        { key: 'created_at', label: '등록일' },
        { key: 'admin', label: '지정 담당자' },
        { key: 'setting', label: '설정' }
      ],
      //
      totalRows: 1,
      currentPage: 1,
      //
      selectAll: false,
      selectedList: [],
      indeterminate: false
    }
  },
  computed: {
    breadcrumb () {
      const arr = [
        { label: '홈', url: '/' },
        { label: '콘텐츠 관리', url: '#' },
        { label: '투고 작품 관리', url: this.$route.path }
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
