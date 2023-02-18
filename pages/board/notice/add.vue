<template>
  <b-container fluid class="page-min-height py-3">
    <UiPageTitle
      title="공지사항 등록"
      :breadcrumb="breadcrumb"
    >
      <template #buttons>
        <!-- <b-button variant="outline-primary" @click="$router.push('/board/notice')">
          취소
        </b-button> -->
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
              <th>공지 시작일</th>
              <td colspan="3">
                <div class="d-inline-flex justify-content-between w-70">
                  <div class="w-50 pr-2">
                    <label for="notice-start-date" class="fs-14 mb-0">날짜*</label>
                    <b-form-datepicker
                      id="notice-start-date"
                      v-model="form.startDate"
                      placeholder="시작일 선택"
                      class="mb-2"
                      :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
                    />
                  </div>
                  <div class="w-25 pr-2">
                    <label for="notice-start-hours" class="fs-14 mb-0">시간</label>
                    <b-form-select id="notice-start-hours" v-model="form.startHours" :options="hoursOptions" />
                  </div>
                  <div class="w-25 pr-2">
                    <label for="notice-start-minutes" class="fs-14 mb-0">분</label>
                    <b-form-select id="notice-start-minutes" v-model="form.startMinutes" :options="minutesOptions" />
                  </div>
                  <div class="w-25 pr-2">
                    <label for="notice-start-seconds" class="fs-14 mb-0">초</label>
                    <b-form-select id="notice-start-seconds" v-model="form.startSeconds" :options="secondsOptions" />
                  </div>
                </div>
              </td>
            </tr>

            <tr>
              <th>공지 종료일</th>
              <td colspan="3">
                <div class="mt-2 mb-3">
                  <b-form-checkbox v-model="form.setEndDate">
                    설정
                  </b-form-checkbox>
                </div>
                <div class="d-inline-flex justify-content-between w-70">
                  <div class="w-50 pr-2">
                    <label for="notice-end-date" class="fs-14 mb-0">날짜*</label>
                    <b-form-datepicker
                      id="notice-end-date"
                      v-model="form.endDate"
                      placeholder="종료일 선택"
                      class="mb-2"
                      :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
                    />
                  </div>
                  <div class="w-25 pr-2">
                    <label for="notice-end-hours" class="fs-14 mb-0">시간</label>
                    <b-form-select id="notice-end-hours" v-model="form.endHours" :options="hoursOptions" />
                  </div>
                  <div class="w-25 pr-2">
                    <label for="notice-end-minutes" class="fs-14 mb-0">분</label>
                    <b-form-select id="notice-end-minutes" v-model="form.endMinutes" :options="minutesOptions" />
                  </div>
                  <div class="w-25 pr-2">
                    <label for="notice-end-seconds" class="fs-14 mb-0">초</label>
                    <b-form-select id="notice-end-seconds" v-model="form.endSeconds" :options="secondsOptions" />
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
  name: 'BoardNoticeAddPage',
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
        { value: 1, text: '공지사항1' },
        { value: 2, text: '공지사항2' }
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
        { label: '공지사항', url: '/board/notice' },
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
  methods: {}
}
</script>
