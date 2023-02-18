<template>
  <b-container fluid class="page-min-height py-3">
    <UiPageTitle title="금칙어 관리" :breadcrumb="breadcrumb">
      <template #buttons>
        <b-button variant="outline-primary">
          저장
        </b-button>
      </template>
    </UiPageTitle>
    <hr>
    <b-container fluid class="px-0" tag="form" @submit.prevent="totalBanList">
      <b-row class="px-3">
        <b-col lg="12" class="my-1">
          <b-form inline>
            <legend class="pl-0 col-sm-2 fs-14 text-sm-left mb-0">
              금칙어
            </legend>
            <b-form-input v-model="searchValue" class="w-30" />
          </b-form>
        </b-col>
      </b-row>
      <hr>
      <b-row align-h="center" class="mb-4">
        <b-col cols="2">
          <b-button type="submit" variant="primary" class="w-60">
            검색
          </b-button>
        </b-col>
      </b-row>
      <b-row>
        <b-col class="d-inline-flex justify-content-between align-items-center">
          <h6>금칙어 목록({{ totalRows ? totalRows : '0' }})</h6>
        </b-col>
      </b-row>
    </b-container>
    <hr class="my-2">
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
              <th>금칙어 등록</th>
              <td colspan="3">
                <div class="d-flex justify-content-between">
                  <b-form-input
                    v-model="form.taboo"
                    placeholder="등록할 금칙어를 입력하세요."
                    class="w-30"
                  />
                  <b-button variant="primary" class="ml-2">
                    엑셀 등록
                  </b-button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </b-col>
    </b-row>

    <b-table
      class="list my-4"
      :items="items"
      :fields="fields"
      stacked="md"
      :busy="isLoading"
      show-empty
      small
    >
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
      <template #cell(no)="data">
        {{ totalRows - (currentPage - 1) * perPage - (data.index + 1) + 1 }}
      </template>
      <template #cell(taboo)="data">
        {{ data.value ? data.value : '-' }}
      </template>
      <template #cell(createAt)="data">
        {{ data.value ? data.value.split('T')[0] : '-' }}
      </template>
      <template #cell(setting)="data">
        <b-button
          variant="outline-secondary"
          class="table-inner-btn"
          @click="openModal('edit-cp-modal', data.item.id)"
        >
          삭제
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
  </b-container>
</template>

<script>
export default {
  name: 'SettingBanPage',
  data () {
    return {
      form: {
        ban: ''
      },
      searchValue: '',
      isLoading: false,
      items: [],
      fields: [
        { key: 'no', label: '번호' },
        { key: 'name', label: '금칙어' },
        { key: 'createdAt', label: '등록일' },
        { key: 'setting', label: '관리' }
      ],
      totalRows: 0,
      currentPage: 1,
      perPage: 5
    }
  },
  async fetch () {
    await this.totalBanList()
  },
  computed: {
    breadcrumb () {
      const arr = [
        { label: '홈', url: '/' },
        { label: '서비스 운영 관리', url: '#' },
        { label: '금칙어 관리', url: this.$route.path }
      ]
      return arr
    }
  },
  watch: {},
  created () {},
  mounted () {},
  methods: {
    async totalBanList () {
      this.isLoading = true

      try {
        const {
          data: { data }
        } = await this.$axios.get('', {
          params: {
            pageNum: this.currentPage,
            pageSize: this.perPage,
            taboo: this.filter.taboo
          }
        })

        this.items = data.list
        this.totalRows = data.total
      } catch (e) {
        console.log(e)
      } finally {
        this.isLoading = false
      }
    }
  }
}
</script>
