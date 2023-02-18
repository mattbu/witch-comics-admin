<template>
  <b-container fluid class="page-min-height py-3">
    <UiPageTitle title="1:1 문의 답변달기" :breadcrumb="breadcrumb">
      <template #buttons>
        <b-button variant="primary">
          답변 등록
        </b-button>
      </template>
    </UiPageTitle>
    <hr>
    <b-row class="pt-3" align-h="between">
      <b-col align-self="center">
        <h6>1:1 문의 내역</h6>
      </b-col>
    </b-row>
    <hr class="my-2">
    <b-row class="mt-3">
      <b-col>
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
              <th>항목</th>
              <td colspan="3">
                <b-form-input v-model="form.title" type="text" class="w-30" />
              </td>
            </tr>
            <tr>
              <th>제목</th>
              <td colspan="3">
                <b-form-input v-model="form.title" type="text" class="w-30" />
              </td>
            </tr>
            <tr>
              <th>내용</th>
              <td colspan="3">
                <b-form-textarea
                  id="textarea"
                  v-model="form.content"
                  rows="6"
                  max-rows="6"
                />
              </td>
            </tr>

            <tr>
              <th>첨부파일</th>
              <td colspan="3">
                <b-img
                  thumbnail
                  fluid
                  src="https://picsum.photos/100/125/?image"
                  alt="Image 1"
                />
                <b-img
                  class="ml-2"
                  thumbnail
                  fluid
                  src="https://picsum.photos/100/125/?image"
                  alt="Image 1"
                />
                <b-img
                  class="ml-2"
                  thumbnail
                  fluid
                  src="https://picsum.photos/100/125/?image"
                  alt="Image 1"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </b-col>
    </b-row>
    <b-row class="pt-5" align-h="between">
      <b-col align-self="center">
        <h6>1:1 문의 답변</h6>
      </b-col>
    </b-row>
    <hr class="my-2">
    <b-row class="mt-3">
      <b-col>
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
              <th>내용</th>
              <td colspan="3">
                <b-form-textarea
                  id="textarea"
                  v-model="form.content"
                  rows="6"
                  max-rows="6"
                />
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
  name: 'CsQuestionsAddPage',
  mixins: [timeOptions],
  data () {
    return {
      form: {
        item: null,
        title: '',
        content: '',
        file: '',
        date: '',
        hours: '00',
        minutes: '00',
        seconds: '59'
      },
      typeOptions: [
        { value: null, text: '선택' },
        { value: 1, text: 'FAQ1' },
        { value: 2, text: 'FAQ2' }
      ],
      hoursOptions: [],
      minutesOptions: [],
      secondsOptions: []
    }
  },
  computed: {
    breadcrumb () {
      const arr = [
        { label: '홈', url: '/' },
        { label: '서비스 운영관리', url: '#' },
        { label: '1:1 문의 답변달기 등록', url: this.$route.path }
      ]
      return arr
    }
  },
  watch: {},
  created () {},
  mounted () {
    this.hoursOptions = this.getHours()
    this.minutesOptions = this.getMinutes()
    this.secondsOptions = this.getSeconds()
  },
  methods: {}
}
</script>
