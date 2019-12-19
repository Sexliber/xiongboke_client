<template>
  <vue-scroll :class="{loading:isLoading}">
    <h1>联系方式</h1>
    <router-view></router-view>
  </vue-scroll>
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
    }, 300);
  }
};
</script>


