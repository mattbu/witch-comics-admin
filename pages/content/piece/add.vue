<template>
  <b-container fluid class="page-min-height pt-3 pb-5 mb-5">
    <UiPageTitle title="작품 등록" :breadcrumb="breadcrumb">
      <template #buttons>
        <b-button variant="primary" @click="addWork">
          등록
        </b-button>
      </template>
    </UiPageTitle>
    <hr>
    <b-row class="pt-3" align-h="between">
      <b-col align-self="center">
        <h6>기본 정보</h6>
      </b-col>
    </b-row>
    <hr class="my-2">
    <b-row class="mt-2">
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
              <th>구분*</th>
              <td colspan="3">
                <b-form-group>
                  <b-form-radio-group
                    v-model="form.selectDivision"
                    :options="divisionOptions"
                  />
                </b-form-group>
              </td>
            </tr>

            <tr>
              <th>장르*</th>
              <td colspan="3">
                <b-form-group>
                  <b-form-radio-group
                    v-model="form.selectGenre"
                    :options="genreOptions"
                  />
                </b-form-group>
              </td>
            </tr>

            <tr>
              <th>연령등급*</th>
              <td colspan="3">
                <b-form-group>
                  <b-form-radio-group
                    v-model="form.selectedAgeGraded"
                    :options="ageGradedOptions"
                  />
                </b-form-group>
              </td>
            </tr>

            <tr>
              <th>작품명*</th>
              <td>
                <b-form-input
                  ref="title-input"
                  v-model="form.pieceName"
                  type="text"
                  placeholder="작품명 입력"
                />
              </td>
              <th>
                단행본 <UiTooltipButton target-id="reservation-tooltip" />
                <UiTooltip
                  target="reservation-tooltip"
                  description="단행본으로 설정 시 회가 아닌 권으로 표시됩니다.
