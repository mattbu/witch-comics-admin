<template>
  <b-container fluid class="page-min-height py-3">
    <UiPageTitle title="이따무 등록" :breadcrumb="breadcrumb">
      <template #buttons>
        <!-- <b-button variant="outline-primary" to="/event/wait">
          취소
        </b-button> -->
        <b-button variant="primary">
          등록
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
            <tr>
              <th>작품명</th>
              <td colspan="3">
                <b-button variant="outline-primary" class="table-inner-btn">
                  찾기
                </b-button>
              </td>
            </tr>

            <tr>
              <th>작품</th>
              <td colspan="3">
                -
              </td>
            </tr>

            <tr>
              <th>시간 지정</th>
              <td colspan="3">
                <div class="d-inline-flex">
                  <b-form-input
                    v-model="form.setTime"
                    type="text"
                    class="w-25"
                  />
                  <span class="align-self-center ml-2">시</span>
                  <span class="fs-14 text-muted align-self-center ml-3">*24시 기준으로 입력해 주세요.</span>
                </div>
              </td>
            </tr>

            <tr>
              <th>최신화 설정</th>
              <td colspan="3">
                <div class="d-inline-flex">
                  <b-form-input
                    v-model="form.setRecentEdition"
                    type="text"
                    class="w-20"
                  />
                  <span class="align-self-center ml-2">화</span>
                  <span class="fs-14 text-muted align-self-center ml-3">*설정된 최신화는 이따무 이용권으로 볼 수 없습니다.</span>
                </div>
              </td>
            </tr>

            <tr>
              <th>기간 설정</th>
              <td colspan="3">
                <div class="d-inline-flex justify-content-between w-70">
                  <div class="w-50 pr-2">
                    <b-form-datepicker
                      id="start-date"
                      v-model="form.startDate"
                      placeholder="시작일 선택"
                      :date-format-options="{
                        year: 'numeric',
                        month: 'numeric',
                        day: 'numeric'
                      }"
                    />
                  </div>
                  <div class="w-50 pr-2">
                    <b-form-datepicker
                      id="end-date"
                      v-model="form.endDate"
                      placeholder="종료일 선택"
                      :date-format-options="{
                        year: 'numeric',
                        month: 'numeric',
                        day: 'numeric'
                      }"
                    />
                  </div>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
export default {
  name: 'EventWaitAddPage',
  data () {
    return {
      form: {
        setTime: '',
        setRecentEdition: ''
      }
    }
  },
  computed: {
    breadcrumb () {
      const arr = [
        { label: '홈', url: '/' },
        { label: '이벤트', url: '/event/list' },
        { label: '이따무', url: '/event/wait' },
        { label: '이따무 등록', url: this.$route.fullPath }
      ]
      return arr
    }
  },
  watch: {},
  created () {},
  mounted () {},
  methods: {}
}
</script>
