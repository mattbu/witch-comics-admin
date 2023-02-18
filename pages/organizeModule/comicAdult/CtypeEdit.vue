<template>
  <b-container fluid class="page-min-height py-3">
    <UiPageTitle title="C형 편성모듈 수정" :breadcrumb="breadcrumb">
      <template #buttons>
        <b-button variant="primary" @click="addAtype">
          수정
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
              <th>작품 검색</th>
              <td colspan="3">
                <b-button
                  ref="search-piece-btn"
                  variant="outline-secondary"
                  @click="openModal('search-piece-modal')"
                >
                  추가
                </b-button>
                <template v-if="form.piece.length > 0">
                  <div class="mt-2">
                    <b-badge
                      v-for="(piece, pieceIdx) in form.piece"
                      :key="`piece-${pieceIdx}`"
                      pill
                      class="b-form-tag d-inline-flex"
                    >
                      <span class="align-self-center">{{ piece.name }}</span>
                      <b-button
                        variant="transparent"
                        class="p-0 align-self-center"
                        @click="removePiece(piece.id, pieceIdx)"
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
              </td>
            </tr>
            <tr>
              <th>이미지 수정</th>
              <td colspan="3">
                <p class="mb-2">
                  이미지 추가 ({{ form.popUpImgFile ? '1' : '0' }}/1개)
                </p>
                <div>
                  <input
                    id="thumbnail-image-input"
                    type="file"
                    class="d-none"
                    @change="uploadPopUpImg"
                  >
                  <label
                    for="thumbnail-image-input"
                    class="btn btn-outline-secondary mb-0 table-inner-btn"
                  >
                    파일 선택
                  </label>
                </div>
              </td>
            </tr>
            <tr>
              <th>게시글*</th>
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
              <th>URL 입력</th>
              <td colspan="3">
                <b-form-input />
              </td>
            </tr>
            <tr>
              <th>시작일</th>
              <td colspan="3">
                <div class="d-inline-flex justify-content-between w-70">
                  <div class="w-50 pr-2">
                    <label for="start-date">날짜*</label>
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
                  <div class="w-25 pr-2">
                    <label for="start-hours">시간</label>
                    <b-form-select
                      id="start-hours"
                      v-model="form.startHours"
                      :options="hoursOptions"
                    />
                  </div>
                  <div class="w-25 pr-2">
                    <label for="start-minutes">분</label>
                    <b-form-select
                      id="start-minutes"
                      v-model="form.startMinutes"
                      :options="minutesOptions"
                    />
                  </div>
                  <div class="w-25">
                    <label for="start-seconds">초</label>
                    <b-form-select
                      id="start-seconds"
                      v-model="form.startSeconds"
                      :options="secondsOptions"
                    />
                  </div>
                </div>
              </td>
            </tr>
            <!--  -->
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
            <tr>
              <th>노출여부*</th>
              <td colspan="3">
                <div class="d-flex">
                  <b-form-group v-slot="{ ariaDescribedby }">
                    <b-form-radio-group
                      v-model="form.isShow"
                      :options="isShowOptions"
                      :aria-describedby="ariaDescribedby"
                    />
                  </b-form-group>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </b-col>
    </b-row>

    <!-- 작품 검색 -->
    <UiCenterModal
      modal-id="add-piece-modal"
      modal-title="작품 검색"
      ok-title="등록"
      cancel-title="취소"
    >
      <template #contents>
        <b-container fluid class="px-0">
          <b-row class="px-3">
            <b-col lg="12" class="my-1">
              <b-form-group
                label="작가명"
                label-cols-sm="2"
                label-align-sm="left"
                label-size="sm"
                label-class="align-self-center"
                class="mb-0"
              >
                <b-form-input v-model="form.name" class="w-60" />
              </b-form-group>
            </b-col>

            <b-col lg="12" class="my-1">
              <b-form-group
                v-slot="{ ariaDescribedby }"
                label="작가 종류"
                label-cols-sm="2"
                label-align-sm="left"
                label-size="sm"
                label-class="align-self-center"
                class="mb-0"
              >
                <b-form-checkbox-group
                  :options="typeOptions"
                  :aria-describedby="ariaDescribedby"
                  class="mt-1"
                />
              </b-form-group>
            </b-col>
          </b-row>
        </b-container>
      </template>
    </UiCenterModal>

    <!-- 작품 검색(search-piece-modal) -->
    <SearchPieceModal @select-work="selectPiece" />
  </b-container>
</template>

<script>
export default {
  name: 'CsPopUpAddPage',
  data () {
    return {
      setEnd: false,
      form: {
        piece: [], // 작품 추가
        cartoon_main_id: [], // 추가된 작품 ID
        isShow: '노출',
        name: '',
        title: '',
        startDate: '',
        endDate: '',
        popUpImgFile: null,
        tags: []
      },
      isShowOptions: [
        { text: '노출', value: '노출' },
        { text: '비노출', value: '비노출' }
      ],
      options: [
        { text: 'First radio', value: 'first' },
        { text: 'Second radio', value: 'second' },
        { text: 'Third radio', value: 'third' }
      ]
    }
  },
  computed: {
    breadcrumb () {
      const arr = [
        { label: '홈', url: '/' },
        { label: '편성모듈', url: '#' },
        { label: 'C형 편성모듈 관리', url: this.$route.path }
      ]
      return arr
    }
  },
  watch: {},
  created () {},
  mounted () {},
  methods: {
    // 등록
    async addPopup () {
      try {
        const res = await this.$axios.post('', this.form)
        console.log(res)
        if (res.status === 200) {
          alert('등록이 완료 되었습니다.')
          this.$router.push('/comicAdult/AtypeList')
        }
      } catch (err) {
        alert('등록되지 않았습니다. 다시 시도해보십시오.')
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
    },
    uploadPopUpImg (e) {
      this.form.popUpImgFile = e.target.files[0]
      console.log(this.form.popUpImgFile)
    }
  }
}
</script>
