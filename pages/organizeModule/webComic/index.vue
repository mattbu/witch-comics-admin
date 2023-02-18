<template>
  <b-container fluid class="page-min-height py-3">
    <UiPageTitle title="웹툰/만화 홈 관리" :breadcrumb="breadcrumb">
      <template #buttons>
        <b-button variant="primary">
          미리보기
        </b-button>
        <b-button variant="primary" to="/organizeModule/add?type=webtoon">
          등록
        </b-button>
        <b-button variant="primary" @click="changeOrder">
          저장
        </b-button>
      </template>
    </UiPageTitle>
    <hr>

    <b-row>
      <b-col cols="12">
        <b-button
          :variant="moduleType === 1 ? 'primary' : 'outline-primary'"
          @click="
            moduleType = 1
            $router.push('/organizeModule/webComic?type=all')
          "
        >
          일반
        </b-button>
        <b-button
          :variant="moduleType === 3 ? 'primary' : 'outline-primary'"
          @click="
            moduleType = 3
            $router.push('/organizeModule/webComic?type=adult')
          "
        >
          성인
        </b-button>
      </b-col>
    </b-row>

    <b-row align-h="between" class="mt-5 mb-3">
      <b-col align-self="center">
        <h6 class="font-weight-bold">
          편성모듈 순서 설정
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
              <template v-else-if="td.key === 'title'">
                <NuxtLink :to="setLinkUrl(tr.type, tr.groupId)">
                  {{ tr.title ? tr.title : '-' }}
                </NuxtLink>
              </template>
              <template v-else-if="td.key === 'status'">
                {{ tr.status ? tr.status : '-' }}
              </template>
              <template v-else-if="td.key === 'startDate'">
                {{ tr.startDate ? tr.startDate : '-' }}
              </template>
              <template v-else-if="td.key === 'endDate'">
                {{ tr.endDate ? tr.endDate : '-' }}
              </template>
              <template v-else-if="td.key === 'showRate'">
                {{ tr.showRate ? tr.showRate : '-' }}
              </template>
              <template v-else-if="td.key === 'isShow'">
                {{ tr.isShow ? tr.isShow : '-' }}
              </template>
              <template v-else-if="td.key === 'updatedAt'">
                {{ tr.updatedAt ? tr.updatedAt : '-' }}
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
  </b-container>
</template>

<script>
import draggable from 'vuedraggable'
import { sortTableItems } from '@/plugins/mixins'

export default {
  name: 'WebComicListPage',
  components: { draggable },
  mixins: [sortTableItems],
  data () {
    return {
      moduleType: 1,
      isLoading: false,
      items: [],
      idList: [],
      fields: [
        { key: 'orders', label: '노출순서' },
        { key: 'type', label: '편성모듈' },
        { key: 'title', label: '타이틀' },
        { key: 'status', label: '상태' },
        { key: 'startDate', label: '시작일' },
        { key: 'endDate', label: '종료일' },
        { key: 'showRate', label: '노출등급' },
        { key: 'isShow', label: '노출여부' },
        { key: 'updatedAt', label: '최종수정일' },
        { key: 'display_order', label: '순서변경' }
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
        { label: '웹툰/만화 홈 관리', url: this.$route.fullPath }
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
        if (this.moduleType === 1) {
          return `/organizeModule/${id}/videoAdd?type=webtoon&rate=all`
        }
        return `/organizeModule/${id}/videoAdd?type=webtoon&rate=adult`
      } else if (type === '매거진') {
        return `/organizeModule/webComic/${id}/magazineAdd`
      } else if (type === '이벤트') {
        if (this.moduleType === 1) {
          return `/organizeModule/${id}/eventAdd?type=webtoon&rate=all`
        }
        return `/organizeModule/${id}/eventAdd?type=webtoon&rate=adult`
      } else if (type === '오늘UP') {
        return '/organizeModule/comicWeek'
      } else if (type === '실시간랭킹') {
        if (this.moduleType === 1) {
          return '/organizeModule/comicRank?type=all'
        }
        return '/organizeModule/comicRank?type=adult'
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
