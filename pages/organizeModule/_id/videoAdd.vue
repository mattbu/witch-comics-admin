<template>
  <b-container fluid class="page-min-height py-3">
    <UiPageTitle title="동영상 모듈 설정" :breadcrumb="breadcrumb">
      <template #buttons>
        <b-button variant="primary" @click="addVideo">
          등록
        </b-button>
      </template>
    </UiPageTitle>
    <hr>
    <b-row class="mt-4">
      <b-col align-self="center">
        <h6 class="font-weight-bold">
          동영상 모듈 ({{ moduleType === 1 ? '일반' : '성인' }})
        </h6>
      </b-col>
    </b-row>
    <b-row class="mt-2">
      <b-col cols="12">
        <table class="table border mb-4 table-layout-fixed">
          <colgroup>
            <col style="width: 15%">
            <col>
            <col style="width: 10%">
            <col>
          </colgroup>
          <tbody>
            <tr>
              <th>제목 입력*</th>
              <td colspan="3">
                <b-form-input
                  v-model="form.title"
                  placeholder="제목을 입력해주세요."
                  class="w-30"
                />
              </td>
            </tr>
            <tr>
              <th>노출 여부*</th>
              <td colspan="3">
                <b-form-group>
                  <b-form-radio-group
                    v-model="form.isShow"
                    :options="showOptions"
                  />
                </b-form-group>
              </td>
            </tr>
            <tr>
              <th>영상 선택</th>
              <td colspan="3">
                <b-button
                  variant="outline-secondary"
                  class="table-inner-btn"
                  @click="openModal('search-video-modal')"
                >
                  선택
                </b-button>
                <template v-if="form.movieId">
                  <div class="mt-2">
                    <b-badge pill class="b-form-tag d-inline-flex">
                      <span class="align-self-center">{{ currentVideo }}</span>
                      <b-button
                        variant="transparent"
                        class="p-0 align-self-center"
                        @click="removeVideo"
                      >
                        <b-icon
                          variant="white"
                          icon="x"
                          font-scale="1.2"
                          class="ml-1"
                        />
                      </b-button>
                    </b-badge>
                  </div>
                </template>
              </td>
            </tr>
          </tbody>
        </table>
      </b-col>
    </b-row>

    <!-- 동영상 모듈(일반) 모달 -->
    <SearchVideoModal @select-video="selectVideo" />
  </b-container>
</template>

<script>
export default {
  name: 'VideoModuleAddPage',
  data () {
    return {
      moduleType: null,
      form: {
        title: '',
        isShow: 'y',
        movieId: null
      },
      currentVideo: '',
      showOptions: [
        { text: '노출', value: 'y' },
        { text: '비노출', value: 'n' }
      ]
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
        { label: '동영상 모듈 설정', url: this.$route.fullPath }
      ]
      return arr
    }
  },
  watch: {},
  created () {
    if (
      this.$route.query.type === 'webtoon' &&
      this.$route.query.rate === 'all'
    ) {
      this.moduleType = 1
    } else if (
      this.$route.query.type === 'webtoon' &&
      this.$route.query.rate === 'adult'
    ) {
      this.moduleType = 3
    } else if (
      this.$route.query.type === 'novel' &&
      this.$route.query.rate === 'all'
    ) {
      this.moduleType = 2
    } else if (
      this.$route.query.type === 'novel' &&
      this.$route.query.rate === 'adult'
    ) {
      this.moduleType = 4
    }
  },
  mounted () {},
  methods: {
    removeVideo () {
      this.form.movieId = null
      this.currentVideo = ''
    },
    selectVideo (data) {
      this.form.movieId = data.id
      this.currentVideo = data.title
    },
    async getDetail () {
      this.isLoading = true
      try {
        const {
          status,
          data: { data }
        } = await this.$axios.get(
          `/api/manager/schedule/mdetail/${this.moduleType}`
        )

        if (status === 200) {
          console.log(data)
          this.form = data
          if (data.currentVideo) {
            this.currentVideo = data.currentVideo
          } else {
            this.currentVideo = ''
          }
        }
      } catch (e) {
        console.log(e)
      } finally {
        this.isLoading = false
      }
    },
    async addVideo () {
      try {
        const { status } = await this.$axios.put(
          `/api/manager/schedule/update/m/${this.$route.params.id}`,
          this.form
        )
        if (status === 200) {
          alert('등록이 완료 되었습니다.')

          if (
            this.$route.query.type === 'webtoon' &&
            this.$route.query.rate === 'all'
          ) {
            await this.$router.push('/organizeModule/webComic?type=all')
          } else if (
            this.$route.query.type === 'webtoon' &&
            this.$route.query.rate === 'adult'
          ) {
            await this.$router.push('/organizeModule/webComic?type=adult')
          } else if (
            this.$route.query.type === 'novel' &&
            this.$route.query.rate === 'all'
          ) {
            await this.$router.push('/organizeModule/novelHome?type=all')
          } else if (
            this.$route.query.type === 'novel' &&
            this.$route.query.rate === 'adult'
          ) {
            await this.$router.push('/organizeModule/novelHome?type=adult')
          }
        }
      } catch (err) {
        alert('등록되지 않았습니다. 다시 시도해보십시오.')
      }
    },
    openModal (id) {
      this.$root.$emit('bv::show::modal', id)
    }
  }
}
</script>
