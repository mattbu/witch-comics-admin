<template>
  <b-container fluid class="page-min-height py-3">
    <UiPageTitle title="매출내역" :breadcrumb="breadcrumb" />
    <hr>
    <!--필터-->
    <b-container fluid class="px-0" tag="form" @submit.prevent="getList">
      <b-row class="mt-3 px-3">
        <b-col lg="12" class="my-1">
          <b-form-group
            v-slot="{ ariaDescribedby }"
            label="구분"
            label-cols-sm="2"
            label-align-sm="left"
            label-size="sm"
            class="mb-0"
          >
            <b-form-checkbox-group
              id="checkbox-group-1"
              v-model="filterType"
              class="my-2"
              :options="typeOptions"
              :aria-describedby="ariaDescribedby"
              name="flavour-1"
            />
          </b-form-group>
        </b-col>
        <b-col lg="12" class="my-1">
          <b-form-group
            label="작품"
            label-cols-sm="2"
            label-align-sm="left"
            label-size="sm"
            class="mb-0 align-items-center"
          >
            <div class="d-flex">
              <b-form-input v-model="searchValue" class="w-25" />
              <b-button variant="primary" class="ml-2">
                찾기
              </b-button>
            </div>
          </b-form-group>
        </b-col>

        <b-col lg="12" class="my-1">
          <b-form-group
            v-slot="{ ariaDescribedby }"
            label="상태"
            label-cols-sm="2"
            label-align-sm="left"
            label-size="sm"
            class="mb-0 my-2"
          >
            <b-form-checkbox-group
              id="checkbox-group-1"
              v-model="filterStatus"
              :options="statusOptions"
              :aria-describedby="ariaDescribedby"
              name="flavour-1"
            />
          </b-form-group>
        </b-col>

        <b-col lg="12" class="my-1">
          <b-form-group
            label="기간"
            label-cols-sm="2"
            label-align-sm="left"
            label-size="sm"
          >
            <div class="d-inline-flex w-30">
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
    <b-row>
      <b-col class="d-inline-flex justify-content-between align-items-center">
        <h6 class="">
          매출 내역 ({{ totalRows ? totalRows : '0' }})
        </h6>
        <b-button variant="primary" class="mb-2">
          엑셀 다운
        </b-button>
      </b-col>
    </b-row>
    <hr class="mt-0">

    <!-- test -->
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
      <template #cell(name)="data">
        {{ data.value ? data.value : '-' }}
      </template>
      <template #cell(info)="data">
        {{ data.value ? data.value : '-' }}
      </template>
      <template #cell(updatedAt)="data">
        {{ data.value ? data.value.split('T')[0] : '-' }}
      </template>
      <template #cell(createdAt)="data">
        {{ data.value ? data.value.split('T')[0] : '-' }}
      </template>
      <template #cell(contentCnt)="data">
        <div
          class="table-inner-modal"
          @click="
            openModal('count-publisher-modal', data.item.id, data.item.name)
          "
        >
          {{ data.value }}
        </div>
      </template>
      <template #cell(setting)="data">
        <b-button
          variant="outline-secondary"
          class="table-inner-btn"
          @click="openModal('edit-publisher-modal', data.item.id)"
        >
          수정
        </b-button>
      </template>
    </b-table>
    <!--  -->

    <!-- <b-table-simple class="list split-header">
      <b-thead>
        <b-tr>
          <b-th
            v-for="(th, thIdx) in fields"
            :key="`th-${thIdx}`"
            :rowspan="setRowSpan(th.key)"
            :colspan="setColspan(th.key)"
          >
            {{ th.label }}
          </b-th>
        </b-tr>
        <b-tr>
          <b-th>대여</b-th>
          <b-th>소장</b-th>
          <b-th>대여</b-th>
          <b-th>소장</b-th>
        </b-tr>
      </b-thead>
      <b-tbody>
        <b-tr v-for="(tr, trIdx) in items" :key="`tr-${trIdx}`">
          <b-td
            v-for="(td, tdIdx) in sortTableItems(tr, fields)"
            :key="`td-${tdIdx}`"
            :colspan="setBodyColspan(td.key)"
          >
            <template v-if="td.key === 'title'">
              <NuxtLink :to="`/calculate/content/${tr['id']}`">
                {{ td.value }}
              </NuxtLink>
            </template>
            <template
              v-else-if="td.key === 'potion' || td.key === 'fixed_charge'"
            >
              <b-row>
                <b-col v-for="key in td.value" :key="`sns-${key}`">
                  {{ key }}
                </b-col>
              </b-row>
            </template>
            <template v-else>
              {{ td.value }}
            </template>
          </b-td>
        </b-tr>
      </b-tbody>
    </b-table-simple> -->

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
import { sortTableItems } from '@/plugins/mixins'

