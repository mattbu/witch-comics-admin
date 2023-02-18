<template>
  <b-container fluid class="page-min-height py-3">
    <UiPageTitle
      title="회원 그룹 관리"
      :breadcrumb="breadcrumb"
    />
    <hr>
    <!--    필터-->
    <b-row class="px-3">
      <b-col lg="12" class="my-1">
        <b-form inline>
          <legend class="pl-0 col-sm-2 fs-14 text-sm-left mb-0">
            이메일
          </legend>
          <b-form-input v-model="filter.email" placeholder="이메일" />
          <b-button variant="primary" class="ml-2">
            검색
          </b-button>
        </b-form>
      </b-col>
    </b-row>
    <hr>
    <b-tabs class="mt-5 pt-5" content-class="mt-3">
      <template #tabs-end>
        <div class="d-flex ml-auto">
          <b-form-select v-model="perPage" :options="perPageOptions" />
        </div>
      </template>
      <b-tab title="등급별 회원 그룹 리스트" active>
        <b-row align-h="between" class="mb-4">
          <b-col cols="auto">
            <b-button variant="outline-primary" class="table-inner-btn">
              정액제 회원 (100)
            </b-button>
            <b-button variant="outline-primary" class="table-inner-btn">
              노란마녀 (100)
            </b-button>
            <b-button variant="outline-primary" class="table-inner-btn">
              초록마녀 (100)
            </b-button>
            <b-button variant="outline-primary" class="table-inner-btn">
              보라마녀 (100)
            </b-button>
          </b-col>
          <b-col cols="auto">
            <b-button variant="primary">
              엑셀 다운로드
            </b-button>
          </b-col>
        </b-row>
        <!-- 테이블 -->
        <b-table
          class="list"
          :items="gradeItems"
          :fields="gradeFields"
          :current-page="currentPage"
          :per-page="perPage"
          stacked="md"
          show-empty
          small
        >
          <template #empty>
            <PageNoResult />
          </template>
          <template #cell(select)="data">
            <b-form-checkbox v-model="selectedUsers" :value="data.item.id" style="float: unset" />
          </template>
          <template #cell(no)="data">
            {{ (totalRows - (currentPage - 1) * perPage - (data.index + 1) + 1) }}
          </template>
          <template #cell(email)="data">
            <NuxtLink :to="`/user/list/${data.item.id}`">
              {{ data.value }}
            </NuxtLink>
          </template>
          <template #cell(setting)="data">
            <b-button variant="outline-secondary" :to="`/user/list/${data.item.id}`" class="table-inner-btn">
              상세보기
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
      </b-tab>
      <b-tab title="관리자 설정 그룹 리스트">
        <b-row align-h="between" class="mb-4">
          <b-col cols="auto">
            <b-button variant="outline-primary" class="table-inner-btn">
              이커머스 구매 회원
            </b-button>
            <b-button variant="outline-primary" class="table-inner-btn" @click="openAddGroupModal('add-group-modal')">
              그룹 등록하기 +
            </b-button>
          </b-col>
          <b-col cols="auto">
            <b-button variant="primary">
              그룹 설정
            </b-button>
            <b-button variant="primary">
              엑셀 다운로드
            </b-button>
          </b-col>
        </b-row>
        <!-- 테이블 -->
        <b-table
          class="list"
          :items="gradeItems"
          :fields="gradeFields"
          :current-page="currentPage"
          :per-page="perPage"
          stacked="md"
          show-empty
          small
        >
          <template #empty>
            <PageNoResult />
          </template>
          <template #cell(select)="data">
            <b-form-checkbox v-model="selectedUsers" :value="data.item.id" style="float: unset" />
          </template>
          <template #cell(no)="data">
            {{ (totalRows - (currentPage - 1) * perPage - (data.index + 1) + 1) }}
          </template>
          <template #cell(email)="data">
            <NuxtLink :to="`/user/list/${data.item.id}`">
              {{ data.value }}
            </NuxtLink>
          </template>
          <template #cell(setting)="data">
            <b-button variant="outline-secondary" :to="`/user/list/${data.item.id}`" class="table-inner-btn">
              상세보기
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
                    <div class="d-inline-flex w-100 ">
                      <b-form-input placeholder="회원" class="align-self-center w-60" />
                      <b-button variant="primary" class="align-self-center ml-2">
                        검색
                      </b-button>
                      <b-button variant="primary" class="align-self-center ml-2">
                        엑셀 등록
                      </b-button>
                    </div>
                  </b-form-group>
                </b-col>
              </b-row>
              <hr>
              <h6>설정 된 그룹 회원</h6>
              <table class="table border mt-3">
                <tr
                  class="cursor-pointer"
                >
                  <td>123</td>
                  <td>123</td>
                  <td>123</td>
                </tr>
                <tr
                  class="cursor-pointer"
                >
                  <td>123</td>
                  <td>123</td>
                  <td>123</td>
                </tr>
                <tr
                  class="cursor-pointer"
                >
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
                    엑셀 파일은 예시와 같이 첫칸에 메일만 입력하여 업로드 하시면 됩니다.
                  </p>
                  <p class="text-muted fs-13">
                    엑셀 파일의 메일 주소가 사용자와 일치하는 정보가 없을 경우 받는 사람에 추가되지 않습니다.
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
  name: 'UserGroupListPage',
  data () {
    return {
      filter: {
        email: ''
      },
      selectedUsers: [],
      currentPage: 1,
      totalRows: 0,
      perPage: 20,
      perPageOptions: [
        { value: 20, text: '20개씩 보기' },
        { value: 30, text: '30개씩 보기' },
        { value: 50, text: '50개씩 보기' }
      ],
      gradeItems: [
        {
          id: 1123,
          email: 'example@example.com',
          potion: 10,
          pumpkin: 10,
          grade: 'VIP',
          created_at: '2022-10-20 12:00',
          login_type: '네이버',
          status: '회원',
          recent: '2022-10-20 12:00'
        },
        {
          id: 89732,
          email: 'example@example.com',
          potion: 10,
          pumpkin: 10,
          grade: 'VIP',
          created_at: '2022-10-20 12:00',
          login_type: '네이버',
          status: '회원',
          recent: '2022-10-20 12:00'
        },
        {
          id: 723,
          email: 'example@example.com',
          potion: 10,
          pumpkin: 10,
          grade: 'VIP',
          created_at: '2022-10-20 12:00',
          login_type: '네이버',
          status: '회원',
          recent: '2022-10-20 12:00'
        }
      ],
      gradeFields: [
        { key: 'select', label: '' },
        { key: 'no', label: 'No.' },
        { key: 'email', label: '이메일' },
        { key: 'potion', label: '보유 물약' },
        { key: 'pumpkin', label: '보유 호박' },
        { key: 'created_at', label: '가입일' },
        { key: 'login_type', label: '가입방법' },
        { key: 'status', label: '상태' },
        { key: 'recent', label: '최근 접속 날짜' },
        { key: 'setting', label: '관리' }
      ]
    }
  },
  computed: {
    breadcrumb () {
      const arr = [
        { label: '홈', url: '/' },
        { label: '회원 관리', url: '#' },
        { label: '회원 그룹 관리', url: this.$route.path }
      ]
      return arr
    }
  },
  watch: {},
  created () {
  },
  mounted () {
    this.totalRows = this.gradeItems.length
  },
  methods: {
    openAddGroupModal (id) {
      this.$root.$emit('bv::show::modal', id)
    }
  }
}
</script>
