<template>
  <b-container fluid class="page-min-height py-3">
    <UiPageTitle title="동영상 등록" :breadcrumb="breadcrumb">
      <template #buttons>
        <b-button variant="primary" @click="addVideo">
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
            <!-- 정보 -->
            <tr>
              <th>제목*</th>
              <td colspan="3">
                <b-form-textarea
                  id="textarea"
                  v-model="form.title"
                  rows="2"
                  max-rows="2"
                  placeholder="최대 2줄까지 작성이 가능합니다."
                  class="w-50"
                />
              </td>
            </tr>
            <tr>
              <th>소제목</th>
              <td colspan="3">
                <b-form-input v-model="form.sub_title" class="w-50" />
              </td>
            </tr>
            <tr>
              <th>노출여부*</th>
              <td colspan="3">
                <b-form-radio-group
                  v-model="form.is_show"
                  :options="showOptions"
                />
              </td>
            </tr>
            <tr>
              <th>시작일</th>
              <td colspan="3">
                <div class="d-inline-flex justify-content-between w-50">
                  <div class="w-50 pr-2">
                    <label for="start-date" class="fs-14 mb-1">날짜*</label>
                    <b-form-datepicker
                      id="start-date"
                      v-model="start.dt"
                      label-help=""
                      hide-header
                      placeholder="시작일 선택"
                      :date-format-options="{
                        year: 'numeric',
                        month: 'numeric',
                        day: 'numeric'
                      }"
                    />
                  </div>
                  <div class="w-25 pr-2">
                    <label for="start-hours" class="fs-14 mb-1">시간</label>
                    <b-form-select
                      id="start-hours"
                      v-model="start.hrs"
                      :options="hoursOptions"
                    />
                  </div>
                  <div class="w-25 pr-2">
                    <label for="start-minutes" class="fs-14 mb-1">분</label>
                    <b-form-select
                      id="start-minutes"
                      v-model="start.min"
                      :options="minutesOptions"
                    />
                  </div>
                  <div class="w-25">
                    <label for="start-seconds" class="fs-14 mb-1">초</label>
                    <b-form-select
                      id="start-seconds"
                      v-model="start.sec"
                      :options="secondsOptions"
                    />
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <th>종료일</th>
              <td colspan="3">
                <div class="d-inline-flex justify-content-between w-70">
                  <div class="w-10 align-self-center mr-2">
                    <b-form-checkbox v-model="setEnd" class="fs-14">
                      설정
                    </b-form-checkbox>
                  </div>
                  <div class="w-30 pr-2">
                    <label for="service-end-date" class="fs-14 mb-1">날짜*</label>
                    <b-form-datepicker
                      id="service-end-date"
                      v-model="end.dt"
                      placeholder="종료일 선택"
                      label-help=""
                      hide-header
                      :date-format-options="{
                        year: 'numeric',
                        month: 'numeric',
                        day: 'numeric'
                      }"
                      :disabled="!setEnd"
                    />
                  </div>
                  <div class="w-25 pr-2">
                    <label for="service-end-hours" class="fs-14 mb-1">시간</label>
                    <b-form-select
                      id="service-end-hours"
                      v-model="end.hrs"
                      :options="hoursOptions"
                      :disabled="!setEnd"
                    />
                  </div>
                  <div class="w-25 pr-2">
                    <label for="service-end-minutes" class="fs-14 mb-1">분</label>
                    <b-form-select
                      id="service-end-minutes"
                      v-model="end.min"
                      :options="minutesOptions"
                      :disabled="!setEnd"
                    />
                  </div>
                  <div class="w-25 pr-2">
                    <label for="service-end-seconds" class="fs-14 mb-1">초</label>
                    <b-form-select
                      id="service-end-seconds"
                      v-model="end.sec"
                      :options="secondsOptions"
                      :disabled="!setEnd"
                    />
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <th>버튼 타이틀*</th>
              <td colspan="3">
                <b-form-input v-model="form.button_title" class="w-50" />
              </td>
            </tr>
            <tr>
              <th>버튼 URL</th>
              <td colspan="3">
                <div class="d-inline-flex">
                  <b-form-radio
                    v-model="form.button_type"
                    name="piece"
                    value="L"
                    class="align-self-center"
                  >
                    외부링크
                  </b-form-radio>
                  <b-form-radio
                    v-model="form.button_type"
                    value="C"
                    class="ml-3"
                  >
                    작품
                  </b-form-radio>
                </div>
                <div class="mt-2">
                  <template v-if="form.button_type === 'L'">
                    <b-form-input
                      v-model="form.button_sub"
                      class="w-50"
                      placeholder="URL 주소를 입력해주세요."
                    />
                  </template>
                  <div v-else>
                    <b-button
                      variant="outline-secondary"
                      class="table-inner-btn"
                      @click="openModal('search-single-piece-modal')"
                    >
                      추가
                    </b-button>

                    <template v-if="form.button_sub">
                      <div class="mt-2">
                        <b-badge pill class="b-form-tag d-inline-flex">
                          <span class="align-self-center">{{ currentPieceName }}</span>
                          <b-button
                            variant="transparent"
                            class="p-0 align-self-center"
                            @click="removePiece"
                          >
                            <b-icon
                              variant="white"
                              icon="x"
                              font-scale="1.2"
                              class="ml-1"
                            />
                          </b-button>
                        </b-badge>
                      </div>
                    </template>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <th>동영상 등록*</th>
              <td colspan="3">
                <div>
                  <input
                    id="video-input"
                    accept="video/mp4,video/x-m4v,video/*"
                    type="file"
                    class="d-none"
                    @change="uploadVideo"
                  >
                  <label
                    for="video-input"
                    class="btn btn-outline-secondary mb-0 table-inner-btn"
                  >
                    파일 선택
                  </label>
                </div>
                <video v-if="form.url" controls width="250" :src="form.url" class="mt-2" />
              </td>
            </tr>
          </tbody>
        </table>
      </b-col>
    </b-row>

    <!-- 작품 검색(search-piece-modal) -->
    <SearchSinglePieceModal @select-work="selectPiece" />
  </b-container>
