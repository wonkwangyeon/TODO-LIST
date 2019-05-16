<template>
  <div>
    <b-table :items="getMainList" :fields="fields" striped>
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
          <!-- <b-row class="mb-2">
            <b-col sm="3" class="text-sm-right"><b>Memo:</b></b-col>
            <b-col>{{ row.item.LIST_CONTENT }}</b-col>
          </b-row>
          <b-row class="mb-2">
            <b-col sm="3" class="text-sm-right"><b>작성일:</b></b-col>
            <b-col>{{ row.item.LIST_CREATED_TIME}}</b-col>
          </b-row> -->
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
          <b-button size="sm" class="list-btn" @click="todoModify(row)">수정</b-button>
          <b-button size="sm" class="list-btn" @click="todoDelete(row)">삭제</b-button>
          <b-button size="sm" class="list-btn" @click="todoComplete(row)">완료처리</b-button>

        </b-card>
      </template>
    </b-table>
    <b-button pill variant="info" @click="visibleAbled()" v-show="btnVisible" class="btn-visible-size">+</b-button>
    <b-button pill variant="info" @click="visibleDisabled()" v-show="visible" class="btn-visible-size">―</b-button>
    <div v-show="visible">
      <AddList v-on:addList="addList"></AddList>
    </div>
  </div>
</template>

<script type="text/javascript">
import moment from "moment";
import AddList from "./AddList.vue";

export default {
  name: "main-list",
  components: { AddList },
  data() {
    return {
      fields: [
        { key: "LIST_TITLE", label: "Todo 제목" },
        { key: "LIST_EXPIRE", label: "마감기한" },
        "상세보기"
      ],
      visible: false,
      btnVisible: true
    };
  },
  computed: {
    getMainList() {
      return this.$store.getters.getMainList;
    }
  },
  methods: {
    async todoDelete(row) {
      // evt.preventDefault();
      try {
        const { data, status } = await this.$axios.delete(
          "http://localhost:3000/api/todo",
          { params: { LIST_ID: row.item.LIST_ID } }
        );
        this.$store.commit("deleteMainList", row.index);
        // todoDelete(row, Name) //Name => Search Value
        //Value search and delete
        // this.list = this.list.filter((element) => {
        //   return element.name !== Name
        // })
      } catch (e) {
        console.error(e);
      }
       console.log("삭제하였습니다.")
    },
    async todoModify(row) {
      try {
        if (
          row.item.LIST_EXPIRE != "" &&
          row.item.LIST_EXPIRE != null &&
          row.item.LIST_EXPIRE < moment(new Date()).format("YYYY-MM-DD")
        ) {
          alert("현재 날짜 보다 지난 날짜를 지정할 수 없습니다.");
        } else {
          const { data, status } = await this.$axios.put(
            "http://localhost:3000/api/todo",
            {
              LIST_ID: row.item.LIST_ID,
              LIST_TITLE: row.item.LIST_TITLE,
              LIST_CONTENT: row.item.LIST_CONTENT,
              LIST_EXPIRE: row.item.LIST_EXPIRE
            }
          );
        }
         console.log("수정하였습니다.")
      } catch (e) {
        console.error(e);
      }
    },
    async todoComplete(row) {
      // evt.preventDefault();
      try {
        const { data, status } = await this.$axios.put(
          "http://localhost:3000/api/todo/complete",
          { LIST_ID: row.item.LIST_ID, LIST_COMPLETE: 1 }
        );
        //this.list.splice(row.index, 1);
        this.$store.commit("deleteMainList", row.index);
        this.$store.commit("addCompleteList", row.item);
      } catch (e) {
        console.error(e);
      }
       console.log("완료하였습니다.")
    },
    visibleAbled(e) {
      this.visible = true;
      this.btnVisible = false;
    },
    visibleDisabled(e) {
      this.visible = false;
      this.btnVisible = true;
    },
    addList(val) {
      if (val.LIST_EXPIRE === null || val.LIST_EXPIRE === "") {
        val.LIST_EXPIRE = "";
      }
      this.$store.commit("addMainList", val);
    }
  },
  async mounted() {
    try {
      const { data, status } = await this.$axios.get(
        "http://localhost:3000/api/todo"
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
        this.$store.commit("addMainList", element);
      });
    } catch (e) {
       console.log(e.response)
    }
  }
};
</script>

<style>
.list-body {
  max-width: 400px;
  margin: auto;
}
.btn-visible-size {
  width: 50px;
}
.list-btn {
  margin: 0 10px;
}
</style>