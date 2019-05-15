<template>
  <div class="mainbody-size">

    <b-form @submit="onSubmit">
      <div class="label-left">
        <b-form-group id="input-group-1" label="Todo 제목:" label-for="input-1">
          <b-form-input id="input-1" v-model="form.list_title" required placeholder="Enter Title"></b-form-input>
        </b-form-group>
        <b-form-group id="input-group-2" label="Todo 만료기간(선택사항):" label-for="input-2">
          <b-form-input id="input-2" v-model="form.list_expire" type="date"></b-form-input>
        </b-form-group>
        <b-form-group id="input-group-3" label="Todo 메모:" label-for="input-3">
          <b-form-textarea id="textarea" v-model="form.list_content" placeholder="Enter memo..." rows="3" max-rows="6"></b-form-textarea>
        </b-form-group>
      </div>
      <b-button type="submit" variant="primary">등록</b-button>
    </b-form>

  </div>
</template>

<script>

export default {
  name: "add-list",
  data() {
    return {
      form: {
        list_title: "",
        list_expire: "",
        list_content: ""
      }
    };
  },
  methods: {
    async onSubmit(evt) {
      evt.preventDefault()
      try {
        const { data, status } = await this.$axios.post(
        "http://localhost:3000/api/todo", this.form
        );
        console.log(data);
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