export default {
  name: 'ContentPieceListPage',
  mixins: [sortTableItems],
  data () {
    return {
      isLoading: false,
      totalRows: 0,
      currentPage: 1,
      perPage: 5,
      filter: {
        search: 1,
        type: [],
        status: [],
        period: '',
        dateSearch: 1
      },
      currentSettingId: '',
      selectedPerPage: 100,
      searchOptions: [
        { text: '작품명', value: 1 },
        { text: 'CP사', value: 2 },
        { text: '작품번호', value: 3 }
      ],
      // 유형
      typeOptions: [
        { value: 1, text: '웹툰/만화' },
        { value: 2, text: '소설' }
      ],
      // 상태:
      statusOptions: [
        { value: 1, text: '국내' },
        { value: 2, text: '해외' }
      ],
      // 기간 검색
      dateSearchOptions: [
        { value: 1, text: '시작일' },
        { value: 2, text: '종료일' },
        { value: 3, text: '등록일' }
      ],
      items: [
        // {
        //   id: 5,
        //   title: '엔네아드',
        //   type: '웹툰',
        //   cp: '서울 문화사',
        //   pumpkin: '520',
        //   potion: {
        //     rent: '64',
        //     own: '80'
        //   },
        //   fixed_charge: {
        //     rent: '90',
        //     own: '180'
        //   },
        //   free_user: '3',
        //   free_edition: '10000',
        //   payed_user: '1',
        //   payed: '6000',
        //   payment: '10000'
        // },
        // {
        //   id: 20,
        //   title: '엔네아드2',
        //   type: '웹툰',
        //   cp: '서울 문화사',
        //   pumpkin: '520',
        //   potion: {
        //     rent: '64',
        //     own: '80'
        //   },
        //   fixed_charge: {
        //     rent: '90',
        //     own: '180'
        //   },
        //   free_user: '3',
        //   free_edition: '10000',
        //   payed_user: '1',
        //   payed: '6000',
        //   payment: '10000'
        // },
        // {
        //   id: 3,
        //   title: '엔네아드3',
        //   type: '웹툰',
        //   cp: '서울 문화사',
        //   pumpkin: '520',
        //   potion: {
        //     rent: '64',
        //     own: '80'
        //   },
        //   fixed_charge: {
        //     rent: '90',
        //     own: '180'
        //   },
        //   free_user: '3',
        //   free_edition: '10000',
        //   payed_user: '1',
        //   payed: '6000',
        //   payment: '10000'
        // }
      ],
      // fields: [
      //   { key: 'title', label: '번호' },
      //   { key: 'title', label: '국가' },
      //   { key: 'title', label: '구분' },
      //   { key: 'title', label: '유형' },
      //   { key: 'title', label: '장르' },
      //   { key: 'title', label: '작품명' },
      //   { key: 'type', label: 'CP사' },

      //   { key: 'potion', label: '물약' },
      //   { key: 'fixed_charge', label: '구매수' },

      //   { key: 'payed', label: '판매 물약 수' },
      //   { key: 'payment', label: '총 매출금액' }
      // ],
      fields: [
        { key: 'no', label: '번호' },
        { key: 'name', label: '출판사명' },
        { key: 'contentCnt', label: '작품 수' },
        { key: 'updatedAt', label: '등록/최종수정' },
        { key: 'createdAt', label: '등록일' },
        { key: 'setting', label: '관리' }
      ],
      filterSort: [],
      filterAdult: [],
      searchValue: '',
      startDate: '',
      endDate: ''
    }
  },
  computed: {
    breadcrumb () {
      const arr = [
        { label: '홈', url: '/' },
        { label: '정산 관리', url: '#' },
        { label: '매출내역', url: this.$route.path }
      ]
      return arr
    }
  },
  watch: {},
  mounted () {
    this.totalRows = this.items.length
  },
  methods: {
    async getList () {
      this.isLoading = true
      try {
        const {
          data: { data }
        } = await this.$axios.get('/api/cartoon/manager/publisherList', {
          params: {
            publisherName: this.searchValue,
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
    setBodyColspan (key) {
      if (key === 'potion') {
        return 2
      } else if (key === 'fixed_charge') {
        return 2
      } else {
        return null
      }
    },
    setRowSpan (key) {
      if (key === 'potion') {
        return null
      } else if (key === 'fixed_charge') {
        return null
      } else {
        return 2
      }
    },
    setColspan (key) {
      if (key === 'potion') {
        return 2
      } else if (key === 'fixed_charge') {
        return 2
      } else {
        return null
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
