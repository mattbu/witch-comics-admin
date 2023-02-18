<template>
  <b-container fluid class="page-auth py-5">
    <b-row align-h="center" class="py-3 mt-5">
      <b-col cols="6" lg="4" class="witch-box-shadow px-4 py-4 text-center">
        <img src="@/assets/icons/logoA.svg" alt="">
        <span class="font-weight-700 ml-1">관리자 페이지</span>
      </b-col>
    </b-row>
    <b-row align-h="center" align-v="center">
      <b-col
        cols="6"
        lg="4"
        class="witch-box-shadow px-4 py-5"
        align-self="center"
      >
        <b-container fluid="md">
          <b-row tag="form" class="py-4" @submit.prevent="login">
            <b-col>
              <b-form-group
                label="아이디"
                label-class="witch-input-label"
                class="mb-4"
              >
                <b-form-input
                  ref="username"
                  v-model="loginForm.email"
                  class="witch-input witch-input-white"
                  placeholder="아이디를 입력해주세요."
                  trim
                  :class="
                    checkEmail === false
                      ? 'is-invalid'
                      : checkEmail === true
                        ? 'is-valid'
                        : ''
                  "
                />
              </b-form-group>
              <b-form-group
                label="비밀번호"
                label-class="witch-input-label"
                class="mb-3"
              >
                <b-form-input
                  ref="password"
                  v-model="loginForm.password"
                  type="password"
                  class="witch-input witch-input-white"
                  placeholder="비밀번호를 입력해주세요."
                  trim
                  :class="
                    checkPassword === false
                      ? 'is-invalid'
                      : checkPassword === true
                        ? 'is-valid'
                        : ''
                  "
                />
              </b-form-group>
              <b-button
                type="submit"
                variant="primary"
                size="lg"
                class="w-100 mt-3"
              >
                로그인
              </b-button>
            </b-col>
          </b-row>
        </b-container>
      </b-col>
    </b-row>
  </b-container>
  <!--  <b-row class="mb-3">-->
  <!--    <b-col>-->
  <!--      <b-form @submit.prevent="login">-->
  <!--        <b-form-group>-->
  <!--          <b-form-input-->
  <!--            v-model="loginForm.email"-->
  <!--            type="text"-->
  <!--            placeholder="이메일"-->
  <!--            :class="checkEmail === false ? 'is-invalid' : checkEmail === true ? 'is-valid' : ''"-->
  <!--          />-->
  <!--          <b-form-invalid-feedback>이메일을 올바른 형식으로 입력해 주세요.</b-form-invalid-feedback>-->
  <!--        </b-form-group>-->

  <!--        <b-form-group>-->
  <!--          <b-form-input-->
  <!--            v-model="loginForm.password"-->
  <!--            type="password"-->
  <!--            placeholder="비밀번호"-->
  <!--            :class="checkPassword === false ? 'is-invalid' : checkPassword === true ? 'is-valid' : ''"-->
  <!--          />-->
  <!--          <b-form-invalid-feedback>비밀번호 형식이 올바르지 않습니다.</b-form-invalid-feedback>-->
  <!--        </b-form-group>-->

  <!--        <b-form-checkbox v-model="persistLogin" class="mt-5 mb-3">-->
  <!--          로그인 상태 유지-->
  <!--        </b-form-checkbox>-->
  <!--        <b-button type="submit" class="w-100" variant="primary">-->
  <!--          로그인-->
  <!--        </b-button>-->
  <!--      </b-form>-->
  <!--    </b-col>-->
  <!--  </b-row>-->
  <!--  <b-row align-h="between">-->
  <!--    <b-col cols="auto">-->
  <!--      <NuxtLink to="/auth/signup/agreement">-->
  <!--        이메일 회원가입-->
  <!--      </NuxtLink>-->
  <!--    </b-col>-->
  <!--    <b-col cols="auto">-->
  <!--      <NuxtLink to="/auth/forgot">-->
  <!--        비밀번호 찾기-->
  <!--      </NuxtLink>-->
  <!--    </b-col>-->
  <!--  </b-row>-->
</template>

<script>
import { validateForm } from '@/plugins/mixins'

export default {
  name: 'LoginPage',
  mixins: [validateForm],
  data () {
    return {
      checkEmail: null,
      checkPassword: null,
      loginForm: {
        email: '',
        password: ''
      },
      persistLogin: false,
      socialButtons: [
        { variant: 'naver', src: 'naver.svg' },
        { variant: 'kakao', src: 'kakao.svg' },
        { variant: 'payco', src: 'payco.svg' },
        { variant: 'facebook', src: 'facebook.svg' },
        { variant: 'google', src: 'google.svg' }
      ]
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {
    console.log(process.env)
  },
  methods: {
    passwordValidation () {
      const pwReg =
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,10}$/

      if (!this.loginForm.password.length) {
        return null
      } else if (!pwReg.test(this.loginForm.password)) {
        return false
      }
      return true
    },
    async login () {
      try {
        const {
          data: { data }
        } = await this.$axios.post('/api/manager/login', {
          email: this.loginForm.email,
          password: this.loginForm.password
        })
        if (data.result) {
          await this.$store.dispatch('setToken', data.data)
          await this.$router.push('/user/list')
        } else {
          alert(data.resultMessage)
        }
      } catch (err) {
        alert('아이디와 비밀번호를 확인해 주세요.')
        console.log(err)
      }

      // this.checkEmail = this.emailValidation(this.loginForm.email)
      // this.checkPassword = this.passwordValidation()
      //
      // if (this.checkEmail && this.checkPassword) {
      //   console.log('로그인')
      // }
    }
  }
}
</script>
