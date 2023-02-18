<template>
  <b-container fluid class="page-min-height py-3">
    <UiPageTitle title="이용권 등록" :breadcrumb="breadcrumb">
      <template #buttons>
        <!-- <b-button variant="outline-primary" to="/event/ticket">
          취소
        </b-button> -->
        <b-button variant="primary">
          등록
        </b-button>
      </template>
    </UiPageTitle>
    <hr>
    <b-row class="mt-4">
      <b-col cols="12">
        <table class="table border mb-0 table-layout-fixed">
          <colgroup>
            <col style="width: 15%">
            <col>
            <col style="width: 10%">
            <col>
          </colgroup>
          <tbody>
            <tr>
              <th>이용권명</th>
              <td colspan="3">
                <b-form-input v-model="form.name" type="text" class="w-40" />
              </td>
            </tr>

            <tr>
              <th>유효 기간</th>
              <td colspan="3">
                <div class="d-inline-flex justify-content-between w-70">
                  <div class="w-50 pr-2">
                    <b-form-datepicker
                      id="start-date"
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
                  <div class="w-50 pr-2">
                    <b-form-datepicker
                      id="end-date"
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
                </div>
              </td>
            </tr>

            <tr>
              <th>발행대상</th>
              <td colspan="3">
                <div class="d-inline-flex">
                  <b-form-checkbox
                    v-model="form.checkTarget"
                    class="align-self-center"
                  >
                    전체
                  </b-form-checkbox>
                  <div class="ml-4">
                    <b-button variant="outline-primary" class="table-inner-btn">
                      등급별 회원 그룹
                    </b-button>
                    <b-button variant="outline-primary" class="table-inner-btn">
                      관리자 설정 그룹
                    </b-button>
                  </div>
                </div>
              </td>
            </tr>

            <tr>
              <th>정산 여부</th>
              <td colspan="3">
                <b-form-group v-slot="{ ariaDescribedby }">
                  <b-form-radio-group
                    v-model="form.yn"
                    :options="ynOptions"
                    :aria-describedby="ariaDescribedby"
                  />
                </b-form-group>
              </td>
            </tr>

            <tr>
              <th>처리 방식</th>
              <td colspan="3">
                <b-form-group v-slot="{ ariaDescribedby }">
                  <b-form-radio-group
                    v-model="form.method"
                    :options="methodOptions"
                    :aria-describedby="ariaDescribedby"
                  />
                </b-form-group>
                <div class="mt-3">
                  <h6 class="fs-14 mb-2">
                    이용권 수
                  </h6>
                  <b-form-input v-model="form.ticketQuantity" class="w-10" />
                </div>
              </td>
            </tr>

            <tr>
              <th>예약 전송</th>
              <td colspan="3">
                <div class="d-inline-flex">
                  <b-form-checkbox
                    v-model="form.useReservation"
                    class="with-label"
                  >
                    ON
                  </b-form-checkbox>
                  <div class="d-inline-flex justify-content-between ml-4">
                    <div class="w-40 mr-2">
                      <label
                        for="reservation-start-date"
                        class="fs-14 mb-0"
                      >날짜*</label>
                      <b-form-datepicker
                        id="reservation-start-date"
                        v-model="form.reservationDate"
                        placeholder="선택"
                        :date-format-options="{
                          year: 'numeric',
                          month: 'numeric',
                          day: 'numeric'
                        }"
                      />
                    </div>
                    <div class="w-30 mr-2">
                      <label
                        for="reservation-start-hours"
                        class="fs-14 mb-0"
                      >시간</label>
                      <b-form-select
                        id="reservation-start-hours"
                        v-model="form.reservationHours"
                        :options="hoursOptions"
                      />
                    </div>
                    <div class="w-30 mr-2">
                      <label
                        for="reservation-start-minutes"
                        class="fs-14 mb-0"
                      >분</label>
                      <b-form-select
                        id="reservation-start-minutes"
                        v-model="form.reservationMinutes"
                        :options="minutesOptions"
                      />
                    </div>
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
  name: 'EventTicketAddPage',
  mixins: [timeOptions],
  data () {
    return {
      isMounted: false,
      form: {
        name: '',
        startDate: '',
        endDate: '',
        checkTarget: false,
        yn: null,
        method: null,
        ticketQuantity: '',
        useReservation: false,
        reservationDate: '',
        reservationHours: '00',
        reservationMinutes: '00'
      },
      ynOptions: [
        { text: '정산', value: 1 },
        { text: '미정산', value: 2 }
      ],
      methodOptions: [
        { text: '대여', value: 1 },
        { text: '소장', value: 2 }
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
        { label: '이벤트', url: '/event/list' },
        { label: '이용권 관리', url: '/event/ticket' },
        { label: '이용권 등록', url: this.$route.path }
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
