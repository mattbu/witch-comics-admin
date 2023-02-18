<template>
  <b-container fluid class="page-min-height py-3">
    <UiPageTitle title="회차 등록" :breadcrumb="breadcrumb">
      <template #buttons>
        <b-button
          variant="outline-primary"
          @click="$router.push(`/content/piece/${$route.params.id}/edition`)"
        >
          취소
        </b-button>
        <b-button variant="primary" @click="addSerial">
          등록
        </b-button>
      </template>
    </UiPageTitle>
    <hr>
    <b-row class="mt-4">
      <b-col cols="12">
        <p class="font-weight-bold mb-2">
          최근 등록 정보
        </p>
        <table class="table border mb-0 table-layout-fixed">
          <tbody>
            <!-- 정보 -->
            <tr>
              <th>총 등록 화 수</th>
              <td>{{ info.totalSub ? info.totalSub : '-' }}</td>
              <th>판매중인 화 수</th>
              <td>{{ info.saleSub ? info.saleSub : '-' }}</td>
              <th>이전 등록 화 수</th>
              <td>{{ info.preSub ? info.preSub : '-' }}</td>
            </tr>
            <tr>
              <th>최근등록 제목</th>
              <td colspan="5">
                {{ info.preTitle ? info.preTitle : '-' }}
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
                    v-model="form.title"
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
                  v-model="form.sub_title"
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
                  v-model="form.serial_no"
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
                  <b-form-checkbox v-model="form.is_serial" value="y" unchecked-value="n">
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
                {{ form.title ? form.title : '-' }}
              </td>
            </tr>
            <tr>
              <th>ISBN</th>
              <td colspan="3">
                <div class="d-flex align-items-center">
                  <b-form-input v-model="form.isbn" type="text" class="w-20" placeholder="ISBN 입력" />
                </div>
              </td>
            </tr>
            <tr>
              <th>회차 연령등급*</th>
              <td colspan="3">
                <div class="d-inline-flex">
                  <b-form-radio-group
                    v-model="form.is_adult"
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
                    이미지 추가 ({{ form.thumbnail_url ? '1' : '0' }}/1개)
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
                  <b-row v-if="form.thumbnail_url" class="mt-3">
                    <b-col cols="2">
                      <div class="thumbnail-wrapper">
                        <img :src="form.thumbnail_url" class="preview" alt="">
                      </div>
                    </b-col>
                  </b-row>
                </template>
                <template v-else>
                  <b-row class="mt-3">
                    <template v-if="!isThumbnailListLoading && thumbnailUrlList.length > 0">
                      <b-col
                        v-for="(url, idx) in thumbnailUrlList"
                        :key="`listImgUrl-${idx}`"
                        cols="2"
                        class="mb-3"
                      >
                        <div class="add-thumbnail-wrapper" style="cursor: pointer" @click="selectThumbnail(idx)">
                          <img
                            v-if="url"
                            :src="url"
                            class="preview"
                            :class="selectedThumbnailIdx === idx ? 'selected' : ''"
                            alt=""
                          >
                        </div>
                      </b-col>
                    </template>
                    <template v-else-if="!isThumbnailListLoading && !thumbnailUrlList.length">
                      <b-col cols="12" class="mb-3">
                        <span class="text-muted">등록된 작품 목록 이미지가 없습니다.</span>
                      </b-col>
                    </template>
                    <template v-else>
                      <b-col cols="12" class="mb-3">
                        <b-spinner variant="primary" class="align-middle" />
                        <span class="ml-3">데이터를 불러오고 있습니다.</span>
                      </b-col>
                    </template>
                  </b-row>
                </template>
              </td>
            </tr>
            <tr>
              <th>원고*</th>
              <td colspan="3">
                <p class="mb-2">
                  이미지 추가 ({{ form.sequent.length }}개)
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

                <template v-if="form.sequent.length > 0">
                  <draggable
                    v-model="form.sequent"
                    tag="div"
                    class="row mt-3"
                    ghost-class="ghost"
                    :class="{ 'd-none': !form.sequent.length }"
                  >
                    <b-col
                      v-for="(file, idx) in form.sequent"
                      :key="`file-${idx}`"
                      cols="2"
                      class="mb-3"
                    >
                      <div class="add-thumbnail-wrapper">
                        <img
                          v-if="file"
                          :src="file"
                          class="preview pointer-event"
                          alt=""
                        >
                        <b-button
                          variant="transparent"
                          class="p-0 ml-3 d-flex img-delete-btn"
                          @click="deleteListImg(idx)"
                        >
                          <b-icon
                            variant="dark"
                            icon="x"
                            font-scale="1.2"
                          />
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
                      v-model="form.start.date"
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
                      v-model="form.start.hrs"
                      :options="hoursOptions"
                      :disabled="form.set10Pm"
                    />
                  </div>
                  <div class="w-20 pr-2">
                    <label for="service-start-minutes">분</label>
                    <b-form-select
                      id="service-start-minutes"
                      v-model="form.start.min"
                      :options="minutesOptions"
                      :disabled="form.set10Pm"
                    />
                  </div>
                  <div class="w-20 pr-2">
                    <label for="service-start-seconds">초</label>
                    <b-form-select
                      id="service-start-seconds"
                      v-model="form.start.sec"
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
                  <b-form-input v-model="form.comment" type="text" class="w-50" placeholder="입력" />
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
                    v-model="form.is_free"
                    :options="saleTypeOptions"
                  />
                </div>
              </td>
            </tr>
            <tr v-if="form.is_free === 2">
              <th>회차 열람 이용자</th>
              <td colspan="3">
                <div class="d-inline-flex align-item-center">
                  <div class="d-inline-flex">
                    <b-form-radio-group
                      v-model="form.serialOpenUser"
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
                      v-model="form.is_same"
                      class="align-self-center"
                      :options="setPriceOptions"
                    />
                  </div>
                  <div class="d-flex justify-content-center ml-3 align-self-center">
                    <span class="align-self-center">대여</span>
                    <b-form-input
                      v-model="form.coin_rental"
                      type="text"
                      placeholder="갯수"
                      class="w-25 ml-2"
                      :disabled="form.is_same === 'y'"
                    />
                    <span class="align-self-center ml-2">물약</span>
                  </div>
                  <div class="d-flex justify-content-center align-self-center">
                    <span class="align-self-center">대여</span>
                    <b-form-input
                      v-model="form.point_rental"
                      type="text"
                      placeholder="갯수"
                      class="w-25 ml-2"
                      :disabled="form.is_same === 'y'"
                    />
                    <span class="align-self-center ml-2">호박</span>
                  </div>
                  <div class="d-flex justify-content-center align-self-center">
                    <span class="align-self-center">소장</span>
                    <b-form-input
                      v-model="form.coin"
                      type="text"
                      placeholder="갯수"
                      class="w-25 ml-2"
                      :disabled="form.is_same === 'y'"
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
                    v-model="form.is_keep"
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
                <b-form-checkbox v-model="form.is_season" value="y" unchecked-value="n">
                  시작
                </b-form-checkbox>
              </td>
            </tr>
            <tr>
              <th>시즌 타이틀</th>
              <td colspan="3">
                <b-form-input v-model="form.season_title" placeholder="시즌 타이틀 입력" class="w-35" />
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
  </b-container>
