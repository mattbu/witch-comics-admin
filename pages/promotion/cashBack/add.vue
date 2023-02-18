<template>
  <b-container fluid class="page-min-height pb-5 mb-5">
    <UiPageTitle title="캐시백 등록" :breadcrumb="breadcrumb">
      <template #buttons>
        <b-button variant="primary" @click="addCashback">
          등록
        </b-button>
      </template>
    </UiPageTitle>
    <hr>
    <b-row class="pt-2">
      <b-col align-self="center">
        <h6>캐시백 프로모션 설정</h6>
      </b-col>
    </b-row>
    <b-row class="my-2">
      <b-col cols="12">
        <table class="table border mb-0 table-layout-fixed">
          <!--          <colgroup>-->
          <!--            <col style="width: 15%">-->
          <!--            <col>-->
          <!--            <col style="width: 10%">-->
          <!--            <col>-->
          <!--          </colgroup>-->
          <tbody>
            <!-- 정보 -->
            <tr>
              <th>구분명</th>
              <td colspan="7">
                <b-form-input
                  v-model="form.typeName"
                  placeholder="관리용 구분이름, 사용자에게는 표시되지 않습니다."
                  class="w-40"
                />
              </td>
            </tr>
            <tr>
              <th>작품 추가</th>
              <td colspan="7">
                <div class="d-flex">
                  <b-button
                    variant="outline-secondary"
                    class="table-inner-btn"
                    @click="openModal('search-piece-modal')"
                  >
                    추가
                  </b-button>
                </div>
                <template v-if="form.works.length > 0">
                  <div class="mt-2">
                    <b-badge
                      v-for="(piece, pieceIdx) in form.works"
                      :key="`piece-${pieceIdx}`"
                      pill
                      class="b-form-tag d-inline-flex"
                    >
                      <span class="align-self-center">{{ piece.name }}</span>
                      <b-button
                        variant="transparent"
                        class="p-0 align-self-center"
                        @click="removePiece(piece.id)"
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
              <th>지급 유형</th>
              <td colspan="7">
                <b-form-radio-group
                  v-model="form.type"
                  :options="typeOptions"
                />
                <template v-if="form.type === '기타'">
                  <b-form-input v-model="form.etcName" placeholder="상품명을 입력해 주세요." class="w-30 mt-2" />
                </template>
                <template v-else-if="form.type === '이용권'">
                  <b-button
                    variant="outline-secondary"
                    class="table-inner-btn mt-2"
                    @click="openModal('search-piece-modal')"
                  >
                    추가
                  </b-button>
                </template>
              </td>
            </tr>
            <tr>
              <th>지급 개수</th>
              <td colspan="3">
                <div class="d-block">
                  <b-form-radio v-model="form.quantityOption" class="d-inline-flex" value="개">
                    개
                  </b-form-radio>
                  <b-form-radio v-model="form.quantityOption" class="d-inline-flex ml-2" value="%" :disabled="form.type !== '물약'">
                    %
                  </b-form-radio>
                  <span class="fs-14 text-muted">*설정 시 (사용한 물약의 개수 x %) 만큼 지급됩니다.</span>
                </div>
                <div class="d-inline-flex mt-2">
                  <b-form-input v-model="form.quantity" class="w-20" />
                  <span class="align-self-center ml-2">{{ form.quantityOption === '개' ? '개' : '%' }}</span>
                </div>
              </td>
              <th>포인트 만료일*</th>
              <td colspan="3">
                <b-form-radio-group
                  v-model="form.pointExpire"
                  :options="pointEndDayOptions"
                />
                <div class="mt-2">
                  <label for="expire-date" class="fs-14 mb-1">날짜*</label>
                  <b-form-datepicker
                    id="expire-date"
                    v-model="form.expireDt"
                    label-help=""
                    hide-header
                    placeholder="날짜 선택"
                    class="mb-2 w-50"
                    :date-format-options="{
                      year: 'numeric',
                      month: 'numeric',
                      day: 'numeric'
                    }"
                  />
                </div>
              </td>
            </tr>
            <tr>
              <th>중복지급 설정</th>
              <td colspan="7">
                <b-form-radio-group
                  v-model="form.repeat"
                  :options="repeatOptions"
                />
              </td>
            </tr>
            <tr>
              <th>캐시백 조건</th>
              <td colspan="7">
                <b-form-radio-group
                  v-model="form.conditionOption"
                  :options="cbConditionOptions"
                />
                <div class="mt-2 d-inline-flex">
                  <b-form-select v-model="form.conditionType" class="w-60" :options="cbConditionSelectOptions" />
                  <template v-if="form.conditionOption === 2">
                    <b-form-checkbox v-model="form.setAll" class="w-30 align-self-center ml-2">
                      전체
                    </b-form-checkbox>
                  </template>
                  <b-form-input v-model="form.condition" class="ml-2" />
                  <span class="ml-2 align-self-center">개</span>
                </div>
              </td>
            </tr>
            <tr>
              <th>댓글 설정</th>
              <td colspan="3">
                <b-form-radio-group
                  v-model="form.setComment"
                  :options="commentOptions"
                />
              </td>
              <th>댓글 조건 설정</th>
              <td colspan="3">
                <b-form-radio-group
                  v-model="form.setCommentCondition"
                  :options="commentConditionOptions"
                />
                <template v-if="form.setCommentCondition !== 1">
                  <div class="mt-2">
                    <b-button v-if="form.setCommentCondition === 2">
                      회차 선택
                    </b-button>
                    <b-button v-else-if="form.setCommentCondition === 3">
                      이벤트 선택
                    </b-button>
                  </div>
                </template>
              </td>
            </tr>
            <tr>
              <th>지급 대상</th>
              <td colspan="7">
                <b-form-radio-group
                  v-model="form.targetOption"
                  :options="targetOptions"
                />
                <template v-if="form.targetOption === 3">
                  <div class="mt-2 d-inline-flex">
                    <b-form-input v-model="form.target" class="w-30" />
                    <span class="ml-2 align-self-center">명</span>
                  </div>
                </template>
              </td>
            </tr>
            <tr>
              <th>지급 방법</th>
              <td colspan="7">
                <b-form-radio-group
                  v-model="form.methodOption"
                  :options="methodOptions"
                />
                <template v-if="form.methodOption === 2">
                  <div class="mt-2 d-inline-flex">
                    <b-form-input v-model="form.method" class="w-30" />
                    <span class="ml-2 align-self-center">명</span>
                  </div>
                </template>
                <template v-else-if="form.methodOption === 3">
                  <div class="d-inline-flex w-100 mt-2">
                    <div class="w-20 pr-2">
                      <label for="soon-dt" class="fs-14 mb-1">날짜*</label>
                      <b-form-datepicker
                        id="soon-dt"
                        v-model="soon.dt"
                        label-help=""
                        hide-header
                        placeholder="시작일 선택"
                        :date-format-options="{
                          year: 'numeric',
                          month: 'numeric',
                          day: 'numeric'
                        }"
                      />
                    </div>
                    <div class="w-20 pr-2">
                      <label for="soon-hrs" class="fs-14 mb-1">시간</label>
                      <b-form-select
                        id="soon-hrs"
                        v-model="soon.hrs"
                        :options="hoursOptions"
                      />
                    </div>
                    <div class="w-20 pr-2">
                      <label for="soon-min" class="fs-14 mb-1">분</label>
                      <b-form-select
                        id="soon-min"
                        v-model="soon.min"
                        :options="minutesOptions"
                      />
                    </div>
                    <div class="w-20 pr-2">
                      <label for="soon-sec" class="fs-14 mb-1">초</label>
                      <b-form-select
                        id="soon-sec"
                        v-model="soon.sec"
                        :options="secondsOptions"
                      />
                    </div>
                  </div>
                </template>
              </td>
            </tr>
            <tr>
              <th>시작일</th>
              <td colspan="7">
                <div class="d-inline-flex justify-content-between w-70">
                  <div class="w-50 pr-2">
                    <label for="start-dt">날짜</label>
                    <b-form-datepicker
                      id="start-dt"
                      v-model="start.dt"
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
                  <div class="w-25 pr-2">
                    <label for="start-hrs">시간</label>
                    <b-form-select
                      id="start-hrs"
                      v-model="start.hrs"
                      :options="hoursOptions"
                    />
                  </div>
                  <div class="w-25 pr-2">
                    <label for="start-min">분</label>
                    <b-form-select
                      id="start-min"
                      v-model="start.min"
                      :options="minutesOptions"
                    />
                  </div>
                  <div class="w-25 pr-2">
                    <label for="start-sec">초</label>
                    <b-form-select
                      id="start-sec"
                      v-model="start.sec"
                      :options="secondsOptions"
                    />
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <th>종료일</th>
              <td colspan="7">
                <div class="d-inline-flex justify-content-between w-70">
                  <div class="w-50 pr-2">
                    <label for="end-dt">날짜</label>
                    <b-form-datepicker
                      id="end-dt"
                      v-model="end.dt"
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
                  <div class="w-25 pr-2">
                    <label for="end-hrs">시간</label>
                    <b-form-select
                      id="end-hrs"
                      v-model="end.hrs"
                      :options="hoursOptions"
                    />
                  </div>
                  <div class="w-25 pr-2">
                    <label for="end-min">분</label>
                    <b-form-select
                      id="end-min"
                      v-model="end.min"
                      :options="minutesOptions"
                    />
                  </div>
                  <div class="w-25 pr-2">
                    <label for="end-sec">초</label>
                    <b-form-select
                      id="end-sec"
                      v-model="end.sec"
                      :options="secondsOptions"
                    />
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </b-col>
    </b-row>
    <!--    작품 검색 모달-->
    <SearchPieceModal @select-work="selectWork" />
  </b-container>
