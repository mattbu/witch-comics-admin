<template>
  <b-container fluid class="page-min-height py-3">
    <UiPageTitle title="연재 탭" :breadcrumb="breadcrumb">
      <template #buttons>
        <b-button variant="primary">
          적용
        </b-button>
      </template>
    </UiPageTitle>
    <hr>
    <!--    필터-->
    <b-row class="mt-3 px-3">
      <b-col lg="12" class="my-1">
        <b-form-group
          label="작품 검색"
          label-cols-sm="2"
          label-align-sm="left"
          label-size="sm"
          class="mb-0"
        >
          <b-form-input class="w-25" />
        </b-form-group>
      </b-col>
      <b-col lg="12" class="my-1">
        <b-form-group
          label="연재 탭"
          label-cols-sm="2"
          label-align-sm="left"
          label-size="sm"
          class="mb-0"
        >
          <b-form-select class="w-25" />
        </b-form-group>
      </b-col>
    </b-row>
    <hr>
    <b-row align-h="center" class="mt-2 mb-4">
      <b-col cols="2">
        <b-button variant="primary" class="w-75">
          작품 검색
        </b-button>
      </b-col>
    </b-row>
    <b-row>
      <b-col cols="12" class="d-inline-flex">
        <b-button
          v-for="(tab, index) in serialTabs"
          :key="`serial-tab-${index}`"
          variant="outline-secondary"
          class="mr-2 table-inner-btn"
        >
          {{ `${tab.text} (${tab.value})` }}
        </b-button>
      </b-col>
    </b-row>
    <hr class="my-2">
    <b-row align-h="between" class="mb-4">
      <b-col cols="auto">
        <b-form-select v-model="selectedOrder" :options="orderOptions" />
      </b-col>
      <b-col cols="auto">
        <b-button variant="primary" @click="openPreviewModal">
          미리보기
        </b-button>
      </b-col>
    </b-row>
    <table class="table mb-0 table-layout-fixed">
      <thead>
        <tr>
          <th v-for="(th, index) in fields" :key="`th-${index}`">
            <template v-if="th.key === 'order'">
              {{ selectedOrder === 1 ? '인기순' : '최신순' }}
            </template>
            <template v-else>
              {{ th.label }}
            </template>
          </th>
        </tr>
      </thead>
      <draggable v-model="items" tag="tbody" handle=".handle" :move="test">
        <tr
          v-for="(tr, trIdx) in items"
          :key="`tr-${trIdx}`"
          class="text-center"
        >
          <td
            v-for="(td, tdIdx) in sortTableItems(tr, fields)"
            :key="`td-${tdIdx}`"
          >
            <template v-if="td.key === 'fix'">
              <b-form-checkbox v-model="selectedList" :value="tr.id" />
              {{ td.value }}
            </template>
            <template v-else-if="td.key === 'thumbnail'">
              <div class="thumbnail-wrapper">
                <img :src="td.value" alt="">
              </div>
            </template>
            <template v-else-if="td.key === 'display_order'">
              <h3
                class="cursor-pointer"
                :class="selectedList.includes(tr.id) ? '' : 'handle'"
              >
                <b-icon icon="list" />
              </h3>
            </template>
            <template v-else>
              {{ td.value }}
            </template>
          </td>
        </tr>
      </draggable>
      <!--      테스트-->
      <!--      <tbody>-->
      <!--        <draggable-->
      <!--          v-for="(tr, trIdx) in items"-->
      <!--          :key="`tr-${trIdx}`"-->
      <!--          v-model="items"-->
      <!--          tag="tr"-->
      <!--          handle=".handle"-->
      <!--          class="text-center"-->
      <!--          @change="test"-->
      <!--        >-->
      <!--          <td v-for="(td, tdIdx) in sortTableItems(tr, fields)" :key="`td-${tdIdx}`">-->
      <!--            <template v-if="td.key === 'fix'">-->
      <!--              <b-form-checkbox v-model="selectedList" :value="tr.id" />-->
      <!--              {{ td.value }}-->
      <!--            </template>-->
      <!--            <template v-else-if="td.key === 'thumbnail'">-->
      <!--              <div class="thumbnail-wrapper">-->
      <!--                <img :src="td.value" alt="">-->
      <!--              </div>-->
      <!--            </template>-->
      <!--            <template v-else-if="td.key === 'display_order'">-->
      <!--              <h3 class="cursor-pointer" :class="selectedList.includes(tr.id) ? '' : 'handle'">-->
      <!--                <b-icon icon="list" />-->
      <!--              </h3>-->
      <!--            </template>-->
      <!--            <template v-else>-->
      <!--              {{ td.value }}-->
      <!--            </template>-->
      <!--          </td>-->
      <!--        </draggable>-->
      <!--      </tbody>-->
    </table>
    <hr>
    <PageSerialTabPreviewModal
      modal-id="preview-modal"
      modal-title="오늘UP 미리보기"
      cancel-title="닫기"
      modal-size="xl"
    />
  </b-container>
