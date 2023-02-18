<template>
  <b-container fluid class="page-min-height pt-3 pb-5 mb-5">
    <UiPageTitle title="작품 수정" :breadcrumb="breadcrumb">
      <template #buttons>
        <b-button variant="outline-primary">
          삭제
        </b-button>
        <b-button variant="primary" @click="editWork">
          수정
        </b-button>
      </template>
    </UiPageTitle>
    <hr>
    <b-row class="mt-4">
      <b-col cols="12">
        <b-card class="mb-4">
          <h6 class="font-weight-bold">
            {{ workTitle ? workTitle : '-' }}
          </h6>
        </b-card>
      </b-col>
    </b-row>
    <b-row class="pt-3" align-h="between">
      <b-col align-self="center">
        <h6>작품 정보</h6>
      </b-col>
    </b-row>
    <hr class="my-2">
    <table class="table border mb-0 table-layout-fixed">
      <colgroup>
        <col style="width: 15%">
        <col>
        <col style="width: 10%">
        <col>
      </colgroup>
      <tbody class="text-center">
        <tr>
          <th>작품아이디</th>
          <td colspan="3">
            {{ info.id ? info.id : '-' }}
          </td>
        </tr>
        <tr>
          <th>상태</th>
          <td>{{ info.statusCode ? info.statusCode : '-' }}</td>
          <th>등록일</th>
          <td>{{ info.createdAt ? info.createdAt : '-' }}</td>
        </tr>
        <tr>
          <th>게시일</th>
          <td>-</td>
          <th>수정일</th>
          <td>{{ info.updatedAt ? info.updatedAt : '-' }}</td>
        </tr>
      </tbody>
    </table>

    <!-- 기본 정보 -->
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
            <tr>
              <th>구분*</th>
              <td colspan="3">
                {{ workType }}
              </td>
            </tr>
            <tr>
              <th>장르*</th>
              <td colspan="3">
                <b-form-group>
                  <b-form-radio-group
                    v-model="info.genrecode"
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
                    v-model="info.rate"
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
                  v-model="info.title"
                  type="text"
                  placeholder="작품명 입력"
                />
              </td>
              <th>
                단행본 <UiTooltipButton target-id="reservation-tooltip" />
                <UiTooltip
                  target="reservation-tooltip"
                  description="단행본으로 설정 시 회가 아닌 권으로 표시됩니다."
                />
              </th>
              <td>
                <b-form-checkbox
                  v-model="info.isBook"
                  @change="toggleSingleEdition"
                />
              </td>
            </tr>
            <tr>
              <th>ISBN</th>
              <td colspan="3">
                <div class="d-inline-flex justify-content-between">
                  <b-form-input
                    v-model="info.isbn"
                    type="text"
                    placeholder="ISBN 입력"
                    class="w-75"
                  />
                </div>
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
                <template v-if="info.writer && info.writer.length > 0">
                  <div class="mt-2">
                    <b-badge
                      v-for="(writer, writerIdx) in info.writer"
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
                    :disabled="!info.writer || (info.writer && !info.writer.length)"
                    @click="openModal('search-writer-modal', 'ILLUSTRATOR')"
                  >
                    찾기
                  </b-button>
                </div>
                <template
                  v-if="info.illustrator && info.illustrator.length > 0"
                >
                  <div class="mt-2">
                    <b-badge
                      v-for="(illustrator, illustratorIdx) in info.illustrator"
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
                <template v-if="info.originalArtist && info.originalArtist.length > 0">
                  <div class="mt-2">
                    <b-badge
                      v-for="(original, originalIdx) in info.originalArtist"
                      :key="`original-${originalIdx}`"
                      pill
                      class="b-form-tag d-inline-flex"
                    >
                      <span class="align-self-center">{{ original.penName }}</span>
                      <b-button variant="transparent" class="p-0 align-self-center" @click="removeWriter('ORIGINAL', original.id)">
                        <b-icon variant="white" icon="x" font-scale="1.2" class="ml-1" />
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
                <template v-if="info.cpInfo && info.cpInfo.id">
                  <div class="mt-2">
                    <b-badge pill class="b-form-tag d-inline-flex">
                      <span class="align-self-center">{{ info.cpInfo.name }}</span>
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
                <template v-if="info.publisherInfo && info.publisherInfo.id">
                  <div class="mt-2">
                    <b-badge pill class="b-form-tag d-inline-flex">
                      <span class="align-self-center">{{
                        info.publisherInfo.name
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
                    v-model="info.inCharge"
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
                    v-model="info.country"
                    :options="nationalOptions"
                  />
                </b-form-group>
              </td>
            </tr>
          </tbody>
        </table>

        <!-- 연재 정보 -->
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
                <col>
                <col style="width: 10%">
                <col>
              </colgroup>
              <tbody>
                <tr>
                  <th>연재 여부*</th>
                  <td>
                    <b-form-group>
                      <b-form-radio-group
                        v-model="info.isEnd"
                        :options="serialTypeOptions"
                      />
                    </b-form-group>
                  </td>
                  <th>휴재 여부</th>
                  <td>
                    <b-form-checkbox v-model="info.isStop" />
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
                      v-model="info.serial_date"
                      :options="serialDayOptions"
                    />
                  </td>
                  <th>연재 주기</th>
                  <td>
                    <b-form-checkbox-group
                      v-model="info.serial_cycle"
                      :options="serialWeekOptions"
                    />
                  </td>
                </tr>
                <tr>
                  <th>격주연재</th>
                  <td>
                    <b-form-checkbox v-model="info.isBiweekly">
                      설정
                    </b-form-checkbox>
                  </td>
                  <th>연재탭 노출 여부</th>
                  <td>
                    <b-form-checkbox v-model="info.isShow">
                      미노출
                    </b-form-checkbox>
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
                <tr>
                  <th>소개글*</th>
                  <td colspan="3">
                    <b-form-textarea
                      ref="description-area"
                      v-model="info.info"
                      placeholder="소개글 입력"
                      rows="3"
                      max-rows="6"
                    />
                  </td>
                </tr>
                <tr>
                  <th>태그</th>
                  <td colspan="3">
                    <form class="d-inline-flex w-100" @submit.prevent="addTag">
                      <b-form-input
                        v-model.trim="form.tagName"
                        type="text"
                        placeholder="태그명 입력"
                        class="w-50"
                        @input="onTagState"
                      />
                      <b-button
                        type="submit"
                        variant="outline-secondary"
                        class="table-inner-btn ml-2"
                      >
                        추가
                      </b-button>
                    </form>
                    <template v-if="info.tags && info.tags.length > 0">
                      <div>
                        <b-badge v-for="(tag, tagIdx) in info.tags" :key="`tag-${tagIdx}`" pill class="b-form-tag d-inline-flex mt-2">
                          <span class="align-self-center">
                            {{ tag && tag.includes('#') ? tag : `#${tag}` }}
                          </span>
                          <b-button variant="transparent" class="p-0 align-self-center" @click="removeTag(tag, tagIdx)">
                            <b-icon variant="white" icon="x" font-scale="1.2" class="ml-1" />
                          </b-button>
                        </b-badge>
                      </div>
                    </template>
                    <!--                    <template v-if="duplicateTags.length > 0">-->
                    <template v-if="isDuplicateTag">
                      <p class="text-warning mt-2 fs-14">
                        중복된 태그입니다.
                      </p>
                    </template>
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
                          v-model="info.priceRental"
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
                          v-model="info.pointRental"
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
                          v-model="info.price"
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
                        v-model="info.notAvailable"
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
                        v-model="info.isCollect"
                        :options="keepYesNoOptions"
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
                      이미지 추가 ({{ info.widthImage ? '1' : '0' }}/1개)
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

                    <b-row v-if="info.widthImage" class="mt-3">
                      <b-col cols="6">
                        <div class="add-thumbnail-wrapper">
                          <img :src="info.widthImage" class="preview" alt="">
                        </div>
                      </b-col>
                    </b-row>
                  </td>

                  <th>포스터형 이미지*</th>
                  <td>
                    <span class="fs-14 text-muted">*작품 상세 페이지 상단에만 노출됩니다.</span>
                    <p class="mb-2">
                      이미지 추가 ({{ info.verticalImage ? '1' : '0' }}/1개)
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

                    <b-row v-if="info.verticalImage" class="mt-3">
                      <b-col cols="6">
                        <div class="add-thumbnail-wrapper">
                          <img :src="info.verticalImage" class="preview" alt="">
                        </div>
                      </b-col>
                    </b-row>
                  </td>
                </tr>

                <tr>
                  <th>목록형 이미지</th>
                  <td colspan="4">
                    <p class="mb-2">
                      이미지 추가 ({{ info.listImage && info.listImage.length }}개)
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

                    <b-row v-if="info.listImage && info.listImage.length > 0" class="mt-3">
                      <b-col
                        v-for="(url, idx) in info.listImage"
                        :key="`listImgUrl-${idx}`"
                        cols="2"
                        class="mb-3"
                      >
                        <div class="add-thumbnail-wrapper">
                          <img
                            v-if="url"
                            :src="url"
                            class="preview"
                            alt=""
                          >
                          <b-button variant="transparent" class="p-0 ml-3 d-flex img-delete-btn" @click="deleteListImg(idx)">
                            <b-icon variant="dark" icon="x" font-scale="1.2" />
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
                      v-model="info.topImage"
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
                        v-model="info.viewerMode"
                        :options="viewerModeOptions"
                      />
                      <span class="fs-14 text-muted">*페이지 넘김 모드 선택 시 스크롤 모드도 같이 지원됩니다.</span>
                    </div>
                  </td>
                </tr>
                <template v-if="info.viewerMode === 'P'">
                  <tr>
                    <th>기본 뷰어모드</th>
                    <td>
                      <b-form-radio-group
                        v-model="info.defaultViewerMode"
                        :options="viewerModeOptions.slice().reverse()"
                      />
                    </td>
                  </tr>
                  <tr>
                    <th>페이지 넘김 방식</th>
                    <td>
                      <b-form-radio-group
                        v-model="info.pageWay"
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
                      v-model="info.isReply"
                      :options="commentSetOptions"
                    />
                  </td>
                </tr>
                <tr>
                  <th>선물하기 설정*</th>
                  <td>
                    <b-form-radio-group
                      v-model="info.isGift"
                      :options="giftSetOptions"
                    />
                  </td>
                </tr>
                <tr>
                  <th>회차명 회/권 노출*</th>
                  <td>
                    <b-form-radio-group
                      v-model="info.isEpisodeName"
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
                        <span class="align-self-center ml-2">% 할인이 됩니다. </span>
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
                    <div v-for="(row, index) in form.packageRentList" :key="`rentRow-${index}`">
                      <span class="align-self-center ml-2">
                        {{ row.edition === '전체' ? row.edition : `${row.edition}화 이상` }} 대여 시 {{ row.discount }}% 할인 됩니다.
                      </span>
                      <b-button variant="transparent" class="p-0 ml-2" @click="removePackage('RENT', index)">
                        <b-icon variant="dark" icon="x" font-scale="1.2" />
                      </b-button>
                      <hr v-if="form.packageRentList.length !== index +1" class="my-2">
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
                        <span class="align-self-center ml-2">% 할인이 됩니다. </span>
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
                    <div v-for="(row, index) in form.packagePurchaseList" :key="`purchaseRow-${index}`">
                      <span class="align-self-center ml-2">
                        {{ row.edition === '전체' ? row.edition : `${row.edition}화 이상` }} 구매 시 {{ row.discount }}% 할인 됩니다.
                      </span>
                      <b-button variant="transparent" class="p-0 ml-2" @click="removePackage('PURCHASE', index)">
                        <b-icon variant="dark" icon="x" font-scale="1.2" />
                      </b-button>
                      <hr v-if="form.packagePurchaseList.length !== index +1" class="my-2">
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </b-col>
        </b-row>

        <!--        관련 작품 설정-->
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
                <tr v-for="(work, index) in form.relationshipList" :key="`relation-${index}`">
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
                        <b-badge v-for="(title, workIdx) in work.works" :key="`relation-title-${workIdx}`" pill class="b-form-tag d-inline-flex">
                          <span class="align-self-center">{{ title.title }}</span>
                          <b-button variant="transparent" class="p-0 align-self-center" @click="removeSelectedWork(index, title.id)">
                            <b-icon variant="white" icon="x" font-scale="1.2" class="ml-1" />
                          </b-button>
                        </b-badge>
                      </div>
                    </template>
                  </td>
                </tr>
                <tr>
                  <th>관련 작품 목록 추가</th>
                  <td colspan="3">
                    <b-button variant="outline-secondary" class="table-inner-btn" @click="addRelationWorkForm">
                      목록 추가
                    </b-button>
                  </td>
                </tr>
              </tbody>
            </table>
          </b-col>
        </b-row>

        <!-- 작품 서비스 상태 설정 -->
        <b-row class="pt-3" align-h="between">
          <b-col align-self="center">
            <h6>작품 서비스 상태 설정 (상태: {{ info.statusCode ? info.statusCode : '-' }})</h6>
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
                <template v-if="info.statusCode === '판매중지 중지'">
                  <!--                판매중지 취소-->
                  <tr>
                    <th>판매중지 취소</th>
                    <td colspan="3">
                      <div
                        class="d-flex justify-content-start align-items-center"
                      >
                        <b-form-radio-group
                          v-model="form.cancelStopSales.status"
                          :options="svcStatusOptions"
                          :disabled="form.stopSvc.status !== 1"
                        />
                        <div class="d-flex w-70 ml-2">
                          <div class="w-50 pr-2">
                            <label
                              for="cancel-stop-sales-date"
                              class="fs-14 mb-0"
                            >날짜*</label>
                            <b-form-datepicker
                              id="cancel-stop-sales-date"
                              v-model="form.cancelStopSales.date"
                              placeholder="선택"
                              class="mb-2"
                              hide-header
                              label-help=""
                              :date-format-options="{
                                year: 'numeric',
                                month: 'numeric',
                                day: 'numeric'
                              }"
                              :disabled="form.stopSvc.status !== 1"
                            />
                          </div>
                          <div class="w-25 pr-2">
                            <label
                              for="cancel-stop-sales-hours"
                              class="fs-14 mb-0"
                            >시간</label>
                            <b-form-select
                              id="cancel-stop-sales-hours"
                              v-model="form.cancelStopSales.hours"
                              :options="hoursOptions"
                              :disabled="form.stopSvc.status !== 1"
                            />
                          </div>
                          <div class="w-25 pr-2">
                            <label
                              for="cancel-stop-sales-minutes"
                              class="fs-14 mb-0"
                            >분</label>
                            <b-form-select
                              id="cancel-stop-sales-minutes"
                              v-model="form.cancelStopSales.minutes"
                              :options="minutesOptions"
                              :disabled="form.stopSvc.status !== 1"
                            />
                          </div>
                          <div class="w-25 pr-2">
                            <label
                              for="cancel-stop-sales-seconds"
                              class="fs-14 mb-0"
                            >초</label>
                            <b-form-select
                              id="cancel-stop-sales-seconds"
                              v-model="form.cancelStopSales.seconds"
                              :options="secondsOptions"
                              :disabled="form.stopSvc.status !== 1"
                            />
                          </div>
                        </div>
                      </div>
                      <div v-if="form.stopSvc.status !== 1" class="fs-14 text-muted">
                        *서비스 중지 설정 시 판매 중지 취소 설정은 할 수 없습니다.
                      </div>
                    </td>
                  </tr>
                  <!--                서비스 중지-->
                  <tr>
                    <th>서비스 중지</th>
                    <td colspan="3">
                      <div
                        class="d-flex justify-content-start align-items-center"
                      >
                        <b-form-radio-group
                          v-model="form.stopSvc.status"
                          :options="svcStatusOptions"
                          :disabled="form.cancelStopSales.status !== 1"
                        />
                        <div class="d-flex w-70 ml-2">
                          <div class="w-50 pr-2">
                            <label
                              for="stop-svc-date"
                              class="fs-14 mb-0"
                            >날짜*</label>
                            <b-form-datepicker
                              id="stop-svc-date"
                              v-model="form.stopSvc.date"
                              placeholder="선택"
                              class="mb-2"
                              hide-header
                              label-help=""
                              :date-format-options="{
                                year: 'numeric',
                                month: 'numeric',
                                day: 'numeric'
                              }"
                              :disabled="form.cancelStopSales.status !== 1"
                            />
                          </div>
                          <div class="w-25 pr-2">
                            <label
                              for="stop-svc-hours"
                              class="fs-14 mb-0"
                            >시간</label>
                            <b-form-select
                              id="stop-svc-hours"
                              v-model="form.stopSvc.hours"
                              :options="hoursOptions"
                              :disabled="form.cancelStopSales.status !== 1"
                            />
                          </div>
                          <div class="w-25 pr-2">
                            <label
                              for="stop-svc-minutes"
                              class="fs-14 mb-0"
                            >분</label>
                            <b-form-select
                              id="stop-svc-minutes"
                              v-model="form.stopSvc.minutes"
                              :options="minutesOptions"
                              :disabled="form.cancelStopSales.status !== 1"
                            />
                          </div>
                          <div class="w-25 pr-2">
                            <label
                              for="stop-svc-seconds"
                              class="fs-14 mb-0"
                            >초</label>
                            <b-form-select
                              id="stop-svc-seconds"
                              v-model="form.stopSvc.seconds"
                              :options="secondsOptions"
                              :disabled="form.cancelStopSales.status !== 1"
                            />
                          </div>
                        </div>
                      </div>
                      <div v-if="form.cancelStopSales.status !== 1" class="fs-14 text-muted">
                        *판매 중지 취소 설정 시 서비스 중지 설정은 할 수 없습니다.
                      </div>
                    </td>
                  </tr>
                </template>
                <template v-else>
                  <tr>
                    <th>판매중지</th>
                    <td colspan="3">
                      <div
                        class="d-flex justify-content-start align-items-center"
                      >
                        <b-form-radio-group
                          v-model="form.stopSales.status"
                          :options="svcStatusOptions"
                        />
                        <div class="d-flex w-70 ml-2">
                          <div class="w-50 pr-2">
                            <label
                              for="stop-sales-date"
                              class="fs-14 mb-0"
                            >날짜*</label>
                            <b-form-datepicker
                              id="stop-sales-date"
                              v-model="form.stopSales.date"
                              placeholder="선택"
                              class="mb-2"
                              hide-header
                              label-help=""
                              :date-format-options="{
                                year: 'numeric',
                                month: 'numeric',
                                day: 'numeric'
                              }"
                            />
                          </div>
                          <div class="w-25 pr-2">
                            <label
                              for="stop-sales-hours"
                              class="fs-14 mb-0"
                            >시간</label>
                            <b-form-select
                              id="stop-sales-hours"
                              v-model="form.stopSales.hours"
                              :options="hoursOptions"
                            />
                          </div>
                          <div class="w-25 pr-2">
                            <label
                              for="stop-sales-minutes"
                              class="fs-14 mb-0"
                            >분</label>
                            <b-form-select
                              id="stop-sales-minutes"
                              v-model="form.stopSales.minutes"
                              :options="minutesOptions"
                            />
                          </div>
                          <div class="w-25 pr-2">
                            <label
                              for="stop-sales-seconds"
                              class="fs-14 mb-0"
                            >초</label>
                            <b-form-select
                              id="stop-sales-seconds"
                              v-model="form.stopSales.seconds"
                              :options="secondsOptions"
                            />
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                </template>
              </tbody>
            </table>
          </b-col>
        </b-row>
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
import { timeOptions } from '@/plugins/mixins'

