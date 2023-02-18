<template>
  <b-container fluid class="page-min-height py-3">
    <UiPageTitle
      title="작가 관리"
      :breadcrumb="breadcrumb"
    >
      <template #buttons>
        <b-button variant="primary" @click="openModal('add-writer-modal')">
          작가 등록
        </b-button>
      </template>
    </UiPageTitle>
    <hr>
    <!--    필터-->
    <b-row class="mt-3 px-3">
      <b-col lg="12" class="my-1">
        <b-form inline>
          <legend class="pl-0 col-sm-2 fs-14 text-sm-left">
            작가
          </legend>
          <b-form-input v-model="filter.name" />
        </b-form>
      </b-col>

      <b-col lg="12" class="my-1">
        <b-form-group
          v-slot="{ ariaDescribedby }"
          label="작가 종류"
          label-cols-sm="2"
          label-align-sm="left"
          label-size="sm"
          class="mb-0"
        >
          <b-form-checkbox-group
            v-model="filter.type"
            :options="typeOptions"
            :aria-describedby="ariaDescribedby"
            class="mt-1"
          />
        </b-form-group>
      </b-col>
    </b-row>
    <hr>
    <b-row align-h="center" class="mb-4">
      <b-col cols="2">
        <b-button variant="primary" class="w-75">
          검색
        </b-button>
      </b-col>
    </b-row>
    <b-row class="pt-5" align-h="between">
      <b-col align-self="center">
        <h6>CP사 목록 (20)</h6>
      </b-col>
    </b-row>
    <hr class="my-2">
    <b-table
      class="list"
      :items="items"
      :fields="fields"
      :current-page="currentPage"
      :per-page="perPage"
      stacked="md"
      show-empty
      small
    >
      <template #table-colgroup>
        <col style="width: 10%">
      </template>
      <template #empty>
        <PageNoResult />
      </template>
      <template #cell(no)="data">
        {{ (totalRows - (currentPage - 1) * perPage - (data.index + 1) + 1) }}
      </template>
      <template #cell(setting)="data">
        <b-button variant="outline-secondary" class="table-inner-btn" @click="openModal(`edit-writer-modal-${data.item.id}`)">
          보기
        </b-button>
        <b-button variant="outline-secondary" class="table-inner-btn">
          삭제
        </b-button>
        <!--    수정 모달-->
        <UiCenterModal
          :modal-id="`edit-writer-modal-${data.item.id}`"
          modal-title="작가 정보"
          ok-title="수정"
          cancel-title="취소"
        >
          <template #contents>
            <b-container fluid class="px-0">
              <b-row class="px-3">
                <b-col lg="12" class="my-1">
                  <b-form-group
                    label="작가명"
                    label-cols-sm="2"
                    label-align-sm="left"
                    label-size="sm"
                    label-class="align-self-center"
                    class="mb-0"
                  >
                    <b-form-input v-model="editForm.name" class="w-60" />
                  </b-form-group>
                </b-col>

                <b-col lg="12" class="my-1">
                  <b-form-group
                    v-slot="{ ariaDescribedby }"
                    label="작가 종류"
                    label-cols-sm="2"
                    label-align-sm="left"
                    label-size="sm"
                    label-class="align-self-center"
                    class="mb-0"
                  >
                    <b-form-checkbox-group
                      v-model="editForm.type"
                      :options="typeOptions"
                      :aria-describedby="ariaDescribedby"
                      class="mt-1"
                    />
                  </b-form-group>
                </b-col>

                <b-col lg="12" class="my-1">
                  <b-form-group
                    label="작가 정보"
                    label-cols-sm="2"
                    label-align-sm="left"
                    label-size="sm"
                    label-class="align-self-center"
                    class="mb-0"
                  >
                    <b-form-textarea
                      v-model="editForm.description"
                      rows="3"
                      max-rows="6"
                    />
                  </b-form-group>
                </b-col>
              </b-row>
              <b-row class="pt-5" align-h="between">
                <b-col align-self="center">
                  <h6>작가 작품 정보</h6>
                </b-col>
              </b-row>
              <hr class="my-2">
              <b-row>
                <b-col>
                  <b-table
                    class="list"
                    :items="writerDetailItems"
                    :fields="writerDetailFields"
                    :current-page="currentPage"
                    :per-page="perPage"
                    stacked="md"
                    show-empty
                    small
                  >
                    <template #table-colgroup>
                      <col style="width: 10%">
                    </template>
                    <template #empty>
                      <PageNoResult />
                    </template>
                    <template #cell(order)="data">
                      <b-form-input v-model="data.value" class="w-100" />
                    </template>
                    <template #cell(no)="data">
                      {{ (totalRows - (currentPage - 1) * perPage - (data.index + 1) + 1) }}
                    </template>
                    <template #cell(setting)>
                      <b-button variant="outline-secondary" class="table-inner-btn">
                        삭제
                      </b-button>
                      <b-button variant="outline-secondary" class="table-inner-btn">
                        해제
                      </b-button>
                    </template>
                  </b-table>
                </b-col>
              </b-row>
            </b-container>
          </template>
        </UiCenterModal>
      </template>
    </b-table>
    <UiPagination
      class="py-4"
      :page="currentPage"
      :per-page="perPage"
      :total-rows="totalRows"
      @change-page="currentPage = $event"
    />
    <!--    등록 모달-->
    <UiCenterModal
      modal-id="add-writer-modal"
      modal-title="작가 등록하기"
      ok-title="등록"
      cancel-title="취소"
    >
      <template #contents>
        <b-container fluid class="px-0">
          <b-row class="px-3">
            <b-col lg="12" class="my-1">
              <b-form-group
                label="작가명"
                label-cols-sm="2"
                label-align-sm="left"
                label-size="sm"
                label-class="align-self-center"
                class="mb-0"
              >
                <b-form-input v-model="addForm.name" class="w-60" />
              </b-form-group>
            </b-col>

            <b-col lg="12" class="my-1">
              <b-form-group
                v-slot="{ ariaDescribedby }"
                label="작가 종류"
                label-cols-sm="2"
                label-align-sm="left"
                label-size="sm"
                label-class="align-self-center"
                class="mb-0"
              >
                <b-form-checkbox-group
                  v-model="addForm.type"
                  :options="typeOptions"
                  :aria-describedby="ariaDescribedby"
                  class="mt-1"
                />
              </b-form-group>
            </b-col>

            <b-col lg="12" class="my-1">
              <b-form-group
                label="작가 정보"
                label-cols-sm="2"
                label-align-sm="left"
                label-size="sm"
                label-class="align-self-center"
                class="mb-0"
              >
                <b-form-textarea
                  v-model="addForm.description"
                  rows="3"
                  max-rows="6"
                />
              </b-form-group>
            </b-col>
          </b-row>
        </b-container>
      </template>
    </UiCenterModal>
  </b-container>
