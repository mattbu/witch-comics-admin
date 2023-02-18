<template>
  <b-container fluid class="page-min-height py-3">
    <UiPageTitle
      title="나의 정보"
      :breadcrumb="breadcrumb"
    />
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
            <b-form-input v-model="password" class="w-70" />
            <b-button variant="primary" class="ml-3">
              수정
            </b-button>
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
          <b-col cols="2" class="font-weight-700" align-self="center">
            CP
          </b-col>
          <b-col cols="auto">
            전체
          </b-col>
        </b-row>
        <b-row class="mb-3">
          <b-col cols="2" class="font-weight-700" align-self="center">
            활성 기간
          </b-col>
          <b-col cols="auto" align-self="center">
            <span>2022-10-20 ~ 2022-12-31</span>
          </b-col>
        </b-row>
        <b-row>
          <b-col cols="2" class="font-weight-700" align-self="center">
            권한
          </b-col>
          <b-col cols="auto" align-self="center">
            전체
          </b-col>
        </b-row>
      </b-container>
    </b-card>
    <b-row class="pt-5" align-h="between">
      <b-col align-self="center">
        <h6>1:1 문의 내역</h6>
      </b-col>
    </b-row>
    <hr class="my-2">
    <b-row align-h="start" class="mb-4">
      <b-col cols="auto">
        <b-button variant="outline-primary" class="table-inner-btn">
          전체
        </b-button>
        <b-button variant="outline-primary" class="table-inner-btn">
          읽음
        </b-button>
        <b-button variant="outline-primary" class="table-inner-btn">
          안 읽음
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

    <b-row class="mt-5" align-h="between">
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
      :items="usageItems"
      :fields="usageFields"
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
  name: 'SettingInfoPage',
  data () {
    return {
      password: '',
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
      usageItems: [
        {
          id: 1123,
          title: '000 1화',
          type: '매거진',
          payment: '정액제',
          method: '대여',
          time: '2022-10-20 12:00'
        },
        {
          id: 1123,
          title: '000 1화',
          type: '매거진',
          payment: '정액제',
          method: '대여',
          time: '2022-10-20 12:00'
        },
        {
          id: 1123,
          title: '000 1화',
          type: '매거진',
          payment: '정액제',
          method: '대여',
          time: '2022-10-20 12:00'
        }
      ],
      usageFields: [
        { key: 'no', label: 'No.' },
        { key: 'title', label: '감상 이력' },
        { key: 'type', label: '콘텐츠' },
        { key: 'payment', label: '이용 상품' },
        { key: 'method', label: '이용 방법' },
        { key: 'time', label: '이용 시간' }
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
        { label: '나의 정보', url: this.$route.path }
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
