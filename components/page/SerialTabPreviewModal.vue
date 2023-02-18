<template>
  <div>
    <b-modal
      v-model="detect"
      :title="modalTitle"
      :size="modalSize"
      scrollable
      centered
      :cancel-title="cancelTitle"
      hide-footer
      body-class="px-2 test"
      @hide="$emit('close-modal')"
    >
      <template #modal-header>
        <b-container fluid class="px-0">
          <b-row align-h="between">
            <b-col align-self="center" class="d-inline-flex">
              <h5 class="modal-title">
                {{ modalTitle }}
              </h5>
            </b-col>
            <b-col cols="auto" align-self="center">
              <b-button variant="primary" @click="$emit('close-modal')">
                {{ cancelTitle }}
              </b-button>
            </b-col>
          </b-row>
        </b-container>
      </template>
      <b-container fluid style="width: auto; overflow: scroll">
        <div
          v-for="(day, idx) in list"
          :key="`day2-${idx}`"
          class="mb-4 w-100"
        >
          <div class="d-inline-flex" style="min-height: 140px;">
            <span class="text-primary text-left align-self-center" style="width: 70px">
              {{ day.name }}
            </span>
            <template v-for="(content, index) in day.list">
              <div :key="`content-${index}`" class="mr-2">
                <div style="width: 100px;">
                  <div class="preview-thumbnail-wrapper none" />
                  <p class="fs-12 text-center mt-1">
                    {{ content.title }}
                  </p>
                </div>
              </div>
            </template>
          </div>
        </div>
      </b-container>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: 'WeekContentsPreviewModal',
  props: {
    detectModal: { type: Boolean, required: true },
    modalTitle: { type: String, required: false, default: '마녀코믹스' },
    modalSize: { type: String, required: false, default: 'lg' },
    cancelTitle: { type: String, required: false, default: '닫기' },
    contentsType: { type: String, required: true }
  },
  data () {
    return {
      detectAtModal: false,
      list: []
    }
  },
  computed: {
    detect: {
      get () {
        return this.detectModal
      },
      set (newVal) {
        this.detectAtModal = newVal
      }
    }
  },
  watch: {
    async detect (val) {
      if (val) {
        await this.getList()
      }
    }
  },
  methods: {
    async getList () {
      try {
        const { status, data: { data } } = await this.$axios.get(`/api/manager/series/preview/${this.contentsType}`)
        if (status === 200) {
          this.list = data
        }
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>

<style scoped lang="scss">
.preview-thumbnail-wrapper {
  width: 100%;
  height: 100px;
  //padding-top: 100%;
  //height: 0;
  //position: relative;
  &.none {
    border-radius: 0.25rem;
    background-color: #f2f2f2;
  }
  img {
    min-height: 100%;
    height: 100%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    object-fit: cover;
    width: 100px;
    border-radius: 0.25rem;
  }
}

.grid-container {
  display: grid;
  grid-template-columns: repeat(9, 1fr);
  .item {
    text-align: center;
    h6 {
      margin-bottom: 12px;
    }
    .preview-thumbnail-wrapper {
      padding-top: 100%;
      height: 0;
      position: relative;
      &.none {
        border-radius: 0.25rem;
        background-color: #f2f2f2;
      }
      img {
        min-height: 100%;
        height: 100%;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        object-fit: cover;
        width: 100px;
        border-radius: 0.25rem;
      }
    }
  }
}
</style>
