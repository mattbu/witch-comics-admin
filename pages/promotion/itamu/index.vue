<template>
  <b-container fluid class="page-min-height py-3">
    <UiPageTitle title="이따무" :breadcrumb="breadcrumb">
      <template #buttons>
        <b-button variant="primary" to="/promotion/itamu/add">
          등록
        </b-button>
      </template>
    </UiPageTitle>
    <hr>
    <!--필터-->
    <b-container fluid class="px-0" tag="form" @submit.prevent="totalItamuList">
      <b-row class="mt-3 px-3">
        <b-col lg="12" class="my-1">
          <b-form-group
            label="검색"
            label-cols-sm="2"
            label-align-sm="left"
            label-size="sm"
            class="mb-0 align-items-center"
          >
            <div class="d-inline-flex">
              <b-form-select v-model="filter.search" :options="searchOptions" />
              <b-form-input
                v-model="searchValue"
                type="text"
                placeholder="검색어"
                class="ml-2"
              />
            </div>
            <b-button variant="primary" class="ml-2">
              찾기
            </b-button>
          </b-form-group>
        </b-col>

        <!-- 유형 -->
        <b-col lg="12" class="my-1">
          <b-form-group
            v-slot="{ ariaDescribedby }"
            label="유형"
            label-cols-sm="2"
            label-align-sm="left"
            label-size="sm"
            class="mb-0"
          >
            <b-form-checkbox-group
              v-model="filter.type"
              :options="typeOptions"
              :aria-describedby="ariaDescribedby"
              class="mt-1"
            />
          </b-form-group>
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
              v-model="filter.status"
              :options="statusOptions"
              :aria-describedby="ariaDescribedby"
              class="mt-1"
            />
          </b-form-group>
        </b-col>

        <b-col lg="12" class="my-1">
          <b-form-group
            v-slot="{ ariaDescribedby }"
            label="기간"
            label-cols-sm="2"
            label-align-sm="left"
            label-size="sm"
          >
            <div class="d-inline-flex justify-content-start w-100 my-2">
              <b-form-select
                v-model="filter.dateSearch"
                class="w-13"
                :options="dateSearchOptions"
                :aria-describedby="ariaDescribedby"
              />
              <div class="d-inline-flex ml-2 w-40">
                <b-form-datepicker
                  v-model="startDate"
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
                  v-model="endDate"
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
    <b-row class="pt-5">
      <b-col align-self="center">
        <h6>이따무 작품 목록 ({{ totalRows ? totalRows : '0' }})</h6>
      </b-col>
    </b-row>
    <hr class="my-2">

    <!-- 테이블 -->
    <b-table
      class="list"
      :items="items"
      :fields="fields"
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
        {{ totalRows - (currentPage - 1) * perPage - (data.index + 1) + 1 }}
      </template>
      <!-- 구분 -->
      <template #cell(isBook)="data">
        {{ data.value ? data.value : '-' }}
      </template>
      <!-- 유형 -->
      <template #cell(menucode)="data">
        {{ data.value ? data.value : '-' }}
      </template>
      <!-- 작품명 -->
      <template #cell(title)="data">
        <NuxtLink :to="`/promotion/itamu/${data.item.id}`">
          {{ data.value ? data.value : '-' }}
        </NuxtLink>
      </template>
      <!-- CP사 -->
      <template #cell(cp)="data">
        {{ data.value ? data.value : '-' }}
      </template>
      <!-- 시작일 -->
      <template #cell(startDate)="data">
        {{ data.value ? data.value.split('T')[0] : '-' }}
      </template>
      <!-- 종료일 -->
      <template #cell(endDate)="data">
        {{ data.value ? data.value.split('T')[0] : '-' }}
      </template>
      <!-- 이용권 -->
      <template #cell(test)="data">
        {{ data.value ? data.value : '-' }}
      </template>
      <!-- 이따무 시간 -->
      <template #cell(waitTime)="data">
        {{ data.value ? `${data.value}시간` : '-' }}
      </template>
      <!-- 이따무 불가 최신화 설정 -->
      <template #cell(episode)="data">
        {{ data.value ? `${data.value}화` : '-' }}
      </template>
      <!-- 등록일 -->
      <template #cell(createdAt)="data">
        {{ data.value ? data.value.split('T')[0] : '-' }}
      </template>
      <!-- 등록/최종수정 -->
      <template #cell()="data">
        {{ data.value ? data.value.split('T')[0] : '-' }}
      </template>
      <!-- 상태 -->
      <template #cell(status)="data">
        <p v-if="data.value === '진행'" class="text-info table-inner-btn ml-2">
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
      <template #cell(setting)="data">
        <b-button
          variant="outline-secondary"
          class="table-inner-btn"
          @click="deleteItamu(data.item.id)"
        >
          삭제
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
  name: 'ContentPieceListPage',

  data () {
    return {
      filter: {
        search: 1,
        type: [],
        status: [],
        period: '',
        dateSearch: '시작일'
      },
      currentSettingId: '',
      searchOptions: [
        { text: '작품명', value: 1 },
        { text: 'CP사', value: 2 },
        { text: '작품번호', value: 3 }
      ],
      // 유형
      typeOptions: [
        { value: '웹툰/만화', text: '웹툰/만화' },
        { value: '소설', text: '소설' }
      ],
      statusOptions: [
        { value: '대기', text: '대기' },
        { value: '진행중', text: '진행중' },
        { value: '종료', text: '종료' }
      ],
      // 기간 검색
      dateSearchOptions: [
        { value: '시작일', text: '시작일' },
        { value: '종료일', text: '종료일' },
        { value: '등록일', text: '등록일' }
      ],
      items: [],
      fields: [
        { key: 'no', label: '번호' },
        { key: 'isBook', label: '구분' },
        { key: 'menucode', label: '유형' },
        { key: 'title', label: '작품명' },
        { key: 'cp', label: 'CP사' },
        { key: 'startDate', label: '시작일' },
        { key: 'endDate', label: '종료일' },
        { key: 'buyType', label: '이용권' },
        { key: 'waitTime', label: '이따무 시간' },
        { key: 'episode', label: '이따무 불가 최신화 설정' },
        { key: 'createdAt', label: '등록일' },
        { key: 'manager', label: '등록/최종수정' },
        { key: 'status', label: '상태' },
        { key: 'setting', label: '설정' }
      ],
      isLoading: false,
      totalRows: 0,
      currentPage: 1,
      perPage: 5,
      filterSort: [],
      searchValue: '',
      startDate: '',
      endDate: ''
    }
  },
  async fetch () {
    await this.totalItamuList()
  },
  computed: {
    breadcrumb () {
      const arr = [
        { label: '홈', url: '/' },
        { label: '프로모션 관리', url: '#' },
        { label: '이따무', url: this.$route.path }
      ]
      return arr
    }
  },
  watch: {
    async currentPage () {
      await this.totalItamuList()
    }
  },
  mounted () {},
  methods: {
    // 목록
    async totalItamuList () {
      this.isLoading = true
      try {
        const {
          data: { data }
        } = await this.$axios.get('/api/manager/free/E/list', {
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
    },

    // 삭제
    async deleteItamu (id) {
      if (confirm('정말 삭제하시겠습니까?') === true) {
        try {
          const { status } = await this.$axios.delete(
            `/api/manager/free/delete/${id}`
          )

          if (status === 200) {
            alert('삭제가 완료 되었습니다.')
            await this.totalFreeChangeList()
          }
        } catch (e) {
          console.log(e)
        }
      } else {
        return false
      }
    },
    openSetting (id) {
      this.disabledTooltip = !this.disabledTooltip

      if (this.disabledTooltip) {
        this.$refs[`setting-${id}`].$emit('open')
      } else {
        this.$refs[`setting-${id}`].$emit('close')
      }

      this.$root.$on('bv::tooltip::shown', (e) => {
        this.currentSettingId = e.target.id
      })
    }
  }
}
</script>
