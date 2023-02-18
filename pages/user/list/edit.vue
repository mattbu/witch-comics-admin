<template>
  <b-container v-if="userData" fluid class="page-min-height py-3">
    <UiPageTitle title="회원 상세 정보" :breadcrumb="breadcrumb">
      <template #buttons>
        <b-button
          variant="outline-primary"
          @click="openModal('userLeave-modal')"
        >
          탈퇴
        </b-button>
        <b-button
          variant="outline-primary"
          @click="$router.go(-1)"
        >
          취소
        </b-button>
        <b-button
          variant="outline-primary"
          @click="onUpdate"
        >
          저장
        </b-button>
      </template>
    </UiPageTitle>
    <hr>
    <b-row class="mb-3">
      <b-col cols="auto" class="font-weight-700" align-self="center">
        <p>{{ $route.query.email }}</p>
      </b-col>
      <b-col cols="auto" align-self="center">
        회원정보 <b>(회원)</b>
      </b-col>
    </b-row>
    <hr>
    <b-row class="d-flex">
      <b-col cols="3" class="d-flex justify-content-center align-items-center">
        <b-icon icon="person-circle" style="width: 220px; height: 220px" />
      </b-col>
      <b-col cols="9">
        <b-row class="py-3" align-h="between">
          <b-col align-self="center">
            <h6 class="font-weight-bold">
              회원 추가 정보
            </h6>
          </b-col>
        </b-row>
        <!--        <hr class="my-2">-->
        <table class="table border mb-0 table-layout-fixed user-detail-info">
          <tbody>
            <tr>
              <th>가입방법</th>
              <td>{{ userData.socialType || '-' }}</td>
              <th>
                닉네임
              </th>
              <td colspan="2">
                <b-input-group>
                  <b-form-input
                    id="form-nickname"
                    v-model="userData.nick"
                    class="mr-2"
                    maxlength="10"
                    onkeyup="this.value = this.value.replace(/[^가-힣a-zA-Z0-9]/, '')"
                  />
                  <b-button size="sm" @click="checkNick">
                    중복 확인
                  </b-button>
                </b-input-group>
                <p v-if="userData.nick.length>10" class="small text-warning text-left mt-1">
                  최대 10글자까지 입력가능합니다.
                </p>
                <p v-if="warningNick" class="small text-warning text-left mt-1">
                  중복된 닉네임입니다.
                </p>
              </td>
              <th>최근 접속일</th>
              <td>
                <span v-if="userData.loginDate">
                  {{ userData.loginDate.slice(0, 10) }} ({{ userData.loginDate.slice(11, 19) }})
                </span>
                <span v-else>-</span>
              </td>
            </tr>
            <tr>
              <th>가입일</th>
              <td>
                {{ dateFormatting(userData.createdAt, '.') || '-' }}
              </td>
              <th>등급</th>
              <td colspan="2">
                {{ userData.degree || '-' }}
              </td>
              <th>마케팅정보 수신 동의</th>
              <td>
                <b-form-checkbox
                  v-model="agreeMarketing"
                  :disabled="userData.agreeAt = null"
                  @change="checkMarketing"
                >
                  설정({{ dateFormatting(userData.agreeAt, '.') }})
                </b-form-checkbox>
              </td>
            </tr>
            <tr>
              <th>댓글 정지</th>
              <td class="text-left">
                <b-form-checkbox v-model="userData.is_reply">
                  설정
                </b-form-checkbox>
              </td>
              <th>계정 정지</th>
              <td colspan="4" class="text-left">
                <b-form-checkbox v-model="userData.state">
                  설정
                </b-form-checkbox>
              </td>
            </tr>
          </tbody>
        </table>

        <b-row class="py-3" align-h="between">
          <b-col align-self="center">
            <h6 class="font-weight-bold">
              회원 포인트 정보
            </h6>
          </b-col>
        </b-row>
        <!--        <hr class="my-2">-->
        <table class="table border mb-0 table-layout-fixed user-detail-info">
          <tbody>
            <tr>
              <th>총결제액</th>
              <td>
                {{ userData.totalAmount || '-' }}
              </td>
              <th>보유물약</th>
              <td>
                {{ userData.coin || '-' }}
              </td>
              <th>보유호박</th>
              <td>
                {{ userData.point || '-' }}
              </td>
            </tr>
          </tbody>
        </table>

        <b-row class="py-3" align-h="between">
          <b-col align-self="center">
            <h6 class="font-weight-bold">
              회원 성인인증
            </h6>
          </b-col>
        </b-row>
        <!--        <hr class="my-2">-->
        <table class="table border mb-0 table-layout-fixed user-detail-info">
          <tbody>
            <tr>
              <th>인증여부</th>
              <td colspan="2">
                <span v-if="userData.adultAt&&userData.adultAt ==='Y'">Y ({{ dateFormatting(userData.adultAt, '.') }})</span>
                <b-button v-else size="sm" @click="manageAdultCheck">
                  {{ agreeAdult === false?"관리자 승인":"관리자 승인 해제" }}
                </b-button>
              </td>
              <th>이름</th>
              <td>
                {{ userData.name || '-' }}
              </td>
              <th>성별</th>
              <td>
                {{ userData.gender || '-' }}
              </td>
              <th>생년월일</th>
              <td>
                {{ dateFormatting(userData.birth, '.') || '-' }}
              </td>
            </tr>
          </tbody>
        </table>
      </b-col>
    </b-row>
    <b-row class="pt-5" align-h="between">
      <b-col align-self="center">
        <h6 class="font-weight-bold">
          정기결제 내역
        </h6>
      </b-col>
    </b-row>
    <hr class="my-2">
    <table class="table border mb-0 table-layout-fixed user-detail-info">
      <tbody>
        <!-- 정보 -->
        <template>
          <tr>
            <th>정액제 가입</th>
            <td>Y</td>
            <th>가입상품</th>
            <td>연결제</td>
            <th>가입일</th>
            <td>2022.06.22</td>
            <th>최근 가입일</th>
            <td>2022.06.22</td>
            <th>취소일</th>
            <td>2022.06.22</td>
          </tr>
          <tr>
            <th>자동결제 가입</th>
            <td>Y</td>
            <th>가입상품</th>
            <td>물약 자동충전 3900</td>
            <th>기준(일/물약수)</th>
            <td>15일</td>
            <th>가입일</th>
            <td>2022.06.22</td>
            <th>취소일</th>
            <td>2022.06.22</td>
          </tr>
        </template>
      </tbody>
    </table>

    <!-- 회원 코멘트 input -->
    <b-row class="pt-3" align-h="between">
      <b-col align-self="center">
        <h6 class="font-weight-bold">
          회원 코멘트
        </h6>
      </b-col>
    </b-row>
    <hr class="my-2">

    <b-row>
      <b-col cols="11">
        <b-form-input />
      </b-col>
      <b-col class="px-0">
        <b-button variant="primary" class="mx-0">
          등록
        </b-button>
      </b-col>
    </b-row>
    <!-- 회원 코멘트 하단영역 start -->
    <div v-if="userData.commentList && userData.commentList.length > 0">
      <b-row
        v-for="(comment, idx) in userData.commentList"
        :key="'comment' + idx"
        class="mb-3"
      >
        <b-col cols="" align-self="center">
          {{ comment.comment }}
        </b-col>
        <b-col cols="auto" align-self="center">
          {{ dateFormatting(userData.createdAt) }} 박담당
        </b-col>
        <b-col cols="auto">
          제
          <b-button
            cols="auto"
            variant="outline-primary"
            class="table-inner-btn"
          >
            삭제
          </b-button>
        </b-col>
      </b-row>
    </div>
    <!-- 회원 코멘트 하단영역 end -->

    <hr>

    <!--  모달-->
    <UiCenterModal
      modal-id="userLeave-modal"
      modal-title="탈퇴하기"
      modal-size="md"
      ok-title="탈퇴"
      cancel-title="취소"
      @ok="removeAccount"
    >
      <template #contents>
        <b-container fluid>
          <b-row class="d-flex justify-content-center align-items-center p-3">
            <p :style="{ color: 'red' }">
              회원을 탈퇴 시키는 사유를 입력해주세요.
            </p>
          </b-row>
          <b-row class="p-3">
            <p>사유</p>
            <b-form-textarea v-model="removeReason" rows="3" placeholder="여기에 사유를 입력해주세요." />
          </b-row>
        </b-container>
      </template>
    </UiCenterModal>
  </b-container>
