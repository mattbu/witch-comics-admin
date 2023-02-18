<template>
  <b-container fluid class="page-min-height py-3">
    <UiPageTitle title="검토 관리" :breadcrumb="breadcrumb">
      <template #buttons>
        <b-button variant="primary" @click="addEvent">
          등록
        </b-button>
      </template>
    </UiPageTitle>
    <hr>
    <b-container fluid class="px-0" tag="form" @submit.prevent="getList" />
    <p class="">
      준비중입니다.
    </p>
  </b-container>
</template>

<script>
import { timeOptions, editorStyles } from '@/plugins/mixins'

export default {
  name: 'EventListAddPage',
  mixins: [timeOptions, editorStyles],
  data () {
    return {
      isMounted: false,
      filter: {
        eventName: '',
        openWay: '',
        openNoYes: '랜덤노출'
      },
      openNoYesOptions: [
        { text: '랜덤노출', value: '랜덤노출' },
        { text: '지정노출', value: '지정노출' }
      ],
      isLoading: false,
      totalRows: 0,
      currentPage: 1,
      perPage: 5,
      items: [
        {
          id: 2,
          order: 1,
          menucode: '연재',
          name: '화화원행기',
          cp: '서울 문화사',
          startAt: '2022-10-20',
          endAt: '2022-10-21',
          ticket: '대여',
          time: '12시간',
          recent: '10화',
          regist: '2022-10-19',
          registEdit: '2022-10-20',
          status: '진행중'
        },
        {
          id: 1,
          order: 2,
          menucode: '단행본',
          name: '푸른 늑대의 밤',
          cp: '서울 문학사',
          startAt: '2022-10-20',
          endAt: '2022-10-21',
          ticket: '대여',
          time: '12시간',
          recent: '5화',
          registAt: '2022-10-19',
          registEdit: '2022-10-20',
          status: '진행중'
        }
      ],
      fields: [
        { key: 'order', label: '노출 순서' },
        { key: 'no', label: '번호' },
        { key: 'menucode', label: '구분' },
        { key: 'name', label: '작품명' },
        { key: 'cp', label: 'CP사' },
        { key: 'startAt', label: '시작일' },
        { key: 'endAt', label: '종료일' },
        { key: 'ticket', label: '이용권' },
        { key: 'time', label: '이따무시간' },
        { key: 'recent', label: '이따무 불가 최신화 설정' },
        { key: 'regist', label: '등록일' },
        { key: 'registEdit', label: '등록.최종수정' },
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
        { label: '검토 관리', url: '#' },
        { label: '검토 관리', url: this.$route.fullPath }
      ]
      return arr
    }
  },
  watch: {},
  created () {},
  mounted () {},
  methods: {
    // 조회
    async getList () {
      this.isLoading = true

      try {
        const {
          data: { data }
        } = await this.$axios.get('', {
          params: {
            pageNum: this.currentPage,
            pageSize: this.perPage,
            title: this.filter.title
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
    // 등록
    async addEvent () {
      try {
        const { status } = await this.$axios.post('', {
          type: this.form.type,
          age: this.form.age,
          miniTitle: this.form.miniTitle,
          openYesNo: this.form.openYesNo,
          startAt: this.form.startAt,
          endAt: this.form.endAt,
          image: this.form.image,
          bgColor: this.form.bgColor,
          reply: this.form.reply
        })
        if (status === 200) {
          alert('등록이 완료 되었습니다.')
          // this.$router.push(`/organizeModule/webComic/${data.item.id}/itamuAdd`)
        }
      } catch (err) {
        alert('등록되지 않았습니다. 다시 시도해보십시오.')
      }
    },

    // 삭제
    async deleteItamu (id) {
      try {
        const { status } = await this.$axios.delete(`/${id}`)
        if (status === 200) {
          alert('삭제가 완료 되었습니다.')
          await this.getList()
        }
      } catch (err) {
        alert('삭제가 되지 않았습니다. 다시 시도해보십시오.')
      }
    },
    openModal (id, type) {
      if (type) {
        this.pieceModalType = type
      } else {
        this.pieceModalType = ''
      }

      if (id === 'select-writer-modal') {
        if (this.pieceModalType) {
          this.$root.$emit('bv::show::modal', id)
        }
      } else {
        this.$root.$emit('bv::show::modal', id)
      }
    },

    uploadThumbnailImg (e) {
      this.form.thumbnailImg.file = e.target.files[0]

      this.form.thumbnailImg.src = URL.createObjectURL(e.target.files[0])
      console.log(this.form.thumbnailImg, '업로드')
    }
  }
}
</script>
