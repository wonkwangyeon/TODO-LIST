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
        <b-card>
          <b-row class="mb-2">
            <b-col sm="3" class="text-sm-right"><b>Memo:</b></b-col>
            <b-col>{{ row.item.content }}</b-col>
          </b-row>
          <b-row class="mb-2">
            <b-col sm="3" class="text-sm-right"><b>작성일:</b></b-col>
            <b-col>{{ row.item.created_time }}</b-col>
          </b-row>

          <b-button size="sm" @click="todoDelete(row.item.list_id)">수정</b-button>
          <b-button size="sm" @click="todoDelete(row)">삭제</b-button>
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
      fields: ["Todo 제목", "마감기한", "상세보기"],
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
    }
  },
  async mounted() {
    try {
      const { data, status } = await this.$axios.get(
        "http://localhost:3000/api/todo/complete"
      );
      data.forEach(element => {
        if (
          moment(element.LIST_EXPIRE).format("YYYY년 MM월 DD일") ===
          "Invalid date"
        ) {
          this.list.push({
            list_id: element.LIST_ID,
            "Todo 제목": element.LIST_TITLE,
            content: element.LIST_CONTENT,
            마감기한: "없음",
            created_time: moment(element.LIST_CREATED_TIME).format(
              "YYYY년 MM월 DD일 hh:mm:ss"
            ),
            priority: element.LIST_PRIORITY
          });
        } else {
          this.list.push({
            list_id: element.LIST_ID,
            "Todo 제목": element.LIST_TITLE,
            content: element.LIST_CONTENT,
            마감기한: moment(element.LIST_EXPIRE).format("YYYY년 MM월 DD일"),
            created_time: moment(element.LIST_CREATED_TIME).format(
              "YYYY년 MM월 DD일 hh:mm:ss"
            ),
            priority: element.LIST_PRIORITY
          });
        }
      });
    } catch (e) {
      console.error(e);
    }
  }
};
</script>