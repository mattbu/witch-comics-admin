<template>
  <b-container fluid class="page-min-height py-3">
    <UiPageTitle title="동영상 관리" :breadcrumb="breadcrumb">
      <template #buttons>
        <b-button variant="primary" to="/content/video/add">
          등록
        </b-button>
      </template>
    </UiPageTitle>
    <hr>
    <!--필터-->
    <b-container fluid class="px-0" tag="form" @submit.prevent="totalVideoList">
      <b-row class="px-3">
        <b-col lg="12" class="my-1">
          <b-form-group
            label="검색"
            label-cols-sm="2"
            label-align-sm="left"
            label-size="sm"
            class="mb-0 align-items-center"
          >
            <div class="d-flex">
              <b-form-select
                v-model="filter.type"
                :options="searchOptions"
                class="w-10"
              />
              <b-form-input v-model="filter.title" class="ml-2 w-25" />
              <b-button variant="primary" class="ml-2">
                찾기
              </b-button>
            </div>
          </b-form-group>
        </b-col>

        <!-- 상태 -->
        <b-col lg="12" class="my-1">
          <b-form-group
            label="상태"
            label-cols-sm="2"
            label-align-sm="left"
            label-size="sm"
            class="mb-0"
          >
            <b-form-checkbox-group
              v-model="filter.status"
              :options="statusOptions"
              class="mt-1"
            />
          </b-form-group>
        </b-col>
      </b-row>
      <hr>
      <b-row align-h="center" class="mb-4">
        <b-col cols="2">
          <b-button type="submit" variant="primary" class="w-75">
            검색
          </b-button>
        </b-col>
      </b-row>
    </b-container>
    <b-row class="pt-5">
      <b-col align-self="center">
        <h6>동영상 목록 ({{ totalRows ? totalRows : '0' }})</h6>
      </b-col>
    </b-row>
    <hr class="my-2">

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
        {{
          totalRows -
            (filter.pageNum - 1) * filter.pageSize -
            (data.index + 1) +
            1
        }}
      </template>
      <!-- 제목 -->
      <template #cell(title)="data">
        <NuxtLink :to="`/content/video/${data.item.id}`">
          {{ data.value ? data.value : '-' }}
        </NuxtLink>
      </template>
      <!-- 버튼 타이틀 -->
      <template #cell(buttonTitle)="data">
        {{ data.value ? data.value : '-' }}
      </template>
      <!-- 작품 -->
      <template #cell(cartoon)="data">
        {{ data.value ? data.value : '-' }}
      </template>
      <!-- 시작일 -->
      <template #cell(startDate)="data">
        {{ data.value ? data.value : '-' }}
      </template>
      <!-- 종료일 -->
      <template #cell(endDate)="data">
        {{ data.value ? data.value : '-' }}
      </template>
      <!-- 상태 -->
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
      <!-- 노출여부 -->
      <template #cell(isShow)="data">
        {{ data.value ? data.value : '-' }}
      </template>
      <!-- 등록일 -->
      <template #cell(createdAt)="data">
        {{ data.value ? data.value : '-' }}
      </template>
      <!-- 등록/최종 수정일 -->
      <template #cell(manager)="data">
        {{ data.value ? data.value : '-' }}
      </template>
      <template #cell(setting)="data">
        <b-button
          variant="outline-secondary"
          class="table-inner-btn"
          @click="removeVideo(data.item.id)"
        >
          삭제
        </b-button>
      </template>
    </b-table>
    <UiPagination
      class="py-4"
      :page="filter.pageNum"
      :per-page="filter.pageSize"
      :total-rows="totalRows"
      @change-page="filter.pageNum = $event"
    />
  </b-container>
</template>

<script>
export default {
  name: 'ContentVideoListPage',
  data () {
    return {
      // 필터
      filter: {
        type: '제목',
        status: [],
        title: '',
        pageNum: 1,
        pageSize: 5
      },
      // 리스트
      isLoading: false,
      totalRows: 0,
      searchOptions: [
        { text: '제목', value: '제목' },
        { text: '버튼 타이틀', value: '버튼 타이틀' },
        { text: '작품', value: '작품' }
      ],
      statusOptions: [
        { value: '대기', text: '대기' },
        { value: '진행중', text: '진행중' },
        { value: '종료', text: '종료' }
      ],
      items: [],
      fields: [
        { key: 'no', label: '번호' },
        { key: 'title', label: '제목' },
        { key: 'buttonTitle', label: '버튼 타이틀' },
        { key: 'cartoon', label: '작품' },
        { key: 'startDate', label: '시작일' },
        { key: 'endDate', label: '종료일' },
        { key: 'status', label: '상태' },
        { key: 'isShow', label: '노출여부' },
        { key: 'createdAt', label: '등록일' },
        { key: 'manager', label: '등록/최종수정' },
        { key: 'setting', label: '관리' }
      ]
    }
  },
  async fetch () {
    await this.totalVideoList()
  },
  computed: {
    breadcrumb () {
      const arr = [
        { label: '홈', url: '/' },
        { label: '콘텐츠 관리', url: '#' },
        { label: '동영상 관리', url: this.$route.path }
      ]
      return arr
    }
  },
  watch: {
    async 'filter.pageNum' () {
      await this.totalVideoList()
    }
  },
  mounted () {},
  methods: {
    // 조회
    async totalVideoList () {
      this.isLoading = true
      try {
        const {
          status,
          data: { data }
        } = await this.$axios.get('/api/cartoon/manager/movie', {
          params: this.filter
        })
        if (status === 200) {
          this.items = data.list
          this.totalRows = data.total
        }
      } catch (e) {
        console.log(e)
      } finally {
        this.isLoading = false
      }
    },
    // 삭제
    async removeVideo (id) {
      const confirm = window.confirm('삭제 하시겠습니까?')

      if (confirm) {
        try {
          const { status } = await this.$axios.delete(
            `/api/cartoon/manager/movie/${id}`
          )

          if (status === 200) {
            alert('삭제가 완료 되었습니다.')
            await this.totalVideoList()
          }
        } catch (e) {
          console.log(e)
        }
      } else {
        alert('삭제가 취소 되었습니다.')
      }
    }
  }
}
</script>
