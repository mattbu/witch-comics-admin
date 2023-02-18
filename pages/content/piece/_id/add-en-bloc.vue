<template>
  <b-container fluid class="page-min-height py-3">
    <UiPageTitle
      title="일괄 등록"
      :breadcrumb="breadcrumb"
    >
      <template #buttons>
        <b-button variant="outline-primary" @click="$router.push(`/content/piece/${$route.params.id}/edition`)">
          취소
        </b-button>
        <b-button variant="primary">
          등록
        </b-button>
      </template>
    </UiPageTitle>
    <hr>
    <b-row class="mt-4">
      <b-col cols="12">
        <b-card class="mb-4">
          <h6>
            일괄 등록 시 설정된 정보 값으로 일괄적으로 작품이 올라갑니다.
          </h6>
        </b-card>
      </b-col>
    </b-row>
    <b-row class="mt-3">
      <b-col>
        <p class="font-weight-bold mb-2">
          신규 등록 정보
        </p>
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
              <th>프롤로그 설정</th>
              <td colspan="3">
                <div class="d-inline-flex">
                  <b-form-checkbox v-model="form.setPrologue">
                    설정
                  </b-form-checkbox>
                  <span class="ml-5">* 프롤로그 설정 시 에피소드 회차가 아닌 프롤로그 회차로 시작됩니다.</span>
                </div>
              </td>
            </tr>
            <tr>
              <th>제목*</th>
              <td colspan="3">
                <b-form-input v-model="form.title" type="text" placeholder="제목 입력" class="w-50" />
              </td>
            </tr>
            <tr>
              <th>부제</th>
              <td colspan="3">
                <b-form-input v-model="form.subtitle" type="text" placeholder="부제 입력" class="w-50" />
              </td>
            </tr>
            <tr>
              <th>파일 갯수</th>
              <td colspan="3">
                0개
              </td>
            </tr>
            <tr>
              <th>파일 등록</th>
              <td colspan="3">
                <div>
                  <input id="file-input" type="file" @change="uploadFile">
                  <!--                  <label for="file-input" class="btn btn-outline-secondary mb-0">-->
                  <!--                    파일 선택-->
                  <!--                  </label>-->
                </div>
              </td>
            </tr>

            <tr>
              <th>서비스 시작일</th>
              <td colspan="3">
                <div class="d-inline-flex justify-content-between w-70">
                  <div class="w-50 pr-2">
                    <label for="service-start-date">날짜*</label>
                    <b-form-datepicker
                      id="service-start-date"
                      v-model="form.startDate"
                      placeholder="시작일 선택"
                      class="mb-2"
                      :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
                    />
                  </div>
                  <div class="w-25 pr-2">
                    <label for="service-start-hours">시간</label>
                    <b-form-select id="service-start-hours" v-model="form.startHours" :options="hoursOptions" />
                  </div>
                  <div class="w-25 pr-2">
                    <label for="service-start-minutes">분</label>
                    <b-form-select id="service-start-minutes" v-model="form.startMinutes" :options="minutesOptions" />
                  </div>
                  <div class="w-25 pr-2">
                    <label for="service-start-seconds">초</label>
                    <b-form-select id="service-start-seconds" v-model="form.startSeconds" :options="secondsOptions" />
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
  name: 'ContentPieceAddEnBlocPage',
  mixins: [timeOptions],
  data () {
    return {
      form: {
        setPrologue: false,
        title: '',
        subtitle: '',
        file: null,
        startDate: '',
        startHours: '00',
        startMinutes: '00',
        startSeconds: '00'
      },
      hoursOptions: [],
      minutesOptions: [],
      secondsOptions: []
    }
  },
  computed: {
    breadcrumb () {
      const arr = [
        { label: '홈', url: '/' },
        { label: '콘텐츠 관리', url: '#' },
        { label: '작품 관리', url: '/content/piece' },
        { label: '회차 목록', url: `/content/piece/${this.$route.params.id}/edition` },
        { label: '일괄 등륵', url: `/content/piece/${this.$route.params.id}/add-en-bloc` }
      ]
      return arr
    }
  },
  watch: {},
  created () {
  },
  mounted () {
    this.hoursOptions = this.getHours()
    this.minutesOptions = this.getMinutes()
    this.secondsOptions = this.getSeconds()
  },
  methods: {
    uploadFile (e) {
      this.form.file = e.target.files[0]
      console.log(this.form.file)
    }
  }
}
</script>
