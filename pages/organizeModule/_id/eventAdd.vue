<template>
  <b-container fluid class="page-min-height py-3">
    <UiPageTitle title="이벤트 모듈 설정" :breadcrumb="breadcrumb">
      <template #buttons>
        <b-button variant="primary" @click="addEventModule">
          등록
        </b-button>
      </template>
    </UiPageTitle>
    <hr>
    <!-- 이벤트 모듈(일반) -->
    <b-row class="mt-4">
      <b-col align-self="center">
        <h6 class="font-weight-bold">
          이벤트 모듈 ({{ moduleType === 1 ? '일반' : '성인' }})
        </h6>
      </b-col>
    </b-row>
    <b-row class="mt-2">
      <b-col cols="12">
        <table class="table border mb-4 table-layout-fixed">
          <colgroup>
            <col style="width: 15%">
            <col>
            <col style="width: 10%">
            <col>
          </colgroup>
          <tbody>
            <tr>
              <th>제목 입력</th>
              <td colspan="3">
                <b-form-input
                  v-model="form.title"
                  placeholder="제목을 입력해주세요."
                  class="w-30"
                />
              </td>
            </tr>
            <tr>
              <th>노출 여부*</th>
              <td colspan="3">
                <b-form-group>
                  <b-form-radio-group
                    v-model="form.isShow"
                    :options="showOptions"
                  />
                </b-form-group>
              </td>
            </tr>
            <tr>
              <th>이벤트 추가</th>
              <td colspan="3">
                <b-button
                  variant="outline-primary"
                  class="table-inner-btn"
                  @click="openModal('search-event-modal')"
                >
                  추가
                </b-button>
              </td>
            </tr>
            <tr>
              <th>이벤트 목록</th>
              <td colspan="3">
                <template v-if="form.list.length > 0">
                  <b-table
                    class="list"
                    :items="form.list"
                    :fields="fields"
                    stacked="md"
                    :busy="isLoading"
                    show-empty
                    small
                  >
                    <template #table-colgroup>
                      <col style="width: 7%">
                    </template>
                    <template #empty>
                      <h4 class="mt-4">
                        조회 가능한 데이터가 없습니다.
                      </h4>
                    </template>
                    <template #table-busy>
                      <div class="text-center text-danger my-4">
                        <b-spinner variant="primary" class="align-middle" />
                        <span class="ml-3">데이터를 불러오고 있습니다.</span>
                      </div>
                    </template>
                    <template #cell(order)="data">
                      <b-form-input v-model.number="form.list[data.index].order" class="w-100 text-center" />
                    </template>
                    <template #cell(type)="data">
                      {{ data.value ? data.value : '-' }}
                    </template>
                    <template #cell(rate)="data">
                      {{ data.value ? data.value : '-' }}
                    </template>
                    <template #cell(title)="data">
                      {{ data.value ? data.value : '-' }}
                    </template>
                    <template #cell(startDate)="data">
                      {{ data.value ? data.value : '-' }}
                    </template>
                    <template #cell(endDate)="data">
                      {{ data.value ? data.value : '-' }}
                    </template>
                    <template #cell(cartoon)="data">
                      {{ data.value ? data.value : '-' }}
                    </template>
                    <template #cell(isShow)="data">
                      {{ data.value ? data.value : '-' }}
                    </template>
                    <template #cell(createdAt)="data">
                      {{ data.value ? data.value : '-' }}
                    </template>
                    <template #cell(setting)="data">
                      <b-button
                        variant="outline-secondary"
                        class="table-inner-btn"
                        @click="removeEvent(data.item.id)"
                      >
                        삭제
                      </b-button>
                    </template>
                  </b-table>
                </template>
                <template v-else>
                  <span class="fs-14 text-muted">이벤트를 추가해 주세요.</span>
                </template>
              </td>
            </tr>
          </tbody>
        </table>
      </b-col>
    </b-row>

    <!-- 동영상 모듈(일반) 모달 -->
    <SearchEventModal :module-type="moduleType" @select-event="selectEvent" />
  </b-container>