</template>
<script>
import { timeOptions } from '@/plugins/mixins'
export default {
  name: 'CashBackAddPage',
  mixins: [timeOptions],
  data () {
    return {
      form: {
        typeName: '', // 구분명
        works: [], // 작품 추가
        type: '물약', // 지급 유형
        etcName: '', // 기타일 때 상품명
        quantityOption: '개', // 지급 개수 옵션
        quantity: '', // 지금 개수
        pointExpire: 1, // 포인트 만료일 옵션
        expireDt: '', // 포인트 만료일
        repeat: 1, // 중복 지급 설정
        conditionOption: 1, // 캐시백 조건 옵션
        setAll: false, // 캐시백 조건 회차 일때 전체 체크박스
        condition: '', // 캐시백 개수
        conditionType: '', // 캐시백 조건 셀렉트
        setComment: 1, // 댓글 설정
        setCommentCondition: 1, // 댓글 조건 설정
        targetOption: 1, // 지급 대상 옵션
        target: '', // 지급 대상
        methodOption: 1, // 지금 방법 옵션
        method: '', // 지급 방법
        startDate: '',
        startHours: '00',
        startMinutes: '00',
        startSeconds: '00',
        endDate: '',
        endHours: '00',
        endMinutes: '00',
        endSeconds: '59',
        selectedTerminateType: false
      },
      // 지급 유형 옵션
      typeOptions: [
        { text: '물약', value: '물약' },
        { text: '호박', value: '호박' },
        { text: '기타', value: '기타' },
        { text: '룰렛 참여권', value: '룰렛 참여권' },
        { text: '이용권', value: '이용권' }
      ],
      // 포인트 만료일 옵션
      pointEndDayOptions: [
        { text: '기간 설정', value: 1 },
        { text: '영구', value: 2 }
      ],
      // 중복 지급 설정 옵션
      repeatOptions: [
        { text: '미설정', value: 1 },
        { text: '설정', value: 2 }
      ],
      // 캐시백 조건 옵션
      cbConditionOptions: [
        { text: '물약', value: 1 },
        { text: '회차', value: 2 },
        { text: '이용권/이따무', value: 3 }
      ],
      // 캐시백 조건 셀렉트 옵션
      cbConditionSelectOptions: [],
      // 댓글 설정 옵션
      commentOptions: [
        { text: '설정', value: 1 },
        { text: '미설정', value: 2 }
      ],
      // 댓글 조건 설정 옵션
      commentConditionOptions: [
        { text: '모든회차', value: 1 },
        { text: '회차설정', value: 2 },
        { text: '이벤트', value: 3 }
      ],
      // 지급 대상 옵션
      targetOptions: [
        { text: '전원', value: 1 },
        { text: '추첨', value: 2 },
        { text: '선착순', value: 3 }
      ],
      // 지급 방법 옵션
      methodOptions: [
        { text: '즉시', value: 1 },
        { text: '수동', value: 2 },
        { text: '예약', value: 3 }
      ],
      // 지급 방법 예약 일때 시간
      soon: { dt: '', hrs: '00', min: '00', sec: '00' },
      // 시작일
      start: { dt: '', hrs: '00', min: '00', sec: '00' },
      // 종료일
      end: { dt: '', hrs: '00', min: '00', sec: '00' },
      // 시간 옵션
      hoursOptions: [],
      minutesOptions: [],
      secondsOptions: []
    }
  },
  computed: {
    breadcrumb () {
      const arr = [
        { label: '홈', url: '/' },
        { label: '프로모션 관리', url: '#' },
        { label: '캐시백 등록', url: this.$route.path }
      ]
      return arr
    }
  },
  watch: {
    'form.conditionOption': {
      immediate: true,
      handler (val) {
        this.form.conditionType = ''
        this.form.condition = ''

        if (val === 1 || val === 2) {
          this.cbConditionSelectOptions = [
            { value: '', text: '전체' },
            { value: 1, text: '대여' },
            { value: 2, text: '소장' },
            { value: 3, text: '대여/소장' }
          ]
        } else {
          this.cbConditionSelectOptions = [
            { value: '', text: '이용권' },
            { value: 1, text: '이따무' },
            { value: 2, text: '이용권/이따무' }
          ]
        }
      }

    }
  },
  created () {},
  mounted () {
    this.hoursOptions = this.getHours()
    this.minutesOptions = this.getMinutes()
    this.secondsOptions = this.getSeconds()
  },
  methods: {
    addCashback () {
      console.log('캐시백 등록')
    },
    openModal (id) {
      this.$root.$emit('bv::show::modal', id)
    },
    selectWork (data) {
      this.form.works = data
    },
    removePiece (id) {
      this.form.works = this.form.works.filter(piece => piece.id !== id)
    }
  }
}
</script>
