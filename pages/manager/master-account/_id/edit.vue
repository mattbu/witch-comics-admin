<template>
  <b-container fluid class="page-min-height py-3">
    <UiPageTitle title="마스터 관리자 수정" :breadcrumb="breadcrumb">
      <template #buttons>
        <b-button variant="primary" @click="editMaster">
          수정
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
              <th>아이디</th>
              <td colspan="3">
                <div class="d-flex">
                  <b-form-input
                    v-model="form.email"
                    class="w-30"
                    placeholder="아이디를 입력하세요."
                    disabled="disabled"
                  />
                </div>
              </td>
            </tr>
            <tr>
              <th>계정명</th>
              <td colspan="3">
                <div class="d-flex">
                  <b-form-input
                    v-model="form.name"
                    class="w-30"
                    placeholder="계정명을 입력하세요."
                  />
                </div>
              </td>
            </tr>
            <tr>
              <th>소속부서</th>
              <td colspan="3">
                <div class="d-flex">
                  <b-form-input
                    v-model="form.inCharge"
                    class="w-30"
                    placeholder="소속을 입력하세요.(예: 회사명, 팀명 등)"
                  />
                </div>
              </td>
            </tr>
            <tr>
              <th>CP사</th>
              <td colspan="3">
                <b-form-group v-slot="{ ariaDescribedby }">
                  <b-form-radio-group
                    v-model="form.cp"
                    :options="cpOptions"
                    :aria-describedby="ariaDescribedby"
                  />
                </b-form-group>
              </td>
            </tr>
            <tr>
              <th>계정 활성화</th>
              <td colspan="3">
                <b-form-group v-slot="{ ariaDescribedby }">
                  <b-form-radio-group
                    v-model="form.activeYn"
                    :options="accountOptions"
                    :aria-describedby="ariaDescribedby"
                  />
                </b-form-group>
              </td>
            </tr>
          </tbody>
        </table>
      </b-col>
    </b-row>
  </b-container>
</template>
<script>
import { timeOptions } from '@/plugins/mixins'

export default {
  name: 'MasterEditPage',
  mixins: [timeOptions],
  data () {
    return {
      form: {
        cpId: '',
        name: '',
        inCharge: '',
        activeYn: ''
      },
      cpOptions: [
        { text: '전체', value: '전체' },
        { text: '설정', value: '설정' }
      ],
      accountOptions: [
        { text: '활성화', value: '활성화' },
        { text: '비활성', value: '비활성' }
      ]
    }
  },
  async fetch () {
    await this.detailList()
  },
  computed: {
    breadcrumb () {
      const arr = [
        { label: '홈', url: '/' },
        { label: '관리자 관리', url: '#' },
        { label: '마스터 관리자 수정', url: this.$route.path }
      ]
      return arr
    }
  },
  watch: {},
  created () {},
  mounted () {},
  methods: {
    async editMaster () {
      try {
        const { status } = await this.$axios.put(
          `/api/manager/admin/master/${this.currentId}`,
          {
            cpId: this.form.cpId,
            name: this.form.name,
            inCharge: this.form.inCharge,
            activeYn: this.form.activeYn
          }
        )
        if (status === 200) {
          alert('수정이 완료 되었습니다.')
          this.$router.push('/manager/master-account')
        }
      } catch (err) {
        alert('수정되지 않았습니다. 다시 시도해보십시오.')
      }
    },

    async detailList () {
      try {
        const {
          status,
          data: { data }
        } = await this.$axios.get(
          `/api/manager/admin/master/${this.$route.params.id}`
        )

        if (status === 200) {
          this.form = data
        }
      } catch (e) {
        console.log(e)
      }
    },

    openSearchModal (id) {
      this.$root.$emit('bv::show::modal', id)
    },
    toggleSingleEdition (checked) {
      if (checked) {
        this.form.pieceName = `[단행본] ${this.form.pieceName}`
      } else {
        this.form.pieceName = this.form.pieceName.replace('[단행본] ', '')
      }
    },
    uploadThumbnailImg (e) {
      this.form.thumbnailImg.file = e.target.files[0]

      this.form.thumbnailImg.src = URL.createObjectURL(e.target.files[0])
    },
    uploadMainImg (e) {
      for (let i = 0; i < e.target.files.length; i++) {
        const file = e.target.files[i]

        const fileInfo = {
          id: i + 1,
          thumbnail: URL.createObjectURL(file),
          realFile: file,
          fileName: file.name
        }

        this.mainImgList.push(fileInfo)
      }
    }
  }
}
</script>
