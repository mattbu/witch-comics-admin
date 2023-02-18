<template>
  <div>
    <b-button
      pill
      :variant="bgColor === 'google' ? `outline-${bgColor}` : bgColor"
      :class="`social-login-btn ${bgColor}`"
      @click="$emit('social-login', bgColor)"
    >
      <img :src="require(`@/assets/icons/social/${imgSrc}`)" class="w-100" alt="">
    </b-button>
  </div>
</template>

<script>
export default {
  name: 'UiSocialLoginButton',
  props: {
    imgSrc: { type: String, required: true },
    bgColor: { type: String, required: true }
  },
  data () {
    return {
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {}
}
</script>

<style scoped lang="scss">
.social-login-btn {
  width: 48px;
  height: 48px;
  overflow: hidden;
  &:not(&.google) {
    border: none;
  }
  &.facebook, &.payco {
    img {
      transform: scale(0.9);
    }
  }
  &.payco {
    img {
      margin-left: 1.5px;
    }
  }
  &.google {
    img {
      transform: scale(1.2);
    }
  }
}
</style>
