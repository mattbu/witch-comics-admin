<template>
  <b-container fluid class="page-min-height py-3">
    <UiPageTitle title="웹툰/만화 배너 등록" :breadcrumb="breadcrumb">
      <template #buttons>
        <b-button variant="primary" to="/popupBanner/join/add">
          등록
        </b-button>
      </template>
    </UiPageTitle>
    <hr>
    <b-tabs pills>
      <b-tab title="등록형" active>
        <b-card-text>
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
                    <th>제목</th>
                    <td colspan="3">
                      <b-form-input
                        v-model="form.eventName"
                        type="text"
                        class="w-40"
                      />
                    </td>
                  </tr>
                  <tr>
                    <th>부제목</th>
                    <td colspan="3">
                      <b-form-input
                        v-model="form.eventName"
                        type="text"
                        class="w-40"
                      />
                    </td>
                  </tr>
                  <tr>
                    <th>저작권 문구</th>
                    <td colspan="3">
                      <b-form-input
                        v-model="form.subtitle"
                        type="text"
                        class="w-40"
                      />
                    </td>
                  </tr>
                  <tr>
                    <th>택설정1</th>
                    <td colspan="3">
                      <b-form-group v-slot="{ ariaDescribedby }">
                        <b-form-radio-group
                          v-model="form.eventType"
                          :options="typeOptions"
                          :aria-describedby="ariaDescribedby"
                        />
                      </b-form-group>
                    </td>
                  </tr>
                  <tr>
                    <th>택설정2</th>
                    <td colspan="3">
                      <b-form-group v-slot="{ ariaDescribedby }">
                        <b-form-radio-group
                          v-model="form.eventType"
                          :options="typeOptions"
                          :aria-describedby="ariaDescribedby"
                        />
                      </b-form-group>
                    </td>
                  </tr>
                  <tr>
                    <th>택설정3</th>
                    <td colspan="3">
                      <b-form-group v-slot="{ ariaDescribedby }">
                        <b-form-radio-group
                          v-model="form.eventType"
                          :options="typeOptions"
                          :aria-describedby="ariaDescribedby"
                        />
                      </b-form-group>
                    </td>
                  </tr>
                  <tr>
                    <th>택설정4</th>
                    <td colspan="3">
                      <b-form-group v-slot="{ ariaDescribedby }">
                        <b-form-radio-group
                          v-model="form.eventType"
                          :options="typeOptions"
                          :aria-describedby="ariaDescribedby"
                        />
                      </b-form-group>
                    </td>
                  </tr>

                  <tr>
                    <th>이벤트 대기</th>
                    <td colspan="3">
                      <div class="d-inline-flex">
                        <b-form-checkbox
                          v-model="form.checkWait"
                          class="align-self-center"
                        >
                          대기
                        </b-form-checkbox>
                        <span class="ml-5 text-muted fs-14 align-self-center">* 이벤트 대기를 체크하면 설정된 이벤트 기간에도
                          이벤트가 대기 상태로 변경됩니다.</span>
                      </div>
                    </td>
                  </tr>

                  <tr>
                    <th>사용 기간</th>
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
                    <th>썸네일 업로드 (1개)*</th>
                    <td colspan="3">
                      <p class="mb-2">
                        이미지 추가 ({{
                          form.thumbnailImg.file ? '1' : '0'
                        }}/1개)
                      </p>
                      <div>
                        <input
                          id="thumbnail-image-input"
                          type="file"
                          class="d-none"
                          @change="uploadThumbnailImg"
                        >
                        <label
                          for="thumbnail-image-input"
                          class="btn btn-outline-secondary mb-0 table-inner-btn"
                        >
                          파일 선택
                        </label>
                      </div>
                      <b-row v-if="form.thumbnailImg.file" class="mt-3">
                        <b-col cols="2">
                          <div class="thumbnail-wrapper">
                            <img
                              :src="form.thumbnailImg.src"
                              class="preview"
                              alt=""
                            >
                          </div>
                        </b-col>
                      </b-row>
                    </td>
                  </tr>

                  <tr>
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
                  </tr>

                  <tr>
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
                  </tr>

                  <tr>
                    <th>작품 목록 표출</th>
                    <td colspan="3">
                      <b-form-checkbox v-model="form.display">
                        표시
                      </b-form-checkbox>
                    </td>
                  </tr>

                  <tr>
                    <th>작품 목록</th>
                    <td colspan="3">
                      -
                    </td>
                  </tr>
                </tbody>
              </table>
            </b-col>
          </b-row>
        </b-card-text>
      </b-tab>
      <b-tab title="제작형">
        <b-card-text>
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
                    <th>이벤트명</th>
                    <td colspan="3">
                      <b-form-input
                        v-model="form.eventName"
                        type="text"
                        class="w-40"
                      />
                    </td>
                  </tr>

                  <tr>
                    <th>소제목</th>
                    <td colspan="3">
                      <b-form-input
                        v-model="form.subtitle"
                        type="text"
                        class="w-40"
                      />
                    </td>
                  </tr>

                  <tr>
                    <th>이벤트 종류</th>
                    <td colspan="3">
                      <b-form-group v-slot="{ ariaDescribedby }">
                        <b-form-radio-group
                          v-model="form.eventType"
                          :options="typeOptions"
                          :aria-describedby="ariaDescribedby"
                        />
                      </b-form-group>
                    </td>
                  </tr>

                  <tr>
                    <th>이벤트 대기</th>
                    <td colspan="3">
                      <div class="d-inline-flex">
                        <b-form-checkbox
                          v-model="form.checkWait"
                          class="align-self-center"
                        >
                          대기
                        </b-form-checkbox>
                        <span class="ml-5 text-muted fs-14 align-self-center">* 이벤트 대기를 체크하면 설정된 이벤트 기간에도
                          이벤트가 대기 상태로 변경됩니다.</span>
                      </div>
                    </td>
                  </tr>

                  <tr>
                    <th>사용 기간</th>
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
                    <th>썸네일 업로드 (1개)*</th>
                    <td colspan="3">
                      <p class="mb-2">
                        이미지 추가 ({{
                          form.thumbnailImg.file ? '1' : '0'
                        }}/1개)
                      </p>
                      <div>
                        <input
                          id="thumbnail-image-input"
                          type="file"
                          class="d-none"
                          @change="uploadThumbnailImg"
                        >
                        <label
                          for="thumbnail-image-input"
                          class="btn btn-outline-secondary mb-0 table-inner-btn"
                        >
                          파일 선택
                        </label>
                      </div>
                      <b-row v-if="form.thumbnailImg.file" class="mt-3">
                        <b-col cols="2">
                          <div class="thumbnail-wrapper">
                            <img
                              :src="form.thumbnailImg.src"
                              class="preview"
                              alt=""
                            >
                          </div>
                        </b-col>
                      </b-row>
                    </td>
                  </tr>

                  <tr>
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
                  </tr>

                  <tr>
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
                  </tr>

                  <tr>
                    <th>작품 목록 표출</th>
                    <td colspan="3">
                      <b-form-checkbox v-model="form.display">
                        표시
                      </b-form-checkbox>
                    </td>
                  </tr>

                  <tr>
                    <th>작품 목록</th>
                    <td colspan="3">
                      -
                    </td>
                  </tr>
                </tbody>
              </table>
            </b-col>
          </b-row>
        </b-card-text>
      </b-tab>
    </b-tabs>
    <UiCenterModal
      modal-id="search-modal"
      modal-title="관련 작품 찾기"
      ok-title="선택"
      cancel-title="취소"
    >
      <template #contents>
        <b-container fluid class="px-0">
          <b-row class="mt-3">
            <b-col>
              <b-form inline class="justify-content-center" @submit.prevent>
                <b-form-input placeholder="" />
                <b-button variant="outline-secondary ml-2">
                  검색
                </b-button>
              </b-form>
              <table class="table border mt-3">
                <tr class="cursor-pointer">
                  <td>123</td>
                  <td>123</td>
                  <td>123</td>
                </tr>
                <tr class="cursor-pointer">
                  <td>123</td>
                  <td>123</td>
                  <td>123</td>
                </tr>
                <tr class="cursor-pointer">
                  <td>123</td>
                  <td>123</td>
                  <td>123</td>
                </tr>
              </table>
            </b-col>
          </b-row>
        </b-container>
      </template>
    </UiCenterModal>
  </b-container>
