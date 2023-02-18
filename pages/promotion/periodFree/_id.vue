<template>
  <b-container fluid class="page-min-height pt-3 pb-5 mb-5">
    <UiPageTitle title="기간무료 상세" :breadcrumb="breadcrumb">
      <template #buttons>
        <b-button
          variant="outline-primary"
          @click="editDetail"
        >
          수정
        </b-button>
      </template>
    </UiPageTitle>
    <hr>
    <b-row class="mt-4">
      <b-col cols="12">
        <table class="table border mb-0 table-layout-fixed">
          <colgroup>
            <col style="width: 10%">
            <col>
            <col style="width: 10%">
            <col>
          </colgroup>
          <tbody class="text-center">
            <!-- 정보 -->
            <tr>
              <th>작품명</th>
              <td colspan="3">
                {{ periodInfo.title ? periodInfo.title : '-' }}
              </td>
              <th>작품 아이디</th>
              <td colspan="3">
                {{ periodInfo.id ? periodInfo.id : '-' }}
              </td>
              <th>작가명</th>
              <td colspan="3">
                {{ periodInfo.writer ? periodInfo.writer : '-' }}
              </td>
            </tr>
            <tr>
              <th>유형</th>
              <td colspan="3">
                {{ periodInfo.isBook ? periodInfo.isBook : '-' }}
              </td>
              <th>구분</th>
              <td colspan="3">
                {{ periodInfo.menucode === '1' ? '웹툰/만화' : periodInfo.menucode === '2' ? '소설' : '-' }}
              </td>
              <th>상태</th>
              <td colspan="3">
                {{ periodInfo.status ? periodInfo.status : '-' }}
              </td>
            </tr>
            <tr>
              <th>CP사</th>
              <td colspan="3">
                {{ periodInfo.cpName ? periodInfo.cpName : '-' }}
              </td>
              <th>장르</th>
              <td colspan="3">
                {{ periodInfo.genre ? periodInfo.genre : '-' }}
              </td>
              <th>연령등급</th>
              <td colspan="3">
                {{ periodInfo.rate ? periodInfo.rate : '-' }}
              </td>
            </tr>
            <tr>
              <th>연재일</th>
              <td colspan="3">
                {{
                  periodInfo.displayStartDate
                    ? periodInfo.displayStartDate
                    : '-'
                }}
              </td>
              <th>가격</th>
              <td colspan="3">
                {{ periodInfo.price ? `물약 ${periodInfo.price}개` : '-' }}
              </td>
              <th>무료회차수</th>
              <td colspan="3">
                {{ periodInfo.freeCnt ? `${periodInfo.freeCnt}화` : '-' }}
              </td>
            </tr>
          </tbody>
        </table>
      </b-col>
    </b-row>
    <b-row class="pt-5">
      <b-col align-self="center">
        <h6>무료전환 설정 정보</h6>
      </b-col>
    </b-row>
    <hr class="my-2">
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
                <template v-else>
                  <span class="fs-14 text-muted">작품을 먼저 선택해 주세요.</span>
                </template>
              </td>
            </tr>
            <th>시작일</th>
            <td colspan="3">
              <div class="d-inline-flex justify-content-between w-70">
                <div class="w-50 pr-2">
                  <label for="start-date" class="fs-14 mb-1">날짜*</label>
                  <b-form-datepicker
                    id="start-date"
                    v-model="form.startDate"
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
                      v-model="form.endDate"
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
  </b-container>
</template>
<script>
// import { timeOptions } from '@/plugins/mixins'

export default {
  name: 'PeriodFreeDetailPage',
  // mixins: [timeOptions],
  data () {
    return {
      isLoading: false,
      periodInfo: {},
      form: {},
      episodeList: [],
      selectedEpisode: []
    }
  },
  async fetch () {
    await this.getInfo()
    await this.getDetail()
  },
  computed: {
    breadcrumb () {
      const arr = [
        { label: '홈', url: '/' },
        { label: '프로모션 관리', url: '#' },
        { label: '기간무료 상세', url: this.$route.path }
      ]
      return arr
    }
  },
  watch: {
    selectedEpisode (val) {
      console.log(val)
    }
  },
  created () {},
  mounted () {
    // this.hoursOptions = this.getHours()
    // this.minutesOptions = this.getMinutes()
    // this.secondsOptions = this.getSeconds()
  },
  methods: {
    setForm () {
      this.form.episode = this.selectedEpisode.toString()
      delete this.form.id
      delete this.form.waitTime
    },
    async editDetail () {
      this.setForm()
      await console.log(this.form)
      try {
        const res = await this.$axios.put(`/api/manager/free/update/${this.$route.params.id}`, this.form)
        if (res.status === 200) {
          alert('수정이 완료 되었습니다.')
          await this.$router.push('/promotion/periodFree')
        }
      } catch (e) {
        console.log(e)
      }
    },
    // 상단
    async getInfo () {
      this.isLoading = true

      try {
        const { status, data: { data } } = await this.$axios.get(
          `/api/manager/free/detail/top/${this.$route.params.id}`
        )
        if (status === 200) {
          this.periodInfo = data
          if (data.id) {
            await this.getEpisodeList(data.id)
          }
        }
      } catch (e) {
        console.log(e)
      } finally {
        this.isLoading = false
      }
    },
    async getEpisodeList (id) {
      try {
        const { status, data: { data } } = await this.$axios.get(`/api/manager/free/sub/list/${id}`)

        if (status === 200) {
          this.episodeList = data
        }
      } catch (e) {
        console.log(e)
      }
    },
    async getDetail () {
      try {
        const { status, data: { data } } = await this.$axios.get(
            `/api/manager/free/detail/${this.$route.params.id}`
        )
        if (status === 200) {
          console.log(data)
          this.form = data
          this.selectedEpisode = data.episode.split(',').map(id => parseInt(id))
          if (data.startDate) {
            this.form.startDate = data.startDate.split('T')[0]
          }
          if (data.endDate) {
            this.form.endDate = data.endDate.split('T')[0]
          }
        }
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>
