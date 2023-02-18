<template>
  <b-container fluid class="page-min-height py-3">
    <UiPageTitle title="출판사 정보 관리" :breadcrumb="breadcrumb">
      <template #buttons>
        <b-button variant="primary" @click="openModal('add-publisher-modal')">
          출판사 등록
        </b-button>
      </template>
    </UiPageTitle>
    <hr class="mb-2">
    <!--필터-->
    <b-container fluid class="px-0" tag="form" @submit.prevent="getList">
      <b-row class="px-3">
        <b-col lg="12" class="my-1">
          <b-form-group
            label="출판사명"
            label-cols-sm="2"
            label-align-sm="left"
            label-size="sm"
            label-class="align-self-center"
            class="mb-0 align-items-center"
          >
            <div class="d-flex">
              <b-form-input v-model="searchValue" class="w-25" />
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
    <b-row class="pt-5">
      <b-col align-self="center">
        <h6>출판사 목록 ({{ totalRows ? totalRows : '0' }})</h6>
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
        {{ totalRows - (currentPage - 1) * perPage - (data.index + 1) + 1 }}
      </template>
      <template #cell(name)="data">
        {{ data.value ? data.value : '-' }}
      </template>
      <template #cell(info)="data">
        {{ data.value ? data.value : '-' }}
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
          @click="openModal('edit-publisher-modal', data.item.id)"
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

    <!-- 출판사 수정 모달 -->
    <UiCenterModal
      v-model="openEditModal"
      modal-id="edit-publisher-modal"
      modal-title="출판사 수정하기"
      ok-title="수정"
      cancel-title="취소"
      @ok="editPublisher"
      @close="openEditModal = false"
    >
      <template #contents>
        <b-container fluid class="px-0">
          <b-row>
            <b-col>
              <table class="table border mt-3">
                <tr>
                  <th>출판사 명</th>
                  <td class="d-flex justify-content-start align-item-center border-0">
                    <b-form-input v-model="publisherInfo.name" class="w-auto" />
                    <b-button
                      variant="primary"
                      class="ml-2"
                      @click="checkExist"
                    >
                      중복 확인
                    </b-button>
                  </td>
                  <p
                    v-if="errMsg"
                    class="fs-13 ml-2 mb-1"
                    :class="errMsg === '사용 가능한 출판사명입니다.' ? 'text-info' : 'text-warning'"
                  >
                    {{ errMsg }}
                  </p>
                </tr>
              </table>
            </b-col>
          </b-row>
        </b-container>
      </template>
    </UiCenterModal>

    <!-- 출판사 등록 모달 -->
    <UiCenterModal
      v-model="openAddModal"
      modal-id="add-publisher-modal"
      modal-title="출판사 등록하기"
      ok-title="등록"
      cancel-title="취소"
      @ok="addPublisher"
      @close="openAddModal = false"
    >
      <template #contents>
        <b-container fluid class="px-0">
          <b-row>
            <b-col>
              <table class="table border mt-3">
                <tr>
                  <th>출판사 명</th>
                  <td class="d-flex justify-content-start align-item-center border-0">
                    <b-form-input v-model="publisherInfo.name" class="w-auto" />
                    <b-button
                      variant="primary"
                      class="ml-2"
                      @click="checkExist"
                    >
                      중복 확인
                    </b-button>
                  </td>
                  <p
                    v-if="errMsg"
                    class="fs-13 ml-2 mb-1"
                    :class="errMsg === '사용 가능한 출판사명입니다.' ? 'text-info' : 'text-warning'"
                  >
                    {{ errMsg }}
                  </p>
                </tr>
              </table>
            </b-col>
          </b-row>
        </b-container>
      </template>
    </UiCenterModal>

    <!-- 작품 수 모달 -->
    <b-modal
      id="count-publisher-modal"
      v-model="openCntModal"
      ok-only
      ok-title="닫기"
      centered
      scrollable
      size="lg"
      @close="openCntModal = false"
    >
      <template #modal-title>
        {{ `${publisherName} 작품 목록` }}
      </template>
      <b-container fluid class="px-0">
        <b-row class="px-3">
          <b-col lg="12" class="">
            <b-table
              class="list"
              :items="contentCntItems"
              :fields="contentCntFields"
              stacked="md"
              :busy="isCntLoading"
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
  name: 'PublisherInfoListPage',
  data () {
    return {
      errMsg: '',
      // 리스트
      isLoading: false,
      totalRows: 0,
      currentPage: 1,
      perPage: 5,
      items: [],
      fields: [
        { key: 'no', label: '번호' },
        { key: 'name', label: '출판사명' },
        { key: 'contentCnt', label: '작품 수' },
        { key: 'manager', label: '등록/최종수정' },
        { key: 'createdAt', label: '등록일' },
        { key: 'setting', label: '관리' }
      ],
      searchValue: '',
      // 수정 모달
      openEditModal: false,
      publisherInfo: {},
      // 작품 수 모달
      isCntLoading: false,
      openCntModal: false,
      contentCntItems: [],
      contentCntFields: [
        { key: 'no', label: '번호' },
        { key: 'menucode', label: '구분' },
        { key: 'isBook', label: '유형' },
        { key: 'title', label: '작품명' },
        { key: 'writer', label: '작가명' },
        { key: 'status', label: '상태' },
        { key: 'registDate', label: '등록일' }
      ],
      // 등록 폼
      openAddModal: false,
      // 중복 확인
      isExisted: null,
      isFinishedCheckExisted: false,
      // 상세
      currentId: null,
      publisherName: null
    }
  },
  async fetch () {
    await this.getList()
  },
  computed: {
    breadcrumb () {
      const arr = [
        { label: '홈', url: '/' },
        { label: '콘텐츠 관리', url: '#' },
        { label: '출판사 정보 관리', url: this.$route.path }
      ]
      return arr
    }
  },
  watch: {
    'publisherInfo.name' () {
      this.isFinishedCheckExisted = false
    },
    openAddModal (val) {
      if (!val) {
        this.publisherInfo.name = ''
        this.errMsg = ''
      }
    },
    async currentPage () {
      await this.getList()
    },
    async openCntModal (val) {
      if (val) {
        this.isCntLoading = true

        try {
          const {
            status,
            data: { data }
          } = await this.$axios.get(
            `/api/cartoon/manager/publisher/content/${this.currentId}`
          )
          if (status === 200) {
            this.contentCntItems = data.list
          }
        } catch (e) {
          console.log(e)
        } finally {
          this.isCntLoading = false
        }
      } else {
        this.contentCntItems = []
        this.currentId = null
      }
    },
    async openEditModal (val) {
      if (val) {
        try {
          const {
            status,
            data: { data }
          } = await this.$axios.get(
            `/api/cartoon/manager/publisher/detail/${this.currentId}`
          )
          if (status === 200) {
            this.publisherInfo = data
          }
        } catch (e) {
          console.log(e)
        }
      } else {
        this.publisherInfo = {}
        this.currentId = null
      }
    }
  },
  mounted () {},
  methods: {
    async checkExist () {
      if (!this.publisherInfo.name) {
        this.errMsg = '출판사명을 입력해 주세요.'
      } else {
        this.errMsg = ''
        const {
          status,
          data: { data }
        } = await this.$axios.get('/api/cartoon/manager/check/publicsher', {
          params: {
            name: this.publisherInfo.name
          }
        })
        if (status === 200) {
          this.isExisted = data

          if (this.isExisted) {
            this.errMsg = '이미 등록된 출판사 입니다.'
          } else {
            this.errMsg = '사용 가능한 출판사명입니다.'
          }
          this.isFinishedCheckExisted = true
        }
      }
    },
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

    checkValidation () {
      if (!this.publisherInfo.name) {
        this.errMsg = '출판사명을 입력해 주세요.'
        return false
      } else if (!this.isFinishedCheckExisted) {
        this.errMsg = '중복확인을 해주세요.'
        return false
      } else if (this.isExisted) {
        this.errMsg = '출판사명을 변경해 주세요.'
        return false
      }
      return true
    },

    async addPublisher () {
      if (this.checkValidation()) {
        try {
          const { status } = await this.$axios.post(
            '/api/cartoon/manager/registPublisher',
            {
              name: this.publisherInfo.name,
              info: ''
            }
          )
          if (status === 200) {
            this.publisherInfo.name = ''
            this.errMsg = ''
            this.hideModal('add-publisher-modal', this.openAddModal)
            alert('출판사 등록이 완료 되었습니다.')
            await this.getList()
          }
        } catch (err) {
          alert('저장되지 않았습니다. 다시 시도해보십시오.')
        }
      }
    },
    async editPublisher () {
      if (this.checkValidation()) {
        try {
          const { status } = await this.$axios.put(
            `/api/cartoon/manager/updatePublisher/${this.currentId}`,
            {
              name: this.publisherInfo.name,
              info: ''
            }
          )
          if (status === 200) {
            this.hideModal('edit-publisher-modal', this.openEditModal)
            alert('출판사 수정이 완료 되었습니다.')
            await this.getList()
          }
        } catch (err) {
          alert('수정되지 않았습니다. 다시 시도해보십시오.')
        }
      }
    },

    openModal (modalId, paramsId, paramsName) {
      this.$root.$emit('bv::show::modal', modalId)
      this.currentId = paramsId
      this.publisherName = paramsName

      if (modalId === 'edit-publisher-modal') {
        this.openEditModal = true
      } else if (modalId === 'count-publisher-modal') {
        this.openCntModal = true
      } else if (modalId === 'add-publisher-modal') {
        this.openAddModal = true
      }
    },
    hideModal (modalId, modalStatus) {
      modalStatus = false

      this.$nextTick(() => {
        this.$bvModal.hide(modalId)
      })
    }
  }
}
</script>
