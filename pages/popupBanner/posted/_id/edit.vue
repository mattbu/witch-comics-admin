<template>
  <b-container fluid class="page-min-height py-3">
    <UiPageTitle title="투고 수정" :breadcrumb="breadcrumb">
      <template #buttons>
        <b-button variant="primary" @click="editPosted">
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
              <th>제목</th>
              <td colspan="3">
                <b-form-input v-model="form.title" type="text" class="w-50" />
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
                    />
                  </b-form-group>
                </div>
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
          </tbody>
        </table>
      </b-col>
    </b-row>

  </b-container>
</template>

<script>
export default {
  name: 'PostedEditPage',
  data () {
    return {
      form: {
        name: '',
        title: '',
        startDate: '',
        endDate: '',
        selectedDisplay: 1,
        popUpImgFile: null,
        link: '',
        linkType: 1,
        tags: [],
        description: ''
      },
      OpenYesNoOptions: [
        { text: '노출', value: '노출' },
        { text: '비노출', value: '비노출' }
      ]
    }
  },
  computed: {
    breadcrumb () {
      const arr = [
        { label: '홈', url: '/' },
        { label: '팝업/배너 관리', url: '#' },
        { label: '투고 수정', url: this.$route.path }
      ]
      return arr
    }
  },
  watch: {},
  created () {},
  mounted () {
  },
  methods: {

    // 수정
    async editPosted () {
      try {
        const { status } = await this.$axios.put(
          '',
          {
            title: this.form.email
          }
        )
        if (status === 200) {
          alert('수정이 완료 되었습니다.')
          this.$router.push('/popupBanner/posted')
        }
      } catch (err) {
        alert('수정되지 않았습니다. 다시 시도해보십시오.')
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
