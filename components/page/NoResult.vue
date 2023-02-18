<template>
  <div class="mt-5">
    <h4>{{ description }}</h4>
  </div>
</template>

<script>
export default {
  name: 'PageNoResult',
  props: {
    description: { type: String, required: false, default: '조회 가능한 데이터가 없습니다.' }
  },
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>
