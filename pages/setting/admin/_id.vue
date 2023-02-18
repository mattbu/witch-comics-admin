<template>
  <b-container fluid class="page-min-height py-3">
    <UiPageTitle
      title="관리자 계정 정보"
      :breadcrumb="breadcrumb"
    >
      <template #buttons>
        <b-button variant="outline-primary" @click="$router.push('/setting/admin')">
          취소
        </b-button>
        <b-button variant="primary">
          수정
        </b-button>
      </template>
    </UiPageTitle>
    <hr>
    <b-card>
      <b-container fluid>
        <b-row class="mb-3">
          <b-col cols="2" class="font-weight-700" align-self="center">
            아이디
          </b-col>
          <b-col cols="auto">
            example@example.com (카카오)
          </b-col>
        </b-row>
        <hr>
        <b-row class="mb-3">
          <b-col cols="2" class="font-weight-700" align-self="center">
            비밀번호
          </b-col>
          <b-col cols="auto" align-self="center" class="d-inline-flex">
            <b-form-input v-model="form.password" class="w-100" />
          </b-col>
        </b-row>
        <hr>
        <b-row class="mb-3">
          <b-col cols="2" class="font-weight-700" align-self="center">
            계정명
          </b-col>
          <b-col cols="auto">
            대표 관리자
          </b-col>
        </b-row>
        <b-row class="mb-3">
          <b-col cols="2" class="font-weight-700" align-self="start">
            CP
          </b-col>
          <b-col cols="auto">
            <b-form-group v-slot="{ ariaDescribedby }">
              <b-form-radio-group
                v-model="form.cp"
                :options="cpOptions"
                :aria-describedby="ariaDescribedby"
              />
            </b-form-group>
            <template v-if="form.cp === 2">
              <b-form-group v-slot="{ ariaDescribedby }" class="mt-3">
                <b-form-select
                  v-model="form.selectCp"
                  :options="cpList"
                  :aria-describedby="ariaDescribedby"
                />
              </b-form-group>
            </template>
          </b-col>
        </b-row>
        <b-row class="mb-3">
          <b-col cols="2" class="font-weight-700" align-self="start">
            활성 기간
          </b-col>
          <b-col cols="auto" class="d-inline-flex" align-self="center">
            <span class="mr-3">2022-10-20 ~ 2022-12-31</span>
            <b-form-checkbox v-model="form.editPeriod">
              수정
            </b-form-checkbox>
          </b-col>
        </b-row>
        <!---->
        <b-row v-if="form.editPeriod" class="mb-3">
          <b-col cols="2" class="font-weight-700" align-self="center">
            기간 설정
          </b-col>
          <b-col cols="auto" class="d-inline-flex" align-self="center">
            <div class="d-inline-flex">
              <div class="">
                <label for="start-date" class="fs-14 mb-0">시작일</label>
                <b-form-datepicker
                  id="start-date"
                  v-model="form.startDate"
                  placeholder="시작일 선택"
                  :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
                />
              </div>
              <div class="ml-2">
                <label for="end-date" class="fs-14 mb-0">종료일</label>
                <b-form-datepicker
                  id="end-date"
                  v-model="form.endDate"
                  placeholder="종료일 선택"
                  :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
                />
              </div>
            </div>
          </b-col>
        </b-row>

        <b-row>
          <b-col cols="2" class="font-weight-700" align-self="center">
            권한
          </b-col>
          <b-col cols="auto" align-self="center">
            <b-form-group v-slot="{ ariaDescribedby }">
              <b-form-radio-group
                v-model="form.auth"
                :options="authOptions"
                :aria-describedby="ariaDescribedby"
              />
            </b-form-group>
          </b-col>
        </b-row>
      </b-container>
    </b-card>
    <b-row class="pt-5" align-h="between">
      <b-col align-self="center">
        <h6>활동 내역</h6>
      </b-col>
    </b-row>
    <hr class="my-2">
    <b-row align-h="start" class="mb-4">
      <b-col cols="auto">
        <b-button variant="outline-primary" class="table-inner-btn">
          전체
        </b-button>
        <b-button variant="outline-primary" class="table-inner-btn">
          웹툰/만화
        </b-button>
        <b-button variant="outline-primary" class="table-inner-btn">
          소설
        </b-button>
      </b-col>
    </b-row>
    <b-table
      class="list"
      :items="items"
      :fields="fields"
      :per-page="perPage"
      stacked="md"
      show-empty
      small
    >
      <template #empty>
        <PageNoResult />
      </template>
      <template #cell(no)="data">
        {{ (totalRows * items.length - (data.index + 1) + 1) }}
      </template>
    </b-table>
  </b-container>
</template>

<script>
export default {
  name: 'SettingAdminEditPage',
  data () {
    return {
      form: {
        password: '',
        cp: null,
        selectCp: null,
        editPeriod: false,
        startDate: '',
        endDate: '',
        auth: null
      },
      cpOptions: [
        { text: '전체', value: 1 },
        { text: '선택', value: 2 }
      ],
      cpList: [
        { text: '선택', value: null },
        { text: 'CP1', value: 1 },
        { text: 'CP2', value: 2 },
        { text: 'CP3', value: 3 }
      ],
      authOptions: [
        { text: '전체', value: 1 },
        { text: '설정', value: 2 }
      ],
      //
      items: [
        {
          id: 1123,
          type: '물약',
          quantity: '10개',
          reason: '쿠폰 입력',
          status: '지급',
          admin: 'OOO',
          time: '2022-10-20 12:00'
        },
        {
          id: 1123,
          type: '물약',
          quantity: '10개',
          reason: '쿠폰 입력',
          status: '지급',
          admin: 'OOO',
          time: '2022-10-20 12:00'
        },
        {
          id: 1123,
          type: '물약',
          quantity: '10개',
          reason: '쿠폰 입력',
          status: '지급',
          admin: 'OOO',
          time: '2022-10-20 12:00'
        }
      ],
      fields: [
        { key: 'no', label: 'No.' },
        { key: 'type', label: '포인트 종류' },
        { key: 'quantity', label: '개수' },
        { key: 'reason', label: '사유' },
        { key: 'status', label: '소진/지급' },
        { key: 'admin', label: '담당자' },
        { key: 'time', label: '시간' }
      ],
      totalRows: 0,
      perPage: 20

    }
  },
  computed: {
    breadcrumb () {
      const arr = [
        { label: '홈', url: '/' },
        { label: '설정', url: '#' },
        { label: '관리자 계정', url: '/setting/admin' },
        { label: '관리자 계정 정보', url: this.$route.path }
      ]
      return arr
    }
  },
  watch: {},
  created () {},
  mounted () {
    this.totalRows = this.items.length
  },
  methods: {}
}
</script>
