<template>
  <b-container fluid class="page-min-height py-3">
    <b-row class="mt-2">
      <b-col cols="12">
        <table class="table border mb-0 table-layout-fixed center-box">
          <colgroup>
            <col style="width: 15%">
            <col>
            <col style="width: 10%">
            <col>
          </colgroup>
          <tbody>
            <tr>
              <th>작품명</th>
              <td>
                <p>{{ pieceInfo.title ? pieceInfo.title : '-' }}</p>
              </td>
              <th>작품 아이디</th>
              <td>
                <p>{{ pieceInfo.id ? pieceInfo.id : '-' }}</p>
              </td>
              <th>작가명</th>
              <td>
                <p>{{ pieceInfo.writer ? pieceInfo.writer : '-' }}</p>
              </td>
            </tr>
            <tr>
              <th>유형</th>
              <td>
                <p>{{ pieceInfo.isBook ? pieceInfo.isBook : '-' }}</p>
              </td>
              <th>구분</th>
              <td>
                <p>{{ pieceInfo.menucode === '1' ? '웹툰/만화' : pieceInfo.menucode === '2' ? '소설' :'-' }}</p>
              </td>
              <th>상태</th>
              <td>
                <p>{{ pieceInfo.status ? pieceInfo.status : '-' }}</p>
              </td>
            </tr>
            <tr>
              <th>CP사</th>
              <td>
                <p>{{ pieceInfo.cpName ? pieceInfo.cpName : '-' }}</p>
              </td>
              <th>장르</th>
              <td>
                <p>{{ pieceInfo.genre ? pieceInfo.genre : '-' }}</p>
              </td>
              <th>연령등급</th>
              <td>
                <p>{{ pieceInfo.rate ? pieceInfo.rate : '-' }}</p>
              </td>
            </tr>
            <tr>
              <th>연재일</th>
              <td>
                <p>{{ pieceInfo.displayStartDate ? pieceInfo.displayStartDate : '-' }}</p>
              </td>
              <th>가격</th>
              <td>
                <p>{{ pieceInfo.price ? pieceInfo.price : '-' }}</p>
              </td>
              <th>무료회차수</th>
              <td>
                <p>{{ pieceInfo.freeCnt ? `${pieceInfo.freeCnt}화` : '-' }}</p>
              </td>
            </tr>
          </tbody>
        </table>
      </b-col>
    </b-row>
    <b-row class="pt-5">
      <b-col>
        <div class="d-flex justify-content-start align-item-center">
          <h6 class="mt-2">
            회차 목록 ({{ editionList.length > 0 ? editionList.length : '0' }})
          </h6>
          <b-button
            variant="primary"
            class="ml-2"
            @click="openModal('serial-edit-modal')"
          >
            회차 변경
          </b-button>
          <b-button variant="primary" class="ml-2">
            원고 다운로드
          </b-button>
        </div>
      </b-col>
    </b-row>
    <hr class="my-2">
    <b-row class="d-flex justify-content-between mb-4">
      <b-col cols="auto">
        <b-button variant="primary">
          무료 변경
        </b-button>
        <b-button variant="primary">
          유료 변경
        </b-button>
      </b-col>
      <b-col cols="auto" class="text-left">
        <b-button variant="primary">
          썸네일 일괄등록
        </b-button>
        <b-button variant="primary">
          회차 명 일괄변경
        </b-button>
        <b-button variant="primary">
          회차 명 전체 다운로드
        </b-button>
      </b-col>
    </b-row>
    <!-- 테이블 -->
    <b-table
      class="list"
      :items="editionList"
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
      <template #table-colgroup>
        <col style="width: 8%">
        <col style="width: 3%">
        <col style="width: 5%">
        <col style="width: 10%">
        <col style="width: 22%">
        <col style="width: 22%">
        <col style="width: 10%">
        <col style="width: 10%">
        <col style="width: 12%">
        <col style="width: 8%">
        <col style="width: 12%">
        <col style="width: 12%">
      </template>
      <template #head(select)>
        <b-form-checkbox
          v-model="selectAll"
          :indeterminate="indeterminate"
          @change="toggleAll"
        />
      </template>
      <template #cell(select)="data">
        <b-form-checkbox
          v-model="selectedList"
          :value="data.item.id"
          style="float: unset"
        />
      </template>
      <template #cell(no)="data">
        {{ editionList.length - (currentPage - 1) * perPage - (data.index + 1) + 1 }}
      </template>
      <template #cell(edition)="data">
        {{ data.index + 1 }}
      </template>
      <template #cell(thumbnailUrl)="data">
        <div v-if="data.value" class="thumbnail-wrapper">
          <img :src="data.value" alt="">
        </div>
        <div v-else class="thumbnail-wrapper none" />
      </template>
      <template #cell(title)="data">
        <NuxtLink :to="`/content/piece/${$route.params.id}/edition/${data.item.id}?menucode=${pieceInfo.menucode}`">
          {{ data.value }}
        </NuxtLink>
      </template>
      <template #cell(subtitle)="data">
        {{ data.value ? data.value : '-' }}
      </template>
      <template #cell(draft)>
        보기
      </template>
      <template #cell(mcOpenDate)="data">
        {{ data.value ? data.value : '-' }}
      </template>
      <template #cell(createdAt)="data">
        {{ data.value ? `${data.value.split('T')[0]} ${data.value.split('T')[1].split('.')[0].substr(0, 5)}` : '-' }}
      </template>
      <template #cell(updatedAt)="data">
        {{ data.value ? `${data.value.split('T')[0]} ${data.value.split('T')[1].split('.')[0].substr(0, 5)}` : '-' }}
      </template>
    </b-table>

    <!-- 회차 명 일괄 변경(serial-edit-modal) -->
    <UiCenterModal
      modal-id="serial-edit-modal"
      title="회차 변경"
      ok-title="적용"
      cancel-title="취소"
      class="modal-close-button"
    >
      <template #contents>
        <b-container fluid class="px-0">
          <b-row class="px-3">
            <b-col lg="12" class="my-2">
              <b-p class="font-weight-700">
                이동 회차 선택
              </b-p>
              <b-form-radio value="" class="my-3">
                4.티아라 4화
              </b-form-radio>
              <b-form-radio value="" class="my-3">
                3.티아라 3화
              </b-form-radio>
              <b-form-radio value="" class="my-3">
                2.티아라 2화
              </b-form-radio>
              <b-form-radio value="" class="my-3">
                1.티아라 1화
              </b-form-radio>

              <hr class="my-2">
            </b-col>
          </b-row>
          <b-row class="mt-3 px-3">
            <b-col lg="12" class="my-1">
              <div
                class="d-flex justify-content-center align-item-center font-weight-700"
              >
                <p class="my-2">
                  <span>0</span>화는
                </p>
                <b-form-input class="w-10 mx-2" />
                <p class="my-2">
                  화 위치로 이동합니다.
                </p>
              </div>
            </b-col>
          </b-row>
          <b-row class="mt-3 px-3">
            <b-col lg="12" class="my-1" :style="{ color: 'red' }">
              <P class="text-center">
                *이동하는 작품글보다 이동할 곳의 작품글의 순서가 낮을 경우,
                기존의 작품 글은 ‘다음 회차’로 밀러납니다.
              </P>
            </b-col>
          </b-row>
          <b-row class="mt-3 px-3">
            <b-col lg="12" class="my-1" :style="{ color: 'red' }">
              <P class="text-center">
                *이동하는 작품글보다 이동할 곳의 작품글의 순서가 높을 경우,
                기존의 작품 글은 ‘이전 회차로’로 밀러납니다
              </P>
            </b-col>
          </b-row>
        </b-container>
      </template>
    </UiCenterModal>
  </b-container>
