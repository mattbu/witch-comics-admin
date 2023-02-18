<template>
  <div>
    <b-modal
      :id="modalId"
      title="OO 이벤트 참여내역 상세보기"
      ok-only
      ok-title="닫기"
      centered
      class="modal-close-button"
      scrollable
      size="lg"
    >
      <b-container fluid class="px-0">
        <b-row v-if="items" class="px-3">
          <b-col lg="12" class="my-5">
            <!--            <table class="table border mb-0 table-layout-fixed user-detail-info">-->
            <!--              <tr>-->
            <!--                <th>이벤트 작품</th>-->
            <!--                <th>이벤트 내역</th>-->
            <!--                <th>참여시간</th>-->
            <!--              </tr>-->
            <!--              <tr v-for="(item,idx) in items" :key="'event_detail_'+idx">-->
            <!--                <td>여의주를 훔치는 방법</td>-->
            <!--                <td>3화</td>-->
            <!--                <td>2022-10-20 12:00</td>-->
            <!--              </tr>-->
            <!--            </table>-->
            <b-table
              class="list"
              :items="items"
              :fields="fields"
              :current-page="pagination.currentPage"
              :per-page="pagination.perPage"
              busy
              stacked="md"
              show-empty
              small
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
            </b-table>
            <UiPagination
              class="py-4"
              :page="pagination.currentPage"
              :per-page="pagination.perPage"
              :total-rows="pagination.totalRows"
              @change-page="movePage"
            />
          </b-col>
        </b-row>
        <b-row v-else>
          <p>조회 가능한 데이터가 없습니다.</p>
        </b-row>
      </b-container>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: 'EventDetailModal',
  props: {
    modalId: { type: String, required: true },
    eventId: { type: String, required: true }
  },
  data () {
    return {
      isLoading: true,
      pagination: {
        currentPage: 1,
        perPage: 10,
        totalRows: 5
      },
      items: [],
      fields: [
        { key: 'title', label: '이벤트 작품' },
        { key: 'history', label: '이벤트 내역' },
        { key: 'date', label: '참여시간' }
      ]
    }
  },
  watch: {
    eventId (newVal, oldVal) {
      console.log('change event_id ::: ', newVal, oldVal)
    }
  },
  mounted () {
    if (this.eventId !== '') { this.getItems() }
  },
  methods: {
    async getItems () {
      this.isLoading = true
      try {
        const { data } = await this.$axios.get(`/api/manager/user/event/detail/${this.eventId}`)
        console.log('resp ::: ', data)
        this.items = data
      } catch (e) {
        console.log(e)
      } finally {
        this.isLoading = false
      }
    },
    movePage (event) {
      this.pagination.currentPage = event
      this.getItems()
    }
  }
}
</script>
