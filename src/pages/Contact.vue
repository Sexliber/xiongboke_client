<template>
  <div class="container-fluid" :class="{loading:isLoading}">
    <vue-scroll>
      <h1>联系方式</h1>
      <router-view></router-view>
    </vue-scroll>
  </div>
</template>

<script>
export default {
  name: "DivC",
  data: function() {
    return {
      // 页面加载类控制
      isLoading: true
    };
  },
  mounted() {
    var clear = setTimeout(() => {
      this.isLoading = false;
      clearTimeout(clear);
    }, 1000);
  }
};
</script>

<style scoped>
  .container-fluid{
    height: 100%;
  }
</style>


