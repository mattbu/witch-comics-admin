<template>
  <b-container fluid class="page-min-height py-3">
    <UiPageTitle title="외부연결 관리" :breadcrumb="breadcrumb">
      <template #buttons>
        <b-button variant="primary" to="/content/outerLead/add">
          등록
        </b-button>
      </template>
    </UiPageTitle>
    <hr>
    <!--필터-->
    <b-container
      fluid
      class="px-0"
      tag="form"
      @submit.prevent="totalOuterLeadList"
    >
      <b-row class="px-3">
        <b-col lg="12" class="my-1">
          <b-form-group
            label="구분명"
            label-cols-sm="2"
            label-align-sm="left"
            label-size="sm"
            class="mb-0 align-items-center"
          >
            <div class="d-inline-flex">
              <b-form-input v-model="filter.title" type="text" />
            </div>
          </b-form-group>
        </b-col>

        <!-- 상태 -->
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
        <h6>외부연결URL 목록 ({{ totalRows ? totalRows : '0' }})</h6>
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
      <!-- 구분명 -->
      <template #cell(title)="data">
        <NuxtLink :to="`/content/outerLead/${data.item.id}`">
          {{ data.value ? data.value : '-' }}
        </NuxtLink>
      </template>
      <!-- 코드 -->
      <template #cell(linkCode)="data">
        {{ data.value ? data.value : '-' }}
      </template>
      <!-- 기간 -->
      <template #cell(useDate)="data">
        {{ data.value ? data.value.split('T')[0] : '-' }}
      </template>
      <!-- 상태 -->
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
      <!-- 연결 주소 -->
      <template #cell(connectUrl)="data">
        {{ data.value ? data.value : '-' }}
      </template>
      <!-- 관리 -->
      <template #cell(setting)="data">
        <b-button
          variant="outline-secondary"
          class="table-inner-btn"
          @click="removeOuterLead(data.item.id)"
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
  name: 'OuterLeadListPage',
  data () {
    return {
      filter: {
        title: '',
        status: [],
        pageNum: 1,
        pageSize: 5
      },
      isLoading: false,
      totalRows: 0,
      statusOptions: [
        { value: '대기', text: '대기' },
        { value: '진행중', text: '진행중' },
        { value: '종료', text: '종료' }
      ],
      items: [],
      fields: [
        { key: 'no', label: '번호' },
        { key: 'title', label: '구분명' },
        { key: 'linkCode', label: '코드' },
        { key: 'useDate', label: '기간' },
        { key: 'status', label: '상태' },
        { key: 'connectUrl', label: '연결주소' },
        { key: 'setting', label: '관리' }
      ]
    }
  },
  async fetch () {
    await this.totalOuterLeadList()
  },
  computed: {
    breadcrumb () {
      const arr = [
        { label: '홈', url: '/' },
        { label: '콘텐츠 관리', url: '#' },
        { label: '외부연결 관리', url: this.$route.path }
      ]
      return arr
    }
  },
  watch: {
    async 'filter.pageNum' () {
      await this.totalOuterLeadList()
    }
  },
  mounted () {},
  methods: {
    // 조회
    async totalOuterLeadList () {
      this.isLoading = true
      try {
        const {
          status,
          data: { data }
        } = await this.$axios.get('/api/cartoon/manager/outlink', {
          params: this.filter
        })
        if (status === 200) {
          this.items = data
          this.totalRows = data.total
        }
      } catch (e) {
        console.log(e)
      } finally {
        this.isLoading = false
      }
    },
    // 삭제
    async removeOuterLead (id) {
      if (confirm('정말 삭제하시겠습니까?') === true) {
        try {
          const { status } = await this.$axios.delete(
            `/api/cartoon/manager/outlink/${id}`
          )

          if (status === 200) {
            alert('삭제가 완료 되었습니다.')
            await this.totalOuterLeadList()
          }
        } catch (e) {
          console.log(e)
        }
      } else {
        return false
      }
    }
  }
}
</script>
