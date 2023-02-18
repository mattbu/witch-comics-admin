<template>
  <b-container fluid class="page-min-height py-3">
    <UiPageTitle title="19+홈 관리" :breadcrumb="breadcrumb">
      <template #buttons>
        <b-button variant="primary">
          미리보기
        </b-button>
        <b-button variant="primary" @click="changeOrder">
          저장
        </b-button>
      </template>
    </UiPageTitle>
    <hr>

    <b-row align-h="between" class="mt-2 mb-3">
      <b-col align-self="center">
        <h6 class="font-weight-bold">
          성인 편성모듈 규칙설정
        </h6>
      </b-col>
    </b-row>

    <table class="list table mb-0 table-layout-fixed">
      <thead>
        <tr>
          <th v-for="(th, index) in fields" :key="`th-${index}`">
            {{ th.label }}
          </th>
        </tr>
      </thead>
      <template v-if="isLoading">
        <tbody>
          <tr>
            <td colspan="10">
              <UiLoading />
            </td>
          </tr>
        </tbody>
      </template>
      <template v-else-if="!isLoading && items.length > 0">
        <draggable v-model="items" tag="tbody" ghost-class="ghost">
          <tr
            v-for="(tr, trIdx) in items"
            :key="`tr-${trIdx}`"
            class="text-center"
          >
            <td
              v-for="(td, tdIdx) in sortTableItems(tr, fields)"
              :key="`td-${tdIdx}`"
            >
              <template v-if="td.key === 'orders'">
                {{ tr.orders ? tr.orders : '-' }}
              </template>
              <template v-else-if="td.key === 'type'">
                {{ tr.type ? tr.type : '-' }}
              </template>
              <template v-else-if="td.key === 'display_order'">
                <h3 class="cursor-pointer">
                  <b-icon icon="list" />
                </h3>
              </template>
              <template v-else>
                {{ td.value }}
              </template>
            </td>
          </tr>
          <template #cell(setting)="data">
            <b-button
              variant="outline-secondary"
              class="table-inner-btn"
              @click="removeDiscount(data.item.id)"
            >
              삭제
            </b-button>
          </template>
        </draggable>
      </template>
      <template v-else-if="!isLoading && !items.length">
        <tbody>
          <tr>
            <td colspan="10">
              <PageNoResult />
            </td>
          </tr>
        </tbody>
      </template>
    </table>

    <!-- 테이블 -->
    <b-table
      class="list"
      :items="typeItems"
      :fields="typeFields"
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
      <!-- 작품명 -->
      <template #cell(title)="data">
        <NuxtLink :to="`/promotion/itamu/${data.item.id}`">
          {{ data.value ? data.value : '-' }}
        </NuxtLink>
      </template>
      <!-- 이용권 -->
      <template #cell(test)="data">
        {{ data.value ? data.value : '-' }}
      </template>
      <!-- 이따무 시간 -->
      <template #cell(waitTime)="data">
        {{ data.value ? `${data.value}시간` : '-' }}
      </template>
      <template #cell(setting)="data">
        <b-button
          variant="outline-secondary"
          class="table-inner-btn"
          @click="deleteItamu(data.item.id)"
        >
          추가
        </b-button>
      </template>
    </b-table>
  </b-container>
</template>

<script>
import draggable from 'vuedraggable'
import { sortTableItems } from '@/plugins/mixins'

export default {
  name: 'AdultWebComicListPage',
  components: { draggable },
  mixins: [sortTableItems],
  data () {
    return {
      moduleType: 1,
      isLoading: false,
      items: [],
      typeItems: [],
      idList: [],
      fields: [
        { key: 'orders', label: '노출순서' },
        { key: 'type', label: '유형' },
        { key: 'type', label: '편성모듈 개수' },
        { key: 'display_order', label: '순서변경' },
        { key: 'setting', label: '관리' }
      ],
      typeFields: [
        { key: 'orders', label: '노출순서' },
        { key: 'type', label: '유형' },
        { key: 'type', label: '편성모듈 개수' },
        { key: 'display_order', label: '순서변경' },
        { key: 'setting', label: '관리' }
      ]
    }
  },
  async fetch () {
    await this.getList()
  },
  computed: {
    breadcrumb () {
      const arr = [
        { label: '홈', url: '/' },
        { label: '편성모듈 관리', url: '#' },
        { label: '19+홈 관리', url: this.$route.path }
      ]
      return arr
    }
  },
  watch: {
    async moduleType () {
      await this.getList()
    },
    items (val) {
      if (val.length > 0) {
        this.idList = val.map(item => item.id)
      } else {
        this.idList = []
      }
    }
  },
  created () {
    if (this.$route.query.type === 'all') {
      this.moduleType = 1
    } else if (this.$route.query.type === 'adult') {
      this.moduleType = 3
    } else {
      this.moduleType = 1
    }
  },
  mounted () {},
  methods: {
    setLinkUrl (type, id) {
      if (type === '이따무') {
        if (this.moduleType === 1) {
          return `/organizeModule/${id}/itamuAdd?type=webtoon&rate=all`
        }
        return `/organizeModule/${id}/itamuAdd?type=webtoon&rate=adult`
      } else if (type === '관리자') {
        return `/organizeModule/${id}?type=webtoon`
      } else if (type === '카드형') {
        if (this.moduleType === 1) {
          return `/organizeModule/${id}/cardAdd?type=webtoon&rate=all`
        }
        return `/organizeModule/${id}/cardAdd?type=webtoon&rate=adult`
      } else if (type === '동영상') {
        return `/organizeModule/webComic/${id}/videoAdd`
      } else if (type === '매거진') {
        return `/organizeModule/webComic/${id}/magazineAdd`
      } else if (type === '이벤트') {
        if (this.moduleType === 1) {
          return `/organizeModule/${id}/eventAdd?type=webtoon&rate=all`
        }
        return `/organizeModule/${id}/eventAdd?type=webtoon&rate=adult`
      } else if (type === '오늘UP') {
        return '/organizeModule/comicWeek'
      } else if (type === '랭킹') {
        return '/organizeModule/comicRank'
      }
      return '/organizeModule/webComic'
    },
    async changeOrder () {
      try {
        const res = await this.$axios.put(
          '/api/manager/schedule/order/change',
          {
            ids: this.idList
          }
        )
        console.log(res)
        if (res.status === 200) {
          alert('수정이 완료 되었습니다.')
          await this.getList()
        }
      } catch (e) {
        console.log(e)
      }
    },
    async getList () {
      this.isLoading = true

      try {
        const {
          data: { data }
        } = await this.$axios.get(
          `/api/manager/schedule/list/${this.moduleType}`
        )
        this.items = data
        this.idList = data.map(item => item.id)
      } catch (e) {
        console.log(e)
      } finally {
        this.isLoading = false
      }
    }
  }
}
</script>
