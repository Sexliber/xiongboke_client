<template>
  <div id="app">
    <!-- 页头 -->
    <page-header />

    <!-- 音乐播放器 -->
    <music-player />

    <div class="content-container">
      <!-- 路由器分支 -->
      <router-view />
    </div>

    <!-- 页脚 -->
    <page-footer />
  </div>
</template>

<script>
// 页头模块
import PageHeader from "./components/PageHeader";
// 页脚模块
import PageFooter from "./components/PageFooter";
// 音乐播放器
import MusicPlayer from "./components/MusicPlayer";

// 路由管理块<=S
import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);
// 引入路由配置
import RouterConfig from "./Router";
const router = RouterConfig;
// 路由管理块=>E

export default {
  name: "app",
  data() {
    return {
      // 窗口标题
      title: ""
    };
  },
  components: {
    PageHeader,
    PageFooter,
    MusicPlayer
  },
  mounted() {
    let _this = this;
    // 监听浏览器窗口切换替换标题
    document.addEventListener('visibilitychange', function() {
      if (this.visibilityState == "hidden") {
        _this.title = this.title;
        this.title = "(っ °Д °;)っ别走吖!!!";
      } else {
        this.title = _this.title;
      }
    });
  },
  //注册路由器
  router
};
</script>

<style scoped>
#app {
  position: relative;
  overflow: hidden;
}
@media screen and (max-width: 1064px) and (min-width: 0px) {
  .content-container {
    margin: 42px 0 0 0;
    width: 100vw;
    height: calc(100vh - 42px);
  }
}
</style>