</template>

<script>
export default {
  name: 'ContentPieceEditionListPage',
  data () {
    return {
      selectAll: false,
      selectedList: [],
      indeterminate: false,
      fields: [
        { key: 'select', label: '' },
        { key: 'no', label: '번호' },
        { key: 'edition', label: '회' },
        { key: 'thumbnailUrl', label: '썸네일' },
        { key: 'title', label: '제목' },
        { key: 'subTitle', label: '부제' },
        { key: 'isFree', label: '판매 유형' },
        { key: 'draft', label: '원고' },
        { key: 'mcOpenDate', label: '시작일' },
        { key: 'status', label: '회차 상태' },
        { key: 'createdAt', label: '등록일' },
        { key: 'updatedAt', label: '수정일' }
      ],
      currentPage: 1,
      perPage: 5,

      // 회차 리스트
      isLoading: false,
      isInfoLoading: false,
      pieceInfo: {},
      editionList: []
    }
  },
  async fetch () {
    await this.getInfo()
    await this.getList()
  },
  computed: {
    breadcrumb () {
      const arr = [
        { label: '홈', url: '/' },
        { label: '콘텐츠 관리', url: '#' },
        { label: '작품 관리', url: '/content/piece' },
        {
          label: '회차 목록',
          url: `/content/piece/${this.$route.params.id}/edition`
        }
      ]
      return arr
    }
  },
  watch: {
    selectedList (val) {
      if (val.length === 0) {
        this.indeterminate = false
        this.selectAll = false
      } else if (val.length === this.editionList.length) {
        this.indeterminate = false
        this.selectAll = true
      } else {
        this.indeterminate = true
        this.selectAll = false
      }
    }
  },
  mounted () {},
  methods: {
    /** 테이블 헤더 체크박스 토글 */
    toggleAll (checked) {
      if (checked) {
        this.selectedList = this.editionList.map(item => item.id)
      } else {
        this.selectedList = []
      }
    },
    /** 상단 정보 */
    async getInfo () {
      this.isInfoLoading = true
      try {
        const { status, data: { data } } = await this.$axios.get(`/api/cartoon/contents/sub/base/${this.$route.params.id}`)
        if (status === 200) {
          this.pieceInfo = data
        }
      } catch (e) {
        console.log(e)
      } finally {
        this.isInfoLoading = false
      }
    },
    /** 회차 목록 */
    async getList () {
      this.isLoading = true

      try {
        const { status, data: { data } } = await this.$axios.get(`/api/cartoon/contents/list/sub/${this.$route.params.id}`)
        if (status === 200) {
          this.editionList = data
        }
      } catch (e) {
        console.log(e)
      } finally {
        this.isLoading = false
      }
    },
    openModal (id) {
      this.$root.$emit('bv::show::modal', id)
    }
  }
}
</script>