</template>

<script>
export default {
  name: 'UserEditPage',
  data () {
    return {
      userId: this.$route.query.id,
      userData: null,
      agreeMarketing: false,
      removeReason: '',
      warningNick: false,
      agreeAdult: false
    }
  },
  fetch () {
    if (this.userId) {
      this.getData(this.userId)
    }
  },
  computed: {
    breadcrumb () {
      const arr = [
        { label: '홈', url: '/' },
        { label: '회원 관리', url: '#' },
        { label: '회원 리스트', url: '/user/list' },
        { label: '회원 상세 정보 수정', url: this.$route.path }
      ]
      return arr
    }
  },
  methods: {
    openModal (id) {
      this.removeReason = ''
      this.$root.$emit('bv::show::modal', id)
    },
    async getData (userId) {
      try {
        const {
          status,
          data: { data }
        } = await this.$axios.get(`/api/manager/user/detail/${userId}`)
        if (status === 200) {
          console.log('resp ::: ', data)
          this.userData = data
          this.agreeMarketing = this.userData.agreeAt || false
        }
      } catch (e) {
        console.log(e)
      }
    },
    checkMarketing () {
      this.userData.agreeAt = this.agreeMarketing
    },
    checkNick () {
      // 정책확인 후 유효성 설정 필요
      console.log('닉네임 중복 검사', this.userData.nick)
      this.warningNick = true
    },
    manageAdultCheck () {
      this.agreeAdult = !this.agreeAdult
      console.log('관리자 성인 승인', this.agreeAdult)
    },
    onUpdate () {
      console.log('수정')
    //  manageAdultCheck = true 일때 params의 성인인증여부 수정
    },
    removeAccount () {
      console.log('계정 탈퇴')
      this.$nextTick(() => {
        this.$bvModal.hide('userLeave-modal')
      })
    }
  }
}
</script>
<!-- 미비사항
     마케팅 수신동의는 해제만 가능하도록 수정
     댓글정지, 계정정지 수정시 정의된값넣기

-->
