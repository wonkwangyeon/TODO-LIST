<template>
  <div class="mainbody-size">

    <b-form @submit="onSubmit">
      <div class="label-left">
        <b-form-group id="input-group-1" label="Todo 제목:" label-for="input-1">
          <b-form-input id="input-1" v-model="form.LIST_TITLE" required placeholder="Enter Title"></b-form-input>
        </b-form-group>
        <b-form-group id="input-group-2" label="Todo 마감기한(선택사항):" label-for="input-2">
          <b-form-input id="input-2" v-model="form.LIST_EXPIRE" type="date"></b-form-input>
        </b-form-group>
        <b-form-group id="input-group-3" label="Todo 메모:" label-for="input-3">
          <b-form-textarea id="textarea" v-model="form.LIST_CONTENT" placeholder="Enter memo..." rows="3" max-rows="6"></b-form-textarea>
        </b-form-group>
      </div>
      <b-button type="submit" variant="primary">등록</b-button>
    </b-form>

  </div>
</template>

<script>
import moment from "moment";

export default {
  name: "add-list",

  data() {
    return {
      form: {
        LIST_TITLE: "",
        LIST_EXPIRE: null,
        LIST_CONTENT: ""
      }
    };
  },
  methods: {
    async onSubmit(evt) {
      evt.preventDefault();
      try {
        if (
          this.form.LIST_EXPIRE != "" &&
         this.form.LIST_EXPIRE != null &&
          this.form.LIST_EXPIRE < moment(new Date()).format("YYYY-MM-DD")
        ) {
          alert("ㄴㄴ");
        } else {
          const { data, status } = await this.$axios.post(
            "http://localhost:3000/api/todo",
            this.form
          );
          console.log(data);
          var add = {
            LIST_ID: data.msg.list_id,
            LIST_TITLE: this.form.LIST_TITLE,
            LIST_EXPIRE: this.form.LIST_EXPIRE,
            LIST_CONTENT: this.form.LIST_CONTENT,
            LIST_CREATED_TIME: data.msg.LIST_CREATED_TIME
          };
          this.$emit("addList", add);
          (this.form.LIST_TITLE = ""),
            (this.form.LIST_EXPIRE = null),
            (this.form.LIST_CONTENT = "");
        }
      } catch (e) {
        console.error(e);
      }
    }
  }
};
</script>

<style>
.label-left {
  text-align: left;
}
.mainbody-size {
  margin: 15px 10% 0px 10%;
}
</style>
