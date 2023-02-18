<template>
  <b-container fluid class="page-min-height py-3">
    <UiPageTitle title="작가 정보 관리" :breadcrumb="breadcrumb">
      <template #buttons>
        <b-button
          variant="primary"
          @click="openModal('add-writer-modal')"
        >
          일괄 수정
        </b-button>
        <b-button
          variant="primary"
          @click="openModal('add-writer-modal')"
        >
          등록
        </b-button>
      </template>
    </UiPageTitle>
    <hr class="mb-2">
    <!--필터-->
    <b-container fluid class="px-0" tag="form" @submit.prevent="getWriterList">
      <b-row class="px-3">
        <b-col lg="12" class="my-1">
          <b-form-group
            label="작가명"
            label-cols-sm="2"
            label-align-sm="left"
            label-size="sm"
            label-class="align-self-center"
            class="mb-0 align-items-center"
          >
            <div class="d-flex">
              <b-form-input v-model="filter.penName" class="w-25" />
            </div>
          </b-form-group>
        </b-col>
      </b-row>
      <hr class="my-2">
      <b-row align-h="center" class="mb-4">
        <b-col cols="2">
          <b-button type="submit" variant="primary" class="w-60">
            검색
          </b-button>
        </b-col>
      </b-row>
    </b-container>
    <b-row>
      <b-col class="d-inline-flex justify-content-between align-items-center">
        <h6>작가 목록 ({{ totalRows ? totalRows : '0' }})</h6>
        <b-button variant="primary" class="mb-2">
          엑셀 다운로드
        </b-button>
      </b-col>
    </b-row>
    <hr class="mt-0">
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
      <template #cell(penName)="data">
        {{ data.value ? data.value : '-' }}
      </template>
      <template #cell(info)="data">
        {{ data.value ? data.value : '-' }}
      </template>
      <template #cell(contentCnt)="data">
        <div class="table-inner-modal" @click="onClickPieceCnt(data)">
          {{ data.value ? data.value : '0' }}
        </div>
      </template>
      <template #cell(manager)="data">
        {{ data.value ? data.value : '-' }}
      </template>
      <template #cell(createdAt)="data">
        {{ data.value ? data.value.split('T')[0] : '-' }}
      </template>
      <template #cell(setting)="data">
        <b-button
          variant="outline-secondary"
          class="table-inner-btn"
          @click="openModal('edit-writer-modal', data.item.id)"
        >
          수정
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

    <!-- 작가 수정 모달 -->
    <UiCenterModal
      v-model="openEditWriterModal"
      modal-id="edit-writer-modal"
      modal-title="작가 수정하기"
      ok-title="수정"
      cancel-title="취소"
      @ok="editWriter"
      @close="openEditWriterModal = false"
    >
      <template #contents>
        <b-container fluid class="px-0">
          <b-row>
            <b-col>
              <table class="table border mt-3">
                <tr class="cursor-pointer">
                  <th>작가명*</th>
                  <td class="d-flex justify-content-start align-item-center">
                    <b-form-input
                      v-model="writerDetail.penName"
                      class="w-auto"
                    />
                  </td>
                </tr>
                <tr class="cursor-pointer">
                  <th>작가 정보</th>
                  <td>
                    <b-textarea
                      v-model="writerDetail.info"
                      placeholder="최대 30자까지 입력 가능합니다."
                      rows="6"
                    />
                  </td>
                </tr>
              </table>
            </b-col>
          </b-row>
        </b-container>
      </template>
    </UiCenterModal>

    <!-- 작가 등록 모달 -->
    <UiCenterModal
      modal-id="add-writer-modal"
      modal-title="작가 등록하기"
      ok-title="등록"
      cancel-title="취소"
      @ok="addWriter"
    >
      <template #contents>
        <b-container fluid class="px-0">
          <b-row>
            <b-col>
              <table class="table border mt-3">
                <tr class="cursor-pointer">
                  <th>작가명*</th>
                  <td><b-form-input v-model="form.penName" class="w-40" /></td>
                </tr>
                <tr class="cursor-pointer">
                  <th>작가 정보</th>
                  <td>
                    <b-textarea
                      v-model="form.info"
                      placeholder="최대 30자까지 입력 가능합니다."
                      rows="6"
                    />
                  </td>
                </tr>
              </table>
            </b-col>
          </b-row>
        </b-container>
      </template>
    </UiCenterModal>

    <!-- 작가 작품 수 모달 -->
    <b-modal
      v-model="openCountWriterModal"
      ok-only
      hide-header-close
      ok-title="닫기"
      centered
      scrollable
      size="lg"
    >
      <template #modal-title>
        {{ `${writerName} 작품 목록` }}
      </template>
      <b-container fluid class="px-0">
        <b-row class="px-3">
          <b-col lg="12" class="">
            <b-table
              class="list"
              :items="contentCntItems"
              :fields="contentCntFields"
              stacked="md"
              :busy="isLoadingDetail"
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
                {{ data.index + 1 }}
              </template>
              <template #cell(registDate)="data">
                {{ data.value ? data.value.split(' ')[0] : '-' }}
              </template>
            </b-table>
          </b-col>
        </b-row>
      </b-container>
    </b-modal>
  </b-container>
