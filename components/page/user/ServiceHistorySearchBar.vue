<template>
  <b-container fluid class="px-0 user-list-form" tag="form" @submit.prevent="onSearch">
    <b-form-group label="날짜" label-for="form-date" label-cols="auto" label-class="p-3">
      <div id="form-date" class="d-inline-flex justify-content-start w-100 my-2">
        <div class="d-inline-flex w-40">
          <b-form-datepicker
            v-model="filter.searchStartDt"
            label-help=""
            hide-header
            placeholder="선택"
            :date-format-options="{
              year: 'numeric',
              month: 'numeric',
              day: 'numeric'
            }"
          />
          <b-form-datepicker
            v-model="filter.searchEndDt"
            label-help=""
            hide-header
            placeholder="선택"
            :date-format-options="{
              year: 'numeric',
              month: 'numeric',
              day: 'numeric'
            }"
            class="ml-2"
          />
        </div>
      </div>
    </b-form-group>
    <b-form-group
      v-if="tabId===10 && tabId===0"
      label="구분"
      label-cols="auto"
      label-for="form-state"
      label-class="p-3"
    >
      <b-form-checkbox-group
        id="form-state"
        v-model="filter.state"
        :options="[
          { value: '답변', text: '답변' },
          { value: '미답변', text: '미답변' }
        ]"
      />
    </b-form-group>
    <b-form-group
      v-if="tabId===2"
      label="구매"
      label-cols="auto"
      label-for="form-buying"
      label-class="p-3"
    >
      <b-form-checkbox-group
        id="form-buying"
        v-model="filter.buying"
        :options="[
          { value: '대여', text: '대여' },
          { value: '소장', text: '소장' },
          { value: '패키지 대여', text: '패키지 대여' },
          { value: '패키지 소장', text: '패키지 소장' },
          { value: '선물하기 대여', text: '선물하기 대여' },
          { value: '선물하기 소장', text: '선물하기 소장' }
        ]"
      />
    </b-form-group>
    <b-form-group
      v-if="tabId===0 || tabId===2 || tabId=== 4 || tabId=== 5"
      label="작품검색"
      label-cols="auto"
      label-for="form-title"
      label-class="p-3"
    >
      <b-form-input
        id="form-title"
        v-model="filter.title"
        placeholder="작품명"
        class="d-inline-block"
        trim
        style="max-width: 300px;"
        autocomplete="off"
        debounce="500"
        lazy
      />
      <b-button size="sm" class="ml-2">
        찾기
      </b-button>
    </b-form-group>
    <b-form-group
      v-if="tabId===0"
      label="열람방식"
      label-cols="auto"
      label-for="form-openType"
      label-class="p-3"
    >
      <b-form-radio-group
        id="form-openType"
        v-model="filter.openType"
        :options="[
          { value: '전체', text: '전체' },
          { value: '대여', text: '대여' },
          { value: '소장', text: '소장' },
          { value: '무료', text: '무료' },
        ]"
      />
    </b-form-group>
    <div class="text-center mt-4">
      <b-button variant="primary" class="px-5" size="md" type="submit">
        검색
      </b-button>
    </div>
  </b-container>
</template>

<script>
export default {
  name: 'ServiceHistorySearchBar',
  props: {
    tabId: {
      type: Number,
      required: false,
      default: 0
    }
  },
  data () {
    return {
      filter: {
        searchStartDt: '',
        searchEndDt: '',
        state: [],
        buying: [],
        title: '',
        openType: '전체'
      }
    }
  },
  watch: {
    tabId (newVal, oldVal) {
      console.log('tabId ::: ', newVal, oldVal)
      this.resetFilter()
    }
  },
  methods: {
    onSearch () {
      console.log('on search')
      const params = {}
      if (this.filter.searchStartDt) { params.searchStartDt = this.filter.searchStartDt }
      if (this.filter.searchEndDt) { params.searchEndDt = this.filter.searchEndDt }
      if (this.filter.state.length > 0) { params.state = this.filter.state }
      if (this.filter.buying.length > 0) { params.buying = this.filter.buying }
      if (this.filter.title) { params.title = this.filter.title }
      if (this.filter.openType && this.tabId === 0) { params.openType = this.filter.openType }
      this.$emit('on-search', params)
    },
    resetFilter () {
      this.filter = {
        searchStartDt: '',
        searchEndDt: '',
        state: [],
        buying: [],
        title: '',
        openType: '전체'
      }
    }
  }
}
</script>