export default {
  name: 'ContentPieceEditPage',
  mixins: [timeOptions],
  data () {
    return {
      // 작품 상세 정보
      info: {},
      workTitle: '',

      // 기본 정보
      // 장르 옵션
      genreOptions: ['드라마', '로맨스', '액션/스포츠', '호러/미스테리', 'BL/GL', '판타지'],
      // 연령등급 옵션
      ageGradedOptions: [
        { text: '전체 이용가', value: '0' },
        { text: '성인', value: '19' }
      ],
      // 작가 등록 모달
      writerModalType: '',
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
      nationalOptions: ['국내', '해외'],

      // 연재 정보
      // 연재 여부 옵션
      serialTypeOptions: ['연재', '완결'],
      // 연재일 옵션
      serialDayOptions: ['월', '화', '수', '목', '금', '토', '일'],
      // 연재일 '매일' 체크박스
      indeterminate: false,
      // 연재 주기 옵션
      serialWeekOptions: ['열흘', '비정기'],

      // 작품 소개
      currentTags: [], // tagId가 담겨 있는 작품의 현재 태그
      tagsForDelete: [], // 수정시 보낼 기존 태그에서 삭제할 태그
      isDuplicateTag: false, // 태그 중복 체크

      // 가격 정보
      // 무료회차 소장구매 설정 옵션
      keepYesNoOptions: ['소장가능', '소장불가'],

      // 이미지 설정
      // 작품 상세페이지 상단 이미지 설정
      imageOptions: ['책표지 이미지', '포스터형 이미지'],

      // 뷰어 설정
      // 뷰어모드
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
      // 댓글 설정 옵션
      commentSetOptions: [
        { text: '설정', value: true },
        { text: '미설정', value: false }
      ],
      // 선물하기 설정 옵션
      giftSetOptions: [
        { text: '설정', value: true },
        { text: '미설정', value: false }
      ],
      // 회차명 회/권 노출 설정*
      serialInfoOpenOptions: [
        { text: '설정', value: true },
        { text: '미설정', value: false }
      ],

      // 수정 폼
      form: {
        // 기본 정보
        title: '', // 새로운 작품 제목
        checkSame: false, // 작가 동일
        cpName: '', // CP사 명 (아직안씀)
        publisherName: '', // 출판사 명 (아직안씀)

        // 연재 정보
        isEveryday: false, // 매일 체크박스

        // 작품 소개
        tagName: '', // 새 태그명
        newTags: [], // 수정 시 보낼 새 태그

        // 가격 정보
        checkNoPotionForRent: false, // 대여 물약 없음
        checkNoPumpkinForRent: false, // 대여 호박 없음
        checkNoPotionForPurchase: false, // 구매 물약 없음
        newPriceRental: '', // 수정 할 대여 물약
        newPointRental: '', // 수정 할 호박 물약
        newPrice: '', // 구매 할 대여 물약

        // 패키지 대여 설정
        setPackageRent: false, // 패키지 대여 전체
        packageRentEdition: '', // 패키지 대여 화수
        packageRentDiscount: '', // 패키지 대여 할인
        setPackagePurchase: false, // 패키지 구매 전체
        packagePurchaseEdition: '', // 패키지 구매 화수
        packagePurchaseDiscount: '', // 패키지 구매 할인

        packageRentList: [], // 패키지 대여 내역
        packagePurchaseList: [], // 패키지 구매 내역

        // 관련 작품 설정
        relationshipList: [{ // 관력 작품 [목록,설명]
          description: '',
          works: []
        }],

        // 작품 서비스 상태 설정
        status: 1,

        stopSales: {
          status: 1,
          date: '',
          hours: '00',
          minutes: '00',
          seconds: '00'
        },
        cancelStopSales: {
          status: 1,
          date: '',
          hours: '00',
          minutes: '00',
          seconds: '00'
        },
        stopSvc: {
          status: 1,
          date: '',
          hours: '00',
          minutes: '00',
          seconds: '00'
        }
      },

      hoursOptions: [],
      minutesOptions: [],
      secondsOptions: [],

      svcStatusOptions: [
        { text: '사용안함', value: 1 },
        { text: '즉시', value: 2 },
        { text: '예약', value: 3 }
      ]
    }
  },
  async fetch () {
    await this.getInfo()
  },
  computed: {
    workType () {
      if (this.info.menucode === '1') {
        return '웹툰/만화'
      } else if (this.info.menucode === '2') {
        return '소설'
      }
      return '-'
    },
    breadcrumb () {
      const arr = [
        { label: '홈', url: '/' },
        { label: '콘텐츠 관리', url: '#' },
        { label: '작품 관리', url: '/content/piece' },
        {
          label: '회차 목록',
          url: `/content/piece/${this.$route.params.id}/edition`
        },
        { label: '작품 수정', url: this.$route.path }
      ]
      return arr
    }
  },
  watch: {
    'form.checkNoPotionForRent' (val) {
      if (val) { this.info.priceRental = '0' } else { this.info.priceRental = '' }
    },
    'form.checkNoPumpkinForRent' (val) {
      if (val) { this.info.pointRental = '0' } else { this.info.pointRental = '' }
    },
    'form.checkNoPotionForPurchase' (val) {
      if (val) { this.info.price = '0' } else { this.info.price = '' }
    },
    'info.writer' (val) {
      if (val && val.length > 0 && this.$refs['search-writer-btn'].classList.contains('active')) {
        this.$refs['search-writer-btn'].classList.remove('active')
      }
    },
    'info.illustrator' (val) {
      if (val && val.length > 0 && this.$refs['search-illustrator-btn'].classList.contains('active')) {
        this.$refs['search-illustrator-btn'].classList.remove('active')
      }
    },
    'info.widthImage' (val) {
      if (val && this.$refs['cover-img-file'].classList.contains('active')) {
        this.$refs['cover-img-file'].classList.remove('active')
      }
    },
    'info.verticalImage' (val) {
      if (val && this.$refs['poster-img-file'].classList.contains('active')) {
        this.$refs['poster-img-file'].classList.remove('active')
      }
    },
    'info.serial_date' (newValue, oldValue) {
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
      if (val && this.info.writer && this.info.writer.length > 0) {
        this.info.illustrator = [...this.info.writer]
      } else if (!val) {
        this.info.illustrator = []
      }
    }
  },
  created () {},
  mounted () {
    this.hoursOptions = this.getHours()
    this.minutesOptions = this.getMinutes()
    this.secondsOptions = this.getSeconds()
  },
  methods: {
    /** 글, 그림, 원작가 request data 변형 */
    parseWriterArr () {
      const requestWriterData = {
        writer: this.info.writer && this.info.writer.length > 0 ? this.info.writer.map(writer => writer.id) : [],
        illustrator: this.info.illustrator && this.info.illustrator.length > 0 ? this.info.illustrator.map(writer => writer.id) : [],
        originArtist: this.info.originalArtist && this.info.originalArtist.length > 0 ? this.info.originalArtist.map(writer => writer.id) : []
      }
      return requestWriterData
    },
    /** 작품 수정 */
    async editWork () {
      if (this.checkValidation()) {
        const writerIds = this.parseWriterArr()

        try {
          const res = await this.$axios.put(`/api/cartoon/contents/updateMain/${this.$route.params.id}`, {
            // 기본 정보
            menucode: this.info.menucode, // 구분
            genrecode: this.info.genrecode, // 장르
            rate: this.info.rate, // 연령 등급
            title: this.info.title, // 작품명
            is_book: this.info.isBook, // 단행본
            isbn: this.info.isbn, // ISBN
            writer: writerIds.writer, // 글작가
            illustrator: writerIds.illustrator, // 그림작가
            original_artist: writerIds.originArtist, // 원작가
            cp_info_id: this.info.cpInfo.id, // cp사
            publisher_info_id: this.info.publisherInfo.id, // 출판사
            in_charge: this.info.inCharge, // 담당부서
            country: this.info.country, // 국가

            // 연재 정보
            is_end: this.info.isEnd, // 연재 여부
            is_stop: this.info.isStop, // 휴재 여부
            serial_date: this.info.serial_date.toString(), // 연재일
            serial_cycle: this.info.serial_cycle.toString(), // 연재주기
            is_biweekly: this.info.isBiweekly, // 격주 연재
            is_show: this.info.isShow, // 연재탭 노출 여부

            // serial_ment: this.form.serialMark, // 연재표기 문구 check

            // 작품 소개
            info: this.info.info, // 소개글
            addTags: this.form.newTags.toString(), // 새로운 태그
            deleteTagIds: this.tagsForDelete, // 삭제 할 태그

            // 가격 정보
            price_rental: this.info.priceRental, // 대여 물약 개수
            point_rental: this.info.pointRental, // 대여 물약 개수
            price: this.info.price, // 구매 물약 개수
            not_available: this.info.notAvailable, // 호박 대여 제외 최신화 조정
            is_collect: this.info.isCollect, // 무료회차 소장구매 설정

            // 이미지 설정
            width_image: this.info.widthImage, // 책표지형 이미지
            vertical_image: this.info.verticalImage, // 포스터형 이미지
            listImage: this.info.listImage.toString(), // 목록형 이미지
            top_image: this.info.topImage, // 작품 상세페이지 상단 이미지 설정

            // 뷰어 설정
            viewer_mode: this.info.viewerMode, // 뷰어 설정
            default_viewer_mode: this.info.defaultViewerMode, // 기본 뷰어 설정
            page_way: this.info.pageWay, // 페이지 넘김 방식

            // 부가 설정
            is_reply: this.info.isReply, // 댓글 설정
            is_gift: this.info.isGift, // 선물하기 설정
            is_episode_name: this.info.isEpisodeName // 회차명 회/권 노출
            // 패키지 설정

            // 관련 작품 설정
          })
          console.log(res)
          if (res.status === 200) {
            alert('작품 수정이 완료 되었습니다.')
            this.$router.push('/content/piece')
          }
        } catch (e) {
          console.log(e)
        }
      }
    },
    /** 작품 수정 유효성 검사 */
    checkValidation () {
      if (!this.info.title.length) {
        this.$refs['title-input'].focus()
        alert('작품명을 입력해 주세요.')
        return false
      } else if (!this.info.writer || (this.info.writer && !this.info.writer.length)) {
        this.$refs['search-writer-btn'].classList.add('active')
        alert('글작가를 선택해 주세요.')
        return false
      } else if (!this.info.illustrator || (this.info.illustrator && !this.info.illustrator.length)) {
        this.$refs['search-illustrator-btn'].classList.add('active')
        alert('그림작가를 선택해 주세요.')
        return false
      } else if (this.info.cpInfo && !this.info.cpInfo.id) {
        this.$refs['search-cp-btn'].classList.add('active')
        alert('CP사를 선택해 주세요.')
        return false
      } else if (!this.info.info) {
        alert('소개글을 입력해 주세요.')
        this.$refs['description-area'].focus()
        return false
      } else if (!this.info.priceRental.length) {
        alert('대여 물약 개수를 입력해 주세요.')
        this.$refs['rent-price-input'].focus()
        return false
      } else if (!this.info.pointRental.length) {
        alert('대여 호박 개수를 입력해 주세요.')
        this.$refs['rent-point-input'].focus()
        return false
      } else if (!this.info.price.length) {
        alert('구매 물약 개수를 입력해 주세요.')
        this.$refs['purchase-price-input'].focus()
        return false
      } else if (!this.info.widthImage) {
        alert('책표지형 이미지를 설정해 주세요.')
        this.$refs['cover-img-file'].classList.add('active')
        return false
      } else if (!this.info.verticalImage) {
        alert('포스터형 이미지를 설정해 주세요.')
        this.$refs['poster-img-file'].classList.add('active')
        return false
      } return true
    },
    /** 패키지 대여, 구매 설정 등록
     * @param type RENT or PURCHASE */
    setPackage (type) {
      const obj = {}
      if (type === 'RENT') {
        obj.edition = this.form.setPackageRent ? '전체' : this.form.packageRentEdition
        obj.discount = this.form.packageRentDiscount
        this.form.packageRentList.push(obj)
        this.form.setPackageRent = false
        this.form.packageRentEdition = ''
        this.form.packageRentDiscount = ''
      } else if (type === 'PURCHASE') {
        obj.edition = this.form.setPackagePurchase ? '전체' : this.form.packagePurchaseEdition
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
        this.form.packageRentList = this.form.packageRentList.filter((row, idx) => idx !== index)
      } else if (type === 'PURCHASE') {
        this.form.packagePurchaseList = this.form.packagePurchaseList.filter((row, idx) => idx !== index)
      }
    },
    /** 책표지형, 포스터형 이미지 업로드 */
    async uploadSingleImg (e, type) {
      const form = new FormData()

      if (e.target.files.length > 0) {
        form.append('file', e.target.files[0])
        // 파일 태우기
        const { status, data } = await this.$axios.post('/api/file/upload', form, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        if (status === 200) {
          if (type === 'COVER') {
            this.info.widthImage = data
          } else {
            this.info.verticalImage = data
          }
        }
      }
    },
    /** 목록형 이미지 업로드 */
    async uploadListImg (e) {
      if (e.target.files.length > 5 || (e.target.files.length + this.info.listImage.length > 5)) {
        alert('목록형 이미지는 5개 까지 등록 가능합니다.')
        return
      }

      for (let i = 0; i < e.target.files.length; i++) {
        const file = e.target.files[i]

        const form = new FormData()
        form.append('file', file)

        const { status, data } = await this.$axios.post('/api/file/upload', form, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        })
        if (status === 200) {
          this.info.listImage.push(data)
        }
      }
    },
    /** 목록형 이미지 삭제 */
    deleteListImg (index) {
      this.info.listImage.splice(index, 1)
    },
    /** 작품 소개 태그 중복 체크 */
    onTagState (tag) {
      if (this.info.tags.includes(`#${tag}`) || this.form.newTags.includes(`#${tag}`)) {
        this.isDuplicateTag = true
      } else {
        this.isDuplicateTag = false
      }
    },
    /** 태그 추가 */
    addTag () {
      if (!this.isDuplicateTag && this.form.tagName) {
        this.info.tags.push(this.form.tagName)
        this.form.newTags.push(`#${this.form.tagName}`)
        this.form.tagName = ''
      }
    },
    /** 태그 삭제 */
    removeTag (tag, idx) {
      this.currentTags.forEach((cur, curIdx) => {
        if (cur.name === tag) {
          this.tagsForDelete.push(cur.id)
        }
      })

      this.form.newTags = this.form.newTags.filter(n => n !== `#${tag}`)
      this.info.tags = this.info.tags.filter(cur => cur !== tag)
    },
    /** 태그 request data 변형 */
    parseTags () {
      if (this.info.tags.length > 0) {
        const addHashTags = this.info.tags.map(tag => (tag.includes('#') ? tag : `#${tag}`))
        return addHashTags
      }
    },
    /** 연재일 '매일' 체크 */
    toggleAll (checked) {
      this.info.serial_date = checked ? this.serialDayOptions.slice() : []
    },
    /** 찾기 모달 열기 */
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
    /** 작품 상세 정보 불러오기 */
    async getInfo () {
      try {
        const {
          status,
          data: { data }
        } = await this.$axios.get(
          `/api/cartoon/contents/detail/main/${this.$route.params.id}`
        )

        if (status === 200) {
          console.log(data, '::::::::')
          this.info = data
          this.currentTags = data.tags

          // 상단 타이틀
          this.workTitle = data.title

          // 연재일이 일주일이 다 체크된 경우 '매일' 체크
          if (this.info.serial_date.length === this.serialDayOptions.length) {
            this.form.isEveryday = true
          }

          // 태그
          if (this.info.tags.length > 0) {
            this.info.tags = this.info.tags.map(tag => tag.name)
          }
        }
      } catch (e) {
        console.log(e)
      }
    },
    /** 단행본 체크 시 */
    toggleSingleEdition (checked) {
      if (checked) {
        this.info.title = `[단행본] ${this.info.title}`
      } else {
        this.info.title = this.info.title.replace('[단행본] ', '')
      }
    },
    /** 작가 선택 */
    selectWriter ({ type, list }) {
      if (type === 'WRITER') {
        this.info.writer = list
      } else if (type === 'ILLUSTRATOR') {
        this.info.illustrator = list
      } else {
        this.info.originalArtist = list
      }
    },
    /** 작가 삭제 */
    removeWriter (type, id) {
      if (type === 'WRITER') {
        this.info.writer = this.info.writer.filter(writer => writer.id !== id)
      } else if (type === 'ILLUSTRATOR') {
        this.info.illustrator = this.info.illustrator.filter(
          illustrator => illustrator.id !== id
        )
      } else {
        this.info.originalArtist = this.info.originalArtist.filter(
          original => original.id !== id
        )
      }
    },
    /** 출판사 삭제 */
    removePublisher () {
      this.info.publisherInfo = {}
    },
    /** 출판사 선택 */
    selectPublisher (data) {
      this.info.publisherInfo = data
    },
    /** CP사 삭제 */
    removeCp () {
      this.info.cpInfo = {}
    },
    /** CP사 선택 */
    selectCp (data) {
      this.info.cpInfo = data
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
    }
  }
}
</script>
