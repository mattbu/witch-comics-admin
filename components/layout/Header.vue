<template>
  <b-navbar toggleable="md" type="light" class="layout-header fixed-top">
    <b-navbar-brand to="/" class="logo">
      <img src="@/assets/icons/logoA.svg" alt="">
    </b-navbar-brand>

    <b-navbar-nav class="ml-auto flex-row">
      <!--      <b-nav-item-->
      <!--        to="/auth/login"-->
      <!--        class=""-->
      <!--        link-classes="text-primary"-->
      <!--      >-->
      <!--        로그인-->
      <!--      </b-nav-item>-->
      <b-button v-b-modal.logout-confirm variant="transparent" class="text-primary">
        로그아웃
      </b-button>
      <b-button variant="transparent" to="/setting/info">
        <b-icon variant="primary" icon="gear" aria-hidden="true" />
      </b-button>
    </b-navbar-nav>
    <UiLoginConfirm
      modal-id="logout-confirm"
      modal-size="md"
      @click-ok="logout"
    >
      <template #contents>
        <h5 class="text-center">
          로그아웃 하시겠습니까?
        </h5>
      </template>
    </UiLoginConfirm>
  </b-navbar>
</template>

<script>

export default {
  name: 'LayoutHeader',
  data () {
    return {
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {
    logout () {
      this.$store.dispatch('logout')
      this.$router.push('/auth/login')
    }
  }
}
</script>
