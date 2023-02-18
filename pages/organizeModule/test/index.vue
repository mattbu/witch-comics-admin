<template>
  <div>
    <!-- 그라데이션 -->
    <div id="elzero-app">
      <div
        :style="{
          backgroundImage:
            'linear-gradient(' +
            // direction +
            // ' , ' +
            colorOne +
            ', ' +
            color +
            ')'
        }"
      >
        <div class="colorBox" />
      </div>
      <form action="" class="form-gra">
        <div class="form-group my-2">
          <b-form-input v-model="color" type="text" class="w-10" />
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  el: '#elzero-app',
  name: 'HomePage',
  data: function () {
    return {
      // direction: 'to left',
      colorOne: '#FFFFFF',
      color: ''
      // return {}
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {}
}
</script>

<style lang="scss" scoped>
.colorBox {
  width: 46px;
  height: 46px;
}
</style>
