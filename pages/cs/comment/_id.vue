<template>
  <b-container fluid class="page-min-height py-3">
    <UiPageTitle
      title="답글 목록"
      :breadcrumb="breadcrumb"
    />
    <hr>
    <b-row class="pt-5">
      <b-col align-self="center">
        <h6>현 댓글</h6>
      </b-col>
    </b-row>
    <hr class="my-2">
    <b-row class="pt-5">
      <b-col align-self="center">
        <h6>답글 검색</h6>
      </b-col>
    </b-row>
    <hr class="my-2">
    <!--    필터-->
    <b-row class="mt-3 px-3">
      <b-col lg="12" class="my-3">
        <b-form-group
          v-slot="{ ariaDescribedby }"
          label="종류"
          label-cols-sm="2"
          label-align-sm="left"
          label-size="sm"
          class="mb-0"
        >
          <b-form-checkbox-group
            v-model="filter.type"
            :aria-describedby="ariaDescribedby"
            class="mt-1"
          >
            <b-form-checkbox value="name">
              전체
            </b-form-checkbox>
            <b-form-checkbox value="age">
              웹툰/만화
            </b-form-checkbox>
            <b-form-checkbox value="age2">
              이벤트
            </b-form-checkbox>
            <b-form-checkbox value="isActive">
              소설
            </b-form-checkbox>
          </b-form-checkbox-group>
        </b-form-group>
      </b-col>

      <b-col lg="12" class="my-1">
        <b-form-group
          label="기간"
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
        <h6>댓글 목록</h6>
      </b-col>
      <b-col align-self="center" class="text-right">
        <b-form-select v-model="filter.order" :options="orderOptions" class="w-30" />
        <b-form-select v-model="filter.perPage" :options="perPageOptions" class="w-50" />
      </b-col>
    </b-row>
    <hr class="my-2">
    <b-row align-h="between" class="mb-4">
      <b-col cols="auto">
        <b-button variant="outline-primary" class="table-inner-btn">
          전체 (200)
        </b-button>
        <b-button variant="outline-primary" class="table-inner-btn">
          신고
        </b-button>
        <b-button variant="outline-primary" class="table-inner-btn">
          숨김
        </b-button>
      </b-col>
      <b-col cols="auto">
        <b-button variant="primary">
          삭제
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
      <template #cell(reply)="data">
        <NuxtLink :to="`/cs/comment/${data.item.id}`">
          {{ data.value }}
        </NuxtLink>
      </template>
      <template #cell(setting)>
        <b-button variant="outline-secondary" class="table-inner-btn">
          숨김
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
  name: 'CsCommentDetailPage',

  data () {
    return {
      filter: {
        title: '',
        type: null,
        startDate: '',
        endDate: '',
        order: 1,
        perPage: 10
      },
      isSearched: false,
      isSelected: false,
      editionOptions: [
        { value: 1, text: '전체' },
        { value: 2, text: '1화' },
        { value: 3, text: '2화' },
        { value: 4, text: '3화' },
        { value: 5, text: '4화' },
        { value: 6, text: '5화' },
        { value: 7, text: '6화' },
        { value: 8, text: '7화' },
        { value: 9, text: '8화' },
        { value: 10, text: '9화' },
        { value: 11, text: '10화' },
        { value: 12, text: '11화' },
        { value: 13, text: '12화' },
        { value: 14, text: '13화' },
        { value: 15, text: '14화' },
        { value: 16, text: '15화' },
        { value: 17, text: '16화' },
        { value: 18, text: '17화' },
        { value: 19, text: '18화' },
        { value: 20, text: '19화' },
        { value: 21, text: '20화' },
        { value: 1, text: '전체' },
        { value: 2, text: '1화' },
        { value: 3, text: '2화' },
        { value: 4, text: '3화' },
        { value: 5, text: '4화' },
        { value: 6, text: '5화' },
        { value: 7, text: '6화' },
        { value: 8, text: '7화' },
        { value: 9, text: '8화' },
        { value: 10, text: '9화' },
        { value: 11, text: '10화' },
        { value: 12, text: '11화' },
        { value: 13, text: '12화' },
        { value: 14, text: '13화' },
        { value: 15, text: '14화' },
        { value: 16, text: '15화' },
        { value: 17, text: '16화' },
        { value: 18, text: '17화' },
        { value: 19, text: '18화' },
        { value: 20, text: '19화' },
        { value: 21, text: '20화' },
        { value: 1, text: '전체' },
        { value: 2, text: '1화' },
        { value: 3, text: '2화' },
        { value: 4, text: '3화' },
        { value: 5, text: '4화' },
        { value: 6, text: '5화' },
        { value: 7, text: '6화' },
        { value: 8, text: '7화' },
        { value: 9, text: '8화' },
        { value: 10, text: '9화' },
        { value: 11, text: '10화' },
        { value: 12, text: '11화' },
        { value: 13, text: '12화' },
        { value: 14, text: '13화' },
        { value: 15, text: '14화' },
        { value: 16, text: '15화' },
        { value: 17, text: '16화' },
        { value: 18, text: '17화' },
        { value: 19, text: '18화' },
        { value: 20, text: '19화' },
        { value: 21, text: '20화' },
        { value: 1, text: '전체' },
        { value: 2, text: '1화' },
        { value: 3, text: '2화' },
        { value: 4, text: '3화' },
        { value: 5, text: '4화' },
        { value: 6, text: '5화' },
        { value: 7, text: '6화' },
        { value: 8, text: '7화' },
        { value: 9, text: '8화' },
        { value: 10, text: '9화' },
        { value: 11, text: '10화' },
        { value: 12, text: '11화' },
        { value: 13, text: '12화' },
        { value: 14, text: '13화' },
        { value: 15, text: '14화' },
        { value: 16, text: '15화' },
        { value: 17, text: '16화' },
        { value: 18, text: '17화' },
        { value: 19, text: '18화' },
        { value: 20, text: '19화' },
        { value: 21, text: '20화' }
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
          id: 5,
          type: '웹툰',
          title: '작품 제목',
          comment: '존나 재밌어요 ㅋ',
          reply: '103',
          writer: 'OOO',
          created_at: '2022-10-21',
          yn: 'O',
          reason: '비속어',
          status: '숨김'
        },
        {
          id: 1,
          type: '웹툰',
          title: '작품 제목',
          comment: '존나 재밌어요 ㅋ',
          reply: '101',
          writer: 'OOO',
          created_at: '2022-10-21',
          yn: 'O',
          reason: '비속어',
          status: '숨김'
        },
        {
          id: 3,
          type: '웹툰',
          title: '작품 제목',
          comment: '존나 재밌어요 ㅋ',
          reply: '180',
          writer: 'OOO',
          created_at: '2022-10-21',
          yn: 'O',
          reason: '비속어',
          status: '숨김'
        }
      ],
      fields: [
        { key: 'select', label: '' },
        { key: 'no', label: 'No.' },
        { key: 'type', label: '종류' },
        { key: 'title', label: '제목' },
        { key: 'comment', label: '작성 내용' },
        { key: 'reply', label: '답글' },
        { key: 'writer', label: '작성자' },
        { key: 'created_at', label: '등록일' },
        { key: 'yn', label: '신고 여부' },
        { key: 'reason', label: '신고 사유' },
        { key: 'status', label: '상태' },
        { key: 'setting', label: '관리' }
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
        { label: '댓글 관리', url: '/cs/comment' },
        { label: '답글 목록', url: this.$route.path }
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
