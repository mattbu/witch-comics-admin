<template>
  <b-container fluid class="page-min-height py-3">
    <UiPageTitle title="상품 그룹 등록" :breadcrumb="breadcrumb">
      <template #buttons>
        <!-- <b-button -- 변경가능
          variant="outline-primary"
          @click="$router.push('/promotion/itamu')"
        >
          취소
        </b-button> -->
        <b-button variant="primary" @click="enroll">
          등록
        </b-button>
      </template>
    </UiPageTitle>
    <hr>
    <b-row class="mt-3 px-3">
      <b-col lg="12" class="my-1">
        <b-form-group
          label="그룹 타이틀"
          label-cols-sm="2"
          label-align-sm="left"
          label-size="sm"
          class="mb-0 align-items-center"
        >
          <div class="d-inline-flex">
            <b-form-input v-model="searchValue" />
          </div>
        </b-form-group>
      </b-col>
      <b-col lg="12" class="my-1">
        <b-form-group
          v-slot="{ ariaDescribedby }"
          label="대기"
          label-cols-sm="2"
          label-align-sm="left"
          label-size="sm"
          class="mb-0"
        >
          <b-form-checkbox-group
            v-model="filter.grade"
            :options="userGradeOptions"
            :aria-describedby="ariaDescribedby"
            class="mt-1"
          />
          대기
        </b-form-group>
      </b-col>
      <b-col lg="12" class="my-1">
        <b-form-group
          v-slot="{ ariaDescribedby }"
          label="시작일"
          label-cols-sm="2"
          label-align-sm="left"
          label-size="sm"
          class="mb-0"
        >
          <b-form-checkbox-group
            v-model="filter.grade"
            :options="userGradeOptions"
            :aria-describedby="ariaDescribedby"
            class="mt-1"
          />
          설정
        </b-form-group>
      </b-col>
      <b-col lg="12" class="my-1">
        <b-form-group
          v-slot="{ ariaDescribedby }"
          label="종료일"
          label-cols-sm="2"
          label-align-sm="left"
          label-size="sm"
          class="mb-0"
        >
          <b-form-checkbox-group
            v-model="filter.grade"
            :options="userGradeOptions"
            :aria-describedby="ariaDescribedby"
            class="mt-1"
          />
          설정
        </b-form-group>
      </b-col>
    </b-row>
    <hr class="my-2">
    <b-row align-h="center" class="mb-4">
      <b-col cols="2">
        <b-button variant="primary" class="w-75" @click="getList">
          검색
        </b-button>
      </b-col>
    </b-row>
    <b-row class="pt-5" align-h="between">
      <b-col align-self="center">
        <h6>상품 설정({{ totalRows }})</h6>
      </b-col>
      <b-col align-self="center" class="d-inline-flex justify-content-end">
        <b-form-select
          v-model="perPage"
          :options="perPageOptions"
          class="w-30 ml-2"
        />
      </b-col>
    </b-row>

    <b-table
      class="list"
      :items="items"
      :fields="fields"
      stacked="md"
      show-empty
      small
    >
      <template #empty>
        <PageNoResult />
      </template>
      <template #cell(select)="data">
        <b-form-checkbox
          v-model="selectedUsers"
          :value="data.item.id"
          style="float: unset"
        />
      </template>
      <template #cell(no)="data">
        {{ totalRows - (currentPage - 1) * perPage - (data.index + 1) + 1 }}
      </template>
      <template #cell(userWhere)="data">
        <span v-if="data.value === 'N'">네이버</span>
        <span v-else-if="data.value === 'K'">카카오</span>
        <span v-else-if="data.value === 'P'">페이코</span>
        <span v-else-if="data.value === 'G'">구글</span>
        <span v-else-if="data.value === 'F'">페이스북</span>
        <span v-else-if="data.value === 'W'">이메일</span>
        <span v-else>{{ data.value ? data.value : '-' }}</span>
      </template>
      <template #cell(isAdult)="data">
        <span v-if="data.value === 'Y'">O</span>
        <span v-else-if="data.value === 'N'">X</span>
      </template>
      <template #cell(setting)="data">
        <b-button
          variant="outline-secondary"
          :to="`/user/list/${data.item.id}`"
          class="table-inner-btn"
        >
          상세보기
        </b-button>
      </template>
      <template #cell(email)="data">
        <NuxtLink :to="`/user/list/${data.item.id}`">
          {{ data.value }}
        </NuxtLink>
      </template>
      <template #cell()="data">
        {{ data.value ? data.value : '-' }}
      </template>
    </b-table>
    <UiPagination
      class="py-4"
      :page="currentPage"
      :per-page="perPage"
      :total-rows="totalRows"
      @change-page="currentPage = $event"
    />
  </b-container>
</template>

