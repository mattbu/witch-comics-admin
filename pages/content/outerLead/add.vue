<template>
  <b-container fluid class="page-min-height py-3">
    <UiPageTitle title="외부연결 등록" :breadcrumb="breadcrumb">
      <template #buttons>
        <b-button variant="primary" @click="addOuterLead">
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
            <!-- 정보 -->
            <tr>
              <th>구분명</th>
              <td colspan="3">
                <b-form-input v-model="form.title" class="w-20" />
              </td>
            </tr>
            <tr>
              <th>코드</th>
              <td colspan="3">
                <b-form-input v-model="form.link_code" class="w-20" />
              </td>
            </tr>
            <tr>
              <th>연결종류</th>
              <td colspan="3">
                <div class="d-flex">
                  <b-form-radio
                    v-model="linkType"
                    value="C"
                    class="my-2"
                  >
                    작품
                  </b-form-radio>
                  <b-form-radio
                    v-model="linkType"
                    value="E"
                    class="ml-2 my-2"
                  >
                    이벤트
                  </b-form-radio>
                  <b-button
                    class="ml-2"
                    variant="primary"
                    @click="openModal"
                  >
                    검색
                  </b-button>
                  <b-badge v-if="form.link_type === 'E' && selectedItems" class="ml-3 align-items-center d-flex px-2" pill>
                    <span>{{ selectedItems.title }}</span>
                    <b-icon icon="X" scale="1.5" class="ml-2 cursor-pointer" @click="removeEvents" />
                  </b-badge>
                </div>
              </td>
            </tr>

            <tr v-if="linkType === 'C' && selectedItems">
              <th>설정된 작품</th>
              <td colspan="3">
                <b-row v-if="!setPieceLoading">
                  <b-col cols="3" class="flex-column align-items-center text-center">
                    <div v-if="selectedItems.thumbnailUrl" class="my-2">
                      <b-img :src="selectedItems.thumbnailUrl" width="180" height="auto" alt="작품이미지" />
                    </div>
                    <div v-else class="thumbnail-wrapper none my-2" />
                    <div>({{ selectedItems.id }})</div>
                    <div>{{ selectedItems.title }}</div>
                  </b-col>
                  <b-col cols="7" class="flex-column">
                    <div class="py-2">
                      <b-form-radio-group
                        id="form-openType"
                        v-model="pieceState"
                        :options="[
                          { value: 'viewer', text: '작품 뷰어' },
                          { value: 'more', text: '작품 상세' },

                        ]"
                      />
                    </div>
                    <div class="py-2" style="max-width: 500px; max-height: 300px; overflow-y: scroll; overflow-x: hidden">
                      <b-row
                        v-for="(item,idx) in selectedItems.list"
                        :key="'회차'+idx"
                        :class="{ 'text-muted' : pieceState==='more'}"
                      >
                        <b-col cols="1">
                          <b-form-checkbox v-model="subIds" :value="item.id" :disabled="pieceState==='more'" />
                        </b-col>
                        <b-col cols="2">
                          {{ item.fakeSerialNo }}화
                        </b-col>
                        <b-col cols="8">
                          {{ item.title }}({{ item.isFree }})
                        </b-col>
                      </b-row>
                    </div>
                  </b-col>
                  <b-col cols="2" class="text-right">
                    <a href="#" class="px-2" @click="removeContents">제거하기</a>
                  </b-col>
                </b-row>
              </td>
            </tr>

            <!-- 기간 -->
            <tr>
              <th>기간</th>
              <td colspan="3">
                <div class="d-inline-flex w-30">
                  <b-form-datepicker
                    v-model="startDate"
                    placeholder="선택"
                    hide-header
                    :date-format-options="{
                      year: 'numeric',
                      month: 'numeric',
                      day: 'numeric'
                    }"
                  />
                  <span class="mx-2 align-self-center">~</span>
                  <b-form-datepicker
                    v-model="endDate"
                    placeholder="선택"
                    hide-header
                    :date-format-options="{
                      year: 'numeric',
                      month: 'numeric',
                      day: 'numeric'
                    }"
                  />
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </b-col>
    </b-row>
    <PageContentSearchPieceModal @ok="setPiece" />
    <PageContentSearchEventModal :is-show="eventModalState" @ok="setEvents" @close="eventModalState=false" />
  </b-container>
</template>
<script>
import { timeOptions } from '@/plugins/mixins'

export default {
  name: 'OuterLeadAddPage',
  mixins: [timeOptions],
  data () {
    return {
      form: {
        title: '',
        link_code: '',
        link_type: '',
        main_id: '',
        start_date: '', // 시작일
        end_date: '' // 종료일
      },
      eventModalState: false,
      modalType: false,
      linkType: 'C',
      selectedItems: null,
      pieceState: 'viewer',
      subIds: [],
      startDate: '',
      endDate: '',
      setPieceLoading: true
    }
  },
  computed: {
    breadcrumb () {
      const arr = [
        { label: '홈', url: '/' },
        { label: '콘텐츠 관리', url: '#' },
        { label: '외부연결 등록', url: this.$route.path }
      ]
      return arr
    }
  },
  watch: {
    linkType (newVal, oldVal) {
      this.selectedItems = null
      this.form.link_type = newVal
    }
  },
  mounted () {
    this.form.link_type = this.linkType
  },
  methods: {
    async addOuterLead () {
      if (this.form.title === '') {
        alert('구분명을 입력해주세요.')
        return
      }
      if (this.form.link_code === '') {
        alert('코드를 입력해주세요.')
        return
      }
      if (!this.startDate || !this.end) {
        alert('시작일과 종료일을 모두 입력해주세요.')
        return
      }
      if (!this.selectedItems) {
        alert('연결할 작품 혹은 이벤트를 선택해주세요.')
        return
      }
      this.setDateType()
      this.form.main_id = this.selectedItems.id
      if (this.linkType === 'C') { this.form.sub_id = this.pieceState === 'viewer' ? this.subIds : 0 }
      try {
        const { status } = await this.$axios.post(
          '/api/cartoon/manager/outlink',
          this.form
        )

        if (status === 200) {
          alert('외부연결 등록이 완료 되었습니다.')
          await this.$router.push('/content/outerLead')
        }
      } catch (e) {
        console.log(e)
      }
    },
    setDateType () {
      this.form.start_date = `${this.startDate} 00:00:00`
      this.form.end_date = `${this.endDate} 00:00:00`
    },
    openModal () {
      if (this.form.link_type === 'C') { this.$root.$emit('bv::show::modal', 'SearchPieceModal') } else { this.eventModalState = true }
    },
    async setPiece (val) {
      this.setPieceLoading = true
      this.selectedItems = val
      try {
        const { data: { data } } = await this.$axios.get(`/api/cartoon/manager/outlink/cartoon/${val.id}`)
        this.selectedItems.list = data
        if (data.length > 0) { this.selectedItems.thumbnailUrl = data[data.length - 1].thumbnailUrl }
      } catch (e) {
        console.log(e)
      } finally {
        this.setPieceLoading = false
      }
    },
    setEvents (val) {
      this.eventModalState = false
      this.selectedItems = val
    },
    removeEvents () {
      this.selectedItems = null
    },
    removeContents () {
      this.selectedItems = null
    }
  }
}
</script>