</template>

<script>
export default {
  name: 'CsWriterListPage',
  data () {
    return {
      filter: {
        name: '',
        type: null
      },
      typeOptions: [
        { value: 1, text: '글' },
        { value: 2, text: '그림' }
      ],
      //
      currentPage: 1,
      totalRows: 0,
      perPage: 10,
      //
      items: [
        {
          id: 33,
          name: '김작가',
          type: '그림',
          quantity: '5',
          created_at: '2022-10-20',
          admin: '000'
        },
        {
          id: 1,
          name: '김작가',
          type: '그림',
          quantity: '5',
          created_at: '2022-10-20',
          admin: '000'
        },
        {
          id: 333,
          name: '김작가',
          type: '그림',
          quantity: '5',
          created_at: '2022-10-20',
          admin: '000'
        }
      ],
      fields: [
        { key: 'no', label: '번호' },
        { key: 'name', label: '작가명' },
        { key: 'type', label: '작품 종류' },
        { key: 'quantity', label: '작품 수' },
        { key: 'created_at', label: '등록일' },
        { key: 'admin', label: '담당자' },
        { key: 'setting', label: '관리' }
      ],
      addForm: {
        name: '',
        type: null,
        description: ''
      },
      editForm: {
        name: '',
        type: null,
        description: ''
      },
      writerDetailItems: [
        {
          id: 33,
          status: '서비스 중',
          national: '한국',
          genre: '순정',
          name: '작품명',
          created_at: '2022-10-20',
          is_finish: '완결',
          is_adult: 'X'
        },
        {
          id: 332,
          status: '서비스 중',
          national: '한국',
          genre: '순정',
          name: '작품명',
          created_at: '2022-10-20',
          is_finish: '완결',
          is_adult: 'X'
        },
        {
          id: 133,
          status: '서비스 중',
          national: '한국',
          genre: '순정',
          name: '작품명',
          created_at: '2022-10-20',
          is_finish: '완결',
          is_adult: 'X'
        }
      ],
      writerDetailFields: [
        { key: 'status', label: '상태' },
        { key: 'national', label: '국가' },
        { key: 'genre', label: '장르' },
        { key: 'name', label: '작품명' },
        { key: 'created_at', label: '최근 등록일' },
        { key: 'is_finish', label: '완결 여부' },
        { key: 'is_adult', label: '성인 여부' }
      ]
    }
  },
  computed: {
    breadcrumb () {
      const arr = [
        { label: '홈', url: '/' },
        { label: '서비스 운영 관리', url: '#' },
        { label: '작가 관리', url: this.$route.path }
      ]
      return arr
    }
  },
  watch: {},
  created () {},
  mounted () {
    this.totalRows = this.items.length
  },
  methods: {
    openModal (id) {
      this.$root.$emit('bv::show::modal', id)
    }
  }
}
</script>
