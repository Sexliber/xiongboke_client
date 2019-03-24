<template>
  <div class="content-container">
    <vue-scroll :class="{loading:isLoading}">
      <h1>我的个性</h1>
      <p>我的姓名</p>
      <p>我的资料</p>
      <img src="../assets/images/homepage/advert-bg-1.jpg" alt>
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
    let clear = setTimeout(() => {
      this.isLoading = false;
      clearTimeout(clear);
    }, 300);
  }
};
</script>


<style scoped>
.loading {
  position: relative;
  height: 100vh;
  overflow: hidden;
}
.loading::before {
  display: block;
  position: absolute;
  content: "";
  z-index: 998;
  top: 0;
  height: 100%;
  width: 100%;
  text-align: center;
  line-height: 100vh;
  background-color: #383838;
}
.loading::after {
  z-index: 999;
  position: fixed;
  top: 50%;
  left: 50%;
  margin: -24px -31px;
  content: "\f1ce";
  color: #ffc815;
  -webkit-animation: fa-spin 2s infinite linear;
  animation: fa-spin 2s infinite linear;
  width: 1.28571429em;
  text-align: center;
  font: normal normal normal 48px/1 FontAwesome;
  text-rendering: auto;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>


