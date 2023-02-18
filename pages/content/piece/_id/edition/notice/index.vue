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
                <p>{{ pieceInfo.menucode ? pieceInfo.menucode :'-' }}</p>
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
    <b-row class="mt-5">
      <b-col align-self="center">
        <h6>공지사항 목록</h6>
      </b-col>
    </b-row>
    <hr class="my-2">
    <b-table
      class="list mt-3"
      :items="noticeList"
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
      <template #cell(title)="data">
        {{ data.value ? data.value : '-' }}
      </template>
      <template #cell(status)="data">
        {{ data.value ? data.value : '-' }}
      </template>
      <template #cell(display_start_date)="data">
        {{ data.value ? data.value : '-' }}
      </template>
      <template #cell(display_end_date)="data">
        {{ data.value ? data.value : '-' }}
      </template>
      <template #cell(is_show)="data">
        {{ data.value ? data.value : '-' }}
      </template>
      <template #cell(manager)="data">
        {{ data.value ? data.value : '-' }}
      </template>

      <template #cell(setting)="data">
        <b-button variant="outline-secondary" class="table-inner-btn" @click="removeNotice(data.item.id)">
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
  name: 'ContentPieceEditionNoticePage',
  data () {
    return {
      // 상단 정보
      isInfoLoading: false,
      pieceInfo: {},
      // 리스트
      isLoading: false,
      totalRows: 0,
      currentPage: 1,
      perPage: 1,
      noticeList: [],
      fields: [
        { key: 'fix', label: '상단고정' },
        { key: 'no', label: '번호' },
        { key: 'title', label: '제목' },
        { key: 'status', label: '상태' },
        { key: 'display_start_date', label: '시작일' },
        { key: 'display_end_date', label: '종료일' },
        { key: 'is_show', label: '노출 여부' },
        { key: 'manager', label: '등록/최종수정' },
        { key: 'setting', label: '관리' }
      ]
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
          url: `/content/piece/${this.$route.params.id}/edition/notice`
        }
      ]
      return arr
    }
  },
  watch: {
    async currentPage () {
      await this.getList()
    }
  },
  mounted () {},
  methods: {
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
    async getList () {
      this.isLoading = true

      try {
        const { status, data: { data } } = await this.$axios.get(`/api/cartoon/contents/list/notice/${this.$route.params.id}`)

        if (status === 200) {
          this.noticeList = data.list
          this.totalRows = data.list.length
        }
      } catch (e) {
        console.log(e)
      } finally {
        this.isLoading = false
      }
    },
    async removeNotice (id) {
      const confirm = window.confirm('삭제 하시겠습니까?')

      if (confirm) {
        try {
          const { status } = await this.$axios.delete(`/api/cartoon/contents/delete/notice/${id}`)
          if (status === 200) {
            alert('공지사항 삭제가 완료 되었습니다.')
            await this.getList()
          }
        } catch (e) {
          console.log(e)
        }
      } else {
        alert('삭제가 취소 되었습니다.')
      }
    }
  }
}
</script>
