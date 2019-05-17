<template>
  <div class="head">
    <hgroup>
      <p class="title">
        Todo List
      </p>
      <p class="subtitle">
        Today : {{ new Date() | moment("YYYY 년 MM월 DD일 dddd") }}
      </p>
    </hgroup>
  </div>
</template>

<script type="text/javascript">
export default {
  name: "main-nav"
};
</script>
<style>
@import url("https://fonts.googleapis.com/css?family=Acme|Source+Serif+Pro");
.head {
  text-align: center;
}
hgroup {
  padding-top: 50px;
  background-color: #00c6ed;
}
p.title {
  margin-bottom: 0;
}
.title {
  font-family: "Acme", sans-serif;
  font-size: 50px;
  color: #eaeaea;
}
p.subtitle {
  padding-bottom: 20px;
}
.subtitle {
  font-family: "Source Serif Pro", serif;
  font-size: 20px;
  color: #eaeaea;
}
</style>