<template>
  <b-container fluid class="page-min-height py-3">
    <UiPageTitle title="이따무 모듈 설정" :breadcrumb="breadcrumb">
      <template #buttons>
        <b-button variant="primary" @click="setModule">
          수정
        </b-button>
      </template>
    </UiPageTitle>
    <hr>

    <b-row align-h="between" class="mb-3">
      <b-col align-self="center">
        <h6 class="font-weight-bold">
          이따무 모듈 설정 ({{ moduleType === 1 ? '일반' : '성인' }})
        </h6>
      </b-col>
    </b-row>

    <table class="table border mb-0 table-layout-fixed">
      <colgroup>
        <col style="width: 15%">
        <col>
        <col style="width: 10%">
        <col>
      </colgroup>
      <tbody>
        <tr>
          <th>타이틀 입력*</th>
          <td colspan="3">
            <b-form-input
              v-model="form.title"
              type="text"
              class="w-40"
              placeholder="타이틀을 입력해 주세요."
            />
          </td>
        </tr>
        <tr>
          <th>노출 방법*</th>
          <td colspan="3">
            <b-form-group>
              <b-form-radio-group
                v-model="form.isRandom"
                :options="showOptions"
              />
            </b-form-group>
          </td>
        </tr>
        <tr>
          <th>작품 검색</th>
          <td colspan="3">
            <div class="d-inline-flex justify-content-between">
              <b-button
                variant="outline-secondary"
                class="table-inner-btn"
                @click="openModal('itamu-search-works-modal')"
              >
                추가
              </b-button>
            </div>
          </td>
        </tr>
      </tbody>
    </table>

    <b-row align-h="between" class="mt-5 mb-3">
      <b-col align-self="center">
        <h6 class="font-weight-bold">
          지정 작품 목록 ({{
            items.length && items.length > 0 ? items.length : '0'
          }})
        </h6>
      </b-col>
    </b-row>
    <hr>
    <b-table
      class="list"
      :items="items"
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
      <template #cell(orders)="data">
        <b-form-input
          v-model="orderList[data.index]"
          class="w-100 text-center"
        />
      </template>
      <template #cell(no)="data">
        {{ data.index + 1 }}
      </template>
      <!-- 구분 -->
      <template #cell(menucode)="data">
        {{ data.value ? data.value : '-' }}
      </template>
      <!-- 작품명 -->
      <template #cell(title)="data">
        {{ data.value ? data.value : '-' }}
      </template>
      <!-- CP사 -->
      <template #cell(cp)="data">
        {{ data.value ? data.value : '-' }}
      </template>
      <!-- 시작일 -->
      <template #cell(startDate)="data">
        {{ data.value ? data.value : '-' }}
      </template>
      <!-- 종료일 -->
      <template #cell(endDate)="data">
        {{ data.value ? data.value : '-' }}
      </template>
      <!-- 이용권 -->
      <template #cell(buyType)="data">
        {{ data.value ? data.value : '-' }}
      </template>
      <!-- 이따무시간 -->
      <template #cell(waitTime)="data">
        {{ data.value ? `${data.value}시간` : '-' }}
      </template>
      <!-- 이따무 불가 최신화 설정 -->
      <template #cell(episode)="data">
        {{ data.value ? `${data.value}화` : '-' }}
      </template>
      <!-- 등록일 -->
      <template #cell(createdAt)="data">
        {{ data.value ? data.value.split('T')[0] : '-' }}
      </template>
      <!-- 등록/최종수정 -->
      <template #cell(manager)="data">
        {{ data.value ? data.value.split('T')[0] : '-' }}
      </template>
      <!-- 상태 -->
      <template #cell(status)="data">
        <p v-if="data.value === '진행중'" class="text-info">
          진행중
        </p>
        <p v-else-if="data.value === '대기'">
          대기
        </p>
        <p v-else-if="data.value === '종료'" class="text-warning">
          종료
        </p>
        <p v-else>
          -
        </p>
      </template>
      <!-- 삭제 -->
      <template #cell(setting)="data">
        <b-button
          variant="outline-secondary"
          class="table-inner-btn"
          @click="removeModule(data.item.id)"
        >
          삭제
        </b-button>
      </template>
    </b-table>

    <ItamuSearchWorksModal
      :module-type="moduleType"
      @add-work="addStatus = $event"
    />
  </b-container>