</template>
<script>
import { timeOptions } from '@/plugins/mixins'

export default {
  name: 'VideoAddPage',
  mixins: [timeOptions],
  data () {
    return {
      form: {
        title: '', // 제목
        sub_title: '', // 소제목
        is_show: '노출', // 노출여부
        button_title: '', // 버튼 타이틀
        button_type: 'L',
        button_sub: '',
        url: '',
        start_date: '', // 시작일
        end_date: '' // 종료일
      },
      start: { dt: '', hrs: '00', min: '00', sec: '00' },
      end: { dt: '', hrs: '00', min: '00', sec: '00' },
      setEnd: false,
      showOptions: [
        { text: '노출', value: '노출' },
        { text: '미노출', value: '미노출' }
      ],
      currentPieceName: '',
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
        { label: '동영상 등록', url: this.$route.path }
      ]
      return arr
    }
  },
  watch: {
    setEnd (val) {
      if (!val) {
        this.end.dt = ''
        this.end.hrs = '00'
        this.end.min = '00'
        this.end.sec = '00'
      }
    }
  },
  created () {},
  mounted () {
    this.hoursOptions = this.getHours()
    this.minutesOptions = this.getMinutes()
    this.secondsOptions = this.getSeconds()
  },
  methods: {
    checkValidation () {
      if (!this.form.title) {
        alert('제목을 입력해 주세요.')
        return false
      } else if (!this.form.button_title) {
        alert('버튼 타이틀을 입력해 주세요.')
        return false
      } else if (!this.form.url) {
        alert('동영상을 등록해 주세요.')
        return false
      } return true
    },
    setForm () {
      if (this.form.button_sub) {
        this.form.button_sub = this.form.button_sub.toString()
      }

      if (this.start.dt) {
        this.form.start_date = `${this.start.dt} ${this.start.hrs}:${this.start.min}:${this.start.sec}`
      } else {
        this.form.start_date = ''
      }

      if (this.end.dt) {
        this.form.end_date = `${this.end.dt} ${this.end.hrs}:${this.end.min}:${this.end.sec}`
      } else {
        this.form.end_date = ''
      }
    },
    async uploadVideo (e) {
      const form = new FormData()

      if (e.target.files.length > 0) {
        form.append('file', e.target.files[0])
        // 파일 태우기
        const {
          status,
          data
        } = await this.$axios.post(
          '/api/file/upload',
          form,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
        )
        if (status === 200) {
          this.form.url = data
        }
      }
    },
    // 등록
    async addVideo () {
      if (this.checkValidation()) {
        await this.setForm()

        try {
          const { status } = await this.$axios.post('/api/cartoon/manager/movie', this.form)

          if (status === 200) {
            alert('동영상 등록이 완료 되었습니다.')
            await this.$router.push('/content/video')
          }
        } catch (e) {
          console.log(e)
        }
      }
    },
    removePiece () {
      this.form.button_sub = ''
      this.currentPieceName = ''
    },
    selectPiece (data) {
      this.form.button_sub = data.id
      this.currentPieceName = data.name
    },
    openModal (id) {
      this.$root.$emit('bv::show::modal', id)
    }
  }
}
</script>
