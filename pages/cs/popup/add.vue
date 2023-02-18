<template>
  <b-container fluid class="page-min-height py-3">
    <UiPageTitle title="팝업 등록" :breadcrumb="breadcrumb">
      <template #buttons>
        <!-- <b-button variant="outline-primary" @click="$router.push('/content/piece')">
          취소
        </b-button> -->
        <b-button variant="primary">
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
            <tr>
              <th>분류</th>
              <td colspan="3">
                -
              </td>
            </tr>

            <tr>
              <th>제목</th>
              <td colspan="3">
                <b-form-input
                  v-model="form.title"
                  type="text"
                  placeholder="제목"
                  class="w-50"
                />
              </td>
            </tr>

            <tr>
              <th>개시 기간</th>
              <td colspan="3">
                <div class="d-inline-flex w-50">
                  <b-form-datepicker
                    id="start-date"
                    v-model="form.startDate"
                    placeholder="시작일"
                    class="mb-2"
                    :date-format-options="{
                      year: 'numeric',
                      month: 'numeric',
                      day: 'numeric'
                    }"
                  />
                  <b-form-datepicker
                    id="start-date"
                    v-model="form.endDate"
                    placeholder="종료일"
                    class="mb-2 ml-3"
                    :date-format-options="{
                      year: 'numeric',
                      month: 'numeric',
                      day: 'numeric'
                    }"
                  />
                </div>
              </td>
            </tr>

            <tr>
              <th>노출 순서</th>
              <td colspan="3">
                <b-form-input v-model="form.order" type="text" class="w-10" />
                <p class="mt-1">
                  노출 순서가 같을 경우 나중에 게시되는 글이 낮은 숫자를 부여
                  받습니다.
                </p>
              </td>
            </tr>

            <tr class="mt-5 pt-5">
              <th>표시 여부</th>
              <td colspan="3">
                <b-form-group v-slot="{ ariaDescribedby }">
                  <b-form-radio-group
                    v-model="form.selectedSort"
                    :options="displayOptions"
                    :aria-describedby="ariaDescribedby"
                  />
                </b-form-group>
              </td>
            </tr>

            <tr>
              <th>팝업 이미지</th>
              <td colspan="3">
                <p class="mb-2">
                  이미지 추가 ({{ form.popUpImgFile ? '1' : '0' }}/1개)
                </p>
                <div>
                  <input
                    id="thumbnail-image-input"
                    type="file"
                    class="d-none"
                    @change="uploadPopUpImg"
                  >
                  <label
                    for="thumbnail-image-input"
                    class="btn btn-outline-secondary mb-0 table-inner-btn"
                  >
                    파일 선택
                  </label>
                </div>
              </td>
            </tr>

            <tr>
              <th>링크</th>
              <td colspan="3">
                <b-form-input
                  v-model="form.link"
                  type="text"
                  placeholder="링크"
                  class="w-50"
                />
              </td>
            </tr>

            <tr>
              <th>링크 타입</th>
              <td colspan="3">
                <b-form-group v-slot="{ ariaDescribedby }">
                  <b-form-radio-group
                    v-model="form.linkType"
                    :options="linkTypeOptions"
                    :aria-describedby="ariaDescribedby"
                  />
                </b-form-group>
              </td>
            </tr>

            <tr>
              <th>컨텐츠 설정</th>
              <td colspan="3">
                <b-form-tags
                  v-model="form.tags"
                  no-outer-focus
                  class="border-none p-0"
                >
                  <template
                    #default="{
                      tags,
                      inputAttrs,
                      inputHandlers,
                      tagVariant,
                      addTag,
                      removeTag
                    }"
                  >
                    <div>
                      <div class="d-inline-flex w-100">
                        <b-form-input
                          v-bind="inputAttrs"
                          placeholder=""
                          class="w-30"
                          v-on="inputHandlers"
                        />
                        <b-button
                          variant="outline-secondary ml-2"
                          class="table-inner-btn"
                          @click="addTag()"
                        >
                          검색
                        </b-button>
                        <span class="align-self-center ml-3">*설정 시 등록된 콘텐츠 화면에서만 팝업이
                          나옵니다.</span>
                      </div>
                    </div>
                    <template v-if="form.tags.length > 0">
                      <div class="d-inline-block mt-2">
                        <b-form-tag
                          v-for="tag in tags"
                          :key="tag"
                          :title="tag"
                          :variant="tagVariant"
                          class="mr-1"
                          @remove="removeTag(tag)"
                        >
                          {{ tag }}
                        </b-form-tag>
                      </div>
                    </template>
                  </template>
                </b-form-tags>
              </td>
            </tr>
            <tr>
              <th>설명</th>
              <td colspan="3">
                <b-form-input
                  v-model="form.description"
                  type="text"
                  placeholder="설명"
                  class="w-50"
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
export default {
  name: 'CsPopUpAddPage',
  data () {
    return {
      form: {
        title: '',
        startDate: '',
        endDate: '',
        order: '',
        selectedDisplay: 1,
        popUpImgFile: null,
        link: '',
        linkType: 1,
        tags: [],
        description: ''
      },
      displayOptions: [
        { text: '성인/일반', value: 1 },
        { text: '일반', value: 2 },
        { text: '성인', value: 3 }
      ],
      linkTypeOptions: [
        { text: '새창', value: 1 },
        { text: '현재창', value: 2 }
      ]
    }
  },
  computed: {
    breadcrumb () {
      const arr = [
        { label: '홈', url: '/' },
        { label: '서비스 운영 관리', url: '#' },
        { label: '팝업 관리', url: '/cs/popup' },
        { label: '팝업 등록', url: this.$route.path }
      ]
      return arr
    }
  },
  watch: {},
  created () {},
  mounted () {},
  methods: {
    uploadPopUpImg (e) {
      this.form.popUpImgFile = e.target.files[0]
      console.log(this.form.popUpImgFile)
    }
  }
}
</script>
