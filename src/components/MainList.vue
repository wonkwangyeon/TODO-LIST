<template>
  <div>
    <div>
      <b-table striped hover :items="list"></b-table>
    </div>
  </div>
</template>

<script type="text/javascript">
export default {
  name: "main-list",
  data() {
    return {
      list: []
    };
  },
  async mounted() {
    try {
      const { data, status } = await this.$axios.get(
        "http://localhost:3000/api/todo"
      );
      data.forEach(element => {
        this.list.push(element);
      });
    } catch (e) {
      console.error(e);
    }
  }
};
</script>