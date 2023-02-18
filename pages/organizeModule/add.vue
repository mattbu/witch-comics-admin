<template>
  <b-container fluid class="page-min-height pt-3 pb-5 mb-5">
    <UiPageTitle title="관리자 편성모듈 등록" :breadcrumb="breadcrumb">
      <template #buttons>
        <b-button variant="primary" @click="addModule">
          등록
        </b-button>
      </template>
    </UiPageTitle>
    <hr>
    <b-row align-h="between" class="my-2">
      <b-col align-self="center">
        <h6 class="font-weight-bold">
          관리자 편성모듈
        </h6>
      </b-col>
    </b-row>
    <b-row class="">
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
              <th>타이틀 입력</th>
              <td colspan="3">
                <b-form-input
                  v-model="form.title"
                  type="text"
                  class="w-40"
                  placeholder="타이틀을 입력해주세요."
                />
              </td>
            </tr>
            <tr>
              <th>노출 등급</th>
              <td colspan="3">
                <b-form-group>
                  <b-form-radio-group
                    v-model="form.show_rate"
                    :options="rateOptions"
                  />
                </b-form-group>
              </td>
            </tr>
            <tr>
              <th>작품 검색</th>
              <td colspan="3">
                <b-button
                  variant="outline-primary"
                  class="table-inner-btn"
                  @click="openModal('search-a-cartoon-modal')"
                >
                  추가
                </b-button>
              </td>
            </tr>
            <tr>
              <th>작품 목록</th>
              <td colspan="3">
                <b-form-group>
                  <b-form-radio-group
                    v-model="form.is_random"
                    :options="[
                      { text: '랜덤 노출', value: 'y' },
                      { text: '지정 노출', value: 'n' }
                    ]"
                  />
                </b-form-group>
                <template
                  v-if="selectedPieces.length > 0"
                >
                  <vue-draggable
                    :list="selectedPieces"
                    :options="{disabled : form.is_random === 'y'}"
                    ghost-class="ghost"
                    class="row"
                  >
                    <b-col
                      v-for="(piece, idx) in selectedPieces"
                      :key="`piece-${idx}`"
                      cols="2"
                      class="mt-3"
                    >
                      <div class="add-thumbnail-wrapper">
                        <img
                          :src="piece.image"
                          class="preview cursor-pointer"
                          alt="acartoon image"
                        >
                        <b-button
                          variant="transparent"
                          class="p-0 ml-3 d-flex img-delete-btn"
                          @click="removeListImg(idx)"
                        >
                          <b-icon
                            variant="dark"
                            icon="x"
                            font-scale="1.2"
                          />
                        </b-button>
                      </div>
                      <p class="text-center">
                        ({{ piece.id }})
                      </p>
                      <p class="text-center">
                        {{ piece.title }}
                      </p>
                    </b-col>
                  </vue-draggable>
                </template>
              </td>
            </tr>
            <tr>
              <th>노출 여부*</th>
              <td colspan="3">
                <b-form-group>
                  <b-form-radio-group
                    v-model="form.is_show"
                    :options="[
                      { text: '노출', value: 'y' },
                      { text: '미노출', value: 'n' }
                    ]"
                  />
                </b-form-group>
              </td>
            </tr>
            <tr>
              <th>시작일</th>
              <td colspan="3">
                <div class="d-inline-flex justify-content-between w-70">
                  <div class="w-50 pr-2">
                    <label
                      for="reservation-start-date"
                      class="fs-14 mb-1"
                    >날짜*</label>
                    <b-form-datepicker
                      id="reservation-start-date"
                      v-model="start.dt"
                      placeholder="날짜 선택"
                      label-help=""
                      hide-header
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
                      for="reservation-start-hours"
                      class="fs-14 mb-1"
                    >시간</label>
                    <b-form-select
                      id="reservation-start-hours"
                      v-model="start.hrs"
                      :options="hoursOptions"
                    />
                  </div>
                  <div class="w-25 pr-2">
                    <label
                      for="reservation-start-minutes"
                      class="fs-14 mb-1"
                    >분</label>
                    <b-form-select
                      id="reservation-start-minutes"
                      v-model="start.min"
                      :options="minutesOptions"
                    />
                  </div>
                  <div class="w-25 pr-2">
                    <label
                      for="reservation-start-seconds"
                      class="fs-14 mb-1"
                    >초</label>
                    <b-form-select
                      id="reservation-start-seconds"
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
                  <div class="w-50 pr-2">
                    <label
                      for="reservation-end-date"
                      class="fs-14 mb-1"
                    >날짜*</label>
                    <b-form-datepicker
                      id="reservation-end-date"
                      v-model="end.dt"
                      label-help=""
                      hide-header
                      placeholder="날짜 선택"
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
                      for="reservation-end-hours"
                      class="fs-14 mb-1"
                    >시간</label>
                    <b-form-select
                      id="reservation-end-hours"
                      v-model="end.hrs"
                      :options="hoursOptions"
                    />
                  </div>
                  <div class="w-25 pr-2">
                    <label
                      for="reservation-end-minutes"
                      class="fs-14 mb-1"
                    >분</label>
                    <b-form-select
                      id="reservation-end-minutes"
                      v-model="end.min"
                      :options="minutesOptions"
                    />
                  </div>
                  <div class="w-25 pr-2">
                    <label
                      for="reservation-end-seconds"
                      class="fs-14 mb-1"
                    >초</label>
                    <b-form-select
                      id="reservation-end-seconds"
                      v-model="end.sec"
                      :options="secondsOptions"
                    />
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <th>더보기 링크*</th>
              <td colspan="3">
                <div class="d-flex">
                  <b-form-group>
                    <b-form-radio-group
                      v-model="form.is_button"
                      :options="[
                        { text: '미설정', value: 'n' },
                        { text: '설정', value: 'y' }
                      ]"
                      class="mt-2"
                    />
                  </b-form-group>
                  <b-form-input
                    v-model="form.button_url"
                    placeholder="URL를 입력해주세요."
                    class="w-30"
                    :disabled="form.is_button === 'n'"
                  />
                </div>
              </td>
            </tr>
            <tr v-if="form.is_button === 'n'">
              <th>이미지 등록 (모바일)</th>
              <td>
                <p class="mb-2">
                  이미지 추가 ({{ form.mobile_image ? '1' : '0' }}/1개)
                </p>
                <div>
                  <input
                    id="thumbnail-image-input"
                    type="file"
                    class="d-none"
                    @change="uploadImg($event, 'mobile_image')"
                  >
                  <label
                    for="thumbnail-image-input"
                    class="btn btn-outline-secondary mb-0 table-inner-btn"
                  >
                    파일 선택
                  </label>
                </div>
                <b-row v-if="form.mobile_image" class="mt-3">
                  <b-col cols="6">
                    <div class="add-thumbnail-wrapper">
                      <img
                        :src="form.mobile_image"
                        class="preview"
                        alt="mobile_image"
                      >
                      <b-button
                        variant="transparent"
                        class="p-0 ml-3 d-flex img-delete-btn"
                        @click="form.mobile_image = ''"
                      >
                        <b-icon
                          variant="dark"
                          icon="x"
                          font-scale="1.2"
                        />
                      </b-button>
                    </div>
                  </b-col>
                </b-row>
              </td>
              <th>이미지 등록 (PC)</th>
              <td>
                <p class="mb-2">
                  이미지 추가 ({{ form.pc_image ? '1' : '0' }}/1개)
                </p>
                <div>
                  <input
                    id="thumbnail-image-input2"
                    type="file"
                    class="d-none"
                    @change="uploadImg($event, 'pc_image')"
                  >
                  <label
                    for="thumbnail-image-input2"
                    class="btn btn-outline-secondary mb-0 table-inner-btn"
                  >
                    파일 선택
                  </label>
                </div>
                <b-row v-if="form.pc_image" class="mt-3">
                  <b-col cols="6">
                    <div class="add-thumbnail-wrapper">
                      <img
                        :src="form.pc_image"
                        class="preview"
                        alt="pc_image"
                      >
                      <b-button
                        variant="transparent"
                        class="p-0 ml-3 d-flex img-delete-btn"
                        @click="form.pc_image = ''"
                      >
                        <b-icon
                          variant="dark"
                          icon="x"
                          font-scale="1.2"
                        />
                      </b-button>
                    </div>
                  </b-col>
                </b-row>
              </td>
            </tr>
          </tbody>
        </table>
      </b-col>
    </b-row>

    <!-- 작품 검색(search-piece-modal) -->
    <SearchACartoonModal
      :menu-code="form.menucode"
      @on-save="selectPiece"
    />
  </b-container>
