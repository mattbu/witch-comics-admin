<template>
  <b-container fluid class="page-min-height py-3">
    <UiPageTitle title="이벤트 수정" :breadcrumb="breadcrumb">
      <template #buttons>
        <b-button variant="outline-primary" to="/event/list">
          미리보기
        </b-button>
        <b-button variant="primary" @click="editEvent">
          수정
        </b-button>
      </template>
    </UiPageTitle>
    <hr>
    <b-row>
      <b-col>
        <b-button
          :variant="eventType === 'E' ? 'primary' : 'outline-primary'"
          @click="eventType = 'E'"
        >
          등록형
        </b-button>
        <b-button
          :variant="eventType === 'P' ? 'primary' : 'outline-primary'"
          @click="eventType = 'P'"
        >
          제작형
        </b-button>
      </b-col>
    </b-row>
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
              <th>이벤트 구분</th>
              <td colspan="3">
                <b-form-group v-slot="{ ariaDescribedby }">
                  <b-form-radio-group
                    v-model="form.type"
                    :options="typeOptions"
                    :aria-describedby="ariaDescribedby"
                  />
                </b-form-group>
              </td>
            </tr>
            <tr>
              <th>연령등급</th>
              <td colspan="3">
                <b-form-group v-slot="{ ariaDescribedby }">
                  <b-form-checkbox-group
                    v-model="form.rate"
                    :options="rateOptions"
                    :aria-describedby="ariaDescribedby"
                  />
                </b-form-group>
              </td>
            </tr>
            <tr>
              <th>이벤트 명*</th>
              <td colspan="3">
                <b-form-input v-model="form.title" type="text" class="w-40" />
              </td>
            </tr>
            <tr>
              <th>소제목*</th>
              <td colspan="3">
                <b-form-input
                  v-model="form.sub_title"
                  type="text"
                  class="w-40"
                />
              </td>
            </tr>
            <tr>
              <th>노출여부</th>
              <td colspan="3">
                <b-form-group v-slot="{ ariaDescribedby }">
                  <b-form-radio-group
                    v-model="form.is_show"
                    :options="isShowOptions"
                    :aria-describedby="ariaDescribedby"
                  />
                </b-form-group>
              </td>
            </tr>
            <tr>
              <th>시작일</th>
              <td colspan="3">
                <div class="d-inline-flex justify-content-between w-70">
                  <div class="w-50 pr-2">
                    <label for="service-start-date">날짜*</label>
                    <b-form-datepicker
                      id="service-start-date"
                      v-model="form.start_date"
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
                    <label for="service-start-hours">시간</label>
                    <b-form-select
                      id="service-start-hours"
                      v-model="form.startHours"
                      :options="hoursOptions"
                    />
                  </div>
                  <div class="w-25 pr-2">
                    <label for="service-start-minutes">분</label>
                    <b-form-select
                      id="service-start-minutes"
                      v-model="form.startMinutes"
                      :options="minutesOptions"
                    />
                  </div>
                  <div class="w-25 pr-2">
                    <label for="service-start-seconds">초</label>
                    <b-form-select
                      id="service-start-seconds"
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
                <div class="d-inline-flex justify-content-between w-70">
                  <div class="w-50 pr-2">
                    <label for="service-start-date">날짜*</label>
                    <b-form-datepicker
                      id="service-start-date"
                      v-model="form.end_date"
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
                    <label for="service-start-hours">시간</label>
                    <b-form-select
                      id="service-start-hours"
                      v-model="form.startHours"
                      :options="hoursOptions"
                    />
                  </div>
                  <div class="w-25 pr-2">
                    <label for="service-start-minutes">분</label>
                    <b-form-select
                      id="service-start-minutes"
                      v-model="form.startMinutes"
                      :options="minutesOptions"
                    />
                  </div>
                  <div class="w-25 pr-2">
                    <label for="service-start-seconds">초</label>
                    <b-form-select
                      id="service-start-seconds"
                      v-model="form.startSeconds"
                      :options="secondsOptions"
                    />
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <th>배너 업로드 (1개)*</th>
              <td colspan="3">
                <!-- <p class="mb-2">
                  이미지 추가 ({{
                    //banner_url
                    form.thumbnailImg.file ? '1' : '0'
                  }}/1개)
                </p> -->
                <div>
                  <!-- <input
                    id="thumbnail-image-input"
                    type="file"
                    class="d-none"
                  > -->
                  <label
                    for="thumbnail-image-input"
                    class="btn btn-outline-secondary mb-0 table-inner-btn"
                  >
                    파일 선택
                  </label>
                </div>
                <!-- <b-row v-if="form.thumbnailImg.file" class="mt-3">
                  <b-col cols="2">
                    <div class="thumbnail-wrapper">
                      <img
                        :src="form.thumbnailImg.src"
                        class="preview"
                        alt=""
                      >
                    </div>
                  </b-col>
                </b-row> -->
              </td>
            </tr>
            <!-- <tr>
              <th>게시글 내용</th>
              <td colspan="3">
                <div id="editor" />
                <TuiEditor
                  ref="text-editor"
                  :options="tuiEditorOptions"
                  :initial-value="form.description"
                  initial-edit-type="wysiwyg"
                />
              </td>
            </tr> -->
            <!-- <tr>
              <th>작품 검색</th>
              <td colspan="3">
                <div class="d-inline-flex justify-content-between">
                  <b-button
                    variant="outline-secondary"
                    class="table-inner-btn"
                    @click="openSearchModal('search-modal')"
                  >
                    찾기
                  </b-button>
                </div>
              </td>
            </tr> -->

            <tr>
              <th>배경 색상 설정</th>
              <td colspan="3">
                <b-form-group v-slot="{ ariaDescribedby }">
                  <div class="d-flex">
                    <b-form-radio
                      v-model="form.color"
                      :aria-describedby="ariaDescribedby"
                      name="piece"
                      value="미설정"
                      class="my-2"
                    >
                      미설정
                    </b-form-radio>
                    <b-form-radio
                      v-model="form.color"
                      :aria-describedby="ariaDescribedby"
                      value="설정"
                      class="ml-3 my-2"
                    >
                      설정
                    </b-form-radio>
                    <!-- <div class="d-flex align-items-center mt-2 w-20">
                      <b-form-input v-model="piece.color" type="color" />
                    </div> -->
                    <b-button
                      ref="search-piece-btn"
                      class="ml-2"
                      variant="primary"
                      :disabled="form.color === '미설정'"
                    >
                      컬러선택
                    </b-button>
                  </div>
                </b-form-group>
              </td>
            </tr>
            <tr>
              <th>댓글 기능</th>
              <td colspan="3">
                <b-form-group v-slot="{ ariaDescribedby }">
                  <b-form-radio-group
                    v-model="form.is_reply"
                    :options="replyOptions"
                    :aria-describedby="ariaDescribedby"
                  />
                </b-form-group>
              </td>
            </tr>
          </tbody>
        </table>
      </b-col>
    </b-row>

    <b-row class="pt-4" align-h="between">
      <b-col align-self="center">
        <h6>이벤트 내용 설정</h6>
      </b-col>
    </b-row>
    <hr class="my-2">

    <b-row class="mt-2">
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
              <th>이벤트 내용</th>
              <td colspan="3">
                <b-form-group v-slot="{ ariaDescribedby }">
                  <b-form-radio-group
                    v-model="form.content"
                    :options="contentOptions"
                    :aria-describedby="ariaDescribedby"
                  />
                </b-form-group>
              </td>
            </tr>
            <template v-if="form.contentOptions === 'P'">
              <tr>
                <th>타이틀</th>
                <td colspan="3">
                  <b-form-input v-model="form.title" type="text" class="w-40" />
                </td>
              </tr>
              <tr>
                <th>작품 등록</th>
                <td colspan="3">
                  <b-form-group v-slot="{ ariaDescribedby }">
                    <b-form-radio-group
                      v-model="form.content"
                      :options="pieceOptions"
                      :aria-describedby="ariaDescribedby"
                    />
                  </b-form-group>
                  <b-button>찾기</b-button>
                </td>
              </tr>
              <tr>
                <th>작품 목록</th>
                <td colspan="3" />
              </tr>
            </template>
            <template v-else-if="form.contentOptions === 'I'">
              <tr>
                <th>이미지</th>
                <td colspan="3">
                  test
                </td>
              </tr>
            </template>

            <!-- <tr>
              <th>게시글 내용</th>
              <td colspan="3">
                <div id="editor" />
                <TuiEditor
                  ref="text-editor"
                  :options="tuiEditorOptions"
                  :initial-value="form.description"
                  initial-edit-type="wysiwyg"
                />
              </td>
            </tr> -->
            <!-- <tr>
              <th>작품 검색</th>
              <td colspan="3">
                <div class="d-inline-flex justify-content-between">
                  <b-button
                    variant="outline-secondary"
                    class="table-inner-btn"
                    @click="openSearchModal('search-modal')"
                  >
                    찾기
                  </b-button>
                </div>
              </td>
            </tr> -->
          </tbody>
        </table>
      </b-col>
    </b-row>

    <!-- 이벤트 오픈 그래피 설정 -->
    <b-row class="pt-4" align-h="between">
      <b-col align-self="center">
        <h6>이벤트 오픈 그래피 설정</h6>
      </b-col>
    </b-row>
    <hr class="my-2">

    <b-row class="mt-2">
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
              <th>공유 이미지</th>
              <td colspan="3">
                <!-- <p class="mb-2">
                  이미지 추가 ({{
                    //banner_url
                    form.thumbnailImg.file ? '1' : '0'
                  }}/1개)
                </p> -->
                <div>
                  <!-- <input
                    id="thumbnail-image-input"
                    type="file"
                    class="d-none"
                  > -->
                  <label
                    for="thumbnail-image-input"
                    class="btn btn-outline-secondary mb-0 table-inner-btn"
                  >
                    파일 선택
                  </label>
                </div>
                <!-- <b-row v-if="form.thumbnailImg.file" class="mt-3">
                  <b-col cols="2">
                    <div class="thumbnail-wrapper">
                      <img
                        :src="form.thumbnailImg.src"
                        class="preview"
                        alt=""
                      >
                    </div>
                  </b-col>
                </b-row> -->
              </td>
            </tr>
            <tr>
              <th>공유내용</th>
              <td colspan="3">
                <b-textarea
                  placeholder="마녀코믹스 - 오직 마녀코믹스에서만 즐기는 순정만화 윙크와 프리미엄 웹툰! 가입만해도 매일 무료 호박 증정
