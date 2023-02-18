<template>
  <div>
    <b-modal
      :id="modalId"
      :title="`${dataType === 'coin'? '물약': '호박'} 회수하기`"
      ok-title="등록"
      cancel-title="취소"
      centered
      @ok="clickOk"
      @cancel="clickCancel"
    >
      <b-container fluid class="px-0">
        <b-row>
          <b-col lg="12" class="my-1">
            <table class="table border mb-0 table-layout-fixed">
              <tbody>
                <tr>
                  <th>상품명*</th>
                  <td colspan="3">
                    <b-form-input v-model="items.comment" class="w-60" />
                  </td>
                </tr>
                <!--                <tr>-->
                <!--                  <th>지급물약</th>-->
                <!--                  <td colspan="3">-->
                <!--                  </td>-->
                <!--                </tr>-->
                <tr>
                  <th>회수 가능 {{ dataType==='coin'?"물약":"호박" }}</th>
                  <td colspan="3">
                    {{ items.limit }}
                  </td>
                </tr>
                <tr>
                  <th>회수 {{ dataType==='coin'?"물약":"호박" }} 수*</th>
                  <td colspan="3" class="flex-row">
                    <b-form-input
                      v-model="items.cnt"
                      class="align-self-center w-25 d-inline"
                      type="number"
                      min="0"
                      :max="String(items.limit)"
                      lazy
                      @change="checkCnt"
                    />
                    <span class="ml-2">개</span>
                    <span v-if="invalidCnt" class="d-block mt-2 small" style="color: red">
                      *회수가능 물약 수를 넘어서 입력할 수 없습니다.
                    </span>
                  </td>
                </tr>
                <tr>
                  <th>사유*</th>
                  <td colspan="3">
                    <b-form-input v-model="items.reason" class="w-60" />
                  </td>
                </tr>
              </tbody>
            </table>
            <p class="m-2 mt-3 small">
              *회수 기능 사용 시 사용기간이 입력되지않고, 호박이
              <span :style="{ color: 'red' }">바로 회수</span>
              됩니다.
            </p>
          </b-col>
        </b-row>
      </b-container>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: 'CollectPointsModal',
  props: {
    modalId: { type: String, required: true },
    dataType: { type: String, required: false, default: 'coin' }
  },
  data () {
    return {
      items: {
        comment: '',
        limit: 3,
        reason: '',
        cnt: 0
      },
      invalidCnt: false
    }
  },
  methods: {
    clickCancel () {
      this.$emit('close')
    },
    clickOk (e) {
      if (!this.okOnly) {
        e.preventDefault()
      }
      this.$emit('ok')
    },
    checkCnt (val) {
      console.log(val)
      if (val > this.items.limit) {
        this.items.cnt = this.items.limit
        this.invalidCnt = true
      } else {
        this.invalidCnt = false
      }
    }
  }
}
</script>