</template>

<script>
import { timeOptions } from '@/plugins/mixins'

export default {
  name: 'AdminModuleAddPage',
  mixins: [timeOptions],
  data () {
    return {
      form: {
        mainInfo: [],
        menucode: '',
        title: '',
        type: 'A',
        show_rate: 'G',
        is_show: 'y',
        is_button: 'n',
        button_url: '',
        comment: '',
        is_random: 'y',
        pc_image: '',
        mobile_image: '',
        start_date: '',
        end_date: ''
      },
      start: { dt: '', hrs: '00', min: '00', sec: '00' },
      end: { dt: '', hrs: '00', min: '00', sec: '00' },
      rateOptions: [
        { text: '전체', value: 'G' },
        { text: '일반', value: 'N' },
        { text: '성인', value: 'A' }
      ],
      hoursOptions: [],
      minutesOptions: [],
      secondsOptions: [],
      selectedPieces: []
    }
  },
  computed: {
    breadcrumb () {
      const arr = [
        { label: '홈', url: '/' },
        { label: '편성모듈', url: '#' },
        { label: '관리자 편성모듈 등록', url: this.$route.fullPath }
      ]
      return arr
    }
  },
  watch: {
    'form.show_rate': {
      immediate: true,
      handler (val) {
        // 1: 웹툰, 2: 소설, 3: 성인웹툰, 4: 성인소설
        if (this.$route.query.type === 'webtoon' && (val === 'N' || val === 'G')) {
          this.form.menucode = '1'
        } else if (this.$route.query.type === 'webtoon' && val === 'A') {
          this.form.menucode = '3'
        } else if (this.$route.query.type === 'novel' && (val === 'N' || val === 'G')) {
          this.form.menucode = '2'
        } else if (this.$route.query.type === 'novel' && val === 'A') {
          this.form.menucode = '4'
        }
      }
    }
  },
  created () {
    this.hoursOptions = this.getHours()
    this.minutesOptions = this.getMinutes()
    this.secondsOptions = this.getSeconds()
  },
  mounted () {},
  methods: {
    setForm () {
      this.form.mainInfo = this.selectedPieces.map(item => ({ mainId: item.id }))

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
    async addModule () {
      this.setForm()

      try {
        const { status } = await this.$axios.post('/api/manager/schedule/regist/admin', this.form)
        if (status === 200) {
          alert('등록이 완료 되었습니다.')

          if (this.$route.query.type === 'webtoon' && (this.form.show_rate === 'N' || this.form.show_rate === 'G')) {
            await this.$router.push('/organizeModule/webComic?type=all')
          } else if (this.$route.query.type === 'webtoon' && this.form.show_rate === 'A') {
            await this.$router.push('/organizeModule/webComic?type=adult')
          } else if (this.$route.query.type === 'novel' && (this.form.show_rate === 'N' || this.form.show_rate === 'G')) {
            await this.$router.push('/organizeModule/novelHome?type=all')
          } else if (this.$route.query.type === 'novel' && this.form.show_rate === 'A') {
            await this.$router.push('/organizeModule/novelHome?type=adult')
          }
        }
      } catch (err) {
        alert('등록되지 않았습니다. 다시 시도해보십시오.')
      }
    },
    async selectPiece (e) {
      try {
        const { data: { data } } = await this.$axios.get('/api/manager/schedule/preview/acartoon', {
          params: {
            ids: e
          }
        })
        this.selectedPieces = data
      } catch (e) {
        console.log(e)
      }
    },
    removeListImg (index) {
      if (this.selectedPieces.length > 0) {
        this.selectedPieces.splice(index, 1)
      }
    },
    openModal (id) {
      this.$root.$emit('bv::show::modal', id)
    },
    async uploadImg (e, type) {
      const form = new FormData()

      if (e.target.files.length > 0) {
        form.append('file', e.target.files[0])
        // 파일 태우기
        const {
          status,
          data
        } = await this.$axios.post('/api/file/upload', form, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }
        )
        if (status === 200) {
          if (type === 'mobile_image') {
            this.form.mobile_image = data
          } else {
            this.form.pc_image = data
          }
        }
      }
    }
  }
}
</script>
