<template>
  <div id="app" :class="{'replace-container':hideHeader}">
    <!-- 页头 -->
    <page-header :class="{'hide-header':hideHeader}" />

    <div class="content-container">
      <!-- 路由器分支 -->
      <router-view @hide-header="hideHeader=$event" />
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


// 引入路由配置
import RouterConfig from "./Router";
const router = RouterConfig;

export default {
  name: "app",
  data() {
    return {
      // 浏览器窗口标题切换暂存变量
      title: "",
      // 当前页面显示状态
      visibilityState: "visible",
      // 是否隐藏header标签栏
      hideHeader: 0
    };
  },
  watch: {
    // 监听当前页面显示状态是否变化
    visibilityState(state) {
      if (state == "visible") {
        document.title = this.title;
      } else {
        this.title = document.title;
        document.title = "(っ °Д °;)っ别走啊!!!";
      }
    }
  },
  components: {
    PageHeader,
    PageFooter
  },
  mounted() {
    // 监听浏览器窗口切换替换标题
    document.addEventListener("visibilitychange", () => {
      this.visibilityState = document.visibilityState;
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
  height: 100%;
}
@media screen and (max-width: 1064px) and (min-width: 0px) {
  .content-container {
    margin: 42px 0 0 0;
    width: 100vw;
    height: calc(100vh - 42px);
  }
  /* 移动端隐藏header标签栏类<=S */
  .hide-header {
    display: none;
  }
  .replace-container > .content-container {
    margin: 0;
    height: 100%;
  }
  /* 移动端隐藏header标签栏类E=> */
}
</style>
