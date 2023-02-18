<template>
  <b-container fluid class="page-min-height py-3">
    <UiPageTitle title="메시지 전송" :breadcrumb="breadcrumb" />
    <hr>
    <!--    필터-->
    <b-row class="mt-3 px-3">
      <b-col lg="12" class="my-1 d-inline-flex">
        <legend class="pl-0 col-sm-2 fs-14 text-sm-left mb-0 align-self-center">
          수신인
        </legend>
        <b-form-input v-model="form.receive" class="align-self-center w-25" />
        <b-button variant="primary" class="ml-2 align-self-center">
          검색
        </b-button>
      </b-col>

      <b-col lg="12" class="mt-3 d-inline-flex">
        <legend class="pl-0 col-sm-2 fs-14 text-sm-left mb-0 align-self-center">
          설정된 수신인
        </legend>
        <b-button variant="primary" class="align-self-center">
          더보기
        </b-button>
      </b-col>

      <b-col lg="12" class="my-3">
        <b-form-group
          v-slot="{ ariaDescribedby }"
          label="메시지 종류"
          label-cols-sm="2"
          label-align-sm="left"
          label-size="sm"
          class="mb-0"
        >
          <b-form-checkbox-group
            v-model="form.type"
            :aria-describedby="ariaDescribedby"
            class="mt-1"
          >
            <b-form-checkbox value="age">
              알림
            </b-form-checkbox>
            <b-form-checkbox value="isActive">
              카카오
            </b-form-checkbox>
          </b-form-checkbox-group>
        </b-form-group>
      </b-col>

      <b-col lg="12" class="my-1">
        <b-form-group
          v-slot="{ ariaDescribedby }"
          label="메시지 내용"
          label-cols-sm="2"
          label-align-sm="left"
          label-size="sm"
          class="mb-0"
        >
          <b-form-textarea
            v-model="form.message"
            :aria-describedby="ariaDescribedby"
            rows="3"
            max-rows="6"
          />
        </b-form-group>
      </b-col>

      <b-col lg="12" class="mt-3 d-inline-flex">
        <legend class="pl-0 col-sm-2 fs-14 text-sm-left mb-0 align-self-center">
          예약 설정
          <UiTooltipButton target-id="reservation-tooltip" />
          <UiTooltip
            target="reservation-tooltip"
            description="기능을 사용할 시 설정된 날짜에 메시지가 전송되는 기능입니다."
          />
        </legend>
        <div class="d-inline-flex">
          <div class="mr-5 align-self-center">
            <b-form-checkbox v-model="form.setReservation">
              설정
            </b-form-checkbox>
          </div>
          <div class="pr-2 align-self-center">
            <label for="date" class="fs-14 mb-1">날짜</label>
            <b-form-datepicker
              id="date"
              v-model="form.date"
              placeholder="시작일 선택"
              :date-format-options="{
                year: 'numeric',
                month: 'numeric',
                day: 'numeric'
              }"
            />
          </div>
          <div class="pr-2 align-self-center">
            <label for="hours" class="fs-14 mb-1">시간</label>
            <b-form-select
              id="hours"
              v-model="form.hours"
              :options="hoursOptions"
            />
          </div>
          <div class="pr-2 align-self-center">
            <label for="minutes" class="fs-14 mb-1">분</label>
            <b-form-select
              id="minutes"
              v-model="form.minutes"
              :options="minutesOptions"
            />
          </div>
        </div>
      </b-col>
    </b-row>
    <hr>
    <b-row align-h="center" class="mb-4">
      <b-col cols="2">
        <b-button variant="primary" class="w-75">
          전송
        </b-button>
      </b-col>
    </b-row>
    <b-tabs class="mt-5 pt-5" content-class="mt-3">
      <b-tab title="전체 메시지 (20)" active>
        <!-- 테이블 -->
        <b-table
          class="list"
          :items="allMsgItems"
          :fields="allMsgFields"
          :current-page="currentPage"
          :per-page="perPage"
          stacked="md"
          show-empty
          small
        >
          <template #empty>
            <PageNoResult />
          </template>
          <template #cell(no)="data">
            {{ totalRows - (currentPage - 1) * perPage - (data.index + 1) + 1 }}
          </template>
          <template #cell(status)="data">
            {{ data.value === 1 ? '예약' : '발송' }}
            <b-button
              v-if="data.value === 1"
              variant="outline-secondary"
              class="ml-2 table-inner-btn"
            >
              취소
            </b-button>
          </template>
          <template #cell(setting)>
            <b-button variant="outline-secondary" class="table-inner-btn">
              상세
            </b-button>
          </template>
        </b-table>
        <UiPagination
          class="py-4"
          :page="currentPage"
          :per-page="perPage"
          :total-rows="totalRows"
          @change-page="currentPage = $event"
        />
      </b-tab>
      <b-tab title="예약 메시지 (20)">
        <!-- 테이블 -->
        <b-table
          class="list"
          :items="allMsgItems"
          :fields="allMsgFields"
          :current-page="currentPage"
          :per-page="perPage"
          stacked="md"
          show-empty
          small
        >
          <template #empty>
            <PageNoResult />
          </template>
          <template #cell(no)="data">
            {{ totalRows - (currentPage - 1) * perPage - (data.index + 1) + 1 }}
          </template>
          <template #cell(status)="data">
            {{ data.value === 1 ? '예약' : '발송' }}
            <b-button
              v-if="data.value === 1"
              variant="outline-secondary"
              class="table-inner-btn ml-2"
            >
              취소
            </b-button>
          </template>
          <template #cell(setting)>
            <b-button variant="outline-secondary" class="table-inner-btn">
              상세
            </b-button>
          </template>
        </b-table>
        <UiPagination
          class="py-4"
          :page="currentPage"
          :per-page="perPage"
          :total-rows="totalRows"
          @change-page="currentPage = $event"
        />
      </b-tab>
    </b-tabs>
    <UiCenterModal
      modal-id="add-group-modal"
      modal-title="그룹 등록하기"
      ok-title="등록"
      cancel-title="취소"
    >
      <template #contents>
        <b-container fluid class="px-0">
          <b-row>
            <b-col>
              <b-row class="px-3">
                <b-col lg="12" class="my-1">
                  <b-form-group
                    label="그룹명"
                    label-cols-sm="2"
                    label-align-sm="left"
                    label-size="sm"
                    label-class="align-self-center"
                    class="mb-0"
                  >
                    <b-form-input placeholder="그룹명" class="w-60" />
                  </b-form-group>
                </b-col>
                <b-col lg="12" class="my-1">
                  <b-form-group
                    label="회원"
                    label-cols-sm="2"
                    label-align-sm="left"
                    label-size="sm"
                    label-class="align-self-center"
                    class="mb-0"
                  >
                    <div class="d-inline-flex w-100">
                      <b-form-input
                        placeholder="회원"
                        class="align-self-center w-60"
                      />
                      <b-button
                        variant="primary"
                        class="align-self-center ml-2"
                      >
                        검색
                      </b-button>
                      <b-button
                        variant="primary"
                        class="align-self-center ml-2"
                      >
                        엑셀 등록
                      </b-button>
                    </div>
                  </b-form-group>
                </b-col>
              </b-row>
              <hr>
              <h6>설정 된 그룹 회원</h6>
              <table class="table border mt-3">
                <tr class="cursor-pointer">
                  <td>123</td>
                  <td>123</td>
                  <td>123</td>
                </tr>
                <tr class="cursor-pointer">
                  <td>123</td>
                  <td>123</td>
                  <td>123</td>
                </tr>
                <tr class="cursor-pointer">
                  <td>123</td>
                  <td>123</td>
                  <td>123</td>
                </tr>
              </table>
              <hr class="mt-4">
              <b-row class="mt-4 mb-5">
                <b-col cols="auto">
                  <h6>예시)</h6>
                </b-col>
                <b-col cols="3">
                  <table class="table border">
                    <tr>
                      <td>example@example.com</td>
                    </tr>
                    <tr>
                      <td>example@example.com</td>
                    </tr>
                    <tr>
                      <td>example@example.com</td>
                    </tr>
                  </table>
                </b-col>
                <b-col cols="12">
                  <p class="text-muted fs-13">
                    엑셀 파일은 예시와 같이 첫칸에 메일만 입력하여 업로드 하시면
                    됩니다.
                  </p>
                  <p class="text-muted fs-13">
                    엑셀 파일의 메일 주소가 사용자와 일치하는 정보가 없을 경우
                    받는 사람에 추가되지 않습니다.
                  </p>
                </b-col>
              </b-row>
            </b-col>
          </b-row>
        </b-container>
      </template>
    </UiCenterModal>
  </b-container>