"
                />
              </th>
              <td>
                <b-form-checkbox
                  v-model="form.checkBook"
                  @change="toggleSingleEdition"
                />
              </td>
            </tr>

            <tr>
              <th>ISBN</th>
              <td colspan="3">
                <b-form-input
                  v-model="form.isbn"
                  type="text"
                  placeholder="ISBN 입력"
                  class="w-20"
                />
              </td>
            </tr>

            <tr>
              <th>글작가*</th>
              <td>
                <div class="d-inline-flex justify-content-between">
                  <b-button
                    ref="search-writer-btn"
                    variant="outline-secondary"
                    class="table-inner-btn"
                    autofocus
                    @click="openModal('search-writer-modal', 'WRITER')"
                  >
                    찾기
                  </b-button>
                  <b-form-checkbox
                    v-model="form.checkSame"
                    class="with-label ml-2"
                  >
                    작가 동일
                  </b-form-checkbox>
                </div>
                <template v-if="form.writer.length > 0">
                  <div class="mt-2">
                    <b-badge
                      v-for="(writer, writerIdx) in form.writer"
                      :key="`writer-${writerIdx}`"
                      pill
                      class="b-form-tag d-inline-flex"
                    >
                      <span class="align-self-center">{{
                        writer.penName
                      }}</span>
                      <b-button
                        variant="transparent"
                        class="p-0 align-self-center"
                        @click="removeWriter('WRITER', writer.id)"
                      >
                        <b-icon
                          variant="white"
                          icon="x"
                          font-scale="1.2"
                          class="ml-1"
                        />
                      </b-button>
                    </b-badge>
                  </div>
                </template>
              </td>
              <th>그림작가*</th>
              <td>
                <div class="d-inline-flex justify-content-between">
                  <b-button
                    ref="search-illustrator-btn"
                    variant="outline-secondary"
                    class="table-inner-btn"
                    :disabled="!form.writer.length"
                    @click="openModal('search-writer-modal', 'ILLUSTRATOR')"
                  >
                    찾기
                  </b-button>
                </div>
                <template v-if="form.illustrator.length > 0">
                  <div class="mt-2">
                    <b-badge
                      v-for="(illustrator, illustratorIdx) in form.illustrator"
                      :key="`illustrator-${illustratorIdx}`"
                      pill
                      class="b-form-tag d-inline-flex"
                    >
                      <span class="align-self-center">{{
                        illustrator.penName
                      }}</span>
                      <b-button
                        variant="transparent"
                        class="p-0 align-self-center"
                        @click="removeWriter('ILLUSTRATOR', illustrator.id)"
                      >
                        <b-icon
                          variant="white"
                          icon="x"
                          font-scale="1.2"
                          class="ml-1"
                        />
                      </b-button>
                    </b-badge>
                  </div>
                </template>
              </td>
            </tr>

            <tr>
              <th>원작가</th>
              <td colspan="3">
                <div class="d-inline-flex justify-content-between">
                  <b-button
                    variant="outline-secondary"
                    class="table-inner-btn"
                    @click="openModal('search-writer-modal', 'ORIGINAL')"
                  >
                    찾기
                  </b-button>
                </div>
                <template v-if="form.originalArtist.length > 0">
                  <div class="mt-2">
                    <b-badge
                      v-for="(original, originalIdx) in form.originalArtist"
                      :key="`original-${originalIdx}`"
                      pill
                      class="b-form-tag d-inline-flex"
                    >
                      <span class="align-self-center">{{
                        original.penName
                      }}</span>
                      <b-button
                        variant="transparent"
                        class="p-0 align-self-center"
                        @click="removeWriter('ORIGINAL', original.id)"
                      >
                        <b-icon
                          variant="white"
                          icon="x"
                          font-scale="1.2"
                          class="ml-1"
                        />
                      </b-button>
                    </b-badge>
                  </div>
                </template>
              </td>
            </tr>

            <tr>
              <th>CP사*</th>
              <td colspan="3">
                <div class="d-inline-flex justify-content-between">
                  <b-button
                    ref="search-cp-btn"
                    variant="outline-secondary"
                    class="table-inner-btn"
                    @click="openModal('search-cp-modal')"
                  >
                    찾기
                  </b-button>
                </div>
                <template v-if="form.cpId">
                  <div class="mt-2">
                    <b-badge pill class="b-form-tag d-inline-flex">
                      <span class="align-self-center">{{ form.cpName }}</span>
                      <b-button
                        variant="transparent"
                        class="p-0 align-self-center"
                        @click="removeCp"
                      >
                        <b-icon
                          variant="white"
                          icon="x"
                          font-scale="1.2"
                          class="ml-1"
                        />
                      </b-button>
                    </b-badge>
                  </div>
                </template>
              </td>
            </tr>

            <tr>
              <th>출판사</th>
              <td colspan="3">
                <div class="d-inline-flex justify-content-between">
                  <b-button
                    variant="outline-secondary"
                    class="table-inner-btn"
                    @click="openModal('search-publisher-modal')"
                  >
                    찾기
                  </b-button>
                </div>
                <template v-if="form.publisherId">
                  <div class="mt-2">
                    <b-badge pill class="b-form-tag d-inline-flex">
                      <span class="align-self-center">{{
                        form.publisherName
                      }}</span>
                      <b-button
                        variant="transparent"
                        class="p-0 align-self-center"
                        @click="removePublisher"
                      >
                        <b-icon
                          variant="white"
                          icon="x"
                          font-scale="1.2"
                          class="ml-1"
                        />
                      </b-button>
                    </b-badge>
                  </div>
                </template>
              </td>
            </tr>

            <tr>
              <th>담당부서</th>
              <td colspan="3">
                <div class="w-25 pr-2">
                  <b-form-select
                    id="charge-part"
                    v-model="form.selectChargePart"
                    :options="chargePartOptions"
                  />
                </div>
              </td>
            </tr>

            <tr>
              <th>국가*</th>
              <td colspan="3">
                <b-form-group>
                  <b-form-radio-group
                    v-model="form.selectedNational"
                    :options="nationalOptions"
                  />
                </b-form-group>
              </td>
            </tr>
          </tbody>
        </table>
      </b-col>
    </b-row>

    <b-row class="pt-3" align-h="between">
      <b-col align-self="center">
        <h6>연재 정보</h6>
      </b-col>
    </b-row>
    <hr class="my-2">
    <b-row class="mt-2">
      <b-col cols="12">
        <table class="table border mb-0 table-layout-fixed">
          <colgroup>
            <col style="width: 15%">
            <col style="width: 35%">
            <col style="width: 12%">
            <col>
          </colgroup>
          <tbody>
            <tr>
              <th>연재 여부*</th>
              <td>
                <b-form-group>
                  <b-form-radio-group
                    v-model="form.selectedSerialType"
                    :options="serialTypeOptions"
                  />
                </b-form-group>
              </td>
              <th>휴재 여부</th>
              <td>
                <b-form-checkbox v-model="form.isAbsence">
                  휴재
                </b-form-checkbox>
              </td>
            </tr>

            <tr>
              <th>연재일</th>
              <td>
                <b-form-checkbox
                  v-model="form.isEveryday"
                  :indeterminate="indeterminate"
                  @change="toggleAll"
                >
                  매일
                </b-form-checkbox>
                <b-form-checkbox-group
                  v-model="form.selectedSerialDay"
                  :options="serialDayOptions"
                />
              </td>
              <th>연재 주기</th>
              <td>
                <b-form-checkbox-group
                  v-model="form.selectedSerialPeriod"
                  :options="serialWeekOptions"
                />
              </td>
            </tr>

            <tr>
              <th>격주 연재</th>
              <td>
                <b-form-checkbox v-model="form.checkBiweekly">
                  설정
                </b-form-checkbox>
              </td>
              <th>연재탭 노출 여부</th>
              <td>
                <b-form-checkbox v-model="form.isExposeSerialTab">
                  미노출
                </b-form-checkbox>
              </td>
            </tr>

            <tr>
              <th>연재표기 문구</th>
              <td colspan="3">
                <b-form-input
                  v-model="form.serialMark"
                  type="text"
                  class="w-20"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </b-col>
    </b-row>

    <!-- 작품 소개 -->
    <b-row class="pt-3" align-h="between">
      <b-col align-self="center">
        <h6>작품 소개</h6>
      </b-col>
    </b-row>
    <hr class="my-2">
    <b-row class="mt-2">
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
              <th>소개글*</th>
              <td colspan="3">
                <b-form-textarea
                  ref="description-area"
                  v-model="form.description"
                  placeholder="소개글 입력"
                  rows="4"
                  max-rows="6"
                />
              </td>
            </tr>
            <tr>
              <th>태그</th>
              <td colspan="3">
                <b-form-tags
                  v-model="form.tags"
                  no-outer-focus
                  class="border-none p-0"
                  @tag-state="onTagState"
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
                    <div class="d-inline-flex w-100">
                      <b-form-input
                        v-bind="inputAttrs"
                        placeholder="태그명 입력"
                        class="w-75"
                        v-on="inputHandlers"
                      />
                      <b-button
                        type="submit"
                        variant="outline-secondary ml-2"
                        class="table-inner-btn"
                        @click="addTag()"
                      >
                        추가
                      </b-button>
                    </div>
                    <template v-if="form.tags.length > 0">
                      <div class="mt-2">
                        <b-form-tag
                          v-for="tag in tags"
                          :key="tag"
                          no-remove
                          pill
                          :title="tag"
                          :variant="tagVariant"
                          class="mr-1 d-inline-flex"
                        >
                          <span class="align-self-center">{{ `#${tag}` }}</span>
                          <b-button
                            variant="transparent"
                            class="p-0 align-self-center"
                            @click="removeTag(tag)"
                          >
                            <b-icon
                              variant="white"
                              icon="x"
                              font-scale="1.2"
                              class="ml-1"
                            />
                          </b-button>
                        </b-form-tag>
                      </div>
                    </template>
                    <template v-if="duplicateTags.length > 0">
                      <p class="text-warning mt-2 fs-14">
                        중복된 태그입니다.
                      </p>
                    </template>
                  </template>
                </b-form-tags>
              </td>
            </tr>
          </tbody>
        </table>
      </b-col>
    </b-row>

    <!--가격 정보 -->
    <b-row class="pt-3" align-h="between">
      <b-col align-self="center">
        <h6>가격 정보</h6>
      </b-col>
    </b-row>
    <hr class="my-2">
    <b-row class="mt-2">
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
              <th>대여*</th>
              <td colspan="3">
                <div class="d-inline-flex">
                  <div class="d-inline-flex">
                    <span class="align-self-center">물약</span>
                    <b-form-checkbox
                      v-model="form.checkNoPotionForRent"
                      class="with-label ml-2"
                    >
                      없음
                    </b-form-checkbox>
                    <b-form-input
                      ref="rent-price-input"
                      v-model="form.quantityPotionForRent"
                      type="text"
                      placeholder="갯수"
                      class="w-25 ml-2"
                      :disabled="form.checkNoPotionForRent"
                    />
                    <span class="align-self-center ml-2">개</span>
                  </div>
                  <div class="d-inline-flex">
                    <span class="align-self-center">호박</span>
                    <b-form-checkbox
                      v-model="form.checkNoPumpkinForRent"
                      class="with-label ml-2"
                    >
                      없음
                    </b-form-checkbox>
                    <b-form-input
                      ref="rent-point-input"
                      v-model="form.quantityPumpkinForRent"
                      type="text"
                      placeholder="갯수"
                      class="w-25 ml-2"
                      :disabled="form.checkNoPumpkinForRent"
                    />
                    <span class="align-self-center ml-2">개</span>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <th>구매*</th>
              <td colspan="3">
                <div class="d-inline-flex">
                  <div class="d-inline-flex">
                    <span class="align-self-center">물약</span>
                    <b-form-checkbox
                      v-model="form.checkNoPotionForPurchase"
                      class="with-label ml-2"
                    >
                      없음
                    </b-form-checkbox>
                    <b-form-input
                      ref="purchase-price-input"
                      v-model="form.quantityPotionForPurchase"
                      type="text"
                      placeholder="갯수"
                      class="w-25 ml-2"
                      :disabled="form.checkNoPotionForPurchase"
                    />
                    <span class="align-self-center ml-2">개</span>
                  </div>
                </div>
              </td>
            </tr>
            <tr>
              <th>호박 대여 제외 최신화 조정*</th>
              <td colspan="3">
                <div class="d-inline-flex">
                  <span class="align-self-center">최신</span>
                  <b-form-input
                    v-model="form.blockPumpkinRent"
                    type="text"
                    placeholder="ex) 000"
                    class="w-25 ml-2"
                  />
                  <span class="align-self-center ml-2">화는 호박으로 구매할 수 없게 설정합니다.</span>
                </div>
              </td>
            </tr>
            <tr>
              <th>무료회차 소장구매 설정*</th>
              <td colspan="3">
                <b-form-group>
                  <b-form-radio-group
                    v-model="form.keepYn"
                    :options="keepYnOptions"
                  />
                </b-form-group>
              </td>
            </tr>
          </tbody>
        </table>
      </b-col>
    </b-row>

    <!-- 이미지 설정 -->
    <b-row class="pt-3" align-h="between">
      <b-col align-self="center">
        <h6>이미지 설정</h6>
      </b-col>
    </b-row>
    <hr class="my-2">
    <b-row class="mt-2">
      <b-col cols="12">
        <table class="table border mb-0 table-layout-fixed">
          <colgroup>
            <col style="width: 15%">
            <col style="width: 35%">
            <col style="width: 15%">
            <col style="width: 35%">
          </colgroup>
          <tbody>
            <tr>
              <th>책표지형 이미지*</th>
              <td>
                <p class="mb-2">
                  이미지 추가 ({{ form.coverImgFile ? '1' : '0' }}/1개)
                </p>
                <div>
                  <input
                    id="cover-img-input"
                    type="file"
                    class="d-none"
                    @change="uploadSingleImg($event, 'COVER')"
                  >
                  <label
                    ref="cover-img-file"
                    for="cover-img-input"
                    class="btn btn-outline-secondary mb-0 table-inner-btn"
                  >
                    파일 선택
                  </label>
                </div>

                <b-row v-if="form.coverImgFile" class="mt-3">
                  <b-col cols="6">
                    <div class="add-thumbnail-wrapper">
                      <img :src="form.coverImgFile" class="preview" alt="">
                    </div>
                  </b-col>
                </b-row>
              </td>

              <th>포스터형 이미지*</th>
              <td>
                <span class="fs-14 text-muted">*작품 상세 페이지 상단에만 노출됩니다.</span>
                <p class="mb-2">
                  이미지 추가 ({{ form.posterImgFile ? '1' : '0' }}/1개)
                </p>
                <div>
                  <input
                    id="poster-img-input"
                    type="file"
                    class="d-none"
                    @change="uploadSingleImg($event, 'POSTER')"
                  >
                  <label
                    ref="poster-img-file"
                    for="poster-img-input"
                    class="btn btn-outline-secondary mb-0 table-inner-btn"
                  >
                    파일 선택
                  </label>
                </div>

                <b-row v-if="form.posterImgFile" class="mt-3">
                  <b-col cols="6">
                    <div class="add-thumbnail-wrapper">
                      <img :src="form.posterImgFile" class="preview" alt="">
                    </div>
                  </b-col>
                </b-row>
              </td>
            </tr>

            <tr>
              <th>목록형 이미지</th>
              <td colspan="4">
                <p class="mb-2">
                  이미지 추가 ({{ form.listImgFiles.length }}개)
                </p>
                <div>
                  <input
                    id="list-img-input"
                    type="file"
                    multiple
                    class="d-none"
                    @change="uploadListImg"
                  >
                  <label
                    for="list-img-input"
                    class="btn btn-outline-secondary mb-0 table-inner-btn"
                  >
                    파일 선택
                  </label>
                </div>

                <b-row v-if="form.listImgFiles.length > 0" class="mt-3">
                  <b-col
                    v-for="(url, idx) in form.listImgFiles"
                    :key="`listImgUrl-${idx}`"
                    cols="2"
                    class="mb-3"
                  >
                    <div class="add-thumbnail-wrapper">
                      <img v-if="url" :src="url" class="preview" alt="">
                      <b-button
                        variant="transparent"
                        class="p-0 ml-3 d-flex img-delete-btn"
                        @click="deleteListImg(idx)"
                      >
                        <b-icon
                          variant="dark"
                          icon="x"
                          font-scale="1.2"
                        />
                      </b-button>
                    </div>
                  </b-col>
                </b-row>
              </td>
            </tr>

            <tr>
              <th>작품 상세페이지 상단 이미지 설정*</th>
              <td colspan="8">
                <b-form-radio-group
                  v-model="form.setHeadImg"
                  :options="imageOptions"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </b-col>
    </b-row>

    <!-- 뷰어 설정 -->
    <b-row class="pt-3" align-h="between">
      <b-col align-self="center">
        <h6>뷰어 설정</h6>
      </b-col>
    </b-row>
    <hr class="my-2">
    <b-row class="mt-2">
      <b-col cols="12">
        <table class="table border mb-0 table-layout-fixed">
          <colgroup>
            <col style="width: 15%">
            <col>
          </colgroup>
          <tbody>
            <tr>
              <th>뷰어모드*</th>
              <td>
                <div class="d-inline-flex justify-content-between w-75">
                  <b-form-radio-group
                    v-model="form.selectedViewerMode"
                    :options="viewerModeOptions"
                  />
                  <span class="fs-14 text-muted">*페이지 넘김 모드 선택 시 스크롤 모드도 같이
                    지원됩니다.</span>
                </div>
              </td>
            </tr>
            <template v-if="form.selectedViewerMode === 'P'">
              <tr>
                <th>기본 뷰어모드</th>
                <td>
                  <b-form-radio-group
                    v-model="form.selectedDefaultViewerMode"
                    :options="viewerModeOptions.slice().reverse()"
                  />
                </td>
              </tr>
              <tr>
                <th>페이지 넘김 방식</th>
                <td>
                  <b-form-radio-group
                    v-model="form.pageWay"
                    :options="pageWayOptions"
                  />
                </td>
              </tr>
            </template>
          </tbody>
        </table>
      </b-col>
    </b-row>

    <!-- 부가 설정 -->
    <b-row class="pt-3" align-h="between">
      <b-col align-self="center">
        <h6>부가 설정</h6>
      </b-col>
    </b-row>
    <hr class="my-2">
    <b-row class="mt-2">
      <b-col cols="12">
        <table class="table border mb-0">
          <colgroup>
            <col style="width: 15%">
          </colgroup>
          <tbody>
            <tr>
              <th>댓글 설정*</th>
              <td>
                <b-form-radio-group
                  v-model="form.setComment"
                  :options="commentSetOptions"
                />
              </td>
            </tr>
            <tr>
              <th>선물하기 설정*</th>
              <td>
                <b-form-radio-group
                  v-model="form.setGift"
                  :options="giftSetOptions"
                />
              </td>
            </tr>
            <tr>
              <th>회차명 회/권 노출*</th>
              <td>
                <b-form-radio-group
                  v-model="form.exposeEdition"
                  :options="serialInfoOpenOptions"
                />
              </td>
            </tr>
          </tbody>
        </table>
      </b-col>
    </b-row>

    <!-- 패키지 설정 -->
    <b-row class="pt-3" align-h="between">
      <b-col align-self="center">
        <h6>패키지 설정</h6>
      </b-col>
    </b-row>
    <hr class="my-2">
    <b-row class="mt-2">
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
              <th>패키지 대여 설정</th>
              <td colspan="3">
                <div class="d-inline-flex">
                  <div class="d-inline-flex">
                    <b-form-checkbox
                      v-model="form.setPackageRent"
                      class="with-label ml-2"
                    >
                      전체
                    </b-form-checkbox>
                    <b-form-input
                      v-model="form.packageRentEdition"
                      type="text"
                      placeholder=""
                      class="w-20 ml-2"
                      :disabled="form.setPackageRent"
                    />
                    <span class="align-self-center ml-2">화 이상 대여 시 </span>
                    <b-form-input
                      v-model="form.packageRentDiscount"
                      type="text"
                      placeholder=""
                      class="w-20 ml-2"
                    />
                    <span class="align-self-center ml-2">% 할인이 됩니다.
                    </span>
                    <b-button
                      variant="outline-secondary"
                      class="table-inner-btn ml-3"
                      @click="setPackage('RENT')"
                    >
                      등록
                    </b-button>
                  </div>
                </div>
              </td>
            </tr>
            <tr v-if="form.packageRentList.length > 0">
              <th>패키지 대여 내역</th>
              <td colspan="3">
                <div
                  v-for="(row, index) in form.packageRentList"
                  :key="`rentRow-${index}`"
                >
                  <span class="align-self-center ml-2">
                    {{
                      row.edition === '전체'
                        ? row.edition
                        : `${row.edition}화 이상`
                    }}
                    대여 시 {{ row.discount }}% 할인 됩니다.
                  </span>
                  <b-button
                    variant="transparent"
                    class="p-0 ml-2"
                    @click="removePackage('RENT', index)"
                  >
                    <b-icon variant="dark" icon="x" font-scale="1.2" />
                  </b-button>
                  <hr
                    v-if="form.packageRentList.length !== index + 1"
                    class="my-2"
                  >
                </div>
              </td>
            </tr>
            <tr>
              <th>패키지 구매 설정</th>
              <td colspan="3">
                <div class="d-inline-flex">
                  <div class="d-inline-flex">
                    <b-form-checkbox
                      v-model="form.setPackagePurchase"
                      class="with-label ml-2"
                    >
                      전체
                    </b-form-checkbox>
                    <b-form-input
                      v-model="form.packagePurchaseEdition"
                      type="text"
                      placeholder=""
                      class="w-20 ml-2"
                      :disabled="form.setPackagePurchase"
                    />
                    <span class="align-self-center ml-2">화 이상 구매 시 </span>
                    <b-form-input
                      v-model="form.packagePurchaseDiscount"
                      type="text"
                      placeholder=""
                      class="w-20 ml-2"
                    />
                    <span class="align-self-center ml-2">% 할인이 됩니다.
                    </span>
                    <b-button
                      variant="outline-secondary"
                      class="table-inner-btn ml-3"
                      @click="setPackage('PURCHASE')"
                    >
                      등록
                    </b-button>
                  </div>
                </div>
              </td>
            </tr>
            <tr v-if="form.packagePurchaseList.length > 0">
              <th>패키지 구매 내역</th>
              <td colspan="3">
                <div
                  v-for="(row, index) in form.packagePurchaseList"
                  :key="`purchaseRow-${index}`"
                >
                  <span class="align-self-center ml-2">
                    {{
                      row.edition === '전체'
                        ? row.edition
                        : `${row.edition}화 이상`
                    }}
                    구매 시 {{ row.discount }}% 할인 됩니다.
                  </span>
                  <b-button
                    variant="transparent"
                    class="p-0 ml-2"
                    @click="removePackage('PURCHASE', index)"
                  >
                    <b-icon variant="dark" icon="x" font-scale="1.2" />
                  </b-button>
                  <hr
                    v-if="form.packagePurchaseList.length !== index + 1"
                    class="my-2"
                  >
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </b-col>
    </b-row>

    <b-row class="pt-3" align-h="between">
      <b-col align-self="center">
        <h6>관련 작품 설정</h6>
      </b-col>
    </b-row>
    <hr class="my-2">
    <b-row class="mt-2">
      <b-col cols="12">
        <table class="table border mb-0 table-layout-fixed">
          <colgroup>
            <col style="width: 15%">
            <col>
            <col style="width: 10%">
            <col>
          </colgroup>
          <tbody>
            <tr
              v-for="(work, index) in form.relationshipList"
              :key="`relation-${index}`"
            >
              <th>관련 작품 목록 및 설명</th>
              <td colspan="3">
                <div class="d-inline-flex w-100">
                  <b-form-input
                    v-model="work.description"
                    type="text"
                    placeholder="관련 작품 설명을 입력해 주세요."
                    class="w-50"
                  />
                  <b-button
                    variant="outline-secondary"
                    class="table-inner-btn ml-2"
                    @click="openModal('search-piece-modal')"
                  >
                    작품 추가
                  </b-button>
                </div>
                <template v-if="work.works.length > 0">
                  <div class="mt-2">
                    <b-badge
                      v-for="(title, workIdx) in work.works"
                      :key="`relation-title-${workIdx}`"
                      pill
                      class="b-form-tag d-inline-flex"
                    >
                      <span class="align-self-center">{{ title.title }}</span>
                      <b-button
                        variant="transparent"
                        class="p-0 align-self-center"
                        @click="removeSelectedWork(index, title.id)"
                      >
                        <b-icon
                          variant="white"
                          icon="x"
                          font-scale="1.2"
                          class="ml-1"
                        />
                      </b-button>
                    </b-badge>
                  </div>
                </template>
              </td>
            </tr>
            <tr>
              <th>관련 작품 목록 추가</th>
              <td colspan="3">
                <b-button
                  variant="outline-secondary"
                  class="table-inner-btn"
                  @click="addRelationWorkForm"
                >
                  목록 추가
                </b-button>
              </td>
            </tr>
          </tbody>
        </table>
      </b-col>
    </b-row>

    <!-- 작가 검색(search-writer-modal) -->
    <SearchWriterModal
      :modal-type="writerModalType"
      @select-writer="selectWriter"
    />

    <!-- 출판사 검색(search-publisher-modal) -->
    <SearchPublisherModal @select-publisher="selectPublisher" />

    <!-- CP사 검색(search-cp-modal) -->
    <SearchCpModal @select-cp="selectCp" />

    <!-- 관련 작품 검색(search-piece-modal) -->
    <SearchWorksModal @select-work="selectWork" />
  </b-container>
