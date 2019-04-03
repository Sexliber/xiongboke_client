<template>
  <div id="app">
    <!-- 页头 -->
    <page-header/>

    <!-- 音乐播放器 -->
    <music-player/>

    <div class="content-container">
      <!-- 路由器分支 -->
      <router-view/>
    </div>

    <!-- 页脚 -->
    <page-footer/>
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
import VueRouterConfig from "./VueRouter";
const router = VueRouterConfig;
// 路由管理块=>E

export default {
  name: "app",
  components: {
    PageHeader,
    PageFooter,
    MusicPlayer
  },
  //注册路由器
  router
};
</script>

<style>
</style>