</template>

<script>

export default {
  name: 'EventModuleAddPage',
  data () {
    return {
      moduleType: null,
      form: {
        isShow: 'y',
        title: '',
        list: []
      },
      orderList: [],
      showOptions: [
        { text: '노출', value: 'y' },
        { text: '비노출', value: 'n' }
      ],
      isLoading: false,
      fields: [
        { key: 'order', label: '배치 순서' },
        { key: 'type', label: '이벤트 구분' },
        { key: 'rate', label: '연령 등급' },
        { key: 'title', label: '이벤트명' },
        { key: 'startDate', label: '시작일' },
        { key: 'endDate', label: '종료일' },
        { key: 'cartoon', label: '이벤트 작품' },
        { key: 'isShow', label: '노출 여부' },
        { key: 'createdAt', label: '등록일' },
        { key: 'setting', label: '관리' }
      ]
    }
  },
  async fetch () {
    await this.getDetail()
  },
  computed: {
    breadcrumb () {
      const arr = [
        { label: '홈', url: '/' },
        { label: '편성모듈', url: '#' },
        { label: '이벤트 모듈 설정', url: this.$route.fullPath }
      ]
      return arr
    }
  },
  watch: {},
  created () {
    if (
      this.$route.query.type === 'webtoon' &&
      this.$route.query.rate === 'all'
    ) {
      this.moduleType = 1
    } else if (
      this.$route.query.type === 'webtoon' &&
      this.$route.query.rate === 'adult'
    ) {
      this.moduleType = 3
    } else if (
      this.$route.query.type === 'novel' &&
      this.$route.query.rate === 'all'
    ) {
      this.moduleType = 2
    } else if (
      this.$route.query.type === 'novel' &&
      this.$route.query.rate === 'adult'
    ) {
      this.moduleType = 4
    }
  },
  mounted () {},
  methods: {
    removeEvent (id) {
      this.form.list = this.form.list.filter(item => item.id !== id)
    },
    selectEvent (data) {
      this.form.list = [...this.form.list, ...data].map(item => ({ ...item, order: '' }))
    },
    async getDetail () {
      this.isLoading = true
      try {
        const {
          status,
          data: { data }
        } = await this.$axios.get(
          `/api/manager/schedule/evdetail/${this.moduleType}`
        )

        if (status === 200) {
          this.form = data
        }
      } catch (e) {
        console.log(e)
      } finally {
        this.isLoading = false
      }
    },
    async addEventModule () {
      this.orderList = this.form.list.map(item => ({ id: item.id, order: item.order }))

      await console.log(this.form, this.orderList)
      try {
        const { status } = await this.$axios.put(`/api/manager/schedule/update/ev/${this.$route.params.id}`, {
          ...this.form,
          list: this.orderList
        })
        if (status === 200) {
          alert('등록이 완료 되었습니다.')

          if (
            this.$route.query.type === 'webtoon' &&
            this.$route.query.rate === 'all'
          ) {
            await this.$router.push('/organizeModule/webComic?type=all')
          } else if (
            this.$route.query.type === 'webtoon' &&
            this.$route.query.rate === 'adult'
          ) {
            await this.$router.push('/organizeModule/webComic?type=adult')
          } else if (
            this.$route.query.type === 'novel' &&
            this.$route.query.rate === 'all'
          ) {
            await this.$router.push('/organizeModule/novelHome?type=all')
          } else if (
            this.$route.query.type === 'novel' &&
            this.$route.query.rate === 'adult'
          ) {
            await this.$router.push('/organizeModule/novelHome?type=adult')
          }
        }
      } catch (err) {
        alert('등록되지 않았습니다. 다시 시도해보십시오.')
      }
    },
    openModal (id) {
      this.$root.$emit('bv::show::modal', id)
    }
  }
}
</script>
