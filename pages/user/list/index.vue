<template>
  <b-container fluid class="page-min-height py-3">
    <UiPageTitle title="회원 리스트" :breadcrumb="breadcrumb" />
    <hr>
    <!-- 필터-->
    <b-container fluid class="px-0 user-list-form" tag="form" @submit.prevent>
      <b-form-group label="이메일" label-for="form-email" label-cols="auto" label-class="p-3">
        <b-form-input
          id="form-email"
          v-model="filter.email"
          placeholder="이메일"
          class="d-inline-block"
          trim
          style="max-width: 300px;"
          list="email-list"
          autocomplete="off"
          debounce="500"
          lazy
        />
        <datalist v-if="emailList.length>0" id="email-list">
          <option v-for="email in emailList" :key="email">
            {{ email }}
          </option>
        </datalist>
        <datalist v-else id="email-list">
          <option> 일치하는 메일 주소를 찾을 수 없습니다.</option>
        </datalist>
        <b-button size="sm" class="ml-2">
          찾기
        </b-button>
      </b-form-group>
      <!--      <b-form-group aria-placeholder="test">-->
      <!--        <select v-model="filter.email" class="selectpicker" data-live-search="true">-->
      <!--          <option v-for="email in emailList" :key="email">-->
      <!--            {{ email }}-->
      <!--          </option>-->
      <!--        </select>-->
      <!--      </b-form-group>-->
      <b-form-group
        label="회원 상태"
        label-cols="auto"
        label-for="form-state"
        label-class="p-3"
      >
        <b-form-checkbox-group
          id="form-state"
          v-model="filter.state"
          :options="userStatusOptions"
        />
      </b-form-group>
      <b-form-group
        label="가입 방법"
        label-cols="auto"
        label-for="form-socialType"
        label-class="p-3"
      >
        <b-form-checkbox-group
          id="form-socialType"
          v-model="filter.socialType"
          :options="signUpTypeOptions"
        />
      </b-form-group>

      <b-form-group
        label="기간 검색"
        label-cols="auto"
        label-for="form-date"
        label-align="left"
        label-class="py-5 px-3"
      >
        <b-form-radio-group
          id="form-date"
          v-model="filter.searchDtType"
          :options="searchDtOptions"
        />
        <div class="d-inline-flex justify-content-start w-100 my-2">
          <div class="d-inline-flex w-40">
            <b-form-datepicker
              v-model="filter.searchStartDt"
              label-help=""
              hide-header
              placeholder="선택"
              :date-format-options="{
                year: 'numeric',
                month: 'numeric',
                day: 'numeric'
              }"
            />
            <b-form-datepicker
              v-model="filter.searchEndDt"
              label-help=""
              hide-header
              placeholder="선택"
              :date-format-options="{
                year: 'numeric',
                month: 'numeric',
                day: 'numeric'
              }"
              class="ml-2"
            />
          </div>
        </div>
      </b-form-group>

      <b-form-group
        label="등급"
        label-cols="auto"
        label-for="form-degree"
        label-class="p-3"
      >
        <b-form-checkbox-group
          id="form-degree"
          v-model="filter.degree"
          :options="userGradeOptions"
        />
      </b-form-group>
    </b-container>
    <b-row class="text-center">
      <b-button type="submit" size="md" class="px-5 mt-3 mx-auto" @click="getItems">
        검색
      </b-button>
    </b-row>
    <b-row class="pt-5" align-h="between">
      <b-col align-self="center">
        <h6>전체 회원 목록 ({{ pagination.totalRows }})</h6>
      </b-col>
      <b-col align-self="center" class="d-inline-flex justify-content-end">
        <b-button variant="primary">
          엑셀 다운로드
        </b-button>
        <b-form-select
          v-model="pagination.perPage"
          :options="perPageOptions"
          class="w-30 ml-2"
        />
      </b-col>
    </b-row>
    <hr class="mt-2 mb-4">
    <!-- 테이블 -->
    <b-table
      class="list"
      :items="items"
      :fields="tableFields"
      stacked="md"
      show-empty
      small
      :busy="isLoading"
    >
      <template #table-busy>
        <div class="text-center text-danger my-4">
          <b-spinner variant="primary" class="align-middle" />
          <span class="ml-3">데이터를 불러오고 있습니다.</span>
        </div>
      </template>
      <template #empty>
        <PageNoResult />
      </template>
      <template #cell(select)="data">
        <b-form-checkbox
          v-model="selectedUsers"
          :value="data.item.id"
          style="float: unset"
        />
      </template>
      <!--      <template #cell(no)="data">-->
      <!--        {{ pagination.totalRows - (pagination.currentPage - 1) * pagination.currentPage - (data.index + 1) + 1 }}-->
      <!--      </template>-->
      <template #cell(email)="data">
        <NuxtLink
          :to="{
            path: `/user/list/${data.item.email}`,
            query: { id: data.item.id }
          }"
        >
          {{ data.value }}
        </NuxtLink>
      </template>
      <template #cell(totalAmount)="data">
        {{ data.value }}원
      </template>
      <template #cell()="data">
        {{ data.value === '' ?"-":data.value }}
      </template>
    </b-table>
    <UiPagination
      class="py-4"
      :page="pagination.currentPage"
      :per-page="pagination.perPage"
      :total-rows="pagination.totalRows"
      @change-page="movePage"
    />
  </b-container>
