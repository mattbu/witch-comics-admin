<template>
  <b-container fluid class="page-min-height py-3">
    <UiPageTitle title="웹툰/만화 배너 관리" :breadcrumb="breadcrumb">
      <template #buttons>
        <b-button variant="primary" to="/popupBanner/webComicsBanner/add">
          등록
        </b-button>
      </template>
    </UiPageTitle>
    <hr>
    <b-container fluid class="px-0" tag="form" @submit.prevent="totalPopupList">
      <!--필터-->
      <b-row class="mt-3 px-3">
        <b-col lg="12" class="my-1">
          <b-form inline>
            <legend class="pl-0 col-sm-2 fs-14 text-sm-left">
              제목
            </legend>
            <b-form-input v-model="filter.title" />
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
              v-model="filter.posted"
              :options="postedOptions"
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
    </b-container>
    <b-row class="pt-5" align-h="between">
      <b-col align-self="center">
        <h6>배너 목록 ({{ totalRows ? totalRows : '0' }})</h6>
      </b-col>
    </b-row>
    <hr class="my-2">
    <b-row>
      <b-col>
        <b-form-group
          v-slot="{ ariaDescribedby }"
          label="노출 방법"
          label-cols-sm="1"
          label-size="sm"
          class="mb-2"
        >
          <b-form-radio-group
            v-model="filter.openWay"
            :options="openWayOptions"
            :aria-describedby="ariaDescribedby"
            class="mt-1"
          />
        </b-form-group>
      </b-col>
    </b-row>
    <!-- 테이블 -->
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
      <!-- 제목 -->
      <template #cell(title)="data">
        <NuxtLink
          :to="{
            path: `/cs/policy/${data.item.name}`,
            query: { id: data.item.id }
          }"
        >
          {{ data.value }}
        </NuxtLink>
      </template>
      <!-- 표시여부 -->
      <template #cell(postYesNo)="data">
        {{ data.value ? data.value : '-' }}
      </template>
      <!-- 시작일 -->
      <template #cell(startAt)="data">
        {{ data.value ? data.value.split('T')[0] : '-' }}
      </template>
      <!-- 종료일 -->
      <template #cell(endAt)="data">
        {{ data.value ? data.value.split('T')[0] : '-' }}
      </template>
      <!-- 상태 -->
      <template #cell(status)="data">
        {{ data.value ? data.value : '-' }}
      </template>
      <!-- 노출여부 -->
      <template #cell(openYesNo)="data">
        {{ data.value ? data.value : '-' }}
      </template>
      <!-- 등록일 -->
      <template #cell(registAt)="data">
        {{ data.value ? data.value.split('T')[0] : '-' }}
      </template>
      <!-- 등록/최종수정 -->
      <template #cell(registEdit)="data">
        {{ data.value ? data.value : '-' }}
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
        status: '',
        posted: ''
      },
      statusOptions: [
        { value: '대기', text: '대기' },
        { value: '진행중', text: '진행중' },
        { value: '종료', text: '종료' }
      ],
      postedOptions: [
        { value: '전체이용가', text: '전체이용가' },
        { value: '성인', text: '성인' }
      ],
      openWayOptions: [
        { value: '지정노출', text: '지정노출' },
        { value: '랜덤노출', text: '랜덤노출' }
      ],
      currentPage: 1,
      totalRows: 0,
      perPage: 10,
      items: [
        // {
        //   id: 1233,
        //   order: 1,
        //   title: '제목',
        //   is_adult: '성인여부',
        //   start_date: '2022-10-20',
        //   end_date: '2022-10-20',
        //   status: '상태',
        //   created_at: '2022-10-20',
        //   admin: '000'
        // }
      ],
      fields: [
        { key: 'order', label: '노출 순서' },
        { key: 'no', label: '번호' },
        { key: 'title', label: '제목' },
        { key: 'postYesNo', label: '표시여부' },
        { key: 'startAt', label: '시작일' },
        { key: 'endAt', label: '종료일' },
        { key: 'status', label: '상태' },
        { key: 'openYesNo', label: '노출여부' },
        { key: 'registAt', label: '등록일' },
        { key: 'registEdit', label: '등록/최종수정' }
      ]
    }
  },
  async fetch () {
    await this.totalPopupList()
  },
  computed: {
    breadcrumb () {
      const arr = [
        { label: '홈', url: '/' },
        { label: '팝업/배너 관리', url: '#' },
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
  methods: {
    async totalPopupList () {
      this.isLoading = true

      try {
        const {
          data: { data }
        } = await this.$axios.get('/api/cartoon/manager/cpList', {
          params: {
            pageNum: this.currentPage,
            pageSize: this.perPage,
            title: this.filter.title
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
