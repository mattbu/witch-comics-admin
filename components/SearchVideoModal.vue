<template>
  <b-modal
    id="search-video-modal"
    title="영상 검색"
    ok-only
    ok-title="등록"
    centered
    scrollable
    size="lg"
    @ok="selectVideo"
  >
    <b-row class="px-3">
      <b-col md="12" class="my-2">
        <b-form class="d-flex" @submit.prevent="getList">
          <b-form-input v-model="title" placeholder="검색" class="w-75" />
          <b-button type="submit" variant="primary" class="ml-2">
            검색
          </b-button>
        </b-form>
      </b-col>
    </b-row>
    <b-row class="mt-3 px-3">
      <b-col lg="12" class="my-2">
        <table class="table border mb-0 table-layout-fixed center-box">
          <colgroup>
            <col style="width: 15%">
            <col>
            <col style="width: 10%">
            <col>
          </colgroup>
        </table>
      </b-col>
    </b-row>
    <b-row class="mt-3 px-3">
      <b-col lg="12" class="my-1">
        <p class="font-weight-700 my-1">
          영상 목록
        </p>
        <b-table
          class="list"
          :items="videoList"
          :fields="fields"
          stacked="md"
          :busy="isLoading"
          show-empty
          small
        >
          <template #empty>
            <h4 class="mt-4">
              조회 가능한 데이터가 없습니다.
            </h4>
          </template>
          <template #table-busy>
            <div class="text-center text-danger my-4">
              <b-spinner variant="primary" class="align-middle" />
              <span class="ml-3">데이터를 불러오고 있습니다.</span>
            </div>
          </template>
          <template #cell(check)="data">
            <b-form-radio v-model="currentVideo" :value="data.item" />
          </template>
          <template #cell(title)="data">
            {{ data.value ? data.value : '-' }}
          </template>
          <template #cell(buttonTitle)="data">
            {{ data.value ? data.value : '-' }}
          </template>
          <template #cell(cartoon)="data">
            {{ data.value ? data.value : '-' }}
          </template>
          <template #cell(isShow)="data">
            {{ data.value === 'y' ? '노출' : data.value === 'n' ? '비노출' : '-' }}
          </template>
        </b-table>
      </b-col>
    </b-row>
  </b-modal>
</template>

<script>
export default {
  name: 'SearchVideoModal',
  data () {
    return {
      title: '',
      isLoading: false,
      videoList: [],
      currentPage: 1,
      perPage: 20,
      fields: [
        { key: 'check', label: '' },
        { key: 'title', label: '제목' },
        { key: 'buttonTitle', label: '버튼 타이틀' },
        { key: 'cartoon', label: '작품' },
        { key: 'isShow', label: '노출 여부' }
      ],
      currentVideo: {}
    }
  },
  methods: {
    selectVideo (e) {
      if (this.currentVideo.id) {
        this.$emit('select-video', this.currentVideo)
        this.videoList = []
        this.title = ''
        this.currentVideo = {}
      } else {
        e.preventDefault()
        alert('영상을 선택해 주세요.')
      }
    },
    async getList () {
      this.isLoading = true

      try {
        const {
          data: { data }
        } = await this.$axios.get('/api/manager/schedule/movie/search', {
          params: {
            title: this.title
          }
        })
        console.log(data)
        this.videoList = data.splice(0, 20)
        this.title = ''
        this.isLoading = false
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>
