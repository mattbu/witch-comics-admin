<template>
  <b-container fluid class="page-min-height py-3">
    <UiPageTitle
      title="FAQ 등록"
      :breadcrumb="breadcrumb"
    >
      <template #buttons>
        <b-button variant="outline-primary" @click="$router.push('/board/faq')">
          취소
        </b-button>
        <b-button variant="primary">
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
              <th>유형</th>
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
              <th>예약 설정</th>
              <td colspan="3">
                <div class="mt-2 mb-3">
                  <b-form-checkbox v-model="form.setReservation">
                    설정
                  </b-form-checkbox>
                </div>
                <div class="d-inline-flex justify-content-between w-70">
                  <div class="w-50 pr-2">
                    <label for="reservation-end-date" class="fs-14 mb-0">날짜*</label>
                    <b-form-datepicker
                      id="reservation-end-date"
                      v-model="form.date"
                      placeholder="예약일 선택"
                      class="mb-2"
                      :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
                    />
                  </div>
                  <div class="w-25 pr-2">
                    <label for="reservation-end-hours" class="fs-14 mb-0">시간</label>
                    <b-form-select id="reservation-end-hours" v-model="form.hours" :options="hoursOptions" />
                  </div>
                  <div class="w-25 pr-2">
                    <label for="reservation-end-minutes" class="fs-14 mb-0">분</label>
                    <b-form-select id="reservation-end-minutes" v-model="form.minutes" :options="minutesOptions" />
                  </div>
                  <div class="w-25 pr-2">
                    <label for="reservation-end-seconds" class="fs-14 mb-0">초</label>
                    <b-form-select id="reservation-end-seconds" v-model="form.seconds" :options="secondsOptions" />
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
  name: 'BoardFaqAddPage',
  mixins: [timeOptions],
  data () {
    return {
      form: {
        type: null,
        title: '',
        content: '',
        setReservation: false,
        date: '',
        hours: '00',
        minutes: '00',
        seconds: '59'
      },
      typeOptions: [
        { value: null, text: '선택' },
        { value: 1, text: 'FAQ1' },
        { value: 2, text: 'FAQ2' }
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
        { label: '게시판 관리', url: '#' },
        { label: 'FAQ', url: '/board/faq' },
        { label: 'FAQ 등록', url: this.$route.path }
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
