<template>
  <div class="d-flex">
    <div ref="group" class="defaultPlaceholder-wrap" @click="setHashtags">
      <p v-if="helpVisible" class="help">
        {{ defaultPlaceholder }}
      </p>

      <!-- Hashtags -->
      <div v-if="!helpVisible" class="tags-wrap">
        <input
          ref="inputTags"
          type="text"
          class="tags-box"
          @keydown.backspace.prevent="deleteTag(focusIndex)"
          @keydown.delete.prevent="deleteTag(focusIndex)"
        >
        <b-badge
          v-for="(row, index) in tags"
          :key="index"
          pill
          variant="steal"
          class="d-inline-flex align-items-center tag"
          :class="{ active: row.select }"
          @click="selectTag(index)"
        >
          {{ row.value }}
          <b-button variant="transparent" class="p-0 ml-3 d-flex">
            <b-icon
              variant="dark"
              icon="x"
              font-scale="1.2"
              @click="deleteTag"
            />
          </b-button>
        </b-badge>
      </div>
      <!--// Hashtags -->

      <div v-show="!helpVisible" class="itags-wrap2">
        <input
          ref="input"
          v-model.trim="value"
          type="text"
          placeholder="관련 작품 설명을 입력해주세요."
          @focus="initSelect"
          @keydown.enter.prevent="addHashTags"
          @keydown.backspace="initErrorMsg"
          @keydown.delete="initErrorMsg"
        >
      </div>

      <p v-if="errorMsg" class="wran-wrap">
        {{ errorMsg }}
      </p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PieceNameHashtags',
  props: ['placeholder'],
  data () {
    return {
      defaultPlaceholder: this.placeholder
        ? this.placeholder
        : '관련 작품 설명을 입력해주세요.',
      errorMsg: null,
      focusIndex: null,
      helpVisible: true,
      tags: [],
      value: ''
    }
  },
  mounted () {},
  methods: {
    setVisible () {
      return (this.helpVisible = false)
    },
    async setHashtags () {
      if (this.tags.length > 0) {
        return
      }

      const result = await this.setVisible()

      if (!result) {
        this.$refs.input.focus()
      }
    },

    addTag () {
      this.tags.push({ value: this.value, select: false })
      return true
    },

    buttonAddTag () {
      this.tags.push({ value: this.value, select: false })
      return true
    },

    selectTag (idx) {
      if (this.tags.some(tag => tag.select)) {
        this.unselectTag()
      }

      this.tags[idx].select = !this.tags[idx].select

      if (!this.tags[idx].select) {
        this.initSelectIndex()
        return
      }

      this.$refs.fake.focus()
      this.focusIndex = idx
    },
    deleteTag (idx) {
      if (idx === null) {
        return
      }

      this.initSelectIndex()
      this.tags.splice(idx, 1)
    },

    initSelect () {
      if (!this.tags.some(tag => tag.select)) {
        return
      }

      this.unselectTag()
      this.initSelectIndex()
    },
    initSelectIndex () {
      this.focusIndex = null
    },
    initErrorMsg () {
      this.errorMsg = null
    },
    validate () {
      if (this.tags.some(tag => tag.value === this.value)) {
        return '중복된 단어를 입력하셨습니다.'
      }

      return false
    },
    async addHashTags (event) {
      if (event.target.value === '') {
        this.initErrorMsg()
        event.target.focus()
        return
      }
      const resultMsg = await this.validate()
      if (resultMsg) {
        this.errorMsg = resultMsg
        this.$refs.input.focus()
        return
      }

      await this.addTag()

      this.errorMsg = null
      this.value = null
      this.$refs.input.focus()
    }
  }
}
</script>

<style lang="scss" scoped>
.defaultPlaceholder-wrap {
  position: relative;
  padding: 5px 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  text-align: left;
  box-sizing: border-box;

  .wran-wrap {
    position: absolute;
    left: 0;
    top: 100%;
    margin-top: 5px;
    padding: 0 5px;
    color: red;
    text-align: left;
    line-height: 2;
  }

  .tags-wrap {
    position: relative;
    overflow: hidden;
    display: inline-block;
    vertical-align: top;
    margin-bottom: -6px;

    .tags-box {
      position: absolute;
      width: 1px;
      height: 1px;
      left: -1px;
      right: -1px;
      padding: 0;
      border: 0;
      outline: none;
      -webkit-appearance: none;
      -webkit-text-size-adjust: none;
    }
    .tag {
      display: inline-block;
      position: relative;
      margin: 0 5px 6px 0;
      padding: 0 5px;
      line-height: 30px;
      background-color: #eee;
      vertical-align: top;
      word-wrap: break-word;
      word-break: break-all;
      text-align: left;
      &:hover:after {
        display: block;
        position: absolute;
        left: 0;
        top: 0;
        box-sizing: border-box;
        border: 1px solid #aaa;
        content: '';
      }

      &.active {
        background-color: #656565;
        color: #fff;
        &:hover:after {
          display: none;
        }
      }
    }
  }

  .itags-wrap2 {
    display: inline-block;
    overflow: hidden;
    vertical-align: top;

    &:before {
      display: inline;
      position: relative;
      top: -1px;
      content: '';
      color: #3e3e3e;
      margin-right: 2px;
      vertical-align: top;
      line-height: 30px;
    }

    input {
      width: 135px;
      height: 28px;
      vertical-align: top;
      color: #3e3e3e;
      -webkit-appearance: none;
      -webkit-text-size-adjust: none;
      padding: 0;
      border: 0;
      outline: none;
      vertical-align: top;
    }
  }
}
</style>