</template>

<script>
export default {
  name: 'UsageListPage',
  data () {
    return {
      filter: {
        email: '',
        state: [],
        socialType: [],
        searchDtType: null,
        dateSearch: [],
        searchStartDt: '',
        searchEndDt: '',
        degree: []
      },
      isLoading: true,
      selectedUsers: [],
      userStatusOptions: [
        { value: '회원', text: '회원' },
        { value: '정지', text: '정지' },
        { value: '탈퇴', text: '탈퇴' },
        { value: '휴면', text: '휴면' }
      ],
      signUpTypeOptions: [
        { value: '이메일', text: '이메일' },
        { value: '네이버', text: '네이버' },
        { value: '카카오', text: '카카오' },
        { value: '페이코', text: '페이코' },
        { value: '구글', text: '구글' },
        { value: '페이스북', text: '페이스북' }
      ],
      searchDtOptions: [
        { value: '가입일', text: '가입일' },
        { value: '접속일', text: '접속일' }
      ],
      selectedOrder: 1,
      pagination: {
        currentPage: 1,
        totalRows: 10,
        perPage: 50
      },
      perPageOptions: [
        { value: 30, text: '30개씩 보기' },
        { value: 50, text: '50개씩 보기' },
        { value: 100, text: '100개씩 보기' },
        { value: 200, text: '200개씩 보기' },
        { value: 300, text: '300개씩 보기' }
      ],
      userGradeOptions: [
        { value: 1, text: '노란마녀' },
        { value: 2, text: '초록마녀' },
        { value: 3, text: '빨간마녀' },
        { value: 4, text: '보라마녀' }
      ],
      items: [],
      tableFields: [
        { key: 'id', label: '번호' },
        { key: 'email', label: '이메일' },
        { key: 'nick', label: '닉네임' },
        { key: 'socialType', label: '가입방법' },
        { key: 'createdAt', label: '가입일' },
        { key: 'coin', label: '보유 물약' },
        { key: 'star', label: '보유 호박' },
        { key: 'totalAmount', label: '총결제액' },
        { key: 'degree', label: '등급' },
        { key: 'state', label: '상태' },
        { key: 'adultAt', label: '성인인증' },
        { key: 'loginDate', label: '최근 접속일' }
      ],
      orderOptions: [
        { value: 1, text: '최신 순' },
        { value: 2, text: '오래된 순' }
      ],
      emailList: ['abc@example.com', 'def@example.com', '123@example.com']
    }
  },

  computed: {
    breadcrumb () {
      return [
        { label: '홈', url: '/' },
        { label: '회원 관리', url: '#' },
        { label: '회원 리스트', url: this.$route.path }
      ]
    }
  },
  mounted () {
    this.getItems()
    this.pagination.totalRows = this.items.length
  },
  methods: {
    async getItems () {
      this.isLoading = true
      const param = {
        pageNum: this.pagination.currentPage,
        pageSize: this.pagination.perPage
      }
      if (this.filter.email !== '') { param.email = this.filter.email }
      if (this.filter.state.length > 0) { param.state = this.filter.state }
      if (this.filter.socialType.length > 0) { param.socialType = this.filter.socialType }
      if (this.filter.searchDtType) {
        if (this.filter.searchStartDt === '' || this.filter.searchEndDt === '') {
          alert('날짜를 선택해 주세요.')
          return
        }
        param.searchDtType = this.filter.searchDtType
        param.searchStartDt = this.filter.searchStartDt
        param.searchEndDt = this.filter.searchEndDt
      }
      if (this.filter.degree.length > 0) { param.degree = this.filter.degree }
      console.log('param ::: ', param)
      await this.$axios
        .get(`/api/manager/user/list?${this.paramToQueryString(param)}`)
        .then((res) => {
          this.isLoading = false
          console.log('resp :::', res)
          this.items = res.data.data.list
          this.pagination.totalRows = res.data.data.total
        })
        .catch((err) => {
          this.isLoading = false
          console.log(err)
        })
    },
    paramToQueryString (param) {
      const str = []
      for (const property of Object.keys(param)) {
        const index = Object.keys(param).indexOf(property)
        const value = Object.values(param)[index]
        str.push(encodeURIComponent(property) + '=' + encodeURIComponent(value))
      }
      return str.join('&')
    },
    movePage (event) {
      this.pagination.currentPage = event
      this.getItems()
    },
    onSearchEmail () {
      console.log('search email')
    }
  }
}
</script>
<style lang="scss">
.user-list-form{
  .form-row{
    border: 1px solid #ddd;
    box-sizing: border-box;
    border-collapse: collapse;
    border-top: none;
    align-items: center;
    &:first-of-type{
      border-top: 1px solid #ddd;
    }
    label.col-form-label{
      width: 160px;
      border-right: 1px solid #ddd;
      height: 100%;
      background-color: #f5f5f5;
    }
    div.col{
      padding-left: 10px;
    }
  }
}
</style>
