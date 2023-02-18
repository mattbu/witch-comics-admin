<template>
  <b-container fluid class="page-min-height py-3">
    <UiPageTitle
      title="정책 상세"
      :breadcrumb="breadcrumb"
    >
      <template #buttons>
        <b-button variant="outline-primary">
          삭제
        </b-button>
        <b-button variant="primary">
          수정
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
              <th>정책 유형</th>
              <td colspan="3">
                <b-form-select v-model="form.type" :options="typeOptions" class="w-50" />
              </td>
            </tr>
            <tr>
              <th>제목</th>
              <td colspan="3">
                <b-form-input v-model="form.title" type="text" class="w-50" />
              </td>
            </tr>
            <tr>
              <th>정책 내용</th>
              <td colspan="3">
                <b-form-textarea
                  id="textarea"
                  v-model="form.content"
                  rows="6"
                  max-rows="6"
                />
              </td>
            </tr>

            <tr v-if="false">
              <th>정책 시작일</th>
              <td colspan="3">
                <div class="d-inline-flex justify-content-between w-70">
                  <div class="w-50 pr-2">
                    <label for="policy-start-date" class="fs-14 mb-0">날짜*</label>
                    <b-form-datepicker
                      id="policy-start-date"
                      v-model="form.startDate"
                      placeholder="시작일 선택"
                      class="mb-2"
                      :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
                    />
                  </div>
                  <div class="w-25 pr-2">
                    <label for="policy-start-hours" class="fs-14 mb-0">시간</label>
                    <b-form-select id="policy-start-hours" v-model="form.startHours" :options="hoursOptions" />
                  </div>
                  <div class="w-25 pr-2">
                    <label for="policy-start-minutes" class="fs-14 mb-0">분</label>
                    <b-form-select id="policy-start-minutes" v-model="form.startMinutes" :options="minutesOptions" />
                  </div>
                  <div class="w-25 pr-2">
                    <label for="policy-start-seconds" class="fs-14 mb-0">초</label>
                    <b-form-select id="policy-start-seconds" v-model="form.startSeconds" :options="secondsOptions" />
                  </div>
                </div>
              </td>
            </tr>

            <tr v-if="false">
              <th>정책 종료일</th>
              <td colspan="3">
                <div class="mt-2 mb-3">
                  <b-form-checkbox v-model="form.setEndDate">
                    설정
                  </b-form-checkbox>
                </div>
                <div class="d-inline-flex justify-content-between w-70">
                  <div class="w-50 pr-2">
                    <label for="policy-end-date" class="fs-14 mb-0">날짜*</label>
                    <b-form-datepicker
                      id="policy-end-date"
                      v-model="form.endDate"
                      placeholder="종료일 선택"
                      class="mb-2"
                      :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
                    />
                  </div>
                  <div class="w-25 pr-2">
                    <label for="policy-end-hours" class="fs-14 mb-0">시간</label>
                    <b-form-select id="policy-end-hours" v-model="form.endHours" :options="hoursOptions" />
                  </div>
                  <div class="w-25 pr-2">
                    <label for="policy-end-minutes" class="fs-14 mb-0">분</label>
                    <b-form-select id="policy-end-minutes" v-model="form.endMinutes" :options="minutesOptions" />
                  </div>
                  <div class="w-25 pr-2">
                    <label for="policy-end-seconds" class="fs-14 mb-0">초</label>
                    <b-form-select id="policy-end-seconds" v-model="form.endSeconds" :options="secondsOptions" />
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
  name: 'SettingPolicyEditPage',
  mixins: [timeOptions],
  data () {
    return {
      form: {
        type: null,
        title: '',
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
      hoursOptions: [],
      minutesOptions: [],
      secondsOptions: []
    }
  },
  computed: {
    breadcrumb () {
      const arr = [
        { label: '홈', url: '/' },
        { label: '설정', url: '#' },
        { label: '정책 관리', url: '/setting/policy' },
        { label: '정책 상세', url: this.$route.path }
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
  methods: {}
}
</script>
