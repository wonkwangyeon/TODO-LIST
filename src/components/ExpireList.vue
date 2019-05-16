<template>
  <div>
    <b-table :items="list" :fields="fields" striped>
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
        <b-card class="list-body ">
          <b-form>
            <div class="label-left">

              <h6>작성일 : {{ row.item.LIST_CREATED_TIME | moment("YYYY-MM-DD" )}}</h6>

              <b-form-group id="input-group-1" label="Todo 제목:" label-for="input-1">
                <b-form-input id="input-1" v-model="row.item.LIST_TITLE" required placeholder="Enter Title"></b-form-input>
              </b-form-group>
              <b-form-group id="input-group-2" label="Todo 마감기한(선택사항):" label-for="input-2">
                <b-form-input id="input-2" v-model="row.item.LIST_EXPIRE" type="date"></b-form-input>
              </b-form-group>
              <b-form-group id="input-group-3" label="Todo 메모:" label-for="input-3">
                <b-form-textarea id="textarea" v-model="row.item.LIST_CONTENT" placeholder="Enter memo..." rows="3" max-rows="6"></b-form-textarea>
              </b-form-group>
            </div>
          </b-form>
          <b-button size="sm" @click="todoModify(row)">수정</b-button>
          <b-button size="sm" @click="todoDelete(row)">삭제</b-button>
          <b-button size="sm" @click="todoComplete(row)">완료처리</b-button>

        </b-card>
      </template>
    </b-table>
  </div>
</template>

<script type="text/javascript">
import moment from "moment";

export default {
  name: "expire-list",
  data() {
    return {
      fields: [
        { key: "LIST_TITLE", label: "Todo 제목" },
        { key: "LIST_EXPIRE", label: "마감기한" },
        "상세보기"
      ],
      list: []
    };
  },
  methods: {
    async todoDelete(row) {
      // evt.preventDefault();
      try {
        const { data, status } = await this.$axios.delete(
          "http://localhost:3000/api/todo",
          { params: { list_id: row.item.list_id } }
        );
        this.list.splice(row.index, 1);
      } catch (e) {
        console.error(e);
      }
    },
    async todoModify(row) {
      try {
        const { data, status } = await this.$axios.put(
          "http://localhost:3000/api/todo",
          {
            LIST_ID: row.item.LIST_ID,
            LIST_TITLE: row.item.LIST_TITLE,
            LIST_CONTENT: row.item.LIST_CONTENT,
            LIST_EXPIRE: row.item.LIST_EXPIRE
          }
        );

        if (
          row.item.LIST_EXPIRE === "" ||
          row.item.LIST_EXPIRE >= moment(new Date()).format("YYYY-MM-DD")
        ) {
          this.list.splice(row.index, 1);
          this.$store.commit("addMainList", row.item);
        }
      } catch (e) {
        console.error(e);
      }
    },
    async todoComplete(row) {
      // evt.preventDefault();
      try {
        const { data, status } = await this.$axios.put(
          "http://localhost:3000/api/todo/complete",
          { list_id: row.item.LIST_ID }
        );
        this.list.splice(row.index, 1);
        // row.item.LIST_TITLE = row.item["Todo 제목"];
        // row.item.LIST_EXPIRE = row.item["마감기한"];
        this.$store.commit("addCompleteList", row.item);
      } catch (e) {
        console.error(e);
      }
    }
  },
  async mounted() {
    try {
      const { data, status } = await this.$axios.get(
        "http://localhost:3000/api/todo/expire"
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
        this.list.push({
          LIST_ID: element.LIST_ID,
          LIST_TITLE: element.LIST_TITLE,
          LIST_CONTENT: element.LIST_CONTENT,
          LIST_EXPIRE: element.LIST_EXPIRE,
          LIST_CREATED_TIME: moment(element.LIST_CREATED_TIME).format(
            "YYYY-MM-DD hh:mm:ss"
          ),
          LIST_PRIORITY: element.LIST_PRIORITY
        });
      });
    } catch (e) {
      console.error(e);
    }
  }
};
</script>

<style>
.list-body {
  max-width: 400px;
  margin: auto;
}
</style>