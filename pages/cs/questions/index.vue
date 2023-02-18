<template>
  <b-container fluid class="page-min-height py-3">
    <UiPageTitle title="1:1 문의사항 관리" :breadcrumb="breadcrumb">
      <template #buttons>
        <b-button variant="primary" to="/cs/questions/add">
          등록
        </b-button>
      </template>
    </UiPageTitle>
    <hr>
    <!-- 필터 -->
    <b-row class="px-3">
      <b-col lg="12" class="mb-2">
        <b-form-group
          label="검색"
          label-cols-sm="2"
          label-align-sm="left"
          label-size="sm"
          class="align-items-center"
        >
          <div class="d-flex">
            <b-form-select
              v-model="filter.search"
              :options="searchOptions"
              class="w-15"
            />
            <b-form-input v-model="searchValue" class="ml-2 w-25" />
          </div>
        </b-form-group>
      </b-col>
    </b-row>
    <b-row class="px-3">
      <b-col lg="12" class="my-1">
        <b-form-group
          label="작성일"
          label-cols-sm="2"
          label-align-sm="left"
          label-size="sm"
          class="mb-0"
        >
          <div class="d-inline-flex justify-content-start w-100">
            <div class="d-inline-flex w-30">
              <b-form-datepicker
                v-model="filter.startDate"
                label-help=""
                hide-header
                placeholder="선택"
                :date-format-options="{
                  year: 'numeric',
                  month: 'numeric',
                  day: 'numeric'
                }"
              />
              <span class="mx-2 align-self-center">~</span>
              <b-form-datepicker
                v-model="filter.endDate"
                label-help=""
                hide-header
                placeholder="선택"
                :date-format-options="{
                  year: 'numeric',
                  month: 'numeric',
                  day: 'numeric'
                }"
              />
            </div>
          </div>
        </b-form-group>
      </b-col>
    </b-row>
    <b-row class="px-3">
      <b-col lg="12" class="">
        <b-form-group
          v-slot="{ ariaDescribedby }"
          label="답변 상태"
          label-cols-sm="2"
          label-align-sm="left"
          label-size="sm"
          class="mb-0"
        >
          <b-form-checkbox-group
            id="checkbox-group-1"
            v-model="filter.status"
            class="my-2"
            :options="statusOptions"
            :aria-describedby="ariaDescribedby"
            name=""
          />
        </b-form-group>
      </b-col>
    </b-row>
    <b-row class="px-3">
      <b-col lg="12" class="">
        <b-form-group
          v-slot="{ ariaDescribedby }"
          label="항목"
          label-cols-sm="2"
          label-align-sm="left"
          label-size="sm"
          class="mb-0"
        >
          <b-form-checkbox-group
            id="checkbox-group-1"
            v-model="filter.item"
            class="my-2"
            :options="itemOptions"
            :aria-describedby="ariaDescribedby"
            name=""
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
    <b-row class="pt-5">
      <b-col align-self="center">
        <h6>1:1 문의사항 목록 ({{ totalRows ? totalRows : '0' }})</h6>
      </b-col>
      <!-- <b-col align-self="center" class="text-right">
        <b-form-select
          v-model="filter.order"
          :options="orderOptions"
          class="w-20"
        /> -->
        <!-- <b-form-select
          v-model="filter.perPage"
          :options="perPageOptions"
          class="w-50"
        /> -->
      <!-- </b-col> -->
    </b-row>
    <hr class="my-2">
    <!-- 테이블 -->
    <b-table
      class="list"
      :items="items"
      :fields="fields"
      :current-page="currentPage"
      :per-page="filter.perPage"
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
      <template #cell(no)="data">
        {{
          totalRows - (currentPage - 1) * filter.perPage - (data.index + 1) + 1
        }}
      </template>
      <template #cell(writer)="data">
        {{ data.value ? data.value : '-' }}
      </template>
      <template #cell(item)="data">
        {{ data.value ? data.value : '-' }}
      </template>
      <template #cell(title)="data">
        <NuxtLink :to="`/cs/comment/${data.item.id}`">
          {{ data.value ? data.value : '-' }}
        </NuxtLink>
      </template>
      <template #cell(content)="data">
        <NuxtLink :to="`/cs/comment/${data.item.id}`">
          {{ data.value ? data.value : '-' }}
        </NuxtLink>
      </template>
      <template #cell(createdAt)="data">
        {{ data.value ? data.value.split('T')[0] : '-' }}
      </template>
      <template #cell(time)="data">
        {{ data.value ? data.value.split('T')[0] : '-' }}
      </template>
      <template #cell(registEdit)="data">
        {{ data.value ? data.value : '-' }}
      </template>
      <template #cell(status)="data">
        <p
          v-if="data.value === '진행중'"
          variant="info"
          class="table-inner-btn ml-2"
          :style="{ color: 'blue' }"
        >
          진행중
        </p>
        <p v-if="data.value === '대기'">
          대기
        </p>
        <p v-if="data.value === '종료'" :style="{ color: 'red' }">
          종료
        </p>
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
  name: 'CsCommentListPage',

  data () {
    return {
      filter: {
        search: '제목',
        startDate: '',
        endDate: '',
        status: '',
        item: null,
        order: 1,
        perPage: 10
      },
      searchOptions: [
        { text: '제목', value: '제목' },
        { text: '제목 + 내용', value: '제목 + 내용' }
      ],
      statusOptions: [
        { value: '대기', text: '대기' },
        { value: '완료', text: '완료' }
      ],
      orderOptions: [
        { value: 1, text: '최신 순' },
        { value: 2, text: '오래된 순' }
      ],
      itemOptions: [
        { value: '서비스 이용', text: '서비스 이용' },
        { value: '콘텐츠', text: '콘텐츠' },
        { value: '결제/환불', text: '결제/환불' },
        { value: '로그인/회원정보', text: '로그인/회원정보' },
        { value: '제휴', text: '제휴' },
        { value: '불법/유해정보신고', text: '불법/유해정보신고' },
        { value: '기타', text: '기타' }
      ],
      items: [
        {
          id: 5,
          wirter: 'data@gmail.com',
          item: '서비스이용',
          title: '물약이 무엇인가요?',
          comment: '물약이 무엇인가요?',
          createAt: '',
          time: '',
          RegistEdit: '2022-10-21',
          status: '대기'
        }
      ],
      fields: [
        { key: 'no', label: '번호' },
        { key: 'writer', label: '작성자' },
        { key: 'item', label: '항목' },
        { key: 'title', label: '제목' },
        { key: 'comment', label: '내용' },
        { key: 'createdAt', label: '작성일' },
        { key: 'time', label: '답변확인시간' },
        { key: 'RegistEdit', label: '등록/최종수정' },
        { key: 'status', label: '답변 상태' }
      ],
      totalRows: 1,
      currentPage: 1,
      selectAll: false,
      selectedList: [],
      indeterminate: false
    }
  },
  async fetch () {
    await this.totalCpList()
  },
  computed: {
    breadcrumb () {
      const arr = [
        { label: '홈', url: '/' },
        { label: '서비스 운영 관리', url: '#' },
        { label: '1:1 문의사항 관리', url: this.$route.path }
      ]
      return arr
    }
  },
  watch: {},
  mounted () {
    this.totalRows = this.items.length
  },
  methods: {
    async totalCpList () {
      this.isLoading = true

      try {
        const {
          data: { data }
        } = await this.$axios.get('/api/cartoon/manager/cpList', {
          params: {
            pageNum: this.currentPage,
            pageSize: this.perPage,

            title: this.filter.title,
            status: this.filter.status,
            item: this.filter.item
          }
        })

        this.items = data.list
        this.totalRows = data.total
      } catch (e) {
        console.log(e)
      } finally {
        this.isLoading = false
      }
    }
  }
}
</script>
