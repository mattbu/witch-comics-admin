<template>
  <b-container fluid class="page-min-height py-3">
    <UiPageTitle title="이벤트 관리" :breadcrumb="breadcrumb">
      <template #buttons>
        <b-button variant="primary" to="/event/list/add">
          등록
        </b-button>
      </template>
    </UiPageTitle>
    <hr>
    <b-container fluid class="px-0" tag="form" @submit.prevent="totalEventList">
      <b-row class="px-3">
        <b-col lg="12" class="">
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
                class="w-10"
              />
              <b-form-input v-model="searchValue" class="ml-2 w-25" />

              <b-button class="ml-2">
                찾기
              </b-button>
            </div>
          </b-form-group>
        </b-col>
      </b-row>
      <b-row class="px-3">
        <b-col lg="12" class="my-1">
          <b-form-group
            v-slot="{ ariaDescribedby }"
            label="이벤트 구분"
            label-cols-sm="2"
            label-align-sm="left"
            label-size="sm"
            class="mb-0"
          >
            <b-form-checkbox-group
              v-model="filter.division"
              :options="divisionOptions"
              :aria-describedby="ariaDescribedby"
              class="mt-1"
            />
          </b-form-group>
        </b-col>
      </b-row>
      <b-row class="px-3">
        <b-col lg="12" class="my-1">
          <b-form-group
            v-slot="{ ariaDescribedby }"
            label="연령등급"
            label-cols-sm="2"
            label-align-sm="left"
            label-size="sm"
            class="mb-0"
          >
            <b-form-checkbox-group
              v-model="filter.age"
              :options="ageOptions"
              :aria-describedby="ariaDescribedby"
              class="mt-1"
            />
          </b-form-group>
        </b-col>
      </b-row>
      <b-row class="px-3">
        <b-col lg="12" class="my-1">
          <b-form-group
            v-slot="{ ariaDescribedby }"
            label="댓글기능"
            label-cols-sm="2"
            label-align-sm="left"
            label-size="sm"
            class="mb-0"
          >
            <b-form-checkbox-group
              v-model="filter.reply"
              :options="replyOptions"
              :aria-describedby="ariaDescribedby"
              class="mt-1"
            />
          </b-form-group>
        </b-col>
      </b-row>
      <b-row class="px-3">
        <b-col lg="12" class="my-1">
          <b-form-group
            v-slot="{ ariaDescribedby }"
            label="이벤트 상태"
            label-cols-sm="2"
            label-align-sm="left"
            label-size="sm"
            class="mb-0"
          >
            <b-form-checkbox-group
              v-model="filter.status"
              :options="statusOptions"
              :aria-describedby="ariaDescribedby"
              class="mt-1"
            />
          </b-form-group>
        </b-col>
      </b-row>

      <b-row class="px-3">
        <b-col lg="12" class="my-1">
          <b-form-group
            label="이벤트 기간"
            label-cols-sm="2"
            label-align-sm="left"
            label-size="sm"
            class="mb-0"
          >
            <b-form-radio-group
              v-model="filter.eventDate"
              :options="eventDateOptions"
              :aria-describedby="ariaDescribedby"
            />
            <div class="d-inline-flex justify-content-start w-100">
              <div class="d-inline-flex w-30 my-2">
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
                  class="ml-2"
                />
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
    </b-container>
    <b-row align-h="between" class="mt-5">
      <b-col align-self="center">
        <h6>이벤트 목록 ({{ totalRows ? totalRows : '0' }})</h6>
      </b-col>
    </b-row>
    <hr class="my-2">
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
      <template #cell(no)="data">
        {{ totalRows - (currentPage - 1) * perPage - (data.index + 1) + 1 }}
      </template>
      <!-- 게시물 종류 -->
      <template #cell(eventType)="data">
        {{ data.value ? data.value : '-' }}
      </template>
      <!-- 이벤트 구분 -->
      <template #cell(type)="data">
        {{ data.value ? data.value : '-' }}
      </template>
      <!-- 연령등급 -->
      <template #cell(rate)="data">
        {{ data.value ? data.value : '-' }}
      </template>
      <!-- 이벤트명 -->
      <template #cell(title)="data">
        <NuxtLink :to="`/event/list/${data.item.id}`">
          {{ data.value }}
        </NuxtLink>
      </template>
      <!-- 시작일 -->
      <template #cell(startDate)="data">
        {{ data.value ? data.value.split(' ')[0] : '-' }}
      </template>
      <!-- 종료일 -->
      <template #cell(endDate)="data">
        {{ data.value ? data.value.split(' ')[0] : '-' }}
      </template>
      <!-- 댓글기능 -->
      <template #cell(isReply)="data">
        {{ data.value ? data.value : '-' }}
      </template>
      <!-- 이벤트 작품 -->
      <template #cell(cartoon)="data">
        {{ data.value ? data.value : '-' }}
      </template>
      <!-- 상태 -->
      <template #cell(status)="data">
        <p
          v-if="data.value === 1"
          variant="info"
          class="table-inner-btn ml-2"
          :style="{ color: 'blue' }"
        >
          진행중
        </p>
        <p v-if="data.value === 2">
          대기
        </p>
        <p v-if="data.value === 3" :style="{ color: 'red' }">
          종료
        </p>
      </template>
      <!-- 노출여부 -->
      <template #cell(isShow)="data">
        {{ data.value ? data.value : '-' }}
      </template>
      <!-- 등록일 -->
      <template #cell(createdAt)="data">
        {{ data.value ? data.value : '-' }}
      </template>
      <!-- 등록/최종수정 -->
      <template #cell(manager)="data">
        {{ data.value ? data.value : '-' }}
      </template>
      <template #cell(setting)>
        <b-button variant="primary">
          설정
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
  name: 'CsReplyListPage',
  data () {
    return {
      isLoading: false,
      filter: {
        search: '작품명',
        eventDate: '',
        startDate: '',
        endDate: ''
      },
      searchOptions: [
        { value: '작품명', text: '작품명' },
        { value: '이벤트명', text: '이벤트명' },
        { value: '이벤트 작품', text: '이벤트 작품' }
      ],
      divisionOptions: [
        { value: '웹툰/만화', text: '웹툰/만화' },
        { value: '소설', text: '소설' },
        { value: '스페셜', text: '스페셜' }
      ],
      ageOptions: [
        { value: '전체이용가', text: '전체이용가' },
        { value: '성인', text: '성인' }
      ],
      replyOptions: [
        { value: '설정', text: '설정' },
        { value: '미설정', text: '미설정' }
      ],
      statusOptions: [
        { value: '대기', text: '대기' },
        { value: '진행중', text: '진행중' },
        { value: '종류', text: '종료' }
      ],
      eventDateOptions: [
        { text: '시작일', value: '시작일' },
        { text: '종료일', value: '종료일' }
      ],
      totalRows: 0,
      currentPage: 1,
      perPage: 5,
      indeterminate: false,
      items: [],
      fields: [
        { key: 'no', label: '번호' },
        { key: 'eventType', label: '게시물 종류' },
        { key: 'type', label: '이벤트 구분' },
        { key: 'rate', label: '연령등급' },
        { key: 'title', label: '이벤트명' },
        { key: 'startDate', label: '시작일' },
        { key: 'endDate', label: '종료일' },
        { key: 'isReply', label: '댓글기능' },
        { key: 'cartoon', label: '이벤트 작품' },
        { key: 'status', label: '상태' },
        { key: 'isShow', label: '노출여부' },
        { key: 'createdAt', label: '등록일' },
        { key: 'manager', label: '담당자' }
      ]
    }
  },
  async fetch () {
    await this.totalEventList()
  },
  computed: {
    breadcrumb () {
      const arr = [
        { label: '홈', url: '/' },
        { label: '이벤트', url: '#' },
        { label: '이벤트 관리', url: this.$route.path }
      ]
      return arr
    }
  },
  watch: {
    async currentPage () {
      await this.totalEventList()
    }
  },
  created () {},
  mounted () {
    this.totalRows = this.items.length
  },
  methods: {
    async totalEventList () {
      this.isLoading = true
      try {
        const {
          data: { data }
        } = await this.$axios.get('/api/manager/event/list', {
          params: {
            pageNum: this.currentPage,
            pageSize: this.perPage
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
