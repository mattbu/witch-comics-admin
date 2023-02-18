<template>
  <b-container fluid class="page-min-height py-3">
    <UiPageTitle title="카드형 모듈 설정" :breadcrumb="breadcrumb">
      <template #buttons>
        <b-button variant="primary" @click="setCard">
          수정
        </b-button>
      </template>
    </UiPageTitle>
    <hr>
    <b-row class="mt-4">
      <b-col align-self="center">
        <h6 class="font-weight-bold">
          카드형 모듈 ({{ moduleType === '1' || moduleType === '3' ? '일반' : '성인' }})
        </h6>
      </b-col>
    </b-row>
    <b-row class="mt-2">
      <b-col cols="12">
        <table class="table border mb-0 table-layout-fixed">
          <colgroup>
            <col style="width: 15%">
            <col>
            <col style="width: 10%">
            <col>
          </colgroup>
          <tbody>
            <tr>
              <th>타이틀 입력*</th>
              <td colspan="3">
                <b-form-input
                  v-model="form.title"
                  type="text"
                  class="w-40"
                  placeholder="타이틀을 입력해주세요."
                />
              </td>
            </tr>

            <tr>
              <th>노출 여부</th>
              <td colspan="3">
                <b-form-group>
                  <b-form-radio-group
                    v-model="form.isShow"
                    :options="[
                      { text: '노출', value: 'y' },
                      { text: '미노출', value: 'n' }
                    ]"
                  />
                </b-form-group>
              </td>
            </tr>

            <tr>
              <th>작품 검색*</th>
              <td colspan="3">
                <b-button
                  variant="outline-primary"
                  class="table-inner-btn"
                  @click="openModal('search-a-cartoon-modal')"
                >
                  추가
                </b-button>
              </td>
            </tr>
            <tr>
              <th>작품 목록*</th>
              <td colspan="3">
                <template v-if="form.list && form.list.length > 0">
                  <vue-draggable
                    :list="form.list"
                    ghost-class="ghost"
                    class="row"
                  >
                    <b-col
                      v-for="(piece, idx) in form.list"
                      :key="`piece-${idx}`"
                      cols="2"
                      class="mt-3"
                    >
                      <div
                        class="add-thumbnail-wrapper"
                        :class="{ 'none cursor-pointer': !piece.image }"
                      >
                        <img
                          v-if="piece.image"
                          :src="piece.image"
                          class="preview cursor-pointer"
                          alt=""
                        >
                        <div
                          class="color-preview"
                          :style="{backgroundImage: `linear-gradient(to top,${piece.color},transparent 50%)`}"
                        />

                        <b-button
                          variant="transparent"
                          class="p-0 d-flex img-delete-btn cursor-pointer"
                          @click="removeListImg(idx)"
                        >
                          <b-icon
                            variant="dark"
                            icon="x"
                            font-scale="1.2"
                          />
                        </b-button>
                      </div>

                      <div class="d-flex align-items-center mt-2">
                        <b-form-input v-model="piece.color" type="color" />
                      </div>
                      <p class="text-center mt-1">
                        ({{ piece.id }})
                      </p>
                      <p class="text-center">
                        {{ piece.title }}
                      </p>
                    </b-col>
                  </vue-draggable>
                </template>
              </td>
            </tr>
          </tbody>
        </table>
      </b-col>
    </b-row>

    <!-- 작품 검색(search-piece-modal) -->
    <SearchACartoonModal :menu-code="moduleType" @on-save="selectPiece" />
  </b-container>
</template>

<script>
export default {
  name: 'CardModuleAddPage',
  data () {
    return {
      moduleType: '1',
      form: {
        list: []
      }
    }
  },
  async fetch () {
    await this.getDetail()
  },
  computed: {
    breadcrumb () {
      const arr = [
        { label: '홈', url: '/' },
        { label: '편성모듈', url: '#' },
        { label: '카드형 모듈 설정', url: this.$route.fullPath }
      ]
      return arr
    }
  },
  watch: {},
  created () {
    if (this.$route.query.type === 'webtoon' && this.$route.query.rate === 'all') {
      this.moduleType = '1'
    } else if (this.$route.query.type === 'webtoon' && this.$route.query.rate === 'adult') {
      this.moduleType = '3'
    } else if (this.$route.query.type === 'novel' && this.$route.query.rate === 'all') {
      this.moduleType = '2'
    } else if (this.$route.query.type === 'novel' && this.$route.query.rate === 'adult') {
      this.moduleType = '4'
    }
  },
  mounted () {},
  methods: {
    async getDetail () {
      try {
        const { status, data: { data } } = await this.$axios.get(`/api/manager/schedule/cdetail/${this.moduleType}`)

        if (status === 200) {
          if (data.length > 0) {
            this.form = data[0]
          } else {
            this.form = {
              list: []
            }
          }
        }
      } catch (e) {
        console.log(e)
      }
    },

    setForm () {
      this.form.editedList = this.form.list.map((item, idx) => {
        return {
          mainId: item.id,
          color: item.color,
          order: idx + 1
        }
      })
    },

    // 등록
    async setCard () {
      this.setForm()

      try {
        const { status } = await this.$axios.put(
          `/api/manager/schedule/update/c/${this.$route.params.id}`,
          {
            title: this.form.title,
            isShow: this.form.isShow,
            list: this.form.editedList
          }
        )
        if (status === 200) {
          alert('설정이 완료 되었습니다.')

          if (this.$route.query.type === 'webtoon' && this.$route.query.rate === 'all') {
            await this.$router.push('/organizeModule/webComic?type=all')
          } else if (this.$route.query.type === 'webtoon' && this.$route.query.rate === 'adult') {
            await this.$router.push('/organizeModule/webComic?type=adult')
          } else if (this.$route.query.type === 'novel' && this.$route.query.rate === 'all') {
            await this.$router.push('/organizeModule/novelHome?type=all')
          } else if (this.$route.query.type === 'novel' && this.$route.query.rate === 'adult') {
            await this.$router.push('/organizeModule/novelHome?type=adult')
          }
        }
      } catch (err) {
        alert('등록되지 않았습니다. 다시 시도해보십시오.')
      }
    },

    // 선택 작품
    async selectPiece (e) {
      try {
        const { data: { data } } = await this.$axios.get('/api/manager/schedule/preview/acartoon', {
          params: {
            ids: e
          }
        })

        const addedPiece = data.map((item) => {
          return {
            ...item,
            color: '#1C232F'
          }
        })
        console.log(addedPiece)
        if (this.form.list.length > 0) {
          this.form.list = [...this.form.list, ...addedPiece]
        } else {
          this.form.list = [...addedPiece]
        }
      } catch (e) {
        console.log(e)
      }
    },

    removeListImg (index) {
      if (this.form.list.length > 0) {
        this.form.list.splice(index, 1)
      }
    },

    openModal (id) {
      this.$root.$emit('bv::show::modal', id)
    }
  }
}
</script>
