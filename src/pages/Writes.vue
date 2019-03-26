<template>
  <div class="content-container">
    <h1 v-text="$route.query.id"></h1>
  </div>
</template>



<script>
export default {
  name: "Writes",
  data() {
    return {};
  }
};
</script>



<style>
* {
  margin: 0;
}
</style>
