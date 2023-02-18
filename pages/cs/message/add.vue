<template>
  <b-container fluid class="page-min-height py-3">
    <UiPageTitle title="메세지 전송" :breadcrumb="breadcrumb">
      <template #buttons>
        <b-button variant="primary" @click="sendMessage">
          전송
        </b-button>
      </template>
    </UiPageTitle>
    <hr>
    <b-row class="mt-3">
      <b-col>
        <table class="table border mb-0 table-layout-fixed">
          <colgroup>
            <col style="width: 15%">
            <col>
            <col style="width: 10%">
            <col>
          </colgroup>
          <tbody>
            <tr>
              <th>수신인</th>
              <div class="d-flex ml-2 my-2">
                <b-form-checkbox-group
                  v-model="form.receive"
                  :options="receiveOptions"
                  :aria-describedby="ariaDescribedby"
                  class="mt-2"
                />
                <b-button variant="primary" class="ml-2">
                  엑셀 등록
                </b-button>
              </div>
            </tr>

            <tr>
              <th>설정된 수식인</th>
              <td colspan="3">
                <b-button variant="primary">
                  더보기
                </b-button>
              </td>
            </tr>
            <tr>
              <th>메시지 종류</th>
              <td colspan="3">
                <b-form-group v-slot="{ ariaDescribedby }">
                  <b-form-radio-group
                    v-model="form.type"
                    :options="typeOptions"
                    :aria-describedby="ariaDescribedby"
                    class="mt-2"
                  />
                </b-form-group>
              </td>
            </tr>
            <tr>
              <th>메세지 내용</th>
              <td colspan="3">
                <b-form-textarea
                  id="textarea"
                  v-model="form.content"
                  rows="2"
                  max-rows="2"
                />
              </td>
            </tr>
            <tr>
              <th>알림 이미지</th>
              <td colspan="3">
                <b-form-group v-slot="{ ariaDescribedby }">
                  <b-form-radio-group
                    v-model="form.aramImage"
                    :aria-describedby="ariaDescribedby"
                  />
                </b-form-group>
              </td>
            </tr>
            <tr>
              <th>URL입력</th>
              <td colspan="3">
                <b-form-group v-slot="{ ariaDescribedby }">
                  <b-form-radio-group
                    v-model="form.urlInput"
                    :aria-describedby="ariaDescribedby"
                  />
                </b-form-group>
              </td>
            </tr>
            <tr>
              <th>공지사항 시작일</th>
              <td colspan="3">
                <div class="d-inline-flex justify-content-between w-70">
                  <div class="w-50 pr-2">
                    <label
                      for="policy-start-date"
                      class="fs-14 mb-0"
                    >날짜*</label>
                    <b-form-datepicker
                      id="policy-start-date"
                      v-model="form.startDate"
                      placeholder="시작일 선택"
                      class="mb-2"
                      :date-format-options="{
                        year: 'numeric',
                        month: 'numeric',
                        day: 'numeric'
                      }"
                    />
                  </div>
                  <div class="w-25 pr-2">
                    <label
                      for="policy-start-hours"
                      class="fs-14 mb-0"
                    >시간</label>
                    <b-form-select
                      id="policy-start-hours"
                      v-model="form.startHours"
                      :options="hoursOptions"
                    />
                  </div>
                  <div class="w-25 pr-2">
                    <label
                      for="policy-start-minutes"
                      class="fs-14 mb-0"
                    >분</label>
                    <b-form-select
                      id="policy-start-minutes"
                      v-model="form.startMinutes"
                      :options="minutesOptions"
                    />
                  </div>
                  <div class="w-25 pr-2">
                    <label
                      for="policy-start-seconds"
                      class="fs-14 mb-0"
                    >초</label>
                    <b-form-select
                      id="policy-start-seconds"
                      v-model="form.startSeconds"
                      :options="secondsOptions"
                    />
                  </div>
                </div>
              </td>
            </tr>

            <tr>
              <th>예약설정</th>
              <td colspan="3">
                <div class="mt-2 mb-3">
                  <b-form-checkbox v-model="form.setEndDate">
                    ON
                  </b-form-checkbox>
                </div>
                <div class="d-inline-flex justify-content-between w-70">
                  <div class="w-50 pr-2">
                    <label
                      for="policy-end-date"
                      class="fs-14 mb-0"
                    >날짜*</label>
                    <b-form-datepicker
                      id="policy-end-date"
                      v-model="form.endDate"
                      placeholder="종료일 선택"
                      class="mb-2"
                      :date-format-options="{
                        year: 'numeric',
                        month: 'numeric',
                        day: 'numeric'
                      }"
                    />
                  </div>
                  <div class="w-25 pr-2">
                    <label
                      for="policy-end-hours"
                      class="fs-14 mb-0"
                    >시간</label>
                    <b-form-select
                      id="policy-end-hours"
                      v-model="form.endHours"
                      :options="hoursOptions"
                    />
                  </div>
                  <div class="w-25 pr-2">
                    <label
                      for="policy-end-minutes"
                      class="fs-14 mb-0"
                    >분</label>
                    <b-form-select
                      id="policy-end-minutes"
                      v-model="form.endMinutes"
                      :options="minutesOptions"
                    />
                  </div>
                  <div class="w-25 pr-2">
                    <label
                      for="policy-end-seconds"
                      class="fs-14 mb-0"
                    >초</label>
                    <b-form-select
                      id="policy-end-seconds"
                      v-model="form.endSeconds"
                      :options="secondsOptions"
                    />
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { timeOptions } from '@/plugins/mixins'

export default {
  name: 'SettingPolicyAddPage',
  mixins: [timeOptions],
  data () {
    return {
      form: {
        type: null,
        title: '',
        openNoYes: '노출',
        content: '',
        startDate: '',
        startHours: '00',
        startMinutes: '00',
        startSeconds: '00',
        setEndDate: false,
        endDate: '',
        endHours: '00',
        endMinutes: '00',
        endSeconds: '59'
      },
      receiveOptions: [
        { text: '정액제', value: '정액제' },
        { text: '초록마녀', value: '초록마녀' },
        { text: '노란마녀', value: '노란마녀' }
      ],
      typeOptions: [
        { value: '일반', text: '일반' },
        { value: '이벤트', text: '이벤트' },
        { value: '공지사항', text: '공지사항' }
      ],
      openYesNoOptions: [
        { text: '노출', value: '노출' },
        { text: '미노출', value: '미노출' }
      ],
      hoursOptions: [],
      minutesOptions: [],
      secondsOptions: []
    }
  },
  computed: {
    breadcrumb () {
      const arr = [
        { label: '홈', url: '/' },
        { label: '서비스 운영 관리', url: '#' },
        { label: '메시지 전송 관리', url: this.$route.path }
      ]
      return arr
    }
  },
  watch: {},
  created () {},
  mounted () {
    this.hoursOptions = this.getHours()
    this.minutesOptions = this.getMinutes()
    this.secondsOptions = this.getSeconds()
  },
  methods: {
    async sendMessage () {
      try {
        const { status } = await this.$axios.post('', {
          receive: this.form.receive,
          type: this.form.type,
          content: this.form.content,
          startAt: this.form.startAt,
          endAt: this.form.endAt
        })
        if (status === 200) {
          this.form.name = ''
          alert('메세지 전송이 완료 되었습니다.')
          this.$router.push('/cs/message')
        }
      } catch (err) {
        alert('등록되지 않았습니다. 다시 시도해보십시오.')
      }
    }
  }
}
</script>