</template>

<script>
import draggable from 'vuedraggable'
import { timeOptions } from '@/plugins/mixins'

export default {
  name: 'ContentPieceAddEditionPage',
  components: { draggable },
  mixins: [timeOptions],
  data () {
    return {
      info: {},
      // 등록 폼
      form: {
        // 신규 등록 정보
        title: '', // 회차 제목
        setAutoTitle: false, // 제목 자동설정 -
        sub_title: '', // 부제
        serial_no: '', // 화 수
        is_serial: 'n', // 화수 미포함
        isbn: '', // ISBN
        is_adult: '0', // 회차 연령 등급
        thumbnailOpt: 1, // 회차 썸네일 옵션 -
        thumbnail_url: null, // 회차 썸네일
        sequent: [], // 원고
        novelDraft: null, // 소설일 때 원고 epub 파일
        start: { // 서비스 시작일
          date: '',
          hrs: '00',
          min: '00',
          sec: '00'
        },
        set10Pm: false, // 22:00로 설정 -
        comment: '', // 작가의 한마디

        // 회차 가격 정보
        is_free: 'y', // 판매 유형
        is_login: 'y', // 판매 유형일 때 회차 열람 이용자
        is_same: 'y', // 가격 설정
        coin_rental: '', // 대여 물약 개수
        point_rental: '', // 대여 호박 개수
        coin: '', // 구매 물약 개수
        is_keep: 'y', // 소장 구매 설정

        // 시즌 정보
        is_season: 'n', // 시즌 시작
        season_title: '' // 시즌 타이틀
      },

      isThumbnailListLoading: false,
      thumbnailUrlList: [], // 작품 목록 이미지
      selectedThumbnail: '',
      selectedThumbnailIdx: null,
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
      ]
    }
  },
  async fetch () {
    await this.getInfo()
  },
  computed: {
    breadcrumb () {
      const arr = [
        { label: '홈', url: '/' },
        { label: '콘텐츠 관리', url: '#' },
        {
          label: '회차 등륵',
          url: this.$route.fullPath
        }
      ]
      return arr
    }
  },
  watch: {
    async 'form.thumbnailOpt' (val) {
      if (val === 2) {
        await this.getThumbnailList()
      } else {
        this.selectedThumbnail = ''
        this.selectedThumbnailIdx = null
      }
    },
    'form.setAutoTitle' (val) {
      if (val) {
        if (this.info.preSub) {
          this.form.title = `${this.form.title} ${Number(this.info.preSub.split('화')[0]) + 1}화`
        } else {
          this.form.title = `${this.form.title} 1화`
        }
      } else {
        this.form.title = ''
      }
    },
    'form.set10Pm' (val) {
      if (val) {
        this.form.start.hrs = '22'
      } else {
        this.form.start.hrs = '00'
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
    selectThumbnail (idx) {
      if (this.form.thumbnailOpt === 2) {
        this.selectedThumbnail = this.thumbnailUrlList[idx]
        this.selectedThumbnailIdx = idx
      } else {
        this.selectedThumbnail = ''
        this.selectedThumbnailIdx = null
      }
    },

    async getThumbnailList () {
      this.isThumbnailListLoading = true

      try {
        const { status, data: { data } } = await this.$axios.post(`/api/cartoon/contents/regist/sub/thumbnail/${this.$route.params.id}`)

        if (status === 200) {
          this.thumbnailUrlList = data
        }
      } catch (e) {
        console.log(e)
      } finally {
        this.isThumbnailListLoading = false
      }
    },

    setAddForm () {
      this.form.mc_open_date = '' // 서비스 시작일
      if (this.form.start.date) {
        this.form.mc_open_date =
            `${this.form.start.date} ${this.form.start.hrs}:${this.form.start.min}:${this.form.start.sec}`
      }
      this.form.status_code = '' // ???

      delete this.form.setAutoTitle
      delete this.form.thumbnailOpt
      delete this.form.set10Pm
      delete this.form.serialOpenUser
      delete this.form.novelDraft
      delete this.form.start
    },
    /** 회차 등록 */
    async addSerial () {
      this.setAddForm()

      try {
        const { status } = await this.$axios.post('/api/cartoon/contents/regist/sub', {
          subType: this.$route.query.menucode === '1' ? 'C' : 'N',
          cartoon_main_id: parseInt(this.$route.params.id),
          thumbnail_url: this.form.thumbnailOpt === 1 ? this.form.thumbnail_url : this.selectedThumbnail,
          ...this.form
        })

        if (status === 200) {
          alert('회차 등록이 완료 되었습니다.')
          await this.$router.push(`/content/piece/${this.$route.params.id}/edition`)
        }
      } catch (e) {
        console.log(e)
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
          this.form.sequent.push(data)
        }
      }
    },
    /** 원고 이미지 삭제 */
    deleteListImg (index) {
      if (this.form.sequent.length > 0) {
        this.form.sequent.splice(index, 1)
      }
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
            this.form.thumbnail_url = data
          } else {
            this.form.novelDraft = data
          }
        }
      }
    },
    /** 최근 등록 정보 */
    async getInfo () {
      try {
        const { status, data: { data } } = await this.$axios.get(`/api/cartoon/contents/regist/sub/${this.$route.params.id}`)
        if (status === 200) {
          this.info = data
        }
      } catch (e) {
        console.log()
      }
    }
  }
}
</script>
