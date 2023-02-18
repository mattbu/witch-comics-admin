<template>
  <b-button
    :id="targetId"
    class="tooltip-btn"
    pill
    :variant="variant"
  >
    <span>?</span>
  </b-button>
</template>

<script>
export default {
  name: 'UiTooltipButton',
  props: {
    targetId: { type: String, required: true },
    variant: { type: String, required: false, default: 'primary' }
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
