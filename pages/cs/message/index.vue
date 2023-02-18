<template>
  <b-container fluid class="page-min-height py-3">
    <UiPageTitle title="메세지 알림 관리" :breadcrumb="breadcrumb">
      <template #buttons>
        <b-button variant="primary" to="/cs/message/add">
          전송
        </b-button>
      </template>
    </UiPageTitle>
    <hr>
    <!-- 필터 -->
    <b-container
      fluid
      class="px-0"
      tag="form"
      @submit.prevent="totalMessageList"
    >
      <b-row class="mt-3 px-3">
        <b-col lg="12" class="my-1">
          <b-form-group
            label="검색 기간"
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
            label="수신인"
            label-cols-sm="2"
            label-align-sm="left"
            label-size="sm"
            class="mb-0"
          >
            <b-form-checkbox-group
              id="checkbox-group-1"
              v-model="filter.receive"
              class="my-2"
              :options="receiveOptions"
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
            label="메시지 종류"
            label-cols-sm="2"
            label-align-sm="left"
            label-size="sm"
            class="mb-0"
          >
            <b-form-checkbox-group
              id="checkbox-group-1"
              v-model="filter.type"
              class="my-2"
              :options="typeOptions"
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
            label="메시지 상태"
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

      <hr class="my-2">
      <b-row align-h="center" class="mb-4">
        <b-col cols="2">
          <b-button variant="primary" class="w-75">
            검색
          </b-button>
        </b-col>
      </b-row>
    </b-container>
    <b-row class="pt-5">
      <b-col align-self="center">
        <h6>메세지 알림 목록 ({{ totalRows ? totalRows : '0' }})</h6>
      </b-col>
    </b-row>
    <hr class="my-2">
    <!-- 테이블 -->
    <b-table
      class="list"
      :items="items"
      :fields="fields"
      :current-page="currentPage"
      :per-page="filter.perPage"
      :busy="isLoading"
      stacked="md"
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
      <template #cell(receive)="data">
        {{ data.value ? data.value : '-' }}
      </template>
      <template #cell(type)="data">
        {{ data.value ? data.value : '-' }}
      </template>
      <template #cell(content)="data">
        {{ data.value ? data.value : '-' }}
      </template>
      <template #cell(admin)="data">
        {{ data.value ? data.value : '-' }}
      </template>
      <template #cell(bookAt)="data">
        {{ data.value ? data.value.split(' ')[0] : '-' }}
      </template>
      <template #cell(status)="data">
        {{ data.value ? data.value : '-' }}
      </template>
      <template #cell(sendAt)="data">
        {{ data.value ? data.value.split(' ')[0] : '-' }}
      </template>
      <template #cell(setting)="data">
        <b-button
          variant="outline-secondary"
          class="table-inner-btn"
          @click="openModal('edit-writer-modal', data.item.id)"
        >
          취소
        </b-button>
      </template>
      <template #cell(reply)="data">
        <NuxtLink :to="`/cs/comment/${data.item.id}`">
          {{ data.value }}
        </NuxtLink>
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
        receive: '',
        type: '',
        status: '',

        startDate: '',
        endDate: '',
        order: 1,
        perPage: 10
      },
      receiveOptions: [
        { text: '정액제', value: '정액제' },
        { text: '초록마녀', value: '초록마녀' },
        { text: '노란마녀', value: '노란마녀' }
      ],
      typeOptions: [
        { text: '일반', value: '일반' },
        { text: '이벤트', value: '이벤트' },
        { text: '공지사항', value: '공지사항' }
      ],
      statusOptions: [
        { text: '발송', value: '발송' },
        { text: '예약', value: '예약' }
      ],
      items: [
        // {
        //   id: 5,
        //   type: '웹툰',
        //   title: '작품 제목',
        //   comment: '존나 재밌어요 ㅋ',
        //   reply: '103',
        //   writer: 'OOO',
        //   created_at: '2022-10-21',
        //   yn: 'O',
        //   reason: '비속어',
        //   status: '숨김'
        // }
      ],
      fields: [
        { key: 'no', label: '번호' },
        { key: 'receive', label: '수신인' },
        { key: 'type', label: '메시지 종류' },
        { key: 'content', label: '메시지 내용' },
        { key: 'admin', label: '담당자' },
        { key: 'bookAt', label: '예약일' },
        { key: 'startAt', label: '상태' },
        { key: 'sendAt', label: '발송일' },
        { key: 'setting', label: '관리' }
      ],
      totalRows: 1,
      currentPage: 1,
      selectAll: false,
      selectedList: [],
      indeterminate: false
    }
  },
  async fetch () {
    await this.totalMessageList()
  },
  computed: {
    breadcrumb () {
      const arr = [
        { label: '홈', url: '/' },
        { label: '서비스 운영 관리', url: '#' },
        { label: '메세지 알림 관리', url: this.$route.path }
      ]
      return arr
    }
  },
  watch: {},
  mounted () {},
  methods: {
    async totalMessageList () {
      this.isLoading = true

      try {
        const {
          data: { data }
        } = await this.$axios.get('/api/cartoon/manager/writerList', {
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
