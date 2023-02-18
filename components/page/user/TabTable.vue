<template>
  <div>
    <b-table
      class="list"
      :items="items"
      :fields="fields"
      :current-page="currentPage"
      :per-page="perPage"
      :busy="busy"
      stacked="md"
      show-empty
      small
    >
      <template #cell(no)="data">
        {{
          totalRows - (currentPage - 1) *perPage - (data.index + 1) + 1
        }}
      </template>
      <template #empty>
        <PageNoResult />
      </template>
      <template #table-busy>
        <div class="text-center text-danger my-4">
          <b-spinner variant="primary" class="align-middle" />
          <span class="ml-3">데이터를 불러오고 있습니다.</span>
        </div>
      </template>
      <template #cell(comment)="data">
        <a @click="openModal(data.item)">
          {{ data.item.comment }}
        </a>
      </template>
      <template #cell(events)="data">
        <b-button
          v-if="data.item.chargeType === '지급' || data.item.chargeType === '충전'"
          variant="primary"
          size="sm"
          @click="openModal(data.item)"
        >
          {{ data.item.chargeType === '지급'?'회수':'환불' }}
        </b-button>
      </template>
    </b-table>
  </div>
</template>

<script>
export default {
  name: 'TabTable',
  props: {
    items: {
      type: Array,
      required: true
    },
    fields: {
      type: Array,
      required: true
    },
    busy: {
      type: Boolean
    },
    currentPage: {
      type: Number,
      default: 1
    },
    perPage: {
      type: Number,
      default: 10
    },
    totalRows: {
      type: Number,
      default: 10
    }
  },
  methods: {
    openModal (val) {
      console.log('모달', val)
      this.$emit('on-popup', val)
    }
  }
}
</script>
