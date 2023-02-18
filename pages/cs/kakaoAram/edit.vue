<template>
  <b-container fluid class="page-min-height py-3">
    <UiPageTitle title="내부 관리자 수정" :breadcrumb="breadcrumb">
      <template #buttons>
        <!-- <b-button
            variant="outline-primary"
            @click="$router.push('/manager/inner-admin')"
          >
            취소
          </b-button> -->
        <b-button variant="primary" @click="editInner">
          수정
        </b-button>
      </template>
    </UiPageTitle>
    <hr>
    <b-row class="mt-4">
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
              <th>아이디</th>
              <td colspan="3">
                <div class="d-flex">
                  <b-form-input
                    class="w-25"
                    placeholder="아이디를 입력하세요."
                  />
                </div>
              </td>
            </tr>
            <tr>
              <th>비밀번호</th>
              <td colspan="3">
                <div class="d-flex">
                  <b-form-input
                    class="w-25"
                    placeholder="비밀번호를 입력하세요."
                  />
                </div>
              </td>
            </tr>
            <tr>
              <th>계정명</th>
              <td colspan="3">
                <div class="d-flex">
                  <b-form-input
                    class="w-25"
                    placeholder="계정명을 입력하세요."
                  />
                </div>
              </td>
            </tr>
            <tr>
              <th>소속부서</th>
              <td colspan="3">
                <div class="d-flex">
                  <b-form-input
                    class="w-25"
                    placeholder="소속을 입력하세요.(예: 회사명, 팀명 등)"
                  />
                </div>
              </td>
            </tr>
            <tr>
              <th>권한그룹</th>
              <td colspan="3">
                <div class="d-flex">
                  <b-form-select
                    v-model="filter.search"
                    :options="searchOptions"
                    class="w-10"
                  />
                </div>
              </td>
            </tr>
            <tr>
              <th>계정 활성화</th>
              <td colspan="3">
                <div class="d-flex my-2">
                  <b-form-group v-slot="{ ariaDescribedby }">
                    <b-form-radio-group
                      v-model="form.cpType"
                      :options="accountOptions"
                      :aria-describedby="ariaDescribedby"
                    />
                  </b-form-group>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </b-col>
    </b-row>
    <!-- CP사 검색 모달 -->
    <UiCenterModal
      v-model="openAddModal"
      modal-id="add-publisher-modal"
      modal-title="CP사 검색"
      ok-title="등록"
      cancel-title="취소"
      size="sm"
      centered
      @ok="addPublisher"
      @close="openAddModal = false"
    >
      <template #contents>
        <b-container fluid class="px-0">
          <b-row>
            <b-col>
              <div class="d-flex">
                <b-form-input class="w-30" />
                <b-button variant="primary" class="ml-2">
                  검색
                </b-button>
              </div>
              <div class="m-2">
                <p class="font-weight-bold my-2">
                  선택된 CP사 목록
                </p>
                <b-form-checkbox>CP사1</b-form-checkbox>
                <p class="font-weight-bold my-2">
                  CP사 검색 목록
                </p>
                <b-form-checkbox>CP사1</b-form-checkbox>
                <b-form-checkbox>CP사2</b-form-checkbox>
                <b-form-checkbox>CP사3</b-form-checkbox>
                <b-form-checkbox>CP사4</b-form-checkbox>
              </div>
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
  name: 'PromotionAddPage',
  mixins: [timeOptions],
  data () {
    return {
      filter: {
        search: '선택'
      },
      form: {
        powerGroup: 1,
        selectUtilize: 1,
        selectedSerialType: 1,
        selectedReasonForSuspend: 1,
        suspendDate: '',
        selectedSerialDay: 1,
        checkBiweekly: false,
        selectedSort: 1,
        selectedViewerType: 1,
        selectedViewerType2: 1,
        selectedGenre: 1,
        checkAdult: false,
        pieceName: '',
        checkBook: false,
        writerName: '',
        checkSame: false,
        painterName: '',
        originalWriterName: '',
        cpName: '',
        thumbnailImg: {
          file: null,
          src: ''
        },
        mainImgFile: null,
        description: '',
        tags: [],
        selectedNational: 1,
        checkNoPotionForRent: false,
        quantityPotionForRent: '',
        checkNoPumpkinForRent: false,
        quantityPumpkinForRent: '',
        checkNoPotionForOwn: false,
        quantityPotionForOwn: '',
        blockPurchaseRecent: '',
        setFree: '',
        relationDescription: '',
        relationshipList: [],
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
      currentId: null,
      searchOptions: [{ text: '선택', value: '선택' }],
      accountOptions: [
        { text: '활성화', value: 1 },
        { text: '비활성', value: 2 }
      ],
      mainImgList: [],
      selectedMainImg: [],
      currentMainImg: null,
      currentMainIdx: null,
      test: null
    }
  },
  computed: {
    breadcrumb () {
      const arr = [
        { label: '홈', url: '/' },
        { label: '관리자 관리', url: '#' },
        { label: '내부 관리자 수정', url: this.$route.path }
      ]
      return arr
    }
  },
  watch: {},
  created () {},
  mounted () {
    this.hoursOptions = this.getHours()
    this.minutesOptions = this.getMinutes()
    this.secondsOptions = this.getSeconds()
  },
  methods: {
    async editInner () {
      if (this.checkValidation()) {
        try {
          const { status } = await this.$axios.put(
            `/api/manager/admin/update/${this.currentId}`,
            // /api/manager/admin/update/{adminId}
            {
              name: this.publisherInfo.name,
              info: ''
            }
          )
          if (status === 200) {
            alert('내부 수정이 완료 되었습니다.')
            await this.getList()
          }
        } catch (err) {
          alert('수정되지 않았습니다. 다시 시도해보십시오.')
        }
      }
    }
  }
}
</script>
