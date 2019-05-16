<template>
  <div>

    <b-table :items="getCompleteList" :fields="fields" striped>
      <template slot="상세보기" slot-scope="row">
        <b-button size="sm" @click="row.toggleDetails" class="mr-2">
          {{ row.detailsShowing ? 'Hide' : 'Show'}} Details
        </b-button>

        <!-- As `row.showDetails` is one-way, we call the toggleDetails function on @change -->
        <b-form-checkbox v-model="row.detailsShowing" @change="row.toggleDetails">
          유지하기
        </b-form-checkbox>
      </template>

      <template slot="row-details" slot-scope="row">
        <b-card class="list-body">
          <b-row class="mb-2">
            <b-col sm="3" class="text-sm-right"><b>Memo:</b></b-col>
            <b-col>{{ row.item.LIST_CONTENT }}</b-col>
          </b-row>
          <b-row class="mb-2">
            <b-col sm="3" class="text-sm-right"><b>작성일:</b></b-col>
            <b-col>{{ row.item.LIST_CREATED_TIME }}</b-col>
          </b-row>
          <b-button size="sm" class="list-btn" @click="todoDelete(row)">삭제</b-button>
          <b-button size="sm" class="list-btn" @click="todoComplete(row)">완료취소</b-button>
        </b-card>
      </template>
    </b-table>
  </div>
</template>

<script type="text/javascript">
import moment from "moment";
export default {
  name: "complete-list",
  data() {
    return {
      fields: [
        { key: "LIST_TITLE", label: "Todo 제목" },
        { key: "LIST_EXPIRE", label: "마감기한" },
        "상세보기"
      ]
    };
  },
  computed: {
    getCompleteList() {
      return this.$store.getters.getCompleteList;
    }
  },
  methods: {
      async todoComplete(row) {
      // evt.preventDefault();
      try {
        const { data, status } = await this.$axios.put(
          "http://localhost:3000/api/todo/complete",
          { LIST_ID: row.item.LIST_ID, LIST_COMPLETE: 0 }
        );
        //this.list.splice(row.index, 1);
        this.$store.commit("deleteCompleteList", row.index);
        this.$store.commit("addMainList", row.item);
      } catch (e) {
        console.error(e);
      }
    },
    async todoDelete(row) {
      // evt.preventDefault();
      try {
        const { data, status } = await this.$axios.delete(
          "http://localhost:3000/api/todo",
          { params: { LIST_ID: row.item.LIST_ID } }
        );

        this.$store.commit("deleteCompleteList", row.index);
      } catch (e) {
        console.error(e);
      }
    }
  },
  async mounted() {
    try {
      const { data, status } = await this.$axios.get(
        "http://localhost:3000/api/todo/complete"
      );
      data.forEach(element => {
        if (
          moment(element.LIST_EXPIRE).format("YYYY-MM-DD") === "Invalid date"
        ) {
          element.LIST_EXPIRE = "";
        } else {
          element.LIST_EXPIRE = moment(element.LIST_EXPIRE).format(
            "YYYY-MM-DD"
          );
        }
        (element.LIST_CREATED_TIME = moment(element.LIST_CREATED_TIME).format(
          "YYYY-MM-DD hh:mm:ss"
        )),
          this.$store.commit("addCompleteList", element);
      });
    } catch (e) {
      console.error(e);
    }
  }
};
</script>
<style>
.list-btn {
  margin: 0 10px;
}
.list-body {
  max-width: 400px;
  margin: auto;
}
</style>