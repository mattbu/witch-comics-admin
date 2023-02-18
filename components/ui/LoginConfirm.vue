<template>
  <div>
    <b-modal
      :id="modalId"
      :title="modalTitle"
      :size="modalSize"
      scrollable
      centered
      :cancel-title="cancelTitle"
      :ok-title="okTitle"
      hide-header-close
      @cancel="clickCancel"
      @ok="clickOk"
    >
      <slot name="contents" />
    </b-modal>
  </div>
</template>

<script>
export default {
  name: 'UiCenterModal',
  props: {
    modalId: { type: String, required: true },
    modalTitle: { type: String, required: false, default: '마녀코믹스' },
    modalSize: { type: String, required: false, default: 'lg' },
    cancelTitle: { type: String, required: false, default: '닫기' },
    okTitle: { type: String, required: false, default: '확인' }
  },
  methods: {
    clickCancel () {
      this.$emit('close')
      this.$bvModal.hide(this.modalId)
    },
    clickOk () {
      this.$emit('click-ok')
      this.clickCancel()
    }
  }
}
</script>