"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import { timeOptions, editorStyles } from '@/plugins/mixins'

export default {
  name: 'EventListAddPage',
  mixins: [timeOptions, editorStyles],
  data () {
    return {
      moduleType: 1,
      eventType: 'E',
      isMounted: false,
      form: {
        eventType: null, // 이벤트 타입
        type: '', // 이벤트 구분
        rate: '', // 연령등급
        title: '', // 이벤트명
        sub_title: '', // 소제목
        is_show: '', // 노출여부
        start_date: '', // 시작일
        end_date: '', // 종료일
        banner_url: '', // 배너업로드
        is_reply: '', // 댓글 기능
        content: '', // 이벤트 내용
        color: '',
        og_img: '', // 공유 이미지
        og_content: '', // 공유 이미지 내용
        list: {
          type: '',
          title: '',
          cartoons: '',
          contents: ''
        },
        piece: [], // 작품 추가
        cartoon_main_id: [], // 추가된 작품 ID
        thumbnailImg: {
          file: '',
          src: ''
        },
        selectedViewerMode: 'I' // 이미지
      },
      tuiEditorOptions: {
        language: 'ko-KR',
        hideModeSwitch: true
      },
      typeOptions: [
        { text: '웹툰/만화', value: '웹툰/만화' },
        { text: '소설', value: '소설' },
        { text: '스페셜', value: '스페셜' }
      ],
      contentOptions: [
        { text: '이미지', value: 'I' },
        { text: '작품', value: 'P' }
      ],

      rateOptions: [
        { text: '전체이용가', value: '전체이용가' },
        { text: '성인', value: '성인' }
      ],
      isShowOptions: [
        { text: '노출', value: '노출' },
        { text: '비노출', value: '비노출' }
      ],
      replyOptions: [
        { text: '미설정', value: '미설정' },
        { text: '설정', value: '설정' }
      ],
      bgColorOptions: [
        { text: '미설정', value: '미설정' },
        { text: '설정', value: '설정' }
      ],
      eventOptions: [
        { text: '이미지', value: 'I' },
        { text: '작품', value: 'P' }
      ]
    }
  },
  async fetch () {
    await this.detailList()
  },
  computed: {
    breadcrumb () {
      const arr = [
        { label: '홈', url: '/' },
        { label: '이벤트', url: '/event/list' },
        { label: '이벤트 수정', url: this.$route.fullPath }
      ]
      return arr
    }
  },
  watch: {
    eventType (value) {
      console.log(value)
    }
  },
  created () {
    if (this.$route.query.type === 'regist') {
      this.moduleType = 1
    } else if (this.$route.query.type === 'make') {
      this.moduleType = 2
    } else {
      this.moduleType = 1
    }
  },
  mounted () {
    this.$nextTick(() => {
      if (process.title === 'browser' && this.$refs['text-editor']) {
        this.isMounted = true
        // this.defineEditorStyle(this.$refs['text-editor'].$el, this.isMounted)
      }
    })
  },
  methods: {
    // 수정
    async editEvent () {
      try {
        const res = await this.$axios.put(
          `/api/manager/event/update/${this.$route.params.id}`,
          this.form
        )
        if (res.status === 200) {
          alert('수정이 완료 되었습니다.')
          await this.$router.push('/event/list')
        }
      } catch (e) {
        console.log(e)
      }
    },

    // 상세
    async detailList () {
      try {
        const {
          status,
          data: { data }
        } = await this.$axios.get(`/api/manager/event/${this.$route.params.id}`)

        if (status === 200) {
          this.form = data
        }
      } catch (e) {
        console.log(e)
      }
    },
    selectPiece (data) {
      this.form.piece = data
      this.form.cartoon_main_id = data.map(el => el.id)
    },
    removePiece (id, idx) {
      this.form.piece = this.form.piece.filter(piece => piece.id !== id)
      this.form.cartoon_main_id = this.form.cartoon_main_id.filter(
        (piece, pIdx) => pIdx !== idx
      )
    },
    // 작품 검색 추가
    openModal (id) {
      this.$root.$emit('bv::show::modal', id)
    }
  }
}
</script>
