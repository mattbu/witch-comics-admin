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
      no-close-on-esc
      :hide-header="hideHeader"
      :ok-only="okOnly"
      no-close-on-backdrop
      @ok="clickOk"
      @cancel="clickCancel"
    >
      <slot name="contents" />
      <!--      <div class="d-flex justify-content-center pb-3">-->
      <!--        <b-button class="" @click="clickCancel">-->
      <!--          {{ cancelTitle }}-->
      <!--        </b-button>-->
      <!--        <b-button class="ml-2" @click="clickOk">-->
      <!--          {{ okTitle }}-->
      <!--        </b-button>-->
      <!--      </div>-->
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
    okTitle: { type: String, required: false, default: '확인' },
    hideHeader: { type: Boolean, required: false, default: false },
    okOnly: { type: Boolean, required: false, default: false }
  },
  methods: {
    clickCancel () {
      this.$emit('close')
    },
    clickOk (e) {
      if (!this.okOnly) {
        e.preventDefault()
      }
      this.$emit('ok')
    }
  }
}
</script>
