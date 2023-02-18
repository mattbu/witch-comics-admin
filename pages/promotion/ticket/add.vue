<template>
  <b-container fluid class="page-min-height pt-3 pb-5 mb-5">
    <UiPageTitle title="이용권 등록" :breadcrumb="breadcrumb">
      <template #buttons>
        <b-button variant="primary" @click="addTicket">
          등록
        </b-button>
      </template>
    </UiPageTitle>
    <hr>
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
            <!-- 정보 -->
            <tr>
              <th>이용권명</th>
              <td>
                <b-form-input
                  ref="title-input"
                  v-model="form.name"
                  type="text"
                />
              </td>
            </tr>
            <tr>
              <th>작품명</th>
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
            <tr>
              <th>사용 불가 회차</th>
              <td colspan="3">
                <div class="d-inline-flex">
                  <span class="align-self-center">최신</span>
                  <b-form-input
                    v-model="form.initial_ticket_count"
                    type="text"
                    placeholder="ex) 000"
                    class="w-25 ml-2"
                  />
                  <span class="align-self-center ml-2">화는 이용권으로 구매할 수 없게 설정합니다.</span>
                </div>
              </td>
            </tr>
            <tr>
              <th>발행대상</th>
              <td colspan="3">
                <div class="d-flex justify-content-start align-items-center">
                  <b-form-group>
                    <b-form-radio-group
                      v-model="form.ranking"
                      :options="divisionOptions"
                    />
                  </b-form-group>
                  <b-button variant="primary">
                    추가
                  </b-button>
                </div>
              </td>
            </tr>

            <tr>
              <th>정산여부</th>
              <td colspan="3">
                <b-form-group>
                  <b-form-radio-group
                    v-model="form.settlement_yn"
                    :options="calculateOptions"
                  />
                </b-form-group>
              </td>
            </tr>
            <tr>
              <th>처리방식</th>
              <td colspan="3">
                <div class="d-flex">
                  <div class="d-flex align-items-center">
                    <b-form-radio
                      v-model="selected"
                      :aria-describedby="ariaDescribedby"
                      name="some-radios"
                      value="A"
                    >
                      대여
                    </b-form-radio>
                    <b-form-input type="number" class="w-30 mx-2" />
                  </div>
                  <div class="d-flex align-items-center">
                    <b-form-radio
                      v-model="selected"
                      :aria-describedby="ariaDescribedby"
                      name="some-radios"
                      value="A"
                    >
                      소장
                    </b-form-radio>
                    <b-form-input type="number" class="w-30 mx-2" />
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <th>시작일</th>
              <td colspan="3">
                <div class="d-inline-flex justify-content-between w-50">
                  <div class="w-50 pr-2">
                    <label for="start-date">날짜*</label>
                    <b-form-datepicker
                      id="start-date"
                      v-model="form.start_date"
                      placeholder="시작일 선택"
                      class="mb-2"
                      :date-format-options="{
                        year: 'numeric',
                        month: 'numeric',
                        day: 'numeric'
                      }"
                    />
                  </div>
                  <div class="w-25 pr-2">
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
                  <div class="w-25">
                    <label for="start-seconds">초</label>
                    <b-form-select
                      id="start-seconds"
                      v-model="form.startSeconds"
                      :options="secondsOptions"
                    />
                  </div>
                </div>
              </td>
            </tr>

            <tr>
              <th>종료일</th>
              <td colspan="3">
                <div class="d-inline-flex justify-content-between w-70">
                  <div class="w-10 mt-4">
                    <b-form-checkbox v-model="end_date">
                      설정
                    </b-form-checkbox>
                  </div>
                  <div class="w-30 pr-2">
                    <label for="service-end-date">날짜*</label>
                    <b-form-datepicker
                      id="service-end-date"
                      v-model="form.endDate"
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
                  <div class="w-25 pr-2">
                    <label for="service-end-hours">시간</label>
                    <b-form-select
                      id="service-end-hours"
                      v-model="form.endHours"
                      :options="hoursOptions"
                      :disabled="!setEnd"
                    />
                  </div>
                  <div class="w-25 pr-2">
                    <label for="service-end-minutes">분</label>
                    <b-form-select
                      id="service-end-minutes"
                      v-model="form.endMinutes"
                      :options="minutesOptions"
                      :disabled="!setEnd"
                    />
                  </div>
                  <div class="w-25 pr-2">
                    <label for="service-end-seconds">초</label>
                    <b-form-select
                      id="service-end-seconds"
                      v-model="form.endSeconds"
                      :options="secondsOptions"
                      :disabled="!setEnd"
                    />
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
export default {
  name: 'TicketAddPage',
  data () {
    return {
      form: {
        piece: [], // 작품 추가
        cartoon_main_id: [], // 추가된 작품 ID
        name: '', // 이용권명
        title: '', // 작품명
        startDate: '', // 시작일
        endDate: '', // 종료일
        ranking: '', // 발행대상
        view_type: '', // 발행종류
        settlement_yn: '', // 정산여부
        episode: '',
        initial_ticket_count: '' // 발급수
      },
      setEnd: false,
      // 발생대상
      divisionOptions: [
        { text: '전체', value: '전체' },
        { text: '노란마녀', value: '노란마녀' },
        { text: '초록마녀', value: '초록마녀' },
        { text: '정액제 회원', value: '정액제 회원' },
        { text: '엑셀 등록', value: '엑셀 등록' }
      ],

      // 정산 여부
      calculateOptions: [
        { text: '정산', value: '정산' },
        { text: '미정산', value: '미정산' }
      ],

      // 회차명 회/권 노출 설정*
      serialInfoOpenOptions: [
        { text: '설정', value: '설정' },
        { text: '미설정', value: '미설정' }
      ],

      // 관련 작품 설정
      selectedWorkList: [],

      // 작가 등록 모달
      writerModalType: ''
    }
  },
  computed: {
    breadcrumb () {
      const arr = [
        { label: '홈', url: '/' },
        { label: '프로모션 관리', url: '#' },
        { label: '이용권 등록', url: this.$route.path }
      ]
      return arr
    }
  },
  watch: {},
  created () {},
  mounted () {},
  methods: {
    setForm () {
      delete this.form.piece
    },
    // 등록
    async addTicket () {
      await this.setForm()

      try {
        const res = await this.$axios.post(
          '/api/manager/ticket/regist',
          this.form
        )

        console.log(res)

        if (res.status === 200) {
          alert('등록이 완료 되었습니다.')
          await this.$router.push('/promotion/ticket')
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
    },
    /** 태그 request data 변형 */
    parseTags () {
      if (this.form.tags.length > 0) {
        const addHashTags = this.form.tags.map(tag => `#${tag}`)
        return addHashTags
      }
    }
  }
}
</script>
