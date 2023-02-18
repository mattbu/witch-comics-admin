<template>
  <b-container fluid class="page-min-height pt-3 pb-5 mb-5">
    <UiPageTitle title="공지사항 등록" :breadcrumb="breadcrumb">
      <template #buttons>
        <b-button
          variant="outline-primary"
          @click="$router.push('/content/piece')"
        >
          취소
        </b-button>
        <b-button variant="primary" @click="addNotice">
          등록
        </b-button>
      </template>
    </UiPageTitle>
    <hr>
    <b-row class="pt-3" align-h="between">
      <b-col align-self="center">
        <h6>공지사항 등록</h6>
      </b-col>
    </b-row>
    <hr class="my-2">

    <!-- 작품 소개 -->
    <b-row class="mt-2">
      <b-col cols="12">
        <table class="table border mb-0 table-layout-fixed">
          <tbody>
            <tr>
              <th>제목*</th>
              <td>
                <b-form-input
                  v-model="form.title"
                  type="text"
                  placeholder="제목을 입력해주세요."
                />
              </td>
            </tr>
            <tr>
              <th>내용</th>
              <td colspan="4">
                <b-form-textarea
                  v-model="form.description"
                  placeholder="내용을 입력해주세요."
                  rows="4"
                  max-rows="6"
                />
              </td>
            </tr>

            <tr>
              <th>이미지</th>
              <td colspan="4">
                <p class="mb-2">
                  이미지 추가 ({{ form.imgFiles.length }}/3개)
                </p>
                <div>
                  <input
                    id="img-input"
                    type="file"
                    multiple
                    class="d-none"
                    @change="uploadImg"
                  >
                  <label
                    for="img-input"
                    class="btn btn-outline-secondary mb-0 table-inner-btn"
                  >
                    파일 선택
                  </label>
                </div>

                <b-row v-if="imgFileUrls.length > 0" class="mt-3">
                  <b-col
                    v-for="(url, idx) in imgFileUrls"
                    :key="`imgUrl-${idx}`"
                    cols="2"
                    class="mb-3"
                  >
                    <div class="add-thumbnail-wrapper">
                      <img
                        v-if="url"
                        :src="url"
                        class="preview"
                        alt=""
                      >
                      <b-button variant="transparent" class="p-0 ml-3 d-flex img-delete-btn" @click="deleteListImg(idx)">
                        <b-icon variant="dark" icon="x" font-scale="1.2" />
                      </b-button>
                    </div>
                  </b-col>
                </b-row>
              </td>
            </tr>

            <tr>
              <th>공지 시작일*</th>
              <td colspan="4">
                <div class="d-inline-flex justify-content-between w-70">
                  <div class="w-50 pr-2">
                    <label for="start-date">날짜*</label>
                    <b-form-datepicker
                      id="start-date"
                      v-model="form.start.date"
                      placeholder="시작일 선택"
                      class="mb-2"
                      hide-header
                      label-help=""
                      :date-format-options="{
                        year: 'numeric',
                        month: 'numeric',
                        day: 'numeric'
                      }"
                    />
                  </div>
                  <div class="w-25 pr-2">
                    <label for="start-hours">시간</label>
                    <b-form-select
                      id="start-hours"
                      v-model="form.start.hours"
                      :options="hoursOptions"
                    />
                  </div>
                  <div class="w-25 pr-2">
                    <label for="start-minutes">분</label>
                    <b-form-select
                      id="start-minutes"
                      v-model="form.start.minutes"
                      :options="minutesOptions"
                    />
                  </div>
                  <div class="w-25 pr-2">
                    <label for="start-seconds">초</label>
                    <b-form-select
                      id="start-seconds"
                      v-model="form.start.seconds"
                      :options="secondsOptions"
                    />
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <th>공지 종료일*</th>
              <td colspan="4">
                <div class="d-inline-flex justify-content-between w-70">
                  <div class="w-50 pr-2">
                    <label for="end-date">날짜*</label>
                    <b-form-datepicker
                      id="end-date"
                      v-model="form.end.date"
                      placeholder="종료일 선택"
                      class="mb-2"
                      hide-header
                      label-help=""
                      :date-format-options="{
                        year: 'numeric',
                        month: 'numeric',
                        day: 'numeric'
                      }"
                    />
                  </div>
                  <div class="w-25 pr-2">
                    <label for="end-hours">시간</label>
                    <b-form-select
                      id="end-hours"
                      v-model="form.end.hours"
                      :options="hoursOptions"
                    />
                  </div>
                  <div class="w-25 pr-2">
                    <label for="end-minutes">분</label>
                    <b-form-select
                      id="end-minutes"
                      v-model="form.end.minutes"
                      :options="minutesOptions"
                    />
                  </div>
                  <div class="w-25 pr-2">
                    <label for="end-seconds">초</label>
                    <b-form-select
                      id="end-seconds"
                      v-model="form.end.seconds"
                      :options="secondsOptions"
                    />
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <th>노출 순서</th>
              <td colspan="4">
                <div class="d-inline-flex align-items-center">
                  <b-form-input v-model="form.order" type="text" class="w-20" />
                  <span class="ml-2 fs-14 text-muted">
                    *노출 순서가 같을 시 나중에 게시되는 글이 낮은 숫자를 부여 받습니다.
                  </span>
                </div>
              </td>
            </tr>
            <tr>
              <th>노출 여부</th>
              <td colspan="4">
                <b-form-group>
                  <b-form-radio-group
                    v-model="form.displayYn"
                    :options="displayOptions"
                  />
                </b-form-group>
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
  name: 'ContentPieceAddPage',
  mixins: [timeOptions],
  data () {
    return {
      // 이미지 url
      imgFileUrls: [],
      // 공지사항 등록 폼
      form: {
        title: '', // 제목
        description: '', // 내용
        imgFiles: [], // 이미지
        start: { // 공지 시작일
          date: '',
          hours: '00',
          minutes: '00',
          seconds: '00'
        },
        end: { // 공지 종료일
          date: '',
          hours: '00',
          minutes: '00',
          seconds: '00'
        },
        order: '',
        displayYn: '노출'
      },
      hoursOptions: [],
      minutesOptions: [],
      secondsOptions: [],

      // 노출 여부 옵션
      displayOptions: [
        { text: '노출', value: '노출' },
        { text: '비노출', value: '비노출' }
      ]
    }
  },
  computed: {
    breadcrumb () {
      const arr = [
        { label: '홈', url: '/' },
        { label: '콘텐츠 관리', url: '#' },
        { label: '공지사항 등록', url: '/content/piece/noticeAdd' }
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
    /** 시간 설정 (0000-00-00 00:00:00) */
    setNoticeDate (type) {
      if (type === 'START') {
        const startDate = `${this.form.start.date} ${this.form.start.hours}:${this.form.start.minutes}:${this.form.start.seconds}`
        return startDate
      } else {
        const endDate = `${this.form.end.date} ${this.form.end.hours}:${this.form.end.minutes}:${this.form.end.seconds}`
        return endDate
      }
    },
    /** 이미지 삭제 */
    async addNotice () {
      const startDate = this.setNoticeDate('START')
      const endDate = this.setNoticeDate('END')
      try {
        const res = await this.$axios.post(`/api/cartoon/contents/regist/notice/${this.$route.query.id}`, {
          cartoon_main_id: this.$route.query.id,
          title: this.form.title,
          info: this.form.description,
          orders: this.form.order,
          is_show: this.form.displayYn,
          image_url: this.form.imgFiles.toString(),
          display_start_date: startDate,
          display_end_date: endDate
        })

        if (res.status === 200) {
          alert('공지사항 등록이 완료 되었습니다.')
          this.$router.push(`/content/piece/${this.$route.query.id}/edition/notice`)
        }
      } catch (e) {
        console.log(e)
      }
    },
    /** 이미지 삭제 */
    deleteImg (index) {
      this.form.imgFiles.splice(index, 1)
      this.imgFileUrls.splice(index, 1)
    },
    /** 이미지 업로드 */
    async uploadImg (e) {
      if (e.target.files.length > 3 || this.form.imgFiles.length > 2) {
        alert('이미지는 3개 까지 등록 가능합니다.')
        return
      }

      for (let i = 0; i < e.target.files.length; i++) {
        const file = e.target.files[i]

        const form = new FormData()
        form.append('file', file)

        this.imgFileUrls.push(URL.createObjectURL(file))

        const { status, data } = await this.$axios.post('/api/file/upload', form, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        if (status === 200) {
          this.form.imgFiles.push(data)
        }
      }
    }
  }
}
</script>

<style scoped lang="scss"></style>
