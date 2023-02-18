<template>
  <b-container fluid class="page-min-height py-3">
    <UiPageTitle title="내부 관리자 수정" :breadcrumb="breadcrumb">
      <template #buttons>
        <b-button variant="primary" @click="editInner">
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
                    class="w-25"
                    placeholder="아이디를 입력하세요."
                    disabled="disabled"
                  />
                </div>
              </td>
            </tr>
            <tr>
              <th>비밀번호</th>
              <td colspan="3">
                <div class="d-flex">
                  <b-form-input
                    v-model="form.password"
                    class="w-25"
                    placeholder="비밀번호를 입력하세요."
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
                    class="w-25"
                    placeholder="계정명을 입력하세요."
                    onfocus:this.value=""
                  />
                </div>
              </td>
            </tr>
            <tr>
              <th>소속부서</th>
              <td colspan="3">
                <div class="d-flex">
                  <b-form-input
                    v-model="form.part"
                    type="text"
                    class="w-25"
                    placeholder="소속을 입력하세요.(예: 회사명, 팀명 등)"
                  />
                </div>
              </td>
            </tr>
            <tr>
              <th>권한그룹</th>
              <td colspan="3">
                <div class="d-flex">
                  <b-form-select
                    v-model="form.role"
                    :options="roleOptions"
                    class="w-10"
                  />
                </div>
              </td>
            </tr>
            <tr>
              <th>계정 활성화</th>
              <td colspan="3">
                <div class="d-flex my-2">
                  <b-form-group v-slot="{ ariaDescribedby }">
                    <b-form-radio-group
                      v-model="form.activeYn"
                      :options="accountOptions"
                      :aria-describedby="ariaDescribedby"
                    />
                  </b-form-group>
                </div>
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
  name: 'InnerEditPage',
  mixins: [timeOptions],
  data () {
    return {
      form: {},
      roleOptions: [
        { text: '선택', value: '선택' },
        { text: '선택2', value: '선택2' }
      ],
      accountOptions: [
        { text: '활성화', value: '활성화' },
        { text: '비활성', value: '비활성' }
      ],
      currentMainIdx: null,
      test: null
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
        { label: '내부 관리자 수정', url: this.$route.path }
      ]
      return arr
    }
  },
  watch: {},
  created () {},
  mounted () {},
  methods: {
    async editInner () {
      try {
        const { status } = await this.$axios.put(
          `/api/manager/admin/update/${this.currentId}`,
          {
            email: this.form.email,
            password: this.form.password,
            name: this.form.name,
            part: this.form.part,
            role: this.form.role,
            activeYn: this.form.activeYn
          }
        )
        if (status === 200) {
          alert('수정이 완료 되었습니다.')
          this.$router.push('/manager/inner-admin')
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
          `/api/manager/admin/detail/${this.$route.params.id}`
        )

        if (status === 200) {
          this.form = data
        }
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>
