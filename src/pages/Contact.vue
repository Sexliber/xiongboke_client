<template>
  <vue-scroll :class="{loading:isLoading}">
    <h1>我的个性</h1>
    <p>我的姓名</p>
    <p>我的资料</p>
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
    let clear = setTimeout(() => {
      this.isLoading = false;
      clearTimeout(clear);
    }, 300);
  }
};
</script>


