<template>
  <b-container fluid class="page-min-height py-3">
    <UiPageTitle title="포인트 관리" :breadcrumb="breadcrumb" />
    <hr>
    <!-- 필터-->
    <b-row class="px-3">
      <b-col lg="12" class="my-1">
        <b-form>
          <div class="d-inline-flex w-100">
            <legend
              class="pl-0 col-sm-2 fs-14 text-sm-left mb-0 align-self-center"
            >
              이메일
            </legend>
            <b-form-input
              v-model="filter.email"
              placeholder="이메일"
              class="w-30 align-self-center"
            />
            <b-button variant="primary" class="ml-2">
              검색
            </b-button>
          </div>
          <div class="d-inline-flex w-100 my-3">
            <legend
              class="pl-0 col-sm-2 fs-14 text-sm-left mb-0 align-self-center"
            >
              <b-form-select
                v-model="filter.option"
                :options="filterOptions"
                class="w-75"
              />
            </legend>
            <b-form-input
              v-model="filter.email"
              placeholder=""
              class="w-30 align-self-center"
            />
          </div>
          <div class="d-inline-flex w-100">
            <legend
              class="pl-0 col-sm-2 fs-14 text-sm-left mb-0 align-self-center"
            >
              사유
            </legend>
            <b-form-input
              v-model="filter.reason"
              class="w-30 align-self-center"
            />
          </div>
        </b-form>
      </b-col>
    </b-row>
    <hr>
    <b-row align-h="center" class="mb-4">
      <b-col cols="2">
        <b-button variant="primary" class="w-75">
          확인
        </b-button>
      </b-col>
    </b-row>
    <b-tabs class="mt-5 pt-5" content-class="mt-3">
      <template #tabs-end>
        <h6 class="d-flex ml-auto align-items-center">
          '검색한 이메일' 목록 (보유 물약: 4000개 / 보유 호박: 4000개)
        </h6>
      </template>
      <b-tab title="소진 내역 (20)" active>
        <!-- 테이블 -->
        <b-table
          class="list"
          :items="reductionItems"
          :fields="reductionFields"
          :current-page="currentPage"
          :per-page="perPage"
          stacked="md"
          show-empty
          small
        >
          <template #empty>
            <PageNoResult />
          </template>
          <template #cell(no)="data">
            {{ totalRows - (currentPage - 1) * perPage - (data.index + 1) + 1 }}
          </template>
        </b-table>
        <UiPagination
          class="py-4"
          :page="currentPage"
          :per-page="perPage"
          :total-rows="totalRows"
          @change-page="currentPage = $event"
        />
      </b-tab>
      <b-tab title="지급 내역 (20)">
        <!-- 테이블 -->
        <b-table
          class="list"
          :items="provideItems"
          :fields="provideFields"
          :current-page="currentPage"
          :per-page="perPage"
          stacked="md"
          show-empty
          small
        >
          <template #empty>
            <PageNoResult />
          </template>
          <template #cell(no)="data">
            {{ totalRows - (currentPage - 1) * perPage - (data.index + 1) + 1 }}
          </template>
        </b-table>
        <UiPagination
          class="py-4"
          :page="currentPage"
          :per-page="perPage"
          :total-rows="totalRows"
          @change-page="currentPage = $event"
        />
      </b-tab>
    </b-tabs>
    <UiCenterModal
      modal-id="add-group-modal"
      modal-title="그룹 등록하기"
      ok-title="등록"
      cancel-title="취소"
    >
      <template #contents>
        <b-container fluid class="px-0">
          <b-row>
            <b-col>
              <b-row class="px-3">
                <b-col lg="12" class="my-1">
                  <b-form-group
                    label="그룹명"
                    label-cols-sm="2"
                    label-align-sm="left"
                    label-size="sm"
                    label-class="align-self-center"
                    class="mb-0"
                  >
                    <b-form-input placeholder="그룹명" class="w-60" />
                  </b-form-group>
                </b-col>
                <b-col lg="12" class="my-1">
                  <b-form-group
                    label="회원"
                    label-cols-sm="2"
                    label-align-sm="left"
                    label-size="sm"
                    label-class="align-self-center"
                    class="mb-0"
                  >
                    <div class="d-inline-flex w-100">
                      <b-form-input
                        placeholder="회원"
                        class="align-self-center w-60"
                      />
                      <b-button
                        variant="primary"
                        class="align-self-center ml-2"
                      >
                        검색
                      </b-button>
                      <b-button
                        variant="primary"
                        class="align-self-center ml-2"
                      >
                        엑셀 등록
                      </b-button>
                    </div>
                  </b-form-group>
                </b-col>
              </b-row>
              <hr>
              <h6>설정 된 그룹 회원</h6>
              <table class="table border mt-3">
                <tr class="cursor-pointer">
                  <td>123</td>
                  <td>123</td>
                  <td>123</td>
                </tr>
                <tr class="cursor-pointer">
                  <td>123</td>
                  <td>123</td>
                  <td>123</td>
                </tr>
                <tr class="cursor-pointer">
                  <td>123</td>
                  <td>123</td>
                  <td>123</td>
                </tr>
              </table>
              <hr class="mt-4">
              <b-row class="mt-4 mb-5">
                <b-col cols="auto">
                  <h6>예시)</h6>
                </b-col>
                <b-col cols="3">
                  <table class="table border">
                    <tr>
                      <td>example@example.com</td>
                    </tr>
                    <tr>
                      <td>example@example.com</td>
                    </tr>
                    <tr>
                      <td>example@example.com</td>
                    </tr>
                  </table>
                </b-col>
                <b-col cols="12">
                  <p class="text-muted fs-13">
                    엑셀 파일은 예시와 같이 첫칸에 메일만 입력하여 업로드 하시면
                    됩니다.
                  </p>
                  <p class="text-muted fs-13">
                    엑셀 파일의 메일 주소가 사용자와 일치하는 정보가 없을 경우
                    받는 사람에 추가되지 않습니다.
                  </p>
                </b-col>
              </b-row>
            </b-col>
          </b-row>
        </b-container>
      </template>
    </UiCenterModal>
  </b-container>