</template>

<script>
import draggable from 'vuedraggable'
import { sortTableItems } from '@/plugins/mixins'

export default {
  name: 'ContentSerialTabListPage',
  components: { draggable },
  mixins: [sortTableItems],
  data () {
    return {
      selectedOrder: 1,
      orderOptions: [
        { value: 1, text: '인기순' },
        { value: 2, text: '최신순' }
      ],
      serialTabs: [
        { text: '월요일', value: '13' },
        { text: '화요일', value: '15' },
        { text: '수요일', value: '16' },
        { text: '목요일', value: '18' },
        { text: '금요일', value: '16' },
        { text: '토요일', value: '11' },
        { text: '일요일', value: '10' },
        { text: '열흘마다', value: '9' },
        { text: '비정기', value: '9' }
      ],
      selectedList: [],
      items: [
        {
          id: 1,
          order: '1',
          thumbnail: require('assets/img/다크_나이트_포스터.jpeg'),
          title: '제목3',
          writer: '나화백',
          painter: '김소설',
          edition: '123',
          created_at: '2018.10.29',
          status: '연재'
        },
        {
          id: 2,
          order: '2',
          thumbnail: require('assets/img/beautiful-rain-forest-ang-ka-nature-trail-doi-inthanon-national-park-thailand-36703721.jpeg'),
          title: '제목3',
          writer: '나화백',
          painter: '김소설',
          edition: '123',
          created_at: '2018.10.29',
          status: '연재'
        },
        {
          id: 3,
          order: '3',
          thumbnail: require('assets/img/Rectangle.png'),
          title: '제목3',
          writer: '나화백',
          painter: '김소설',
          edition: '123',
          created_at: '2018.10.29',
          status: '연재'
        }
      ],
      fields: [
        { key: 'fix', label: '고정' },
        { key: 'order', label: '인기순' },
        { key: 'thumbnail', label: '썸네일' },
        { key: 'title', label: '제목' },
        { key: 'writer', label: '글작가' },
        { key: 'painter', label: '그림작가' },
        { key: 'edition', label: '화수' },
        { key: 'created_at', label: '최근등록일' },
        { key: 'status', label: '연재상태' },
        { key: 'display_order', label: '노출순서' }
      ]
    }
  },
  computed: {
    breadcrumb () {
      const arr = [
        { label: '홈', url: '/' },
        { label: '콘텐츠 관리', url: '#' },
        { label: '연재 탭', url: this.$route.path }
      ]
      return arr
    }
  },
  watch: {},
  mounted () {
    this.totalRows = this.items.length
  },
  methods: {
    test (e) {
      if (this.selectedList.includes(e.draggedContext.element.id)) {
        return false
      }
      return true
    },
    openPreviewModal () {
      this.$root.$emit('bv::show::modal', 'preview-modal')
    }
  }
}
</script>
