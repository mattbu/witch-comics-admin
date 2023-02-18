<template>
  <b-container fluid class="page-min-height py-3">
    <UiPageTitle title="내부 관리자 등록" :breadcrumb="breadcrumb">
      <template #buttons>
        <b-button variant="primary" @click="addInner">
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
                    v-model="form.email"
                    type="text"
                    class="w-30"
                    placeholder="계정을 입력하세요."
                  />
                  <b-button variant="primary" class="ml-2" @click="checkExist">
                    중복 체크
                  </b-button>
                  <p
                    v-if="errMsg"
                    class="fs-15 ml-2 mt-2"
                    style="color: tomato"
                  >
                    {{ errMsg }}
                  </p>
                </div>
              </td>
            </tr>
            <tr>
              <th>비밀번호</th>
              <td colspan="3">
                <div class="d-flex">
                  <b-form-input
                    v-model="form.password"
                    type="text"
                    class="w-30"
                    placeholder="비밀번호를 입력하세요."
                  />
                </div>
              </td>
            </tr>
            <tr>
              <th>계정명</th>
              <td colspan="3">
                <div class="d-flex">
                  <b-form-input
                    v-model="form.name"
                    class="w-30"
                    type="text"
                    placeholder="계정명 입력하세요."
                  />
                </div>
              </td>
            </tr>
            <tr>
              <th>소속부서</th>
              <td colspan="3">
                <div class="d-flex">
                  <b-form-input
                    v-model="form.part"
                    type="text"
                    placeholder="소속을 입력하세요.( 예: 회사명, 팀명 등 )"
                    class="w-30"
                  />
                </div>
              </td>
            </tr>
            <tr>
              <th>권한그룹</th>
              <td colspan="3">
                <div class="d-flex">
                  <b-form-select
                    v-model="form.role"
                    :options="roleOptions"
                    class="w-10"
                  />
                </div>
              </td>
            </tr>
            <tr>
              <th>계정 활성화</th>
              <td colspan="3">
                <b-form-group v-slot="{ ariaDescribedby }">
                  <b-form-radio-group
                    v-model="form.activeYn"
                    :options="accountOptions"
                    :aria-describedby="ariaDescribedby"
                  />
                </b-form-group>
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
  name: 'ManagerInnerAddPage',
  mixins: [timeOptions],
  data () {
    return {
      errMsg: '',
      form: {
        email: '',
        name: '',
        part: '',
        password: '',
        role: '선택',
        activeYn: '',

        selectUtilize: 1,
        selectedSerialType: 1,
        selectedReasonForSuspend: 1,
        selectedSerialDay: 1,
        checkBiweekly: false,
        selectedSort: 1,

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
      // 중복 확인
      isExisted: null,
      isFinishedCheckExisted: false,

      roleOptions: [
        { text: '선택', value: '선택' },
        { text: '비활성', value: '비활성' }
      ],
      accountOptions: [
        { text: '활성화', value: 1 },
        { text: '비활성', value: 2 }
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
        { label: '관리자 관리', url: '#' },
        { label: '내부 관리자 등록', url: this.$route.path }
      ]
      return arr
    }
  },
  watch: {
    'form.role' (val) {
      console.log(val, 'role')
    },
    'form.email' () {
      this.isFinishedCheckExisted = false
    }
  },
  created () {},
  mounted () {
    this.hoursOptions = this.getHours()
    this.minutesOptions = this.getMinutes()
    this.secondsOptions = this.getSeconds()
  },
  methods: {
    // 등록
    async addInner () {
      if (this.checkValidation()) {
        try {
          const { status } = await this.$axios.post(
            '/api/manager/admin/regist',
            {
              email: this.form.email,
              password: this.form.password,
              name: this.form.name,
              part: this.form.part,
              role: this.form.role,
              activeYn: this.form.activeYn
              // role: this.form.role,
              // activeYn: this.form.activeYn
            }
          )
          if (status === 200) {
            this.form.name = ''
            alert('내부 등록이 완료 되었습니다.')
            // await this.getList()
            this.$router.push('/manager/inner-admin')
          }
        } catch (err) {
          alert('등록되지 않았습니다. 다시 시도해보십시오.')
        }
      }
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

    checkValidation () {
      if (!this.form.email) {
        this.errMsg = '아이디를 입력해 주세요.'
        return false
      } else if (!this.isFinishedCheckExisted) {
        this.errMsg = '중복확인을 해주세요.'
        return false
      } else if (this.isExisted) {
        this.errMsg = '아이디를 변경해 주세요.'
        return false
      }
      return true
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
