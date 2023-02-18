<template>
  <b-container fluid class="page-min-height pb-5 mb-5">
    <UiPageTitle title="회차 수정" :breadcrumb="breadcrumb">
      <template #buttons>
        <b-button
          variant="outline-primary"
          @click="$router.push(`/content/piece/${$route.params.id}/edition`)"
        >
          취소
        </b-button>
        <b-button variant="primary" @click="editSerial">
          수정
        </b-button>
      </template>
    </UiPageTitle>
    <b-row class="mt-4">
      <b-col cols="12">
        <p class="font-weight-bold mb-2">
          회차 정보
        </p>
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
              <th>회차명</th>
              <td colspan="3">
                {{ topInfo.title ? topInfo.title : '-' }}
              </td>
              <th>회차 아이디</th>
              <td colspan="3">
                {{ topInfo.id ? topInfo.id : '-' }}
              </td>
            </tr>
            <tr>
              <th>상태</th>
              <td colspan="3">
                {{ topInfo.status ? topInfo.status : '-' }}
              </td>
              <th>등록일</th>
              <td colspan="3">
                {{ topInfo.createdAt ? topInfo.createdAt : '-' }}
              </td>
            </tr>
            <tr>
              <th>게시일</th>
              <td colspan="3">
                {{ topInfo.mcOpenDate ? topInfo.mcOpenDate : '-' }}
              </td>
              <th>수정일</th>
              <td colspan="3">
                {{ topInfo.updatedAt ? topInfo.updatedAt : '-' }}
              </td>
            </tr>
          </tbody>
        </table>
      </b-col>
    </b-row>
    <b-row class="mt-3">
      <b-col>
        <p class="font-weight-bold mb-2">
          신규 등록 정보
        </p>
        <table class="table border mb-0 table-layout-fixed">
          <colgroup>
            <col style="width: 15%">
            <col>
            <col>
          </colgroup>
          <tbody>
            <tr>
              <th>회차 제목*</th>
              <td colspan="3">
                <div class="d-flex align-items-center">
                  <b-form-input
                    v-model="info.title"
                    type="text"
                    placeholder="회차 제목 입력"
                    class="w-50"
                  />
                  <b-form-checkbox v-model="form.setAutoTitle" class="mx-2">
                    제목 자동설정
                  </b-form-checkbox>
                  <span class="fs-14 text-muted">*설정 시 회차 제목 + 화 수 + 회/권 표시가 됩니다.</span>
                </div>
              </td>
            </tr>
            <tr>
              <th>부제</th>
              <td colspan="3">
                <b-form-input
                  v-model="info.subTitle"
                  type="text"
                  placeholder="부제 제목 입력"
                  class="w-50"
                />
              </td>
            </tr>
            <tr>
              <th>화 수</th>
              <td colspan="3">
                <b-form-input
                  v-model="info.serialNo"
                  type="text"
                  placeholder="화수 입력"
                  class="w-25"
                />
              </td>
            </tr>
            <tr>
              <th>화 수 미포함</th>
              <td colspan="3">
                <div class="d-flex align-items-center">
                  <b-form-checkbox v-model="info.isSerial" value="y" unchecked-value="n">
                    설정
                  </b-form-checkbox>
                  <span class="ml-2 fs-14 text-muted">
                    *설정 시 해당 회차는 미포함 회차로 설정되며, 무료화수 표시와 이벤트에 포함되지 않습니다.
                  </span>
                </div>
              </td>
            </tr>
            <tr>
              <th>노출 제목 미리보기</th>
              <td colspan="3">
                {{ info.title ? info.title : '-' }}
              </td>
            </tr>
            <tr>
              <th>ISBN</th>
              <td colspan="3">
                <div class="d-flex align-items-center">
                  <b-form-input v-model="info.isbn" type="text" class="w-20" placeholder="ISBN 입력" />
                </div>
              </td>
            </tr>
            <tr>
              <th>회차 연령등급*</th>
              <td colspan="3">
                <div class="d-inline-flex">
                  <b-form-radio-group
                    v-model="info.isAdult"
                    :options="rateOptions"
                  />
                </div>
              </td>
            </tr>
            <tr>
              <th>회차 썸네일 (1개)*</th>
              <td colspan="3">
                <b-form-group class="my-1">
                  <b-form-radio-group
                    v-model="form.thumbnailOpt"
                    :options="thumbnailOptions"
                  />
                </b-form-group>
                <template v-if="form.thumbnailOpt === 1">
                  <p class="mb-2">
                    이미지 추가 ({{ info.thumbnailUrl ? '1' : '0' }}/1개)
                  </p>
                  <div>
                    <input
                      id="thumbnail-img-input"
                      type="file"
                      class="d-none"
                      @change="uploadSingleImg($event, 'THUMBNAIL')"
                    >
                    <label
                      ref="thumbnail-img-input"
                      for="thumbnail-img-input"
                      class="btn btn-outline-secondary mb-0 table-inner-btn"
                    >
                      파일 선택
                    </label>
                  </div>
                  <b-row v-if="info.thumbnailUrl" class="mt-3">
                    <b-col cols="2">
                      <div class="add-thumbnail-wrapper">
                        <img :src="info.thumbnailUrl" class="preview" alt="">
                      </div>
                    </b-col>
                  </b-row>
                </template>
                <template v-else>
                  <b-row v-if="info.thumbnailUrlList.length > 0" class="mt-3">
                    <b-col
                      v-for="(url, idx) in info.thumbnailUrlList"
                      :key="`listImgUrl-${idx}`"
                      cols="2"
                      class="mb-3"
                    >
                      <div class="add-thumbnail-wrapper" style="cursor: pointer" @click="selectThumbnail(idx)">
                        <img
                          v-if="url"
                          :src="url"
                          class="preview"
                          :class="form.selectedThumbnailIdx === idx ? 'selected' : ''"
                          alt=""
                        >
                      </div>
                    </b-col>
                  </b-row>
                  <b-row v-else class="mt-3">
                    <b-col cols="12" class="mb-3">
                      <span class="text-muted">등록된 작품 목록 이미지가 없습니다.</span>
                    </b-col>
                  </b-row>
                </template>
              </td>
            </tr>
            <tr>
              <th>원고*</th>
              <td colspan="3">
                <p class="mb-2">
                  이미지 추가 ({{ info.sequent ? info.sequent.length : '0' }}개)
                </p>
                <div>
                  <template v-if="$route.query.menucode === '2'">
                    <input
                      id="novel-draft-input"
                      type="file"
                      class="d-none"
                      accept=".epub"
                      @change="uploadSingleImg($event, 'DRAFT')"
                    >
                  </template>
                  <template v-else>
                    <input
                      id="draft-input"
                      type="file"
                      multiple
                      class="d-none"
                      @change="uploadDraft"
                    >
                  </template>
                  <label
                    :for="$route.query.menucode === '2' ? 'novel-draft-input' : 'draft-input'"
                    class="btn btn-outline-secondary mb-0 table-inner-btn"
                  >
                    파일 등록
                  </label>
                </div>

                <template v-if="info.sequent && info.sequent.length > 0">
                  <draggable
                    v-model="info.sequent"
                    tag="div"
                    ghost-class="ghost"
                    class="row mt-3"
                    style="cursor: pointer"
                    :class="{ 'd-none': !info.sequent.length }"
                  >
                    <b-col
                      v-for="(file, idx) in info.sequent"
                      :key="`file-${idx}`"
                      cols="2"
                      class="mb-3"
                    >
                      <div class="add-thumbnail-wrapper">
                        <img
                          v-if="file"
                          :src="file"
                          class="preview"
                          alt=""
                        >
                        <b-button variant="transparent" class="p-0 ml-3 d-flex img-delete-btn" @click="deleteListImg(idx)">
                          <b-icon variant="dark" icon="x" font-scale="1.2" />
                        </b-button>
                      </div>
                    </b-col>
                  </draggable>
                </template>
              </td>
            </tr>

            <tr>
              <th>서비스 시작일</th>
              <td colspan="3">
                <div class="d-inline-flex justify-content-start">
                  <div class="w-30 pr-2">
                    <label for="service-start-date">날짜*</label>
                    <b-form-datepicker
                      id="service-start-date"
                      v-model="svcStartDt"
                      placeholder="선택"
                      hide-header
                      label-help=""
                      :date-format-options="{
                        year: 'numeric',
                        month: 'numeric',
                        day: 'numeric'
                      }"
                    />
                  </div>
                  <div class="w-20 pr-2">
                    <label for="service-start-hours">시간</label>
                    <b-form-select
                      id="service-start-hours"
                      v-model="svcStartHrs"
                      :options="hoursOptions"
                      :disabled="form.set10Pm"
                    />
                  </div>
                  <div class="w-20 pr-2">
                    <label for="service-start-minutes">분</label>
                    <b-form-select
                      id="service-start-minutes"
                      v-model="svcStartMin"
                      :options="minutesOptions"
                      :disabled="form.set10Pm"
                    />
                  </div>
                  <div class="w-20 pr-2">
                    <label for="service-start-seconds">초</label>
                    <b-form-select
                      id="service-start-seconds"
                      v-model="svcStartSec"
                      :options="secondsOptions"
                      :disabled="form.set10Pm"
                    />
                  </div>
                  <div class="w-35 align-self-end pb-2">
                    <b-form-checkbox v-model="form.set10Pm">
                      시간 22:00 으로 설정
                    </b-form-checkbox>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <th>작가의 한마디</th>
              <td colspan="3">
                <div class="d-flex">
                  <b-form-input v-model="info.comment" type="text" class="w-50" placeholder="입력" />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </b-col>
    </b-row>
    <b-row class="mt-3">
      <b-col>
        <p class="font-weight-bold mb-2">
          회차 가격 정보
        </p>
        <table class="table border mb-0 table-layout-fixed">
          <colgroup>
            <col style="width: 15%">
            <col>
            <col style="width: 10%">
            <col>
          </colgroup>
          <tbody>
            <tr>
              <th>판매 유형</th>
              <td colspan="3">
                <div class="d-inline-flex">
                  <b-form-radio-group
                    v-model="info.isFree"
                    :options="saleTypeOptions"
                  />
                </div>
              </td>
            </tr>
            <tr v-if="info.isFree === 'n'">
              <th>회차 열람 이용자</th>
              <td colspan="3">
                <div class="d-inline-flex align-item-center">
                  <div class="d-inline-flex">
                    <b-form-radio-group
                      v-model="info.isLogin"
                      :options="serialOpenUserOptions"
                    />
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <th>가격 설정</th>
              <td colspan="3">
                <div class="d-inline-flex">
                  <div class="justify-content-start align-self-center">
                    <b-form-radio-group
                      v-model="info.isSame"
                      class="align-self-center"
                      :options="setPriceOptions"
                    />
                  </div>
                  <div class="d-flex justify-content-center ml-3 align-self-center">
                    <span class="align-self-center">대여</span>
                    <b-form-input
                      v-model="info.coinRental"
                      type="text"
                      placeholder="갯수"
                      class="w-25 ml-2"
                      :disabled="info.isSame === 'y'"
                    />
                    <span class="align-self-center ml-2">물약</span>
                  </div>
                  <div class="d-flex justify-content-center align-self-center">
                    <span class="align-self-center">대여</span>
                    <b-form-input
                      v-model="info.pointRental"
                      type="text"
                      placeholder="갯수"
                      class="w-25 ml-2"
                      :disabled="info.isSame === 'y'"
                    />
                    <span class="align-self-center ml-2">호박</span>
                  </div>
                  <div class="d-flex justify-content-center align-self-center">
                    <span class="align-self-center">소장</span>
                    <b-form-input
                      v-model="info.coin"
                      type="text"
                      placeholder="갯수"
                      class="w-25 ml-2"
                      :disabled="info.isSame === 'y'"
                    />
                    <span class="align-self-center ml-2">물약</span>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <th>소장 구매 설정</th>
              <td colspan="3">
                <div class="d-inline-flex">
                  <b-form-radio-group
                    v-model="info.isKeep"
                    :options="keepYesNoOptions"
                  />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </b-col>
    </b-row>
    <b-row class="mt-3">
      <b-col>
        <p class="font-weight-bold mb-2">
          시즌 정보
        </p>
        <table class="table border mb-0 table-layout-fixed">
          <colgroup>
            <col style="width: 15%">
            <col>
            <col style="width: 10%">
            <col>
          </colgroup>
          <tbody>
            <tr>
              <th>
                시즌 시작
                <UiTooltipButton target-id="season-tooltip" />
                <UiTooltip target="season-tooltip" description="시작한 회차부터 새로운 시즌이 적용됩니다." />
              </th>
              <td colspan="3">
                <b-form-checkbox v-model="info.isSeason" value="y" unchecked-value="n">
                  시작
                </b-form-checkbox>
              </td>
            </tr>
            <tr>
              <th>시즌 타이틀</th>
              <td colspan="3">
                <b-form-input v-model="info.seasonTitle" placeholder="시즌 타이틀 입력" class="w-35" />
              </td>
            </tr>
            <tr>
              <th>최근 시즌 정보</th>
              <td colspan="3">
                -
              </td>
            </tr>
          </tbody>
        </table>
      </b-col>
    </b-row>
    <b-row class="pt-3" align-h="between">
      <b-col align-self="center">
        <h6 class="font-weight-bold">
          작품 서비스 상태 설정 (상태: {{ info.statusCode ? info.statusCode : '-' }})
        </h6>
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
              <th>판매중지</th>
              <td colspan="3">
                <div
                  class="d-flex justify-content-start align-items-center"
                >
                  <b-form-radio-group
                    v-model="form.stopSales.status"
                    :options="svcStatusOptions"
                  />
                  <div class="d-flex w-70 ml-2">
                    <div class="w-50 pr-2">
                      <label
                        for="stop-sales-date"
                        class="fs-14 mb-0"
                      >날짜*</label>
                      <b-form-datepicker
                        id="stop-sales-date"
                        v-model="salesEndDt"
                        placeholder="선택"
                        class="mb-2"
                        hide-header
                        label-help=""
                        :date-format-options="{
                          year: 'numeric',
                          month: 'numeric',
                          day: 'numeric'
                        }"
                        :disabled="form.stopSales.status === 1 || form.stopSales.status === 2"
                      />
                    </div>
                    <div class="w-25 pr-2">
                      <label
                        for="stop-sales-hours"
                        class="fs-14 mb-0"
                      >시간</label>
                      <b-form-select
                        id="stop-sales-hours"
                        v-model="salesEndHrs"
                        :options="hoursOptions"
                        :disabled="form.stopSales.status === 1 || form.stopSales.status === 2"
                      />
                    </div>
                    <div class="w-25 pr-2">
                      <label
                        for="stop-sales-minutes"
                        class="fs-14 mb-0"
                      >분</label>
                      <b-form-select
                        id="stop-sales-minutes"
                        v-model="salesEndMin"
                        :options="minutesOptions"
                        :disabled="form.stopSales.status === 1 || form.stopSales.status === 2"
                      />
                    </div>
                    <div class="w-25 pr-2">
                      <label
                        for="stop-sales-seconds"
                        class="fs-14 mb-0"
                      >초</label>
                      <b-form-select
                        id="stop-sales-seconds"
                        v-model="salesEndSec"
                        :options="secondsOptions"
                        :disabled="form.stopSales.status === 1 || form.stopSales.status === 2"
                      />
                    </div>
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </b-col>
    </b-row>
    <b-row class="pt-3" align-h="between">
      <b-col align-self="center">
        <h6 class="font-weight-bold">
          회차 별 이슈사항
        </h6>
      </b-col>
    </b-row>
    <hr class="my-2">
    <b-row>
      <b-col class="d-inline-flex" tag="form" @submit.prevent="addSerialIssue">
        <b-form-input v-model.trim="form.issue" class="w-93" />
        <b-button type="submit" class="ml-2 w-7">
          등록
        </b-button>
      </b-col>
    </b-row>
    <!--    회차 별 이슈사항-->
    <b-table
      class="list mt-3"
      :items="list"
      :fields="fields"
      stacked="md"
      :busy="isLoading"
      show-empty
      small
    >
      <template #table-colgroup>
        <col>
        <col style="width: 70%">
      </template>
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
      <template #cell(no)="data">
        {{ data.index + 1 }}
      </template>
      <template #cell(setting)="data">
        <b-button
          variant="outline-secondary"
          class="table-inner-btn"
          @click="removeIssue(data.item.id)"
        >
          삭제
        </b-button>
      </template>
    </b-table>
  </b-container>
