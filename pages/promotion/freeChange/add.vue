<template>
  <b-container fluid class="page-min-height py-3">
    <UiPageTitle title="무료전환 등록" :breadcrumb="breadcrumb">
      <template #buttons>
        <b-button variant="primary" @click="addFreeChange">
          등록
        </b-button>
      </template>
    </UiPageTitle>
    <hr>
    <b-row class="mt-4">
      <b-col cols="12">
        <table class="table border mb-0 table-layout-fixed">
          <colgroup>
            <col style="width: 15%">
            <col>
            <col style="width: 10%">
            <col>
          </colgroup>
          <tbody>
            <!-- 정보 -->
            <tr>
              <th>작품 검색</th>
              <td colspan="3">
                <b-button
                  ref="search-piece-btn"
                  variant="outline-secondary"
                  @click="openModal('search-single-piece-modal')"
                >
                  추가
                </b-button>
                <template v-if="form.cartoon_main_id.length > 0">
                  <div class="mt-2">
                    <b-badge pill class="b-form-tag d-inline-flex">
                      <span class="align-self-center">{{
                        currentWorkTitle
                      }}</span>
                      <b-button
                        variant="transparent"
                        class="p-0 align-self-center"
                        @click="removePiece"
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
            <tr>
              <th>무료전환 화수</th>
              <td colspan="3">
                <template v-if="episodeList.length > 0">
                  <div style="max-height: 400px; overflow-y: scroll">
                    <b-form-checkbox-group
                      v-model="selectedEpisode"
                      stacked
                    >
                      <b-form-checkbox
                        v-for="(ep, idx) in episodeList"
                        :key="`ep-${idx}`"
                        :value="ep.id"
                        :class="idx === 0 ? 'mt-0' : 'mt-2'"
                      >
                        {{ ep.title }}
                      </b-form-checkbox>
                    </b-form-checkbox-group>
                  </div>
                </template>
                저
              </td>
            </tr>
            <tr>
              <th>무료전환 시간</th>
              <td colspan="3">
                <div class="d-inline-flex">
                  <b-form-input v-model="form.wait_time" class="w-30" />
                  <span class="align-self-center ml-2">일</span>
                </div>
              </td>
            </tr>
            <th>시작일</th>
            <td colspan="3">
              <div class="d-inline-flex justify-content-between w-70">
                <div class="w-50 pr-2">
                  <label for="start-date" class="fs-14 mb-1">날짜*</label>
                  <b-form-datepicker
                    id="start-date"
                    v-model="form.start_date"
                    label-help=""
                    hide-header
                    placeholder="시작일 선택"
                    class="mb-2"
                    :date-format-options="{
                      year: 'numeric',
                      month: 'numeric',
                      day: 'numeric'
                    }"
                  />
                </div>
                <!--                <div class="w-25 pr-2">-->
                <!--                  <label for="start-hours">시간</label>-->
                <!--                  <b-form-select-->
                <!--                    id="start-hours"-->
                <!--                    v-model="form.startHours"-->
                <!--                    :options="hoursOptions"-->
                <!--                  />-->
                <!--                </div>-->
                <!--                <div class="w-25 pr-2">-->
                <!--                  <label for="start-minutes">분</label>-->
                <!--                  <b-form-select-->
                <!--                    id="start-minutes"-->
                <!--                    v-model="form.startMinutes"-->
                <!--                    :options="minutesOptions"-->
                <!--                  />-->
                <!--                </div>-->
                <!--                <div class="w-25 pr-2">-->
                <!--                  <label for="start-seconds">초</label>-->
                <!--                  <b-form-select-->
                <!--                    id="start-seconds"-->
                <!--                    v-model="form.startSeconds"-->
                <!--                    :options="secondsOptions"-->
                <!--                  />-->
                <!--                </div>-->
              </div>
            </td>
            <tr>
              <th>종료일</th>
              <td colspan="3">
                <div class="d-inline-flex justify-content-between w-70">
                  <div class="w-50 pr-2">
                    <label for="end-date" class="fs-14 mb-1">날짜*</label>
                    <b-form-datepicker
                      id="end-date"
                      v-model="form.end_date"
                      label-help=""
                      hide-header
                      placeholder="종료일 선택"
                      class="mb-2"
                      :date-format-options="{
                        year: 'numeric',
                        month: 'numeric',
                        day: 'numeric'
                      }"
                    />
                  </div>
                  <!--                  <div class="w-25 pr-2">-->
                  <!--                    <label for="end-hours">시간</label>-->
                  <!--                    <b-form-select-->
                  <!--                      id="end-hours"-->
                  <!--                      v-model="form.endHours"-->
                  <!--                      :options="hoursOptions"-->
                  <!--                    />-->
                  <!--                  </div>-->
                  <!--                  <div class="w-25 pr-2">-->
                  <!--                    <label for="end-minutes">분</label>-->
                  <!--                    <b-form-select-->
                  <!--                      id="end-minutes"-->
                  <!--                      v-model="form.endMinutes"-->
                  <!--                      :options="minutesOptions"-->
                  <!--                    />-->
                  <!--                  </div>-->
                  <!--                  <div class="w-25 pr-2">-->
                  <!--                    <label for="end-seconds">초</label>-->
                  <!--                    <b-form-select-->
                  <!--                      id="end-seconds"-->
                  <!--                      v-model="form.endSeconds"-->
                  <!--                      :options="secondsOptions"-->
                  <!--                    />-->
                  <!--                  </div>-->
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </b-col>
    </b-row>
    <!-- 작품 검색(search-piece-modal) -->
    <SearchSinglePieceModal
      @select-work="selectPiece"
    />
  </b-container>
