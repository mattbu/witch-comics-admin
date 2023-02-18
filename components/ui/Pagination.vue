<template>
  <b-row>
    <b-col>
      <b-pagination
        v-model="currentPage"
        :per-page="perPage"
        :total-rows="totalRows"
        :aria-controls="ariaControls"
        :limit="limit ? limit : 10"
        class="witch-pagination"
        align="center"
        hide-ellipsis
        @page-click="onClickPage"
      >
        <template #first-text>
          <b-button pill class="page-btn page-prev">
            <b-icon icon="chevron-double-left" :scale="iconScale" />
          </b-button>
        </template>
        <template #prev-text>
          <b-button pill class="page-btn page-prev">
            <b-icon icon="chevron-left" :scale="iconScale" />
          </b-button>
        </template>
        <template #page="{ page, active }">
          <b v-if="active">{{ page }}</b>
          <span v-else>{{ page }}</span>
        </template>
        <template #next-text>
          <b-button pill class="page-btn page-next">
            <b-icon icon="chevron-right" :scale="iconScale" />
          </b-button>
        </template>
        <template #last-text>
          <b-button pill class="page-btn page-next">
            <b-icon icon="chevron-double-right" :scale="iconScale" />
          </b-button>
        </template>
      </b-pagination>
    </b-col>
  </b-row>
</template>

<script>
export default {
  name: 'UiPagination',
  props: {
    perPage: {
      type: Number,
      required: false,
      default: 10
    },
    totalRows: {
      type: Number,
      required: true
    },
    ariaControls: {
      type: String,
      required: false,
      default: ''
    },
    page: {
      type: Number,
      required: false,
      default: 1
    },
    limit: {
      type: Number,
      required: false
    },
    stayLastPage: {
      type: Boolean,
      required: false
    }
  },
  data () {
    return {
      currentPage: 1,
      iconScale: '0.8',
      wasLastPage: false
    }
  },
  computed: {
    lastPage () {
      return Math.ceil(this.totalRows / this.perPage)
    }
  },
  watch: {
    page (val) {
      this.currentPage = val
    },
    currentPage (val) {
      if (this.wasLastPage && this.currentPage === 1) {
        this.currentPage = this.lastPage
      }
      this.$emit('change-page', this.currentPage)
    }
  },
  mounted () {
    if (this.page && this.page !== 1) {
      this.currentPage = this.page
    }
  },
  methods: {
    resetCurrentPage () {
      this.wasLastPage = null
      this.currentPage = 1
    },
    onClickPage (event, page) {
      this.wasLastPage =
        event.important || (this.stayLastPage && this.lastPage === page)
    }
  }
}
</script>
<style>
.witch-pagination .page-item .page-link:after{ width: auto }
</style>
