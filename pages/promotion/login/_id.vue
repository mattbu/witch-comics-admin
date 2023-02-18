<template>
  <b-container fluid class="page-min-height py-3">
    <UiPageTitle title="로그인 상세" :breadcrumb="breadcrumb">
      <template #buttons>
        <b-button
          variant="outline-primary"
          @click="$router.push('/promotion/login/edit')"
        >
          수정
        </b-button>
      </template>
    </UiPageTitle>
    <hr>
    <b-row class="mt-2">
      <b-col cols="12">
        <table class="table border mb-0 table-layout-fixed">
          <colgroup>
            <col style="width: 10%">
            <col>
            <col style="width: 10%">
            <col>
          </colgroup>
          <tbody class="text-center">
            <!-- 정보 -->
            <tr>
              <th>구분명</th>
              <td>11월 지급 이벤트</td>
            </tr>
            <tr>
              <th>발급물약</th>
              <td colspan="3">
                <!-- {{ itamuInfo.title ? itamuInfo.title : '-' }} -->
              </td>
              <th>발급호박</th>
              <td colspan="3">
                <!-- {{ itamuInfo.id ? itamuInfo.id : '-' }} -->
              </td>
              <th>지급받은 회원 수</th>
              <td colspan="3">
                <!-- {{ itamuInfo.writer ? itamuInfo.writer : '-' }} -->
              </td>
            </tr>
            <tr>
              <th>상태</th>
              <td colspan="3">
                <!-- {{ itamuInfo.isBook ? itamuInfo.isBook : '-' }} -->
              </td>
              <th>시작일</th>
              <td colspan="3">
                <!-- {{ itamuInfo.menucode ? itamuInfo.menucode : '-' }} -->
              </td>
              <th>종료일</th>
              <td colspan="3">
                <!-- {{ itamuInfo.status ? itamuInfo.status : '-' }} -->
              </td>
            </tr>
          </tbody>
        </table>
      </b-col>
    </b-row>
    <b-row class="mt-2">
      <b-col cols="12">
        <table class="table border mb-0 table-layout-fixed">
          <colgroup>
            <col style="width: 10%">
            <col>
            <col style="width: 10%">
            <col>
          </colgroup>
          <tbody class="text-center">
            <tr>
              <th>총 발급물약</th>
              <td colspan="3">
                <!-- {{ itamuInfo.cpName ? itamuInfo.cpName : '-' }} -->
              </td>
              <th>총 발급호박</th>
              <td colspan="3">
                <!-- {{ itamuInfo.genre ? itamuInfo.genre : '-' }} -->
              </td>
            </tr>
          </tbody>
        </table>
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
          <tbody class="text-center">
            <!-- 정보 -->
            <tr>
              <th>아이디</th>
              <td colspan="3">
                <p>11월 지급 이벤트</p>
              </td>
            </tr>
            <tr>
              <th>발급일</th>
              <td colspan="3">
                <div class="d-inline-flex justify-content-start w-100 my-2">
                  <div class="d-inline-flex ml-2 w-40">
                    <b-form-datepicker
                      v-model="startDate"
                      placeholder="선택"
                      :date-format-options="{
                        year: 'numeric',
                        month: 'numeric',
                        day: 'numeric'
                      }"
                    />
                    <b-form-datepicker
                      v-model="endDate"
                      placeholder="선택"
                      :date-format-options="{
                        year: 'numeric',
                        month: 'numeric',
                        day: 'numeric'
                      }"
                      class="ml-2"
                    />
                  </div>
                  <div class="mx-2">
                    <b-button variant="outline-secondary" class="period-btn">
                      전체
                    </b-button>
                    <b-button variant="outline-secondary" class="period-btn">
                      오늘
                    </b-button>
                    <b-button variant="outline-secondary" class="period-btn">
                      7일
                    </b-button>
                    <b-button variant="outline-secondary" class="period-btn">
                      1개월
                    </b-button>
                    <b-button variant="outline-secondary" class="period-btn">
                      3개월
                    </b-button>
                    <b-button variant="outline-secondary" class="period-btn">
                      6개월
                    </b-button>
                    <b-button variant="outline-secondary" class="period-btn">
                      1년
                    </b-button>
                    <b-button variant="outline-secondary" class="period-btn">
                      초기화
                    </b-button>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </b-col>
    </b-row>
    <b-row align-h="center" class="mb-4">
      <b-col cols="2">
        <b-button variant="primary" class="w-75">
          검색
        </b-button>
      </b-col>
    </b-row>
    <b-row class="pt-5">
      <b-col align-self="center">
        <h6>11월 지급 이벤트 목록 (500)</h6>
      </b-col>
    </b-row>
    <hr class="my-2">
    <!-- 테이블 -->
    <b-table
      class="list"
      :items="items"
      :fields="fields"
      :current-page="currentPage"
      :per-page="perPage"
      stacked="md"
      show-empty
      small
    />
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
        mainImgFile: null,
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
      utilizeOptions: [
        { text: '대여', value: 1 },
        { text: '소장', value: 2 }
      ],
      items: [
        {
          id: 3,
          user: 'alpa@gmail.com',
          issue_potion: '100개',
          issue_pumpkin: '100개',
          end_at: '2022-09-25~2022-09-30',
          issue_at: '2022-09-25~2022-09-30'
        },
        {
          id: 3,
          user: 'alpa@gmail.com',
          issue_potion: '100개',
          issue_pumpkin: '100개',
          end_at: '2022-09-25~2022-09-30',
          issue_at: '2022-09-25~2022-09-30'
        },
        {
          id: 3,
          user: 'alpa@gmail.com',
          issue_potion: '100개',
          issue_pumpkin: '100개',
          end_at: '2022-09-25~2022-09-30',
          issue_at: '2022-09-25~2022-09-30'
        }
      ],
      fields: [
        { key: 'no', label: '번호' },
        { key: 'user', label: '회원' },
        { key: 'issue_potion', label: '발급물약' },
        { key: 'issue_pumpkin', label: '발급호박' },
        { key: 'end_at', label: '만료일' },
        { key: 'issue_at', label: '발급일' }
      ],
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
        { label: '로그인 상세', url: this.$route.path }
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