</template>

<script>
export default {
  name: 'ItamuModuleSetPage',
  data () {
    return {
      moduleType: null,
      addStatus: null,
      orderList: [],

      isMounted: false,
      showOptions: [
        { text: '랜덤 노출', value: 'y' },
        { text: '지정 노출', value: 'n' }
      ],
      isLoading: false,
      form: {},
      items: [],
      fields: [
        { key: 'orders', label: '지정 순서*' },
        { key: 'no', label: '번호' },
        { key: 'menucode', label: '구분' },
        { key: 'title', label: '작품명' },
        { key: 'cp', label: 'CP사' },
        { key: 'startDate', label: '시작일' },
        { key: 'endDate', label: '종료일' },
        { key: 'buyType', label: '이용권' },
        { key: 'waitTime', label: '이따무 시간' },
        { key: 'episode', label: '이따무 불가 최신화 설정' },
        { key: 'createdAt', label: '등록일' },
        { key: 'manager', label: '등록/최종 수정' },
        { key: 'status', label: '상태' },
        { key: 'setting', label: '관리' }
      ]
    }
  },
  async fetch () {
    await this.getList()
  },
  computed: {
    breadcrumb () {
      const arr = [
        { label: '홈', url: '/' },
        { label: '편성모듈', url: '#' },
        { label: '이따무 모듈 설정', url: this.$route.fullPath }
      ]
      return arr
    }
  },
  watch: {
    async addStatus (val) {
      if (val === 200) {
        await this.getList()
      }
    }
  },
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
    async getList () {
      this.isLoading = true

      try {
        const {
          data: { data }
        } = await this.$axios.get(
          `/api/manager/schedule/edetail/${this.moduleType}`
        )
        this.form = data
        this.items = data.list

        if (this.items && this.items.length > 0) {
          const orderArr = this.items.map(item => item.orders)
          this.orderList = orderArr
        }
      } catch (e) {
        console.log(e)
      } finally {
        this.isLoading = false
      }
    },
    // 등록
    async setModule () {
      try {
        const { status } = await this.$axios.put(
          `/api/manager/schedule/update/e/${this.$route.params.id}`,
          {
            title: this.form.title,
            isRandom: this.form.isRandom,
            cartoonId: this.items.map((item, idx) => ({
              id: item.id,
              order: Number(this.orderList[idx])
            }))
          }
        )
        if (status === 200) {
          alert('설정이 완료 되었습니다.')

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
    async removeModule (id) {
      const confirm = window.confirm('삭제 하시겠습니까?')

      if (confirm) {
        try {
          const { status } = await this.$axios.delete(
            `/api/manager/schedule/delete/e/${id}`
          )
          if (status === 200) {
            alert('삭제가 완료 되었습니다.')
            await this.getList()
          }
        } catch (err) {
          console.log(err)
        }
      } else {
        alert('삭제가 취소 되었습니다.')
      }
    },

    // 작품 검색 미리보기
    async getPieceLookAhead (val) {
      try {
        const {
          data: { data }
        } = await this.$axios.get('/api/manager/schedule/preview/ecartoon', {
          params: {
            ids: val
          }
        })
        this.form.mainInfo.IdAndColor = data
        console.log('resp ::: ', this.form.mainInfo.IdAndColor)
      } catch (e) {
        console.log(e)
      }
    },
    openModal (id) {
      this.addStatus = null
      this.$root.$emit('bv::show::modal', id)
    }
  }
}
</script>
