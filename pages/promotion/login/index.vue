<template>
  <b-container fluid class="page-min-height py-3">
    <UiPageTitle title="로그인" :breadcrumb="breadcrumb">
      <template #buttons>
        <b-button variant="primary" to="/promotion/login/add">
          등록
        </b-button>
      </template>
    </UiPageTitle>
    <hr>
    <!--필터-->
    <b-row>
      <b-col lg="12" class="my-1">
        <b-form-group
          v-slot="{ ariaDescribedby }"
          label="지급 이벤트 상태"
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
          class="mb-0"
        >
          <b-form-radio-group
            v-model="filter.promotionPeriod"
            :options="promotionPeriodOptions"
            :aria-describedby="ariaDescribedby"
            class="mt-1"
          />
          <div class="d-inline-flex justify-content-start w-100 my-2">
            <div class="d-inline-flex w-40">
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
      :current-page="currentPage"
      :busy="isLoading"
      :per-page="perPage"
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
      <!-- 구분명 -->
      <template #cell(isBook)="data">
        {{ data.value ? data.value : '-' }}
      </template>
      <!-- 시작일 -->
      <template #cell(menucode)="data">
        {{ data.value ? data.value.split('T')[0] : '-' }}
      </template>
      <!-- 종료일 -->
      <template #cell(title)="data">
        <NuxtLink :to="`/promotion/itamu/${data.item.id}`">
          {{ data.value ? data.value : '-' }}
        </NuxtLink>
      </template>
      <!-- 지급호박 -->
      <template #cell(cp)="data">
        {{ data.value ? data.value : '-' }}
      </template>
      <!-- 최대호박 -->
      <template #cell(startDate)="data">
        {{ data.value ? data.value : '-' }}
      </template>
      <!-- 포인트 만료일 -->
      <template #cell(endDate)="data">
        {{ data.value ? data.value.split('T')[0] : '-' }}
      </template>
      <!-- 상태 -->
      <template #cell(status)="data">
        <p
          v-if="data.value === '진행'"
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
      <!-- 등록일 -->
      <template #cell(waitTime)="data">
        {{ data.value ? data.value.split('T')[0] : '-' }}
      </template>
      <!-- 등록/최종수정 -->
      <template #cell(episode)="data">
        {{ data.value ? data.value : '-' }}
      </template>
      <!-- 관리 -->
      <template #cell(setting)="data">
        <b-button
          variant="outline-secondary"
          class="table-inner-btn"
          @click="deleteLogin(data.item.id)"
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
        type: [],
        status: [],
        period: ''
      },
      currentSettingId: '',
      // 프로모션 상태
      statusOptions: [
        { value: '대기', text: '대기' },
        { value: '진행중', text: '진행중' },
        { value: '종료', text: '종료' }
      ],
      // 프로모션 기간
      promotionPeriodOptions: [
        { value: '시작일', text: '시작일' },
        { value: '종료일', text: '종료일' }
      ],
      items: [
        {
          id: 1,
          divisionName: '11월 지급 이벤트',
          start_at: '2022-09-25 00:00',
          end_at: '2022-09-25 00:00',
          givePumpkin: '30',
          givePotion: '30',
          maxPotion: '30',
          point_end_at: '7일',
          status: '대기',
          regist_at: '2018.10.29',
          admin: '박담당',
          setting: '상세'
        },
        {
          id: 1,
          divisionName: '11월 지급 이벤트',
          start_at: '2022-09-25 00:00',
          end_at: '2022-09-25 00:00',
          givePumpkin: '30',
          givePotion: '30',
          maxPotion: '30',
          point_end_at: '7일',
          status: '대기',
          regist_at: '2018.10.29',
          admin: '박담당',
          setting: '상세'
        },
        {
          id: 1,
          divisionName: '11월 지급 이벤트',
          start_at: '2022-09-25 00:00',
          end_at: '2022-09-25 00:00',
          givePumpkin: '30',
          givePotion: '30',
          maxPotion: '30',
          point_end_at: '7일',
          status: '대기',
          regist_at: '2018.10.29',
          admin: '박담당',
          setting: '상세'
        }
      ],
      fields: [
        { key: 'no', label: '번호' },
        { key: 'divisionName', label: '시작일' },
        { key: 'start_at', label: '종료일' },
        { key: 'givePumpkin ', label: '지급호박' },
        { key: 'givePotion', label: '지급물약' },
        { key: 'maxPotion', label: '최대물약' },
        { key: 'point_end_at', label: '포인트 만료일' },
        { key: 'status', label: '상태' },
        { key: 'regist_at', label: '등록일' },
        { key: 'admin', label: '등록/최종수정' },
        { key: 'setting', label: '관리' }
      ],
      totalRows: 1,
      currentPage: 1,
      perPage: 5,
      filterSort: [],
      filterAdult: [],
      searchValue: '',
      startDate: '',
      endDate: ''
    }
  },
  async fetch () {
    await this.totalLoginList()
  },
  computed: {
    breadcrumb () {
      const arr = [
        { label: '홈', url: '/' },
        { label: '프로모션 관리', url: '#' },
        { label: '로그인', url: this.$route.path }
      ]
      return arr
    }
  },
  watch: {},
  mounted () {
    this.totalRows = this.items.length
  },
  methods: {
    // 목록
    async totalLoginList () {
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
    async deleteLogin (id) {
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
