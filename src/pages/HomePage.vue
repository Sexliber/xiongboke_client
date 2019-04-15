<template>
  <!-- vue-scroll滚动组件 -->
  <vue-scroll ref="vuescroll" @handle-scroll="handleScroll">
    <div class="background" :style="{backgroundImage:`url(${background})`}">
      <!-- 头部轮播组件 -->
      <div class="replay-banner-container">
        <head-replay-banner :get-data="replayItems"/>
      </div>
      <!-- 响应式滚动内容页 -->
      <router-view
        :nav-name="navName"
        :get-is-active="flexTitleAnimaIsActive"
        :progress-bar-width="progressBarWidth"
      />
    </div>
  </vue-scroll>
</template>



<script>
// 全局配置
import global from "../VueGlobal";
//头部轮播组件
import HeadReplayBanner from "../components/ReplayBanner.vue";
// 获取FlexTitleAnima组件的接口参数
import { classEleTop, navbarSubId, barWrapWidth } from "./FlexTitleAnima";

export default {
  name: "HomePage",
  // 组件私有数据
  data() {
    return {
      // 背景图片
      background: global.FullPageBg,
      // 首页轮播图数组
      replayItems: [
        {
          thumbnail: "../assets/images/homepage/advert-bg-1.jpg",
          en: "New Works",
          zh: "最新作品",
          entext: "Here are some of my works.",
          path: "/designs"
        },
        {
          thumbnail: "../assets/images/homepage/advert-bg-2.jpg",
          en: "Soft and Tools",
          zh: "软件工具",
          entext: "Here are some of soft and tools.",
          path: "/software"
        },
        {
          thumbnail: "../assets/images/homepage/advert-bg-3.jpg",
          en: "Code Record",
          zh: "代码审计",
          entext: "There are code keynotes.",
          path: "/code"
        },
        {
          thumbnail: "../assets/images/homepage/advert-bg-4.jpg",
          en: "Cartoons",
          zh: "影视动漫",
          entext: "Here are some of movie and cartoons.",
          path: "/video"
        }
      ],
      // 响应式滚动标题导航栏命名
      navName: [
        { en: "writes", zh: "最新文章" },
        { en: "tools", zh: "实用软件" },
        { en: "codes", zh: "代码审计" },
        { en: "pages", zh: "网页实例" },
        { en: "designs", zh: "最新设计" }
      ],
      // 响应式浮动标题栏active类控制器
      flexTitleAnimaIsActive: [
        true,
        false,
        false,
        false,
        false,
        false,
        false,
        false
      ],
      // 滚动监听上一个区域名称
      lastIdName: null,
      // 导航栏被点击的导航按钮角标
      navSubId: navbarSubId,
      //响应式浮动标题导航栏滚动指示器宽度
      progressBarWidth: [0]
    };
  },
  // 数据监听
  watch: {
    // 导航栏角标数变化执行滚动
    navSubId: function(oldData, newData) {
      this.$refs["vuescroll"].scrollTo(
        {
          y: classEleTop[this.navName[newData].en].offsetHeadTop
        },
        500
      );
    }
  },
  methods: {
    //滚动监听方法
    handleScroll(v, h, e) {
      var scrollTop = v.scrollTop;
      // 判断是否滚动到了一个新的区域<=S
      var idName = this.getId(scrollTop);
      if (idName != this.lastIdName) {
        //滚动到一个不同的区域
        var i = 0;
        for (i in this.navName) {
          if (this.navName[i].en == idName) {
            this.flexTitleAnimaIsActive.splice(i, 1, true);
          } else {
            this.flexTitleAnimaIsActive.splice(i, 1, false);
          }
        }
      }
      this.lastIdName = idName;
      // 判断是否滚动到了一个新的区域=>E

      // 设置滚动指示器宽度<=S
      var screenHeight = document.querySelector("body").offsetHeight;
      var height = 0;
      var m = 0;
      height +=
        classEleTop[this.navName[this.navName.length - 1].en].offsetFootTop;
      this.progressBarWidth.splice(
        0,
        1,
        ((scrollTop + screenHeight) / height) * barWrapWidth
      );
      // 设置滚动指示器宽度=>E
    },
    // 接收滚动收缩长度,判断显示区域停在哪个块上,并且返回该块的id
    getId(scrollTop) {
      var i = 0;
      for (i in this.navName) {
        if (
          (scrollTop >= classEleTop[this.navName[i].en].offsetHeadTop) &
          (scrollTop < classEleTop[this.navName[i].en].offsetFootTop)
        ) {
          return this.navName[i].en;
        }
      }
    }
  },
  // 组件注册
  components: {
    //轮播组件
    HeadReplayBanner
  }
};
</script>



<style scoped>
.background {
  background-size: cover;
  background-attachment: fixed;
}
.replay-banner-container {
  position: relative;
  height: 100vh;
  z-index: 10;
}
</style>
