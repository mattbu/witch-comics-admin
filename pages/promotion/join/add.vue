<template>
  <b-container fluid class="page-min-height py-3">
    <UiPageTitle title="회원가입 등록" :breadcrumb="breadcrumb">
      <template #buttons>
        <!-- <b-button
          variant="outline-primary"
          @click="$router.push('/promotion/itamu')"
        >
          취소
        </b-button> -->
        <b-button variant="primary" @click="enroll">
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
              <th>구분명*</th>
              <td colspan="3">
                <b-form-input
                  placeholder="관리용 구분 이름, 사용자에게는 표시되지 않습니다."
                />
              </td>
            </tr>
            <tr>
              <th>호박*</th>
              <td colspan="3">
                <div class="d-inline-flex">
                  <b-form-input class="w-20" />
                  <span class="ml-2 my-2">개</span>
                </div>
              </td>
            </tr>
            <tr>
              <th>물약*</th>
              <td colspan="3">
                <div class="d-inline-flex">
                  <b-form-input class="w-20" />
                  <span class="ml-2 my-2">개</span>
                </div>
              </td>
            </tr>
            <tr>
              <th>메시지 설정</th>
              <td colspan="3">
                <b-form-input class="w-30" />
              </td>
            </tr>
            <tr>
              <th>선착순 설정</th>
              <td colspan="3">
                <div class="d-inline-flex align-items-center">
                  <b-form-checkbox v-model="form.setReservation">
                    설정
                  </b-form-checkbox>
                  <b-form-input class="w-20 ml-4" />
                  <span class="align-self-center ml-2">명</span>
                </div>
              </td>
            </tr>
            <tr>
              <th>포인트 만료일*</th>
              <td colspan="3">
                <div class="d-flex align-items-center">
                  <div class="d-flex">
                    <b-form-radio-group
                      v-model="form.selectPointEndDay"
                      :options="pointEndDayOptions"
                      :aria-describedby="ariaDescribedby"
                      class="my-2"
                    />
                    <b-form-input class="w-15" />
                    <span class="align-self-center ml-2">일</span>
                  </div>
                  <b-form-radio-group
                    v-model="form.selectPeriodSet"
                    :options="periodSetOptions"
                    :aria-describedby="ariaDescribedby"
                  />
                  <div class="w-20 pr-2">
                    <label for="start-date">날짜</label>
                    <b-form-datepicker
                      id="start-date"
                      v-model="form.startDate"
                      placeholder="시작일 선택"
                      :date-format-options="{
                        year: 'numeric',
                        month: 'numeric',
                        day: 'numeric'
                      }"
                    />
                  </div>
                  <div class="w-20 pr-2">
                    <label for="start-hours">시간</label>
                    <b-form-select
                      id="start-hours"
                      v-model="form.startHours"
                      :options="hoursOptions"
                    />
                  </div>
                  <div class="w-20 pr-2">
                    <label for="start-minutes">분</label>
                    <b-form-select
                      id="start-minutes"
                      v-model="form.startMinutes"
                      :options="minutesOptions"
                    />
                  </div>
                  <div class="w-20 pr-2">
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
            <th>시작일*</th>
            <td colspan="3">
              <div class="d-inline-flex justify-content-between w-70">
                <div class="w-50 pr-2">
                  <label for="start-date">날짜</label>
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
                <div class="w-25 pr-2">
                  <label for="start-seconds">초</label>
                  <b-form-select
                    id="start-seconds"
                    v-model="form.startSeconds"
                    :options="secondsOptions"
                  />
                </div>
              </div>
            </td>
            <tr>
              <th>종료일*</th>
              <td colspan="3">
                <div class="mt-2 mb-3">
                  <b-form-group v-slot="{ ariaDescribedby }">
                    <b-form-radio-group
                      v-model="form.selectedTerminateType"
                      :options="terminateTypeOptions"
                      :aria-describedby="ariaDescribedby"
                    />
                  </b-form-group>
                </div>
                <div class="d-inline-flex justify-content-between w-70">
                  <div class="w-50 pr-2">
                    <label for="end-date">날짜</label>
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
                  <div class="w-25 pr-2">
                    <label for="end-hours">시간</label>
                    <b-form-select
                      id="end-hours"
                      v-model="form.endHours"
                      :options="hoursOptions"
                    />
                  </div>
                  <div class="w-25 pr-2">
                    <label for="end-minutes">분</label>
                    <b-form-select
                      id="end-minutes"
                      v-model="form.endMinutes"
                      :options="minutesOptions"
                    />
                  </div>
                  <div class="w-25 pr-2">
                    <label for="end-seconds">초</label>
                    <b-form-select
                      id="end-seconds"
                      v-model="form.endSeconds"
                      :options="secondsOptions"
                    />
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
  name: 'PromotionAddPage',
  mixins: [timeOptions],
  data () {
    return {
      form: {
        selectUtilize: 1,
        selectedSerialType: 1,
        selectedReasonForSuspend: 1,
        suspendDate: '',
        selectedSerialDay: 1,
        checkBiweekly: false,
        selectedSort: 1,
        selectedViewerType: 1,
        selectedViewerType2: 1,
        selectedGenre: 1,
        checkAdult: false,
        pieceName: '',
        checkBook: false,
        writerName: '',
        checkSame: false,
        painterName: '',
        originalWriterName: '',
        cpName: '',
        thumbnailImg: {
          file: null,
          src: ''
        },
        mainImgFile: null,
        description: '',
        tags: [],
        selectedNational: 1,
        checkNoPotionForRent: false,
        quantityPotionForRent: '',
        checkNoPumpkinForRent: false,
        quantityPumpkinForRent: '',
        checkNoPotionForOwn: false,
        quantityPotionForOwn: '',
        blockPurchaseRecent: '',
        setFree: '',
        relationDescription: '',
        relationshipList: [],
        startDate: '',
        startHours: '00',
        startMinutes: '00',
        startSeconds: '00',
        endDate: '',
        endHours: '00',
        endMinutes: '00',
        endSeconds: '59',
        selectedTerminateType: false
      },
      pointEndDayOptions: [
        { text: '영구', value: '영구' },
        { text: '일간설정', value: '일간설정' }
      ],
      periodSetOptions: [{ text: '기간설정', value: '기간설정' }],
      mainImgList: [],
      selectedMainImg: [],
      currentMainImg: null,
      currentMainIdx: null,
      test: null
    }
  },
  computed: {
    breadcrumb () {
      const arr = [
        { label: '홈', url: '/' },
        { label: '프로모션 관리', url: '#' },
        { label: '회원가입 등록', url: this.$route.path }
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
    controlMainImg (type) {
      if (this.selectedMainImg.includes(this.currentMainImg)) {
        this.mainImgList.splice(this.currentMainIdx, 1)
        if (type === 'first') {
          this.mainImgList.unshift(this.currentMainImg)
          this.currentMainImg = null
          this.currentMainIdx = null
        } else if (type === 'last') {
          this.mainImgList.push(this.currentMainImg)
          this.currentMainImg = null
          this.currentMainIdx = null
        }
      }
    },
    upMainImg () {
      if (this.selectedMainImg.includes(this.currentMainImg)) {
        const current = this.mainImgList[this.currentMainIdx]
        this.mainImgList.splice(this.currentMainIdx - 1, 0, current)

        const set = new Set(this.mainImgList)
        this.mainImgList = [...set]

        if (this.currentMainIdx > 0) {
          this.currentMainIdx -= 1
        }
      }
    },
    downMainImg () {
      if (this.selectedMainImg.includes(this.currentMainImg)) {
        this.currentMainIdx += 2
        this.mainImgList.splice(this.currentMainIdx, 0, this.currentMainImg)

        console.log(this.currentMainIdx, 'asdasdasdasd')
      }
    },
    selectMainImg (file, index) {
      this.currentMainImg = file
      this.currentMainIdx = index

      if (!this.selectedMainImg.includes(this.currentMainImg)) {
        this.selectedMainImg.push(this.currentMainImg)
      } else {
        this.currentMainImg = null
      }
    },
    async enroll () {
      const form = new FormData()

      this.mainImgList.forEach((file) => {
        form.append('files', file.realFile)
      })

      try {
        await this.$axios.post('/api/manager/fileUpload/filetest', form, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
      } catch (e) {
        console.log(e)
      }
    },
    openSearchModal (id) {
      this.$root.$emit('bv::show::modal', id)
    },
    toggleSingleEdition (checked) {
      if (checked) {
        this.form.pieceName = `[단행본] ${this.form.pieceName}`
      } else {
        this.form.pieceName = this.form.pieceName.replace('[단행본] ', '')
      }
    },
    uploadThumbnailImg (e) {
      this.form.thumbnailImg.file = e.target.files[0]

      this.form.thumbnailImg.src = URL.createObjectURL(e.target.files[0])
    },
    uploadMainImg (e) {
      for (let i = 0; i < e.target.files.length; i++) {
        const file = e.target.files[i]

        const fileInfo = {
          id: i + 1,
          thumbnail: URL.createObjectURL(file),
          realFile: file,
          fileName: file.name
        }

        this.mainImgList.push(fileInfo)
      }
    }
  }
}
</script>

<style scoped lang="scss">
.thumbnail-wrapper {
  padding-top: 100%;
  height: 0;
  position: relative;
  border-radius: 8px;
  .preview {
    min-height: 100%;
    height: 100%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    object-fit: cover;
    width: 100%;
    border-radius: 8px;
  }
}
.file-list-container {
  position: relative;
  width: 300px;
  height: 300px;
  border: solid 1px black;
  overflow-y: scroll;
  .file-list {
    list-style: none;
    padding: 20px;
    height: 250px;
    overflow-y: scroll;
    li {
      margin: 10px 0;
      cursor: pointer;
      &.focus {
        background-color: rgba(85, 51, 204, 0.1);
      }
      &:hover {
        background-color: rgba(85, 51, 204, 0.1);
      }
    }
    &-footer {
    }
  }
}
</style>
