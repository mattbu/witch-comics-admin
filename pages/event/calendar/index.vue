<template>
  <b-container fluid class="page-min-height py-3">
    <UiPageTitle
      title="작품 캘린더"
      :breadcrumb="breadcrumb"
    />
    <hr>
    <b-row class="mt-3 px-3">
      <b-col lg="12" class="my-2">
        <b-form-group
          label="기간 설정"
          label-cols-sm="2"
          label-align-sm="left"
          label-size="sm"
          class="mb-0"
        >
          <div class="d-inline-flex justify-content-between w-100">
            <div class="d-inline-flex w-40">
              <template v-if="!isMonth">
                <b-form-datepicker
                  v-model="filter.startDate"
                  placeholder="선택"
                  :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
                />
                <b-form-datepicker
                  v-model="filter.endDate"
                  placeholder="선택"
                  :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
                  class="ml-2"
                />
              </template>
              <template v-else>
                <b-form-datepicker
                  v-model="filter.currentMonth"
                  placeholder="선택"
                  :date-format-options="{ year: 'numeric', month: 'numeric', day: 'numeric' }"
                />
              </template>
            </div>
            <div class="ml-2 w-60 d-inline-flex justify-content-between">
              <div>
                <b-button>
                  {{ isMonth ? '이번 달' : '이번 주' }}
                </b-button>
              </div>
              <div>
                <b-button @click="isMonth = false">
                  주간
                </b-button>
                <b-button @click="isMonth = true">
                  월간
                </b-button>
              </div>
            </div>
          </div>
        </b-form-group>
      </b-col>
    </b-row>
    <hr class="my-3">
    <!--    -->
    <b-container fluid class="calendar">
      <b-row>
        <b-col>6월</b-col>
        <b-col><span>19일 (일)</span></b-col>
        <b-col><span>20일 (월)</span></b-col>
        <b-col><span>21일 (화)</span></b-col>
        <b-col><span>22일 (수)</span></b-col>
        <b-col><span>23일 (목)</span></b-col>
        <b-col><span>24일 (금)</span></b-col>
        <b-col><span>25일 (토)</span></b-col>
      </b-row>
      <b-row>
        <b-col>
          <span>작품</span>
        </b-col>
        <b-col><span>2</span></b-col>
        <b-col><span>3</span></b-col>
        <b-col><span>4</span></b-col>
        <b-col><span>5</span></b-col>
        <b-col><span>6</span></b-col>
        <b-col><span>7</span></b-col>
        <b-col><span>8</span></b-col>
      </b-row>
      <b-row>
        <b-col>
          <span>공지사항</span>
        </b-col>
        <b-col><span>2</span></b-col>
        <b-col><span>3</span></b-col>
        <b-col><span>4</span></b-col>
        <b-col><span>5</span></b-col>
        <b-col><span>6</span></b-col>
        <b-col><span>7</span></b-col>
        <b-col><span>8</span></b-col>
      </b-row>
      <b-row>
        <b-col>
          <span>이벤트</span>
        </b-col>
        <b-col><span>2</span></b-col>
        <b-col><span>3</span></b-col>
        <b-col><span>4</span></b-col>
        <b-col><span>5</span></b-col>
        <b-col><span>6</span></b-col>
        <b-col><span>7</span></b-col>
        <b-col><span>8</span></b-col>
      </b-row>
    </b-container>
  </b-container>
</template>

<script>
export default {
  name: 'EventCalendarPage',
  data () {
    return {
      isMonth: false,
      filter: {
        startDate: '',
        endDate: '',
        currentMonth: ''
      }
    }
  },
  computed: {
    breadcrumb () {
      const arr = [
        { label: '홈', url: '/' },
        { label: '이벤트', url: '/event/list' },
        { label: '작품 캘린더', url: this.$route.fullPath }
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

<style scoped lang="scss">
.calendar {
  .row {
    &:first-child {
      .col {
        padding: 1rem 0;
        border: solid 1px #ced4da;
        background-color: var(--light);
        border: {
          right: none;
          bottom: none;
        }
        display: inline-flex;
        justify-content: center;
        span {
          align-self: center;
        }
        &:first-child {
          display: inline-flex;
          span {
            align-self: center;
          }
        }
        &:last-child {
          border: {
            right: solid 1px #ced4da;
          }
        }
      }
    }
    &:nth-child(2),&:nth-child(3) {
      .col {
        height: 130px!important;
        border: solid 1px #ced4da;
        background-color: var(--white);
        border: {
          right: none;
          bottom: none;
        }
        &:first-child {
          display: inline-flex;
          justify-content: center;
          span {
            align-self: center;
          }
        }
        &:last-child {
          border: {
            right: solid 1px #ced4da;
          }
        }
      }
    }
    &:last-child {
      .col {
        height: 130px!important;
        border: solid 1px #ced4da;
        background-color: var(--white);
        border: {
          right: none;
        }
        &:first-child {
          display: inline-flex;
          justify-content: center;
          span {
            align-self: center;
          }
        }
        &:last-child {
          border: {
            right: solid 1px #ced4da;
          }
        }
      }
    }
  }
}
</style>
