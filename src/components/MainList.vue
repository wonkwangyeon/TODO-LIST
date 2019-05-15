<template>
  <div>
    <div>
      <b-table striped hover :items="list" :fields="fields"></b-table>
    </div>
  </div>
</template>

<script type="text/javascript">
export default {
  name: "main-list",
  data() {
    return {
      keys: [],
      fields: ["Todo 제목", "만료기간", "작성일"],
      list: []
    };
  },
  async mounted() {
    try {
      const { data, status } = await this.$axios.get(
        "http://localhost:3000/api/todo"
      );
      console.log(data);
      data.forEach(element => {
        this.list.push({
          "Todo 제목": element.LIST_TITLE,
          "만료기간": element.LIST_EXPIRE,
          "작성일": element.LIST_CREATED_TIME,
          key : element.LIST_ID
        });
        this.keys.push(Number(element.LIST_ID));
      });
      console.log(this.list);
    } catch (e) {
      console.error(e);
    }
  }
};
</script>