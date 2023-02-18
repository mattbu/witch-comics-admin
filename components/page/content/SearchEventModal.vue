<template>
  <b-modal
    id="SearchEventModal"
    v-model="modalOpen"
    ok-title="등록"
    cancel-title="취소"
    centered
    hide-header
    size="lg"
    @ok="clickOk"
    @cancel="$emit('close')"
  >
    <b-container fluid class="py-2">
      <b-row>
        <h5 class="font-weight-bold w-100">
          이벤트 검색 설정
        </h5>
        <div class="d-flex py-3">
          <b-form-radio-group
            id="form-openType"
            v-model="searchState"
            :options="[
              { value: '', text: '전체' },
              { value: '진행중', text: '진행중' },
              { value: '대기', text: '대기' },
            ]"
          />
        </div>
      </b-row>
      <b-row class=" mt-3">
        <h5 class="font-weight-bold w-100">
          이벤트 목록
        </h5>
        <div v-if="list.length>0" class="py-3 w-100">
          <b-row
            v-for="(item,idx) in list"
            :key="'이벤트 리스트' + idx"
            class="w-100 mb-1"
          >
            <b-col cols="1">
              <b-form-radio
                v-model="selected"
                :value="item"
              />
            </b-col>
            <b-col cols="3">
              <span>{{ item.title }}</span>
            </b-col>
            <b-col>{{ item.startDate }}</b-col>
            <b-col>{{ item.endDate }}</b-col>
            <b-col cols="1">
              {{ item.status || '-' }}
            </b-col>
          </b-row>
        </div>
      </b-row>
    </b-container>
  </b-modal>
</template>

<script>
export default {
  name: 'SearchEventModal',
  props: {
    isShow: { type: Boolean, default: false, required: true }
  },
  data () {
    return {
      modalOpen: false,
      searchState: '',
      selected: '',
      list: []
    }
  },
  watch: {
    searchState () {
      this.getData()
    },
    isShow (val) {
      this.modalOpen = val
    }
  },
  mounted () {
    this.getData()
  },
  methods: {
    async getData () {
      try {
        const { data: { data } } = await this.$axios.get(
          '/api/cartoon/manager/event/search',
          {
            params: { status: this.searchState }
          }
        )
        console.log('res ::: ', data)
        this.list = data
      } catch (e) {
        console.log(e)
      }
    },
    clickOk () {
      const dataSet = {
        id: this.selected.id,
        title: this.selected.title
      }
      this.$emit('ok', dataSet)
    }
  }
}
</script>
