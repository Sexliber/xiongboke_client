<template>
  <!-- @type:page
  ---- @author:xiong
  ---- @message:主页-->
  <div class="container-fluid" :style="`background-image:url(${bgImg})`">
    <!-- 内容块滚动监听组件 -->
    <section-watcher :hide-aside="viewId=='header'" @viewId="viewId=$event">
      <template v-slot:article>
        <!-- 首屏 -->
        <section id="header" nav-name="首屏推荐" icon-name="icon icon-home">
          <!-- 轮播组件 -->
          <replayer duration="800" waits="6000">
            <!-- 视图块 -->
            <template v-slot:view-panel>
              <div :style="`background-image:url(${headerImg[0]})`"></div>
              <div :style="`background-image:url(${headerImg[1]})`"></div>
              <div :style="`background-image:url(${headerImg[2]})`"></div>
              <div :style="`background-image:url(${headerImg[3]})`"></div>
            </template>

            <!-- 控制台 -->
            <template v-slot:control-panel>
              <li control="pre">
                <span class="white icon icon-pre"></span>
              </li>
              <li control="next">
                <span class="white icon icon-next"></span>
              </li>
              <ul class="to-bt">
                <li
                  control="to"
                  v-for="(item, index) in headerImg"
                  :key="index"
                  :class="{active:index==0}"
                ></li>
              </ul>
            </template>
          </replayer>
        </section>

        <section
          id="codes"
          nav-name="代码审计"
          icon-name="icon icon-code"
          bg="../assets/images/homepage/flex-title-2.jpg"
        ></section>
        <section
          id="comic"
          nav-name="动漫卡通"
          icon-name="icon icon-cartoon"
          bg="../assets/images/homepage/flex-title-0.jpg"
        ></section>
        <section
          id="softs"
          nav-name="实用工具"
          icon-name="icon icon-tool"
          bg="../assets/images/homepage/flex-title-1.jpg"
        ></section>
        <section
          id="design"
          nav-name="创作设计"
          icon-name="icon icon-design"
          bg="../assets/images/homepage/flex-title-3.jpg"
        ></section>
        <section
          id="pages"
          nav-name="网页作品"
          icon-name="icon icon-page"
          bg="../assets/images/homepage/flex-title-4.jpg"
        ></section>
      </template>
    </section-watcher>
  </div>
</template>

<script>
// 滚动条区块监听模块
import SectionWatcher from "../components/SectionWatcher";
// 轮播组件
import Replayer from "../components/Replayer";
export default {
  name: "HomePage",
  data() {
    return {
      // 背景图片
      bgImg: this.global.FullPageBg,
      // 头部轮播图片
      headerImg: this.global.homepageHeaderImg,
      // 窗口正在显示内容的id值
      viewId: "header"
    };
  },
  metaInfo() {
    return {
      title: "熊博客|首页"
    };
  },
  components: {
    SectionWatcher,
    Replayer
  }
};
</script>

<style scoped>
.container-fluid {
  position: relative;
  height: 100%;
  background-size: cover;
}
#header {
  position: relative;
  overflow: hidden;
  z-index: 2;
  background-color: #fff;
  height: 100vh;
}
section {
  min-height: 100vh;
}
#header .view-panel > * {
  background-size: cover;
}
#header [control] {
  cursor: pointer;
}
#header [control="pre"],
#header [control="next"] {
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  height: 100%;
  width: 10%;
}
#header [control="pre"] .icon,
#header [control="next"] .icon {
  font-size: 0.76rem;
}
#header [control="pre"] span,
#header [control="next"] span {
  display: none;
}
#header [control="pre"]:hover span,
#header [control="next"]:hover span {
  display: block;
}
#header [control="pre"] {
  left: 0;
}
#header [control="pre"]:hover {
  background-image: linear-gradient(
    to right,
    rgba(0, 0, 0, 0.5) 0,
    rgba(0, 0, 0, 0.0001) 100%
  );
}
#header [control="next"] {
  right: 0;
}
#header [control="next"]:hover {
  background-image: linear-gradient(
    to left,
    rgba(0, 0, 0, 0.5) 0,
    rgba(0, 0, 0, 0.0001) 100%
  );
}
#header .to-bt {
  left: 50%;
  bottom: 0;
  transform: translate(-50%, -0.2rem);
  display: flex;
  justify-content: space-between;
  align-items: stretch;
  width: 1rem;
  height: 0.16rem;
}
#header .to-bt li {
  flex: none;
  width: 0.16rem;
  background-color: #fff;
  border-radius: 50%;
}
#header .to-bt li.active {
  background-color: #ffc815;
}
</style>