</template>
<script>
// import { timeOptions } from '@/plugins/mixins'

export default {
  name: 'FreeChangeAddPage',
  // mixins: [timeOptions],
  data () {
    return {
      form: {
        cartoon_main_id: [], // 추가된 작품 ID
        episode: [], // 기간 무료는 회차 id로
        buy_type: 'A', // 이용권
        wait_time: '', // 무료 전환 시간
        start_date: '', // 시작일
        end_date: '' // 종료일
      },
      currentWorkTitle: '',
      isLoading: false,
      selectedEpisode: [],
      episodeList: []
    }
  },
  computed: {
    breadcrumb () {
      const arr = [
        { label: '홈', url: '/' },
        { label: '프로모션 관리', url: '#' },
        { label: '무료전환 등록', url: this.$route.path }
      ]
      return arr
    }
  },
  watch: {},
  created () {},
  mounted () {
    // this.hoursOptions = this.getHours()
    // this.minutesOptions = this.getMinutes()
    // this.secondsOptions = this.getSeconds()
  },
  methods: {
    setForm () {
      this.form.free_type = 'F'
      this.form.episode = this.selectedEpisode.toString()
    },
    async addFreeChange () {
      await this.setForm()

      try {
        const res = await this.$axios.post('/api/manager/free/regist', this.form)
        console.log(res)
        if (res.status === 200) {
          alert('등록이 완료 되었습니다.')
          await this.$router.push('/promotion/freeChange')
        }
      } catch (e) {
        console.log(e)
      }
    },
    async selectPiece (piece) {
      this.form.cartoon_main_id = [piece.id]
      this.currentWorkTitle = piece.name

      if (piece.id) {
        this.isLoading = true
        try {
          const { status, data: { data } } = await this.$axios.get(`/api/manager/free/sub/list/${piece.id}`)

          if (status === 200) {
            this.episodeList = data
          }
        } catch (e) {
          console.log(e)
        } finally {
          this.isLoading = false
        }
      }
    },
    removePiece () {
      this.form.cartoon_main_id = []
      this.currentWorkTitle = ''
      this.episodeList = []
    },
    openModal (id) {
      this.$root.$emit('bv::show::modal', id)
    }
  }
}
</script>
