<template>
  <b-container fluid class="page-min-height py-3">
    <!-- <UiPageTitle
      :title="!$route.params.editionId ? '회차 목록' : '회차 정보'"
      :breadcrumb="breadcrumb"
    > -->
    <UiPageTitle v-if="!$route.params.editionId" :title="setPageTitle()" :breadcrumb="breadcrumb">
      <template #buttons>
        <template
          v-if="!$route.params.editionId && !$route.path.includes('notice') && !$route.path.includes('issue')"
        >
          <b-button
            variant="primary"
            :to="`/content/piece/${$route.params.id}/add-en-bloc`"
          >
            일괄 등록
          </b-button>
          <b-button
            variant="primary"
            :to="`/content/piece/${$route.params.id}/add-edition?menucode=${pieceInfo.menucode}`"
          >
            회차 등록
          </b-button>
          <b-button
            variant="primary"
            :to="`/content/piece/${$route.params.id}/edit`"
          >
            작품 수정
          </b-button>
        </template>
        <template
          v-else-if="!$route.params.editionId && $route.path.includes('notice')"
        >
          <b-button variant="primary" :to="`/content/piece/noticeAdd?id=${$route.params.id}`">
            공지사항 등록
          </b-button>
        </template>
      </template>
    </UiPageTitle>
    <b-row v-if="!$route.params.editionId" class="mt-3">
      <b-col>
        <b-button-group class="w-100">
          <b-button
            :to="`/content/piece/${$route.params.id}/edition`"
            :variant="
              !$route.path.includes('notice') && !$route.path.includes('issue') ? 'primary' : 'outline-primary'
            "
          >
            회차목록
          </b-button>
          <b-button
            :to="`/content/piece/${$route.params.id}/edition/notice`"
            :variant="
              $route.path.includes('notice') ? 'primary' : 'outline-primary'
            "
          >
            공지사항
          </b-button>
          <b-button
            :to="`/content/piece/${$route.params.id}/edition/issue`"
            :variant="
              $route.path.includes('issue') ? 'primary' : 'outline-primary'
            "
          >
            이슈사항
          </b-button>
        </b-button-group>
      </b-col>
    </b-row>
    <b-row>
      <b-col class="px-0">
        <transition
          name="slide-left"
          mode="out-in"
          enter-active-class="slide-left-enter-active"
        >
          <NuxtChild :keep-alive="false" />
        </transition>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: 'ContentPieceEditionParent',
  data () {
    return {
      pieceInfo: {
        menucode: ''
      }
    }
  },
  computed: {
    breadcrumb () {
      let arr
      if (!this.$route.params.editionId) {
        arr = [
          { label: '홈', url: '/' },
          { label: '콘텐츠 관리', url: '#' },
          { label: this.setPageTitle(), url: this.$route.path }
        ]
      }
      return arr
    }
  },
  watch: {},
  mounted () {
    this.getInfo()
  },
  methods: {
    async getInfo () {
      this.isInfoLoading = true
      try {
        const { status, data: { data } } = await this.$axios.get(`/api/cartoon/contents/sub/base/${this.$route.params.id}`)
        if (status === 200) {
          this.pieceInfo = data
        }
      } catch (e) {
        console.log(e)
      } finally {
        this.isInfoLoading = false
      }
    },
    setPageTitle () {
      if (this.$route.fullPath.includes('notice')) {
        return '공지사항 목록'
      } else if (this.$route.fullPath.includes('issue')) {
        return '이슈사항 목록'
      } else if (this.$route.params.editionId) {
        return '회차 수정'
      } return '회차 목록'
    }
  }
}
</script>

<style scoped lang="scss">
.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  transition-duration: 0.5s;
  transition-property: height, opacity, transform;
  transition-timing-function: cubic-bezier(0.55, 0, 0.1, 1);
  overflow: hidden;
}

.slide-left-enter,
.slide-right-leave-active {
  opacity: 0;
  transform: translate(2em, 0);
}

.slide-left-leave-active,
.slide-right-enter {
  opacity: 0;
  transform: translate(-2em, 0);
}
</style>
