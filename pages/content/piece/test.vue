<template>
  <div class="user_wrap">
    <div v-for="(mainList, idx) in mainList" :key="idx">
      <h2>{{ mainList.title }}</h2>
    </div>

    <form @submit.prevent="save">
      <b-row>
        <b-col>
          <div>
            <b-form-input v-model="form.title" />
            <b-form-input v-model="form.groupCode" />
            <b-form-input v-model="form.startDate" />
            <b-form-input v-model="form.endDate" />
          </div>
          <b-button @click="registButton">
            등록
          </b-button>
          <b-button @click="updateButton">
            수정
          </b-button>
        </b-col>
      </b-row>
    </form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      mainList: null,
      totalPage: null,
      pageNum: 1,
      pageSize: 10
    }
  },
  created () {
    this.fetchData(this.pageNum, this.pageSize)
  },
  methods: {
    fetchData (pageNum, pageSize) {
      this.$axios
        .get(
          `/api/cartoon/contents/mainList?pageNum=${pageNum}&pageSize=${pageSize}`
        )
        // http://192.168.0.31:18080
        .then((res) => {
          console.log(res)
          this.mainList = res.data.data.list
          this.totalPage = res.data.total
        })
        .catch((err) => {
          console.log(err)
        })
    },
    movePage (pageNum, pageSize) {
      this.fetchData(pageNum, pageSize)
    },
    // //등록
    registButton (data) {
      this.$axios.post('/api/manager/product/registProduct', data).then()
    },
    // 수정
    updateButton (id, data) {
      this.$axios.put(`/api/manager/product/updateProduct/${id}`, data)
    }
  }
}
</script>
