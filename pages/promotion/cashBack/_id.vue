<template>
  <b-container fluid class="page-min-height py-3">
    <UiPageTitle title="캐시백" :breadcrumb="breadcrumb">
      <template #buttons>
        <!-- <b-button 변경가능
          variant="outline-primary"
          @click="$router.push('/promotion/itamu')"
        >
          취소
        </b-button> -->
        <b-button variant="primary" @click="enroll">
          수정
        </b-button>
      </template>
    </UiPageTitle>
    <hr>

    <b-row class="d-flex">
      <b-col>
        <table class="table border table-layout-fixed user-detail-info">
          <tbody>
            <tr>
              <th>작품명</th>
              <td colspan="5">
                풀하우스
              </td>
            </tr>
            <tr>
              <th>중복지급</th>
              <td>대여10회</td>
              <th>지급보상</th>
              <td>물약10개</td>
              <th>발급자</th>
              <td>30</td>
            </tr>
            <tr>
              <th>시작일</th>
              <td>사용</td>
              <th>종료일</th>
              <td>2022.06.22</td>
              <th>지급(예정)일</th>
              <td>2022.06.22</td>
            </tr>
            <tr>
              <th>캐시백 작품</th>
              <td colspan="5">
                엔네이드,
              </td>
            </tr>
          </tbody>
        </table>
      </b-col>
    </b-row>

    <b-row class="mt-4">
      <b-col cols="12">
        <table class="table border mb-0 table-layout-fixed">
          <colgroup>
            <col style="width: 15%">
            <col>
            <col style="width: 10%">
            <col>
          </colgroup>
          <tbody class="text-center">
            <!-- 정보 -->
            <tr>
              <th>아이디</th>
              <td colspan="3">
                <b-form-input class="w-30"/>
              </td>
            </tr>
            <tr>
              <th>상태</th>
              <td colspan="3">
              </td>
            </tr>
          </tbody>
        </table>
      </b-col>
    </b-row>

    <b-row align-h="center" class="mb-4 my-2">
      <b-col cols="2">
        <b-button variant="primary" class="w-75">
          검색
        </b-button>
      </b-col>
    </b-row>
    <b-row class="pt-5">
      <b-col align-self="center">
        <h6>리워드 지급 목록(5)</h6>
      </b-col>
    </b-row>
    <hr class="my-2">
    <b-table
      class="list"
      :items="items"
      :fields="fields"
      :current-page="currentPage"
      :per-page="perPage"
      stacked="md"
      show-empty
      small
    >
      <template #cell(no)="data">
        {{ totalRows - (currentPage - 1) * perPage - (data.index + 1) + 1 }}
      </template>
      <template #cell(setting)="data">
        <b-button
          :id="`setting-${data.item.id}`"
          variant="outline-secondary"
          class="table-inner-btn"
          @click="openModal('give-detailHistory-modal')"
        >
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

    <!-- 리워드 지급 상세 내역 (give-detailHistory-modal)-->
    <b-modal
      id="give-detailHistory-modal"
      title="리웨드 지급 상세 내역"
      ok-only
      ok-title="확인"
      centered
      scrollable
      size="md"
    >
      <b-row>
        <b-col class="d-flex justify-content-start align-items-center">
          <p>사용내역</p>
        </b-col>
      </b-row>
      <b-row class="mt-2">
        <b-col md="12" class="my-2" />
      </b-row>
    </b-modal>
  </b-container>
</template>

<script>
export default {
  name: 'CashBackDetailPage',
  data () {
    return {
      filter: {
        status: ''
      },
      statusOptions: [
        { value: '당첨', text: '당첨' },
        { value: '미당첨', text: '미당첨' }
      ],
      items: [
        {
          id: 3,
          detailId: 'acdd@gmail.com',
          provide: '물약10개',
          provideNumber: '10개',
          end_at: '2018.10.29',
          give_at: '2022.09.25 00:00',
          setting: '상세'
        },
        {
          id: 3,
          detailId: 'acade@gmail.com',
          provide: '물약10개',
          provideNumber: '10개',
          end_at: '2018.10.29',
          give_at: '2022.09.25 00:00',
          setting: '상세'
        },
        {
          id: 3,
          detailId: '***dc@gmail.com',
          provide: '물약10개',
          provideNumber: '10개',
          end_at: '2018.10.29',
          give_at: '2022.09.25 00:00',
          setting: '상세'
        }
      ],
      fields: [
        { key: 'no', label: '번호' },
        { key: 'detailId', label: '아이디' },
        { key: 'provide', label: '지급보상' },
        { key: 'provideNumber', label: '지급개수' },
        { key: 'end_at', label: '만료일' },
        { key: 'give_at', label: '지급일' },
        { key: 'setting', label: '지급보상' }
      ]
    }
  },
  computed: {
    breadcrumb () {
      const arr = [
        { label: '홈', url: '/' },
        { label: '프로모션 관리', url: '#' },
        { label: '캐시백', url: this.$route.path }
      ]
      return arr
    }
  },
  watch: {},
  mounted () {
    this.totalRows = this.items.length
  },
  methods: {
    openSetting (id) {
      this.disabledTooltip = !this.disabledTooltip

      if (this.disabledTooltip) {
        this.$refs[`setting-${id}`].$emit('open')
      } else {
        this.$refs[`setting-${id}`].$emit('close')
      }

      this.$root.$on('bv::tooltip::shown', (e) => {
        this.currentSettingId = e.target.id
      })
    }
  },
  openModal (id) {
    this.$root.$emit('bv::show::modal', id)
  }
}
</script>
