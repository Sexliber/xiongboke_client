<template>
  <div id="app">
    <!-- 页头 -->
    <page-header/>

    <!-- 路由器分支 -->
    <router-view></router-view>

    <!-- 页脚 -->
    <page-footer/>
  </div>
</template>

<script>
// 全局配置文件
import global from "./VueGlobal";
// axios请求插件
import axios from "axios";
// 页头模块
import PageHeader from "./components/PageHeader";
// 页脚模块
import PageFooter from "./components/PageFooter";
// 主页模块
import HomePage from "./pages/HomePage";
//关于我们模块
import divC from "./pages/DivC";

// 路由管理块<=S
import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);
const router = new VueRouter({
  mode: "history",
  base: __dirname,
  routes: [
    { path: "/", component: HomePage },
    { path: "/contact", component: divC }
  ]
});
// 路由管理块=>E

export default {
  name: "app",
  components: {
    PageHeader,
    PageFooter
  },
  router
};
</script>

<style>
</style>
