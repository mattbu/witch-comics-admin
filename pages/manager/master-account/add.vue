<template>
  <b-container fluid class="page-min-height py-3">
    <UiPageTitle title="마스터 관리자 등록" :breadcrumb="breadcrumb">
      <template #buttons>
        <b-button variant="primary" @click="addMaster">
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
              <th>아이디</th>
              <td colspan="3">
                <div class="d-flex">
                  <b-form-input
                    v-model="form.userId.email"
                    class="w-25"
                    placeholder="연결할 계정을 입력하세요."
                  />
                  <!-- <b-button variant="primary" class="ml-2">
                    중복체크
                  </b-button> -->
                  <b-button
                    variant="primary"
                    class="ml-2"
                    @click="openFindIdModal('find-id-modal')"
                  >
                    찾기
                  </b-button>
                </div>
              </td>
            </tr>
            <tr>
              <th>계정명</th>
              <td colspan="3">
                <div class="d-flex">
                  <b-form-input
                    v-model="form.name"
                    class="w-25"
                    placeholder="계정명을 입력하세요."
                  />
                </div>
              </td>
            </tr>
            <tr>
              <th>소속부서</th>
              <td colspan="3">
                <div class="d-flex">
                  <b-form-input
                    v-model="form.inCharge"
                    class="w-25"
                    placeholder="소속을 입력하세요.(예: 회사명, 팀명 등)"
                  />
                </div>
              </td>
            </tr>
            <tr>
              <th>CP사</th>
              <td colspan="3">
                <div class="d-flex">
                  <b-form-group v-slot="{ ariaDescribedby }">
                    <b-form-radio-group
                      v-model="form.cpId"
                      :options="cpOptions"
                      :aria-describedby="ariaDescribedby"
                      class="mt-2"
                    />
                  </b-form-group>
                  <b-button
                    v-model="setCp"
                    variant="primary"
                    @click="openModal('search-cp-modal')"
                  >
                    선택
                  </b-button>
                  <template v-if="form.works.length > 0">
                    <div class="mt-2">
                      <b-badge
                        v-for="(cp, cpIdx) in form.works"
                        :key="`cp-${cpIdx}`"
                        pill
                        class="b-form-tag d-inline-flex ml-2"
                      >
                        <span class="align-self-center">{{ cp.cp }}</span>
                        <b-button
                          variant="transparent"
                          class="p-0 align-self-center"
                          @click="removeCp(cp.id)"
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
              </td>
            </tr>

            <!-- cp사 -->
            <!-- <tr>
              <th>CP사</th>
              <td colspan="3">
                <b-form-group v-slot="{ ariaDescribedby }" class="">
                  <div class="d-flex align-items-center">
                    <b-form-radio
                      v-model="setAll"
                      :aria-describedby="ariaDescribedby"
                      name="selected"
                      value="전체"
                      :disabled="!setCp"
                    >
                      전체
                    </b-form-radio>
                    <b-form-radio
                      v-model="selected"
                      :aria-describedby="ariaDescribedby"
                      name="selected"
                      value="설정"
                      class="ml-2"
                    >
                      설정
                    </b-form-radio>
                    <b-button
                      v-model="setCp"
                      class="ml-2"
                      variant="primary"
                      @click="openModal('search-cp-modal')"
                    >
                      선택
                    </b-button>
                    <template v-if="form.works.length > 0">
                      <div class="mt-2">
                        <b-badge
                          v-for="(cp, cpIdx) in form.works"
                          :key="`cp-${cpIdx}`"
                          pill
                          class="b-form-tag d-inline-flex ml-2"
                        >
                          <span class="align-self-center">{{ cp.cp }}</span>
                          <b-button
                            variant="transparent"
                            class="p-0 align-self-center"
                            @click="removeCp(cp.id)"
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
                </b-form-group>
              </td>
            </tr> -->
            <!-- cp사 끝 -->
            <tr>
              <th>계정 활성화</th>
              <td colspan="3">
                <div class="d-flex my-2">
                  <b-form-group v-slot="{ ariaDescribedby }">
                    <b-form-radio-group
                      v-model="form.activeYn"
                      :options="activeYnOptions"
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

    <!-- 아이디 찾기 modal -->
    <SearchManagerIdModal @select-id="selectId" />

    <!-- cp사 modal -->
    <SearchManagerCpModal @select-work="selectCp" />
  </b-container>
</template>
<script>
import { timeOptions } from '@/plugins/mixins'

export default {
  name: 'PromotionAddPage',
  mixins: [timeOptions],
  data () {
    return {
      setCp: true,
      form: {
        id: '',
        works: [],
        userId: '',
        name: '',
        cpId: '',
        inCharge: '',
        activeYn: ''
      },
      cpOptions: [
        { text: '전체', value: '전체' },
        { text: '설정', value: '설정' }
      ],
      activeYnOptions: [
        { text: '활성화', value: '활성화' },
        { text: '비활성', value: '비활성' }
      ],
      tags: [], // 태그
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
        { label: '관리자 관리', url: '#' },
        { label: '마스터 관리자 등록', url: this.$route.path }
      ]
      return arr
    }
  },
  watch: {},
  created () {},
  mounted () {},
  methods: {
    selectId (data) {
      this.form.userId = data
    },
    async addMaster () {
      // if (this.checkValidation()) {
      try {
        const { status } = await this.$axios.post('/api/manager/admin/master', {
          userId: this.form.userId.id,
          name: this.form.name,
          cpId: this.form.cpId,
          inCharge: this.form.inCharge,
          activeYn: this.form.activeYn
        })
        if (status === 200) {
          alert('등록이 완료 되었습니다.')
          // await this.getList()
          this.$router.push('/manager/master-account')
        }
      } catch (err) {
        alert('등록되지 않았습니다. 다시 시도해보십시오.')
      }
      // }
    },

    async checkExist () {
      if (!this.form.email) {
        this.errMsg = '아이디를 입력해 주세요.'
      } else {
        this.errMsg = ''
        const {
          status,
          data: { data }
        } = await this.$axios.get('/api/manager/admin/duplicate', {
          params: {
            email: this.form.email
          }
        })
        if (status === 200) {
          this.isExisted = data

          if (this.isExisted) {
            this.errMsg = '이미 등록된 아이디인걸요.'
          } else {
            this.errMsg = ''
          }
          this.isFinishedCheckExisted = true
        }
      }
    },

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
        this.form.cpName = `[단행본] ${this.form.cpName}`
      } else {
        this.form.cpName = this.form.cpName.replace('[단행본] ', '')
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
    },
    openFindIdModal (id) {
      this.$root.$emit('bv::show::modal', id)
    },
    openModal (id) {
      this.$root.$emit('bv::show::modal', id)
    },
    selectWork (data) {
      this.form.works = data
    },

    selectCp (data) {
      this.form.cpName = data.name
      this.form.cpId = data.id
    },
    removeCp (id) {
      this.form.works = this.form.works.filter(cp => cp.id !== id)
    }
  }
}
</script>