</template>
<script>
export default {
  name: 'ContentPieceAddPage',
  data () {
    return {
      form: {
        // 기본 정보
        selectDivision: '1', // 구분
        selectGenre: '드라마', // 장르
        selectedAgeGraded: '0', // 연령등급
        pieceName: '', // 작품명
        checkBook: false, // 단행본
        isbn: '', // ISBN
        writer: [], // 글작가
        checkSame: false, // 작가 동일
        illustrator: '', // 그림작가
        originalArtist: '', // 원작가
        cpId: null, // CP사 ID
        cpName: '', // CP사 명
        publisherId: null,
        publisherName: '', // 출판사명
        selectChargePart: '', // 담당부서
        selectedNational: '국내', // 국가

        // 연재 정보
        selectedSerialType: '연재', // 연재 여부
        isAbsence: false, // 휴재 여부
        isEveryday: false, // 연재일 매일 체크
        selectedSerialDay: [], // 연재일
        selectedSerialPeriod: [], // 연재 주기
        checkBiweekly: false, // 격주 연재
        isExposeSerialTab: false, // 연재탭 노출 여부
        serialMark: '', // 연재표기 문구

        // 작품 소개
        description: '', // 소개글
        tags: [], // 태그

        // 가격 정보
        checkNoPotionForRent: false, // 대여 물약 없음
        quantityPotionForRent: '', // 대여 물약 개수
        checkNoPumpkinForRent: false, // 대여 호박 없음
        quantityPumpkinForRent: '', // 대여 호박 개수
        checkNoPotionForPurchase: false, // 구매 물약 없음
        quantityPotionForPurchase: '', // 구매 물약 개수
        blockPumpkinRent: '', // 호박 대여 제외 최신화 조정
        keepYn: '소장가능', // 무료 회차 소장구매 설정

        // 이미지 설정
        coverImgFile: null, // 책표지형 이미지
        posterImgFile: null, // 포스터형 이미지
        listImgFiles: [], // 목록형 이미지
        setHeadImg: '책표지 이미지', // 작품 상세페이지 상단 이미지 설정

        // 뷰어 설정

        selectedViewerMode: 'S', // 뷰어모드
        selectedDefaultViewerMode: 'P', // 기본 뷰어모드
        pageWay: 'K', // 페이지 넘김 방식
        // 부가 설정
        setComment: true, // 댓글 설정
        setGift: true, // 선물하기 설정
        exposeEdition: true, // 회차명 회/권 노출

        // 패키지 설정
        setPackageRent: false, // 패키지 대여 전체
        packageRentEdition: '', // 패키지 대여 화수
        packageRentDiscount: '', // 패키지 대여 할인
        setPackagePurchase: false, // 패키지 구매 전체
        packagePurchaseEdition: '', // 패키지 구매 화수
        packagePurchaseDiscount: '', // 패키지 구매 할인

        packageRentList: [], // 패키지 대여 내역
        packagePurchaseList: [], // 패키지 구매 내역

        // 관련 작품 설정
        relationshipList: [
          {
            // 관력 작품 [목록,설명]
            description: '',
            works: []
          }
        ]
      },

      // 기본 정보
      // 구분 옵션
      divisionOptions: [
        { text: '웹툰/만화', value: '1' },
        { text: '소설', value: '2' }
      ],
      // 장르 옵션
      genreOptions: [
        { text: '드라마', value: '드라마' },
        { text: '로맨스', value: '로맨스' },
        { text: '액션/스포츠', value: '액션/스포츠' },
        { text: '호러/미스테리', value: '호러/미스테리' },
        { text: 'BL/GL', value: 'BL/GL' },
        { text: '판타지', value: '판타지' }
      ],
      // 연령등급 옵션
      ageGradedOptions: [
        { text: '전체 이용가', value: '0' },
        { text: '성인', value: '19' }
      ],
      // 담당부서 옵션
      chargePartOptions: [
        { text: '선택', value: '' },
        { text: '늘봄만화', value: '늘봄만화' },
        { text: '윙크만화', value: '윙크만화' },
        { text: '점프만화', value: '점프만화' },
        { text: '해외만화', value: '해외만화' },
        { text: '웹소설', value: '웹소설' },
        { text: '해외소설(IPLab)', value: '해외소설(IPLab)' },
        { text: '국내만화', value: '국내만화' }
      ],
      // 국가 옵션
      nationalOptions: [
        { text: '국내', value: '국내' },
        { text: '해외', value: '해외' }
      ],

      // 연재 정보
      // 연재 여부 옵션
      serialTypeOptions: [
        { text: '연재', value: '연재' },
        { text: '완결', value: '완결' }
      ],
      // 연재일 체크박스
      indeterminate: false,
      // 연재일 옵션
      serialDayOptions: ['월', '화', '수', '목', '금', '토', '일'],
      // 연재 주기 옵션
      serialWeekOptions: [
        { text: '열흘', value: '열흘' },
        { text: '비정기', value: '비정기' }
      ],

      // 작품 소개 > 중복된 태그 확인용
      duplicateTags: [],

      // 가격 정보
      // 무료회차 소장구매 설정
      keepYnOptions: [
        { text: '소장가능', value: '소장가능' },
        { text: '소장불가', value: '소장불가' }
      ],

      // 이미지 설정
      // 작품 상세페이지 상단 이미지 설정 옵션
      imageOptions: [
        { text: '책표지 이미지', value: '책표지 이미지' },
        { text: '포스터형 이미지', value: '포스터형 이미지' }
      ],

      // 뷰어 설정
      // 기본 뷰어모드 옵션
      viewerModeOptions: [
        { text: '스크롤 모드', value: 'S' },
        { text: '페이지 넘김 모드', value: 'P' }
      ],
      // 페이지 넘김 방식 옵션
      pageWayOptions: [
        { text: '좌에서 우(한국식)', value: 'K' },
        { text: '우에서 좌(일본식)', value: 'J' }
      ],

      // 부가 설정
      // 댓글 설정
      commentSetOptions: [
        { text: '설정', value: true },
        { text: '미설정', value: false }
      ],
      // 선물하기 설정
      giftSetOptions: [
        { text: '설정', value: true },
        { text: '미설정', value: false }
      ],
      // 회차명 회/권 노출 설정*
      serialInfoOpenOptions: [
        { text: '설정', value: true },
        { text: '미설정', value: false }
      ],

      // 관련 작품 설정
      selectedWorkList: [],

      // 작가 등록 모달
      writerModalType: ''
    }
  },
  computed: {
    breadcrumb () {
      const arr = [
        { label: '홈', url: '/' },
        { label: '콘텐츠 관리', url: '#' },
        { label: '작품 관리', url: '/content/piece' },
        { label: '작품 등록', url: '/content/piece/add' }
      ]
      return arr
    }
  },
  watch: {
    'form.checkNoPotionForRent' (val) {
      if (val) {
        this.form.quantityPotionForRent = '0'
      } else {
        this.form.quantityPotionForRent = ''
      }
    },
    'form.checkNoPumpkinForRent' (val) {
      if (val) {
        this.form.quantityPumpkinForRent = '0'
      } else {
        this.form.quantityPumpkinForRent = ''
      }
    },
    'form.checkNoPotionForPurchase' (val) {
      if (val) {
        this.form.quantityPotionForPurchase = '0'
      } else {
        this.form.quantityPotionForPurchase = ''
      }
    },
    'form.writer' (val) {
      if (
        val.length > 0 &&
        this.$refs['search-writer-btn'].classList.contains('active')
      ) {
        this.$refs['search-writer-btn'].classList.remove('active')
      }
    },
    'form.illustrator' (val) {
      if (
        val.length > 0 &&
        this.$refs['search-illustrator-btn'].classList.contains('active')
      ) {
        this.$refs['search-illustrator-btn'].classList.remove('active')
      }
    },
    'form.coverImgFile' (val) {
      if (val && this.$refs['cover-img-file'].classList.contains('active')) {
        this.$refs['cover-img-file'].classList.remove('active')
      }
    },
    'form.posterImgFile' (val) {
      if (val && this.$refs['poster-img-file'].classList.contains('active')) {
        this.$refs['poster-img-file'].classList.remove('active')
      }
    },
    'form.selectedSerialDay' (newValue, oldValue) {
      if (newValue.length === 0) {
        this.indeterminate = false
        this.form.isEveryday = false
      } else if (newValue.length === this.serialDayOptions.length) {
        this.indeterminate = false
        this.form.isEveryday = true
      } else {
        this.indeterminate = true
        this.form.isEveryday = false
      }
    },
    'form.checkSame' (val) {
      if (val && this.form.writer.length > 0) {
        this.form.illustrator = [...this.form.writer]
      } else if (!val) {
        this.form.illustrator = []
      }
    }
  },
  created () {},
  mounted () {},
  methods: {
    /** 연재일 '매일' 체크 */
    toggleAll (checked) {
      this.form.selectedSerialDay = checked ? this.serialDayOptions.slice() : []
    },
    /** 태그 request data 변형 */
    parseTags () {
      if (this.form.tags.length > 0) {
        const addHashTags = this.form.tags.map(tag => `#${tag}`)
        return addHashTags
      }
    },
    /** 글, 그림, 원작가 request data 변형 */
    parseWriterArr () {
      const requestWriterData = {
        writer:
          this.form.writer.length > 0
            ? this.form.writer.map(writer => writer.id)
            : [],
        illustrator:
          this.form.illustrator.length > 0
            ? this.form.illustrator.map(writer => writer.id)
            : [],
        originArtist:
          this.form.originalArtist.length > 0
            ? this.form.originalArtist.map(writer => writer.id)
            : []
      }
      return requestWriterData
    },
    /** 작품 등록 유효성 검사 */
    checkValidation () {
      if (!this.form.pieceName.length) {
        this.$refs['title-input'].focus()
        alert('작품명을 입력해 주세요.')
        return false
      } else if (!this.form.writer.length) {
        this.$refs['search-writer-btn'].classList.add('active')
        alert('글작가를 선택해 주세요.')
        return false
      } else if (!this.form.illustrator.length) {
        this.$refs['search-illustrator-btn'].classList.add('active')
        alert('그림작가를 선택해 주세요.')
        return false
      } else if (!this.form.cpId) {
        this.$refs['search-cp-btn'].classList.add('active')
        alert('CP사를 선택해 주세요.')
        return false
      } else if (!this.form.description) {
        alert('소개글을 입력해 주세요.')
        this.$refs['description-area'].focus()
        return false
      } else if (!this.form.quantityPotionForRent.length) {
        alert('대여 물약 개수를 입력해 주세요.')
        this.$refs['rent-price-input'].focus()
        return false
      } else if (!this.form.quantityPumpkinForRent.length) {
        alert('대여 호박 개수를 입력해 주세요.')
        this.$refs['rent-point-input'].focus()
        return false
      } else if (!this.form.quantityPotionForPurchase.length) {
        alert('구매 물약 개수를 입력해 주세요.')
        this.$refs['purchase-price-input'].focus()
        return false
      } else if (!this.form.coverImgFile) {
        alert('책표지형 이미지를 설정해 주세요.')
        this.$refs['cover-img-file'].classList.add('active')
        return false
      } else if (!this.form.posterImgFile) {
        alert('포스터형 이미지를 설정해 주세요.')
        this.$refs['poster-img-file'].classList.add('active')
        return false
      }
      return true
    },
    /** 작품 등록 */
    async addWork () {
      if (this.checkValidation()) {
        const hashTags = this.parseTags()
        const writerIds = this.parseWriterArr()

        try {
          const res = await this.$axios.post(
            '/api/cartoon/contents/regist/main',
            {
              // 기본 정보
              menucode: this.form.selectDivision, // 구분
              genrecode: this.form.selectGenre, // 장르
              rate: this.form.selectedAgeGraded, // 연령 등급
              title: this.form.pieceName, // 작품명
              is_book: this.form.checkBook, // 단행본
              isbn: this.form.isbn, // ISBN
              writer: writerIds.writer, // 글작가
              illustrator: writerIds.illustrator, // 그림작가
              original_artist: writerIds.originalArtist, // 원작가
              cp_info_id: this.form.cpId, // cp사
              publisher_info_id: this.form.publisherId, // 출판사
              in_charge: this.form.selectChargePart, // 담당부서
              country: this.form.selectedNational, // 국가

              // 연재 정보
              is_end: this.form.selectedSerialType, // 연재 여부
              is_stop: this.form.isAbsence, // 휴재 여부
              serial_date: this.form.selectedSerialDay.toString(), // 연재일
              serial_cycle: this.form.selectedSerialPeriod.toString(), // 연재주기
              is_biweekly: this.form.checkBiweekly, // 격주 연재
              is_show: this.form.isExposeSerialTab, // 연재탭 노출 여부
              serial_ment: this.form.serialMark, // 연재표기 문구

              // 작품 소개
              info: this.form.description, // 소개글
              tags: hashTags.toString(), // 태그

              // 가격 정보
              price_rental: this.form.quantityPotionForRent, // 대여 물약 개수
              point_rental: this.form.quantityPumpkinForRent, // 대여 물약 개수
              price: this.form.quantityPotionForPurchase, // 구매 물약 개수
              not_available: this.form.blockPumpkinRent, // 호박 대여 제외 최신화 조정
              is_collect: this.form.keepYn, // 무료회차 소장구매 설정

              // 이미지 설정
              width_image: this.form.coverImgFile, // 책표지형 이미지
              vertical_image: this.form.coverImgFile, // 포스터형 이미지
              listImage: this.form.listImgFiles.toString(), // 목록형 이미지
              top_image: this.form.setHeadImg, // 작품 상세페이지 상단 이미지 설정

              // 뷰어 설정
              viewer_mode: this.form.selectedViewerMode, // 뷰어 설정
              default_viewer_mode: this.form.selectedDefaultViewerMode, // 기본 뷰어 설정
              page_way: this.form.pageWay, // 페이지 넘김 방식

              // 부가 설정
              is_reply: this.form.selectedViewerMode, // 댓글 설정
              is_gift: this.form.selectedViewerMode, // 선물하기 설정
              is_episode_name: this.form.selectedViewerMode // 회차명 회/권 노출
              // 패키지 설정

              // 관련 작품 설정
            }
          )
          if (res.status === 200) {
            alert('작품 등록이 완료 되었습니다.')
            this.$router.push('/content/piece')
          }
        } catch (e) {
          console.log(e)
        }
      }
    },
    /** 작가 선택 */
    selectWriter ({ type, list }) {
      if (type === 'WRITER') {
        this.form.writer = list
      } else if (type === 'ILLUSTRATOR') {
        this.form.illustrator = list
      } else {
        this.form.originalArtist = list
      }
    },
    /** 작가 삭제 */
    removeWriter (type, id) {
      if (type === 'WRITER') {
        this.form.writer = this.form.writer.filter(writer => writer.id !== id)
      } else if (type === 'ILLUSTRATOR') {
        this.form.illustrator = this.form.illustrator.filter(
          illustrator => illustrator.id !== id
        )
      } else {
        this.form.originalArtist = this.form.originalArtist.filter(
          original => original.id !== id
        )
      }
    },
    /** 출판사 삭제 */
    removePublisher () {
      this.form.publisherName = ''
      this.form.publisherId = null
    },
    /** 출판사 선택 */
    selectPublisher (data) {
      this.form.publisherName = data.name
      this.form.publisherId = data.id
    },
    /** CP사 삭제 */
    removeCp () {
      this.form.cpName = ''
      this.form.cpId = null
    },
    /** CP사 선택 */
    selectCp (data) {
      this.form.cpName = data.name
      this.form.cpId = data.id
    },
    /** 관련 작품 추가 */
    selectWork (selectedData) {
      const addArr = selectedData.map(data => ({
        id: data.item.id,
        title: data.item.title
      }))

      this.form.relationshipList.forEach(() => {
        if (this.form.relationshipList.length === 1) {
          this.form.relationshipList[0].works = addArr
        } else if (this.form.relationshipList.length > 1) {
          this.form.relationshipList[
            this.form.relationshipList.length - 1
          ].works = addArr
        }
      })
    },
    /** 관련 작품 삭제 */
    removeSelectedWork (getIdx, id) {
      this.form.relationshipList.forEach((item, idx) => {
        if (getIdx === idx) {
          const filtered = item.works.filter((work) => {
            return work.id !== id
          })
          item.works = filtered
        }
      })
    },
    /** 관련 작품 목록 추가 */
    addRelationWorkForm () {
      this.form.relationshipList.push({ description: '', works: [] })
    },
    /** 패키지 대여, 구매 설정 등록
     * @param type RENT or PURCHASE */
    setPackage (type) {
      const obj = {}
      if (type === 'RENT') {
        obj.edition = this.form.setPackageRent
          ? '전체'
          : this.form.packageRentEdition
        obj.discount = this.form.packageRentDiscount
        this.form.packageRentList.push(obj)
        this.form.setPackageRent = false
        this.form.packageRentEdition = ''
        this.form.packageRentDiscount = ''
      } else if (type === 'PURCHASE') {
        obj.edition = this.form.setPackagePurchase
          ? '전체'
          : this.form.packagePurchaseEdition
        obj.discount = this.form.packagePurchaseDiscount
        this.form.packagePurchaseList.push(obj)
        this.form.setPackagePurchase = false
        this.form.packagePurchaseEdition = ''
        this.form.packagePurchaseDiscount = ''
      }
    },
    /** 패키지 대여, 구매 내역 삭제
     * @param type RENT or PURCHASE
     * @param index 패키지 대여, 구매 내역 index값
     * */
    removePackage (type, index) {
      if (type === 'RENT') {
        this.form.packageRentList = this.form.packageRentList.filter(
          (row, idx) => idx !== index
        )
      } else if (type === 'PURCHASE') {
        this.form.packagePurchaseList = this.form.packagePurchaseList.filter(
          (row, idx) => idx !== index
        )
      }
    },
    /** 작품 소개 태그 중복 태그 감지 */
    onTagState (valid, invalid, duplicate) {
      this.duplicateTags = duplicate
    },

    openModal (id, type) {
      if (type) {
        this.writerModalType = type
      } else {
        this.writerModalType = ''
      }

      if (id === 'select-writer-modal') {
        if (this.writerModalType) {
          this.$root.$emit('bv::show::modal', id)
        }
      } else {
        this.$root.$emit('bv::show::modal', id)
      }
    },
    /** 단행본 체크 */
    toggleSingleEdition (checked) {
      if (checked) {
        this.form.pieceName = `[단행본] ${this.form.pieceName}`
      } else {
        this.form.pieceName = this.form.pieceName.replace('[단행본] ', '')
      }
    },
    /** 책표지형, 포스터형 이미지 업로드 */
    async uploadSingleImg (e, type) {
      const form = new FormData()

      if (e.target.files.length > 0) {
        form.append('file', e.target.files[0])
        // 파일 태우기
        const { status, data } = await this.$axios.post(
          '/api/file/upload',
          form,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
        )
        if (status === 200) {
          if (type === 'COVER') {
            this.form.coverImgFile = data
            // this.coverImgUrl = URL.createObjectURL(e.target.files[0])
          } else {
            this.form.posterImgFile = data
            // this.posterImgUrl = URL.createObjectURL(e.target.files[0])
          }
        }
      }
    },
    /** 목록형 이미지 업로드 */
    async uploadListImg (e) {
      if (e.target.files.length > 5 || this.form.listImgFiles.length > 4) {
        alert('목록형 이미지는 5개 까지 등록 가능합니다.')
        return
      }

      for (let i = 0; i < e.target.files.length; i++) {
        const file = e.target.files[i]

        const form = new FormData()
        form.append('file', file)

        const { status, data } = await this.$axios.post(
          '/api/file/upload',
          form,
          {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
        )
        if (status === 200) {
          this.form.listImgFiles.push(data)
        }
      }
    },
    /** 목록형 이미지 삭제 */
    deleteListImg (index) {
      this.form.listImgFiles.splice(index, 1)
    }
  }
}
</script>
