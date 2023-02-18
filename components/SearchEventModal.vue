<template>
  <b-modal
    id="search-event-modal"
    title="이벤트 검색"
    ok-only
    ok-title="등록"
    centered
    scrollable
    size="xl"
    body-class="pt-2"
    @ok="selectEvent"
  >
    <b-container fluid class="px-0" tag="form" @submit.prevent="getList">
      <b-row class="px-3">
        <b-col lg="12" class="my-2">
          <b-form-group
            label="상태"
            label-cols-sm="2"
            label-align-sm="left"
            label-size="sm"
            label-class="align-self-center"
            class="mb-0 align-items-center"
          >
            <b-form-select
              v-model="filter.status"
              :options="statusOptions"
              class="w-25"
            />
          </b-form-group>
        </b-col>

        <b-col lg="12" class="">
          <b-form-group
            label="기간"
            label-cols-sm="2"
            label-align-sm="left"
            label-class="align-self-center"
            label-size="sm"
          >
            <div class="d-inline-flex justify-content-start w-100 my-2">
              <b-form-select
                v-model="filter.searchDtType"
                :options="dtTypeOptions"
                class="w-25 mr-2"
              />
              <b-form-datepicker
                v-model="filter.searchStartDt"
                placeholder="선택"
                class="w-30"
                hide-header
                label-help=""
                :date-format-options="{
                  year: 'numeric',
                  month: 'numeric',
                  day: 'numeric'
                }"
              />
              <span class="align-self-center ml-2">~</span>
              <b-form-datepicker
                v-model="filter.searchEndDt"
                placeholder="선택"
                hide-header
                label-help=""
                :date-format-options="{
                  year: 'numeric',
                  month: 'numeric',
                  day: 'numeric'
                }"
                class="ml-2 w-30"
              />
            </div>
          </b-form-group>
        </b-col>
      </b-row>
      <hr class="my-2">
      <b-row align-h="center" class="mb-4">
        <b-col cols="2" class="text-center">
          <b-button type="submit" variant="primary" class="w-60">
            검색
          </b-button>
        </b-col>
      </b-row>
    </b-container>

    <b-row class="mt-3 px-3">
      <b-col lg="12" class="my-2">
        <p class="font-weight-700 my-1">
          선택된 이벤트
        </p>
        <b-table
          class="list"
          :items="selectedEventList"
          :fields="fields"
          stacked="md"
          show-empty
          small
        >
          <template #empty>
            <h4 class="mt-4">
              이벤트를 선택해 주세요.
            </h4>
          </template>
          <template #cell(check)="data">
            <b-form-checkbox v-model="selectedEventList" :value="data.item" />
          </template>
          <template #cell(isBook)="data">
            {{ data.item.isBook ? data.item.isBook : '-' }}
          </template>
          <template #cell(title)="data">
            {{ data.item.title ? data.item.title : '-' }}
          </template>
          <template #cell(rate)="data">
            {{ data.item.rate ? data.item.rate : '-' }}
          </template>
          <template #cell(cp)="data">
            {{ data.item.cp ? data.item.cp : '-' }}
          </template>
          <template #cell(startDate)="data">
            {{ data.item.startDate ? data.item.startDate : '-' }}
          </template>
          <template #cell(endDate)="data">
            {{ data.item.endDate ? data.item.endDate : '-' }}
          </template>
          <template #cell(buyType)="data">
            {{ data.item.buyType ? data.item.buyType : '-' }}
          </template>
          <template #cell(waitTime)="data">
            {{ data.item.waitTime ? `${data.item.waitTime}시간` : '-' }}
          </template>
          <template #cell(episode)="data">
            {{ data.item.episode ? `${data.item.episode}화` : '-' }}
          </template>
          <template #cell(createdAt)="data">
            {{ data.item.createdAt ? data.item.createdAt : '-' }}
          </template>
          <template #cell(manager)="data">
            {{ data.item.manager ? data.item.manager : '-' }}
          </template>
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
        </b-table>
      </b-col>
    </b-row>
    <b-row class="mt-3 px-3">
      <b-col lg="12" class="my-1">
        <p class="font-weight-700 my-1">
          이벤트 목록
        </p>
        <b-table
          class="list"
          :items="list"
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
            <b-form-checkbox v-model="selectedEventList" :value="data.item" />
          </template>
          <template #cell(isBook)="data">
            {{ data.value ? data.value : '-' }}
          </template>
          <template #cell(title)="data">
            {{ data.value ? data.value : '-' }}
          </template>
          <template #cell(rate)="data">
            {{ data.value ? data.value : '-' }}
          </template>
          <template #cell(cp)="data">
            {{ data.value ? data.value : '-' }}
          </template>
          <template #cell(startDate)="data">
            {{ data.value ? data.value : '-' }}
          </template>
          <template #cell(endDate)="data">
            {{ data.value ? data.value : '-' }}
          </template>
          <template #cell(buyType)="data">
            {{ data.value ? data.value : '-' }}
          </template>
          <template #cell(waitTime)="data">
            {{ data.value ? `${data.value}시간` : '-' }}
          </template>
          <template #cell(episode)="data">
            {{ data.value ? `${data.value}화` : '-' }}
          </template>
          <template #cell(createdAt)="data">
            {{ data.value ? data.value : '-' }}
          </template>
          <template #cell(manager)="data">
            {{ data.value ? data.value : '-' }}
          </template>
          <template #cell(status)="data">
            <p v-if="data.value === '진행중'" class="text-info">
              진행중
            </p>
            <p v-else-if="data.value === '대기'">
              대기
            </p>
            <p v-else-if="data.value === '종료'" class="text-warning">
              종료
            </p>
            <p v-else>
              -
            </p>
          </template>
        </b-table>
      </b-col>
    </b-row>
  </b-modal>
</template>

<script>
export default {
  name: 'SearchEventModal',
  props: {
    moduleType: {
      type: Number,
      required: true,
      default: 1
    }
  },
  data () {
    return {
      filter: {
        status: '',
        searchDtType: '',
        searchStartDt: '',
        searchEndDt: ''
      },
      statusOptions: [
        { value: '', text: '전체' },
        { value: '대기', text: '대기' },
        { value: '진행중', text: '진행중' }
      ],
      dtTypeOptions: [
        { value: '', text: '전체' },
        { value: '등록일', text: '등록일' },
        { value: '시작일', text: '시작일' },
        { value: '종료일', text: '종료일' }
      ],
      isLoading: false,
      list: [],
      selectedEventList: [],
      fields: [
        { key: 'check', label: '' },
        { key: 'title', label: '이벤트명' },
        { key: 'startDate', label: '시작일' },
        { key: 'endDate', label: '종료일' },
        { key: 'status', label: '상태' }
      ]
    }
  },
  watch: {},
  methods: {
    selectEvent () {
      this.$emit('select-event', this.selectedEventList)
      this.selectedEventList = []
      this.list = []
    },
    async getList () {
      this.isLoading = true

      try {
        const {
          data: { data }
        } = await this.$axios.get(
          `/api/manager/schedule/evnet/search/${this.moduleType}`,
          {
            params: this.filter
          }
        )
        this.list = data
        this.isLoading = false
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>
