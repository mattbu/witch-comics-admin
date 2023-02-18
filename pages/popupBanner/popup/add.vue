<template>
  <b-container fluid class="page-min-height py-3">
    <UiPageTitle title="팝업 등록" :breadcrumb="breadcrumb">
      <template #buttons>
        <b-button variant="primary" @click="addPopup">
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
              <th>제목</th>
              <td colspan="3">
                <b-form-input v-model="form.title" type="text" class="w-50" />
              </td>
            </tr>
            <tr>
              <th>부제목</th>
              <td colspan="3">
                <b-form-input v-model="form.title" type="text" class="w-50" />
              </td>
            </tr>
            <tr>
              <th>노출 순서</th>
              <td colspan="3">
                <b-form-input v-model="form.openOrder" type="text" class="w-10" />
                <p class="mt-1">
                  노출 순서가 같을 경우 나중에 게시되는 글이 낮은 숫자를 부여
                  받습니다.
                </p>
              </td>
            </tr>
            <tr class="mt-5 pt-5">
              <th>표시 여부</th>
              <td colspan="3">
                <b-form-group v-slot="{ ariaDescribedby }">
                  <b-form-radio-group
                    v-model="form.posted"
                    :options="postedYesNoOptions"
                    :aria-describedby="ariaDescribedby"
                  />
                </b-form-group>
              </td>
            </tr>

            <tr>
              <th>팝업 이미지</th>
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
              <th>링크 설정</th>
              <td colspan="3">
                <b-form-group v-slot="{ ariaDescribedby }">
                  <b-form-radio-group
                    v-model="form.linkType"
                    :options="linkTypeOptions"
                    :aria-describedby="ariaDescribedby"
                  />
                </b-form-group>
              </td>
            </tr>

            <tr>
              <th>URL 입력</th>
              <td colspan="3">
                <b-form-group v-slot="{ ariaDescribedby }">
      <b-form-radio v-model="selected" :aria-describedby="ariaDescribedby" name="some-radios" value="A" class="my-1">작품 <b-button variant="primary" @click="openModal('add-piece-modal')">선택</b-button></b-form-radio>
      <b-form-radio v-model="selected" :aria-describedby="ariaDescribedby" name="some-radios" value="B" class="my-1">이벤트 <b-button variant="primary" @click="openModal('add-event-modal')">선택</b-button></b-form-radio>
          <b-form-radio v-model="selected" :aria-describedby="ariaDescribedby" name="some-radios" value="c" class="my-1">외부링크  <b-form-input
                      v-model="form.link"
                      type="text"
                      class="w-50"
                    /></b-form-radio>
    </b-form-group>
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
                <div class="d-inline-flex justify-content-between w-70">
                  <div class="w-50 pr-2">
                    <label for="service-end-date">날짜*</label>
                    <b-form-datepicker
                      id="service-end-date"
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
                  <div class="w-25 pr-2">
                    <label for="service-end-hours">시간</label>
                    <b-form-select
                      id="service-end-hours"
                      v-model="form.endHours"
                      :options="hoursOptions"
                    />
                  </div>
                  <div class="w-25 pr-2">
                    <label for="service-end-minutes">분</label>
                    <b-form-select
                      id="service-end-minutes"
                      v-model="form.endMinutes"
                      :options="minutesOptions"
                    />
                  </div>
                  <div class="w-25 pr-2">
                    <label for="service-end-seconds">초</label>
                    <b-form-select
                      id="service-end-seconds"
                      v-model="form.endSeconds"
                      :options="secondsOptions"
                    />
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <th>노출여부</th>
              <td colspan="3">
                <div class="d-flex">
                  <b-form-group v-slot="{ ariaDescribedby }">
                    <b-form-radio-group
                      v-model="form.openNoYes"
                      :options="OpenYesNoOptions"
                      :aria-describedby="ariaDescribedby"
                      class="mt-2"
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

    <!-- 이벤트 검색 -->
    <UiCenterModal
      modal-id="add-event-modal"
      modal-title="이벤트 검색 설정"
      ok-title="등록"
      cancel-title="취소"
    >
      <template #contents>
        <b-container fluid class="px-0">
          <b-row class="px-3">
            <b-col lg="12" class="my-1">

            </b-col>
          </b-row>
        </b-container>
      </template>
    </UiCenterModal>
  </b-container>
</template>

<script>
export default {
  name: 'CsPopUpAddPage',
  data () {
    return {
      form: {
        name: '',
        title: '',
        startDate: '',
        endDate: '',
        order: '',
        selectedDisplay: 1,
        popUpImgFile: null,
        link: '',
        linkType: 1,
        tags: [],
        description: ''
      },
      postedYesNoOptions: [
        { text: '전체이용가', value: '전체이용가' },
        { text: '성인', value: '성인' }
      ],
      linkTypeOptions: [
        { text: '현재창', value: '현재창' },
        { text: '새창', value: '새창' }
      ],
      OpenYesNoOptions: [
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
        { label: '서비스 운영 관리', url: '#' },
        { label: '팝업 관리', url: '/cs/popup' },
        { label: '팝업 등록', url: this.$route.path }
      ]
      return arr
    }
  },
  watch: {},
  created () {},
  mounted () {
  },
  methods: {

    // 등록
    async addPopup () {
      try {
        const { status } = await this.$axios.post(
          '',
          {
            title: this.form.email,
            miniTitle: this.form.password
          }
        )
        if (status === 200) {
          alert('등록이 완료 되었습니다.')
          this.$router.push('/popupBanner/popup')
        }
      } catch (err) {
        alert('등록되지 않았습니다. 다시 시도해보십시오.')
      }
    },
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