</template>

<script>
export default {
  name: 'WriterInfoListPage',
  data () {
    return {
      // 작가 작품 수
      openCountWriterModal: false,
      contentCntItems: [],
      contentCntFields: [
        { key: 'no', label: '번호' },
        { key: 'menucode', label: '구분' },
        { key: 'isBook', label: '유형' },
        { key: 'title', label: '작품명' },
        { key: 'writer', label: '작가 종류' },
        { key: 'status', label: '상태' },
        { key: 'registDate', label: '등록일' }
      ],
      contentCntTotalRows: 1,
      contentCntCurrentPage: 1,
      contentCntPerPage: 1,
      isLoadingDetail: false,
      // 작가 수정
      openEditWriterModal: false,
      writerDetail: {},
      // 리스트
      isLoading: false,
      items: [],
      fields: [
        { key: 'no', label: '번호' },
        { key: 'penName', label: '작가명' },
        { key: 'info', label: '작가 정보' },
        { key: 'contentCnt', label: '작품 수' },
        { key: 'manager', label: '등록/최종 수정' },
        { key: 'createdAt', label: '등록일' },
        { key: 'setting', label: '관리' }
      ],
      totalRows: 0,
      currentPage: 1,
      perPage: 5,
      // 상세
      currentId: null,
      writerName: null,
      // 등록 폼
      form: {
        penName: '',
        info: ''
      },
      // 필터
      filter: {
        penName: ''
      }
    }
  },
  async fetch () {
    await this.getWriterList()
  },
  computed: {
    breadcrumb () {
      const arr = [
        { label: '홈', url: '/' },
        { label: '콘텐츠 관리', url: '#' },
        { label: '작가 정보 관리', url: this.$route.path }
      ]
      return arr
    }
  },
  watch: {
    async currentPage () {
      await this.getWriterList()
    },
    async openCountWriterModal (val) {
      if (val) {
        this.isLoadingDetail = true
        try {
          const { data } = await this.$axios.$get(
            `/api/cartoon/manager/writer/content/${this.currentId}`
          )
          this.contentCntItems = data.list
          console.log(this.contentCntItems, '작품수 ---------')
        } catch (e) {
          console.log(e)
        } finally {
          this.isLoadingDetail = false
        }
      } else {
        this.contentCntItems = []
        this.currentId = null
        this.writerName = ''
      }
    },
    async openEditWriterModal (val) {
      if (val) {
        try {
          const {
            status,
            data: { data }
          } = await this.$axios.get(
            `/api/cartoon/manager/writer/detail/${this.currentId}`
          )
          if (status === 200) {
            this.writerDetail = data
          }
        } catch (e) {
          console.log(e)
        }
      } else {
        this.writerDetail = {}
        this.currentId = null
      }
    }
  },
  mounted () {},
  methods: {
    async getWriterList () {
      this.isLoading = true

      try {
        const {
          data: { data }
        } = await this.$axios.get('/api/cartoon/manager/writerList', {
          params: {
            pageNum: this.currentPage,
            pageSize: this.perPage,
            penName: this.filter.penName
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

    onClickPieceCnt (data) {
      this.openCountWriterModal = true
      this.currentId = data.item.id
      this.writerName = data.item.penName
    },

    async addWriter () {
      if (!this.form.penName) {
        alert('작가명을 입력해 주세요.')
        return false
      }
      try {
        const { status } = await this.$axios.post(
          '/api/cartoon/manager/registWriter',
          {
            penName: this.form.penName,
            info: this.form.info
          }
        )
        if (status === 200) {
          alert('작가 등록이 완료 되었습니다.')
          this.$root.$emit('bv::hide::modal', 'add-writer-modal')
          this.form.penName = ''
          this.form.info = ''
          await this.getWriterList()
        }
      } catch (err) {
        alert('저장되지 않았습니다. 다시 시도해보십시오.')
      }
    },

    async editWriter () {
      try {
        if (!this.writerDetail.penName) {
          alert('작가명을 입력해 주세요.')
          return false
        }
        const { status } = await this.$axios.put(
          `/api/cartoon/manager/updateWriter/${this.currentId}`,
          {
            realName: '',
            penName: this.writerDetail.penName,
            info: this.writerDetail.info
          }
        )
        if (status === 200) {
          alert('작가 수정이 완료 되었습니다.')
          this.openEditWriterModal = false
          this.$root.$emit('bv::hide::modal', 'edit-writer-modal')
          await this.getWriterList()
        }
      } catch (err) {
        alert('수정되지 않았습니다. 다시 시도해보십시오.')
      }
    },

    openModal (modalId, paramsId, paramsName) {
      this.$root.$emit('bv::show::modal', modalId)
      this.currentId = paramsId
      this.writerName = paramsName

      if (modalId === 'edit-writer-modal') {
        this.openEditWriterModal = true
      }
    }
  }
}
</script>
