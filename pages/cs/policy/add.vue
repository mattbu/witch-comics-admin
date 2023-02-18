<template>
  <b-container fluid class="page-min-height py-3">
    <UiPageTitle title="정책 등록" :breadcrumb="breadcrumb">
      <template #buttons>
        <b-button variant="primary" @click="addPolicy">
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
              <th>정책 유형</th>
              <td colspan="3">
                <b-form-select
                  v-model="form.category"
                  :options="typeOptions"
                  class="w-15"
                />
              </td>
            </tr>
            <tr>
              <th>제목</th>
              <td colspan="">
                <b-form-input v-model="form.title" type="text" />
              </td>
              <th>정책 버전</th>
              <td colspan="">
                <b-form-input v-model="form.ver" type="text" />
              </td>
            </tr>
            <tr>
              <th>정책 내용</th>
              <td colspan="3">
                <div id="editor" />
                <TuiEditor
                  ref="text-editor"
                  v-model="form.contents"
                  :options="tuiEditorOptions"
                  :initial-value="form.description"
                  initial-edit-type="wysiwyg"
                />
              </td>
            </tr>
            <tr>
              <th>노출여부*</th>
              <td colspan="3">
                <div class="d-flex">
                  <b-form-group v-slot="{ ariaDescribedby }">
                    <b-form-radio-group
                      v-model="form.isShow"
                      :options="openYesNoOptions"
                      :aria-describedby="ariaDescribedby"
                    />
                  </b-form-group>
                </div>
              </td>
            </tr>
            <tr>
              <th>시작일</th>
              <td colspan="3">
                <div class="d-inline-flex justify-content-between w-70">
                  <div class="w-30 pr-2">
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
              <th>종료일</th>
              <td colspan="3">
                <div class="d-flex">
                  <div class="d-flex">
                    <b-form-checkbox v-model="setEnd" class="my-4">
                      설정
                    </b-form-checkbox>
                  </div>
                  <div class="d-inline-flex justify-content-between w-70 ml-3">
                    <div class="w-50 pr-2">
                      <label for="end-date" class="fs-14">날짜*</label>
                      <b-form-datepicker
                        id="end-date"
                        v-model="form.endDate"
                        label-help=""
                        hide-header
                        placeholder="종료일 선택"
                        class="mb-2"
                        :date-format-options="{
                          year: 'numeric',
                          month: 'numeric',
                          day: 'numeric'
                        }"
                        :disabled="!setEnd"
                      />
                    </div>
                    <div class="w-25 pr-2">
                      <label for="end-hours">시간</label>
                      <b-form-select
                        id="end-hours"
                        v-model="form.endHours"
                        :options="hoursOptions"
                        :disabled="!setEnd"
                      />
                    </div>
                    <div class="w-25 pr-2">
                      <label for="end-minutes">분</label>
                      <b-form-select
                        id="end-minutes"
                        v-model="form.endMinutes"
                        :options="minutesOptions"
                        :disabled="!setEnd"
                      />
                    </div>
                    <div class="w-25 pr-2">
                      <label for="end-seconds">초</label>
                      <b-form-select
                        id="end-seconds"
                        v-model="form.endSeconds"
                        :options="secondsOptions"
                        :disabled="!setEnd"
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
  name: 'SettingPolicyAddPage',
  mixins: [timeOptions],
  data () {
    return {
      setEnd: false,
      form: {
        category: '선택', // 카테고리
        title: '', // 제목
        ver: '', // 버전
        content: '', // 내용
        isShow: '노출', // 노출여부
        startDate: '', // 시작일
        endDate: '', // 종료일
        startHours: '00',
        startMinutes: '00',
        startSeconds: '00',
        endHours: '00',
        endMinutes: '00',
        endSeconds: '59'
      },
      typeOptions: [
        { value: '선택', text: '선택' },
        { value: '이용 약관', text: '이용 약관' },
        { value: '개인정보 처리방침', text: '개인정보 처리방침' },
        { value: '일반충전 유의사항', text: '일반충전 유의사항' },
        { value: '자동충전 유의사항', text: '자동충전 유의사항' },
        { value: '정액제 유의사항', text: '정액제 유의사항' },
        { value: '월상품 취소 유의사항', text: '월상품 취소 유의사항' },
        { value: '받은 선물 유의사항', text: '개받은 선물 유의사항' },
        { value: '보낸 선물 유의사항', text: '보낸 선물 유의사항' }
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
        { label: '정책 등록', url: this.$route.path }
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
    async addPolicy () {
      try {
        const res = await this.$axios.post('/api/manager/policy', this.form)
        console.log(res)

        if (res.status === 200) {
          alert('등록이 완료 되었습니다.')
          await this.$router.push('/cs/policy')
        }
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>
