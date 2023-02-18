<template>
  <b-container fluid class="page-min-height py-3">
    <UiPageTitle title="프로모션 당첨관리" :breadcrumb="breadcrumb" />
    <hr>
    <b-container fluid class="px-0" tag="form" @submit.prevent="totalWinList">
      <b-row class="px-3">
        <b-col lg="12" class="">
          <b-form-group
            label="아이디"
            label-cols-sm="2"
            label-align-sm="left"
            label-size="sm"
            class="align-items-center"
          >
            <b-form-input v-model="searchValue" class="w-30" />
          </b-form-group>
        </b-col>
      </b-row>

      <b-row class="px-3">
        <b-col lg="12" class="my-2">
          <b-form-group
            v-slot="{ ariaDescribedby }"
            label="상태"
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
        <b-col lg="12">
          <b-form-group
            label="지급(예정)일"
            label-class="align-self-center"
            label-cols-sm="2"
            label-align-sm="left"
            label-size="sm"
            class="mb-0"
          >
            <b-form-radio-group
              v-model="filter.searchDtType"
              :options="periodOptions"
            />
            <div class="d-inline-flex w-40 mb-1">
              <b-form-datepicker
                v-model="filter.searchStartDt"
                label-help=""
                hide-header
                placeholder="선택"
                :date-format-options="{
                  year: 'numeric',
                  month: 'numeric',
                  day: 'numeric'
                }"
              />
              <span class="ml-2 align-self-center">~</span>
              <b-form-datepicker
                v-model="filter.searchEndDt"
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
          </b-form-group>
        </b-col>
      </b-row>
    </b-container>
    <hr class="my-2">
    <b-row align-h="center" class="mb-4">
      <b-col cols="2" class="d-flex">
        <b-button type="submit" variant="primary" class="w-75">
          검색
        </b-button>
      </b-col>
    </b-row>
    <b-row align-h="between" class="mt-5">
      <b-col align-self="center">
        <h6>당첨자 내역 ({{ totalRows ? totalRows : '0' }})</h6>
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
      <!-- 아이디 -->
      <template #cell(title)="data">
        <NuxtLink :to="`/promotion/win/${data.item.id}`">
          {{ data.value ? data.value : '-' }}
        </NuxtLink>
      </template>
      <!-- 구분명 -->
      <template #cell(name)="data">
        {{ data.value ? data.value : '-' }}
      </template>
      <!-- 지급내역 -->
      <template #cell(info)="data">
        {{ data.value ? data.value : '-' }}
      </template>
      <!-- 지급개수 -->
      <template #cell(cnt)="data">
        {{ data.value ? data.value : '-' }}
      </template>
      <!-- 상태 -->
      <template #cell(status)="data">
        {{ data.value ? data.value : '-' }}
      </template>
      <!-- 지급(예정)일 -->
      <template #cell(createdAt)="data">
        {{ data.value ? data.value.split('T')[0] : '-' }}
      </template>
      <!-- 지급자 -->
      <template #cell(manager)="data">
        {{ data.value ? data.value : '-' }}
      </template>
      <!-- 관리 -->
      <template #cell(setting)>
        <b-button variant="primary" @click="openSearchModal('search-modal')">
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

    <!-- 담청관리 모달 -->
    <UiCenterModal
      modal-id="search-modal"
      modal-title="당첨관리"
      ok-title="등록"
      cancel-title="취소"
    >
      <template #contents>
        <b-container fluid class="px-0">
          <b-row class="">
            <b-col cols="12">
              <table class="table border mb-4 table-layout-fixed">
                <colgroup>
                  <col style="width: 15%">
                  <col>
                  <col style="width: 10%">
                  <col>
                </colgroup>
                <tbody>
                  <tr>
                    <th>상태</th>
                    <td colspan="">
                      당첨
                      <b-button variant="primary" class="ml-2">
                        취소
                      </b-button>
                    </td>
                    <th>지급유형</th>
                    <td colspan="">
                      호박
                    </td>
                    <th>지급내역</th>
                    <td colspan="">
                      10개
                    </td>
                  </tr>
                  <tr>
                    <th>지급상태</th>
                    <td colspan="">
                      당첨
                    </td>
                    <th>지급(예정)일</th>
                    <td colspan="">
                      호박
                    </td>
                    <th>총 사용내역</th>
                    <td colspan="">
                      10개
                    </td>
                  </tr>
                </tbody>
              </table>
            </b-col>
          </b-row>
        </b-container>
      </template>
    </UiCenterModal>
  </b-container>
</template>

<script>
export default {
  name: 'CsReplyListPage',
  data () {
    return {
      isLoading: false,
      filter: {
        startDate: '',
        endDate: ''
      },
      statusOptions: [
        { value: '지급', text: '지급' },
        { value: '대기', text: '대기' }
      ],
      totalRows: 0,
      currentPage: 1,
      perPage: 5,
      indeterminate: false,
      name: null,
      items: [
        // {
        //   id: 12334,
        //   name: 'acdd@gmail.com',
        //   title: '여의주를 훔치는 방법 캐시백 프로모션',
        //   test: '물약',
        //   cnt: '10개',
        //   status: '대기',
        //   writeAt: '2022-10-20',
        //   test2: '박담당',
        //   setting: ''
        // }
      ],
      fields: [
        { key: 'no', label: '번호' },
        { key: 'name', label: '아이디' },
        { key: 'title', label: '구분명' },
        { key: 'info', label: '지급내역' },
        { key: 'cnt', label: '지급개수' },
        { key: 'status', label: '상태' },
        { key: 'createdAt', label: '지급(예정)일' },
        { key: 'manager', label: '지급자' },
        { key: 'setting', label: '관리' }
      ]
    }
  },
  async fetch () {
    await this.totalWinList()
  },
  computed: {
    breadcrumb () {
      const arr = [
        { label: '홈', url: '/' },
        { label: '프로모션', url: '#' },
        { label: '프로모션 당첨 관리', url: this.$route.path }
      ]
      return arr
    }
  },
  watch: {
    async currentPage () {
      await this.totalWinList()
    }
  },
  created () {},
  mounted () {
    this.totalRows = this.items.length
  },
  methods: {
    async totalWinList () {
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
    },
    openSearchModal (id) {
      this.$root.$emit('bv::show::modal', id)
    }
  }
}
</script>
