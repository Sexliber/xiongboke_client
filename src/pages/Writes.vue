<template>
  <div>
    <h1 v-text="$route.params.url"></h1>
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



<style scoped>
* {
  margin: 0;
}
</style>
