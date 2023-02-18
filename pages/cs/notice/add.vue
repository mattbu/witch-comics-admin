<template>
  <b-container fluid class="page-min-height py-3">
    <UiPageTitle title="공지사항 등록" :breadcrumb="breadcrumb">
      <template #buttons>
        <b-button variant="primary" @click="addNotice">
          등록
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
            <!-- 정보 -->
            <tr>
              <th>제목</th>
              <td colspan="3">
                <b-form-input v-model="form.title" type="text" class="w-30" />
              </td>
            </tr>
            <tr>
              <th>내용</th>
              <td colspan="3">
                <b-form-textarea
                  id="textarea"
                  v-model="form.content"
                  rows="6"
                  max-rows="6"
                />
              </td>
            </tr>
            <tr>
              <th>상단배치</th>
              <td colspan="3">
                <b-form-checkbox v-model="form.setEndDate">
                  설정
                </b-form-checkbox>
              </td>
            </tr>
            <th>노출여부*</th>
            <td colspan="3">
              <div class="d-flex">
                <b-form-group v-slot="{ ariaDescribedby }">
                  <b-form-radio-group
                    v-model="form.openNoYes"
                    :options="openYesNoOptions"
                    :aria-describedby="ariaDescribedby"
                  />
                </b-form-group>
              </div>
            </td>
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
              <th>공지사항 종료일</th>
              <td colspan="3">
                <div class="mt-2 mb-3">
                  <b-form-checkbox v-model="form.setEndDate">
                    설정
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
      typeOptions: [
        { value: null, text: '선택' },
        { value: 1, text: '이용 약관' },
        { value: 2, text: '개인정보 처리방침' }
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
        { label: '공지사항 관리', url: '/setting/policy' },
        { label: '공지사항 등록', url: this.$route.path }
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
    async addNotice () {
      try {
        const { status } = await this.$axios.post('', {
          title: this.form.title,
          content: this.form.content,
          headerSet: this.form.headerSet,
          openYesNo: this.form.openYesNo,
          startAt: this.form.startAt,
          endAt: this.form.endAt
        })
        if (status === 200) {
          this.form.name = ''
          alert('공지사항 등록이 완료 되었습니다.')
          this.$router.push('/cs/notice')
        }
      } catch (err) {
        alert('등록되지 않았습니다. 다시 시도해보십시오.')
      }
    }
  }
}
</script>
