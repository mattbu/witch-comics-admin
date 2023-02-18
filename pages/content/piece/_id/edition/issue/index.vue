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
                <p>{{ pieceInfo.menucode ? pieceInfo.menucode : '-' }}</p>
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
                <p>
                  {{
                    pieceInfo.displayStartDate
                      ? pieceInfo.displayStartDate
                      : '-'
                  }}
                </p>
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
    <b-row class="mt-5">
      <b-col align-self="center">
        <h6>작품 이슈사항</h6>
      </b-col>
    </b-row>
    <hr class="my-2">
    <b-row>
      <b-col class="d-inline-flex" tag="form" @submit.prevent="addIssue">
        <b-form-input v-model.trim="issue" class="w-93" />
        <b-button type="submit" class="ml-2 w-7">
          등록
        </b-button>
      </b-col>
    </b-row>
    <!--    이슈사항 목록-->
    <b-table
      class="list mt-3"
      :items="list"
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
        {{ data.index + 1 }}
        <!--        {{ totalRows - (currentPage - 1) * perPage - (data.index + 1) + 1 }}-->
      </template>
      <template #cell(setting)="data">
        <b-button
          variant="outline-secondary"
          class="table-inner-btn"
          @click="removeIssue(data.item.id)"
        >
          삭제
        </b-button>
      </template>
    </b-table>
    <!--    <UiPagination-->
    <!--      class="py-4"-->
    <!--      :page="currentPage"-->
    <!--      :per-page="perPage"-->
    <!--      :total-rows="totalRows"-->
    <!--      @change-page="currentPage = $event"-->
    <!--    />-->
  </b-container>
</template>

<script>
export default {
  name: 'ContentPieceEditionIssuePage',
  data () {
    return {
      // 상단 정보
      isInfoLoading: false,
      pieceInfo: {},
      // 리스트
      isLoading: false,
      issue: '',
      fields: [
        { key: 'no', label: '번호' },
        { key: 'comment', label: '내용' },
        { key: 'manager', label: '담당자' },
        { key: 'setting', label: '관리' }
      ],
      list: [],
      totalRows: 0,
      currentPage: 1,
      perPage: 5
    }
  },
  async fetch () {
    await this.getInfo()
    await this.getList()
  },
  computed: {},
  watch: {},
  mounted () {},
  methods: {
    async getInfo () {
      this.isInfoLoading = true
      try {
        const {
          status,
          data: { data }
        } = await this.$axios.get(
          `/api/cartoon/contents/sub/base/${this.$route.params.id}`
        )
        if (status === 200) {
          this.pieceInfo = data
        }
      } catch (e) {
        console.log(e)
      } finally {
        this.isInfoLoading = false
      }
    },
    /** 이슈사항 목록 불러오기 */
    async getList () {
      this.isLoading = true

      try {
        const {
          status,
          data: { data }
        } = await this.$axios.get(
          `/api/cartoon/contents/list/issue/${this.$route.params.id}`
        )
        if (status === 200) {
          this.list = data.list
        }
      } catch (e) {
        console.log(e)
      } finally {
        this.isLoading = false
      }
    },

    // 작품 이슈사항 등록
    async addIssue () {
      try {
        const { status } = await this.$axios.post(
          `/api/cartoon/contents/regist/issue/${this.$route.params.id}`,
          {
            comment: this.issue
          }
        )
        if (status === 200) {
          alert('이슈사항 등록이 완료 되었습니다.')
          this.issue = ''
          await this.getList()
        }
      } catch (err) {
        alert('등록되지 않았습니다. 다시 시도해보십시오.')
      }
    },
    // 작품 이슈사항 삭제
    async removeIssue (id) {
      const confirm = window.confirm('삭제 하시겠습니까?')

      if (confirm) {
        try {
          const { status } = await this.$axios.delete(
            `/api/cartoon/contents/delete/issue/${id}`
          )
          if (status === 200) {
            alert('이슈사항 삭제가 완료 되었습니다.')
            await this.getList()
          }
        } catch (err) {
          alert('삭제가 되지 않았습니다. 다시 시도해보십시오.')
        }
      } else {
        alert('삭제가 취소 되었습니다.')
      }
    }
  }
}
</script>
