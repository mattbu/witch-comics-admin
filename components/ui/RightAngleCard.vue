<template>
  <div>
    <div class="right-angle-card">
      <img :src="require(`@/assets/img/${imgSrc}`)" alt="">
      <div class="content-section">
        <b-badge v-if="isNew" variant="info" class="content-section-badge">
          NEW
        </b-badge>
        <h6 class="content-section-description mt-2">
          {{ description }}
        </h6>
        <h3 class="content-section-title">
          {{ title }}
        </h3>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'UiRightAngleCard',
  props: {
    title: { type: String, required: true },
    description: { type: String, required: true },
    imgSrc: { type: String, required: true },
    isNew: { type: Boolean, required: true }
  },
  data () {
    return {}
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {}
}
</script>

<style scoped lang="scss">
.right-angle-card {
  border: none;
  border-radius: 40px 40px 40px 0!important;
  //width: 100%;
  //height: 100%;
  //max-width: 460px;
  max-height: 314.67px;
  overflow: hidden;
  position: relative;
  img {
    width: 100%;
    //max-width: 460px;
    object-fit: contain;
  }
  .content-section {
    padding: 40px 24px;
    position: absolute;
    left: 0;
    bottom: 0;
    &-badge {
      padding: 6px 12px 6px 6px;
      border-radius: 2px;
      font-size: 10px;
      transform: scale(0.8);
      transform-origin: left;
      background: linear-gradient(-75deg, transparent 8px, var(--info) 10px);
    }
    &-title {
      color: var(--white);
      font: {
        size: 20px;
        weight: 700;
      }
    }
    &-description {
      color: var(--white);
      font: {
        size: 12px;
        weight: 500;
      }
    }
  }
}
</style>
