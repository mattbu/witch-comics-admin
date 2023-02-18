<template>
  <b-container fluid class="page-min-height py-3">
    <UiPageTitle title="이벤트 댓글" :breadcrumb="breadcrumb">
      <template #buttons>
        <b-button variant="primary" to="/event/reply/add">
          이벤트 댓글 등록
        </b-button>
      </template>
    </UiPageTitle>
    <hr>
    <b-container fluid class="px-0" tag="form" @submit.prevent="totalReplyList">
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
              <b-form-input v-model="searchValue" class="w-25" />
              <b-button class="ml-2" variant="primary">
                찾기
              </b-button>
            </div>
          </b-form-group>
        </b-col>
      </b-row>

      <b-row class="px-3">
        <b-col lg="12" class="my-1">
          <b-form-group
            label="기간 검색"
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
    </b-container>
    <b-row align-h="between" class="mt-5">
      <b-col align-self="center">
        <h6>댓글 목록 ({{ totalRows ? totalRows : '0' }})</h6>
      </b-col>
      <b-col align-self="center" class="text-right">
        <b-form-select
          v-model="filter.perPage"
          :options="perPageOptions"
          class="w-20"
        />
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
      <!-- 작성자 -->
      <template #cell(writer)="data">
        {{ data.value ? data.value : '-' }}
      </template>
      <!-- 이벤트명 -->
      <template #cell(name)="data">
        <div class="table-inner-modal" @click="openModal('detailReply', data.item.id)">
          {{ data.value ? data.value : '-' }}
        </div>
      </template>
      <!-- 작성글 -->
      <template #cell(content)="data">
        {{ data.value ? data.value : '-' }}
      </template>
      <!-- 작성일 -->
      <template #cell(writerAt)="data">
        {{ data.value ? data.value : '-' }}
      </template>
      <!-- 상태 -->
      <template #cell(status)="data">
        <p v-if="data.item.status === '진행중'" class="text-info">
          진행중
        </p>
        <p v-else-if="data.item.status === '대기'">
          대기
        </p>
        <p v-else-if="data.item.status === '종료'" class="text-warning">
          종료
        </p>
        <p v-else>
          -
        </p>
      </template>
      <!-- 차단날짜 -->
      <template #cell(cutAt)="data">
        {{ data.value ? data.value : '-' }}
      </template>
      <!-- 담당자 -->
      <template #cell(admin)="data">
        {{ data.value ? data.value : '-' }}
      </template>
      <!-- 설정 -->
      <template #cell(setting)="data">
        <b-button
          variant="outline-secondary"
          class="table-inner-btn"
          @click="openModal('setting-event-modal', data.item.id)"
        >
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

    <!-- 댓글 상세보기 모달 -->
    <UiCenterModal
      modal-id="replyDetail"
      modal-title="댓글 상세보기"
      ok-title="저장"
      cancel-title="취소"
      @ok="editReplyset"
    >
      <template #contents>
        <b-container fluid class="px-0">
          <b-row class="px-3">
            <b-col lg="12" class="">
              <b-table
                class="list"
                :items="replyDetailItems"
                :fields="replyDetailFields"
                stacked="md"
                :busy="isLoadingDetail"
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
                <!-- 이벤트명 -->
                <template #cell(name)="data">
                  {{ data.value ? data.value : '-' }}
                </template>
                <!-- 작성일 -->
                <template #cell(writerDate)="data">
                  {{ data.value ? data.value.split(' ')[0] : '-' }}
                </template>
                <!-- 작성자 -->
                <template #cell(writer)="data">
                  {{ data.value ? data.value: '-' }}
                </template>
                <!-- 상태 -->
                <template #cell(status)="data">
                  <p v-if="data.item.status === '진행중'" class="text-info">
                    진행중
                  </p>
                  <p v-else-if="data.item.status === '대기'">
                    대기
                  </p>
                  <p v-else-if="data.item.status === '종료'" class="text-warning">
                    종료
                  </p>
                  <p v-else>
                    -
                  </p>
                </template>
                <!-- 작성글 -->
                <template #cell(write)="data">
                  {{ data.value ? data.value: '-' }}
                </template>
              </b-table>
              <p>댓글 설정</p>
              <b-form-group
                v-slot="{ ariaDescribedby }"
                label="댓글 설정"
                label-cols-sm="2"
                label-align-sm="left"
                label-size="sm"
                class="mb-0"
              >
                <b-form-radio-group
                  v-model="form.replySet"
                  :options="setOptions"
                  :aria-describedby="ariaDescribedby"
                  class="mt-1"
                />
              </b-form-group>
            </b-col>
          </b-row>
        </b-container>
      </template>
    </UiCenterModal>
  </b-container>
</template>

<script>
export default {
  name: 'ReplyListPage',
  data () {
    return {
      isLoading: false,
      form: {
        replySet: ''
      },
      filter: {
        startDate: '',
        endDate: '',
        perPage: '20개씩 보기'
      },
      perPageOptions: [
        { value: '20개씩 보기', text: '20개씩 보기' },
        { value: '30개씩 보기', text: '30개씩 보기' },
        { value: '50개씩 보기', text: '50개씩 보기' },
        { value: '100개씩 보기', text: '100개씩 보기' },
        { value: '200개씩 보기', text: '200개씩 보기' }
      ],
      setOptions: [
        { text: '정상', value: '정상' },
        { text: '차단', value: '차단' }
      ],
      totalRows: 0,
      currentPage: 1,
      perPage: 5,
      indeterminate: false,
      name: null,

      isLoadingDetail: false,
      replyDetailItems: [],
      replyDetailFields: [
        { key: 'name', label: '이벤트명' },
        { key: 'writerDate', label: '작성일' },
        { key: 'writer', label: '작성자' },
        { key: 'status', label: '상태' },
        { key: 'write', label: '작성글' }
      ],
      // 댓글 상세
      replyDetail: {},
      replyDetailModal: false,
      items: [],
      fields: [
        { key: 'no', label: '번호' },
        { key: 'writer', label: '작성자' },
        { key: 'name', label: '이벤트명' },
        { key: 'content', label: '작성글' },
        { key: 'writerAt', label: '작성일' },
        { key: 'status', label: '상태' },
        { key: 'cutAt', label: '차단날짜' },
        { key: 'admin', label: '담당자' },
        { key: 'setting', label: '설정' }
      ]
    }
  },
  async fetch () {
    await this.totalReplyList()
  },
  computed: {
    breadcrumb () {
      const arr = [
        { label: '홈', url: '/' },
        { label: '이벤트', url: '#' },
        { label: '이벤트 댓글', url: this.$route.path }
      ]
      return arr
    }
  },
  watch: {
    async currentPage () {
      await this.totalReplyList()
    },
    async replyDetail (val) {
      if (val) {
        this.isLoadingDetail = true
        try {
          const { data } = await this.$axios.$get(
            `/api/cartoon/manager/writer/content/${this.currentId}`
          )
          this.replyDetailItems = data.list
        } catch (e) {
          console.log(e)
        } finally {
          this.isLoadingDetail = false
        }
      } else {
        this.replyDetailItems = []
        this.currentId = null
      }
    }
  },
  created () {},
  mounted () {
    this.totalRows = this.items.length
  },
  methods: {
    async totalReplyList () {
      this.isLoading = true

      try {
        const {
          data: { data }
        } = await this.$axios.get('/api/cartoon/manager/cpList', {
          params: {
            pageNum: this.currentPage,
            pageSize: this.perPage,
            name: this.filter.name
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
