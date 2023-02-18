<template>
  <b-container fluid class="page-min-height py-3">
    <UiPageTitle title="매거진 모듈 설정" :breadcrumb="breadcrumb">
      <template #buttons>
        <b-button variant="primary" @click="addMagazine">
          등록
        </b-button>
      </template>
    </UiPageTitle>
    <hr>
    <!-- 매거진 모듈(일반) -->
    <b-row class="mt-4">
      <b-col align-self="center">
        <h5>매거진 모듈(일반)</h5>
      </b-col>
    </b-row>
    <b-row class="mt-2">
      <b-col cols="12">
        <table class="table border mb-4 table-layout-fixed">
          <colgroup>
            <col style="width: 15%">
            <col>
            <col style="width: 10%">
            <col>
          </colgroup>
          <tbody>
            <tr>
              <th>제목 입력*</th>
              <td colspan="3">
                <b-form-input placeholder="제목을 입력해주세요." class="w-30" />
              </td>
            </tr>
            <tr>
              <th>버튼 제목*</th>
              <td colspan="3">
                <b-form-input placeholder="제목을 입력해주세요." class="w-30" />
              </td>
            </tr>
            <tr>
              <th>내용*</th>
              <td colspan="3">
                <b-form-textarea
                  id="textarea"
                  v-model="form.content"
                  placeholder="최대 2줄까지 입력할 수 있습니다."
                  rows="2"
                  max-rows="2"
                />
              </td>
            </tr>
            <tr>
              <th>이미지등록*( 모바일 )</th>
              <td>
                <p class="mb-2">
                  이미지 추가 (1/1개)
                </p>
                <div>
                  <input
                    id="list-img-input"
                    type="file"
                    multiple
                    class="d-none"
                  >
                  <label
                    for="list-img-input"
                    class="btn btn-outline-secondary mb-0 table-inner-btn"
                  >
                    파일 선택
                  </label>
                </div>
              </td>
              <th>이미지등록*( PC )</th>
              <td>
                <p class="mb-2">
                  이미지 추가 (1 / 1 개)
                </p>
                <div>
                  <input
                    id="list-img-input"
                    type="file"
                    multiple
                    class="d-none"
                    @change="uploadListImg"
                  >
                  <label
                    for="list-img-input"
                    class="btn btn-outline-secondary mb-0 table-inner-btn"
                  >
                    파일 선택
                  </label>
                </div>
              </td>
            </tr>
            <tr>
              <th>영상 선택</th>
              <td colspan="3">
                <b-button
                  variant="outline-secondary"
                  class="table-inner-btn"
                  @click="openSearchModal('search-modal')"
                >
                  선택
                </b-button>
              </td>
            </tr>
          </tbody>
        </table>
      </b-col>
    </b-row>

    <!-- 매거진 모듈(성인) -->
    <b-row class="mt-4">
      <b-col>
        <div class="d-flex justify-content-start align-items-center">
          <h5>매거진 모듈(성인)</h5>
          <b-form-checkbox class="fs-16 ml-2">
            일반 동일설정
          </b-form-checkbox>
        </div>
      </b-col>
    </b-row>
    <b-row class="mt-2">
      <b-col cols="12">
        <table class="table border mb-4 table-layout-fixed">
          <colgroup>
            <col style="width: 15%">
            <col>
            <col style="width: 10%">
            <col>
          </colgroup>
          <tbody>
            <tr>
              <th>제목 입력*</th>
              <td colspan="3">
                <b-form-input placeholder="제목을 입력해주세요." class="w-30" />
              </td>
            </tr>
            <tr>
              <th>버튼 제목*</th>
              <td colspan="3">
                <b-form-input placeholder="제목을 입력해주세요." class="w-30" />
              </td>
            </tr>
            <tr>
              <th>내용*</th>
              <td colspan="3">
                <b-form-textarea
                  id="textarea"
                  v-model="form.content"
                  rows="2"
                  max-rows="2"
                />
              </td>
            </tr>
            <tr>
              <th>이미지등록( 모바일 )</th>
              <td>
                <p class="mb-2">
                  이미지 추가 (1/1개)
                </p>
                <div>
                  <input
                    id="list-img-input"
                    type="file"
                    multiple
                    class="d-none"
                  >
                  <label
                    for="list-img-input"
                    class="btn btn-outline-secondary mb-0 table-inner-btn"
                  >
                    파일 선택
                  </label>
                </div>
              </td>
              <th>이미지등록( PC )</th>
              <td>
                <p class="mb-2">
                  이미지 추가 (1 / 1 개)
                </p>
                <div>
                  <input
                    id="list-img-input"
                    type="file"
                    multiple
                    class="d-none"
                    @change="uploadListImg"
                  >
                  <label
                    for="list-img-input"
                    class="btn btn-outline-secondary mb-0 table-inner-btn"
                  >
                    파일 선택
                  </label>
                </div>
              </td>
            </tr>
            <tr>
              <th>영상 선택</th>
              <td colspan="3">
                <b-button
                  variant="outline-secondary"
                  class="table-inner-btn"
                  @click="openSearchModal('search-modal')"
                >
                  선택
                </b-button>
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
      isMounted: false,
      form: {
        openWay: '',
        title: ''
      },
      isLoading: false,
      totalRows: 0,
      currentPage: 1,
      perPage: 5,
      items: [],
      fields: [
        { key: 'no', label: '번호' },
        { key: 'name', label: '구분' },
        { key: 'piece', label: '작품명' },
        { key: 'serial', label: 'CP사' },
        { key: 'content', label: '시작일' },
        { key: 'writeAt', label: '종료일' },
        { key: 'agree', label: '노출등급' },
        { key: 'singo', label: '노출여부' },
        { key: 'status', label: '최종수정일' },
        { key: 'setting', label: '순서변경' }
      ]
    }
  },
  tuiEditorOptions: {
    language: 'ko-KR',
    hideModeSwitch: true
  },
  openWayOptions: [
    { text: '램덤노출', value: '램덤노출' },
    { text: '지정노출', value: '지정노출' }
  ],
  async fetch () {
    await this.totalReplyList()
  },
  computed: {
    breadcrumb () {
      const arr = [
        { label: '홈', url: '/' },
        { label: '편성모듈', url: '#' },
        { label: '매거진 모듈 설정', url: this.$route.fullPath }
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
    async addMagazine () {
      try {
        const { status } = await this.$axios.post('', {
          type: this.form.type,
          age: this.form.age,
          miniTitle: this.form.miniTitle,
          openYesNo: this.form.openYesNo,
          startAt: this.form.startAt,
          endAt: this.form.endAt,
          image: this.form.image,
          bgColor: this.form.bgColor,
          reply: this.form.reply
        })
        if (status === 200) {
          alert('동영상 등록이 완료 되었습니다.')
          // await this.getList()
          this.$router.push('/event/list')
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