</template>

<script>
export default {
  name: 'UserPointListPage',
  data () {
    return {
      filter: {
        email: '',
        option: 1,
        reason: ''
      },
      filterOptions: [
        { value: 1, text: '물약 회수' },
        { value: 2, text: '물약 지급' },
        { value: 3, text: '호박 회수' },
        { value: 4, text: '호박 지급' }
      ],
      selectedUsers: [],
      currentPage: 1,
      totalRows: 0,
      perPage: 20,
      reductionItems: [
        {
          id: 723,
          content: '소진 내역',
          production: '호박 30개',
          type: '대여',
          created_at: '2022-10-20 12:00'
        },
        {
          id: 3,
          content: '소진 내역',
          production: '호박 30개',
          type: '대여',
          created_at: '2022-10-20 12:00'
        },
        {
          id: 72,
          content: '소진 내역',
          production: '호박 30개',
          type: '대여',
          created_at: '2022-10-20 12:00'
        }
      ],
      reductionFields: [
        { key: 'no', label: 'No.' },
        { key: 'content', label: '소진 내역' },
        { key: 'production', label: '소진 상품' },
        { key: 'type', label: '사용 내역' },
        { key: 'created_at', label: '날짜' }
      ],
      provideItems: [
        {
          id: 723,
          point: '호박 20개',
          reason: '지급 사유',
          admin: 'OOO',
          created_at: '2022-10-20 12:00'
        },
        {
          id: 7231,
          point: '호박 20개',
          reason: '지급 사유',
          admin: 'OOO',
          created_at: '2022-10-20 12:00'
        },
        {
          id: 7235,
          point: '호박 20개',
          reason: '지급 사유',
          admin: 'OOO',
          created_at: '2022-10-20 12:00'
        }
      ],
      provideFields: [
        { key: 'no', label: 'No.' },
        { key: 'point', label: '지급 상품' },
        { key: 'reason', label: '지급 사유' },
        { key: 'admin', label: '담당자' },
        { key: 'created_at', label: '날짜' }
      ]
    }
  },
  computed: {
    breadcrumb () {
      const arr = [
        { label: '홈', url: '/' },
        { label: '회원 관리', url: '#' },
        { label: '포인트 관리', url: this.$route.path }
      ]
      return arr
    }
  },
  watch: {},
  created () {},
  mounted () {
    this.totalRows = this.reductionItems.length
  },
  methods: {
    openAddGroupModal (id) {
      this.$root.$emit('bv::show::modal', id)
    }
  }
}
</script>
