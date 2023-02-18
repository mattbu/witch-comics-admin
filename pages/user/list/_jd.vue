<template>
  <b-container v-if="userData" fluid class="page-min-height py-3">
    <UiPageTitle title="회원 상세 정보" :breadcrumb="breadcrumb">
      <template #buttons>
        <b-button variant="outline-primary" to="/user/list">
          이전
        </b-button>
        <b-button
          variant="outline-primary"
          :to="{path: `/user/list/edit`,query: { id: userId, email:$route.params.jd} }"
        >
          수정
        </b-button>
      </template>
    </UiPageTitle>
    <hr>
    <b-row class="mb-3">
      <b-col cols="auto" class="font-weight-700" align-self="center">
        <p>{{ $route.params.jd }}</p>
      </b-col>
      <b-col align-self="center" class="px-0">
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
              <th>닉네임</th>
              <td>{{ userData.nick || '-' }}</td>
              <th>최근 접속일</th>
              <td>
                {{ userData.loginDate ? dateFormatting(userData.loginDate.slice(0, 10), '.') : '-' }}
                ({{
                  userData.loginDate ? userData.loginDate.slice(11, 19) : ''
                }})
              </td>
            </tr>
            <tr>
              <th>가입일</th>
              <td>
                {{ dateFormatting(userData.createdAt, '.') || '-' }}
              </td>
              <th>등급</th>
              <td>{{ userData.degree || '-' }}</td>
              <th>마케팅정보 수신 동의</th>
              <td>
                <b-form-checkbox
                  v-model="agreeMarketing"
                  disabled
                >
                  설정({{ dateFormatting(userData.agreeAt, '.') }})
                </b-form-checkbox>
              </td>
            </tr>
            <tr>
              <th>댓글 정지</th>
              <td colspan="2" class="text-left">
                <b-form-checkbox v-model="userData.is_reply" disabled>
                  설정
                </b-form-checkbox>
              </td>
              <th>계정 정지</th>
              <td colspan="2" class="text-left">
                <b-form-checkbox v-model="userData.state" disabled>
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
                <span v-if="typeof userData.totalAmount === 'number'">
                  {{ userData.totalAmount }}원
                </span>
                <span v-else>-</span>
              </td>
              <th>보유물약</th>
              <td>
                <span v-if="typeof userData.coin === 'number'">
                  {{ userData.coin }}개
                </span>
                <span v-else>-</span>
              </td>
              <th>보유호박</th>
              <td>
                <span v-if="typeof userData.point === 'number'">
                  {{ userData.point }}개
                </span>
                <span v-else>-</span>
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
              <td>
                <span>{{ userData.adultAt ? 'Y' : 'N' }}</span>
                <span>({{ dateFormatting(userData.adultAt, '.') }})</span>
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
    <h2 class="fs-24 font-weight-bold mb-3 mt-5">
      서비스 이용내역
    </h2>
    <hr class="my-2">
    <PageUserServiceHistory />
  </b-container>
</template>

<script>

export default {
  name: 'UserDetailPage',
  components: {},

  data () {
    return {
      isLoading: true,
      userId: this.$route.query.id,
      userData: null
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
        { label: '회원 상세 정보', url: this.$route.path }
      ]
      return arr
    }
  },
  methods: {
    openModal (id) {
      this.$root.$emit('bv::show::modal', id)
    },
    async getData (userId) {
      this.isLoading = true
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
      } finally {
        this.isLoading = false
      }
    },
    moveEdit () {
    // :to="{
    //   path: `/user/list/edit/${data.item.email}`,
    //       query: { id: userId}
    // }"
    //   this.$router.push({ path: `/user/list/edit/${this.$route.params.jd}`, query: { id: this.userId } })
    }
  }
}
</script>