</template>

<script>
import draggable from 'vuedraggable'
import { timeOptions } from '@/plugins/mixins'

export default {
  name: 'ContentPieceEditionDetailPage',
  components: { draggable },
  mixins: [timeOptions],
  data () {
    return {
      // 상단 정보
      topInfo: {},
      // 상세
      info: {},
      originTitle: '', // 기존 회차 제목
      // 등록 폼
      form: {
        // 신규 등록 정보
        setAutoTitle: false, // 제목 자동설정

        thumbnailOpt: 1, // 회차 썸네일 옵션
        selectedThumbnail: '', // 회차 썸네일
        selectedThumbnailIdx: null,

        novelDraft: null, // 소설일 때 원고 epub 파일

        start: { // 새로운 서비스 시작일 computed
          date: '',
          hrs: '',
          min: '',
          sec: ''
        },

        set10Pm: false, // 22:00로 설정

        // 회차 서비스 상태 설정
        stopSales: {
          status: 1,
          date: '',
          hours: '00',
          minutes: '00',
          seconds: '00'
        },
        saleStopDate: '',

        // 회차 별 이슈사항
        issue: ''
      },

      // 신규 등록 정보
      // 회차 연령등급 옵션
      rateOptions: [
        { text: '전체이용가', value: '0' },
        { text: '성인', value: '19' }
      ],
      // 회차 썸네일 옵션
      thumbnailOptions: [
        { text: '업로드', value: 1 },
        { text: '작품 목록 이미지', value: 2 }
      ],
      // 서비스 시작일 옵션
      hoursOptions: [],
      minutesOptions: [],
      secondsOptions: [],

      // 회차 가격 정보
      // 판매 유형 옵션
      saleTypeOptions: [
        { text: '유료', value: 'y' },
        { text: '무료', value: 'n' }
      ],
      // 회차 열람 이용자
      serialOpenUserOptions: [
        { text: '로그인 회원', value: 'y' },
        { text: '모든 이용자', value: 'n' }
      ],
      // 가격 설정
      setPriceOptions: [
        { text: '작품 가격 동일 설정', value: 'y' },
        { text: '회차 개별 설정', value: 'n' }
      ],
      // 무료회차 소장구매 설정
      keepYesNoOptions: [
        { text: '소장 가능', value: 'y' },
        { text: '소장 불가능', value: 'n' }
      ],

      // 회차 서비스 상태 설정 옵션
      svcStatusOptions: [
        { text: '사용안함', value: 1 },
        { text: '즉시', value: 2 },
        { text: '예약', value: 3 }
      ],

      // 회차 별 이슈사항
      // 리스트
      isLoading: false,
      fields: [
        { key: 'no', label: '번호' },
        { key: 'comment', label: '내용' },
        { key: 'manager', label: '담당자' },
        { key: 'setting', label: '관리' }
      ],
      list: []
    }
  },
  async fetch () {
    await this.getTopInfo()
    await this.getInfo()
    await this.getSerialIssueList()
  },
  computed: {
    svcStartDt: {
      get () {
        if (this.form.start.date) {
          return this.form.start.date
        } return this.info.mcOpenDate ? this.info.mcOpenDate.split(' ')[0] : ''
      },
      set (newVal) {
        this.form.start.date = newVal
      }
    },
    svcStartHrs: {
      get () {
        if (this.form.start.hrs) {
          return this.form.start.hrs
        } return this.info.mcOpenDate ? this.info.mcOpenDate.split(' ')[1].split(':')[0] : '00'
      },
      set (newVal) {
        this.form.start.hrs = newVal
      }
    },
    svcStartMin: {
      get () {
        if (this.form.start.min) {
          return this.form.start.min
        } return this.info.mcOpenDate ? this.info.mcOpenDate.split(' ')[1].split(':')[1] : '00'
      },
      set (newVal) {
        this.form.start.min = newVal
      }
    },
    svcStartSec: {
      get () {
        if (this.form.start.sec) {
          return this.form.start.sec
        } return this.info.mcOpenDate ? this.info.mcOpenDate.split(' ')[1].split(':')[2] : '00'
      },
      set (newVal) {
        this.form.start.sec = newVal
      }
    },
    salesEndDt: {
      get () {
        if (this.form.stopSales.date) {
          return this.form.stopSales.date
        } return this.info.saleStopDate ? this.info.saleStopDate.split(' ')[0] : ''
      },
      set (newVal) {
        this.form.stopSales.date = newVal
      }
    },
    salesEndHrs: {
      get () {
        if (this.form.stopSales.hours) {
          return this.form.stopSales.hours
        } return this.info.saleStopDate ? this.info.saleStopDate.split(' ')[1].split(':')[0] : '00'
      },
      set (newVal) {
        this.form.stopSales.hours = newVal
      }
    },
    salesEndMin: {
      get () {
        if (this.form.stopSales.minutes) {
          return this.form.stopSales.minutes
        } return this.info.saleStopDate ? this.info.saleStopDate.split(' ')[1].split(':')[1] : '00'
      },
      set (newVal) {
        this.form.stopSales.minutes = newVal
      }
    },
    salesEndSec: {
      get () {
        if (this.form.stopSales.seconds) {
          return this.form.stopSales.seconds
        } return this.info.saleStopDate ? this.info.saleStopDate.split(' ')[1].split(':')[2] : '00'
      },
      set (newVal) {
        this.form.stopSales.seconds = newVal
      }
    },
    breadcrumb () {
      const arr = [
        { label: '홈', url: '/' },
        { label: '콘텐츠 관리', url: '#' },
        { label: '작품 관리', url: '/content/piece' },
        {
          label: '회차 목록',
          url: `/content/piece/${this.$route.params.id}/edition`
        },
        { label: '회차 수정', url: this.$route.fullPath }
      ]
      return arr
    }
  },
  watch: {
    'form.thumbnailOpt' (val) {
      if (val === 1) {
        this.form.selectedThumbnail = ''
        this.form.selectedThumbnailIdx = null
      }
    },
    'form.stopSales.status' (val) {
      if (val === 1) {
        this.form.stopSales.date = ''
        this.form.stopSales.hours = '00'
        this.form.stopSales.minutes = '00'
        this.form.stopSales.seconds = '00'
      } else if (val === 2) {
        this.form.stopSales.hours = '00'
        this.form.stopSales.minutes = '00'
        this.form.stopSales.seconds = '00'
      } else if (val === 3 && this.info.saleStopDate) {
        this.form.stopSales.hours = this.info.saleStopDate.split(' ')[1].split(':')[0]
        this.form.stopSales.minutes = this.info.saleStopDate.split(' ')[1].split(':')[1]
        this.form.stopSales.seconds = this.info.saleStopDate.split(' ')[1].split(':')[2]
      } else {
        this.form.stopSales.hours = '00'
        this.form.stopSales.minutes = '00'
        this.form.stopSales.seconds = '00'
      }
    },
    'form.set10Pm' (val) {
      if (val) {
        this.form.start.hrs = '22'
        this.form.start.min = '00'
        this.form.start.sec = '00'
      } else {
        this.form.start.hrs = this.info.mcOpenDate.split(' ')[1].split(':')[0]
        this.form.start.min = this.info.mcOpenDate.split(' ')[1].split(':')[1]
        this.form.start.sec = this.info.mcOpenDate.split(' ')[1].split(':')[2]
      }
    },
    'form.setAutoTitle' (val) {
      if (val) {
        if (this.info.serialNo) {
          this.info.title = `${this.info.title} ${Number(this.info.serialNo) + 1}화`
        } else {
          this.info.title = `${this.info.title} 1화`
        }
      } else {
        this.info.title = this.originTitle
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
    /** 회차 수정 */
    async editSerial () {
      const mcOpenDate = `${this.svcStartDt} ${this.svcStartHrs}:${this.svcStartMin}:${this.svcStartSec}`
      const salesStopDate = await this.getSalesStopDate()

      try {
        const res = await this.$axios.put(`/api/cartoon/contents/updateSub/${this.$route.params.editionId}`, {
          subType: this.$route.query.menucode === '1' ? 'C' : 'N',
          cartoon_main_id: parseInt(this.$route.params.id),
          thumbnail_url: this.form.thumbnailOpt === 1 ? this.info.thumbnailUrl : this.form.selectedThumbnail,
          title: this.info.title,
          sub_title: this.info.subTitle,
          coin: this.info.coin,
          coin_rental: this.info.coinRental,
          point_rental: this.info.pointRental,
          isbn: this.info.isbn,
          status_code: this.info.statusCode,
          is_adult: this.info.isAdult,
          fake_serial_no: this.info.fakeSerialNo,
          serial_no: this.info.serialNo,
          is_serial: this.info.isSerial,
          is_same: this.info.isSame,
          is_free: this.info.isFree,
          is_keep: this.info.isKeep,
          is_season: this.info.isSeason,
          season_title: this.info.seasonTitle,
          comment: this.info.comment,
          sale_stop_date: salesStopDate,
          mc_open_date: mcOpenDate,
          display_end_date: this.info.displayEndDate,
          file_id: this.info.cartoonFileInfoId,
          sequent: this.info.sequent
        })

        if (res.status === 200) {
          alert('회차 수정이 완료 되었습니다.')
          await this.$router.push(`/content/piece/${this.$route.params.id}/edition`)
        }
      } catch (e) {
        console.log(e)
      }
    },

    selectThumbnail (idx) {
      if (this.form.thumbnailOpt === 2) {
        this.form.selectedThumbnail = this.info.thumbnailUrlList[idx]
        this.form.selectedThumbnailIdx = idx
      } else {
        this.form.selectedThumbnail = ''
        this.form.selectedThumbnailIdx = null
      }
    },

    getSalesStopDate () {
      let salesStopDate
      if (this.form.stopSales.status === 1) {
        salesStopDate = ''
      } else if (this.form.stopSales.status === 2) {
        const yr = new Date().getFullYear()
        const mon = new Date().getMonth() + 1
        const dt = new Date().getDate()
        salesStopDate = `${yr}-${mon >= 10 ? mon : `0${mon}`}-${dt}`
      } else {
        salesStopDate =
            `${this.info.saleStopDate ? this.info.saleStopDate.split(' ')[0] : this.form.stopSales.date} ${this.form.stopSales.hours}:${this.form.stopSales.minutes}:${this.form.stopSales.seconds}`
      }
      return salesStopDate
    },

    /** 회차 이슈사항 삭제 */
    async removeIssue (id) {
      try {
        const { status } = await this.$axios.delete(`/api/cartoon/contents/delete/issue/${id}`)
        if (status === 200) {
          alert('이슈사항 삭제가 완료 되었습니다.')
          await this.getSerialIssueList()
        }
      } catch (err) {
        alert('삭제가 되지 않았습니다. 다시 시도해보십시오.')
      }
    },

    /** 회차 이슈사항 등록 */
    async addSerialIssue () {
      try {
        const res = await this.$axios.post(`/api/cartoon/contents/regist/issue/${this.$route.params.id}/${this.$route.params.editionId}`, {
          comment: this.form.issue
        })

        if (res.status === 200) {
          alert('회차 이슈사항이 등록 되었습니다.')
          this.form.issue = ''
          await this.getSerialIssueList()
        }
      } catch (e) {
        console.log(e)
      }
    },

    /** 회차 이슈사항 목록 */
    async getSerialIssueList () {
      this.isLoading = true

      try {
        const { status, data: { data } } = await this.$axios.get(`/api/cartoon/contents/list/issue/${this.$route.params.id}/${this.$route.params.editionId}`)

        if (status === 200) {
          this.list = data.list
        }
      } catch (e) {
        console.log(e)
      } finally {
        this.isLoading = false
      }
    },

    /** 상단 정보 */
    async getTopInfo () {
      try {
        const { status, data: { data } } = await this.$axios.get(`/api/cartoon/contents/update/sub/${this.$route.params.editionId}/${this.$route.query.menucode}`)

        if (status === 200) {
          this.topInfo = data
        }
      } catch (e) {
        console.log(e)
      }
    },

    /** 회차 상세 */
    async getInfo () {
      this.isInfoLoading = true

      try {
        const { status, data: { data } } = await this.$axios.get(`/api/cartoon/contents/detail/sub/${this.$route.params.editionId}/${this.$route.query.menucode}`)
        if (status === 200) {
          this.info = data
          this.originTitle = data.title

          if (this.info.saleStopDate) {
            console.log(this.info.saleStopDate.split(' ')[1].split(':')[0])
            this.form.stopSales.status = 3
          }
        }
      } catch (e) {
        console.log(e)
      } finally {
        this.isInfoLoading = false
      }
    },

    /** 원고 업로드 */
    async uploadDraft (e) {
      for (let i = 0; i < e.target.files.length; i++) {
        const file = e.target.files[i]

        const form = new FormData()
        form.append('file', file)

        const { status, data } = await this.$axios.post('/api/file/upload', form, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        if (status === 200) {
          this.info.sequent.push(data)
        }
      }
    },

    /** 원고 이미지 삭제 */
    deleteListImg (index) {
      this.info.sequent.splice(index, 1)
    },

    /**
     * Thumbnail 이미지 업로드, 소설일 때 원고
     * * @param type THUMBNAIL or NOVEL
     * */
    async uploadSingleImg (e, type) {
      const form = new FormData()

      if (e.target.files.length > 0) {
        form.append('file', e.target.files[0])
        // 파일 태우기
        const { status, data } = await this.$axios.post('/api/file/upload', form, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        if (status === 200) {
          if (type === 'THUMBNAIL') {
            this.info.thumbnailUrl = data
          } else {
            this.form.novelDraft = data
          }
        }
      }
    }
  }
}
</script>
