<template>
  <div>
    <b-modal
      :id="modalId"
      :title="`${dataType === 'coin'? '물약': '호박'} 지급하기`"
      ok-title="등록"
      cancel-title="취소"
      centered
      @ok="clickOk"
      @cancel="clickCancel"
    >
      <b-container fluid class="px-0">
        <b-row class="px-3">
          <b-col lg="12" class="my-1">
            <table class="table border mb-0 table-layout-fixed">
              <tbody>
                <tr>
                  <th>상품명*</th>
                  <td colspan="3">
                    <b-form-input v-model="items.comment" class="w-60" />
                  </td>
                </tr>
                <tr>
                  <th>{{ dataType === 'coin'?'물약':'호박' }} 유효기간*</th>
                  <td colspan="3">
                    <b-form-radio-group
                      v-model="dateState"
                      :options="[
                        { value: 'appoint', text: '지정' },
                        { value: 'forever', text: '영구' }
                      ]"
                      class="mt-1"
                      @change="setEndDate"
                    />
                    <div
                      class="d-inline-flex justify-content-start w-100 my-2"
                    >
                      <div class="d-inline-flex w-40">
                        <b-form-datepicker
                          v-model="items.endDate"
                          placeholder="선택"
                          :date-format-options="{
                            year: 'numeric',
                            month: 'numeric',
                            day: 'numeric'
                          }"
                          class="ml-2"
                          :disabled="dateState==='forever'"
                        />
                      </div>
                    </div>
                  </td>
                </tr>
                <tr>
                  <th>{{ dataType === 'coin'?'물약':'호박' }} 수*</th>
                  <td colspan="3">
                    <b-form inline>
                      <b-form-input v-model="items.cnt" class="align-self-center w-25" />
                      <span class="ml-2">개</span>
                    </b-form>
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
          </b-col>
        </b-row>
      </b-container>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: 'ChargePointsModal',
  props: {
    modalId: { type: String, required: true },
    dataType: { type: String, required: false, default: 'coin' }
  },
  data () {
    return {
      dateState: '',
      items: {
        endDate: '2022-12-12',
        cnt: 0,
        reason: '',
        comment: ''
      }
    }
  },
  methods: {
    clickCancel () {
      this.$emit('close')
    },
    async clickOk (e) {
      if (!this.okOnly) {
        e.preventDefault()
      }
      const type = this.dataType === '' ? '물약' : '호박'
      // 유효기간 지정인데 날짜 설정안한 경우 -> 백,프론트 어디서 바꿀지 논의 후 추가
      try {
        const res = await this.$axios.post(
            `/api/manager/user/regist/${type}/${this.$route.query.id}`,
            {
              params: this.items
            }
        )
        console.log('res ::: ', res)
      } catch (e) {
        console.log(e)
      } finally {
        this.$emit('ok')
      }
    },
    setEndDate (val) {
      if (val === 'forever') {
        const date = new Date()
        const lastYear = new Date(date)
        lastYear.setYear(date.getFullYear() + 5)
        this.items.endDate = this.dateFormatting(lastYear, 'yymmdd')
      }
    }
  }
}
</script>