</template>

<script>
import { timeOptions } from '@/plugins/mixins'

export default {
  name: 'UserMessageSendListPage',
  mixins: [timeOptions],
  data () {
    return {
      form: {
        receive: '',
        type: [],
        message: '',
        setReservation: false,
        date: '',
        hours: '00',
        minutes: '00'
      },
      hoursOptions: [],
      minutesOptions: [],
      secondsOptions: [],
      selectedUsers: [],
      //
      currentPage: 1,
      totalRows: 0,
      perPage: 20,
      //
      allMsgItems: [
        {
          id: 72,
          receiver: '전체',
          type: '알림',
          content: '금주의 추천 작품리스트',
          admin: 'OOO',
          created_at: '2022-10-20 12:00',
          status: 1
        },
        {
          id: 7,
          receiver: '전체',
          type: '알림',
          content: '금주의 추천 작품리스트',
          admin: 'OOO',
          created_at: '2022-10-20 12:00',
          status: 2
        },
        {
          id: 733333,
          receiver: '전체',
          type: '알림',
          content: '금주의 추천 작품리스트',
          admin: 'OOO',
          created_at: '2022-10-20 12:00',
          status: 1
        }
      ],
      allMsgFields: [
        { key: 'no', label: 'No.' },
        { key: 'receiver', label: '수신인' },
        { key: 'type', label: '메시지 종류' },
        { key: 'content', label: '메시지 내용' },
        { key: 'admin', label: '담당자' },
        { key: 'created_at', label: '발송 날짜' },
        { key: 'status', label: '상태' },
        { key: 'setting', label: '관리' }
      ]
    }
  },
  computed: {
    breadcrumb () {
      const arr = [
        { label: '홈', url: '/' },
        { label: '회원 관리', url: '#' },
        { label: '메시지', url: '#' },
        { label: '메시지 전송', url: this.$route.path }
      ]
      return arr
    }
  },
  watch: {},
  created () {},
  mounted () {
    this.totalRows = this.allMsgFields.length
    this.hoursOptions = this.getHours()
    this.minutesOptions = this.getMinutes()
    this.secondsOptions = this.getSeconds()
  },
  methods: {
    openAddGroupModal (id) {
      this.$root.$emit('bv::show::modal', id)
    }
  }
}
</script>
