<template>
  <b-container fluid class="page-min-height py-3">
    <UiPageTitle title="이따무 상세" :breadcrumb="breadcrumb">
      <template #buttons>
        <b-button variant="outline-primary" @click="editDetail">
          수정
        </b-button>
      </template>
    </UiPageTitle>
    <hr>
    <b-row class="mt-2">
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
                {{ itamuInfo.title ? itamuInfo.title : '-' }}
              </td>
              <th>작품 아이디</th>
              <td colspan="3">
                {{ itamuInfo.id ? itamuInfo.id : '-' }}
              </td>
              <th>작가명</th>
              <td colspan="3">
                {{ itamuInfo.writer ? itamuInfo.writer : '-' }}
              </td>
            </tr>
            <tr>
              <th>유형</th>
              <td colspan="3">
                {{ itamuInfo.isBook ? itamuInfo.isBook : '-' }}
              </td>
              <th>구분</th>
              <td colspan="3">
                {{ itamuInfo.menucode === '1' ? '웹툰/만화' : itamuInfo.menucode === '2' ? '소설' : '-' }}
              </td>
              <th>상태</th>
              <td colspan="3">
                {{ itamuInfo.status ? itamuInfo.status : '-' }}
              </td>
            </tr>
            <tr>
              <th>CP사</th>
              <td colspan="3">
                {{ itamuInfo.cpName ? itamuInfo.cpName : '-' }}
              </td>
              <th>장르</th>
              <td colspan="3">
                {{ itamuInfo.genre ? itamuInfo.genre : '-' }}
              </td>
              <th>연령등급</th>
              <td colspan="3">
                {{ itamuInfo.rate ? itamuInfo.rate : '-' }}
              </td>
            </tr>
            <tr>
              <th>연재일</th>
              <td colspan="3">
                {{
                  itamuInfo.displayStartDate ? itamuInfo.displayStartDate : '-'
                }}
              </td>
              <th>가격</th>
              <td colspan="3">
                {{ itamuInfo.price ? `물약 ${itamuInfo.price}개` : '-' }}
              </td>
              <th>무료회차수</th>
              <td colspan="3">
                {{ itamuInfo.freeCnt ? `${itamuInfo.freeCnt}화` : '-' }}
              </td>
            </tr>
          </tbody>
        </table>
      </b-col>
    </b-row>
    <b-row class="pt-5">
      <b-col align-self="center">
        <h6>이따무 설정 정보</h6>
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
              <th>이따무 시간</th>
              <td colspan="3">
                <div class="d-inline-flex">
                  <b-form-input v-model="form.waitTime" class="w-15" />
                  <span class="align-self-center ml-2">시</span>
                  <span class="align-self-center ml-2 fs-14 text-muted">*24시 기준으로 적어주세요.</span>
                </div>
              </td>
            </tr>
            <tr>
              <th>이따무 불가 최신화 설정</th>
              <td colspan="3">
                <div class="d-inline-flex">
                  <b-form-input v-model="form.episode" class="w-11" />
                  <span class="align-self-center ml-2">화 </span>
                  <span class="align-self-center ml-2 text-muted fs-14">*설정된 최신화는 이따무 이용권으로 볼 수 있습니다.</span>
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
                <div class="d-flex">
                  <div class="d-flex">
                    <b-form-checkbox v-model="setEnd" class="my-4">
                      설정
                    </b-form-checkbox>
                  </div>
                  <div class="d-inline-flex justify-content-between w-70 ml-3">
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
                        :disabled="!setEnd"
                      />
                    </div>
                    <!--                    <div class="w-25 pr-2">-->
                    <!--                      <label for="end-hours">시간</label>-->
                    <!--                      <b-form-select-->
                    <!--                        id="end-hours"-->
                    <!--                        v-model="form.endHours"-->
                    <!--                        :options="hoursOptions"-->
                    <!--                        :disabled="!setEnd"-->
                    <!--                      />-->
                    <!--                    </div>-->
                    <!--                    <div class="w-25 pr-2">-->
                    <!--                      <label for="end-minutes">분</label>-->
                    <!--                      <b-form-select-->
                    <!--                        id="end-minutes"-->
                    <!--                        v-model="form.endMinutes"-->
                    <!--                        :options="minutesOptions"-->
                    <!--                        :disabled="!setEnd"-->
                    <!--                      />-->
                    <!--                    </div>-->
                    <!--                    <div class="w-25 pr-2">-->
                    <!--                      <label for="end-seconds">초</label>-->
                    <!--                      <b-form-select-->
                    <!--                        id="end-seconds"-->
                    <!--                        v-model="form.endSeconds"-->
                    <!--                        :options="secondsOptions"-->
                    <!--                        :disabled="!setEnd"-->
                    <!--                      />-->
                    <!--                    </div>-->
                  </div>
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
  name: 'ItamuDetailPage',
  // mixins: [timeOptions],
  data () {
    return {
      isLoading: false,
      itamuInfo: {},
      form: {},
      setEnd: false,
      prevEndDate: ''
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
        { label: '이따무 상세', url: this.$route.path }
      ]
      return arr
    }
  },
  watch: {
    setEnd (val) {
      if (!val) {
        this.form.endDate = ''
      } else {
        this.form.endDate = this.prevEndDate
      }
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
      if (this.form.startDate) {
        this.form.startDate = this.form.startDate.split('T')[0]
      }
      if (this.form.endDate) {
        this.form.endDate = this.form.endDate.split('T')[0]
      }
      delete this.form.id
    },
    async editDetail () {
      this.setForm()

      try {
        const res = await this.$axios.put(`/api/manager/free/update/${this.$route.params.id}`, this.form)
        await console.log(res.data.data.result, '::::::::::::::::::')
        if (res.status === 200) {
          alert('수정이 완료 되었습니다.')
          await this.$router.push('/promotion/itamu')
        }
      } catch (e) {
        console.log(e)
      }
    },
    // 상단
    async getInfo () {
      this.isLoading = true
      try {
        const { status, data: { data } } = await this.$axios.get(`/api/manager/free/detail/top/${this.$route.params.id}`)
        if (status === 200) {
          this.itamuInfo = data
        }
      } catch (e) {
        console.log(e)
      } finally {
        this.isLoading = false
      }
    },
    async getDetail () {
      try {
        const { status, data: { data } } = await this.$axios.get(`/api/manager/free/detail/${this.$route.params.id}`)

        if (status === 200) {
          if (data.endDate) {
            this.setEnd = true
            this.prevEndDate = data.endDate
          } else {
            this.setEnd = false
          }
          this.form = data
        }
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>
