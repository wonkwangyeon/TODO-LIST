<template>
  <b-container>
    <b-row>
      <b-col md="9">
        <b-list-group>
          <draggable v-model="todoList">
            <b-list-group-item v-for="element in todoList" :key="element.LIST_ID">
              <div class="check_box">
                <b-form-checkbox v-model="element.LIST_COMPLETE" name="`chkbox-${element.LIST_ID}`" />
              </div>
              <div class="todo_title">
                <p v-text="element.LIST_TITLE" />
              </div>
          <div class="expire_date">
            <b-badge v-if="element.LIST_EXPIRE !== null && element.LIST_EXPIRE.length > 0" variant="info">
              {{ element.LIST_EXPIRE | moment("YYYY.MM.DD") }}
            </b-badge>
          </div>
          </b-list-group-item>
          </draggable>
          <b-list-group-item class="creatable">
            빈 데이터 입니다[예시]
          </b-list-group-item>
        </b-list-group>
      </b-col>
      <b-col md="3">
        여기에는 현재 클릭한 할일에 대한 정보가 나타난다.
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import draggable from "vuedraggable";

export default {
  name: "TodoList",
  //  components: { AddList },
  components: {
    draggable
  },
  computed: {
    todoList: {
      get: function() {
        return this.$store.getters.getTodoList;
      },
      set: function(value) {
        console.log(value);
        //this.$store.
      }
    }
  },
  data() {
    return {
      fields: [
        { key: "LIST_TITLE", label: "Todo 제목" },
        { key: "LIST_EXPIRE", label: "마감기한" },
        "상세보기"
      ],
      visible: false,
      btnVisible: true,
      test: []
    };
  }
};
</script>

<style>
.check_box {
  display: inline-block;
}
.todo_title {
  display: inline-block;
}
.expire_date {
  display: inline-block;
  float: right;
}
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
.creatable {
  cursor: pointer;
}
</style>