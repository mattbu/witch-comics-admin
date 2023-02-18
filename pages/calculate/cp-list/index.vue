<template>
  <b-container fluid class="page-min-height py-3">
    <UiPageTitle title="CP사" :breadcrumb="breadcrumb">
      <template #buttons>
        <b-button
          variant="outline-primary"
          @click="openModal('regist-cp-modal')"
        >
          CP사 등록
        </b-button>
      </template>
    </UiPageTitle>
    <hr class="mb-2">
    <!--필터-->
    <b-container fluid class="px-0" tag="form" @submit.prevent="totalCpList">
      <b-row class="px-3">
        <b-col lg="12" class="my-1">
          <b-form-group
            label="CP사"
            label-cols-sm="2"
            label-align-sm="left"
            label-size="sm"
            label-class="align-self-center"
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
        <h6>CP사 목록({{ totalRows ? totalRows : '0' }})</h6>
      </b-col>
    </b-row>
    <hr class="my-2">
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
      <!-- CP사명 -->
      <template #cell(name)="data">
        {{ data.value ? data.value : '-' }}
      </template>
      <!-- 정산 -->
      <template #cell(rate)="data">
        {{ data.value ? data.value : '-' }}
      </template>
      <!-- 작품 수 -->
      <template #cell(cnt)="data">
        <div class="table-inner-modal" @click="cpCnt(data)">
          {{ data.value }}
        </div>
      </template>
      <!-- 등록일 -->
      <template #cell(createdAt)="data">
        {{ data.value ? data.value.split('T')[0] : '-' }}
      </template>
      <!-- 수정일 -->
      <template #cell(updatedAt)="data">
        {{ data.value ? data.value.split('T')[0] : '-' }}
      </template>
      <!-- 관리 -->
      <template #cell(setting)="data">
        <b-button
          variant="outline-secondary"
          class="table-inner-btn"
          @click="openModal('edit-cp-modal', data.item.id)"
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

    <!-- CP 등록 모달 -->
    <UiCenterModal
      modal-id="regist-cp-modal"
      modal-title="CP사 등록하기"
      ok-title="등록"
      cancel-title="취소"
      @ok="registCp"
      @close="openAddModal = false"
    >
      <template #contents>
        <b-container fluid class="px-0">
          <b-row>
            <b-col lg="12" class="my-1">
              <table class="table border mb-0 table-layout-fixed">
                <tr>
                  <th>CP사</th>
                  <td colspan="3">
                    <b-form-input v-model="form.name" class="w-60" />
                  </td>
                </tr>
                <tr>
                  <th>CP사 정산 비율</th>
                  <td colspan="3">
                    <div class="d-flex justify-content-start align-item-center">
                      <p class="my-2">
                        마녀
                      </p>
                      <b-form-input v-model="form.witch" class="w-10 ml-2" />
                      <p class="ml-2 my-2">
                        CP사
                      </p>
                      <b-form-input v-model="form.cp" class="w-10 ml-2" />
                      <p :style="{ color: 'red' }" class="ml-2 my-2">
                        *도합이 100되어야합니다.
                      </p>
                      <p class="ml-2 my-2">
                        관리자
                      </p>
                      <b-form-input v-model="form.manager" class="w-10 ml-2" />
                    </div>
                  </td>
                </tr>
                <tr>
                  <th>CP사 정보</th>
                  <td colspan="3">
                    <b-form-textarea
                      v-model="form.info"
                      rows="3"
                      max-rows="6"
                    />
                  </td>
                </tr>
              </table>
            </b-col>
          </b-row>
        </b-container>
      </template>
    </UiCenterModal>

    <!-- CP 수정 모달 -->
    <UiCenterModal
      v-model="editCpModal"
      modal-id="edit-cp-modal"
      modal-title="CP사 수정하기"
      ok-title="수정"
      cancel-title="취소"
      @ok="editCp"
      @close="editCpModal = false"
    >
      <template #contents>
        <b-container fluid class="px-0">
          <b-row>
            <b-col>
              <table class="table border mt-3">
                <tr class="cursor-pointer">
                  <th>CP사* {{ `id: ${currentId}` }}</th>
                  <td class="d-flex justify-content-start align-item-center">
                    <b-form-input v-model="form.name" class="w-auto" />
                  </td>
                </tr>
                <tr class="cursor-pointer">
                  <th>CP사 정산 비율</th>
                  <td colspan="3">
                    <div class="d-flex justify-content-start align-item-center">
                      <p class="my-2">
                        마녀
                      </p>
                      <b-form-input v-model="form.witch" class="w-10 ml-2" />
                      <p class="ml-2 my-2">
                        CP사
                      </p>
                      <b-form-input v-model="form.cp" class="w-10 ml-2" />
                      <p :style="{ color: 'red' }" class="ml-2 my-2">
                        *도합이 100되어야합니다.
                      </p>
                    </div>
                  </td>
                </tr>
                <tr>
                  <th>CP사 정보</th>
                  <td colspan="3">
                    <b-form-textarea
                      v-model="form.info"
                      rows="3"
                      max-rows="6"
                    />
                  </td>
                </tr>
              </table>
            </b-col>
          </b-row>
        </b-container>
      </template>
    </UiCenterModal>

    <!-- CP사 수 모달 -->
    <b-modal
      v-model="cntCpModal"
      ok-only
      ok-title="닫기"
      centered
      scrollable
      size="lg"
    >
      <template #modal-title>
        {{ `${name}CP사 목록` }}
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
  name: 'CpListPage',
  data () {
    return {
      cntCpModal: false,
      contentCntItems: [],
      contentCntFields: [
        { key: 'no', label: '번호' },
        { key: 'name', label: 'CP사명' },
        { key: 'rate', label: '정산(마녀:CP사)' },
        { key: 'cnt', label: '작품수' },
        { key: 'createdAt', label: '등록일' },
        { key: 'updatedAt', label: '수정일' },
        { key: 'setting', label: '관리' }
      ],
      contentCntTotalRows: 1,
      contentCntCurrentPage: 1,
      contentCntPerPage: 1,
      isLoadingDetail: false,

      editCpModal: false,
      isLoading: false,
      items: [],
      fields: [
        { key: 'no', label: '번호' },
        { key: 'name', label: 'CP사명' },
        { key: 'rate', label: '정산(마녀:CP사)' },
        { key: 'cnt', label: '작품수' },
        { key: 'createdAt', label: '등록일' },
        { key: 'updatedAt', label: '수정일' },
        { key: 'setting', label: '관리' }
      ],
      totalRows: 0,
      currentPage: 1,
      perPage: 5,
      // 상세
      currentId: null,
      name: null,
      // 등록 폼
      form: {
        name: '',
        info: '',
        witch: '',
        cp: '',
        manager: ''
      },
      // 필터
      filter: {
        name: ''
      }
    }
  },
  async fetch () {
    await this.totalCpList()
  },
  computed: {
    breadcrumb () {
      const arr = [
        { label: '홈', url: '/' },
        { label: '정산 관리', url: '#' },
        { label: 'CP사', url: this.$route.path }
      ]
      return arr
    }
  },
  watch: {
    async currentPage () {
      await this.totalCpList()
    },
    async cntCpModal (val) {
      if (val) {
        this.isLoadingDetail = true
        try {
          const { data } = await this.$axios.$get(
            `/api/cartoon/manager/cp/detail/${this.currentId}`
          )
          this.contentCntItems = data.list
        } catch (e) {
          console.log(e)
        } finally {
          this.isLoadingDetail = false
        }
      } else {
        this.contentCntItems = []
        this.currentId = null
        this.name = ''
      }
    },
    async editCpModal (val) {
      if (val) {
        try {
          const {
            status,
            data: { data }
          } = await this.$axios.get(
            `/api/cartoon/manager/cp/detail/${this.currentId}`
          )
          if (status === 200) {
            this.form = data
          }
        } catch (e) {
          console.log(e)
        }
      } else {
        this.form = {}
        this.currentId = null
      }
    }
  },
  mounted () {},
  methods: {
    async totalCpList () {
      this.isLoading = true

      try {
        const {
          data: { data }
        } = await this.$axios.get('/api/cartoon/manager/cpList', {
          params: {
            pageNum: this.currentPage,
            pageSize: this.perPage,
            name: this.filter.name
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

    cpCnt (data) {
      this.cntCpModal = true
      this.currentId = data.item.id
      this.writerName = data.item.penName
    },

    async registCp () {
      try {
        const { status } = await this.$axios.post(
          '/api/cartoon/manager/registCp',
          {
            name: this.form.name,
            info: this.form.info,
            witch: this.form.witch,
            cp: this.form.cp,
            manager: this.form.manager
          }
        )
        if (status === 200) {
          this.hideModal('regist-cp-modal', this.openAddModal)
          alert('CP사 등록이 완료 되었습니다.')
          await this.totalCpList()
        }
      } catch (err) {
        alert('등록되지 않았습니다. 다시 시도해보십시오.')
      }
    },

    async editCp () {
      try {
        const { status } = await this.$axios.put(
          `/api/cartoon/manager/updateCp/${this.currentId}`,
          {
            name: this.form.name,
            info: this.form.info,
            witch: this.form.witch,
            cp: this.form.cp,
            manager: this.form.manager
          }
        )
        if (status === 200) {
          this.hideModal('edit-cp-modal', this.openEditModal)
          alert('CP사 수정이 완료 되었습니다.')
          await this.totalCpList()
        }
      } catch (err) {
        alert('수정되지 않았습니다. 다시 시도해보십시오.')
      }
    },

    openModal (modalId, paramsId, paramsName) {
      this.$root.$emit('bv::show::modal', modalId)
      this.currentId = paramsId
      this.name = paramsName

      if (modalId === 'edit-cp-modal') {
        this.editCpModal = true
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
