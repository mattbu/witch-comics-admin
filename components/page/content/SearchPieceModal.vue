<template>
  <div>
    <b-modal
      id="SearchPieceModal"
      ok-title="등록"
      cancel-title="취소"
      centered
      hide-header
      size="lg"
      @ok="clickOk"
      @cancel="clickCancel"
    >
      <b-container fluid class="py-2">
        <b-row>
          <h5 class="font-weight-bold">
            작품 검색
          </h5>
          <div class="d-flex py-3 w-100">
            <b-form-input
              v-model="keyword"
              placeholder="작품명"
              class="d-inline-block"
              style="max-width: 300px;"
              trim
              autocomplete="off"
              debounce="500"
              lazy
            />
            <b-button size="sm" class="ml-2" @click="getData">
              찾기
            </b-button>
          </div>
        </b-row>
        <b-row class=" mt-3">
          <h5 class="font-weight-bold w-100">
            작품 검색 목록
          </h5>
          <div v-if="list.length>0" class="py-3 w-100" style="min-height: 100px;max-height: 600px; overflow-y: scroll">
            <b-row
              v-for="(item,idx) in list"
              :key="'이벤트 리스트' + idx"
              class="w-100 mb-1"
            >
              <b-col cols="auto">
                <b-form-radio
                  v-model="selected"
                  :value="item"
                />
              </b-col>
              <b-col cols="3" class="text-ellipsis">
                <span>({{ item.id }}){{ item.title }}</span>
              </b-col>
              <b-col cols="2" class="text-ellipsis">
                {{ item.writer }}
              </b-col>
              <b-col cols="2">
                {{ item.genre }}
              </b-col>
              <b-col cols="2">
                {{ item.serial }}
              </b-col>
              <b-col cols="2" class="text-ellipsis">
                {{ item.cp }}
              </b-col>
            </b-row>
          </div>
          <div v-else class="pt-2" style="color: #6660">
            조회 가능한 데이터가 존재하지 않습니다.
          </div>
        </b-row>
      </b-container>
    </b-modal>
  </div>
</template>

<script>
export default {
  name: 'SearchPieceModal',
  data () {
    return {
      keyword: '',
      selected: '',
      list: []
    }
  },
  watch: {
    searchState () {
      this.getData()
    }
  },
  methods: {
    clickCancel () {
      this.$emit('close')
    },
    async getData () {
      if (this.keyword.trim() === '') {
        alert('작품명을 입력해 주세요.')
        return
      }
      try {
        const { data: { data } } = await this.$axios.get(
          '/api/cartoon/manager/cartoon/search',
          {
            params: { title: this.keyword }
          }
        )
        console.log('res ::: ', data)
        this.list = data
      } catch (e) {
        console.log(e)
      }
    },
    clickOk () {
      this.$emit('ok', this.selected)
      this.$nextTick(() => {
        this.keyword = ''
        this.selected = ''
        this.list = []
      })
    }
  }
}
</script>
<style lang="scss">
.text-ellipsis{
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
}
</style>