<script>
export default {
  name: 'UsageListPage',
  data () {
    return {
      filter: {
        email: '',
        status: [],
        type: [],
        dateSearch: [],
        adult: 'N',
        grade: []
      },
      selectedUsers: [],
      userStatusOptions: [
        { value: 1, text: '전체' },
        { value: 2, text: '회원' },
        { value: 3, text: '정지' },
        { value: 4, text: '탈퇴' },
        { value: 5, text: '휴면' }
      ],
      signUpTypeOptions: [
        { value: 1, text: '전체' },
        { value: 2, text: '이메일' },
        { value: 'N', text: '네이버' },
        { value: 'K', text: '카카오' },
        { value: 'P', text: '페이코' },
        { value: 'G', text: '구글' },
        { value: 'F', text: '페이스북' }
      ],
      dateSearchOptions: [
        { value: 'join', text: '가입일' },
        { value: 'access', text: '접속일' }
      ],
      selectedOrder: 1,
      orderOptions: [
        { value: 1, text: '등록일 순' },
        { value: 2, text: '오래된 순' }
      ],
      currentPage: 1,
      totalRows: 0,
      perPage: 50,
      perPageOptions: [
        { value: 30, text: '30개씩 보기' },
        { value: 50, text: '50개씩 보기' },
        { value: 100, text: '100개씩 보기' },
        { value: 200, text: '200개씩 보기' },
        { value: 300, text: '300개씩 보기' }
      ],
      userGradeOptions: [
        { value: 1, text: '전체' },
        { value: 2, text: '노란마녀' },
        { value: 3, text: '초록마녀' },
        { value: 4, text: '빨간마녀' },
        { value: 5, text: '보라마녀' }
      ],
      items: [
        {
          id: 1123,
          email: 'example@example.com',
          nickname: '청개구리',
          login_type: '카카오',
          created_at: '2022-10-20 12:00',
          potion: 10,
          pumpkin: 10,
          amount: '99,000원',
          grade: '초록마녀',
          status: '회원',
          is_adult: 'O',
          last_access: '2021-12-11 ~12:12:13'
        },
        {
          id: 1123,
          email: 'example@example.com',
          nickname: '청개구리',
          login_type: '카카오',
          created_at: '2022-10-20 12:00',
          potion: 10,
          pumpkin: 10,
          amount: '99,000원',
          grade: '초록마녀',
          status: '회원',
          is_adult: 'X',
          last_access: '2021-12-11 ~12:12:13'
        },
        {
          id: 1123,
          email: 'example@example.com',
          nickname: '청개구리',
          login_type: '카카오',
          created_at: '2022-10-20 12:00',
          potion: 10,
          pumpkin: 10,
          amount: '99,000원',
          grade: '초록마녀',
          status: '회원',
          is_adult: 'O',
          last_access: '2021-12-11 ~12:12:13'
        }
      ],
      fields: [
        /**
             isAdult
             userCoin 보유 물약
             userEmail
             userNick
             userSeq 유저아이디
             userStar 보유 호박
             userState A: 정상 R: 휴면 L: 탈퇴
             userWhere 가입 방법
             */
        { key: 'no', label: '번호' },
        { key: 'email', label: '이메일' },
        { key: 'nickname', label: '닉네임' },
        { key: 'login_type', label: '가입방법' },
        { key: 'created_at', label: '가입일' },
        { key: 'potion', label: '보유 물약' },
        { key: 'pumpkin', label: '보유 호박' },
        { key: 'amount', label: '총 결제액' },
        { key: 'grade', label: '등급' },
        { key: 'status', label: '상태' },
        { key: 'is_adult', label: '성인인증' },
        // { key: 'phone_check', label: '휴대폰인증' },
        { key: 'last_access', label: '최근 접속일' }

        // { key: 'select', label: '체크' },
        // { key: 'no', label: 'No.' },
        // { key: 'userSeq', label: '유저아이디' },
        // { key: 'userEmail', label: '이메일' },
        // { key: 'userCoin', label: '보유 물약' },
        // { key: 'userStar', label: '보유 호박' },
        // { key: 'grade', label: '등급' },
        // { key: 'created_at', label: '가입일' },
        // { key: 'userWhere', label: '가입방법' },
        // { key: 'userState', label: '상태' },
        // { key: 'isAdult', label: '성인인증' },
        // { key: 'phone_check', label: '휴대폰인증' },
        // { key: 'setting', label: '관리' }
      ]
    }
  },
  async fetch () {
    // await this.getList()
  },
  computed: {
    breadcrumb () {
      const arr = [
        { label: '홈', url: '/' },
        { label: '상품 관리', url: '#' },
        { label: '상품 그룹 등록', url: this.$route.path }
      ]
      return arr
    }
  },
  watch: {
    'filter.adult' (val) {
      console.log(val)
    },
    perPage () {
      this.getList()
    },
    currentPage () {
      this.getList()
    }
  },
  created () {},
  mounted () {
    this.totalRows = this.items.length
  },
  methods: {
    async getList () {
      try {
        const {
          data: { data }
        } = await this.$axios.get('/api/manager/users', {
          params: {
            pageSize: this.perPage,
            pageNum: this.currentPage,
            ...(this.filter.adult ? { adult: this.filter.adult } : {})
          }
        })
        console.log(data)
        this.items = data.list
        this.totalRows = data.total
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>
