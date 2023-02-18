<template>
  <b-container fluid class="page-min-height py-3">
    <UiPageTitle title="정액제 관리" :breadcrumb="breadcrumb" />
    <hr>
    <p>준비중입니다.</p>
  </b-container>
</template>

<script>
import { commonFuctions } from '@/plugins/mixins'

export default {
  name: 'ProductGeneralListPage',
  mixins: [commonFuctions],
  data () {
    return {
      currentTab: 0,
      filter: {
        searchType: [],
        searchDtType: '시작일',
        searchStartDt: '',
        searchEndDt: '',
        pageNum: 1,
        pageSize: 10
      },
      // 상태 옵션
      statusOptions: [
        { value: '대기', text: '대기' },
        { value: '진행중', text: '진행중' },
        { value: '종료', text: '종료' }
      ],
      // 기간 옵션
      periodOptions: [
        { value: '시작일', text: '시작일' },
        { value: '종료일', text: '종료일' }
      ],
      isLoading: false,
      totalRows: 0,
      items: [],
      fields: [
        { key: 'no', label: '번호' },
        { key: 'title', label: '그룹 타이틀' },
        { key: 'productCount', label: '상품 개수' },
        { key: 'startDate', label: '시작일' },
        { key: 'endDate', label: '종료일' },
        { key: 'status', label: '상태' },
        { key: 'isShow', label: '노출 여부' },
        { key: 'setting', label: '관리' }
      ],

      currentPage: 1,
      perPage: 10,
      // 서비스 중 상품 데이터
      isSecondLoading: false,
      selectedUsers: [],
      secondItems: [],
      secondFields: [
        { key: 'select', label: '인기상품' },
        { key: 'no', label: '번호' },
        { key: 'title', label: '그룹 타이틀' },
        { key: 'name', label: '상품이름' },
        { key: 'price', label: '상품가격' },
        { key: 'discountRate', label: '할인율' },
        { key: 'showPrice', label: '판매금액' },
        { key: 'coin', label: '충전물약' },
        { key: 'bonusCoin', label: '보너스 물약' },
        { key: 'bonusPoint', label: '보너스 호박' }
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
        { label: '상품 관리', url: '#' },
        { label: '정액제 관리', url: this.$route.path }
      ]
      return arr
    }
  },
  watch: {
    async currentTab (val) {
      if (val === 0) {
        await this.getList()
      } else {
        await this.getSecondList()
      }
    }
  },
  mounted () {},
  methods: {
    async getSecondList () {
      this.isSecondLoading = true

      try {
        const {
          data: { data }
        } = await this.$axios.get('/api/manager/product/product/list')
        this.secondItems = data
      } catch (e) {
        console.log(e)
      } finally {
        this.isSecondLoading = false
      }
    },
    async getList () {
      this.isLoading = true

      try {
        const {
          data: { data }
        } = await this.$axios.get('/api/manager/product/group/list', {
          params: {
            ...(this.filter.searchType.length > 0
              ? { searchType: this.filter.searchType }
              : {}),
            ...(this.filter.searchStartDt
              ? { searchStartDt: this.filter.searchStartDt }
              : {}),
            ...(this.filter.searchEndDt
              ? { searchEndDt: this.filter.searchEndDt }
              : {}),
            ...this.filter
          }
        })
        this.items = data.list
        this.totalRows = data.total
      } catch (e) {
        console.log(e)
      } finally {
        this.isLoading = false
      }
    },
    // 삭제
    async removeGeneral (id) {
      const confirm = window.confirm('삭제 하시겠습니까?')

      if (confirm) {
        try {
          const res = await this.$axios.delete(
            `/api/manager/product/group/${id}`
          )
          console.log(res)
          if (res.status === 200) {
            alert('삭제가 완료 되었습니다.')
            await this.getList()
          }
        } catch (e) {
          console.log(e)
        }
      } else {
        alert('삭제가 취소 되었습니다.')
      }
    }
  }
}
</script>
