<template>
  <b-container fluid class="page-min-height py-3">
    <UiPageTitle title="이따무 등록" :breadcrumb="breadcrumb">
      <template #buttons>
        <b-button variant="primary" @click="addItamu">
          등록
        </b-button>
      </template>
    </UiPageTitle>
    <hr>
    <b-row class="mt-4">
      <b-col cols="12">
        <table class="table border mb-0 table-layout-fixed">
          <colgroup>
            <col style="width: 18%">
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
                  @click="openModal('search-piece-modal')"
                >
                  추가
                </b-button>
                <template v-if="form.piece.length > 0">
                  <div class="mt-2">
                    <b-badge
                      v-for="(piece, pieceIdx) in form.piece"
                      :key="`piece-${pieceIdx}`"
                      pill
                      class="b-form-tag d-inline-flex"
                    >
                      <span class="align-self-center">{{ piece.name }}</span>
                      <b-button
                        variant="transparent"
                        class="p-0 align-self-center"
                        @click="removePiece(piece.id, pieceIdx)"
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
            <!-- 추가 시작-->
            <tr>
              <th>이따무 시간</th>
              <td colspan="3">
                <div class="d-inline-flex">
                  <b-form-input v-model="form.wait_time" class="w-25" />
                  <span class="align-self-center ml-2">시</span>
                </div>
              </td>
            </tr>
            <tr>
              <th>이따무 불가 최신화 설정</th>
              <td colspan="3">
                <div class="d-inline-flex">
                  <b-form-input v-model="form.episode" class="w-10" />
                  <span class="align-self-center ml-2">화</span>
                  <span class="fs-14 text-muted align-self-center ml-3">
                    *설정된 최신화는 이따무 이용권으로 볼 수 있습니다.
                  </span>
                </div>
              </td>
            </tr>
            <tr>
              <th>이용권</th>
              <td colspan="3">
                <b-form-group>
                  <b-form-radio-group
                    v-model="form.buy_type"
                    :options="buyTypeOptions"
                  />
                </b-form-group>
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
                <!-- <div class="w-25 pr-2">
                <label for="start-hours">시간</label>
                <b-form-select
                  id="start-hours"
                  v-model="form.startHours"
                  :options="hoursOptions"
                />
              </div>
              <div class="w-25 pr-2">
                <label for="start-minutes">분</label>
                <b-form-select
                  id="start-minutes"
                  v-model="form.startMinutes"
                  :options="minutesOptions"
                />
              </div>
              <div class="w-25 pr-2">
                <label for="start-seconds">초</label>
                <b-form-select
                  id="start-seconds"
                  v-model="form.startSeconds"
                  :options="secondsOptions"
                />
              </div> -->
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
                        :disabled="!setEnd"
                      />
                    </div>
                    <!-- <div class="w-25 pr-2">
                    <label for="end-hours">시간</label>
                    <b-form-select
                      id="end-hours"
                      v-model="form.endHours"
                      :options="hoursOptions"
                    />
                  </div>
                  <div class="w-25 pr-2">
                    <label for="end-minutes">분</label>
                    <b-form-select
                      id="end-minutes"
                      v-model="form.endMinutes"
                      :options="minutesOptions"
                    />
                  </div>
                  <div class="w-25 pr-2">
                    <label for="end-seconds">초</label>
                    <b-form-select
                      id="end-seconds"
                      v-model="form.endSeconds"
                      :options="secondsOptions"
                    />
                  </div> -->
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </b-col>
    </b-row>

    <!-- 작품 검색(search-piece-modal) -->
    <SearchPieceModal @select-work="selectPiece" />
  </b-container>
</template>
<script>
// import { timeOptions } from '@/plugins/mixins'

export default {
  name: 'ItamuAddPage',
  // mixins: [timeOptions],
  data () {
    return {
      setEnd: false,
      form: {
        piece: [], // 작품 추가
        cartoon_main_id: [], // 추가된 작품 ID
        wait_time: '', // 이따무 시간
        episode: '', // 최신화
        buy_type: 'R', // 이용권
        start_date: '', // 시작일
        end_date: '' // 종료일
      },
      buyTypeOptions: [
        { text: '대여', value: 'R' },
        { text: '소장', value: 'C' }
      ]
    }
  },
  computed: {
    breadcrumb () {
      const arr = [
        { label: '홈', url: '/' },
        { label: '프로모션 관리', url: '#' },
        { label: '이따무 등록', url: this.$route.path }
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
      this.form.free_type = 'E'
      delete this.form.piece
    },
    // 등록
    async addItamu () {
      await this.setForm()

      try {
        const res = await this.$axios.post(
          '/api/manager/free/regist',
          this.form
        )

        console.log(res)

        if (res.status === 200) {
          alert('등록이 완료 되었습니다.')
          await this.$router.push('/promotion/itamu')
        }
      } catch (e) {
        console.log(e)
      }
    },
    selectPiece (data) {
      this.form.piece = data
      this.form.cartoon_main_id = data.map(el => el.id)
    },
    removePiece (id, idx) {
      this.form.piece = this.form.piece.filter(piece => piece.id !== id)
      this.form.cartoon_main_id = this.form.cartoon_main_id.filter(
        (piece, pIdx) => pIdx !== idx
      )
    },
    // 작품 검색 추가
    openModal (id) {
      this.$root.$emit('bv::show::modal', id)
    }
  }
}
</script>
