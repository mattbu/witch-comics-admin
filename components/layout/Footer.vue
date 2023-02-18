<template>
  <b-container fluid class="footer">
    <b-container>
      <b-row align-h="center">
        <b-col cols="6" class="text-left">
          <b-button
            ref="info-toggle"
            v-b-toggle.info
            variant="transparent"
            class="collapse-toggle-btn"
          >
            (주)서울미디어코믹스 사업자 정보
            <img src="@/assets/icons/footer/caret-up.svg" alt="" class="caret-icon">
          </b-button>

          <b-collapse id="info" class="mt-3 fs-14">
            <b-container>
              <b-row>
                <b-col cols="auto">
                  대표자 : 오태엽
                </b-col>
                <b-col cols="auto">
                  사업자 등록번호 : 159-81-01014
                </b-col>
              </b-row>
              <b-row class="my-3">
                <b-col cols="auto">
                  통신판매업 신고번호 : 제 2018-서울용산-0270호
                </b-col>
              </b-row>
              <b-row class="my-3">
                <b-col cols="auto">
                  이메일 : mcomics@iseoulmedia.com
                </b-col>
                <b-col cols="auto">
                  고객문의 : 02)3278-5553
                </b-col>
              </b-row>
              <b-row>
                <b-col cols="auto">
                  서울특별시 용산구 한강대로 43길 5
                </b-col>
              </b-row>
            </b-container>
          </b-collapse>
        </b-col>
        <b-col cols="12">
          <b-row align-h="center" class="py-4">
            <b-col v-for="(link, index) in footerLinks" :key="`footer-link-${index}`" cols="auto">
              <NuxtLink :to="link.to" :target="link.target ? '_blank' : '_self'" class="text-dark fs-12 font-weight-500">
                {{ link.name }}
              </NuxtLink>
            </b-col>
          </b-row>
          <b-row>
            <b-col class="text-center text-dark fs-12 font-weight-500">
              ©SEOUL MEDIA COMICS. Corp.
            </b-col>
          </b-row>
        </b-col>
      </b-row>
    </b-container>
  </b-container>
</template>

<script>
export default {
  name: 'LayoutFooter',
  data () {
    return {
      footerLinks: [
        { name: '사업자 정보확인', to: '#', target: true },
        { name: '개인정보보호정책', to: '#', target: false },
        { name: '이용약관', to: '#', target: false },
        { name: '공지사항', to: '#', target: false }
      ]
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {}
}
</script>
