<template>
  <div>
    <b-modal
      :id="modalId"
      title="댓글 상세보기"
      ok-title="저장"
      cancel-title="닫기"
      centered
      class="modal-close-button"
      @ok="clickOk"
      @cancel="clickCancel"
    >
      <b-container fluid class="px-0">
        <b-row v-if="items" class="px-3">
          <b-col lg="12" class="my-1">
            <table class="table border mb-0 table-layout-fixed">
              <tr>
                <th>작품</th>
                <td colspan="3">
                  {{ items.title }}
                </td>
              </tr>
              <tr>
                <th>회차</th>
                <td colspan="3">
                  {{ items.subtitle }}
                </td>
              </tr>
              <tr>
                <th>유형</th>
                <td colspan="3">
                  <div class="d-inline-flex justify-content-start w-100 my-2">
                    <div class="d-inline-flex w-40">
                      {{ items.replyType }}
                    </div>
                  </div>
                </td>
              </tr>
              <tr>
                <th>작성일</th>
                <td colspan="3">
                  {{ items.createdAt }}
                </td>
              </tr>
              <tr>
                <th>작성자</th>
                <td colspan="3">
                  {{ items.nick }}
                </td>
              </tr>
              <tr>
                <th>상태</th>
                <td colspan="3">
                  {{ items.isShow }}
                </td>
              </tr>
              <tr>
                <th>작성글</th>
                <td colspan="3">
                  {{ items.comment }}
                </td>
              </tr>
              <tr>
                <th>피드백</th>
                <td colspan="3">
                  공감 : {{ items.likeCnt }} 비공감 : ?? 신고 : {{ items.accusedCnt }}
                </td>
              </tr>
              <tr>
                <th>신고내역</th>
                <td colspan="3">
                  ??
                </td>
              </tr>
              <tr>
                <th>댓글설정</th>
                <td colspan="3">
                  <b-form-radio-group
                    v-model="commentSettings"
                    :options="commentSettingsOptions"
                  />
                </td>
              </tr>
            </table>
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
  name: 'CommentDetailModal',
  props: {
    modalId: { type: String, required: true },
    commentId: { type: String, required: true }
  },
  data () {
    return {
      isLoading: true,
      items: {},
      commentSettingsOptions: [
        { value: 'normal', text: '정상' },
        { value: 'hide', text: '숨김' },
        { value: 'block', text: '차단' }
      ],
      commentSettings: 'normal'
    }
  },
  watch: {
    commentId (newVal, oldVal) {
      console.log('change comment_id ::: ', newVal, oldVal)
    }
  },
  mounted () {
    if (this.commentId !== '') { this.getItems() }
  },
  methods: {
    async getItems () {
      this.isLoading = true
      try {
        const { data } = await this.$axios.get(`/api/manager/user/reply/detail/${this.commentId}`)
        console.log('resp ::: ', data)
        this.items = data
      } catch (e) {
        console.log(e)
      } finally {
        this.isLoading = false
      }
    },
    clickCancel () {
      this.$emit('close')
    },
    clickOk (e) {
      if (!this.okOnly) {
        e.preventDefault()
      }
      this.$emit('ok')
    }
  }
}
</script>
