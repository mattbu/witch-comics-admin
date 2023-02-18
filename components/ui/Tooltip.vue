<template>
  <div>
    <b-tooltip
      :class="textColor"
      :placement="placement"
      :target="target"
      :triggers="trigger"
      :variant="variant"
    >
      {{ description }}
    </b-tooltip>
  </div>
</template>

<script>
export default {
  name: 'UiTooltip',
  props: {
    textColor: { type: String, required: false, default: 'text-white' },
    placement: { type: String, required: false, default: 'right' },
    target: { type: String, required: true },
    trigger: { type: String, required: false, default: 'hover' },
    variant: { type: String, required: false, default: 'primary' },
    description: { type: String, required: true }
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
