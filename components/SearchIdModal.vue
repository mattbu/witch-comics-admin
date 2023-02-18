<template>
  <b-modal
    id="find-id-modal"
    title="아이디 검색"
    ok-only
    ok-title="등록"
    centered
    scrollable
    size="lg"
    @ok="selectId"
  >
    <b-row class="px-3">
      <b-col md="12" class="my-2">
        <b-form class="d-flex" @submit.prevent="getList">
          <b-form-input
            v-model="email"
            placeholder="아이디 입력"
            class="w-75"
          />
          <b-button type="submit" variant="primary" class="ml-2">
            검색
          </b-button>
        </b-form>
      </b-col>
    </b-row>
    <b-row class="mt-3 px-3">
      <b-col lg="12" class="my-2">
        <table class="table border mb-0 table-layout-fixed center-box">
          <colgroup>
            <col style="width: 15%">
            <col>
            <col style="width: 10%">
            <col>
          </colgroup>
          <tbody>
            <tr>
              <th>선택된 아이디</th>
              <td>
                <p>{{ currentUser.email ? currentUser.email : '-' }}</p>
              </td>
            </tr>
          </tbody>
        </table>
      </b-col>
    </b-row>
    <b-row class="mt-3 px-3">
      <b-col lg="12" class="my-1">
        <p class="font-weight-700 my-1">
          아이디 검색 목록
        </p>
        <b-table
          class="list"
          :items="userList"
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
          <template #cell(check)="data">
            <b-form-radio v-model="currentUser" :value="data.item" />
          </template>
          <template #cell(email)="data">
            {{ data.value ? data.value : '-' }}
          </template>
        </b-table>
      </b-col>
    </b-row>
  </b-modal>
</template>

<script>
export default {
  name: 'SearchIdModal',
  data () {
    return {
      email: '',
      isLoading: false,
      userList: [],
      totalRows: 0,
      currentPage: 1,
      perPage: 20,
      fields: [
        { key: 'check', label: '' },
        { key: 'email', label: '아이디' }
      ],
      currentUser: {}
    }
  },
  watch: {},
  methods: {
    selectId (e) {
      if (this.currentUser.id) {
        this.$emit('select-id', this.currentUser)
        this.userList = []
        this.email = ''
        this.currentUser = {}
      } else {
        e.preventDefault()
        alert('아이디를 선택해 주세요.')
      }
    },
    async getList () {
      this.isLoading = true

      try {
        const {
          data: { data }
        } = await this.$axios.get('/api/manager/user/list', {
          params: {
            pageNum: this.currentPage,
            pageSize: this.perPage,
            email: this.email
          }
        })
        this.userList = data.list
        this.totalRows = data.total
        this.email = ''
        this.isLoading = false
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>