</template>

<script>
import { timeOptions, editorStyles } from '@/plugins/mixins'

export default {
  name: 'EventListAddPage',
  mixins: [timeOptions, editorStyles],
  data () {
    return {
      isMounted: false,
      form: {
        eventName: '',
        subtitle: '',
        eventType: null,
        checkWait: false,
        startDate: '',
        endDate: '',
        thumbnailImg: {
          file: null,
          src: ''
        },
        description: '',
        display: false
      },
      tuiEditorOptions: {
        language: 'ko-KR',
        hideModeSwitch: true
      },
      typeOptions: [
        { text: '무료화', value: 1 },
        { text: '할인', value: 2 },
        { text: '이따무', value: 3 },
        { text: '리워드', value: 4 }
      ]
    }
  },
  computed: {
    breadcrumb () {
      const arr = [
        { label: '홈', url: '/' },
        { label: '팝업/배너 관리', url: '#' },
        { label: '웹툰/만화 배너 등록', url: this.$route.fullPath }
      ]
      return arr
    }
  },
  watch: {},
  created () {},
  mounted () {
    this.$nextTick(() => {
      if (process.title === 'browser' && this.$refs['text-editor']) {
        this.isMounted = true
        // this.defineEditorStyle(this.$refs['text-editor'].$el, this.isMounted)
      }
    })
  },
  methods: {
    // 등록
    async addComics () {
      try {
        const { status } = await this.$axios.post('', {
          title: this.form.type,
          miniTitle: this.form.miniTitle,
          tab1: this.form.tab1,
          tab2: this.form.tab2,
          tab3: this.form.tab3,
          tab4: this.form.tab4,
          endAt: this.form.endAt,
          image: this.form.image,
          bgColor: this.form.bgColor,
          reply: this.form.reply
        })
        if (status === 200) {
          alert('웹툰/만화 배너 등록이 완료 되었습니다.')
          this.$router.push('popupBanner/webComicsBanner')
        }
      } catch (err) {
        alert('등록되지 않았습니다. 다시 시도해보십시오.')
      }
    },
    openSearchModal (id) {
      this.$root.$emit('bv::show::modal', id)
    },
    uploadThumbnailImg (e) {
      this.form.thumbnailImg.file = e.target.files[0]

      this.form.thumbnailImg.src = URL.createObjectURL(e.target.files[0])
      console.log(this.form.thumbnailImg, '업로드')
    }
  }
}
</script>
